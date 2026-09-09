import { useRef, useState } from 'react'
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import useGsapReveal from './hooks/useGsapReveal'
import useTimelineDraw from './hooks/useTimelineDraw'
import Navbar from './components/Navbar'
import Intro from './components/Intro'
import FeatureList from './components/FeatureList'
import Gallery from './components/Gallery'
import VideoPanel from './components/VideoPanel'
import CtaButtons from './components/CtaButtons'
import ContactForm from './components/ContactForm'
import ContactFooter from './components/ContactFooter'
import Copyright from './components/Copyright'
import ChatWidget from './components/chatbot/ChatWidget'
import { first, features, gallery, cta, contact, socials, videoPanels } from './data/content'

function App() {
  const wrapperRef = useRef(null)
  const [ready, setReady] = useState(false)

  useGsapReveal()
  useTimelineDraw()

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

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
    <div id="wrapper" ref={wrapperRef} style={{ opacity: 0 }}>
      <Navbar />
      <Intro />

      <section id="first">
        <header><h2>{first.title}</h2></header>
        <div className="content">
          <p dangerouslySetInnerHTML={{ __html: first.text }}></p>
          <span className="image main">
            <img src="/images/pic02.jpg" alt={first.title} />
          </span>
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
          {gallery.sections.map((section, idx) => (
            <div className="sub-section" key={idx}>
              <header>
                <h3>{section.title}</h3>
                <p>{section.text}</p>
              </header>
              <div className="content">
                <Gallery images={section.images} />
              </div>
            </div>
          ))}
        </div>
      </section>

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
          <CtaButtons />
        </div>
      </section>

      <section id="contacto">
        <header><h2>{contact.title}</h2></header>
        <div className="content">
          <p dangerouslySetInnerHTML={{ __html: contact.text }}></p>
          <ContactForm />
        </div>
        <footer>
          <ContactFooter contact={contact} socials={socials} />
        </footer>
      </section>

      <Copyright />
      <ChatWidget />
    </div>
  )
}

export default App