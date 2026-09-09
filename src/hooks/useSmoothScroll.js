import { useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { prefersReducedMotion } from './usePrefersReducedMotion'

gsap.registerPlugin(ScrollToPlugin)

export default function useSmoothScroll() {
  const scrollTo = useCallback((target, offsetY = 100) => {
    const prefersReduced = prefersReducedMotion()

    if (prefersReduced) {
      // Reduced motion: salto instantáneo, sin smooth
      document.querySelector(target)?.scrollIntoView({ behavior: 'auto', block: 'start' })
      return
    }

    gsap.to(window, {
      scrollTo: { y: target, offsetY },
      duration: 0.8,
      ease: "power2.inOut",
    })
  }, [])

  return { scrollTo }
}