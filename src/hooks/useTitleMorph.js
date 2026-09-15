import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'
import { prefersReducedMotion } from './usePrefersReducedMotion'
import { LETTERS } from '../data/titleMorph'

gsap.registerPlugin(MorphSVGPlugin)

const SVG_NS = 'http://www.w3.org/2000/svg'

function buildLipstickPath(shapes) {
  const nodes = shapes.map(({ tag, attrs }) => {
    const el = document.createElementNS(SVG_NS, tag)
    Object.entries(attrs).forEach(([name, value]) => el.setAttribute(name, String(value)))
    return el
  })

  const paths = [].concat(MorphSVGPlugin.convertToPath(nodes, false))
  return paths.map((path) => path.getAttribute('d')).filter(Boolean).join(' ')
}


export default function useTitleMorph(svgRef, { ready = true } = {}) {
  const shapesRef = useRef([])

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return undefined

    const layer = document.createElementNS(SVG_NS, 'g')
    layer.setAttribute('class', 'title-morph__targets')
    layer.setAttribute('opacity', '0')
    layer.setAttribute('aria-hidden', 'true')

    const createPath = (d) => {
      const path = document.createElementNS(SVG_NS, 'path')
      path.setAttribute('d', d)
      layer.appendChild(path)
      return path
    }

    const letters = Array.from(svg.querySelectorAll('.title-morph__letters [data-letter]'))

    shapesRef.current = LETTERS.map((letter, index) => {
      const figure = letter.target || (letter.lipstick && buildLipstickPath(letter.lipstick))
      if (!figure) return null
      return {
        big: letter.big ? createPath(letter.big) : null,
        figure: createPath(figure),
        letter: createPath(letter.d),
      }
    })

    const reduced = prefersReducedMotion()

    letters.forEach((path, index) => {
      if (reduced) return

      const shapes = shapesRef.current[index]
      if (shapes) path.setAttribute('d', (shapes.big || shapes.figure).getAttribute('d'))
      path.style.opacity = '0'
    })

    svg.appendChild(layer)

    return () => {
      layer.remove()
      shapesRef.current = []
    }
  }, [svgRef])


  useEffect(() => {
    const svg = svgRef.current
    if (!svg || !ready || prefersReducedMotion()) return undefined

    const letters = Array.from(svg.querySelectorAll('.title-morph__letters [data-letter]'))
    const shapes = shapesRef.current
    if (!letters.length) return undefined

    const APPEAR = 0.45
    const APPEAR_STAGGER = 0.12
    const SEPARATE = 0.8
    const MORPH = 0.5
    const LETTER_APPEAR = 0.35
    const LETTER_STAGGER = 0.09
    const HOLD = 0.1

    const icons = []
    letters.forEach((path, index) => {
      if (shapes[index]) icons.push({ path, shapes: shapes[index] })
    })

    const separateStart = APPEAR + APPEAR_STAGGER * Math.max(icons.length - 1, 0) + HOLD
    const morphStart = separateStart + SEPARATE + HOLD
    const restStart = morphStart + MORPH + HOLD * 1.5

    const timeline = gsap.timeline()

    icons.forEach(({ path, shapes: entry }, index) => {
      timeline.to(path, { opacity: 1, duration: APPEAR, ease: 'power2.out' }, index * APPEAR_STAGGER)
      timeline.to(
        path,
        { duration: SEPARATE, ease: 'power2.inOut', morphSVG: { shape: entry.figure } },
        separateStart
      )
      timeline.to(
        path,
        { duration: MORPH, ease: 'power2.inOut', morphSVG: { shape: entry.letter } },
        morphStart
      )
    })

    letters
      .filter((_, index) => !shapes[index])
      .forEach((path, index) => {
        timeline.fromTo(
          path,
          { opacity: 0, scale: 0.5, y: 24 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: LETTER_APPEAR,
            ease: 'power2.out',
            clearProps: 'opacity,transform',
          },
          restStart + index * LETTER_STAGGER
        )
      })

    return () => timeline.kill()
  }, [ready, svgRef])
}
