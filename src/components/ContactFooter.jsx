function TikTokIcon() {
  return (
    <svg viewBox="0 0 448 512" aria-hidden="true">
      <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" />
    </svg>
  )
}

function SocialIcon({ icon }) {
  if (icon === 'fa-tiktok') return <TikTokIcon />
  return null
}

export default function ContactFooter({ socials = [], ushas }) {
  return (
    <div className="contact-socials">
      <ul className="icons">
        {socials.map((social, idx) => (
          <li key={idx}>
            <a href={social.url} className={`icon brands ${social.icon}`} aria-label={social.label} target="_blank" rel="noopener noreferrer">
              <SocialIcon icon={social.icon} />
              <span className="label">{social.label}</span>
            </a>
          </li>
        ))}
      </ul>
      {ushas && (
        <p className="ushas-link">
          <a href={ushas.url} target="_blank" rel="noopener noreferrer">{ushas.label}</a>
        </p>
      )}
    </div>
  )
}