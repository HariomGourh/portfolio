import { useEffect, useRef } from 'react'
import { useReveal } from '../hooks/useReveal'

const JOBS = [
  {
    date: '2025 — Present',
    role: 'AI/ML Learner & Project Developer',
    company: 'Self-Driven Learning',
    desc: 'Building real-world AI/ML projects including rainfall prediction, smart agriculture systems, and AI chatbot solutions, with a focus on solving practical problems using data-driven approaches.',
    tags: ['Python','Machine Learning','Data Analysis','PyTorch'],
  },
  {
    date: '2024 — 2025',
    role: 'B.Tech Computer Science Student',
    company: 'MITS Gwalior',
    desc: 'Developing strong foundations in programming, Data Structures & Algorithms, DBMS and Computer Networks while working on practical AI-based projects.',
    tags: ['C++','DSA','DBMS','Computer Networks'],
  },
  {
    date: '2023 — 2024',
    role: 'Programming & Problem Solving Beginner',
    company: 'Learning Phase',
    desc: 'Built strong logical thinking and problem-solving skills through consistent practice and hands-on projects.',
    tags: ['C','C++','Problem Solving'],
  },
]

/**
 * Experience
 * ──────────
 * Vertical timeline with animated glowing dot on hover.
 * Each item reveals on scroll with staggered delay.
 */
export default function Experience() {
  const headRef  = useReveal()
  const itemRefs = useRef([])

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) }
      })
    }, { threshold: 0.2 })
    itemRefs.current.forEach(el => el && obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section
      id="experience"
      className="relative z-10"
      style={{ background:'linear-gradient(180deg,transparent,rgba(0,212,255,0.02),transparent)' }}
    >
      <div className="max-w-3xl mx-auto px-6 py-28">

        {/* Heading */}
        <div ref={headRef} className="reveal mb-14">
          <div className="section-label">My Journey</div>
          <h2 className="font-display font-extrabold leading-tight" style={{ fontSize:'clamp(2rem,5vw,3.2rem)' }}>
             My<span className="gradient-text-cv"> Journey</span>
          </h2>
          <p className="mt-3 text-base" style={{ color:'var(--muted)' }}>
            My journey of learning, building and growing in AI/ML and software development.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative pl-8">
          {/* Vertical line */}
          <div className="timeline-line" />

          {JOBS.map((job, i) => (
            <div
              key={job.company}
              ref={el => (itemRefs.current[i] = el)}
              className="timeline-item reveal relative mb-12 pl-8"
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              {/* Animated dot */}
              <div className="timeline-dot" />

              <div className="font-mono text-xs tracking-widest mb-2" style={{ color:'var(--cyan)' }}>
                {job.date}
              </div>
              <div className="font-display font-bold text-xl mb-1">{job.role}</div>
              <div className="font-medium text-sm mb-3" style={{ color:'var(--violet)' }}>{job.company}</div>
              <p className="text-sm leading-relaxed mb-3" style={{ color:'var(--muted)' }}>{job.desc}</p>

              <div className="flex flex-wrap gap-2">
                {job.tags.map(t => <span key={t} className="stack-tag">{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
