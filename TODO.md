# TODO — Aillen React Site

## 1. Bugs funcionales
- [x] 1.1 Página invisible con prefers-reduced-motion (CRÍTICO) — `src/App.jsx:20,53`
      `ready` se setea pero nunca se usa; wrapper queda en opacity 0.
      Fix: `style={{ opacity: ready ? 1 : 0 }}`
- [x] 1.2 Iconos cerrar-chat rotos: `fa-xmark` no existe en FA5 — `src/components/chatbot/ChatToggle.jsx:9`, `ChatPanel.jsx:74`
      Fix: reemplazar por `fa-times`
- [x] 1.3 Chat no se puede cerrar con reduced motion — `ChatPanel.jsx:25` (rama `else if (!prefersReduced)`)
      Fix: con reduced motion setear `hidden = true` directo
- [x] 1.4 Lógica invertida en smooth scroll — `src/hooks/useSmoothScroll.js:11-14`
      Fix: reduced motion → `behavior: 'auto'` (instantáneo)
- [x] 1.5 Lightbox galería sin tecla ESC ni bloqueo de scroll — `src/components/Gallery.jsx`
      Fix: listener ESC + `document.body.style.overflow = 'hidden'` al abrir
- [x] 1.6 Menú móvil no se cierra al hacer click en un link — `src/components/Navbar.jsx`
      Fix: remover clase `open` en `handleNavClick`
- [x] 1.7 Navbar se anima (delay 1.2s) con reduced motion — `Navbar.jsx:14-19`
      Fix: check prefers-reduced → mostrar directo

## 2. Build / infraestructura
- [x] 2.1 Import de CSS desde public/ genera warnings Vite — `src/main.jsx:6`
      Fix: quitar import, agregar `<link rel="stylesheet" href="/css/fontawesome-all.min.css">` en `index.html`
- [x] 2.2 Build ok con pnpm (sin errores). `dist/css` + `dist/webfonts` copiadas, link `/css/fontawesome-all.min.css` en html. Render visual pendiente en 3.x/5.x

## 3. Diseño
- [ ] 3.1 Verificar visualmente `.timeline-end-dot` (fix aplicado sin verificar) — debe quedar al final de la línea, no sobre el formulario
- [ ] 3.2 Verificar estado abierto del chat toggle (icono X + label "Cerrar chat") tras fix fa-times
- [ ] 3.3 Pasada responsive en breakpoints 1280 / 1152 / 736 / 480 / 360 (navbar hamburger, video-panel, chat, galería)
- [ ] 3.4 Pasada visual con prefers-reduced-motion activado (página visible, sin animaciones)
- [ ] 3.5 Verificación en browser (sin headless disponible): flujo CTA→chat (prefill + respuesta), nav "Contacto" aterriza en el título, chips de respuestas rápidas, copyright con año, metadatos OG/Twitter

## 4. Limpieza
- [x] 4.1 Quitado `@fortawesome/fontawesome-free` (pnpm remove)
- [x] 4.2 Helper unificado: `prefersReducedMotion()` en `usePrefersReducedMotion.js`; reemplaza 7 usos inline de matchMedia (App, Navbar, ChatPanel, VideoPanel, useGsapReveal, useTimelineDraw, useSmoothScroll)
- [x] 4.3 Eliminado `verify.mjs` + devDep `playwright` + `package-lock.json` (resto de npm)
- [x] 4.4 Borrado `images/` de la raíz (duplicado exacto de `public/images`; git rm). `assets/` en raíz sigue pendiente de decisión
- [x] 4.5 `#wrapper::before` duplicada consolidada: primera regla quedó con posicionamiento + `background-attachment: fixed`; la segunda pinta gradiente + grano. Eliminado el patrón geométrico muerto y las vars `--pattern-fill`/`--pattern-fill-strong` sin uso
- [x] 4.6 Google Fonts: `@import` del top de `main.css` → `<link>` con preconnect en `index.html`
- [x] 4.7 `ul.actions` restaurado al estilo de la spec (sin `justify-content: space-between` ni `gap` raro)

## 5. Verificación final
- [ ] 5.1 Verificación visual manual (browser): chat abierto/cerrado, timeline-end-dot, lightbox (ESC + scroll lock), menú móvil, reduced-motion. `verify.mjs` ya no existe
- [x] 5.2 `pnpm build` sin errores + `dist/` inspeccionado

## 6. Contenido
- [x] 6.1 URLs reales de TikTok — `src/data/content.js` usa `7398333545455947014` (trabajo) y `7478137171463933239` (vida real)
- [x] 6.2 Contenido real — textos propios, copyright personalizado con año (`Copyright.jsx`), socials con URLs reales, email/tel sin publicar por decisión de marca

## 7. Mejoras de producto (esta sesión)
- [x] 7.1 SEO/metadatos en `index.html`: title, meta description, Open Graph, Twitter Card, theme-color, favicon
- [x] 7.2 Typo "asitente" → "asistente" (`ChatToggle.jsx`)
- [x] 7.3 CTA primario "Trabajemos juntos" abre el chat con prefill "Quiero información de cómo sería trabajar contigo" + respuesta con tarifas (`App.jsx`, `CtaButtons.jsx`, `ChatPanel.jsx`, `content.js`)
- [x] 7.4 Chat controlado desde `App.jsx` (open + prefill) + respuestas rápidas (chips) a marcas/Instagram/TikTok (`ChatWidget.jsx`, `ChatPanel.jsx`, `main.css`)
- [x] 7.5 Fix scroll del nav "Contacto": el `offsetY: 100` fijo aterrizaba en la sección CTA (espaciado real entre secciones 20-35px, no 7.5rem). Ahora `useSmoothScroll` hace scroll determinístico a la posición exacta con clamp al scroll máximo