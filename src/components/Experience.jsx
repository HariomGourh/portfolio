import { useEffect, useRef } from 'react'
import { useReveal } from '../hooks/useReveal'

const JOBS = [
  {
    date:    '2025 — Present',
    role:    'AI/ML Learner & Project Developer',
    company: 'Self-Driven Learning',
    desc:    'Building real-world AI/ML projects including rainfall prediction, smart agriculture systems, and AI chatbot solutions, with a focus on solving practical problems using data-driven approaches.',
    tags:    ['Python', 'Machine Learning', 'Data Analysis', 'PyTorch'],
    icon:    '🚀',
    accent:  'var(--lime)',
  },
  {
    date:    '2024 — 2025',
    role:    'B.Tech Computer Science Student',
    company: 'MITS Gwalior',
    desc:    'Developing strong foundations in programming, Data Structures & Algorithms, DBMS and Computer Networks while working on practical AI-based projects.',
    tags:    ['C++', 'DSA', 'DBMS', 'Computer Networks'],
    icon:    '🎓',
    accent:  'var(--accent)',
  },
  {
    date:    '2023 — 2024',
    role:    'Programming & Problem Solving Beginner',
    company: 'Learning Phase',
    desc:    'Built strong logical thinking and problem-solving skills through consistent practice and hands-on projects.',
    tags:    ['C', 'C++', 'Problem Solving'],
    icon:    '💡',
    accent:  'var(--amber)',
  },
]

export default function Experience() {
  const headRef  = useReveal()
  const itemRefs = useRef([])

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } })
    }, { threshold: 0.15 })
    itemRefs.current.forEach(el => el && obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="experience" className="relative z-10 overflow-hidden section-alt">
      <span className="section-ghost-num">04</span>

      <div className="max-w-5xl mx-auto px-6 py-28">
        <div ref={headRef} className="reveal mb-14">
          <div className="section-label">My Journey</div>
          <h2
            className="font-display font-extrabold"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', letterSpacing: '-0.03em', lineHeight: 1.1 }}
          >
            My <span className="gradient-text-cv">Journey</span>
          </h2>
          <p className="mt-3 text-base max-w-xl" style={{ color: 'var(--muted)', lineHeight: 1.8 }}>
            My journey of learning, building and growing in AI/ML and software development.
          </p>
        </div>

        <div className="flex flex-col gap-5">
          {JOBS.map((job, i) => (
            <div
              key={job.company}
              ref={el => (itemRefs.current[i] = el)}
              className="card reveal"
              style={{
                transitionDelay: `${i * 0.12}s`,
                paddingLeft: '0',
                overflow: 'hidden',
              }}
            >
              {/* Accent stripe */}
              <div
                style={{
                  position: 'absolute', left: 0, top: 0, bottom: 0, width: 3,
                  background: job.accent,
                  boxShadow: `0 0 12px ${job.accent}60`,
                }}
              />

              <div className="flex flex-col md:flex-row md:items-start gap-5 p-6 pl-8">
                {/* Icon badge */}
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-xl select-none"
                  style={{ background: 'var(--bg2)', border: '1px solid var(--line)' }}
                >
                  {job.icon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                    <div>
                      <div
                        className="font-display font-bold text-lg leading-snug"
                        style={{ color: 'var(--text)', letterSpacing: '-0.02em' }}
                      >
                        {job.role}
                      </div>
                      <div className="font-medium text-sm mt-0.5" style={{ color: job.accent }}>
                        {job.company}
                      </div>
                    </div>
                    <div
                      className="text-xs font-mono px-2.5 py-1 rounded-lg flex-shrink-0"
                      style={{ background: 'var(--bg2)', border: '1px solid var(--line)', color: 'var(--muted)', letterSpacing: '1px' }}
                    >
                      {job.date}
                    </div>
                  </div>

                  <p className="text-sm mt-3 mb-4" style={{ color: 'var(--muted)', lineHeight: 1.8 }}>
                    {job.desc}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {job.tags.map(t => <span key={t} className="stack-tag">{t}</span>)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
