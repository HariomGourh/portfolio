import { useState, useEffect } from 'react'

const NAV_LINKS = [
  { label: 'About',    href: '#about'      },
  { label: 'Skills',   href: '#skills'     },
  { label: 'Projects', href: '#projects'   },
  { label: 'Journey',  href: '#experience' },
  { label: 'Contact',  href: '#contact'    },
]

/**
 * Navbar
 * ──────
 * • Fixed at top
 * • Becomes glassmorphic after scrolling 50px
 * • Desktop: horizontal links + CTA button
 * • Mobile: hamburger → full-screen overlay menu
 */
export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* ══ Desktop / Main Nav ══ */}
      <nav
        className="fixed top-0 left-0 right-0 z-[1000] flex justify-between items-center px-10 py-5 transition-all duration-500"
        style={scrolled ? {
          background:    'rgba(5,5,16,0.82)',
          backdropFilter:'blur(20px)',
          borderBottom:  '1px solid rgba(255,255,255,0.07)',
        } : {}}
      >
        {/* Logo */}
        <a href="#hero" className="font-display font-extrabold text-2xl gradient-text-cv no-underline"
           style={{ letterSpacing: '-0.5px' }}>
          HG.
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-10 list-none">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                className="no-underline text-sm font-medium tracking-wide relative group transition-colors duration-300 hover:text-[color:var(--cyan)]"
                style={{ color: 'var(--muted)' }}
              >
                {label}
                {/* underline slide-in */}
                <span className="absolute -bottom-1 left-0 h-px bg-[color:var(--cyan)] w-0 group-hover:w-full transition-all duration-300" />
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a href="#contact" className="nav-cta hidden md:inline-block">
          Let's Talk →
        </a>

        {/* Hamburger (mobile only) */}
        <button
          className="flex md:hidden flex-col gap-1.5 p-1.5 bg-transparent border-none cursor-pointer"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-[color:var(--cyan)] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-[color:var(--cyan)] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-[color:var(--cyan)] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* ══ Mobile Menu (full-screen overlay) ══ */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {NAV_LINKS.map(({ label, href }) => (
          <a
            key={href}
            href={href}
            className="font-display text-4xl font-bold no-underline transition-colors duration-300 hover:text-[color:var(--cyan)]"
            style={{ color: 'var(--text)' }}
            onClick={() => setMenuOpen(false)}
          >
            {label}
          </a>
        ))}
      </div>
    </>
  )
}
