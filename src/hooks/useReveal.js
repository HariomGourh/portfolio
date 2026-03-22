import { useEffect, useRef } from 'react'

/**
 * useReveal — Scroll-triggered animation hook.
 *
 * Attaches an IntersectionObserver to the returned ref.
 * When the element enters the viewport, "visible" class is added,
 * which triggers the CSS reveal transition defined in index.css
 * (.reveal, .reveal-left, .reveal-right).
 *
 * Usage:
 *   const ref = useReveal()          // fade-up
 *   const ref = useReveal('reveal-left')
 *   const ref = useReveal('reveal-right')
 *
 *   return <div ref={ref} className="reveal">...</div>
 */
export function useReveal(extraClass = '', threshold = 0.15) {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)   // fire once
        }
      },
      { threshold }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])

  return ref
}
