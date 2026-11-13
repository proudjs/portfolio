import { useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import yaml from 'js-yaml'
import Nav from './Nav.jsx'
import Footer from './Footer.jsx'
import { Figure, makeComponents, splitSections } from './markdown.jsx'
import { site } from '../data/site.js'
import raw from '../content/about.md?raw'

function parse(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!m) return { data: {}, content: text }
  return { data: yaml.load(m[1]) || {}, content: m[2].replace(/<!--[\s\S]*?-->/g, '').trim() }
}

const { data, content } = parse(raw)
const firstSection = content.search(/^## /m)
const intro = firstSection === -1 ? content : content.slice(0, firstSection).trim()
const sections = splitSections(firstSection === -1 ? '' : content.slice(firstSection))
const components = makeComponents(data)

export default function About() {
  useEffect(() => { document.title = 'About · Proud Samnakbankok' }, [])

  return (
    <div className="wrap">
      <Nav />
      <main style={{ display: 'grid', gap: 96 }}>
        <header className="ab-head">
          <div className="ab-intro">
            <span className="eyebrow">{data.eyebrow}</span>
            <h1>{data.headline}</h1>
            <ReactMarkdown components={components}>{intro}</ReactMarkdown>
            <div className="ab-actions">
              <a className="cs-btn" href={site.resumeUrl} target="_blank" rel="noreferrer">View my résumé</a>
              <a className="cs-link" href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn →</a>
            </div>
          </div>
          {data.portrait && <Figure src={data.portrait.src} alt={data.portrait.alt} title="square" />}
        </header>

        {sections.map((s) => (
          <section className={`cs-sec ab-sec ab-${s.id}`} id={s.id} key={s.id} aria-label={s.label}>
            <div className="cs-num eyebrow">{s.label}</div>
            <ReactMarkdown components={components} urlTransform={(u) => u}>{s.body}</ReactMarkdown>
          </section>
        ))}
      </main>
      <Footer />
    </div>
  )
}
