import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { navLinks } from '../data/content'
import useSmoothScroll from '../hooks/useSmoothScroll'
import useScrollSpy from '../hooks/useScrollSpy'

export default function Navbar() {
  const navRef = useRef(null)
  const toggleRef = useRef(null)
  const { scrollTo } = useSmoothScroll()
  const activeSection = useScrollSpy()

  useGSAP(() => {
    gsap.fromTo(navRef.current,
      { y: "-100%" },
      { y: "0%", duration: 0.5, ease: "power3.out", delay: 1.2 }
    )
  }, { scope: navRef })

  const handleNavClick = (e, href) => {
    e.preventDefault()
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
