import { useEffect, useRef } from 'react'
import { useReveal } from '../hooks/useReveal'

const CHIPS = [
  'C', 'C++', 'Python', 'Data Structures', 'Algorithms',
  'NumPy', 'Pandas', 'Machine Learning',
  'Matplotlib', 'Seaborn', 'Power BI', 'Git', 'VS Code',
]

const STATS = [
  { num: 3,   suffix: '+',  label: 'Projects'        },
  { num: 1,   suffix: '+',  label: 'Years Learning'  },
  { num: 5,   suffix: '+',  label: 'Technologies'    },
  { num: 100, suffix: '%',  label: 'Learning Focus'  },
]

export default function About() {
  const sectionRef = useReveal()
  const rightRef   = useReveal()
  const counterEls = useRef([])

  /* Counter animation */
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        const el     = entry.target
        const target = parseInt(el.dataset.count)
        const suffix = el.dataset.suffix || ''
        let cur = 0
        const step = target / 55
        const id = setInterval(() => {
          cur = Math.min(cur + step, target)
          el.textContent = Math.floor(cur) + suffix
          if (cur >= target) clearInterval(id)
        }, 16)
        obs.unobserve(el)
      })
    }, { threshold: 0.6 })
    counterEls.current.forEach(el => el && obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="about" className="relative z-10 overflow-hidden">
      {/* Ghost section number */}
      <span className="section-ghost-num">01</span>

      <div className="max-w-6xl mx-auto px-6 py-28">

        {/* Section heading */}
        <div ref={sectionRef} className="reveal mb-14">
          <div className="section-label">Who am I</div>
          <h2
            className="font-display font-extrabold"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', letterSpacing: '-0.03em', lineHeight: 1.1 }}
          >
            Passionate about{' '}
            <span className="gradient-text-cv">AI, Data Science</span>{' '}
            &amp;{' '}
            <span className="gradient-text-cv">Problem Solving</span>
          </h2>
        </div>

        {/* Two column */}
        <div className="grid md:grid-cols-[1fr_1fr] gap-14 items-start">

          {/* LEFT: Text */}
          <div ref={sectionRef} className="reveal">
            <p className="text-base mb-5" style={{ color: 'var(--muted)', lineHeight: 1.9 }}>
              I'm a{' '}
              <strong style={{ color: 'var(--text)', fontWeight: 600 }}>B.Tech Computer Science</strong>{' '}
              student focused on becoming an{' '}
              <strong style={{ color: 'var(--text)', fontWeight: 600 }}>AI/ML Engineer.</strong>{' '}
              I have strong foundations in{' '}
              <strong style={{ color: 'var(--text)', fontWeight: 600 }}>Python, C++, and Data Structures &amp; Algorithms,</strong>{' '}
              and I build real-world projects using{' '}
              <strong style={{ color: 'var(--text)', fontWeight: 600 }}>Machine Learning and Data Analysis.</strong>
            </p>
            <p className="text-base mb-5" style={{ color: 'var(--muted)', lineHeight: 1.9 }}>
              Currently, I am working on projects related to Agriculture AI, Rainfall Prediction, and
              AI-based systems that solve real-world problems. I am continuously improving my skills
              in Machine Learning, Data Analysis, and real-world AI applications.
            </p>
            <p className="text-base mb-8" style={{ color: 'var(--muted)', lineHeight: 1.9 }}>
              I am actively looking for{' '}
              <strong style={{ color: 'var(--lime)', fontWeight: 700, fontFamily: "'Syne', sans-serif" }}>AI/ML or Data Science internship</strong>{' '}
              opportunities.
            </p>

            {/* Tech chips */}
            <div className="flex flex-wrap gap-2">
              {CHIPS.map(c => <span key={c} className="chip">{c}</span>)}
            </div>
          </div>

          {/* RIGHT: Stats grid + info card */}
          <div ref={rightRef} className="reveal" style={{ transitionDelay: '.15s' }}>

            {/* 2×2 stats grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {STATS.map(({ num, suffix, label }) => (
                <div
                  key={label}
                  className="card p-6"
                  style={{ background: 'var(--bg3)' }}
                >
                  <div
                    className="stat-num mb-1"
                    data-count={num}
                    data-suffix={suffix}
                    ref={el => el && counterEls.current.push(el)}
                  >
                    0{suffix}
                  </div>
                  <div className="stat-label">{label}</div>
                </div>
              ))}
            </div>

            {/* Info card */}
            <div
              className="card p-6 flex items-start gap-4"
              style={{ background: 'var(--bg3)' }}
            >
              {/* Avatar */}
              <div
                className="w-14 h-14 rounded-xl flex-shrink-0 flex items-center justify-center font-display font-extrabold text-xl text-white"
                style={{ background: 'linear-gradient(135deg, var(--accent), var(--lime))', color: '#0a0a0a' }}
              >
                HG
              </div>
              <div>
                <div className="font-display font-bold text-base" style={{ color: 'var(--text)' }}>
                  Hariom Gourh
                </div>
                <div className="font-mono text-xs mt-0.5 mb-2" style={{ color: 'var(--accent)' }}>
                  AI/ML Engineer · MITS Gwalior
                </div>
                <div className="flex items-center gap-2 text-xs font-mono" style={{ color: 'var(--muted)' }}>
                  <span className="badge-dot" />
                  Open to internships &amp; learning opportunities
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
