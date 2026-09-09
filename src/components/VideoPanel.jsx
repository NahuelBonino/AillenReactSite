import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import TikTokEmbed from './TikTokEmbed'
import { prefersReducedMotion } from '../hooks/usePrefersReducedMotion'

gsap.registerPlugin(ScrollTrigger)

export default function VideoPanel({ tiktokUrl, title, leadText, paragraphs }) {
  const wrapRef = useRef(null)
  const panelRef = useRef(null)

  useGSAP(() => {
    const prefersReduced = prefersReducedMotion()
    if (prefersReduced) return

    gsap.fromTo(panelRef.current,
      { scale: 0.96, opacity: 0, y: 1 },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.75,
        ease: "power2.out",
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top 85%",
          once: true,
        },
      }
    )

    gsap.fromTo(wrapRef.current,
      { y: "0%" },
      {
        y: "-8%",
        ease: "none",
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      }
    )
  }, { scope: wrapRef })

  return (
    <div className="video-panel-wrap" ref={wrapRef}>
      <div className="video-panel" ref={panelRef}>
        <div className="video-panel-video">
          <TikTokEmbed tiktokUrl={tiktokUrl} />
        </div>
        <div className="video-panel-text">
          <h3>{title}</h3>
          <p dangerouslySetInnerHTML={{ __html: leadText }}></p>
          {paragraphs.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>
      </div>
    </div>
  )
}