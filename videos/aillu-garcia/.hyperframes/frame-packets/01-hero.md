# Frame packet: 01-hero

## Project inputs

- Project: /home/nahu/AillenReactSite/videos/aillu-garcia
- Design tokens: /home/nahu/AillenReactSite/videos/aillu-garcia/frame.md
- RULES_DIR: /home/nahu/.agents/skills/hyperframes-animation/rules

## Assigned storyboard block

## Frame 1 — Hero

- scene: La home como está: titular "Aillu Garcia", subtítulo y foto, con un push-in lento
- duration: 4.5s
- poster: 3.5s
- transition_in: cut
- status: outline
- type: hook
- blueprint: compose
- focal: assets/01-hero.png
- roles: 01-hero.png = background (placa full-bleed, ya trae su propio color de marca)
- asset_candidates: assets/01-hero.png
- src: compositions/frames/01-hero.html

Placa real del sitio, sin reconstruir nada. Un único plano: la página quieta y la cámara
acercándose apenas. El botón de chat de la placa ya está visible: no lo dupliques.

Scene 1 (0.0–1.4s): placa `01-hero.png` encuadrada de borde a borde, escala 1.0 — entra nítida,
sin fade largo ni movimiento vertical todavía; `Framing` full-bleed, depth mínimo (la placa ES el
fondo y el primer plano).
Scene 2 (1.4–3.6s): push-in lento (escala ~1.0 → ~1.06) centrado en el bloque de titular +
subtítulo del 83% superior, `layered-depth`, un solo elemento domina por tamaño y posición.
Scene 3 (3.6–4.5s): el push frena en suave y la placa **sostiene** — lectura quieta, sin drift,
sin breathing; la quietud contrasta con el scroll que viene.
