import { useEffect, useRef, useState } from 'react'

/*
 * ─────────────────────────────────────────────
 *  HOW TO ADD YOUR OWN PHOTO
 * ─────────────────────────────────────────────
 *  1. Copy your photo into:  src/assets/profile.jpg
 *  2. Uncomment the import below (line 16)
 *  3. Delete / comment out the placeholder line (line 19)
 * ─────────────────────────────────────────────
 */
import profileImg from '../assets/profile.png'  // ← UNCOMMENT THIS

/* Placeholder: a nice gradient avatar shows until you add your photo */
// const profileImg = null  // ← DELETE this line when you import your photo

/* Roles cycled by the typewriter */
const ROLES = [
  'AI/ML Engineer',
  'Data Science Learner',
  'DSA Enthusiast',
  'Problem Solver',
]

export default function Hero() {
  /* ── Typewriter state ── */
  const [roleIdx,   setRoleIdx]   = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting,  setDeleting]  = useState(false)

  /* ── Image fallback ── */
  const [imgError, setImgError] = useState(false)

  /* ── Typewriter effect ── */
  useEffect(() => {
    const target = ROLES[roleIdx]
    let timeout
    if (!deleting && displayed.length < target.length) {
      timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 80)
    } else if (!deleting && displayed.length === target.length) {
      timeout = setTimeout(() => setDeleting(true), 2200)
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 38)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setRoleIdx(i => (i + 1) % ROLES.length)
    }
    return () => clearTimeout(timeout)
  }, [displayed, deleting, roleIdx])

  /* ── Magnetic button effect ── */
  const magneticRefs = useRef([])
  useEffect(() => {
    const cleanup = magneticRefs.current.filter(Boolean).map(btn => {
      const onMove = (e) => {
        const r = btn.getBoundingClientRect()
        const x = (e.clientX - r.left - r.width  / 2) * 0.28
        const y = (e.clientY - r.top  - r.height / 2) * 0.28
        btn.style.transform = `translate(${x}px,${y}px) translateY(-3px)`
      }
      const onLeave = () => { btn.style.transform = '' }
      btn.addEventListener('mousemove', onMove)
      btn.addEventListener('mouseleave', onLeave)
      return () => { btn.removeEventListener('mousemove', onMove); btn.removeEventListener('mouseleave', onLeave) }
    })
    return () => cleanup.forEach(fn => fn())
  }, [])

  const showInitials = !profileImg || imgError

  return (
    <section id="hero" className="relative min-h-screen flex items-center px-6 pt-28 pb-16 z-10">

      {/* ── Background blobs ── */}
      <div className="floating-shape" style={{ width:320,height:320, background:'rgba(8,145,178,0.07)',   top:'-80px', right:'-80px',  animationDelay:'0s' }} />
      <div className="floating-shape" style={{ width:220,height:220, background:'rgba(124,58,237,0.06)', bottom:'8%', left:'-60px',   animationDelay:'2s' }} />
      <div className="floating-shape" style={{ width:160,height:160, background:'rgba(225,29,72,0.05)',  top:'40%',  right:'6%',      animationDelay:'4s' }} />

      {/* ══ Two-column layout ══ */}
      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-14 lg:gap-20 items-center">

        {/* ── LEFT: Text content ── */}
        <div className="order-2 md:order-1">

          {/* Status badge */}
          <div className="hero-badge mb-7 w-fit" style={{ animation:'fadeUp 0.9s ease both' }}>
            <span className="badge-dot" />
            <span>Available for internships &amp; AI/ML opportunities</span>
          </div>

          {/* Headline */}
          <h1
            className="font-display font-extrabold leading-none mb-4"
            style={{ fontSize:'clamp(2.8rem,7vw,5.5rem)', animation:'fadeUp 0.9s 0.15s ease both', animationFillMode:'both' }}
          >
            <span className="block" style={{ color:'var(--text)' }}>Hello, I'm</span>
            <span className="block gradient-text">Hariom Gourh</span>
          </h1>

          {/* Typewriter role */}
          <div
            className="font-mono text-lg mb-5"
            style={{ color:'var(--cyan)', animation:'fadeUp 0.9s 0.3s ease both', animationFillMode:'both', minHeight:'2rem' }}
          >
            &lt;&nbsp;
            <span>{displayed}</span>
            <span style={{ animation:'blink 1s step-end infinite' }}>|</span>
            &nbsp;/&gt;
          </div>

          {/* Description */}
          <p
            className="text-lg leading-relaxed mb-8 max-w-lg"
            style={{ color:'var(--muted)', animation:'fadeUp 0.9s 0.45s ease both', animationFillMode:'both' }}
          >
            I build{' '}
            <strong style={{ color:'var(--text)' }}>AI-powered solutions</strong>
            {' '}using Machine Learning, Data Analysis and real-world datasets.

Focused on DSA, Python and building real-world AI projects in Agriculture and Automation.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-wrap gap-4"
            style={{ animation:'fadeUp 0.9s 0.6s ease both', animationFillMode:'both' }}
          >
            <a href="#projects" className="btn-primary" ref={el => (magneticRefs.current[0] = el)}>
              <span>View My Work →</span>
            </a>
            <a href="#contact" className="btn-secondary" ref={el => (magneticRefs.current[1] = el)}>
              Get in Touch
            </a>
          </div>

          {/* Scroll hint */}
          <div
            className="flex flex-col items-start gap-2 mt-12"
            style={{ animation:'fadeUp 0.9s 0.9s ease both', animationFillMode:'both' }}
          >
            <span className="font-mono text-xs tracking-[3px]" style={{ color:'var(--muted)' }}>SCROLL DOWN</span>
            <div className="scroll-line-anim" />
          </div>
        </div>

        {/* ── RIGHT: Profile photo ── */}
        <div
          className="order-1 md:order-2 flex justify-center items-center"
          style={{ animation:'fadeUp 0.9s 0.2s ease both', animationFillMode:'both' }}
        >
          <div className="relative flex justify-center items-center" style={{ width:380, height:380 }}>

            {/* Spinning conic gradient ring */}
            <div
              className="absolute rounded-full animate-[ringSpin_5s_linear_infinite]"
              style={{
                width:348, height:348,
                background:'conic-gradient(from 0deg, var(--cyan), var(--violet), var(--coral), var(--amber), var(--cyan))',
                padding:3,
              }}
            />
            {/* Gap ring (matches bg) */}
            <div className="absolute rounded-full" style={{ width:334, height:334, background:'var(--bg)' }} />

            {/* Outer dashed ring */}
            <div
              className="absolute rounded-full animate-[ringSpin_12s_linear_infinite_reverse]"
              style={{ width:376, height:376, border:'1px dashed rgba(8,145,178,0.3)' }}
            />

            {/* Violet glow blob */}
            <div
              className="absolute rounded-full"
              style={{ width:290, height:290, background:'radial-gradient(circle,rgba(124,58,237,0.1) 0%,transparent 70%)', filter:'blur(30px)' }}
            />

            {/* ── Profile image ── */}
            <div
              className="absolute rounded-full overflow-hidden z-10"
              style={{
                width:330,
                height:330,
                top:'50%',
                left:'50%',
                transform:'translate(-50%, -50%)'
              }}
            >
              <img
                src={profileImg}
                alt="Hariom Gourh"
                className="w-full h-full object-cover object-[center_top]"
                onError={() => setImgError(true)}
              />
            </div>

            {/* ── Floating badge: experience ── */}
            <div
              className="glass-card absolute flex items-center gap-2 text-sm font-mono px-4 py-2 z-20"
              style={{ bottom:-210, right: -80, borderRadius:50, transform:'none' }}
            >
              <span style={{ color:'var(--cyan)' }}>⚡</span>
              <span>Fresher | AI/ML Projects</span>
            </div>

            {/* ── Floating badge: open to work ── */}
            <div
              className="glass-card absolute flex items-center gap-2 text-sm font-mono px-4 py-2 z-20"
              style={{ top:40, left: 50, borderRadius:50, transform:'none' }}
            >
              <span className="badge-dot" />
              <span>Open to work</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
