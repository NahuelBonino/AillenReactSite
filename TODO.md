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

## 4. Limpieza
- [x] 4.1 Quitado `@fortawesome/fontawesome-free` (pnpm remove)
- [x] 4.2 Helper unificado: `prefersReducedMotion()` en `usePrefersReducedMotion.js`; reemplaza 7 usos inline de matchMedia (App, Navbar, ChatPanel, VideoPanel, useGsapReveal, useTimelineDraw, useSmoothScroll)
- [x] 4.3 Eliminado `verify.mjs` + devDep `playwright` + `package-lock.json` (resto de npm)
- [ ] 4.4 (PENDIENTE DECISIÓN) `assets/` e `images/` en raíz: recursos originales de la plantilla — ¿conservar como referencia o borrar?

## 5. Verificación final
- [ ] 5.1 Verificación visual manual (browser): chat abierto/cerrado, timeline-end-dot, lightbox (ESC + scroll lock), menú móvil, reduced-motion. `verify.mjs` ya no existe
- [x] 5.2 `pnpm build` sin errores + `dist/` inspeccionado

## 6. A la espera del usuario (no bugs)
- [ ] 6.1 URLs reales de TikTok — reemplazar `TIKTOK_VIDEO_URL_1/2` en `src/data/content.js:92,101`
- [ ] 6.2 Contenido real — textos lorem ipsum, email/teléfono/dirección (`content.js:68-70`), socials con `href="#"` (`content.js:74-80`)
