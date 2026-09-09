import { useEffect } from 'react'

export default function usePrefersReducedMotion() {
  useEffect(() => {
    return () => {}
  }, [])
}

export const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches