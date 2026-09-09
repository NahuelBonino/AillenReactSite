export default function CtaButtons({ buttons = [] }) {
  return (
    <ul className="actions">
      {buttons.map((button, idx) => (
        <li key={idx}>
          <a
            href={button.url}
            className={`button large ${button.primary ? 'primary' : ''}`.trim()}
            target="_blank"
            rel="noopener noreferrer"
          >
            {button.label}
          </a>
        </li>
      ))}
    </ul>
  )
}