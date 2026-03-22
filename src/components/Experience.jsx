import { useEffect, useRef } from 'react'
import { useReveal } from '../hooks/useReveal'

const JOBS = [
  {
    date: '2025 — Present',
    role: 'AI/ML Learner & Project Developer',
    company: 'Self-Driven Learning',
    desc: 'Building real-world AI/ML projects including rainfall prediction, smart agriculture systems, and AI chatbot solutions, with a focus on solving practical problems using data-driven approaches.',
    tags: ['Python','Machine Learning','Data Analysis','PyTorch'],
    icon: '🚀',
    color: 'var(--cyan)',
  },
  {
    date: '2024 — 2025',
    role: 'B.Tech Computer Science Student',
    company: 'MITS Gwalior',
    desc: 'Developing strong foundations in programming, Data Structures & Algorithms, DBMS and Computer Networks while working on practical AI-based projects.',
    tags: ['C++','DSA','DBMS','Computer Networks'],
    icon: '🎓',
    color: 'var(--violet)',
  },
  {
    date: '2023 — 2024',
    role: 'Programming & Problem Solving Beginner',
    company: 'Learning Phase',
    desc: 'Built strong logical thinking and problem-solving skills through consistent practice and hands-on projects.',
    tags: ['C','C++','Problem Solving'],
    icon: '💡',
    color: 'var(--amber)',
  },
]

export default function Experience() {
  const headRef  = useReveal()
  const itemRefs = useRef([])

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) }
      })
    }, { threshold: 0.18 })
    itemRefs.current.forEach(el => el && obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section
      id="experience"
      className="relative z-10 section-alt"
    >
      <div className="max-w-3xl mx-auto px-6 py-28">

        {/* Heading */}
        <div ref={headRef} className="reveal mb-14">
          <div className="section-label">My Journey</div>
          <h2 className="font-display font-extrabold leading-tight" style={{ fontSize:'clamp(2rem,5vw,3.2rem)' }}>
            My <span className="gradient-text-cv">Journey</span>
          </h2>
          <p className="mt-3 text-base" style={{ color:'var(--muted)' }}>
            My journey of learning, building and growing in AI/ML and software development.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative pl-8">
          <div className="timeline-line" />

          {JOBS.map((job, i) => (
            <div
              key={job.company}
              ref={el => (itemRefs.current[i] = el)}
              className="timeline-item reveal relative mb-10 pl-8"
              style={{ transitionDelay:`${i * 0.15}s` }}
            >
              {/* Dot */}
              <div className="timeline-dot" />

              {/* Card */}
              <div
                className="glass-card p-6"
                style={{ '--hover-translate': '0px' }}
              >
                {/* Header row */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="font-mono text-[11px] tracking-widest mb-1.5" style={{ color: job.color }}>
                      {job.date}
                    </div>
                    <div className="font-display font-bold text-lg leading-snug" style={{ color:'var(--text)' }}>
                      {job.role}
                    </div>
                    <div className="font-medium text-sm mt-1" style={{ color: job.color }}>
                      {job.company}
                    </div>
                  </div>
                  <div
                    className="text-2xl select-none flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: `rgba(${job.color === 'var(--cyan)' ? '56,189,248' : job.color === 'var(--violet)' ? '167,139,250' : '251,191,36'}, 0.1)` }}
                  >
                    {job.icon}
                  </div>
                </div>

                <p className="text-sm leading-relaxed mb-4" style={{ color:'var(--muted)', lineHeight:1.75 }}>
                  {job.desc}
                </p>

                <div className="flex flex-wrap gap-2">
                  {job.tags.map(t => <span key={t} className="stack-tag">{t}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
