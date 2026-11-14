import ThemeSwitch from './ThemeSwitch.jsx'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { site } from '../data/site.js'

// The header stays at the top while scrolling. Once the page moves it tightens and gets a thin line.
export default function Nav({ fullName = false }) {
  const [scrolled, setScrolled] = useState(false)
  const [toast, setToast] = useState('')
  // Opens the visitor's mail app and also copies the address, in case no mail app is set up.
  const copyEmail = () => {
    navigator.clipboard?.writeText(site.email).then(() => {
      setToast(`Copied ${site.email}`)
      setTimeout(() => setToast(''), 2600)
    }).catch(() => {})
  }
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <nav className={`nav${scrolled ? ' is-scrolled' : ''}`} aria-label="Main">
      <Link to="/" className="name"><img className="name__logo" src="/favicon-flower.svg" alt="" width="30" height="30" />{fullName ? 'Jutamat (Proud) Samnakbankok' : 'Proud Samnakbankok'}</Link>
      <ul>
        <li><Link to="/#work">Work</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><a href={site.resumeUrl} target="_blank" rel="noreferrer">Résumé</a></li>
        <li><ThemeSwitch /></li>
        <li className="nav__connect-wrap">
          <a className="nav__connect" href={`mailto:${site.email}`} onClick={copyEmail}>Let’s connect <span aria-hidden="true">↗</span></a>
          <span className="nav__toast" role="status" aria-live="polite">{toast}</span>
        </li>
      </ul>
    </nav>
  )
}
