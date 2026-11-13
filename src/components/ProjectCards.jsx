import { Link } from 'react-router-dom'
import projects from '../data/projects.js'

// Big picture cards. The whole card is one link.
export default function ProjectCards({ exclude }) {
  const list = projects.filter((p) => p.slug !== exclude && p.ready)
  return (
    <div className="work-cards">
      {list.map((p) => (
        <Link className="work-card" to={`/work/${p.slug}`} key={p.slug} aria-label={`${p.title}. ${p.card}. Read the case study`}>
          <div className="work-card__art" aria-hidden="true">
            {p.covers?.map((src, i) => (
              <img key={src} src={src} alt="" loading="lazy" decoding="async" className={`work-card__screen s${i + 1}`} />
            ))}
          </div>
          <div className="work-card__text">
            <ul className="work-card__tags">
              {p.tag.split('·').map((t) => <li key={t}>{t.trim()}</li>)}
            </ul>
            <h3>{p.title}</h3>
            <p>{p.card}</p>
            <span className="work-card__cta">Read the case study <span aria-hidden="true">→</span></span>
          </div>
        </Link>
      ))}
    </div>
  )
}
