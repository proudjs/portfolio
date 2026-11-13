/*
  Shared Markdown building blocks for case studies and the About page.
  - ![alt text](<url> "phone") or "wide" is an image. Two or more images in one paragraph sit side by side.
    ![caption](<slot:What goes here> "wide") is a dashed placeholder slot.
  - A paragraph in *italics only* is a caption.
  - A bullet list whose items start with an image becomes a row of tiles (image, bold title, text).
  - [[stats: 98 :: label || 15 of 15 :: label]] is a row of big numbers.
  - [[chips: UI design || visual design]] is a row of small skill tags.
  - [[claims]] and [[prototype]] use fields from the page's frontmatter.
  - Every "phone" image sits in an iPhone frame. A screen taller than the phone scrolls inside it.
*/
import { useState } from 'react'

export function isImg(node) {
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

export function Figure({ src, alt, title }) {
  const kind = title === 'phone' ? 'phone' : title === 'square' ? 'square' : 'wide'
  if (src?.startsWith('slot:')) {
    return (
      <figure>
        <div className={`shot ${kind}`}>Image slot<br />{decodeURIComponent(src.slice(5))}</div>
        {alt && <figcaption>{alt}</figcaption>}
      </figure>
    )
  }
  if (kind === 'phone') return <Phone src={src} alt={alt} />
  return <img src={src} alt={alt || ''} loading="lazy" decoding="async" className={`cs-img ${kind}`} />
}

// iPhone frame drawn in CSS. Screens taller than the phone (full-page captures) scroll inside it.
// Pass still to show the top of the screen only (used inside links and cards).
const SCREEN_RATIO = 852 / 393
export function Phone({ src, alt, still = false, className = '' }) {
  const [tall, setTall] = useState(false)
  const onLoad = (e) => {
    const { naturalWidth: w, naturalHeight: h } = e.currentTarget
    if (w && h / w > SCREEN_RATIO + 0.04) setTall(true)
  }
  const scroll = tall && !still
  return (
    <div className={`iphone ${scroll ? 'is-scroll' : ''} ${className}`}>
      <div
        className="iphone__screen"
        {...(scroll ? { tabIndex: 0, role: 'region', 'aria-label': `${alt || 'Screen'}. Scroll to see the full screen.` } : {})}
      >
        <img src={src} alt={still ? '' : alt || ''} loading="lazy" decoding="async" onLoad={onLoad} />
      </div>
      <span className="iphone__island" aria-hidden="true" />
      {scroll && <span className="iphone__hint" aria-hidden="true">Scroll</span>}
    </div>
  )
}

export function Stats({ items }) {
  return (
    <div className="cs-stats">
      {items.map((s) => <div className="stat" key={s.value + s.label}><b>{s.value}</b><span>{s.label}</span></div>)}
    </div>
  )
}

function token(raw, name) {
  const open = `[[${name}:`
  if (!raw.startsWith(open) || !raw.endsWith(']]')) return null
  return raw.slice(open.length, -2).split('||').map((s) => s.trim())
}

export function makeComponents(page = {}) {
  return {
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
        return page.claims ? (
          <div className="claims">
            <div><span className="eyebrow">What I can claim</span><p>{page.claims.can}</p></div>
            <div><span className="eyebrow">What I can't claim yet</span><p>{page.claims.cant}</p></div>
          </div>
        ) : null
      }
      if (text === '[[prototype]]') {
        return page.prototypeUrl
          ? <a className="cs-btn" href={page.prototypeUrl} target="_blank" rel="noreferrer">Try the prototype</a>
          : null
      }
      const raw = plainText(node).trim()
      const stats = token(raw, 'stats')
      if (stats) {
        return <Stats items={stats.map((s) => { const [value, ...rest] = s.split('::'); return { value: value.trim(), label: rest.join('::').trim() } })} />
      }
      const chips = token(raw, 'chips')
      if (chips) return <ul className="chips">{chips.map((c) => <li key={c}>{c}</li>)}</ul>

      if (kids.length && kids.every(isImg)) {
        return <div className="gallery" data-count={Math.min(kids.length, 4)}>{children}</div>
      }
      if (kids.length === 1 && kids[0].type === 'element' && kids[0].tagName === 'em') {
        return <p className="caption">{children}</p>
      }
      return <p>{children}</p>
    },
  }
}

export function splitSections(content) {
  return content.split(/^## /m).slice(1).map((chunk, i) => {
    const nl = chunk.indexOf('\n')
    const label = (nl === -1 ? chunk : chunk.slice(0, nl)).trim()
    const body = nl === -1 ? '' : chunk.slice(nl + 1).trim()
    const id = label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    return { label, body, id, n: String(i + 1).padStart(2, '0') }
  })
}
