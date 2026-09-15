import StatCounter from './StatCounter'

/** Métricas de comunidad (Instagram / TikTok). */
export default function SocialStats({ stats = [] }) {
  if (!stats.length) return null

  return (
    <ul className="stat-cards">
      {stats.map((stat, index) => (
        <StatCounter key={stat.label} delay={index * 0.12} {...stat} />
      ))}
    </ul>
  )
}
