import { useState, useEffect } from 'react'

const NAV_LINKS = [
  { label: 'About',    href: '#about',      id: 'about'      },
  { label: 'Skills',   href: '#skills',     id: 'skills'     },
  { label: 'Projects', href: '#projects',   id: 'projects'   },
  { label: 'Journey',  href: '#experience', id: 'experience' },
  { label: 'Contact',  href: '#contact',    id: 'contact'    },
]

/* ── Sun icon ── */
const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
)

/* ── Moon icon ── */
const MoonIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
  </svg>
)

/**
 * Navbar
 * ──────
 * • Active section tracking via IntersectionObserver
 * • Dark / light theme toggle
 * • Glassmorphic on scroll
 * • Mobile hamburger overlay
 */
export default function Navbar({ theme, toggleTheme }) {
  const [scrolled,       setScrolled]       = useState(false)
  const [menuOpen,       setMenuOpen]       = useState(false)
  const [activeSection,  setActiveSection]  = useState('hero')

  /* Scroll detection → glassmorphic */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Active section via IntersectionObserver */
  useEffect(() => {
    const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'contact']
    const observers = sections.map(id => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { threshold: 0.35 }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [])

  /* Close menu on resize to desktop */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[1000] flex justify-between items-center px-8 py-4 transition-all duration-500"
        style={scrolled ? {
          background:          'var(--nav-blur)',
          backdropFilter:      'blur(22px)',
          WebkitBackdropFilter:'blur(22px)',
          borderBottom:        '1px solid var(--border)',
          boxShadow:           'var(--shadow-sm)',
        } : {}}
      >
        {/* Logo */}
        <a
          href="#hero"
          className="font-display font-extrabold text-xl no-underline gradient-text-cv"
          style={{ letterSpacing: '-0.5px' }}
        >
          HG.
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-9 list-none items-center">
          {NAV_LINKS.map(({ label, href, id }) => (
            <li key={id}>
              <a
                href={href}
                className={`nav-link${activeSection === id ? ' active' : ''}`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right: theme toggle + CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
          <a href="#contact" className="nav-cta">
            Let's Talk →
          </a>
        </div>

        {/* Mobile: theme toggle + hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
          <button
            className="flex flex-col gap-[5px] p-2 bg-transparent border-none cursor-pointer"
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
          >
            <span
              className="block w-6 h-[2px] rounded-full transition-all duration-300"
              style={{ background: 'var(--cyan)', transform: menuOpen ? 'rotate(45deg) translate(5px,5px)' : 'none' }}
            />
            <span
              className="block w-6 h-[2px] rounded-full transition-all duration-300"
              style={{ background: 'var(--cyan)', opacity: menuOpen ? 0 : 1 }}
            />
            <span
              className="block w-6 h-[2px] rounded-full transition-all duration-300"
              style={{ background: 'var(--cyan)', transform: menuOpen ? 'rotate(-45deg) translate(5px,-5px)' : 'none' }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {NAV_LINKS.map(({ label, href, id }) => (
          <a
            key={id}
            href={href}
            className="font-display text-4xl font-bold no-underline transition-colors duration-300"
            style={{ color: activeSection === id ? 'var(--cyan)' : 'var(--text)' }}
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
