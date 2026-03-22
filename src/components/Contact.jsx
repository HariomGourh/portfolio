import { useEffect, useRef, useState } from 'react'
import { useReveal } from '../hooks/useReveal'

/* ── Social icons (inline SVG, no library needed) ── */
const SOCIALS = [
  {
    label: 'GitHub',
    href:  'https://github.com/HariomGourh',   // ← change this
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href:  'https://www.linkedin.com/in/hariomgourh',  // ← change this
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: 'Twitter / X',
    href:  'https://twitter.com/your-username',  // ← change this
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: 'Email',
    href:  'mailto: hariomgourh489@gmail.com',           // ← change this
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
]

/**
 * Contact
 * ───────
 * • Heading with section label
 * • Glassmorphic form (name, email, subject, message)
 * • Submit animation: Idle → Sending… → Sent ✓
 * • Social icon row
 */
export default function Contact() {
  const headRef = useReveal()
  const cardRef = useReveal()

  const [status, setStatus] = useState('idle') // 'idle' | 'sending' | 'sent'
  const formRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('sending')
    /* ── Replace this timeout with a real API call (EmailJS / Resend / etc.) ── */
    setTimeout(() => {
      setStatus('sent')
      setTimeout(() => {
        setStatus('idle')
        formRef.current?.reset()
      }, 3500)
    }, 1600)
  }

  return (
    <section id="contact" className="relative z-10 text-center">
      <div className="max-w-2xl mx-auto px-6 py-28">

        {/* Heading */}
        <div ref={headRef} className="reveal mb-10">
          <div className="section-label justify-center">Let's Connect</div>
          <h2 className="font-display font-extrabold leading-tight" style={{ fontSize:'clamp(2rem,5vw,3.2rem)' }}>
            Have a project in <span className="gradient-text-cv">mind?</span>
          </h2>
          <p className="mt-3 text-base max-w-md mx-auto" style={{ color:'var(--muted)' }}>
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
        </div>

        {/* Form card */}
        <div ref={cardRef} className="glass-card reveal p-8 text-left">
          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Name + Email row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-xs tracking-widest uppercase" style={{ color:'var(--muted)' }}>
                  Your Name
                </label>
                <input className="form-input" type="text" placeholder="John Doe" required />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-xs tracking-widest uppercase" style={{ color:'var(--muted)' }}>
                  Email Address
                </label>
                <input className="form-input" type="email" placeholder="john@example.com" required />
              </div>
            </div>

            {/* Subject */}
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-xs tracking-widest uppercase" style={{ color:'var(--muted)' }}>
                Subject
              </label>
              <input className="form-input" type="text" placeholder="Project collaboration / Freelance work" />
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-xs tracking-widest uppercase" style={{ color:'var(--muted)' }}>
                Message
              </label>
              <textarea
                className="form-input"
                rows={5}
                placeholder="Tell me about your project, timeline and budget..."
                style={{ resize:'vertical' }}
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="btn-primary w-full justify-center mt-1"
              disabled={status !== 'idle'}
              style={status === 'sent' ? { background:'linear-gradient(135deg,#4ade80,#22d3ee)', opacity:1 } : {}}
            >
              <span>
                {status === 'idle'    && 'Send Message ✦'}
                {status === 'sending' && 'Sending…'}
                {status === 'sent'    && 'Message Sent! ✓'}
              </span>
            </button>
          </form>
        </div>

        {/* Social icons */}
        <div className="flex justify-center gap-4 mt-8">
          {SOCIALS.map(({ label, href, icon }) => (
            <a
              key={label}
              href={href}
              className="social-btn"
              title={label}
              target="_blank"
              rel="noreferrer"
            >
              {icon}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
