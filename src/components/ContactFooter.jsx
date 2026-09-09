export default function ContactFooter({ contact, socials }) {
  return (
    <ul className="items">
      <li>
        <h3>Email</h3>
        <a href={`mailto:${contact.email}`}>{contact.email}</a>
      </li>
      <li>
        <h3>Phone</h3>
        <a href={`tel:${contact.phone.replace(/[^0-9]/g, '')}`}>{contact.phone}</a>
      </li>
      <li>
        <h3>Address</h3>
        <span>{contact.address}</span>
      </li>
      <li>
        <h3>Elsewhere</h3>
        <ul className="icons">
          {socials.map((social, idx) => (
            <li key={idx}>
              <a href={social.url} className={`icon brands ${social.icon}`} aria-label={social.label}>
                <span className="label">{social.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </li>
    </ul>
  )
}