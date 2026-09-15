import { useEffect } from 'react'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { inView } from 'motion/react'
import { prefersReducedMotion } from './usePrefersReducedMotion'

gsap.registerPlugin(SplitText)

const MOBILE_QUERY = '(max-width: 1152px)'

function wrapSplitContent(heading) {
  const wrapper = document.createElement('span')
  wrapper.className = 'split-wrap'
  while (heading.firstChild) wrapper.appendChild(heading.firstChild)
  heading.appendChild(wrapper)
  return wrapper
}

export default function useHeadingLetterReveal() {
  useEffect(() => {
    if (prefersReducedMotion()) return undefined

    const mm = gsap.matchMedia()

    mm.add(MOBILE_QUERY, () => {
      // Todos los títulos: secciones y paneles de video.
      const headings = gsap.utils.toArray('#wrapper :is(h2, h3)')
      const splits = new Map()
      const revealed = new WeakSet()

      // Detecta entrada en pantalla con `inView` de motion (recalcula solo
      // cuando las imágenes cambian el alto; con ScrollTrigger quedaban
      // triggers viejos y no se veía el efecto).
      const stops = []
      const reveal = (heading, split) => {
        revealed.add(heading)
        gsap.fromTo(
          split.chars,
          { opacity: 0, yPercent: 60 },
          { opacity: 1, yPercent: 0, duration: 0.4, ease: 'power2.out', stagger: 0.035 }
        )
      }

      headings.forEach((heading) => {
        const split = new SplitText(heading, {
          type: 'words,chars',
          autoSplit: true,
          onSplit: (self) => {
            wrapSplitContent(heading)
            splits.set(heading, self)
            if (revealed.has(heading)) gsap.set(self.chars, { opacity: 1, yPercent: 0 })
            else gsap.set(self.chars, { opacity: 0, yPercent: 60 })
          },
        })

        splits.set(heading, split)
        stops.push(
          inView(
            heading,
            (visible) => {
              const current = splits.get(heading)
              if (!current) return

              if (visible) {
                reveal(heading, current)
                return
              }

              // Se pasó de largo sin llegar a disparar (scroll rápido): mostrar
              // sin animar, así nunca queda un título vacío.
              if (heading.getBoundingClientRect().top < 0) {
                revealed.add(heading)
                gsap.set(current.chars, { opacity: 1, yPercent: 0 })
              }
            },
            { once: true, amount: 0.2, margin: '0px 0px -12% 0px' }
          )
        )
      })

      return () => {
        stops.forEach((stop) => stop())
        splits.forEach((split) => split.revert())
        splits.clear()
      }
    })

    return () => mm.revert()
  }, [])
}
