import { useEffect, useRef } from 'react'
import { useReveal } from '../hooks/useReveal'

const CHIPS = [
  'C', 'C++', 'Python',
  'Data Structures', 'Algorithms',
  'NumPy', 'Pandas', 'Machine Learning',
  'Matplotlib', 'Seaborn', 'Power BI',
  'Git', 'VS Code'
]

const STATS = [
  { num: 3,   suffix: '+',  label: 'Projects'        },
  { num: 1,   suffix: '+',  label: 'Years Learning'  },
  { num: 5,   suffix: '+',  label: 'Technologies'    },
  { num: 100, suffix: '%',  label: 'Learning Focus'  },
]

export default function About() {
  const textRef    = useReveal()
  const cardRef    = useReveal()
  const counterEls = useRef([])

  /* 3D tilt on the card */
  useEffect(() => {
    const card = cardRef.current
    if (!card) return
    const onMove = (e) => {
      const r = card.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width  - 0.5
      const y = (e.clientY - r.top)  / r.height - 0.5
      card.style.transform = `perspective(800px) rotateY(${x * 16}deg) rotateX(${-y * 16}deg) scale(1.02)`
    }
    const onLeave = () => { card.style.transform = '' }
    card.addEventListener('mousemove', onMove)
    card.addEventListener('mouseleave', onLeave)
    return () => { card.removeEventListener('mousemove', onMove); card.removeEventListener('mouseleave', onLeave) }
  }, [])

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
    <section id="about" className="relative z-10">
      <div className="max-w-6xl mx-auto px-6 py-28">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* LEFT: Text */}
          <div ref={textRef} className="reveal">
            <div className="section-label">Who am I</div>
            <h2
              className="font-display font-extrabold leading-tight mb-5"
              style={{ fontSize:'clamp(2rem,5vw,3.2rem)' }}
            >
              Passionate about{' '}
              <span className="gradient-text-cv">AI, Data Science</span>{' '}
              &amp;{' '}
              <span className="gradient-text-cv">Problem Solving</span>
            </h2>

            <p className="text-base leading-8 mb-4" style={{ color:'var(--muted)' }}>
              I'm a{' '}
              <strong style={{ color:'var(--text)', fontWeight:600 }}>B.Tech Computer Science</strong>{' '}
              student focused on becoming an{' '}
              <strong style={{ color:'var(--text)', fontWeight:600 }}>AI/ML Engineer.</strong>{' '}
              I have strong foundations in{' '}
              <strong style={{ color:'var(--text)', fontWeight:600 }}>Python, C++, and Data Structures &amp; Algorithms,</strong>{' '}
              and I build real-world projects using{' '}
              <strong style={{ color:'var(--text)', fontWeight:600 }}>Machine Learning and Data Analysis.</strong>
            </p>

            <p className="text-base leading-8 mb-4" style={{ color:'var(--muted)' }}>
              Currently, I am working on projects related to Agriculture AI, Rainfall Prediction, and
              AI-based systems that solve real-world problems. I am continuously improving my skills in
              Machine Learning, Data Analysis, and real-world AI applications.
            </p>

            <p className="text-base leading-8 mb-7" style={{ color:'var(--muted)' }}>
              I am actively looking for <strong style={{ color:'var(--cyan)', fontWeight:600 }}>AI/ML or Data Science internship</strong> opportunities.
            </p>

            {/* Tech chips */}
            <div className="flex flex-wrap gap-2">
              {CHIPS.map(c => <span key={c} className="chip">{c}</span>)}
            </div>
          </div>

          {/* RIGHT: 3D Card */}
          <div className="flex justify-center">
            <div
              ref={cardRef}
              className="glass-card reveal flex flex-col items-center gap-5 p-8"
              style={{ width:300, transformStyle:'preserve-3d', transition:'transform 0.15s ease' }}
            >
              {/* Avatar */}
              <div className="relative">
                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center font-display font-extrabold text-3xl text-white select-none"
                  style={{ background:'linear-gradient(135deg,var(--cyan),var(--violet))' }}
                >
                  HG
                </div>
                <div
                  className="absolute -inset-1.5 rounded-full -z-10"
                  style={{ background:'linear-gradient(135deg,var(--cyan),var(--violet))', opacity:.3, filter:'blur(10px)' }}
                />
              </div>

              {/* Name + role */}
              <div className="text-center">
                <div className="font-display font-bold text-xl" style={{ color:'var(--text)' }}>Hariom Gourh</div>
                <div className="font-mono text-xs mt-1.5" style={{ color:'var(--cyan)' }}>AI/ML Engineer</div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-3 w-full">
                {STATS.map(({ num, suffix, label }) => (
                  <div
                    key={label}
                    className="text-center py-3 px-2 rounded-xl"
                    style={{ background:'var(--cyan-dim)', border:'1px solid rgba(56,189,248,.15)' }}
                  >
                    <div
                      className="font-display font-extrabold text-2xl"
                      style={{ color:'var(--cyan)' }}
                      data-count={num}
                      data-suffix={suffix}
                      ref={el => el && counterEls.current.push(el)}
                    >
                      0{suffix}
                    </div>
                    <div className="text-xs mt-1" style={{ color:'var(--muted)' }}>{label}</div>
                  </div>
                ))}
              </div>

              {/* Status */}
              <div className="flex items-center gap-2 text-xs font-mono text-center" style={{ color:'var(--muted)' }}>
                <span className="badge-dot flex-shrink-0" />
                Open to internships &amp; learning opportunities
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
