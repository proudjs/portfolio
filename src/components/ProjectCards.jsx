import { Link } from 'react-router-dom'
import projects from '../data/projects.js'

export default function ProjectCards({ exclude }) {
  const list = projects.filter((p) => p.slug !== exclude)
  return (
    <div className="projects">
      {list.map((p) => (
        <article className="card" key={p.slug}>
          <svg className="bud" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20 C7 15 7 9 12 4 C17 9 17 15 12 20 Z" /></svg>
          <span className="tag">{p.tag}</span>
          <h3>{p.title}</h3>
          <p>{p.card}</p>
          {p.ready
            ? <Link to={`/work/${p.slug}`}>Read the case study</Link>
            : <span className="soon">Case study coming soon</span>}
        </article>
      ))}
    </div>
  )
}
