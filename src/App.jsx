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

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, []) // eslint-disable-line

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
      <div className="progress-bar" style={{ width: `${progress}%` }} />
      <Cursor />
      <ThreeBackground theme={theme} />
      <div className="mesh-bg" />
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <div className="section-divider" />
        <About />
        <div className="section-divider" />
        <Skills />
        <div className="section-divider" />
        <Projects />
        <div className="section-divider" />
        <Experience />
        <div className="section-divider" />
        <Contact />
      </main>

      <footer
        className="relative z-10 text-center py-10"
        style={{ borderTop: '1px solid var(--line)' }}
      >
        <p className="text-sm" style={{ color: 'var(--muted)' }}>
          Designed &amp; built with{' '}
          <span style={{ color: 'var(--rose)' }}>♥</span> by{' '}
          <span style={{ color: 'var(--lime)', fontFamily: "'Syne', sans-serif", fontWeight: 700 }}>Hariom Gourh</span>{' '}
          · {new Date().getFullYear()}
        </p>
        <p className="mt-1 text-xs" style={{ color: 'var(--muted)', opacity: .45 }}>
          React · Three.js · Tailwind CSS
        </p>
      </footer>
    </>
  )
}
