import { Link } from 'react-router-dom'

export default function Nav({ fullName = false }) {
  return (
    <nav className="nav" aria-label="Main">
      <Link to="/" className="name">{fullName ? 'Jutamat (Proud) Samnakbankok' : 'Proud Samnakbankok'}</Link>
      <ul>
        <li><Link to="/#work">Work</Link></li>
        <li><a href="https://www.linkedin.com/in/proud-samnakbankok" target="_blank" rel="noreferrer">LinkedIn</a></li>
        <li><a href="mailto:proud.samnakbankok@gmail.com">Email</a></li>
      </ul>
    </nav>
  )
}
