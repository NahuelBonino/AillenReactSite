# Frame packet: 02-quien-soy

## Project inputs

- Project: /home/nahu/AillenReactSite/videos/aillu-garcia
- Design tokens: /home/nahu/AillenReactSite/videos/aillu-garcia/frame.md
- RULES_DIR: /home/nahu/.agents/skills/hyperframes-animation/rules

## Assigned storyboard block

## Frame 2 — Quién soy

- scene: La placa de "Quién soy" scrolleada lenta: texto y después las métricas de comunidad
- duration: 5s
- poster: 4s
- transition_in: crossfade
- status: outline
- type: social_proof
- blueprint: compose
- focal: assets/02-quien-soy.png
- roles: 02-quien-soy.png = background (placa de 1170×3378 px, más alta que el canvas)
- asset_candidates: assets/02-quien-soy.png
- src: compositions/frames/02-quien-soy.html

Es la respiración del video: un solo scroll, sin cortes ni clicks. Los números del contador ya
están horneados en la captura — **no los re-animes ni los reescribas**: el movimiento lo hace la
cámara.

Scene 1 (0.0–1.6s): placa `02-quien-soy.png` anclada arriba: se ve el rótulo y el primer bloque de
texto; escala 1.0, sin movimiento todavía, `full-width strip`.
Scene 2 (1.6–3.8s): scroll vertical continuo sobre la placa (traducir el wrapper interno) hasta
dejar el bloque de métricas en el tercio central; al llegar, la traslación frena en `power3`.
Scene 3 (3.8–5.0s): push-in corto (~1.0 → ~1.03) sobre el bloque de métricas y **hold** — la
lectura queda quieta, `centered`, sin volver a moverse.
