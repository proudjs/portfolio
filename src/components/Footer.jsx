import { useState } from 'react'
import { site } from '../data/site.js'
import flower from '../assets/flowers/hero-flower.json'

// Simple footer on every page. The header's Contact link scrolls here.
export default function Footer() {
  const [copied, setCopied] = useState(false)

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
    <footer className="site-foot" id="contact">
      <span className="site-foot__left">
        <svg className="site-foot__flower" viewBox={flower.viewBox} aria-hidden="true"><g transform="translate(1176,0) scale(-1,1)"><path d={flower.ink} /></g></svg>
        Product of Thailand. Assembled around the world.
      </span>
      <span className="site-foot__right">
        <a className="site-foot__icon" href={site.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" /></svg>
        </a>
        <button type="button" className="site-foot__icon" onClick={copy} aria-label={`Copy email address ${site.email}`} title={site.email}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm1 2.2V17h16V7.2l-8 5.3-8-5.3zM5.6 7l6.4 4.2L18.4 7H5.6z" /></svg>
        </button>
        <span className="site-foot__copied" aria-live="polite">{copied ? 'Email copied' : ''}</span>
        <span>Built with Claude · © 2026 Jutamat (Proud) Samnakbankok</span>
      </span>
    </footer>
  )
}
