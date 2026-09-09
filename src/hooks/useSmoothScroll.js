import { useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollToPlugin)

export default function useSmoothScroll() {
  const scrollTo = useCallback((target, offsetY = 100) => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (prefersReduced) {
      document.querySelector(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
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