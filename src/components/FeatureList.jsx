export default function FeatureList({ items }) {
  return (
    <ul className="feature-icons">
      {items.map((item, idx) => (
        <li key={idx} className={`icon solid ${item.icon}`}>
          {item.text}
        </li>
      ))}
    </ul>
  )
}