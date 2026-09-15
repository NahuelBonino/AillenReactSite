import { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import Hamburger from 'hamburger-react'
import { navLinks } from '../data/content'
import useSmoothScroll from '../hooks/useSmoothScroll'
import useScrollSpy from '../hooks/useScrollSpy'
import { prefersReducedMotion } from '../hooks/usePrefersReducedMotion'

export default function Navbar() {
  const navRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
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
    setIsOpen(false)
    navRef.current.querySelectorAll('.nav-link').forEach((el) => {
      const isActive = el.getAttribute('href') === href
      el.setAttribute('data-active', isActive ? 'true' : 'false')
    })
    scrollTo(href)
  }

  return (
    <>
      <div className="navbar-toggle">
        <Hamburger
          toggled={isOpen}
          toggle={setIsOpen}
          size={28}
          label="Toggle navigation"
          hideOutline={false}
        />
      </div>
      <nav className={isOpen ? 'navbar open' : 'navbar'} ref={navRef}>
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
