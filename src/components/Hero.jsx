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
  const btnRefs = useRef([])

  /* Typewriter */
  useEffect(() => {
    const target = ROLES[roleIdx]
    let t
    if (!deleting && displayed.length < target.length)
      t = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 78)
    else if (!deleting && displayed.length === target.length)
      t = setTimeout(() => setDeleting(true), 2100)
    else if (deleting && displayed.length > 0)
      t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 36)
    else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setRoleIdx(i => (i + 1) % ROLES.length)
    }
    return () => clearTimeout(t)
  }, [displayed, deleting, roleIdx])

  /* Magnetic buttons */
  useEffect(() => {
    const cleanup = btnRefs.current.filter(Boolean).map(btn => {
      const onMove = (e) => {
        const r = btn.getBoundingClientRect()
        const x = (e.clientX - r.left - r.width  / 2) * 0.25
        const y = (e.clientY - r.top  - r.height / 2) * 0.25
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
    <section id="hero" className="relative min-h-screen flex flex-col justify-center px-6 pt-24 pb-12 z-10 overflow-hidden">

      {/* Ambient bg shapes */}
      <div className="floating-shape" style={{ width:400, height:400, background:'rgba(155,122,244,0.07)', top:'-120px', right:'-100px', animationDelay:'0s' }} />
      <div className="floating-shape" style={{ width:300, height:300, background:'rgba(200,255,0,0.04)',   bottom:'0',   left:'-80px',  animationDelay:'3s'  }} />

      <div className="max-w-6xl mx-auto w-full">

        {/* Top row: badge + role tag */}
        <div
          className="flex flex-wrap items-center justify-between gap-4 mb-10"
          style={{ animation: 'fadeUp .8s ease both' }}
        >
          <div className="hero-badge">
            <span className="badge-dot" />
            <span>Available for internships &amp; AI/ML opportunities</span>
          </div>
          <div
            className="font-mono text-xs tracking-widest hidden sm:block"
            style={{ color: 'var(--muted)' }}
          >
            BASED IN INDIA · GWALIOR
          </div>
        </div>

        {/* ── Main grid: text 60% | photo 40% ── */}
        <div className="grid md:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-start">

          {/* LEFT: Text stack */}
          <div style={{ animation: 'fadeUp .85s .12s ease both', animationFillMode: 'both' }}>

            {/* MASSIVE name */}
            <h1
              className="font-display font-extrabold leading-none mb-4 tracking-tight"
              style={{ fontSize: 'clamp(3.8rem, 9.5vw, 7.5rem)', letterSpacing: '-0.03em' }}
            >
              <span className="block" style={{ color: 'var(--text)' }}>Hariom</span>
              <span className="block gradient-text">Gourh</span>
            </h1>

            {/* Typewriter role */}
            <div
              className="flex items-center gap-2 mb-7"
              style={{ color: 'var(--accent)', fontFamily: "'JetBrains Mono', monospace", fontSize: '1rem', minHeight: '1.8rem' }}
            >
              <span style={{ color: 'var(--muted)' }}>/</span>
              <span>{displayed}</span>
              <span style={{ animation: 'blink 1s step-end infinite' }}>▌</span>
            </div>

            {/* Divider line */}
            <div style={{ width: 60, height: 2, background: 'linear-gradient(90deg, var(--lime), transparent)', marginBottom: '1.5rem' }} />

            {/* Description */}
            <p
              className="text-base max-w-xl mb-8"
              style={{ color: 'var(--muted)', lineHeight: 1.85, fontSize: 'clamp(.9rem, 1.8vw, 1.05rem)' }}
            >
              I build{' '}
              <strong style={{ color: 'var(--text)', fontWeight: 600 }}>AI-powered solutions</strong>
              {' '}using Machine Learning, Data Analysis and real-world datasets.
              Focused on DSA, Python and building real-world AI projects in
              Agriculture and Automation.
            </p>

            {/* CTA row */}
            <div className="flex flex-wrap gap-4 mb-12">
              <a href="#projects" className="btn-primary" ref={el => (btnRefs.current[0] = el)}>
                <span>View My Work →</span>
              </a>
              <a href="#contact" className="btn-secondary" ref={el => (btnRefs.current[1] = el)}>
                Get in Touch
              </a>
            </div>

            {/* Stats row */}
            <div
              className="flex flex-wrap gap-10"
              style={{ paddingTop: '1.5rem', borderTop: '1px solid var(--line)' }}
            >
              {[
                { num: '3+', label: 'Projects Built' },
                { num: '1+', label: 'Years Learning' },
                { num: '5+', label: 'Technologies' },
              ].map(s => (
                <div key={s.label} className="stat-item">
                  <span className="stat-num">{s.num}</span>
                  <span className="stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Profile image with spinning border */}
          <div
            className="flex justify-center items-start md:items-center"
            style={{ animation: 'fadeUp .85s .25s ease both', animationFillMode: 'both', paddingTop: '0.5rem' }}
          >
            <div className="profile-ring-wrap" style={{ width: 'clamp(220px, 30vw, 310px)', height: 'clamp(260px, 36vw, 370px)' }}>
              <div
                className="profile-ring-inner"
                style={{ width: '100%', height: '100%' }}
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
                      background: 'linear-gradient(135deg, var(--bg3), var(--surface))',
                      fontFamily: "'Syne', sans-serif", fontWeight: 800,
                      fontSize: '3.5rem', color: 'var(--accent)',
                    }}
                  >
                    HG
                  </div>
                )}
              </div>
              {/* Floating label on profile */}
              <div
                style={{
                  position: 'absolute', bottom: -14, left: '50%', transform: 'translateX(-50%)',
                  background: 'var(--surface)', border: '1px solid var(--line)',
                  borderRadius: 50, padding: '.35rem 1rem', whiteSpace: 'nowrap',
                  fontFamily: "'JetBrains Mono', monospace", fontSize: '.74rem',
                  color: 'var(--lime)', boxShadow: '0 4px 16px rgba(0,0,0,.4)',
                  display: 'flex', alignItems: 'center', gap: '.4rem',
                  zIndex: 10,
                }}
              >
                <span
                  style={{ width: 6, height: 6, background: 'var(--green)', borderRadius: '50%', boxShadow: '0 0 6px var(--green)' }}
                />
                Fresher | AI/ML Projects
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="flex flex-col items-start gap-2 mt-16"
          style={{ animation: 'fadeUp .85s .8s ease both', animationFillMode: 'both' }}
        >
          <span className="font-mono text-[10px] tracking-[3.5px]" style={{ color: 'var(--muted)' }}>SCROLL</span>
          <div className="scroll-line-anim" />
        </div>
      </div>
    </section>
  )
}
