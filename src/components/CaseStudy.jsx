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
  - "### Headline" is a red headline. "#### Title" is a smaller dark title.
  - ![alt text](<url> "phone") or "wide" is an image. Two or more images in one paragraph sit side by side.
    ![caption](<slot:What goes here> "wide") is a dashed placeholder slot.
  - A paragraph in *italics only* is a caption.
  - A bullet list whose items start with an image becomes a row of tiles (image, bold title, text).
  - > quote blocks become the gold-edged note.
  - [[stats: 98 :: label || 15 of 15 :: label]] is a row of big numbers.
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

function isImg(node) {
  return node?.type === 'element' && node.tagName === 'img'
}
function hasImg(node) {
  if (!node) return false
  if (isImg(node)) return true
  return (node.children || []).some(hasImg)
}
function plainText(node) {
  if (!node) return ''
  if (node.type === 'text') return node.value
  return (node.children || []).map(plainText).join('')
}

function Figure({ src, alt, title }) {
  const kind = title === 'phone' ? 'phone' : 'wide'
  if (src?.startsWith('slot:')) {
    return (
      <figure>
        <div className={`shot ${kind}`}>Image slot<br />{decodeURIComponent(src.slice(5))}</div>
        {alt && <figcaption>{alt}</figcaption>}
      </figure>
    )
  }
  return <img src={src} alt={alt || ''} loading="lazy" decoding="async" className={`cs-img ${kind}`} />
}

function Stats({ items }) {
  return (
    <div className="cs-stats">
      {items.map((s) => <div className="stat" key={s.value + s.label}><b>{s.value}</b><span>{s.label}</span></div>)}
    </div>
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
    img: Figure,
    a: ({ href, children }) => {
      const external = /^https?:/.test(href || '')
      return <a href={href} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>{children}</a>
    },
    ul: ({ node, children }) => {
      const tiles = node.children.some((li) => li.type === 'element' && hasImg(li))
      return <ul className={tiles ? 'tiles' : undefined}>{children}</ul>
    },
    p: ({ node, children }) => {
      const kids = node.children.filter((c) => !(c.type === 'text' && !c.value.trim()))
      const text = kids.length === 1 && kids[0].type === 'text' ? kids[0].value.trim() : ''

      if (text === '[[claims]]') {
        return project.claims ? (
          <div className="claims">
            <div><span className="eyebrow">What I can claim</span><p>{project.claims.can}</p></div>
            <div><span className="eyebrow">What I can't claim yet</span><p>{project.claims.cant}</p></div>
          </div>
        ) : null
      }
      if (text === '[[prototype]]') {
        return project.prototypeUrl
          ? <a className="cs-btn" href={project.prototypeUrl} target="_blank" rel="noreferrer">Try the prototype</a>
          : null
      }
      const raw = plainText(node).trim()
      if (raw.startsWith('[[stats:') && raw.endsWith(']]')) {
        const items = raw.slice(8, -2).split('||').map((s) => {
          const [value, ...rest] = s.split('::')
          return { value: value.trim(), label: rest.join('::').trim() }
        })
        return <Stats items={items} />
      }
      if (kids.length && kids.every(isImg)) {
        return <div className="gallery" data-count={Math.min(kids.length, 4)}>{children}</div>
      }
      if (kids.length === 1 && kids[0].type === 'element' && kids[0].tagName === 'em') {
        return <p className="caption">{children}</p>
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
          {project.note && <p className="note">{project.note}</p>}
          {project.prototypeUrl && (
            <a className="cs-link" href={project.prototypeUrl} target="_blank" rel="noreferrer">Try the prototype →</a>
          )}
          <dl className="cs-meta">
            {project.role && <div><dt>Role</dt><dd>{project.role}</dd></div>}
            {project.scope && <div><dt>Scope</dt><dd>{project.scope}</dd></div>}
            {project.team && <div><dt>Team</dt><dd>{project.team}</dd></div>}
            {project.timeline && <div><dt>Timeline</dt><dd>{project.timeline}</dd></div>}
          </dl>
        </header>

        {project.hero && (
          <div className={`cs-hero ${project.hero.kind === 'phone' ? 'phone' : ''}`}>
            <Figure src={project.hero.src} alt={project.hero.alt || project.hero.caption} title={project.hero.kind || 'wide'} />
          </div>
        )}

        {project.stats?.length > 0 && <Stats items={project.stats} />}

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
