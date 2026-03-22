import { useEffect, useRef } from 'react'
import { useReveal } from '../hooks/useReveal'

const SKILLS = [
  { icon:'💻', name:'C / C++', desc:'Strong foundation in programming, problem solving and logic building', pct:85, bar:'linear-gradient(90deg,var(--cyan),var(--violet))', pctColor:'var(--cyan)' },

  { icon:'🐍', name:'Python', desc:'Data handling, scripting and building ML-based applications', pct:90, bar:'linear-gradient(90deg,var(--violet),var(--coral))', pctColor:'var(--violet)' },

  { icon:'🧠', name:'Data Structures & Algorithms', desc:'Problem solving using arrays, recursion, trees, graphs and more', pct:70, bar:'linear-gradient(90deg,var(--amber),var(--coral))', pctColor:'var(--amber)' },

  { icon:'📊', name:'Data Analysis', desc:'Working with datasets using NumPy, Pandas and data cleaning techniques', pct:85, bar:'linear-gradient(90deg,#4ade80,var(--cyan))', pctColor:'#4ade80' },

  { icon:'📈', name:'Data Visualization', desc:'Creating insights using Matplotlib, Seaborn, Power BI', pct:75, bar:'linear-gradient(90deg,#f59e0b,var(--coral))', pctColor:'#f59e0b' },

  { icon:'🤖', name:'Machine Learning', desc:'Understanding core ML algorithms like Regression, Decision Trees and KNN with practical implementation', pct:70, bar:'linear-gradient(90deg,var(--cyan),#a78bfa)', pctColor:'var(--cyan)' },
]

function SkillCard({ skill, delay }) {
  const cardRef = useRef(null)
  const barRef  = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      cardRef.current?.classList.add('visible')
      setTimeout(() => {
        if (barRef.current) barRef.current.style.width = skill.pct + '%'
      }, delay * 1000 + 200)
      obs.unobserve(entry.target)
    }, { threshold: 0.2 })
    if (cardRef.current) obs.observe(cardRef.current)
    return () => obs.disconnect()
  }, [skill.pct, delay])

  return (
    <div
      ref={cardRef}
      className="glass-card reveal p-7"
      style={{ transitionDelay: delay + 's' }}
    >
      <div className="text-3xl mb-3">{skill.icon}</div>
      <div className="font-display font-bold text-lg mb-1">{skill.name}</div>
      <div className="text-sm leading-relaxed mb-4" style={{ color:'var(--muted)' }}>{skill.desc}</div>

      {/* Label row */}
      <div className="flex justify-between mb-2">
        <span className="text-xs" style={{ color:'var(--muted)' }}>Proficiency</span>
        <span className="font-mono text-xs font-medium" style={{ color: skill.pctColor }}>{skill.pct}%</span>
      </div>

      {/* Animated bar */}
      <div className="h-1 rounded-full overflow-hidden" style={{ background:'rgba(255,255,255,0.07)' }}>
        <div
          ref={barRef}
          className="skill-bar-fill"
          style={{ background: skill.bar }}
        />
      </div>
    </div>
  )
}

export default function Skills() {
  const headRef = useReveal()

  return (
    <section
      id="skills"
      className="relative z-10"
      style={{ background:'linear-gradient(180deg,transparent,rgba(139,92,246,0.03),transparent)' }}
    >
      <div className="max-w-6xl mx-auto px-6 py-28">

        {/* Heading */}
        <div ref={headRef} className="reveal text-center mb-14">
          <div className="section-label justify-center">Expertise</div>
          <h2 className="font-display font-extrabold leading-tight" style={{ fontSize:'clamp(2rem,5vw,3.2rem)' }}>
          <span className="gradient-text-cv">Skills</span> & Expertise in AI/ML
          </h2>
          <p className="mt-3 text-base max-w-md mx-auto" style={{ color:'var(--muted)' }}>
            Core skills I am developing through real-world projects and continuous learning in AI, Data Science and Machine Learning.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKILLS.map((s, i) => (
            <SkillCard key={s.name} skill={s} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  )
}
