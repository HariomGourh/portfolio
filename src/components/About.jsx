import { useEffect, useRef } from 'react'
import { useReveal } from '../hooks/useReveal'

const CHIPS = ['C','C++','Python','Data Structures','Algorithms','NumPy','Pandas','Machine Learning','Matplotlib','Seaborn','Power BI','Git','VS Code']

const STATS = [
  { num:3,   suffix:'+', label:'Projects',       icon:'🚀' },
  { num:1,   suffix:'+', label:'Years Learning', icon:'📅' },
  { num:5,   suffix:'+', label:'Technologies',   icon:'⚙️' },
  { num:100, suffix:'%', label:'Learning Focus', icon:'🎯' },
]

export default function About() {
  const textRef    = useReveal()
  const cardRef    = useReveal()
  const counterEls = useRef([])

  /* 3D tilt */
  useEffect(() => {
    const card = cardRef.current; if (!card) return
    const mv  = e => { const r = card.getBoundingClientRect(); const x=(e.clientX-r.left)/r.width-.5; const y=(e.clientY-r.top)/r.height-.5; card.style.transform=`perspective(800px) rotateY(${x*14}deg) rotateX(${-y*14}deg) scale(1.02)` }
    const lv  = () => { card.style.transform = '' }
    card.addEventListener('mousemove', mv); card.addEventListener('mouseleave', lv)
    return () => { card.removeEventListener('mousemove', mv); card.removeEventListener('mouseleave', lv) }
  }, [])

  /* Counters */
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        const el = entry.target, target = parseInt(el.dataset.count), suffix = el.dataset.suffix || ''
        let cur = 0; const step = target / 55
        const id = setInterval(() => { cur = Math.min(cur+step,target); el.textContent=Math.floor(cur)+suffix; if(cur>=target)clearInterval(id) }, 16)
        obs.unobserve(el)
      })
    }, { threshold: 0.6 })
    counterEls.current.forEach(el => el && obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="about" className="relative z-10 section-alt">
      <div className="max-w-6xl mx-auto px-6 py-28">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* LEFT */}
          <div ref={textRef} className="reveal">
            <div className="section-label">Who am I</div>
            <h2 className="font-display font-extrabold leading-tight mb-5" style={{ fontSize:'clamp(2rem,5vw,3.2rem)', letterSpacing:'-0.025em' }}>
              Passionate about{' '}
              <span className="gradient-text-cv">AI, Data Science</span>
              {' '}&amp;{' '}
              <span className="gradient-text-cv">Problem Solving</span>
            </h2>
            <p className="text-base leading-8 mb-4" style={{ color:'var(--text2)' }}>
              I'm a <strong style={{ color:'var(--text)' }}>B.Tech Computer Science</strong> student focused on becoming an <strong style={{ color:'var(--text)' }}>AI/ML Engineer.</strong> I have strong foundations in <strong style={{ color:'var(--text)' }}>Python, C++, and Data Structures &amp; Algorithms,</strong> and I build real-world projects using <strong style={{ color:'var(--text)' }}>Machine Learning and Data Analysis.</strong>
            </p>
            <p className="text-base leading-8 mb-4" style={{ color:'var(--text2)' }}>
              Currently, I am working on projects related to Agriculture AI, Rainfall Prediction, and AI-based systems that solve real-world problems.
            </p>
            <p className="text-base leading-8 mb-8" style={{ color:'var(--text2)' }}>
              I am actively looking for{' '}
              <strong style={{ color:'var(--cyan)', fontWeight:600 }}>AI/ML or Data Science internship</strong> opportunities.
            </p>
            <div className="flex flex-wrap gap-2">
              {CHIPS.map(c => <span key={c} className="chip">{c}</span>)}
            </div>
          </div>

          {/* RIGHT: card */}
          <div className="flex justify-center">
            <div ref={cardRef} className="panel reveal w-full max-w-sm p-7" style={{ transformStyle:'preserve-3d', transition:'transform .15s ease', transitionDelay:'.12s' }}>

              {/* Avatar */}
              <div className="flex items-center gap-4 mb-6 pb-6" style={{ borderBottom:'1px solid var(--border)' }}>
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center font-display font-extrabold text-xl"
                  style={{ background:'linear-gradient(135deg,var(--cyan),var(--violet))', color:'#fff', boxShadow:'0 0 20px var(--cyan-glow)' }}
                >
                  HG
                </div>
                <div>
                  <div className="font-display font-bold text-base" style={{ color:'var(--text)' }}>Hariom Gourh</div>
                  <div className="font-mono text-xs mt-0.5" style={{ color:'var(--cyan)' }}>AI/ML Engineer</div>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <span className="badge-dot" style={{ width:5, height:5 }} />
                    <span className="text-xs font-mono" style={{ color:'var(--muted)', fontSize:'.68rem' }}>Open to opportunities</span>
                  </div>
                </div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-3">
                {STATS.map(({ num, suffix, label, icon }) => (
                  <div
                    key={label}
                    className="rounded-xl p-4 text-center"
                    style={{ background:'rgba(0,217,255,.05)', border:'1px solid var(--border)' }}
                  >
                    <div className="text-lg mb-0.5 select-none">{icon}</div>
                    <div
                      className="font-display font-extrabold text-2xl"
                      style={{ color:'var(--cyan)', lineHeight:1 }}
                      data-count={num}
                      data-suffix={suffix}
                      ref={el => el && counterEls.current.push(el)}
                    >
                      0{suffix}
                    </div>
                    <div className="text-xs mt-1 font-mono" style={{ color:'var(--muted)' }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
