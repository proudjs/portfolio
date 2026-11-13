import { useState } from 'react'
import { site } from '../data/site.js'

// Contact section at the bottom of every page. The header's Contact link scrolls here.
export default function Footer() {
  const [copied, setCopied] = useState(false)
  const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(site.email)}&su=${encodeURIComponent('Hi Proud')}`

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch {
      window.location.href = `mailto:${site.email}`
    }
  }

  return (
    <footer className="contact" id="contact">
      <div className="contact__main">
        <div className="contact__intro">
          <span className="eyebrow">Contact</span>
          <h2>Open to UX/UI roles.</h2>
          <p>Hiring or just want to talk design? My inbox is open.</p>
          <p className="contact__where">Based in Milwaukee, WI. Open to Chicago and remote.</p>
        </div>
        <div className="contact__actions">
          <span className="contact__email">{site.email}</span>
          <div className="contact__buttons">
            <button type="button" className="cs-btn" onClick={copy} aria-live="polite">{copied ? 'Copied ✓' : 'Copy email'}</button>
            <a className="contact__link" href={gmail} target="_blank" rel="noreferrer">Open in Gmail</a>
            <a className="contact__link" href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a className="contact__link" href={site.resumeUrl} target="_blank" rel="noreferrer">Résumé</a>
          </div>
        </div>
      </div>
      <div className="contact__bottom">
        <span>
          <svg className="contact__bud" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20 C7 15 7 9 12 4 C17 9 17 15 12 20 Z" /></svg>
          Product of Thailand. Assembled around the world.
        </span>
        <span>Built with Claude · © 2026 Jutamat (Proud) Samnakbankok</span>
      </div>
    </footer>
  )
}
