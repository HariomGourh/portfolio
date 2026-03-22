import { useEffect, useRef, useState } from 'react'
import { useReveal } from '../hooks/useReveal'

const SKILLS = [
  {
    icon: '💻', name: 'C / C++',
    desc: 'Strong foundation in programming, problem solving and logic building',
    pct: 85, color: 'var(--cyan)',
    trackColor: 'rgba(56,189,248,0.12)',
  },
  {
    icon: '🐍', name: 'Python',
    desc: 'Data handling, scripting and building ML-based applications',
    pct: 90, color: 'var(--violet)',
    trackColor: 'rgba(167,139,250,0.12)',
  },
  {
    icon: '🧠', name: 'Data Structures & Algorithms',
    desc: 'Problem solving using arrays, recursion, trees, graphs and more',
    pct: 70, color: 'var(--amber)',
    trackColor: 'rgba(251,191,36,0.12)',
  },
  {
    icon: '📊', name: 'Data Analysis',
    desc: 'Working with datasets using NumPy, Pandas and data cleaning techniques',
    pct: 85, color: 'var(--green)',
    trackColor: 'rgba(52,211,153,0.12)',
  },
  {
    icon: '📈', name: 'Data Visualization',
    desc: 'Creating insights using Matplotlib, Seaborn, Power BI',
    pct: 75, color: 'var(--amber)',
    trackColor: 'rgba(251,191,36,0.12)',
  },
  {
    icon: '🤖', name: 'Machine Learning',
    desc: 'Core ML algorithms: Regression, Decision Trees and KNN with practical implementation',
    pct: 70, color: 'var(--coral)',
    trackColor: 'rgba(251,113,133,0.12)',
  },
]

/* SVG radial progress ring */
function RadialRing({ pct, color, trackColor, animated }) {
  const R = 26
  const C = 2 * Math.PI * R // ≈ 163.36
  const offset = animated ? C - (pct / 100) * C : C

  return (
    <div className="relative flex-shrink-0" style={{ width: 68, height: 68 }}>
      <svg width="68" height="68" viewBox="0 0 68 68" style={{ overflow: 'visible' }}>
        {/* Track */}
        <circle
          cx="34" cy="34" r={R}
          fill="none"
          stroke={trackColor}
          strokeWidth="3.5"
        />
        {/* Fill */}
        <circle
          cx="34" cy="34" r={R}
          fill="none"
          stroke={color}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={offset}
          transform="rotate(-90 34 34)"
          style={{ transition: 'stroke-dashoffset 1.8s cubic-bezier(.16,1,.3,1)' }}
        />
      </svg>
      {/* Percentage label */}
      <div
        className="absolute inset-0 flex items-center justify-center font-mono text-xs font-bold"
        style={{ color }}
      >
        {pct}%
      </div>
    </div>
  )
}

function SkillCard({ skill, delay }) {
  const cardRef  = useRef(null)
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      cardRef.current?.classList.add('visible')
      setTimeout(() => setAnimated(true), delay * 1000 + 150)
      obs.unobserve(entry.target)
    }, { threshold: 0.2 })
    if (cardRef.current) obs.observe(cardRef.current)
    return () => obs.disconnect()
  }, [delay])

  return (
    <div
      ref={cardRef}
      className="glass-card reveal p-6"
      style={{ transitionDelay: `${delay}s` }}
    >
      {/* Header row: icon + name + ring */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1">
          <div className="text-2xl mb-2 select-none">{skill.icon}</div>
          <div className="font-display font-bold text-base leading-tight" style={{ color:'var(--text)' }}>
            {skill.name}
          </div>
        </div>
        <RadialRing
          pct={skill.pct}
          color={skill.color}
          trackColor={skill.trackColor}
          animated={animated}
        />
      </div>

      {/* Description */}
      <p className="text-sm leading-relaxed" style={{ color:'var(--muted)' }}>
        {skill.desc}
      </p>

      {/* Thin accent line at bottom */}
      <div
        className="mt-4 h-[1.5px] rounded-full"
        style={{ background: `linear-gradient(90deg, ${skill.color}, transparent)`, opacity: .45 }}
      />
    </div>
  )
}

export default function Skills() {
  const headRef = useReveal()

  return (
    <section
      id="skills"
      className="relative z-10 section-alt"
    >
      <div className="max-w-6xl mx-auto px-6 py-28">

        {/* Heading */}
        <div ref={headRef} className="reveal text-center mb-14">
          <div className="section-label justify-center">Expertise</div>
          <h2 className="font-display font-extrabold leading-tight" style={{ fontSize:'clamp(2rem,5vw,3.2rem)' }}>
            <span className="gradient-text-cv">Skills</span> &amp; Expertise in AI/ML
          </h2>
          <p className="mt-3 text-base max-w-md mx-auto" style={{ color:'var(--muted)' }}>
            Core skills I am developing through real-world projects and continuous learning in AI,
            Data Science and Machine Learning.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKILLS.map((s, i) => (
            <SkillCard key={s.name} skill={s} delay={i * 0.09} />
          ))}
        </div>
      </div>
    </section>
  )
}
