/*
  Shared Markdown building blocks for case studies and the About page.
  - ![alt text](<url> "phone") or "wide" is an image. Two or more images in one paragraph sit side by side.
    ![caption](<slot:What goes here> "wide") is a dashed placeholder slot.
  - A paragraph in *italics only* is a caption.
  - A bullet list whose items start with an image becomes a row of tiles (image, bold title, text).
  - [[stats: 98 :: label || 15 of 15 :: label]] is a row of big numbers.
  - [[chips: UI design || visual design]] is a row of small skill tags.
  - [[claims]] and [[prototype]] use fields from the page's frontmatter.
  - "phone 114 86" keeps the top 114 and bottom 86 points (402-wide frame) still while a tall screen scrolls.
  - "mockup" is an image that already has its own phone mockup: shown as is, no extra frame.
  - "sketch" is a hand sketch of a phone screen: phone-sized, no iPhone frame.
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
  // title is the kind, optionally followed by numbers for phones: "phone 114 86"
  // = keep the top 114 and bottom 86 points still while the screen scrolls (in a 402-wide frame).
  const [first, ...nums] = (title || '').split(/\s+/)
  const kind = ['phone', 'sketch', 'square', 'mockup'].includes(first) ? first : 'wide'
  if (src?.startsWith('slot:')) {
    return (
      <figure>
        <div className={`shot ${kind === 'phone' ? 'phone' : kind}`}>Image slot<br />{decodeURIComponent(src.slice(5))}</div>
        {alt && <figcaption>{alt}</figcaption>}
      </figure>
    )
  }
  if (kind === 'phone') return <Phone src={src} alt={alt} fixedTop={Number(nums[0]) || 0} fixedBottom={Number(nums[1]) || 0} />
  return <img src={src} alt={alt || ''} loading="lazy" decoding="async" className={`cs-img ${kind}`} />
}

// iPhone frame drawn in CSS. Screens taller than the phone (full-page captures) scroll inside it.
// fixedTop / fixedBottom (points in a 402-wide frame) stay put while scrolling, like the
// status bar, header and tab bar in the real app. Pass still to show the top of the screen only.
const SCREEN_RATIO = 852 / 393
export function Phone({ src, alt, still = false, className = '', fixedTop = 0, fixedBottom = 0 }) {
  const [tall, setTall] = useState(false)
  const onLoad = (e) => {
    const { naturalWidth: w, naturalHeight: h } = e.currentTarget
    if (w && h / w > SCREEN_RATIO + 0.04) setTall(true)
  }
  const scroll = tall && !still
  const strip = (pts, edge) => (
    <div
      className={`iphone__fixed ${edge}`}
      aria-hidden="true"
      style={{ aspectRatio: `402 / ${pts}`, backgroundImage: `url("${src}")` }}
    />
  )
  return (
    <div className={`iphone ${scroll ? 'is-scroll' : ''} ${className}`}>
      <div className="iphone__body">
        <div className="iphone__screen">
          <div
            className="iphone__scroll"
            {...(scroll ? { tabIndex: 0, role: 'region', 'aria-label': `${alt || 'Screen'}. Scroll to see the full screen.` } : {})}
          >
            <img src={src} alt={still ? '' : alt || ''} loading="lazy" decoding="async" onLoad={onLoad} />
          </div>
          {scroll && fixedTop > 0 && strip(fixedTop, 'top')}
          {scroll && fixedBottom > 0 && strip(fixedBottom, 'bottom')}
        </div>
        <span className="iphone__island" aria-hidden="true" />
        {scroll && <span className="iphone__hint" aria-hidden="true">Scroll</span>}
      </div>
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
