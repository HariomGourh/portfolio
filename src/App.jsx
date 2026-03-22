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

  const [theme, setTheme] = useState(() =>
    typeof window !== 'undefined' ? (localStorage.getItem('hg-theme') || 'dark') : 'dark'
  )

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
    const fn = () => {
      const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      setProgress(Math.min(pct, 100))
    }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <>
      <div className="progress-bar" style={{ width: `${progress}%` }} />
      <Cursor />
      <ThreeBackground theme={theme} />
      <div className="mesh-bg" />
      <div className="mesh-bg-mid" />
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>

      <footer
        className="relative z-10 text-center py-10 text-sm"
        style={{ borderTop: '1px solid var(--border)', color: 'var(--muted)' }}
      >
        <p>
          Designed &amp; built with{' '}
          <span style={{ color: 'var(--pink)' }}>♥</span> by{' '}
          <span className="gradient-text-cv font-semibold">Hariom Gourh</span>{' '}
          · {new Date().getFullYear()}
        </p>
        <p className="mt-1 text-xs" style={{ color: 'var(--muted)', opacity: .5 }}>
          React · Three.js · Tailwind CSS
        </p>
      </footer>
    </>
  )
}
