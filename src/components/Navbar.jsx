import { useState, useEffect } from 'react'

const LINKS = [
  { label: 'About',    href: '#about',      id: 'about'      },
  { label: 'Skills',   href: '#skills',     id: 'skills'     },
  { label: 'Projects', href: '#projects',   id: 'projects'   },
  { label: 'Journey',  href: '#experience', id: 'experience' },
  { label: 'Contact',  href: '#contact',    id: 'contact'    },
]

const SunIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
)
const MoonIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
  </svg>
)

export default function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const [active,   setActive]     = useState('hero')

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    const ids = ['hero','about','skills','projects','experience','contact']
    const obs = new IntersectionObserver(
      es => es.forEach(e => { if (e.isIntersecting) setActive(e.target.id) }),
      { threshold: 0.3 }
    )
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const fn = () => { if (window.innerWidth >= 768) setMenuOpen(false) }
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[1000] flex justify-between items-center px-8 transition-all duration-500"
        style={{
          height: scrolled ? 56 : 70,
          background: scrolled ? 'rgba(3,3,16,0.88)' : 'transparent',
          backdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
          boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,.4), inset 0 -1px 0 var(--border)' : 'none',
        }}
      >
        {/* Logo */}
        <a href="#hero" style={{ textDecoration: 'none' }}>
          <div
            className="font-display font-extrabold text-xl flex items-center gap-1.5"
            style={{ letterSpacing: '-0.03em' }}
          >
            <span
              className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-sm"
              style={{
                background: 'linear-gradient(135deg, var(--cyan), var(--violet))',
                color: '#fff',
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 800,
                boxShadow: '0 0 16px var(--cyan-glow)',
              }}
            >
              HG
            </span>
            <span className="hidden sm:block gradient-text-cv">Hariom</span>
          </div>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-8 list-none items-center">
          {LINKS.map(({ label, href, id }) => (
            <li key={id}>
              <a href={href} className={`nav-link${active === id ? ' active' : ''}`}>
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right */}
        <div className="hidden md:flex items-center gap-3">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
          <a href="#contact" className="nav-cta">Let's Talk →</a>
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-2">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
          <button
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', display: 'flex', flexDirection: 'column', gap: '5px' }}
          >
            {[0,1,2].map(i => (
              <span key={i} style={{
                display: 'block', width: 22, height: 2, borderRadius: 2,
                background: 'var(--cyan)',
                transition: 'all .3s',
                transform: i === 0 && menuOpen ? 'rotate(45deg) translate(5px,5px)' : i === 2 && menuOpen ? 'rotate(-45deg) translate(5px,-5px)' : 'none',
                opacity: i === 1 && menuOpen ? 0 : 1,
              }} />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {LINKS.map(({ label, href, id }) => (
          <a
            key={id} href={href}
            className="font-display text-4xl font-bold no-underline"
            style={{ color: active === id ? 'var(--cyan)' : 'var(--text)', transition: 'color .3s' }}
            onClick={() => setMenuOpen(false)}
          >
            {label}
          </a>
        ))}
        <a href="#contact" className="nav-cta mt-2" onClick={() => setMenuOpen(false)}>
          Let's Talk →
        </a>
      </div>
    </>
  )
}
