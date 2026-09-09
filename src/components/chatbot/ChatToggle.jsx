export default function ChatToggle({ open, onToggle }) {
  return (
    <button
      className="chat-toggle"
      aria-expanded={open}
      aria-controls="chat-panel"
      onClick={onToggle}
    >
      <span className={`icon solid ${open ? 'fa-times' : 'fa-comments'}`} aria-hidden="true"></span>
      <span className="chat-toggle-label">{open ? 'Cerrar chat' : 'Chateá con mi asitente'}</span>
    </button>
  )
}