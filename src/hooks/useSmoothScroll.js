import { useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { prefersReducedMotion } from './usePrefersReducedMotion'

gsap.registerPlugin(ScrollToPlugin)

const getTop = (el) => el.getBoundingClientRect().top + window.scrollY

export default function useSmoothScroll() {
  const scrollTo = useCallback((target) => {
    const el = typeof target === 'string' ? document.querySelector(target) : target
    if (!el) return

    if (prefersReducedMotion()) {
      // Reduced motion: salto instantáneo, sin smooth
      el.scrollIntoView({ behavior: 'auto', block: 'start' })
      return
    }

    // Destino exacto al inicio de la sección + clamp al scroll máximo.
    // No se usa offset fijo: con el espaciado actual entre secciones (20-35px)
    // un offset grande hacía "aterrizar" en la sección anterior (ej. la CTA).
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    const y = Math.min(Math.max(getTop(el), 0), maxScroll)

    gsap.to(window, {
      scrollTo: { y },
      duration: 0.8,
      ease: "power2.inOut",
    })
  }, [])

  return { scrollTo }
}