import { useEffect, useRef } from 'react'
import { useReveal } from '../hooks/useReveal'

const PROJECTS = [
  {
    emoji: '🌧️',
    tag:   'AI / ML',
    tagColor: 'var(--cyan)',
    title: 'Physics-Informed Rainfall Prediction',
    desc:  'Built a spatiotemporal deep learning model using ERA5 climate data to predict rainfall over India. Integrated CNN + BiLSTM with physics-based loss (mass, energy, moisture conservation) for realistic & accurate predictions.',
    stack: ['Python','PyTorch','NumPy','Pandas','ERA5 Dataset'],
    demo:  '#',
    code:  'https://github.com/HariomGourh/Rainfall-Prediction-Using-ML.git',
    imgBg: 'linear-gradient(135deg,#030c1e 0%,#0a1540 50%,#0d1c3c 100%)',
    accentColor: 'rgba(56,189,248,.35)',
  },
  {
    emoji: '🌾',
    tag:   'AI / ML',
    tagColor: 'var(--green)',
    title: 'AI Smart Agriculture System',
    desc:  'Developed an AI-based system for crop yield prediction and plant disease detection using ML and CNN models. Enabled data-driven decision making for farmers.',
    stack: ['Python','Flask','Scikit-learn','TensorFlow','HTML/CSS/JS'],
    demo:  '#',
    code:  'https://github.com/HariomGourh/Kisan-Saathi-Project.git',
    imgBg: 'linear-gradient(135deg,#020e04 0%,#071a0a 50%,#0a200c 100%)',
    accentColor: 'rgba(52,211,153,.35)',
  },
  {
    emoji: '🤖',
    tag:   'AI / ML',
    tagColor: 'var(--violet)',
    title: 'AskMITS AI Chatbot',
    desc:  'Built an AI-powered chatbot to answer university-related queries using NLP concepts. Improved accessibility of information through automated responses.',
    stack: ['Python','NLP','Chatbot Logic'],
    demo:  'https://askmits.vercel.app/',
    code:  'https://github.com/HariomGourh/AskMITS-Vercel-frontend.git',
    imgBg: 'linear-gradient(135deg,#07030e 0%,#0e051e 50%,#130828 100%)',
    accentColor: 'rgba(167,139,250,.35)',
  },
]

const GithubIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
)
const LinkIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
  </svg>
)

function ProjectCard({ project, delay }) {
  const cardRef = useRef(null)

  /* Scroll reveal */
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { cardRef.current?.classList.add('visible'); obs.unobserve(e.target) }
    }, { threshold: 0.12 })
    if (cardRef.current) obs.observe(cardRef.current)
    return () => obs.disconnect()
  }, [])

  /* 3D tilt */
  useEffect(() => {
    const card = cardRef.current
    if (!card) return
    const onMove = (e) => {
      const r = card.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width  - 0.5
      const y = (e.clientY - r.top)  / r.height - 0.5
      card.style.transform = `perspective(900px) translateY(-8px) rotateY(${x*8}deg) rotateX(${-y*8}deg)`
    }
    const onLeave = () => { card.style.transform = '' }
    card.addEventListener('mousemove', onMove)
    card.addEventListener('mouseleave', onLeave)
    return () => { card.removeEventListener('mousemove', onMove); card.removeEventListener('mouseleave', onLeave) }
  }, [])

  return (
    <div
      ref={cardRef}
      className="glass-card reveal project-card-wrap cursor-pointer overflow-hidden"
      style={{
        transitionDelay: `${delay}s`,
        transformStyle: 'preserve-3d',
        transition: 'transform .18s ease, border-color var(--tr), box-shadow var(--tr)',
      }}
    >
      {/* Thumbnail */}
      <div
        className="relative overflow-hidden flex items-center justify-center"
        style={{ height: 210, background: project.imgBg, borderRadius:'18px 18px 0 0' }}
      >
        {/* Glow overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 50% 80%, ${project.accentColor}, transparent 65%)`,
            pointerEvents: 'none',
          }}
        />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: 'linear-gradient(var(--text) 1px,transparent 1px),linear-gradient(90deg,var(--text) 1px,transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="text-6xl select-none z-10 transition-transform duration-500 hover:scale-110">
          {project.emoji}
        </div>
        <div className="project-glow" />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Tag */}
        <div
          className="font-mono text-[11px] tracking-widest uppercase mb-1.5 flex items-center gap-1.5"
          style={{ color: project.tagColor }}
        >
          <span
            className="inline-block w-1.5 h-1.5 rounded-full"
            style={{ background: project.tagColor }}
          />
          {project.tag}
        </div>

        {/* Title */}
        <h3
          className="font-display font-bold text-[1.1rem] mb-3 leading-snug transition-colors duration-300"
          style={{ color:'var(--text)' }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm leading-relaxed mb-4" style={{ color:'var(--muted)', lineHeight:1.75 }}>
          {project.desc}
        </p>

        {/* Stack tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.stack.map(t => <span key={t} className="stack-tag">{t}</span>)}
        </div>

        {/* Links */}
        <div
          className="flex gap-2 pt-4"
          style={{ borderTop:'1px solid var(--border)' }}
        >
          <a
            href={project.demo}
            className="flex items-center gap-1.5 text-xs font-semibold no-underline px-3 py-2 rounded-lg transition-all duration-300"
            style={{ color:'var(--muted)', background:'transparent', border:'1px solid var(--border)' }}
            onMouseEnter={e => { e.currentTarget.style.color='var(--cyan)'; e.currentTarget.style.borderColor='var(--cyan)'; e.currentTarget.style.background='var(--cyan-dim)' }}
            onMouseLeave={e => { e.currentTarget.style.color='var(--muted)'; e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.background='transparent' }}
            target="_blank" rel="noreferrer"
          >
            <LinkIcon /> Live Demo
          </a>
          <a
            href={project.code}
            className="flex items-center gap-1.5 text-xs font-semibold no-underline px-3 py-2 rounded-lg transition-all duration-300"
            style={{ color:'var(--muted)', background:'transparent', border:'1px solid var(--border)' }}
            onMouseEnter={e => { e.currentTarget.style.color='var(--violet)'; e.currentTarget.style.borderColor='var(--violet)'; e.currentTarget.style.background='var(--violet-dim)' }}
            onMouseLeave={e => { e.currentTarget.style.color='var(--muted)'; e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.background='transparent' }}
            target="_blank" rel="noreferrer"
          >
            <GithubIcon /> GitHub
          </a>
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const headRef = useReveal()

  return (
    <section id="projects" className="relative z-10">
      <div className="max-w-6xl mx-auto px-6 py-28">

        <div ref={headRef} className="reveal text-center mb-14">
          <div className="section-label justify-center">Selected Work</div>
          <h2 className="font-display font-extrabold leading-tight" style={{ fontSize:'clamp(2rem,5vw,3.2rem)' }}>
            AI/ML Projects <span className="gradient-text-cv">&amp; Work</span>
          </h2>
          <p className="mt-3 text-base max-w-md mx-auto" style={{ color:'var(--muted)' }}>
            Real-world AI and Machine Learning projects focused on solving practical problems using
            data and intelligent systems.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.title} project={p} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  )
}
