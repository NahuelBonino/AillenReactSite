import { useState } from 'react'
import ChatToggle from './ChatToggle'
import ChatPanel from './ChatPanel'

export default function ChatWidget() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <ChatToggle open={open} onToggle={() => setOpen(prev => !prev)} />
      <ChatPanel open={open} onClose={() => setOpen(false)} />
    </>
  )
}