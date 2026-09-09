import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

export default function ChatPanel({ open, onClose }) {
  const panelRef = useRef(null)
  const inputRef = useRef(null)
  const [messages, setMessages] = useState([
    { role: 'bot', text: '¡Hola! ¿En qué podemos ayudarte?' },
  ])
  const [typing, setTyping] = useState(false)

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (open) {
      panelRef.current.hidden = false
      if (prefersReduced) return

      gsap.fromTo(panelRef.current,
        { opacity: 0, y: 1, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "power3.out" }
      )
      setTimeout(() => inputRef.current?.focus(), 350)
    } else if (!prefersReduced) {
      gsap.to(panelRef.current, {
        opacity: 0,
        y: 1,
        scale: 0.98,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => {
          panelRef.current.hidden = true
        },
      })
    }
  }, { dependencies: [open], scope: panelRef })

  useEffect(() => {
    if (!open) return
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [open, onClose])

  const handleSubmit = (e) => {
    e.preventDefault()
    const text = inputRef.current?.value.trim()
    if (!text) return

    setMessages(prev => [...prev, { role: 'user', text }])
    inputRef.current.value = ''
    setTyping(true)

    setTimeout(() => {
      setTyping(false)
      setMessages(prev => [
        ...prev,
        { role: 'bot', text: '¡Gracias por tu mensaje! Un asistente te va a responder en breve.' },
      ])
    }, 1200)
  }

  return (
    <div className="chat-panel" id="chat-panel" role="dialog" aria-label="Chat de asistencia" hidden ref={panelRef}>
      <header className="chat-header">
        <div className="chat-header-title">
          <span className="icon solid fa-robot" aria-hidden="true"></span>
          <span>Asistente</span>
        </div>
        <button className="chat-close" onClick={onClose} aria-label="Cerrar chat">
          <span className="icon solid fa-xmark"></span>
        </button>
      </header>
      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`chat-msg chat-msg-${msg.role}`}>
            <p>{msg.text}</p>
          </div>
        ))}
        {typing && (
          <div className="chat-msg chat-msg-bot chat-typing">
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
      </div>
      <form className="chat-input" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Escribí tu mensaje…"
          aria-label="Mensaje"
          ref={inputRef}
        />
        <button type="submit" className="chat-send" aria-label="Enviar">
          <span className="icon solid fa-paper-plane"></span>
        </button>
      </form>
    </div>
  )
}