import { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { navLinks } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

export default function useScrollSpy() {
  const [active, setActive] = useState("#intro")

  useEffect(() => {
    const sections = navLinks
      .map(link => document.querySelector(link.href))
      .filter(Boolean)

    const triggers = sections.map(section => {
      return ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onToggle: (self) => {
          if (self.isActive) {
            setActive(`#${section.id}`)
          }
        },
      })
    })

    return () => {
      triggers.forEach(t => t.kill())
    }
  }, [])

  return active
}