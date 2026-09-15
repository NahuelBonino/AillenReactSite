import { BorderBeam } from 'border-beam'
import ChatToggle from './ChatToggle'
import ChatPanel from './ChatPanel'

export default function ChatWidget({ open = false, prefill = null, onToggle, onConsumePrefill }) {
  return (
    <>
      <div
        className={`chat-overlay${open ? ' visible' : ''}`}
        onClick={onToggle}
        aria-hidden="true"
      />

      <BorderBeam
        className="chat-beam chat-beam-toggle"
        size="sm"
        colorVariant="colorful"
        theme="dark"
        duration={3}
      >
        <ChatToggle open={open} onToggle={onToggle} />
      </BorderBeam>

      <BorderBeam
        className="chat-beam chat-beam-panel"
        size="md"
        colorVariant="sunset"
        theme="light"
        duration={3.4}
        active={open}
      >
        <ChatPanel
          open={open}
          prefill={prefill}
          onClose={onToggle}
          onConsumePrefill={onConsumePrefill}
        />
      </BorderBeam>
    </>
  )
}