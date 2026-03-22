import { useEffect, useRef, useState } from 'react'
import { useReveal } from '../hooks/useReveal'

const SKILLS = [
  { icon:'💻', name:'C / C++',                     desc:'Strong foundation in programming, problem solving and logic building',                                              pct:85, color:'#00d9ff', track:'rgba(0,217,255,.1)' },
  { icon:'🐍', name:'Python',                       desc:'Data handling, scripting and building ML-based applications',                                                      pct:90, color:'#8b5cf6', track:'rgba(139,92,246,.1)' },
  { icon:'🧠', name:'Data Structures & Algorithms', desc:'Problem solving using arrays, recursion, trees, graphs and more',                                                  pct:70, color:'#f59e0b', track:'rgba(245,158,11,.1)'  },
  { icon:'📊', name:'Data Analysis',                desc:'Working with datasets using NumPy, Pandas and data cleaning techniques',                                           pct:85, color:'#10b981', track:'rgba(16,185,129,.1)'  },
  { icon:'📈', name:'Data Visualization',           desc:'Creating insights using Matplotlib, Seaborn, Power BI',                                                            pct:75, color:'#f472b6', track:'rgba(244,114,182,.1)' },
  { icon:'🤖', name:'Machine Learning',             desc:'Understanding core ML algorithms like Regression, Decision Trees and KNN with practical implementation',           pct:70, color:'#00d9ff', track:'rgba(0,217,255,.1)'  },
]

function RadialRing({ pct, color, track, animated }) {
  const R = 24, C = 2 * Math.PI * R
  const offset = animated ? C - (pct / 100) * C : C
  return (
    <div style={{ position:'relative', width:62, height:62, flexShrink:0 }}>
      <svg width="62" height="62" viewBox="0 0 62 62">
        <circle cx="31" cy="31" r={R} fill="none" stroke={track} strokeWidth="3.5" />
        <circle cx="31" cy="31" r={R} fill="none" stroke={color} strokeWidth="3.5" strokeLinecap="round"
          strokeDasharray={C} strokeDashoffset={offset}
          transform="rotate(-90 31 31)"
          style={{ transition:'stroke-dashoffset 1.8s cubic-bezier(.16,1,.3,1)', filter:`drop-shadow(0 0 6px ${color})` }}
        />
      </svg>
      <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'JetBrains Mono',monospace", fontSize:'.68rem', fontWeight:700, color }}>
        {pct}%
      </div>
    </div>
  )
}

function SkillCard({ skill, delay }) {
  const ref = useRef(null)
  const barRef = useRef(null)
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      ref.current?.classList.add('visible')
      setTimeout(() => {
        setAnimated(true)
        if (barRef.current) barRef.current.style.width = skill.pct + '%'
      }, delay * 1000 + 120)
      obs.unobserve(e.target)
    }, { threshold: 0.18 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [delay, skill.pct])

  return (
    <div
      ref={ref}
      className="panel reveal p-6"
      style={{ transitionDelay:`${delay}s` }}
    >
      {/* Top: icon + name + ring */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1">
          <div style={{ fontSize:'1.65rem', marginBottom:'.4rem', lineHeight:1 }}>{skill.icon}</div>
          <div className="font-display font-bold text-base leading-snug" style={{ color:'var(--text)' }}>{skill.name}</div>
        </div>
        <RadialRing pct={skill.pct} color={skill.color} track={skill.track} animated={animated} />
      </div>

      {/* Desc */}
      <p className="text-sm leading-relaxed mb-4" style={{ color:'var(--muted)', lineHeight:1.75 }}>{skill.desc}</p>

      {/* Glow bar */}
      <div className="rounded-full overflow-hidden" style={{ height:3, background:'rgba(255,255,255,.06)' }}>
        <div
          ref={barRef}
          className="skill-bar-fill"
          style={{ background:`linear-gradient(90deg, ${skill.color}, ${skill.color}80)`, boxShadow:`0 0 8px ${skill.color}60` }}
        />
      </div>
    </div>
  )
}

export default function Skills() {
  const headRef = useReveal()
  return (
    <section id="skills" className="relative z-10">
      <div className="max-w-6xl mx-auto px-6 py-28">
        <div ref={headRef} className="reveal text-center mb-14">
          <div className="section-label justify-center">Expertise</div>
          <h2 className="font-display font-extrabold leading-tight" style={{ fontSize:'clamp(2rem,5vw,3.2rem)', letterSpacing:'-0.025em' }}>
            <span className="gradient-text-cv">Skills</span> &amp; Expertise in AI/ML
          </h2>
          <p className="mt-3 text-base max-w-md mx-auto" style={{ color:'var(--text2)' }}>
            Core skills I am developing through real-world projects and continuous learning in AI, Data Science and Machine Learning.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKILLS.map((s, i) => <SkillCard key={s.name} skill={s} delay={i * 0.08} />)}
        </div>
      </div>
    </section>
  )
}
