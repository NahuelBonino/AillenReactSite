#!/usr/bin/env node
/**
 * Genera `src/data/titleMorph.js` para el título animado del intro.
 *
 * - Letras: source sans pro 700 (la misma familia/peso que usa `h1` en el sitio),
 *   convertidas a curvas con opentype.js. Se aplica el tracking equivalente al
 *   `letter-spacing: -0.05em` del CSS para que el resultado sea idéntico.
 * - Iconos: Font Awesome 5 Free Brands (`fa-brands-400.ttf`), el mismo webfont que
 *   ya usa el sitio en `ContactFooter`/`ChatPanel`. Cada ícono se escala y centra
 *   dentro del box de la letra que le toca, así el morph no "salta".
 * - Labial: no existe en FA5 Free, así que se emite como primitivas (`rect`/`polygon`)
 *   para que el runtime las convierta con `MorphSVGPlugin.convertToPath()`.
 *
 * Uso: pnpm run gen:title  [-- --font .cache/SourceSansPro-Bold.ttf --text "Aillu Garcia"]
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import * as opentypeNs from 'opentype.js'

const parse = opentypeNs.parse ?? opentypeNs.default?.parse
if (typeof parse !== 'function') {
  throw new Error('opentype.js: no se encontró la función parse()')
}

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

/* ------------------------------------------------------------------ config */

// Igual que `.title-morph` / `h1` en main.css: letter-spacing -0.05em sobre 1000 upem.
const TRACKING = -0.05 * 1000

// Íconos: pocos y en letras puntuales (la primera aparición de cada una).
// 'lipstick' también está disponible: se authora con primitivas y el runtime lo
// pasa por MorphSVGPlugin.convertToPath().
const ICONS = [
  { char: 'A', icon: 'tiktok' }, // inicial de "Aillu"
  { char: 'G', icon: 'instagram' }, // inicial de "Garcia"
]

const BRAND_ICONS = {
  instagram: 'instagram',
  tiktok: 'tiktok',
  whatsapp: 'whatsapp',
  youtube: 'youtube',
}

// Entrada de los íconos: aparecen grandes y juntos cerca del centro del nombre y
// después el morph los lleva a su lugar (todo con formas, sin transforms).
const ICON_SCALE = 1.5
const ICON_GAP = 0.62 // separación entre los dos íconos grandes, en anchos de ícono

/* ------------------------------------------------------------------- utils */

const round = (n) => Math.round(n * 10) / 10
const num = (n) => (Number.isFinite(n) ? round(n) : 0)

/**
 * Serializa un Path de opentype.js a `d` en coordenadas absolutas.
 * No usamos `path.toPathData()` porque en opentype 2.0 serializa ciertos valores
 * (p. ej. una Y de 3.55e-14) como el string "NaN", y MorphSVG intenta resolverlos
 * como selector CSS.
 */
function pathToD(path, precision = 1) {
  const factor = 10 ** precision
  const f = (n) => {
    if (!Number.isFinite(n)) throw new Error(`pathToD: coordenada inválida (${n})`)
    const rounded = Math.round(n * factor) / factor
    return String(Object.is(rounded, -0) ? 0 : rounded)
  }

  let d = ''
  for (const cmd of path.commands) {
    if (cmd.type === 'M' || cmd.type === 'L') d += `${cmd.type}${f(cmd.x)} ${f(cmd.y)}`
    else if (cmd.type === 'C') d += `C${f(cmd.x1)} ${f(cmd.y1)} ${f(cmd.x2)} ${f(cmd.y2)} ${f(cmd.x)} ${f(cmd.y)}`
    else if (cmd.type === 'Q') d += `Q${f(cmd.x1)} ${f(cmd.y1)} ${f(cmd.x)} ${f(cmd.y)}`
    else if (cmd.type === 'Z') d += 'Z'
    else throw new Error(`pathToD: comando no soportado "${cmd.type}"`)
  }
  return d
}

function parseArgs(argv) {
  const out = {}
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i]
    if (arg.startsWith('--')) {
      out[arg.slice(2)] = argv[i + 1]
      i += 1
    }
  }
  return out
}

function fontCodepoint(iconsYml, name) {
  const match = iconsYml.match(
    new RegExp(`^${name}:\\s*$[\\s\\S]*?^\\s+unicode:\\s*([0-9a-f]+)`, 'm')
  )
  if (!match) throw new Error(`Font Awesome: no encontré el unicode de "${name}"`)
  return parseInt(match[1], 16)
}

/* -------------------------------------------------------------- geometría */

/**
 * Escala + centra el glyph de un ícono dentro de un box cuadrado.
 * `glyph.getPath(x, y, size)` usa y hacia abajo con la baseline en `y`, así que
 * una coordenada de fuente (gx, gy) [y arriba] cae en (x + gx*s, y - gy*s).
 */
function fitGlyphInBox(font, glyph, { left, top, side }) {
  const bb = glyph.getBoundingBox()
  const gw = bb.x2 - bb.x1
  const gh = bb.y2 - bb.y1
  const s = Math.min(side / gw, side / gh)
  const size = font.unitsPerEm * s
  const inkLeft = left + (side - gw * s) / 2
  const inkTop = top + (side - gh * s) / 2
  const x = inkLeft - bb.x1 * s
  const y = inkTop + bb.y2 * s
  return { d: pathToD(glyph.getPath(x, y, size)), box: { left: inkLeft, top: inkTop, w: gw * s, h: gh * s } }
}

/**
 * Labial dibujado a mano con primitivas (se convierten a path en runtime).
 * Todas las subformas van en sentido horario (y hacia abajo) para que el
 * `fill-rule: nonzero` las una y no genere huecos en los solapamientos.
 */
function lipstickShapes({ cx, top, side }) {
  const bottom = top + side
  const overlap = side * 0.006

  // Perfil clásico: base ancha → tubo más fino → collar (el más ancho) → bala
  // fina con corte biselado, para que la silueta se lea como labial y no como
  // un rectángulo.
  const baseHalf = side * 0.2
  const bodyHalf = side * 0.17
  const collarHalf = side * 0.21
  const bulletHalf = side * 0.13

  const baseTop = bottom - side * 0.1
  const bodyTop = bottom - side * 0.5
  const collarTop = bottom - side * 0.57
  const bulletLeftTop = bottom - side * 0.78
  const bulletRightTop = bottom - side * 0.98

  return [
    // Base
    { tag: 'rect', x: num(cx - baseHalf), y: num(baseTop), width: num(baseHalf * 2), height: num(bottom - baseTop), rx: num(side * 0.02) },
    // Cuerpo del tubo
    { tag: 'rect', x: num(cx - bodyHalf), y: num(bodyTop), width: num(bodyHalf * 2), height: num(baseTop - bodyTop + overlap), rx: num(side * 0.01) },
    // Anillo / collar
    { tag: 'rect', x: num(cx - collarHalf), y: num(collarTop), width: num(collarHalf * 2), height: num(bodyTop - collarTop + overlap * 2), rx: num(side * 0.012) },
    // Bala biselada
    {
      tag: 'polygon',
      points: [
        [cx - bulletHalf, collarTop + overlap],
        [cx - bulletHalf, bulletLeftTop],
        [cx + bulletHalf, bulletRightTop],
        [cx + bulletHalf, collarTop + overlap],
      ]
        .map(([px, py]) => `${num(px)},${num(py)}`)
        .join(' '),
    },
  ]
}

/* --------------------------------------------------------------------- run */

const args = parseArgs(process.argv.slice(2))
const TEXT = args.text || 'Aillu Garcia'
const FONT_FILE = path.resolve(ROOT, args.font || '.cache/SourceSansPro-Bold.ttf')
const OUT_FILE = path.resolve(ROOT, args.out || 'src/data/titleMorph.js')
const FA_DIR = path.join(ROOT, 'node_modules/@fortawesome/fontawesome-free')

if (!fs.existsSync(FONT_FILE)) {
  throw new Error(
    `No encontré la fuente en ${FONT_FILE}\n` +
      'Descargala (o pasá --font <ruta>):\n' +
      '  mkdir -p .cache && curl -s -A "Mozilla/5.0 (Linux; U; Android 2.2; en-us) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1" ' +
      '"https://fonts.googleapis.com/css?family=Source+Sans+Pro:700" | grep -o "https://[^)]*" | head -1 | xargs -I{} curl -s -o .cache/SourceSansPro-Bold.ttf {}'
  )
}

const textFont = parse(fs.readFileSync(FONT_FILE))
const brandFont = parse(fs.readFileSync(path.join(FA_DIR, 'webfonts/fa-brands-400.ttf')))
const faIconsYml = fs.readFileSync(path.join(FA_DIR, 'metadata/icons.yml'), 'utf8')

const UPEM = textFont.unitsPerEm
const CAP = textFont.tables.os2?.sCapHeight || 660

// 1) Layout de las letras (pen advance + kerning + tracking, igual que el CSS).
const layout = []
let pen = 0
let prev = null
for (const char of TEXT) {
  const glyph = textFont.charToGlyph(char)
  if (prev) pen += textFont.getKerningValue(prev, glyph)
  if (char !== ' ') {
    const bb = glyph.getBoundingBox()
    layout.push({
      char,
      d: pathToD(glyph.getPath(pen, 0, UPEM)),
      box: { left: bb.x1 + pen, right: bb.x2 + pen, top: -bb.y2, bottom: -bb.y1 },
    })
  }
  pen += glyph.advanceWidth
  pen += TRACKING
  prev = glyph
}

// 2) viewBox ajustado a la tinta real (evita aire muerto arriba/abajo).
const ink = layout.reduce(
  (acc, l) => ({
    left: Math.min(acc.left, l.box.left),
    right: Math.max(acc.right, l.box.right),
    top: Math.min(acc.top, l.box.top),
    bottom: Math.max(acc.bottom, l.box.bottom),
  }),
  { left: Infinity, right: -Infinity, top: Infinity, bottom: -Infinity }
)
const VIEW_BOX = {
  x: num(ink.left),
  y: num(ink.top),
  w: num(ink.right - ink.left),
  h: num(ink.bottom - ink.top),
}

// 3) Cada letra que tiene ícono se escala para no invadir a sus vecinas (los
// anchos de tinta van de 276 a 638 unidades) y se centra en la banda de
// mayúsculas (baseline → cap height).
const iconByIndex = new Map()
ICONS.forEach(({ char, icon }) => {
  const index = layout.findIndex((letter, i) => letter.char === char && !iconByIndex.has(i))
  if (index < 0) throw new Error(`No encontré la letra "${char}" para el ícono "${icon}"`)
  iconByIndex.set(index, icon)
})

const wordCenterX = ink.left + (ink.right - ink.left) / 2
let iconOrder = 0

const letters = layout.map((letter, index) => {
  const icon = iconByIndex.get(index)
  const entry = { char: letter.char, d: letter.d }
  if (!icon) return entry

  const cx = (letter.box.left + letter.box.right) / 2
  const side = Math.min(CAP, (letter.box.right - letter.box.left) * 1.05)
  const box = { left: cx - side / 2, top: -(CAP + side) / 2, side }

  // Forma de entrada: más grande y pegada al centro (el primero a la izquierda,
  // el segundo a la derecha).
  const bigSide = side * ICON_SCALE
  const bigCx = wordCenterX + (iconOrder === 0 ? -1 : 1) * bigSide * ICON_GAP
  const bigBox = { left: bigCx - bigSide / 2, top: -(CAP + bigSide) / 2, side: bigSide }
  iconOrder += 1

  entry.icon = icon

  if (icon === 'lipstick') {
    entry.lipstick = lipstickShapes({ cx, top: box.top, side }).map((shape) =>
      shape.tag === 'rect'
        ? { tag: shape.tag, attrs: { x: shape.x, y: shape.y, width: shape.width, height: shape.height, rx: shape.rx } }
        : { tag: shape.tag, attrs: { points: shape.points } }
    )
  } else {
    const codepoint = fontCodepoint(faIconsYml, BRAND_ICONS[icon])
    const glyph = brandFont.charToGlyph(String.fromCodePoint(codepoint))
    entry.big = fitGlyphInBox(brandFont, glyph, bigBox).d
    entry.target = fitGlyphInBox(brandFont, glyph, box).d
  }

  return entry
})

// 4) Salida.
const lettersSource = letters
  .map((letter) => {
    const head = `  { char: ${JSON.stringify(letter.char)},`
    const dLine = `d: ${JSON.stringify(letter.d)}`

    if (letter.lipstick) {
      const shapes = letter.lipstick
        .map((s) => `      { tag: ${JSON.stringify(s.tag)}, attrs: ${JSON.stringify(s.attrs)} },`)
        .join('\n')
      return `${head} icon: ${JSON.stringify(letter.icon)},\n    ${dLine},\n    lipstick: [\n${shapes}\n    ] },`
    }

    if (!letter.target) return `${head}\n    ${dLine} },`

    return `${head} icon: ${JSON.stringify(letter.icon)},\n    ${dLine},\n    big: ${JSON.stringify(letter.big)},\n    target: ${JSON.stringify(letter.target)} },`
  })
  .join('\n')

const source = `// AUTO-GENERADO por scripts/build-title-paths.mjs — no editar a mano.
// Regenerar con: pnpm run gen:title
//
// Letras: ${path.basename(FONT_FILE)} (source sans pro 700, la familia que usa h1).
// Iconos: Font Awesome 5 Free Brands — la misma webfont que usa el sitio.
// Labial (opcional): primitivas rect/polygon que el runtime pasa por
// MorphSVGPlugin.convertToPath().

export const TITLE_TEXT = ${JSON.stringify(TEXT)}

export const VIEW_BOX = { x: ${VIEW_BOX.x}, y: ${VIEW_BOX.y}, w: ${VIEW_BOX.w}, h: ${VIEW_BOX.h} }

/**
 * Una entrada por letra visible (el espacio solo avanza el pen, no genera entrada).
 * - \`d\`: contorno de la letra.
 * - \`big\` / \`target\` (solo letras con ícono): el ícono en su forma de entrada
 *   (grande y cerca del centro) y en su lugar final.
 * - \`lipstick\` (opcional): primitivas a convertir con convertToPath() cuando el ícono es el labial.
 */
export const LETTERS = [
${lettersSource}
]
`

fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true })
fs.writeFileSync(OUT_FILE, source, 'utf8')

console.log(`✓ ${path.relative(ROOT, OUT_FILE)} — ${letters.length} letras, viewBox ${VIEW_BOX.w}×${VIEW_BOX.h}`)
console.log(`  íconos: ${[...iconByIndex].map(([i, icon]) => `${letters[i].char}#${i}:${icon}`).join(' ') || 'ninguno'}`)
