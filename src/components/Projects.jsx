import { useEffect, useRef } from 'react'
import { useReveal } from '../hooks/useReveal'

const PROJECTS = [
  {
    num:   '01',
    emoji: '🌧️',
    tag:   'AI / ML',
    tagColor: '#38bdf8',
    title: 'Physics-Informed Rainfall Prediction',
    desc:  'Built a spatiotemporal deep learning model using ERA5 climate data to predict rainfall over India. Integrated CNN + BiLSTM with physics-based loss (mass, energy, moisture conservation) for realistic & accurate predictions.',
    stack: ['Python', 'PyTorch', 'NumPy', 'Pandas', 'ERA5 Dataset'],
    demo:  '#',
    code:  'https://github.com/HariomGourh/Rainfall-Prediction-Using-ML.git',
    accent: '#38bdf8',
  },
  {
    num:   '02',
    emoji: '🌾',
    tag:   'AI / ML',
    tagColor: '#34d399',
    title: 'AI Smart Agriculture System',
    desc:  'Developed an AI-based system for crop yield prediction and plant disease detection using ML and CNN models. Enabled data-driven decision making for farmers.',
    stack: ['Python', 'Flask', 'Scikit-learn', 'TensorFlow', 'HTML/CSS/JS'],
    demo:  '#',
    code:  'https://github.com/HariomGourh/Kisan-Saathi-Project.git',
    accent: '#34d399',
  },
  {
    num:   '03',
    emoji: '🤖',
    tag:   'AI / ML',
    tagColor: '#a78bfa',
    title: 'AskMITS AI Chatbot',
    desc:  'Built an AI-powered chatbot to answer university-related queries using NLP concepts. Improved accessibility of information through automated responses.',
    stack: ['Python', 'NLP', 'Chatbot Logic'],
    demo:  'https://askmits.vercel.app/',
    code:  'https://github.com/HariomGourh/AskMITS-Vercel-frontend.git',
    accent: '#a78bfa',
  },
]

const GithubIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
)
const LinkIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
  </svg>
)

function ProjectCard({ project, delay }) {
  const cardRef = useRef(null)

  /* Scroll reveal */
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { cardRef.current?.classList.add('visible'); obs.unobserve(e.target) }
    }, { threshold: 0.1 })
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
      card.style.transform = `perspective(1000px) translateY(-6px) rotateY(${x*7}deg) rotateX(${-y*7}deg)`
    }
    const onLeave = () => { card.style.transform = '' }
    card.addEventListener('mousemove', onMove)
    card.addEventListener('mouseleave', onLeave)
    return () => { card.removeEventListener('mousemove', onMove); card.removeEventListener('mouseleave', onLeave) }
  }, [])

  return (
    <div
      ref={cardRef}
      className="card reveal project-card-wrap"
      style={{
        transitionDelay: `${delay}s`,
        transformStyle: 'preserve-3d',
        transition: 'transform .18s ease, border-color .36s, box-shadow .36s',
      }}
    >
      <div className="project-glow" />

      <div className="p-7 md:p-8">
        <div className="flex flex-col md:flex-row md:items-start gap-6">

          {/* Number + emoji block */}
          <div className="flex-shrink-0 flex md:flex-col items-center md:items-start gap-4 md:gap-0">
            <div className="project-num">{project.num}</div>
            <div style={{ fontSize: '2.6rem', lineHeight: 1 }}>{project.emoji}</div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Tag */}
            <div
              className="flex items-center gap-1.5 mb-2"
              style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '.7rem', letterSpacing: '3px', textTransform: 'uppercase', color: project.tagColor }}
            >
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: project.tagColor, display: 'inline-block', flexShrink: 0 }} />
              {project.tag}
            </div>

            {/* Title */}
            <h3
              className="font-display font-bold mb-3 leading-snug"
              style={{ fontSize: 'clamp(1.1rem, 2.2vw, 1.35rem)', color: 'var(--text)', letterSpacing: '-0.02em' }}
            >
              {project.title}
            </h3>

            {/* Desc */}
            <p className="text-sm mb-4" style={{ color: 'var(--muted)', lineHeight: 1.8 }}>
              {project.desc}
            </p>

            {/* Stack */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {project.stack.map(t => <span key={t} className="stack-tag">{t}</span>)}
            </div>

            {/* Links */}
            <div className="flex items-center gap-3" style={{ paddingTop: '1rem', borderTop: '1px solid var(--line)' }}>
              <a
                href={project.demo}
                target="_blank" rel="noreferrer"
                className="flex items-center gap-1.5 text-xs font-semibold no-underline px-3 py-1.5 rounded-lg"
                style={{ color: 'var(--muted)', border: '1px solid var(--line)', transition: 'all .25s' }}
                onMouseEnter={e => { e.currentTarget.style.color='var(--lime)'; e.currentTarget.style.borderColor='var(--lime)'; e.currentTarget.style.background='var(--lime-dim)' }}
                onMouseLeave={e => { e.currentTarget.style.color='var(--muted)'; e.currentTarget.style.borderColor='var(--line)'; e.currentTarget.style.background='transparent' }}
              >
                <LinkIcon /> Live Demo
              </a>
              <a
                href={project.code}
                target="_blank" rel="noreferrer"
                className="flex items-center gap-1.5 text-xs font-semibold no-underline px-3 py-1.5 rounded-lg"
                style={{ color: 'var(--muted)', border: '1px solid var(--line)', transition: 'all .25s' }}
                onMouseEnter={e => { e.currentTarget.style.color='var(--accent)'; e.currentTarget.style.borderColor='var(--accent)'; e.currentTarget.style.background='var(--accent-dim)' }}
                onMouseLeave={e => { e.currentTarget.style.color='var(--muted)'; e.currentTarget.style.borderColor='var(--line)'; e.currentTarget.style.background='transparent' }}
              >
                <GithubIcon /> GitHub
              </a>
              {/* Accent bar */}
              <div style={{ flexGrow: 1, height: 1, background: `linear-gradient(90deg, ${project.accent}40, transparent)` }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const headRef = useReveal()

  return (
    <section id="projects" className="relative z-10 overflow-hidden">
      <span className="section-ghost-num">03</span>

      <div className="max-w-6xl mx-auto px-6 py-28">
        <div ref={headRef} className="reveal mb-14">
          <div className="section-label">Selected Work</div>
          <h2
            className="font-display font-extrabold"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', letterSpacing: '-0.03em', lineHeight: 1.1 }}
          >
            AI/ML Projects <span className="gradient-text-cv">&amp; Work</span>
          </h2>
          <p className="mt-3 text-base max-w-xl" style={{ color: 'var(--muted)', lineHeight: 1.8 }}>
            Real-world AI and Machine Learning projects focused on solving practical problems
            using data and intelligent systems.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.title} project={p} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  )
}
