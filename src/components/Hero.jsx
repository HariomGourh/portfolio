import { useEffect, useRef, useState } from 'react'
import profileImg from '../assets/profile.png'

const ROLES = [
  'AI/ML Engineer',
  'Data Science Learner',
  'DSA Enthusiast',
  'Problem Solver',
]

export default function Hero() {
  const [roleIdx,   setRoleIdx]   = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting,  setDeleting]  = useState(false)
  const [imgError,  setImgError]  = useState(false)
  const magneticRefs = useRef([])

  /* ── Typewriter ── */
  useEffect(() => {
    const target = ROLES[roleIdx]
    let t
    if (!deleting && displayed.length < target.length) {
      t = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 80)
    } else if (!deleting && displayed.length === target.length) {
      t = setTimeout(() => setDeleting(true), 2200)
    } else if (deleting && displayed.length > 0) {
      t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 38)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setRoleIdx(i => (i + 1) % ROLES.length)
    }
    return () => clearTimeout(t)
  }, [displayed, deleting, roleIdx])

  /* ── Magnetic CTA buttons ── */
  useEffect(() => {
    const cleanup = magneticRefs.current.filter(Boolean).map(btn => {
      const onMove = (e) => {
        const r = btn.getBoundingClientRect()
        const x = (e.clientX - r.left - r.width  / 2) * 0.26
        const y = (e.clientY - r.top  - r.height / 2) * 0.26
        btn.style.transform = `translate(${x}px,${y}px) translateY(-3px)`
      }
      const onLeave = () => { btn.style.transform = '' }
      btn.addEventListener('mousemove', onMove)
      btn.addEventListener('mouseleave', onLeave)
      return () => { btn.removeEventListener('mousemove', onMove); btn.removeEventListener('mouseleave', onLeave) }
    })
    return () => cleanup.forEach(fn => fn())
  }, [])

  return (
    <section id="hero" className="relative min-h-screen flex items-center px-6 pt-28 pb-16 z-10">

      {/* Ambient blobs */}
      <div className="floating-shape" style={{ width:340,height:340, background:'rgba(56,189,248,0.07)',   top:'-60px',  right:'-60px',  animationDelay:'0s'  }} />
      <div className="floating-shape" style={{ width:240,height:240, background:'rgba(167,139,250,0.07)', bottom:'10%', left:'-50px',   animationDelay:'2.2s'}} />
      <div className="floating-shape" style={{ width:180,height:180, background:'rgba(251,113,133,0.06)', top:'38%',    right:'5%',     animationDelay:'4s'  }} />

      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-14 lg:gap-20 items-center">

        {/* ── LEFT: Text ── */}
        <div className="order-2 md:order-1">

          {/* Badge */}
          <div className="hero-badge mb-6 w-fit" style={{ animation:'fadeUp .9s ease both' }}>
            <span className="badge-dot" />
            <span>Available for internships &amp; AI/ML opportunities</span>
          </div>

          {/* Name headline */}
          <h1
            className="font-display font-extrabold leading-[1.02] mb-4"
            style={{
              fontSize: 'clamp(2.8rem,7vw,5.4rem)',
              animation: 'fadeUp .9s .15s ease both',
              animationFillMode: 'both',
            }}
          >
            <span className="block" style={{ color:'var(--text)', opacity:.65, fontSize:'0.55em', fontWeight:600, letterSpacing:'.05em', fontFamily:"'JetBrains Mono',monospace", marginBottom:'.3em' }}>
              HELLO, I'M
            </span>
            <span className="block gradient-text">Hariom Gourh</span>
          </h1>

          {/* Typewriter */}
          <div
            className="font-mono text-base mb-6 flex items-center gap-1"
            style={{ color:'var(--cyan)', animation:'fadeUp .9s .3s ease both', animationFillMode:'both', minHeight:'1.8rem' }}
          >
            <span style={{ opacity:.5 }}>&lt;</span>
            <span>{displayed}</span>
            <span style={{ animation:'blink 1s step-end infinite' }}>|</span>
            <span style={{ opacity:.5 }}>/&gt;</span>
          </div>

          {/* Description */}
          <p
            className="text-base leading-relaxed mb-8 max-w-lg"
            style={{ color:'var(--muted)', animation:'fadeUp .9s .45s ease both', animationFillMode:'both', lineHeight:1.8 }}
          >
            I build{' '}
            <strong style={{ color:'var(--text)', fontWeight:600 }}>AI-powered solutions</strong>
            {' '}using Machine Learning, Data Analysis and real-world datasets.
            Focused on DSA, Python and building real-world AI projects in Agriculture and Automation.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-wrap gap-4"
            style={{ animation:'fadeUp .9s .6s ease both', animationFillMode:'both' }}
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
            style={{ animation:'fadeUp .9s .9s ease both', animationFillMode:'both' }}
          >
            <span className="font-mono text-[10px] tracking-[3px]" style={{ color:'var(--muted)' }}>SCROLL</span>
            <div className="scroll-line-anim" />
          </div>
        </div>

        {/* ── RIGHT: Profile ── */}
        <div
          className="order-1 md:order-2 flex justify-center items-center"
          style={{ animation:'fadeUp .9s .2s ease both', animationFillMode:'both' }}
        >
          <div className="relative flex justify-center items-center" style={{ width:380, height:380 }}>

            {/* Outer dashed orbit */}
            <div
              className="absolute rounded-full"
              style={{
                width:376, height:376,
                border:'1px dashed rgba(56,189,248,0.22)',
                animation:'ringSpin 18s linear infinite',
              }}
            />

            {/* Spinning gradient ring */}
            <div
              className="absolute rounded-full"
              style={{
                width:348, height:348,
                background:'conic-gradient(from 0deg,var(--cyan),var(--violet),var(--coral),var(--amber),var(--cyan))',
                padding:3,
                animation:'ringSpin 5s linear infinite',
              }}
            />

            {/* BG disc (covers inner ring stroke) */}
            <div className="absolute rounded-full" style={{ width:334, height:334, background:'var(--bg)' }} />

            {/* Glow blob */}
            <div
              className="absolute rounded-full"
              style={{
                width:280, height:280,
                background:'radial-gradient(circle,rgba(167,139,250,.2) 0%,transparent 70%)',
                filter:'blur(28px)',
              }}
            />

            {/* Profile image */}
            <div
              className="absolute rounded-full overflow-hidden z-10"
              style={{ width:328, height:328, top:'50%', left:'50%', transform:'translate(-50%,-50%)' }}
            >
              {!imgError && profileImg ? (
                <img
                  src={profileImg}
                  alt="Hariom Gourh"
                  className="w-full h-full object-cover object-[center_top]"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center font-display font-extrabold text-5xl text-white"
                  style={{ background:'linear-gradient(135deg,var(--cyan),var(--violet))' }}
                >
                  HG
                </div>
              )}
            </div>

            {/* Badge: status */}
            <div
              className="glass-card absolute flex items-center gap-2 text-sm font-mono px-4 py-2 z-20"
              style={{ bottom:-30, right:-70, borderRadius:50 }}
            >
              <span style={{ color:'var(--cyan)' }}>⚡</span>
              <span style={{ color:'var(--text)' }}>Fresher | AI/ML Projects</span>
            </div>

            {/* Badge: open to work */}
            <div
              className="glass-card absolute flex items-center gap-2 text-sm font-mono px-4 py-2 z-20"
              style={{ top:30, left:30, borderRadius:50 }}
            >
              <span className="badge-dot" />
              <span style={{ color:'var(--text)' }}>Open to work</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
