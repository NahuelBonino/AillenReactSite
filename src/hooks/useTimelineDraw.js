import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from './usePrefersReducedMotion'

gsap.registerPlugin(ScrollTrigger)

export default function useTimelineDraw() {
  useEffect(() => {
    const prefersReduced = prefersReducedMotion()

    const ctx = gsap.context(() => {
      document.querySelectorAll('#wrapper > section').forEach((section) => {
        // El intro (hero) no lleva línea de timeline
        if (section.classList.contains('intro')) return

        const header = section.querySelector(':scope > header')
        if (!header) return

        // Línea anclada a la SECCIÓN (no al header) para que quede en la columna izquierda
        section.style.position = 'relative'
        header.style.position = 'relative'

        const line = document.createElement('div')
        line.className = 'timeline-line'
        section.appendChild(line)

        if (prefersReduced) return

        gsap.from(line, {
          scaleY: 0,
          transformOrigin: "top center",
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 60%",
            scrub: 1,
          },
        })
      })

      const lastSection = document.querySelector('#wrapper > section:last-of-type')
      if (lastSection && !prefersReduced) {
        const footer = lastSection.querySelector(':scope > footer')
        if (footer) {
          const endDot = document.createElement('div')
          endDot.className = 'timeline-end-dot'
          footer.style.position = 'relative'
          footer.appendChild(endDot)

          gsap.fromTo(endDot,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: footer,
                start: "top bottom",
                once: true,
              },
            }
          )
        }
      }
    })

    return () => ctx.revert()
  }, [])
}