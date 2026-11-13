import { Link } from 'react-router-dom'
import { site } from '../data/site.js'

export default function Nav({ fullName = false }) {
  return (
    <nav className="nav" aria-label="Main">
      <Link to="/" className="name">{fullName ? 'Jutamat (Proud) Samnakbankok' : 'Proud Samnakbankok'}</Link>
      <ul>
        <li><Link to="/#work">Work</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><a href={site.resumeUrl} target="_blank" rel="noreferrer">Résumé</a></li>
        <li><a href={`mailto:${site.email}`}>Email</a></li>
      </ul>
    </nav>
  )
}
