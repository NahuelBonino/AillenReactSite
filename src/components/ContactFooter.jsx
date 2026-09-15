export default function ContactFooter({ socials = [], ushas }) {
  return (
    <div className="contact-socials">
      <ul className="icons">
        {socials.map((social, idx) => (
          <li key={idx}>
            <a href={social.url} className={`icon brands ${social.icon}`} aria-label={social.label} target="_blank" rel="noopener noreferrer">
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