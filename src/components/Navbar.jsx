import { useState, useEffect } from 'react'

const NAV_LINKS = [
  { label: 'About',    href: '#about',      id: 'about'      },
  { label: 'Skills',   href: '#skills',     id: 'skills'     },
  { label: 'Projects', href: '#projects',   id: 'projects'   },
  { label: 'Journey',  href: '#experience', id: 'experience' },
  { label: 'Contact',  href: '#contact',    id: 'contact'    },
]

const SunIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
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
const MoonIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
  </svg>
)

export default function Navbar({ theme, toggleTheme }) {
  const [scrolled,      setScrolled]      = useState(false)
  const [menuOpen,      setMenuOpen]      = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids = ['hero', 'about', 'skills', 'projects', 'experience', 'contact']
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id) }),
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
          height: scrolled ? '58px' : '72px',
          background: scrolled
            ? 'rgba(6,6,12,0.92)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--line)' : '1px solid transparent',
          boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,.4)' : 'none',
        }}
      >
        {/* Logo */}
        <a
          href="#hero"
          className="font-display font-extrabold text-xl no-underline flex items-center gap-1.5"
          style={{ letterSpacing: '-0.04em' }}
        >
          <span style={{ color: 'var(--text)' }}>HG</span>
          <span
            className="inline-block w-1.5 h-1.5 rounded-full"
            style={{ background: 'var(--lime)', boxShadow: '0 0 8px var(--lime-glow)' }}
          />
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-8 list-none items-center">
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

        {/* Right: toggle + CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
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
            className="flex flex-col gap-[5px] p-2 bg-transparent border-none cursor-pointer"
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
          >
            <span style={{ display:'block', width:22, height:2, borderRadius:2, background:'var(--lime)', transition:'all .3s', transform: menuOpen ? 'rotate(45deg) translate(5px,5px)' : 'none' }} />
            <span style={{ display:'block', width:22, height:2, borderRadius:2, background:'var(--lime)', transition:'all .3s', opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display:'block', width:22, height:2, borderRadius:2, background:'var(--lime)', transition:'all .3s', transform: menuOpen ? 'rotate(-45deg) translate(5px,-5px)' : 'none' }} />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {NAV_LINKS.map(({ label, href, id }) => (
          <a
            key={id}
            href={href}
            className="font-display text-4xl font-bold no-underline"
            style={{
              color: activeSection === id ? 'var(--lime)' : 'var(--text)',
              transition: 'color .3s',
            }}
            onClick={() => setMenuOpen(false)}
          >
            {label}
          </a>
        ))}
        <a href="#contact" className="nav-cta" onClick={() => setMenuOpen(false)}>
          Let's Talk →
        </a>
      </div>
    </>
  )
}
