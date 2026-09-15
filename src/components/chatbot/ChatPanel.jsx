import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { prefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { socials, chatPresets } from '../../data/content'

const quickReplies = [
  { label: 'Tarifas para marcas', message: chatPresets.work.message, reply: chatPresets.work.reply },
  { label: 'Instagram', url: socials.find((s) => s.icon.includes('instagram'))?.url },
  { label: 'TikTok', url: socials.find((s) => s.icon.includes('tiktok'))?.url },
].filter((q) => Boolean(q.message || q.url))

export default function ChatPanel({ open, onClose, prefill, onConsumePrefill }) {
  const panelRef = useRef(null)
  const inputRef = useRef(null)
  const typingTimer = useRef(null)
  const [messages, setMessages] = useState([
    { role: 'bot', text: '¡Hola soy Pedrito el asistente de Aillu! ¿En qué podemos ayudarte?' },
  ])
  const [typing, setTyping] = useState(false)

  const sendUserMessage = (text, reply) => {
    setMessages((prev) => [...prev, { role: 'user', text }])
    setTyping(true)
    window.clearTimeout(typingTimer.current)
    typingTimer.current = window.setTimeout(() => {
      setTyping(false)
      setMessages((prev) => [...prev, { role: 'bot', text: reply }])
    }, 1100)
  }

  useEffect(() => {
    if (!open || !prefill) return
    sendUserMessage(prefill.message, prefill.reply)
    onConsumePrefill()
  }, [open, prefill])

  useEffect(() => () => window.clearTimeout(typingTimer.current), [])

  useGSAP(() => {
    const prefersReduced = prefersReducedMotion()

    if (open) {
      panelRef.current.hidden = false
      if (prefersReduced) return

      gsap.fromTo(panelRef.current,
        { opacity: 0, y: 1, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "power3.out" }
      )
    } else if (prefersReduced) {
      // Sin animación (reduced motion): ocultar directo
      panelRef.current.hidden = true
    } else {
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

  useEffect(() => {
    if (!open) return undefined
    const t = window.setTimeout(() => inputRef.current?.focus(), 400)
    const scrollY = window.scrollY
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.width = '100%'
    return () => {
      window.clearTimeout(t)
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      window.scrollTo(0, scrollY)
    }
  }, [open])

  const handleSubmit = (e) => {
    e.preventDefault()
    const text = inputRef.current?.value.trim()
    if (!text) return

    inputRef.current.value = ''
    sendUserMessage(text, '¡Gracias por tu mensaje! Lo tengo en cuenta. Para respuestas al instante podes escribirme por Instagram o TikTok.')
  }

  return (
    <div className="chat-panel" id="chat-panel" role="dialog" aria-label="Chat de asistencia" hidden ref={panelRef}>
      <header className="chat-header">
        <div className="chat-header-title">
          <span className="icon solid fa-robot" aria-hidden="true"></span>
          <span>Asistente Pedrito</span>
        </div>
        <button className="chat-close" onClick={onClose} aria-label="Cerrar chat">
          <span className="icon solid fa-times"></span>
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