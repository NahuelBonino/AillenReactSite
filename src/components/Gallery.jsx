import { useEffect, useState } from 'react'

export default function Gallery({ images }) {
  const [activeImage, setActiveImage] = useState(null)
  const [loaded, setLoaded] = useState(false)

  const openLightbox = (image) => {
    setActiveImage(image)
    setLoaded(false)
    setTimeout(() => setLoaded(true), 275)
  }

  const closeLightbox = () => {
    setLoaded(false)
    setTimeout(() => setActiveImage(null), 100)
  }

  useEffect(() => {
    if (activeImage === null) return
    document.body.style.overflow = 'hidden'
    const handleKey = (e) => {
      if (e.key === 'Escape') closeLightbox()
    }
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [activeImage])

  return (
    <>
      <div className="gallery">
        {images.map((image, idx) => (
          <a
            key={idx}
            href={image.full}
            className={`${image.landscape ? 'landscape' : ''} ${image.portrait ? 'portrait' : ''}`}
            onClick={(e) => {
              e.preventDefault()
              openLightbox(image)
            }}
          >
            <img src={image.src} alt={`Galería ${idx + 1}`} className="image-hover" />
          </a>
        ))}
      </div>

      {activeImage && (
        <div
          id="lightbox"
          className={loaded ? 'visible loaded' : 'visible'}
          onClick={(e) => {
            if (e.target.id === 'lightbox') closeLightbox()
          }}
        >
          <div className="spinner" style={{ display: loaded ? 'none' : 'block' }}></div>
          <img
            src={activeImage.full}
            alt="Vista completa"
            className={loaded ? 'loaded' : ''}
          />
          <button className="close" onClick={closeLightbox} aria-label="Cerrar">
            <svg viewBox="0 0 512 512">
              <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z" />
            </svg>
          </button>
        </div>
      )}
    </>
  )
}