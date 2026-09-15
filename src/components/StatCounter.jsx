import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView, useReducedMotion } from 'motion/react'

const format = (value, decimals) =>
  value.toLocaleString('es-UY', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })

export default function StatCounter({ icon, label, value, suffix = '', decimals = 0, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const reducedMotion = useReducedMotion()
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return undefined

    if (reducedMotion) {
      setCount(value)
      return undefined
    }

    const controls = animate(0, value, {
      duration: 2,
      ease: 'easeOut',
      onUpdate: (latest) => setCount(latest),
    })

    return () => controls.stop()
  }, [inView, reducedMotion, value])

  return (
    <motion.li
      ref={ref}
      className="stat-card"
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.5, ease: 'easeOut', delay }}
    >
      <motion.span
        className={`icon brands ${icon} stat-icon`}
        aria-hidden="true"
        initial={{ scale: 1 }}
        animate={inView && !reducedMotion ? { scale: [1, 1.2, 1, 1.2, 1] } : undefined}
        transition={{
          duration: 2,
          times: [0, 0.25, 0.5, 0.75, 1],
          ease: 'easeInOut',
          delay,
        }}
      />
      <p className="stat-value" aria-hidden="true">
        {format(count, decimals)}
        {suffix}
      </p>
      <p className="stat-label">{label}</p>
      <span className="sr-only">
        {label}: {format(value, decimals)}
        {suffix}
      </span>
    </motion.li>
  )
}
