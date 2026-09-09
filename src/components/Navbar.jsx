import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { navLinks } from '../data/content'
import useSmoothScroll from '../hooks/useSmoothScroll'
import useScrollSpy from '../hooks/useScrollSpy'
import { prefersReducedMotion } from '../hooks/usePrefersReducedMotion'

export default function Navbar() {
  const navRef = useRef(null)
  const toggleRef = useRef(null)
  const { scrollTo } = useSmoothScroll()
  const activeSection = useScrollSpy()

  useGSAP(() => {
    if (prefersReducedMotion()) return
    gsap.fromTo(navRef.current,
      { y: "-100%" },
      { y: "0%", duration: 0.5, ease: "power3.out", delay: 1.2 }
    )
  }, { scope: navRef })

  const handleNavClick = (e, href) => {
    e.preventDefault()
    navRef.current.classList.remove('open')
    // Activa el link clickeado al instante (el scroll-spy lo re-corrige al scrollear)
    navRef.current.querySelectorAll('.nav-link').forEach((el) => {
      const isActive = el.getAttribute('href') === href
      el.setAttribute('data-active', isActive ? 'true' : 'false')
    })
    scrollTo(href)
  }

  return (
    <>
      <button
        className="navbar-toggle"
        ref={toggleRef}
        onClick={() => navRef.current.classList.toggle('open')}
        aria-label="Toggle navigation"
      >
        <span></span>
      </button>
      <nav className="navbar" ref={navRef}>
        {navLinks.map((link) => (
          <a
            key={link.href}
            className="nav-link"
            href={link.href}
            data-active={activeSection === link.href ? "true" : "false"}
            onClick={(e) => handleNavClick(e, link.href)}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </>
  )
}
