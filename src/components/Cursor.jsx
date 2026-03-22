import { useEffect, useRef, useState } from 'react'

/**
 * Cursor
 * ──────
 * Replaces the default OS cursor with:
 *  • A small filled dot  (tracks mouse exactly)
 *  • A larger ring       (follows with lerp lag)
 * The ring expands + glows when hovering interactive elements.
 */
export default function Cursor() {
  const cursorRef = useRef(null)
  const trailRef  = useRef(null)
  const [hovered, setHovered] = useState(false)
  const pos = useRef({ cx: 0, cy: 0, tx: 0, ty: 0 })

  useEffect(() => {
    /* ── Track mouse position ── */
    const onMove = (e) => {
      pos.current.cx = e.clientX
      pos.current.cy = e.clientY
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px'
        cursorRef.current.style.top  = e.clientY + 'px'
      }
    }
    document.addEventListener('mousemove', onMove)

    /* ── Lerp loop for the trailing ring ── */
    let animId
    const lerp = (a, b, n) => (1 - n) * a + n * b
    const loop = () => {
      pos.current.tx = lerp(pos.current.tx, pos.current.cx, 0.1)
      pos.current.ty = lerp(pos.current.ty, pos.current.cy, 0.1)
      if (trailRef.current) {
        trailRef.current.style.left = pos.current.tx + 'px'
        trailRef.current.style.top  = pos.current.ty + 'px'
      }
      animId = requestAnimationFrame(loop)
    }
    loop()

    /* ── Hover detection on interactive elements ── */
    const addH = () => setHovered(true)
    const remH = () => setHovered(false)
    const sel  = 'a, button, .glass-card, .social-btn, .chip, .stack-tag'
    const els  = document.querySelectorAll(sel)
    els.forEach(el => { el.addEventListener('mouseenter', addH); el.addEventListener('mouseleave', remH) })

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(animId)
      els.forEach(el => { el.removeEventListener('mouseenter', addH); el.removeEventListener('mouseleave', remH) })
    }
  }, [])

  return (
    <>
      <div className="cursor"                         ref={cursorRef} />
      <div className={`cursor-trail ${hovered ? 'hovered' : ''}`} ref={trailRef} />
    </>
  )
}
