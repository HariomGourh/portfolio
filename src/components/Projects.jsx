import { useEffect, useRef } from 'react'
import { useReveal } from '../hooks/useReveal'

const PROJECTS = [
  {
    emoji:'🌧️', tag:'AI / ML', tagColor:'var(--cyan)',
    title:'Physics-Informed Rainfall Prediction',
    desc:'Built a spatiotemporal deep learning model using ERA5 climate data to predict rainfall over India. Integrated CNN + BiLSTM with physics-based loss (mass, energy, moisture conservation) for realistic & accurate predictions.',
    stack:['Python','PyTorch','NumPy','Pandas','ERA5 Dataset'],
    demo:'#', code:'https://github.com/HariomGourh/Rainfall-Prediction-Using-ML.git',
    bg:'linear-gradient(135deg,rgba(0,217,255,.08),rgba(139,92,246,.06))',
    accent:'#00d9ff',
  },
  {
    emoji:'🌾', tag:'AI / ML', tagColor:'var(--green)',
    title:'AI Smart Agriculture System',
    desc:'Developed an AI-based system for crop yield prediction and plant disease detection using ML and CNN models. Enabled data-driven decision making for farmers.',
    stack:['Python','Flask','Scikit-learn','TensorFlow','HTML/CSS/JS'],
    demo:'#', code:'https://github.com/HariomGourh/Kisan-Saathi-Project.git',
    bg:'linear-gradient(135deg,rgba(16,185,129,.08),rgba(0,217,255,.06))',
    accent:'#10b981',
  },
  {
    emoji:'🤖', tag:'AI / ML', tagColor:'var(--violet)',
    title:'AskMITS AI Chatbot',
    desc:'Built an AI-powered chatbot to answer university-related queries using NLP concepts. Improved accessibility of information through automated responses.',
    stack:['Python','NLP','Chatbot Logic'],
    demo:'https://askmits.vercel.app/', code:'https://github.com/HariomGourh/AskMITS-Vercel-frontend.git',
    bg:'linear-gradient(135deg,rgba(139,92,246,.08),rgba(244,114,182,.06))',
    accent:'#8b5cf6',
  },
]

const LinkIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
  </svg>
)
const GitIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
)

function ProjectCard({ project, delay }) {
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if(e.isIntersecting){ref.current?.classList.add('visible');obs.unobserve(e.target)} },{ threshold:.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const card = ref.current; if (!card) return
    const mv = e => { const r=card.getBoundingClientRect(); card.style.transform=`perspective(900px) translateY(-8px) rotateY(${((e.clientX-r.left)/r.width-.5)*8}deg) rotateX(${-((e.clientY-r.top)/r.height-.5)*8}deg)` }
    const lv = () => { card.style.transform = '' }
    card.addEventListener('mousemove',mv); card.addEventListener('mouseleave',lv)
    return () => { card.removeEventListener('mousemove',mv); card.removeEventListener('mouseleave',lv) }
  }, [])

  return (
    <div
      ref={ref}
      className="panel reveal project-card-wrap"
      style={{ transitionDelay:`${delay}s`, transformStyle:'preserve-3d', transition:'transform .18s ease, border-color .4s, box-shadow .4s', overflow:'hidden' }}
    >
      {/* Glow overlay on hover */}
      <div className="project-glow" />

      {/* Colored accent bar top */}
      <div style={{ height:2, background:`linear-gradient(90deg, ${project.accent}, transparent)`, boxShadow:`0 0 20px ${project.accent}60` }} />

      {/* Thumbnail */}
      <div
        className="flex items-center justify-center relative overflow-hidden"
        style={{ height:180, background:project.bg }}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{ backgroundImage:'linear-gradient(rgba(0,217,255,0.12) 1px,transparent 1px),linear-gradient(90deg,rgba(0,217,255,0.12) 1px,transparent 1px)', backgroundSize:'30px 30px' }}
        />
        <div style={{ fontSize:'3.8rem', lineHeight:1, position:'relative', zIndex:1, filter:`drop-shadow(0 0 24px ${project.accent})` }}>
          {project.emoji}
        </div>
        {/* Corner accent glow */}
        <div style={{ position:'absolute', top:0, right:0, width:80, height:80, background:`radial-gradient(circle, ${project.accent}30, transparent 70%)`, pointerEvents:'none' }} />
      </div>

      {/* Content */}
      <div className="p-7">
        <div className="flex items-center gap-1.5 mb-2" style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'.7rem', letterSpacing:'3px', textTransform:'uppercase', color:project.tagColor }}>
          <span style={{ width:4, height:4, borderRadius:'50%', background:project.tagColor, display:'inline-block', boxShadow:`0 0 6px ${project.accent}` }} />
          {project.tag}
        </div>
        <h3 className="font-display font-bold text-lg mb-3 leading-snug" style={{ color:'var(--text)', letterSpacing:'-0.02em' }}>
          {project.title}
        </h3>
        <p className="text-sm leading-relaxed mb-4" style={{ color:'var(--muted)', lineHeight:1.78 }}>
          {project.desc}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.stack.map(t => <span key={t} className="stack-tag">{t}</span>)}
        </div>
        <div className="flex gap-2 pt-4" style={{ borderTop:'1px solid var(--border)' }}>
          {[
            { href:project.demo, icon:<LinkIcon />, label:'Live Demo', hc:'var(--cyan)' },
            { href:project.code, icon:<GitIcon />,  label:'GitHub',    hc:'var(--violet)' },
          ].map(({ href, icon, label, hc }) => (
            <a
              key={label} href={href} target="_blank" rel="noreferrer"
              className="flex items-center gap-1.5 text-xs font-semibold no-underline px-3 py-1.5 rounded-lg"
              style={{ color:'var(--muted)', border:'1px solid var(--border)', transition:'all .25s' }}
              onMouseEnter={e=>{e.currentTarget.style.color=hc;e.currentTarget.style.borderColor=hc;e.currentTarget.style.background=`${hc}15`}}
              onMouseLeave={e=>{e.currentTarget.style.color='var(--muted)';e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.background='transparent'}}
            >
              {icon} {label}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const headRef = useReveal()
  return (
    <section id="projects" className="relative z-10 section-alt">
      <div className="max-w-6xl mx-auto px-6 py-28">
        <div ref={headRef} className="reveal text-center mb-14">
          <div className="section-label justify-center">Selected Work</div>
          <h2 className="font-display font-extrabold leading-tight" style={{ fontSize:'clamp(2rem,5vw,3.2rem)', letterSpacing:'-0.025em' }}>
            AI/ML Projects <span className="gradient-text-cv">&amp; Work</span>
          </h2>
          <p className="mt-3 text-base max-w-md mx-auto" style={{ color:'var(--text2)' }}>
            Real-world AI and Machine Learning projects focused on solving practical problems using data and intelligent systems.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((p, i) => <ProjectCard key={p.title} project={p} delay={i * 0.1} />)}
        </div>
      </div>
    </section>
  )
}
