import { useEffect, useRef, useState } from 'react'
import profileImg from '../assets/profile.png'

const ROLES = ['AI/ML Engineer','Data Science Learner','DSA Enthusiast','Problem Solver']

export default function Hero() {
  const [roleIdx,   setRoleIdx]   = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting,  setDeleting]  = useState(false)
  const [imgError,  setImgError]  = useState(false)
  const btnRefs = useRef([])

  useEffect(() => {
    const target = ROLES[roleIdx]; let t
    if (!deleting && displayed.length < target.length)
      t = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 78)
    else if (!deleting && displayed.length === target.length)
      t = setTimeout(() => setDeleting(true), 2100)
    else if (deleting && displayed.length > 0)
      t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 36)
    else { setDeleting(false); setRoleIdx(i => (i + 1) % ROLES.length) }
    return () => clearTimeout(t)
  }, [displayed, deleting, roleIdx])

  useEffect(() => {
    const cleanup = btnRefs.current.filter(Boolean).map(btn => {
      const mv = e => {
        const r = btn.getBoundingClientRect()
        btn.style.transform = `translate(${(e.clientX-r.left-r.width/2)*.25}px,${(e.clientY-r.top-r.height/2)*.25}px) translateY(-3px)`
      }
      const lv = () => { btn.style.transform = '' }
      btn.addEventListener('mousemove', mv); btn.addEventListener('mouseleave', lv)
      return () => { btn.removeEventListener('mousemove', mv); btn.removeEventListener('mouseleave', lv) }
    })
    return () => cleanup.forEach(fn => fn())
  }, [])

  /* Image size responsive */
  const IMG_W = 'clamp(240px, 28vw, 320px)'
  const IMG_H = 'clamp(290px, 34vw, 390px)'

  return (
    <section id="hero" className="relative min-h-screen flex items-center px-6 pt-24 pb-16 z-10 overflow-hidden">

      {/* Ambient blobs */}
      <div className="floating-shape" style={{ width:380, height:380, background:'rgba(139,92,246,.09)', top:'-80px', right:'-80px', animationDelay:'0s' }} />
      <div className="floating-shape" style={{ width:260, height:260, background:'rgba(0,217,255,.06)',  bottom:'5%', left:'-60px', animationDelay:'2.5s' }} />
      <div className="floating-shape" style={{ width:200, height:200, background:'rgba(244,114,182,.05)', top:'45%', right:'8%', animationDelay:'5s' }} />

      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* ── LEFT ── */}
        <div className="order-2 md:order-1">

          {/* Available badge */}
          <div className="glow-chip mb-6 w-fit" style={{ animation:'fadeUp .8s ease both' }}>
            <span className="badge-dot" />
            Available for internships &amp; AI/ML opportunities
          </div>

          {/* Name */}
          <h1
            className="font-display font-extrabold leading-none mb-4"
            style={{
              fontSize: 'clamp(3rem, 7.5vw, 5.8rem)',
              letterSpacing: '-0.035em',
              animation: 'fadeUp .85s .12s ease both',
              animationFillMode: 'both',
            }}
          >
            <span
              className="block text-sm font-mono font-normal tracking-[.18em] mb-3"
              style={{ color: 'var(--muted)', fontSize: '.8rem', letterSpacing: '.2em' }}
            >
              HELLO, I'M
            </span>
            <span className="block" style={{ color: 'var(--text)' }}>Hariom</span>
            <span className="block gradient-text">Gourh</span>
          </h1>

          {/* Typewriter */}
          <div
            className="flex items-center gap-2 mb-6"
            style={{
              color: 'var(--cyan)', fontFamily: "'JetBrains Mono', monospace",
              fontSize: '1.05rem', minHeight: '1.8rem',
              animation: 'fadeUp .85s .28s ease both', animationFillMode: 'both',
            }}
          >
            <span style={{ color: 'var(--violet)', opacity: .7 }}>&lt;</span>
            <span>{displayed}</span>
            <span style={{ animation: 'blink 1s step-end infinite', color: 'var(--violet)' }}>|</span>
            <span style={{ color: 'var(--violet)', opacity: .7 }}>/&gt;</span>
          </div>

          {/* Separator line */}
          <div
            className="mb-7"
            style={{ width: 64, height: 2, background: 'linear-gradient(90deg, var(--cyan), var(--violet))', borderRadius: 2, boxShadow: '0 0 12px var(--cyan-glow)', animation: 'fadeUp .85s .4s ease both', animationFillMode: 'both' }}
          />

          {/* Description */}
          <p
            className="text-base max-w-lg mb-8"
            style={{
              color: 'var(--text2)', lineHeight: 1.85,
              animation: 'fadeUp .85s .5s ease both', animationFillMode: 'both',
            }}
          >
            I build{' '}
            <strong style={{ color: 'var(--text)', fontWeight: 600 }}>AI-powered solutions</strong>
            {' '}using Machine Learning, Data Analysis and real-world datasets.
            Focused on DSA, Python and building real-world AI projects in Agriculture and Automation.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-wrap gap-4 mb-12"
            style={{ animation: 'fadeUp .85s .65s ease both', animationFillMode: 'both' }}
          >
            <a href="#projects" className="btn-primary" ref={el => (btnRefs.current[0] = el)}>
              <span>View My Work →</span>
            </a>
            <a href="#contact" className="btn-secondary" ref={el => (btnRefs.current[1] = el)}>
              Get in Touch
            </a>
          </div>

          {/* Scroll hint */}
          <div
            className="flex flex-col items-start gap-2"
            style={{ animation: 'fadeUp .85s .85s ease both', animationFillMode: 'both' }}
          >
            <span className="font-mono text-[10px] tracking-[3.5px]" style={{ color: 'var(--muted)' }}>SCROLL DOWN</span>
            <div className="scroll-line-anim" />
          </div>
        </div>

        {/* ── RIGHT: Image + glow rings ── */}
        <div
          className="order-1 md:order-2 flex justify-center items-center"
          style={{ animation: 'fadeUp .9s .2s ease both', animationFillMode: 'both' }}
        >
          <div className="hero-image-wrap" style={{ width: IMG_W, height: IMG_H }}>

            {/* Large violet ambient glow — handled by ::before in CSS */}

            {/* Outermost dashed orbit ring */}
            <div className="ring-spin-r" style={{ width: '135%', height: '135%' }} />

            {/* Outer spinning conic ring */}
            <div className="ring-spin" style={{ width: '115%', height: '115%', padding: 2, zIndex: 1 }}>
              <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'var(--bg)' }} />
            </div>

            {/* Second ring */}
            <div
              className="ring-spin-r"
              style={{ width: '105%', height: '105%', border: '1px solid rgba(0,217,255,.18)', zIndex: 1 }}
            />

            {/* Orbiting cyan dot */}
            <div className="orbit-dot" style={{ width: '120%', height: '120%', zIndex: 3 }} />

            {/* Orbiting violet dot */}
            <div className="orbit-dot-2" style={{ width: '108%', height: '108%', zIndex: 3 }} />

            {/* CORE IMAGE */}
            <div
              className="hero-img-inner"
              style={{
                width: '88%', height: '88%',
                position: 'relative', zIndex: 2,
                animation: 'heroFloat 5s ease-in-out infinite',
              }}
            >
              {!imgError && profileImg ? (
                <img
                  src={profileImg}
                  alt="Hariom Gourh"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
                  onError={() => setImgError(true)}
                />
              ) : (
                <div
                  style={{
                    width: '100%', height: '100%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'linear-gradient(135deg, var(--bg3), rgba(139,92,246,.15))',
                    fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: '3.5rem',
                    color: 'var(--cyan)',
                  }}
                >
                  HG
                </div>
              )}
              {/* Inner bottom glow */}
              <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'40%', background:'linear-gradient(to top, rgba(139,92,246,.18), transparent)', pointerEvents:'none' }} />
            </div>

            {/* Floating stat card: bottom-right */}
            <div
              className="float-card"
              style={{ bottom: '4%', right: '-16%', minWidth: 140 }}
            >
              <div style={{ display:'flex', alignItems:'center', gap:'.4rem', marginBottom:'.25rem' }}>
                <span className="badge-dot" />
                <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'.68rem', color:'var(--muted)', letterSpacing:'1.5px', textTransform:'uppercase' }}>Status</span>
              </div>
              <div style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:600, fontSize:'.82rem', color:'var(--text)' }}>Open to Work</div>
            </div>

            {/* Floating stat card: top-left */}
            <div
              className="float-card float-card-r"
              style={{ top: '8%', left: '-14%', minWidth: 132 }}
            >
              <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'.68rem', color:'var(--cyan)', marginBottom:'.25rem', letterSpacing:'1.5px' }}>⚡ FRESHER</div>
              <div style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:600, fontSize:'.82rem', color:'var(--text)' }}>AI/ML Projects</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
