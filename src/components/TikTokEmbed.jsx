import { useEffect, useRef, useState } from 'react'
import useTiktokEmbed from '../hooks/useTiktokEmbed'

const getVideoId = (url) => {
  if (!url) return null
  const m = String(url).match(/(?:video\/|video%2F)(\d+)/i)
  return m ? m[1] : null
}

// Tarjeta con thumbnail (oEmbed) que abre el video en TikTok.
// Se usa en mobile y como fallback si el player embebido no carga.
function TikTokCard({ href, metadata }) {
  return (
    <a
      className="tiktok-card"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Ver video en TikTok"
    >
      {metadata?.thumbnail_url ? (
        <img src={metadata.thumbnail_url} alt={metadata?.title || 'Video de TikTok'} loading="lazy" />
      ) : (
        <span className="tiktok-card-fallback">Ver en TikTok</span>
      )}
      <span className="tiktok-play" aria-hidden="true">
        <svg viewBox="0 0 448 512">
          <path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z" />
        </svg>
      </span>
    </a>
  )
}

export default function TikTokEmbed({ tiktokUrl }) {
  const wrapRef = useRef(null)
  const videoId = getVideoId(tiktokUrl)
  const { visible, metadata, hasVideo } = useTiktokEmbed({ tiktokUrl, triggerRef: wrapRef })
  const [playerLoaded, setPlayerLoaded] = useState(false)
  const [playerFailed, setPlayerFailed] = useState(false)

  const canPlay = hasVideo && Boolean(videoId)
  const showPlayer = canPlay && visible && !playerFailed

  // Red de seguridad: si el player externo no llega a cargar (bloqueadores,
  // cookies de terceros, red), caemos a la tarjeta clickeable.
  useEffect(() => {
    if (!showPlayer || playerLoaded) return
    const timer = window.setTimeout(() => setPlayerFailed(true), 9000)
    return () => window.clearTimeout(timer)
  }, [showPlayer, playerLoaded])

  const showCard = hasVideo && (!videoId || playerFailed)

  return (
    <div className="tiktok-embed-wrap" ref={wrapRef}>
      {!hasVideo && (
        <div className="tiktok-placeholder">
          <p>Video de TikTok</p>
        </div>
      )}

      {showCard && <TikTokCard href={tiktokUrl} metadata={metadata} />}

      {showPlayer && (
        <iframe
          className="tiktok-embed-player"
          src={`https://www.tiktok.com/embed/v2/${videoId}`}
          title="Video de TikTok"
          loading="lazy"
          scrolling="no"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          onLoad={() => setPlayerLoaded(true)}
        />
      )}

      {canPlay && !visible && !playerFailed && (
        <div className="tiktok-placeholder">
          <p>Cargando video de TikTok…</p>
        </div>
      )}
    </div>
  )
}