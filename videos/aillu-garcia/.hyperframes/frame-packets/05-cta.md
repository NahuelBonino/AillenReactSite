# Frame packet: 05-cta

## Project inputs

- Project: /home/nahu/AillenReactSite/videos/aillu-garcia
- Design tokens: /home/nahu/AillenReactSite/videos/aillu-garcia/frame.md
- RULES_DIR: /home/nahu/.agents/skills/hyperframes-animation/rules

## Assigned storyboard block

## Frame 5 — CTA

- scene: La sección de propuesta con el botón en reposo y después en hover
- duration: 4.5s
- poster: 4s
- transition_in: cut
- status: outline
- type: cta
- blueprint: compose
- focal: assets/13-cta-hover.png
- roles: 09-cta.png = background (placa 1170×1563) · 13-cta-hover.png = supporting (mismo encuadre, botón en hover)
- asset_candidates: assets/09-cta.png, assets/13-cta-hover.png
- src: compositions/frames/05-cta.html

Corte seco desde el lightbox: cambia el registro (de foto a propuesta). Las dos placas comparten
encuadre — el cambio de estado es un *swap*, no un movimiento de cámara.

Scene 1 (0.0–1.6s): `09-cta.png` encuadrada igual que la placa de hover (misma escala y anclaje),
estática: se lee el titular de la propuesta.
Scene 2 (1.6–2.6s): push-in corto sobre el botón; en el último tercio de la ventana entra el
**click pulse** accent en el centro del botón.
Scene 3 (2.6–4.5s): swap a `13-cta-hover.png` en el mismo encuadre (crossfade corto, sin
traslación de cámara para que el cambio se lea como el botón reaccionando) y **hold**.
