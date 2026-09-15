export default function CtaButtons({ buttons = [], onPrimaryClick }) {
  return (
    <ul className="actions">
      {buttons.map((button, idx) => {
        const isPrimary = Boolean(button.primary)
        const onClick = isPrimary && onPrimaryClick
          ? (e) => {
              e.preventDefault()
              onPrimaryClick()
            }
          : undefined

        return (
          <li key={idx}>
            <a
              href={button.url}
              className={`button large ${isPrimary ? 'primary' : ''}`.trim()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClick}
            >
              {button.label}
            </a>
          </li>
        )
      })}
    </ul>
  )
}