import { useRef } from 'react'
import useTiktokEmbed from '../hooks/useTiktokEmbed'

export default function TikTokEmbed({ tiktokUrl }) {
  const wrapRef = useRef(null)
  const { embedHtml, metadata, error } = useTiktokEmbed({ tiktokUrl, triggerRef: wrapRef })

  return (
    <div className="tiktok-embed-wrap" ref={wrapRef}>
      {error && (
        <div className="tiktok-placeholder">
          {metadata?.thumbnail_url && (
            <img src={metadata.thumbnail_url} alt={metadata.title || 'Video de TikTok'} style={{ width: '100%' }} />
          )}
          <p>Video de TikTok</p>
        </div>
      )}
      {embedHtml && (
        <div dangerouslySetInnerHTML={{ __html: embedHtml }} />
      )}
    </div>
  )
}