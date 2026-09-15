# Frame packet: 06-chat

## Project inputs

- Project: /home/nahu/AillenReactSite/videos/aillu-garcia
- Design tokens: /home/nahu/AillenReactSite/videos/aillu-garcia/frame.md
- RULES_DIR: /home/nahu/.agents/skills/hyperframes-animation/rules

## Assigned storyboard block

## Frame 6 — Chat + cierre

- scene: La sección de contacto y el panel del asistente que sube sobre la página
- duration: 3.5s
- poster: 3s
- transition_in: crossfade
- status: outline
- type: branding
- blueprint: compose
- focal: assets/12-chat.png
- roles: 10-contacto.png = background (placa 1170×1590) · 12-chat.png = cutout (panel abierto, 1170×2532)
- asset_candidates: assets/10-contacto.png, assets/12-chat.png
- src: compositions/frames/06-chat.html

Cierre: se ve la página y el panel del asistente entrando por encima, como el último gesto de la
recorrida. Sin texto nuevo, sin logo inventado: lo que se ve es el sitio.

Scene 1 (0.0–1.2s): `10-contacto.png` anclada arriba, escala 1.0, sin movimiento; los datos de
contacto leen.
Scene 2 (1.2–2.4s): el panel `12-chat.png` sube desde el borde inferior con `power3` (entra
desde abajo, no aparece de golpe) mientras el fondo se atenúa apenas (~15%) para dar foco.
Scene 3 (2.4–3.5s): la traslación se asienta y **hold** final — la página y el panel quedan
quietos; cierre sin movimiento extra.
