import { useEffect, useState } from 'react'
import ThreeBackground from './components/ThreeBackground'
import Cursor          from './components/Cursor'
import Navbar          from './components/Navbar'
import Hero            from './components/Hero'
import About           from './components/About'
import Skills          from './components/Skills'
import Projects        from './components/Projects'
import Experience      from './components/Experience'
import Contact         from './components/Contact'

export default function App() {
  const [progress, setProgress] = useState(0)

  /* ── Theme: persist to localStorage, default dark ── */
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('hg-theme') || 'dark'
    }
    return 'dark'
  })

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    localStorage.setItem('hg-theme', next)
  }

  /* Apply theme on mount */
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, []) // eslint-disable-line

  /* ── Scroll progress bar ── */
  useEffect(() => {
    const onScroll = () => {
      const pct =
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      setProgress(Math.min(pct, 100))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* Scroll progress bar */}
      <div className="progress-bar" style={{ width: `${progress}%` }} />

      {/* Custom cursor */}
      <Cursor />

      {/* Three.js particle background (fixed) */}
      <ThreeBackground theme={theme} />

      {/* Gradient mesh blobs (fixed) */}
      <div className="mesh-bg" />

      {/* Sticky navbar */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* Page sections */}
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>

      {/* Footer */}
      <footer
        className="relative z-10 text-center py-10 text-sm"
        style={{ borderTop: '1px solid var(--border)', color: 'var(--muted)' }}
      >
        <p>
          Designed &amp; built with{' '}
          <span style={{ color: 'var(--coral)' }}>♥</span> by{' '}
          <span style={{ color: 'var(--cyan)' }}>Hariom Gourh</span> ·{' '}
          {new Date().getFullYear()}
        </p>
        <p className="mt-1 text-xs" style={{ color: 'var(--muted)', opacity: 0.5 }}>
          React · Three.js · Tailwind CSS
        </p>
      </footer>
    </>
  )
}
