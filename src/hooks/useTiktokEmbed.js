import { useEffect, useState } from 'react'

export default function useTiktokEmbed({ tiktokUrl, triggerRef }) {
  const [visible, setVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [metadata, setMetadata] = useState(null)

  const shouldLoad = !tiktokUrl || tiktokUrl.startsWith('TIKTOK_VIDEO_URL')

  // Detecta mobile (<=736px): ahí se muestra tarjeta con thumbnail en vez de iframe
  useEffect(() => {
    if (shouldLoad) return
    const mq = window.matchMedia('(max-width: 736px)')
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener?.('change', update)
    return () => mq.removeEventListener?.('change', update)
  }, [tiktokUrl, shouldLoad])

  // Metadata (thumbnail) por oEmbed — se usa en la tarjeta mobile / fallback
  useEffect(() => {
    if (shouldLoad) return
    let alive = true
    fetch(`https://www.tiktok.com/oembed?url=${encodeURIComponent(tiktokUrl)}`)
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => { if (alive) setMetadata(data) })
      .catch(() => {})
    return () => { alive = false }
  }, [tiktokUrl, shouldLoad])

  // Lazy load del iframe (desktop) cuando entra al viewport
  useEffect(() => {
    const el = triggerRef.current
    if (shouldLoad || isMobile || !el) return

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px 50px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [tiktokUrl, triggerRef, isMobile, shouldLoad])

  return { visible, isMobile, metadata, hasVideo: !shouldLoad }
}