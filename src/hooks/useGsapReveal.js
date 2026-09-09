import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function useGsapReveal() {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      document.querySelectorAll('#wrapper > section').forEach((section) => {
        if (section.classList.contains('intro')) return

        const header = section.querySelector(':scope > header')
        const content = section.querySelector(':scope > .content')

        if (header) {
          gsap.from(header, {
            y: 1,
            opacity: 0,
            duration: 0.75,
            ease: "power2.out",
            clearProps: "all",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              once: true,
            },
          })
        }

        if (content) {
          gsap.from(content, {
            y: 1,
            opacity: 0,
            duration: 0.75,
            ease: "power2.out",
            clearProps: "all",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              once: true,
            },
          })
        }
      })
    })

    return () => ctx.revert()
  }, [])
}