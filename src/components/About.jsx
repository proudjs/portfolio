import { useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import yaml from 'js-yaml'
import Nav from './Nav.jsx'
import Footer from './Footer.jsx'
import { Figure, Phone, makeComponents, splitSections } from './markdown.jsx'
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

function Principles({ items = [] }) {
  return (
    <div className="principles">
      {items.map((p) => (
        <article className="principle" key={p.title}>
          <div className={`principle__art ${p.kind === 'phone' ? 'phone' : ''}`}>
            {p.greeting
              ? <div className="principle__greet" aria-hidden="true"><span lang="th">สวัสดี</span><span lang="lo">ສະບາຍດີ</span><span lang="en">Hello</span></div>
              : p.kind === 'phone'
                ? <Phone src={p.image} alt={p.alt} still />
                : <img src={p.image} alt={p.alt} loading="lazy" decoding="async" />}
          </div>
          <h3>{p.title}</h3>
          <p>{p.text}</p>
        </article>
      ))}
    </div>
  )
}

function Timeline({ experience = [], education = [] }) {
  const col = (label, items) => (
    <div className="timeline__col">
      <h3>{label}</h3>
      <ol className="timeline">
        {items.map((it) => (
          <li key={it.title}>
            <span className="timeline__when">{it.when}</span>
            <strong>{it.title}</strong>
            <span className="timeline__where">{it.where}</span>
          </li>
        ))}
      </ol>
    </div>
  )
  return <div className="timeline__wrap">{col('Experience', experience)}{col('Education', education)}</div>
}

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
          </div>
          {/* The photo fills the height of the intro text beside it, cropped to keep her face in view */}
          {data.portrait && (
            <div className="ab-photo">
              <img src={data.portrait.src} alt={data.portrait.alt} decoding="async" />
            </div>
          )}
        </header>

        {sections.map((s) => (
          <section className={`cs-sec ab-sec ab-${s.id}`} id={s.id} key={s.id} aria-label={s.label}>
            <div className="cs-num eyebrow">{s.label}</div>
            {s.id === 'what-shapes-my-work' && <Principles items={data.principles} />}
            {s.id === 'experience-and-education' && <Timeline experience={data.experience} education={data.education} />}
            <ReactMarkdown components={components} urlTransform={(u) => u}>{s.body}</ReactMarkdown>
          </section>
        ))}
      </main>
      <Footer />
    </div>
  )
}
