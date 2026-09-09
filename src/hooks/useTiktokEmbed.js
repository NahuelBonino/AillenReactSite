import { useEffect, useRef, useState } from 'react'

export default function useTiktokEmbed({ tiktokUrl, triggerRef }) {
  const wrapRef = useRef(null)
  const [embedHtml, setEmbedHtml] = useState(null)
  const [metadata, setMetadata] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    const shouldLoad = !tiktokUrl || tiktokUrl.startsWith('TIKTOK_VIDEO_URL')

    if (shouldLoad) {
      setError(true)
      return
    }

    const loadEmbed = () => {
      fetch(`https://www.tiktok.com/oembed?url=${encodeURIComponent(tiktokUrl)}`)
        .then(res => {
          if (!res.ok) throw new Error('oEmbed failed')
          return res.json()
        })
        .then(data => {
          setMetadata(data)
          const holder = document.createElement('div')
          holder.innerHTML = data.html
          const blockquote = holder.querySelector('blockquote.tiktok-embed')
          if (blockquote) {
            setEmbedHtml(blockquote.outerHTML)
          } else {
            setError(true)
          }
        })
        .catch(() => setError(true))
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadEmbed()
          observer.disconnect()
        }
      },
      { rootMargin: "0px 0px 50px 0px" }
    )

    if (triggerRef.current) {
      observer.observe(triggerRef.current)
    }

    return () => observer.disconnect()
  }, [tiktokUrl, triggerRef])

  useEffect(() => {
    if (!embedHtml) return

    const script = document.createElement('script')
    script.async = true
    script.src = "https://www.tiktok.com/embed.js"
    script.dataset.embedLoaded = "true"
    document.body.appendChild(script)

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [embedHtml])

  return { wrapRef, embedHtml, metadata, error }
}