import { useEffect, useState } from 'react'

export default function useTiktokEmbed({ tiktokUrl, triggerRef }) {
  const [visible, setVisible] = useState(false)
  const [metadata, setMetadata] = useState(null)

  const shouldLoad = !tiktokUrl || tiktokUrl.startsWith('TIKTOK_VIDEO_URL')

  // Metadata (thumbnail) por oEmbed — se usa como fallback clickeable
  useEffect(() => {
    if (shouldLoad) return
    let alive = true
    fetch(`https://www.tiktok.com/oembed?url=${encodeURIComponent(tiktokUrl)}`)
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => { if (alive) setMetadata(data) })
      .catch(() => {})
    return () => { alive = false }
  }, [tiktokUrl, shouldLoad])

  // Lazy load del iframe cuando entra al viewport
  useEffect(() => {
    const el = triggerRef.current
    if (shouldLoad || !el) return

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
  }, [tiktokUrl, triggerRef, shouldLoad])

  return { visible, metadata, hasVideo: !shouldLoad }
}