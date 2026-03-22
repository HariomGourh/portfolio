import { useEffect, useRef, useState } from 'react'
import { useReveal } from '../hooks/useReveal'

/* Marquee skill list */
const MARQUEE_ITEMS = [
  'Python', 'Machine Learning', 'C / C++', 'Data Analysis',
  'NumPy', 'Pandas', 'PyTorch', 'Data Visualization',
  'DSA', 'Matplotlib', 'Seaborn', 'Power BI', 'Scikit-learn',
]

const SKILLS = [
  { icon: '💻', name: 'C / C++',                    desc: 'Strong foundation in programming, problem solving and logic building', pct: 85, color: '#38bdf8' },
  { icon: '🐍', name: 'Python',                      desc: 'Data handling, scripting and building ML-based applications',          pct: 90, color: '#a78bfa' },
  { icon: '🧠', name: 'Data Structures & Algorithms', desc: 'Problem solving using arrays, recursion, trees, graphs and more',    pct: 70, color: '#fbbf24' },
  { icon: '📊', name: 'Data Analysis',               desc: 'Working with datasets using NumPy, Pandas and data cleaning',          pct: 85, color: '#34d399' },
  { icon: '📈', name: 'Data Visualization',          desc: 'Creating insights using Matplotlib, Seaborn, Power BI',               pct: 75, color: '#f472b6' },
  { icon: '🤖', name: 'Machine Learning',            desc: 'Core ML algorithms: Regression, Decision Trees and KNN in practice',  pct: 70, color: '#c8ff00' },
]

/* SVG radial progress ring */
function RingProgress({ pct, color, animated }) {
  const R = 22
  const C = 2 * Math.PI * R
  const offset = animated ? C - (pct / 100) * C : C

  return (
    <div style={{ position: 'relative', width: 58, height: 58, flexShrink: 0 }}>
      <svg width="58" height="58" viewBox="0 0 58 58">
        {/* Track */}
        <circle cx="29" cy="29" r={R} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="3" />
        {/* Fill */}
        <circle
          cx="29" cy="29" r={R}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={offset}
          transform="rotate(-90 29 29)"
          style={{ transition: 'stroke-dashoffset 1.8s cubic-bezier(.16,1,.3,1)' }}
        />
      </svg>
      <div
        style={{
          position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'JetBrains Mono', monospace", fontSize: '.7rem', fontWeight: 700, color,
        }}
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
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      cardRef.current?.classList.add('visible')
      setTimeout(() => setAnimated(true), delay * 1000 + 120)
      obs.unobserve(e.target)
    }, { threshold: 0.18 })
    if (cardRef.current) obs.observe(cardRef.current)
    return () => obs.disconnect()
  }, [delay])

  return (
    <div
      ref={cardRef}
      className="card reveal p-6"
      style={{ transitionDelay: `${delay}s` }}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1">
          <div style={{ fontSize: '1.6rem', marginBottom: '.4rem', lineHeight: 1 }}>{skill.icon}</div>
          <div
            className="font-display font-bold text-base leading-snug"
            style={{ color: 'var(--text)' }}
          >
            {skill.name}
          </div>
        </div>
        <RingProgress pct={skill.pct} color={skill.color} animated={animated} />
      </div>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{skill.desc}</p>
      {/* Bottom accent line */}
      <div
        style={{
          marginTop: '1rem', height: '1.5px', borderRadius: 2,
          background: `linear-gradient(90deg, ${skill.color}, transparent)`,
          opacity: .35,
        }}
      />
    </div>
  )
}

export default function Skills() {
  const headRef = useReveal()

  return (
    <section id="skills" className="relative z-10 overflow-hidden section-alt">
      {/* Ghost number */}
      <span className="section-ghost-num">02</span>

      <div className="max-w-6xl mx-auto px-6 py-28">

        {/* Heading */}
        <div ref={headRef} className="reveal mb-10">
          <div className="section-label">Expertise</div>
          <h2
            className="font-display font-extrabold"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', letterSpacing: '-0.03em', lineHeight: 1.1 }}
          >
            <span className="gradient-text-cv">Skills</span> &amp; Expertise in AI/ML
          </h2>
          <p className="mt-3 text-base max-w-xl" style={{ color: 'var(--muted)', lineHeight: 1.8 }}>
            Core skills I am developing through real-world projects and continuous learning
            in AI, Data Science and Machine Learning.
          </p>
        </div>
      </div>

      {/* MARQUEE TICKER — full bleed */}
      <div
        className="marquee-outer py-4 mb-2"
        style={{ borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}
      >
        <div className="marquee-track">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((name, i) => (
            <div key={i} className="marquee-item">
              <span className="dot" />
              {name}
            </div>
          ))}
        </div>
      </div>

      {/* Cards grid */}
      <div className="max-w-6xl mx-auto px-6 pt-12 pb-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKILLS.map((s, i) => (
            <SkillCard key={s.name} skill={s} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  )
}
