import { useCallback, useRef, useState } from 'react'
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import useGsapReveal from './hooks/useGsapReveal'
import useTimelineDraw from './hooks/useTimelineDraw'
import useHeadingLetterReveal from './hooks/useHeadingLetterReveal'
import { prefersReducedMotion } from './hooks/usePrefersReducedMotion'
import Navbar from './components/Navbar'
import Intro from './components/Intro'
import FeatureList from './components/FeatureList'
import Gallery from './components/Gallery'
import VideoPanel from './components/VideoPanel'
import CtaButtons from './components/CtaButtons'
import ContactFooter from './components/ContactFooter'
import Copyright from './components/Copyright'
import SocialStats from './components/SocialStats'
import ChatWidget from './components/chatbot/ChatWidget'
import { first, features, gallery, cta, contact, socials, socialStats, videoPanels, chatPresets } from './data/content'

function App() {
  const wrapperRef = useRef(null)
  const [ready, setReady] = useState(false)
  const [chat, setChat] = useState({ open: false, prefill: null })

  const toggleChat = useCallback(
    () => setChat((c) => (c.open ? { open: false, prefill: null } : { open: true, prefill: null })),
    []
  )

  const consumePrefill = useCallback(
    () => setChat((c) => ({ ...c, prefill: null })),
    []
  )

  useGsapReveal()
  useTimelineDraw()
  useHeadingLetterReveal()

  useGSAP(() => {
    const prefersReduced = prefersReducedMotion()

    if (prefersReduced) {
      setReady(true)
      return
    }

    const tl = gsap.timeline({
      onComplete: () => setReady(true),
    })

    tl.to(wrapperRef.current, { opacity: 1, duration: 1, ease: "power1.out" })
      .fromTo(
        "#wrapper > .intro > header",
        { y: 1, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power1.out" },
        0
      )
      .fromTo(
        "#wrapper > .intro > .content",
        { y: -1, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power1.out" },
        0
      )
  }, { scope: wrapperRef })

  return (
    <div id="wrapper" className="wrapper" ref={wrapperRef} style={{ opacity: ready ? 1 : 0 }}>
      <Navbar />
      <Intro ready={ready} />

      <section id="first" className="quien-soy">
        <header><h2>{first.title}</h2></header>
        <div className="content">
          <p dangerouslySetInnerHTML={{ __html: first.text }}></p>
          <SocialStats stats={socialStats} />
        </div>
      </section>

      <section id="features">
        <header><h2>{features.title}</h2></header>
        <div className="content">
          <p dangerouslySetInnerHTML={{ __html: features.leadText }}></p>
          <FeatureList items={features.icons} />
          <p dangerouslySetInnerHTML={{ __html: features.bottomText }}></p>
        </div>
      </section>

      <VideoPanel
        tiktokUrl={videoPanels[0].tiktokUrl}
        title={videoPanels[0].title}
        leadText={videoPanels[0].text}
        paragraphs={videoPanels[0].paragraphs}
      />

      <section id="galeria">
        <header><h2>{gallery.title}</h2></header>
        <div className="content">
          <p dangerouslySetInnerHTML={{ __html: gallery.leadText }}></p>
        </div>
      </section>

      {gallery.sections.map((section, idx) => (
        <section className="gallery-row" key={idx}>
          <header>
            <h3>{section.title}</h3>
            <p>{section.text}</p>
          </header>
          <div className="content">
            <Gallery images={section.images} />
          </div>
        </section>
      ))}

      <VideoPanel
        tiktokUrl={videoPanels[1].tiktokUrl}
        title={videoPanels[1].title}
        leadText={videoPanels[1].text}
        paragraphs={videoPanels[1].paragraphs}
      />

      <section>
        <header><h2>{cta.title}</h2></header>
        <div className="content">
          <p dangerouslySetInnerHTML={{ __html: cta.text }}></p>
          <CtaButtons
            buttons={cta.buttons}
            onPrimaryClick={() => setChat({ open: true, prefill: chatPresets.work })}
          />
        </div>
      </section>

      <section id="contacto" className="contacto">
        <header><h2>{contact.title}</h2></header>
        <div className="content">
          <p dangerouslySetInnerHTML={{ __html: contact.text }}></p>
          <ContactFooter socials={socials} ushas={contact.ushas} />
        </div>
      </section>

      <Copyright />
      <ChatWidget
        open={chat.open}
        prefill={chat.prefill}
        onToggle={toggleChat}
        onConsumePrefill={consumePrefill}
      />
    </div>
  )
}

export default App