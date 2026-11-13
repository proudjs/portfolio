import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import Nav from './Nav.jsx'
import Footer from './Footer.jsx'
import ProjectCards from './ProjectCards.jsx'
import NotFound from './NotFound.jsx'
import { getProject } from '../data/projects.js'

/*
  How a case study file becomes a page (see src/content/work/_template.md):
  - Each "## Label" starts a numbered section and a link in "On this page".
  - The first "### Headline" in a section is the red headline.
  - ![caption](slot:What goes here "wide") is a dashed image slot. Use "phone" for a phone screen.
    Real images: ![caption](/work/bmo/home-after.webp "phone"). Two images in one paragraph sit side by side.
  - > quote blocks become the gold-edged "changed my mind" note.
  - [[claims]] places the "What I can claim / can't claim yet" pair from the frontmatter.
  - [[prototype]] places the "Try the prototype" button.
*/
function splitSections(content) {
  return content.split(/^## /m).slice(1).map((chunk, i) => {
    const nl = chunk.indexOf('\n')
    const label = (nl === -1 ? chunk : chunk.slice(0, nl)).trim()
    const body = nl === -1 ? '' : chunk.slice(nl + 1).trim()
    const id = label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    return { label, body, id, n: String(i + 1).padStart(2, '0') }
  })
}

function Figure({ src, alt, title }) {
  const kind = title === 'phone' ? 'phone' : 'wide'
  const isSlot = src?.startsWith('slot:')
  return (
    <figure>
      {isSlot
        ? <div className={`shot ${kind}`}>Image slot<br />{decodeURIComponent(src.slice(5))}</div>
        : <img src={src} alt={alt} loading="lazy" className={kind === 'phone' ? 'shot phone' : undefined} style={{ border: 0, padding: 0 }} />}
      {alt && <figcaption>{alt}</figcaption>}
    </figure>
  )
}

export default function CaseStudy() {
  const { slug } = useParams()
  const project = getProject(slug)
  const sections = useMemo(() => (project ? splitSections(project.content) : []), [project])
  const [active, setActive] = useState(sections[0]?.id)

  useEffect(() => {
    if (!project || !project.ready) return undefined
    document.title = `${project.title} · Proud Samnakbankok`
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id) })
    }, { rootMargin: '-20% 0px -65% 0px' })
    document.querySelectorAll('.cs-sec').forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [project])

  if (!project || !project.ready) return <NotFound />

  const components = {
    h3: ({ children }) => <h3>{children}</h3>,
    img: Figure,
    p: ({ node, children }) => {
      const text = node.children.length === 1 && node.children[0].type === 'text' ? node.children[0].value.trim() : ''
      if (text === '[[claims]]' && project.claims) {
        return (
          <div className="claims">
            <div><span className="eyebrow">What I can claim</span><p>{project.claims.can}</p></div>
            <div><span className="eyebrow">What I can't claim yet</span><p>{project.claims.cant}</p></div>
          </div>
        )
      }
      if (text === '[[prototype]]') {
        return project.prototypeUrl
          ? <a className="cs-btn" href={project.prototypeUrl} target="_blank" rel="noreferrer">Try the prototype</a>
          : null
      }
      const kids = node.children.filter((c) => !(c.type === 'text' && !c.value.trim()))
      if (kids.length && kids.every((c) => c.tagName === 'img')) {
        return <div className={kids.length > 1 ? 'pair' : undefined}>{children}</div>
      }
      return <p>{children}</p>
    },
  }

  const jump = (e, id) => {
    e.preventDefault()
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <div className="wrap">
      <Nav />
      <main style={{ display: 'grid', gap: 48 }}>
        <header className="cs-head">
          <span className="tag">{project.tag}</span>
          <h1>{project.headline || project.title}</h1>
          {project.summary && <p>{project.summary}</p>}
          <dl className="cs-meta">
            {project.role && <div><dt>Role</dt><dd>{project.role}</dd></div>}
            {project.scope && <div><dt>Scope</dt><dd>{project.scope}</dd></div>}
            {project.timeline && <div><dt>Timeline</dt><dd>{project.timeline}</dd></div>}
          </dl>
        </header>

        {project.hero && <Figure src={project.hero.src} alt={project.hero.caption} title="wide" />}

        {project.stats?.length > 0 && (
          <div className="cs-stats">
            {project.stats.map((s) => <div className="stat" key={s.value}><b>{s.value}</b><span>{s.label}</span></div>)}
          </div>
        )}

        <div className="cs-body">
          <nav className="cs-toc" aria-label="On this page">
            <span className="eyebrow">On this page</span>
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} className={active === s.id ? 'on' : undefined} onClick={(e) => jump(e, s.id)}>{s.label}</a>
            ))}
          </nav>
          <div className="cs-main">
            {sections.map((s) => (
              <section className="cs-sec" id={s.id} key={s.id} aria-label={s.label}>
                <div className="cs-num eyebrow"><i>{s.n}</i>{s.label}</div>
                <ReactMarkdown components={components} urlTransform={(u) => u}>{s.body}</ReactMarkdown>
              </section>
            ))}
          </div>
        </div>

        <section style={{ display: 'grid', gap: 18, paddingTop: 24, borderTop: '1px solid var(--line)' }} aria-label="More work">
          <span className="eyebrow">More work</span>
          <ProjectCards exclude={slug} />
        </section>
      </main>
      <Footer />
    </div>
  )
}
