export default function ChatToggle({ open, onToggle }) {
  return (
    <button
      className="chat-toggle"
      aria-expanded={open}
      aria-controls="chat-panel"
      onClick={onToggle}
    >
      <span className={`icon solid ${open ? 'fa-xmark' : 'fa-comments'}`} aria-hidden="true"></span>
      <span className="chat-toggle-label">{open ? 'Cerrar chat' : 'Chateá con nosotros'}</span>
    </button>
  )
}