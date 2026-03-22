import { useEffect, useRef } from 'react'
import { useReveal } from '../hooks/useReveal'

const JOBS = [
  {
    date:'2025 — Present',
    role:'AI/ML Learner & Project Developer',
    company:'Self-Driven Learning',
    desc:'Building real-world AI/ML projects including rainfall prediction, smart agriculture systems, and AI chatbot solutions, with a focus on solving practical problems using data-driven approaches.',
    tags:['Python','Machine Learning','Data Analysis','PyTorch'],
    icon:'🚀', accentColor:'var(--cyan)',
  },
  {
    date:'2024 — 2025',
    role:'B.Tech Computer Science Student',
    company:'MITS Gwalior',
    desc:'Developing strong foundations in programming, Data Structures & Algorithms, DBMS and Computer Networks while working on practical AI-based projects.',
    tags:['C++','DSA','DBMS','Computer Networks'],
    icon:'🎓', accentColor:'var(--violet)',
  },
  {
    date:'2023 — 2024',
    role:'Programming & Problem Solving Beginner',
    company:'Learning Phase',
    desc:'Built strong logical thinking and problem-solving skills through consistent practice and hands-on projects.',
    tags:['C','C++','Problem Solving'],
    icon:'💡', accentColor:'var(--amber)',
  },
]

export default function Experience() {
  const headRef  = useReveal()
  const itemRefs = useRef([])

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target)} })
    },{ threshold:.18 })
    itemRefs.current.forEach(el => el && obs.observe(el))
    return () => obs.disconnect()
  },[])

  return (
    <section id="experience" className="relative z-10">
      <div className="max-w-3xl mx-auto px-6 py-28">

        <div ref={headRef} className="reveal mb-14">
          <div className="section-label">My Journey</div>
          <h2 className="font-display font-extrabold leading-tight" style={{ fontSize:'clamp(2rem,5vw,3.2rem)', letterSpacing:'-0.025em' }}>
            My <span className="gradient-text-cv">Journey</span>
          </h2>
          <p className="mt-3 text-base" style={{ color:'var(--text2)' }}>
            My journey of learning, building and growing in AI/ML and software development.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative pl-10">

          {/* Vertical connector line */}
          <div
            style={{
              position:'absolute', left:18, top:12, bottom:12, width:2,
              background:'linear-gradient(to bottom, var(--cyan), var(--violet), transparent)',
              opacity:.5, borderRadius:2,
            }}
          />

          {JOBS.map((job, i) => (
            <div
              key={job.company}
              ref={el => (itemRefs.current[i] = el)}
              className="timeline-item reveal relative mb-8"
              style={{ transitionDelay:`${i * 0.14}s` }}
            >
              {/* Glow dot */}
              <div className="timeline-dot" style={{ left:'-10px' }} />

              {/* Card */}
              <div className="panel p-6">
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0 select-none"
                      style={{ background:`${job.accentColor === 'var(--cyan)' ? 'rgba(0,217,255,.12)' : job.accentColor === 'var(--violet)' ? 'rgba(139,92,246,.12)' : 'rgba(245,158,11,.12)'}`, border:'1px solid var(--border)' }}
                    >
                      {job.icon}
                    </div>
                    <div>
                      <div className="font-display font-bold text-base leading-snug" style={{ color:'var(--text)' }}>{job.role}</div>
                      <div className="font-medium text-sm mt-0.5" style={{ color: job.accentColor }}>{job.company}</div>
                    </div>
                  </div>
                  <div
                    className="text-xs font-mono px-3 py-1.5 rounded-lg flex-shrink-0"
                    style={{ background:'rgba(0,217,255,.06)', border:'1px solid var(--border)', color:'var(--cyan)' }}
                  >
                    {job.date}
                  </div>
                </div>

                <p className="text-sm leading-relaxed mb-4" style={{ color:'var(--muted)', lineHeight:1.78 }}>
                  {job.desc}
                </p>

                <div className="flex flex-wrap gap-1.5">
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
