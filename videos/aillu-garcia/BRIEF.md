---
workflow: product-launch-video
flow: automation
storyboard: no
message: "Aillu Garcia — contenido uruguayo que conecta marcas con su gente"
destination: tiktok-shorts
aspect: 1080x1920
language: es
audience: marcas y emprendimientos uruguayos
length: 30s
angle: demo-loop
---

## Intent

Un showcase del sitio personal de Aillu Garcia, mostrado **tal cual es** (show-it-as-is):
no es un promo que promete features, es el sitio recorrido en 30s. Las pantallas capturadas
del sitio son los assets del video, no un rediseño.

Tono: elegante, moderno, fluido — pacing de screen-recording silencioso. Ritmo pausado, sin
cortes bruscos, como si alguien scrollara el sitio con la mano quieta. Vertical 9:16 para
TikTok / Reels / Shorts. Duración 30s.

Secuencia: hero (título animado) → Quién soy / Qué hago → galería + lightbox → chat → CTA.

## Assets

- `capture/screenshots/*` — pantallas reales del sitio; son la fuente visual.
- `capture/assets/*` — imágenes descargadas del sitio (fotos de la galería, webfonts).

## Customizations

- **Audio: NONE.** Sin voiceover, sin avatar, sin música, sin SFX. Video 100% silencioso
  (marcador canónico: `music: none` + sin `SCRIPT.md`).
- Destacar: hero + morph del título · Quién soy (stats de comunidad) / Qué hago (feature icons)
  · galería con click → lightbox · panel de chat · botones CTA (hover/press).
- Zoom-ins sutiles sobre botones e imágenes; highlight de click donde el sitio abre algo.
- Scroll continuo simulado sobre la captura full-page, con easing suave.

## Notes

- Fuente: `http://localhost:5174/` (dev server local de este repo, Vite).
- El sitio es responsive: 1152px / 736px / 480px cambian el layout por completo. Para 9:16 el
  layout correcto es el mobile (≤736px) — capturar a ancho mobile, no recortar un shot desktop.
- Los dos `VideoPanel` (embeds de TikTok) quedan entre las secciones elegidas. La galería y el
  CTA están más abajo: el scroll continuo los atraviesa o se cortan con transición.
- `#lightbox` y el panel de chat están ocultos hasta el click; no aparecen en una captura pasiva.
  Necesitan capturas de estado propias si se quieren mostrar abiertos.
- El sitio usa `background-attachment: fixed` (columna naranja + header mobile): puede
  producir artefactos en capturas full-page.
- Este video no debe tocar el código del sitio: todo vive en `videos/aillu-garcia/`.
