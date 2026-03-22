import { useEffect, useRef, useState } from 'react'

export default function Cursor() {
  const cursorRef = useRef(null)
  const trailRef  = useRef(null)
  const [hovered, setHovered] = useState(false)
  const pos = useRef({ cx:0, cy:0, tx:0, ty:0 })

  useEffect(() => {
    const onMove = e => {
      pos.current.cx = e.clientX; pos.current.cy = e.clientY
      if (cursorRef.current) { cursorRef.current.style.left=e.clientX+'px'; cursorRef.current.style.top=e.clientY+'px' }
    }
    const onLeave = () => { if(cursorRef.current) cursorRef.current.style.opacity='0'; if(trailRef.current) trailRef.current.style.opacity='0' }
    const onEnter = () => { if(cursorRef.current) cursorRef.current.style.opacity='1'; if(trailRef.current) trailRef.current.style.opacity='1' }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    let animId
    const lerp = (a,b,n) => (1-n)*a+n*b
    const loop = () => {
      pos.current.tx = lerp(pos.current.tx, pos.current.cx, .1)
      pos.current.ty = lerp(pos.current.ty, pos.current.cy, .1)
      if (trailRef.current) { trailRef.current.style.left=pos.current.tx+'px'; trailRef.current.style.top=pos.current.ty+'px' }
      animId = requestAnimationFrame(loop)
    }
    loop()

    const addH = () => setHovered(true)
    const remH = () => setHovered(false)
    const els  = document.querySelectorAll('a,button,.panel,.glass-card,.social-btn,.chip,.stack-tag,input,textarea')
    els.forEach(el => { el.addEventListener('mouseenter',addH); el.addEventListener('mouseleave',remH) })

    return () => {
      document.removeEventListener('mousemove',onMove)
      document.removeEventListener('mouseleave',onLeave)
      document.removeEventListener('mouseenter',onEnter)
      cancelAnimationFrame(animId)
      els.forEach(el => { el.removeEventListener('mouseenter',addH); el.removeEventListener('mouseleave',remH) })
    }
  }, [])

  return (
    <>
      <div className="cursor" ref={cursorRef} />
      <div className={`cursor-trail${hovered?' hovered':''}`} ref={trailRef} />
    </>
  )
}
