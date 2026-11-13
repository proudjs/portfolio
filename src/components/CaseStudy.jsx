import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import Nav from './Nav.jsx'
import Footer from './Footer.jsx'
import ProjectCards from './ProjectCards.jsx'
import NotFound from './NotFound.jsx'
import { getProject } from '../data/projects.js'
import { Figure, Stats, makeComponents, splitSections } from './markdown.jsx'

/* Markdown syntax for case studies is documented in markdown.jsx. */

export default function CaseStudy() {
  const { slug } = useParams()
  const project = getProject(slug)
  const sections = useMemo(() => (project ? splitSections(project.content) : []), [project])
  const [active, setActive] = useState(sections[0]?.id)

  useEffect(() => {
    if (!project || !project.ready) return undefined
    document.title = `${project.title} · Proud Samnakbankok`
    // Highlight the section being read: the last one whose top has passed 35% of the screen.
    // At the bottom of the page the last section wins, so the dot never sticks or jumps back.
    const secs = [...document.querySelectorAll('.cs-sec')]
    let raf = 0
    const update = () => {
      raf = 0
      const line = window.innerHeight * 0.35
      const atEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4
      let id = secs[0]?.id
      for (const s of secs) if (s.getBoundingClientRect().top <= line) id = s.id
      const last = secs[secs.length - 1]
      if (atEnd) id = last?.id
      setActive((prev) => (prev === id ? prev : id))
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(raf) }
  }, [project])

  if (!project || !project.ready) return <NotFound />

  const components = makeComponents(project)

  const jump = (e, id) => {
    e.preventDefault()
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <div className="wrap">
      <Nav />
      <main style={{ display: 'grid', gap: 48 }}>
        <div className={`cs-top ${project.hero ? 'has-hero' : ''}`}>
        {/* Reading order: what it is (title), the point (summary), the proof (results),
            what to do (prototype or read on), then the quiet project facts. */}
        <header className="cs-head">
          <span className="tag">{project.tag}</span>
          <h1>{project.headline || project.title}</h1>
          {project.summary && <p className="cs-lede">{project.summary}</p>}
          {project.note && <p className="note">{project.note}</p>}
          {project.stats?.length > 0 && <Stats items={project.stats} />}
          <div className="cs-actions">
            {project.prototypeUrl && (
              <a className="cs-btn" href={project.prototypeUrl} target="_blank" rel="noreferrer">Try the prototype <span aria-hidden="true">↗</span></a>
            )}
            <a className="cs-link" href={`#${sections[0]?.id || ''}`} onClick={(e) => jump(e, sections[0]?.id)}>Read the case study <span aria-hidden="true">↓</span></a>
          </div>
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
        </div>

        <div className="cs-body">
          <nav className="cs-toc" aria-label="On this page">
            <span className="eyebrow">On this page</span>
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} className={active === s.id ? 'on' : undefined} onClick={(e) => jump(e, s.id)}>{s.label}</a>
            ))}
          </nav>
          <div className="cs-main">
            {sections.map((s) => (
              <section className={`cs-sec${s.id === 'overview' ? ' overview' : ''}`} id={s.id} key={s.id} aria-label={s.label}>
                {/* Every section opens with a headline. If the Markdown has none, the section name becomes it
                    and the small label above shows only the number, so the name isn't said twice. */}
                {(() => {
                  const promote = !s.body.startsWith('### ') && s.id !== 'overview'
                  return (
                    <>
                      <div className="cs-num eyebrow"><i>{s.n}</i>{promote ? null : s.label}</div>
                      {promote && <h3>{s.label}</h3>}
                    </>
                  )
                })()}
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
