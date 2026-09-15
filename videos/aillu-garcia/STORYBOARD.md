---
format: 1080x1920
duration: 30s
message: "Aillu Garcia — contenido uruguayo que conecta marcas con su gente"
arc: Demo Loop (hero → quién soy → qué hago → galería → CTA → chat)
audience: marcas y emprendimientos uruguayos
mode: autonomous
music: none
---

## Video direction

Aplicá esto a TODOS los frames; los Scene de cada frame solo llevan el delta.

- **palette system** — de `frame.md` (preset `coral` remixeado a la marca): `canvas` = `#FFFFFF`,
  `ink` = `#000000`, `accent` = `#DF3C01` (naranja-rojo de la marca), `accent-dark` = `#C23501`.
  El fondo del canvas lo pinta el assembler; las placas capturadas ya traen su propio color.
- **motion grammar + reveal model** — eases de cola larga (`power3` por defecto, suave antes que
  rebotado). Sin voiceover: **el cue es la cadencia de scroll**, ~0.7 s por pieza. Regla dura:
  **nada de front-load** — a t=0 entra solo lo que el primer Scene muestra; cada pieza siguiente
  aparece en su ventana, con la segunda mitad del frame todavía en movimiento o leyendo.
- **shot model** — este video es un **showcase del sitio tal cual es** (show-it-as-is): las placas
  capturadas del sitio son la imagen. La cámara es lo único que se mueve: scroll vertical sobre la
  placa (el wrapper interno se traduce, **nunca el clip**) + push-in corto cuando una pieza importa.
  Los clicks se marcan con un anillo/pulso en el punto tocado; el nuevo estado entra encima.
- **rhythm / held frames** — esperado: los frames 1, 3 y 6 terminan en **hold** (lectura quieta).
  Los frames 4 y 5 son los de más movimiento (scroll + click). El frame 2 es la respiración
  (scroll lento, sin cortes).
- **negative list** — nunca: barra de navegador, chrome de browser, scrollbar nativa, cursor real,
  formas decorativas genéricas, gradientes violeta/azul "AI", texto inventado que no esté en el
  sitio. Tampoco: **slideshow** (todo revelado al 25% y congelado) ni **screensaver** (todo
  flotando suelto). Nada de audio (ni música, ni SFX).
- **registro técnico** — los assets son capturas a 390 CSS px × dsf 3 = **1170 px de ancho**.
  Escalá a ancho de canvas (1080) y dejá que la altura fluya: las placas de viewport (1170×2532)
  sobran ~420 px respecto del canvas → ahí vive el drift vertical suave. Las placas de sección son
  más altas que el canvas: se scrollean dentro del propio frame.
- **caption band** — los captions están desactivados (video silencioso), pero el keep-out se
  respeta: el contenido importante va en el **83% superior** del canvas.

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

## Frame 3 — Qué hago

- scene: La placa de "Qué hago" con los seis íconos de servicios
- duration: 5s
- poster: 4s
- transition_in: crossfade
- status: outline
- type: feature_showcase
- blueprint: compose
- focal: assets/03-que-hago.png
- roles: 03-que-hago.png = background (placa de 1170×3213 px)
- asset_candidates: assets/03-que-hago.png
- src: compositions/frames/03-que-hago.html

Segundo movimiento de cámara seguido, mismo idioma que el frame 2 para que se lea como una sola
toma larga (el scroll arranca donde quedó el frame anterior, arriba de la placa).

Scene 1 (0.0–1.4s): placa `03-que-hago.png` con el rótulo en el tercio superior; se ve el lead
text; escala 1.0, sin movimiento.
Scene 2 (1.4–3.6s): scroll hacia abajo pasando por la lista de íconos, ritmo parejo (la cadencia
de scroll es el cue de revelado); `full-width strip`.
Scene 3 (3.6–5.0s): frena sobre el último bloque de texto e íconos; push-in mínimo (~1.02) y
**hold** de lectura.

## Frame 4 — Mi contenido (galería + lightbox)

- scene: Scroll por las tres filas de fotos y un click que abre la foto en grande
- duration: 7.5s
- poster: 6.5s
- transition_in: crossfade
- status: outline
- type: feature_showcase
- blueprint: cursor-ui-demo (Adapt)
- focal: assets/05-mis-momentos.png
- roles: 04-mi-contenido.png = supporting (rótulo de sección) · 05-mis-momentos.png = background (placa 1170×2268) · 06-trabajo-marcas.png = background (placa 1170×2484) · 11-lightbox.png = cutout (estado de foto abierta, 1170×2532)
- asset_candidates: assets/04-mi-contenido.png, assets/05-mis-momentos.png, assets/06-trabajo-marcas.png, assets/11-lightbox.png
- src: compositions/frames/04-galeria.html

Adapt: se conserva la firma del blueprint (`cursor-ui-demo`: un click que hace reaccionar la
superficie ya viva) y cambia el medio — no hay canvas animado, hay placas capturadas del sitio:
el "click" se marca con un pulso en el punto tocado y el estado nuevo entra encima.
**Sin cursor real dibujado**: solo el anillo/pulso.

Scene 1 (0.0–1.3s): placa `04-mi-contenido.png` (rótulo + lead) arriba; entra sin movimiento, y
debajo asoma el comienzo de la grilla.
Scene 2 (1.3–3.4s): scroll continuo: sale el rótulo, entra `05-mis-momentos.png` (grilla de fotos),
`asymmetric 60/40`, la grilla domina.
Scene 3 (3.4–5.3s): sigue el scroll hacia `06-trabajo-marcas.png`; a mitad de la ventana, **click
pulse** (anillo accent `#DF3C01` que se expande ~40% y se desvanece) sobre una foto de la grilla.
Scene 4 (5.3–7.5s): la foto abierta `11-lightbox.png` entra encima con scale-in suave desde el
punto del click + fade del fondo; al asentarse, **hold** — la foto grande lee quieta y el video
respira antes del CTA.

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
