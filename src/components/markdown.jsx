/*
  Shared Markdown building blocks for case studies and the About page.
  - ![alt text](<url> "phone") or "wide" is an image. Two or more images in one paragraph sit side by side.
    ![caption](<slot:What goes here> "wide") is a dashed placeholder slot.
  - A paragraph in *italics only* is a caption.
  - A bullet list whose items start with an image becomes a row of tiles (image, bold title, text).
  - [[stats: 98 :: label || 15 of 15 :: label]] is a row of big numbers.
  - [[chips: UI design || visual design]] is a row of small skill tags.
  - [[skills: Design :: UI design, visual design || Research :: UX research]] is a list of skills in labeled columns.
  - [[claims]] and [[prototype]] use fields from the page's frontmatter.
  - "phone 114 86" keeps the top 114 and bottom 86 points (402-wide frame) still while a tall screen scrolls.
  - "mockup" is an image that already has its own phone mockup: shown as is, no extra frame.
  - "sketch" is a hand sketch of a phone screen: phone-sized, no iPhone frame.
  - Every "phone" image sits in an iPhone frame. A screen taller than the phone scrolls inside it.
*/
import SIZES from 'virtual:image-sizes'
import { Fragment, useEffect, useRef, useState } from 'react'

export function isImg(node) {
  return node?.type === 'element' && node.tagName === 'img'
}
function hasImg(node) {
  if (!node) return false
  if (isImg(node)) return true
  return (node.children || []).some(hasImg)
}
// Screens (phones, sketches, mockups) sit on a tinted "stage" at one shared size. Wide and square images don't.
const SCREEN_KINDS = ['phone', 'sketch', 'mockup']
function kindOf(img) {
  return String(img?.properties?.title || '').split(/\s+/)[0]
}
function findImgs(node, out = []) {
  if (!node) return out
  if (isImg(node)) out.push(node)
  ;(node.children || []).forEach((c) => findImgs(c, out))
  return out
}
function allScreens(node) {
  const imgs = findImgs(node)
  return imgs.length > 0 && imgs.every((i) => SCREEN_KINDS.includes(kindOf(i)))
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
  const [w, h] = SIZES[decodeURI(src)] || []
  return <img src={src} alt={alt || ''} width={w} height={h} loading="lazy" decoding="async" className={`cs-img ${kind}`} />
}

// iPhone frame drawn in CSS. Screens taller than the phone (full-page captures) scroll inside it.
// fixedTop / fixedBottom (points in a 402-wide frame) stay put while scrolling, like the
// status bar, header and tab bar in the real app. Pass still to show the top of the screen only.
const SCREEN_RATIO = 852 / 393
export function Phone({ src, alt, still = false, className = '', fixedTop = 0, fixedBottom = 0 }) {
  const [tall, setTall] = useState(false)
  const scrollRef = useRef(null)
  const barRef = useRef(null)
  const offRef = useRef(0)
  // With a mouse the screen never becomes a scroll area (Safari could catch the page wheel on it).
  // The picture slides with a transform instead. Touch screens keep normal finger scrolling.
  const slides = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches
  // Slim scroll bar between the still header and tab bar, sized to how much of the screen is visible
  const placeBar = () => {
    const sc = scrollRef.current, bar = barRef.current
    if (!sc || !bar) return
    const unit = sc.clientWidth / 402
    const top = fixedTop * unit + 6, bottom = fixedBottom * unit + 6
    const track = sc.clientHeight - top - bottom
    const full = slides() ? (sc.firstElementChild?.offsetHeight || 0) : sc.scrollHeight
    const max = full - sc.clientHeight
    if (track <= 0 || max <= 0) { bar.style.opacity = '0'; return }
    const h = Math.max(24, track * (sc.clientHeight / full))
    const pos = slides() ? offRef.current : sc.scrollTop
    bar.style.height = `${h}px`
    bar.style.top = `${top + (track - h) * (pos / max)}px`
    bar.style.opacity = '1'
  }
  useEffect(() => {
    if (!tall || still) return undefined
    placeBar()
    window.addEventListener('resize', placeBar)
    return () => window.removeEventListener('resize', placeBar)
  })
  // With a mouse, the screen pans by itself while the pointer rests on it and glides back when it leaves.
  // The mouse wheel always scrolls the page, so the page can never get stuck on a phone.
  // On touch screens it scrolls with a finger instead.
  const panRef = useRef(0)
  const pan = (toEnd) => {
    const sc = scrollRef.current
    if (!sc) return
    cancelAnimationFrame(panRef.current)
    const img = sc.firstElementChild
    const slide = slides()
    const end = slide ? Math.max(0, (img?.offsetHeight || 0) - sc.clientHeight) : sc.scrollHeight - sc.clientHeight
    const set = (v) => {
      if (slide) { offRef.current = v; if (img) img.style.transform = `translateY(${-v}px)`; placeBar() }
      else sc.scrollTop = v
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { set(toEnd ? end : 0); return }
    const from = slide ? offRef.current : sc.scrollTop, to = toEnd ? end : 0
    const dur = Math.max(400, Math.abs(to - from) * (toEnd ? 9 : 2.5))
    const t0 = performance.now()
    const step = (t) => {
      const k = Math.min(1, (t - t0) / dur), e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2
      set(from + (to - from) * e)
      if (k < 1) panRef.current = requestAnimationFrame(step)
    }
    panRef.current = requestAnimationFrame(step)
  }
  useEffect(() => () => cancelAnimationFrame(panRef.current), [])
  // The page can scroll away under a resting pointer without a leave event (Safari, and Chrome
  // until the mouse moves). Track the last pointer spot and glide back once it is off the phone.
  const outRef = useRef(null)
  useEffect(() => () => outRef.current?.(), [])
  const watchLeave = () => {
    outRef.current?.()
    let px = -1, py = -1
    const move = (e) => { px = e.clientX; py = e.clientY }
    const check = () => {
      const r = scrollRef.current?.getBoundingClientRect()
      if (!r || px < r.left || px > r.right || py < r.top || py > r.bottom) { stop(); pan(false) }
    }
    const stop = () => {
      window.removeEventListener('pointermove', move); window.removeEventListener('scroll', check)
      outRef.current = null
    }
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('scroll', check, { passive: true })
    outRef.current = stop
    return move
  }
  const mouseOnly = (fn) => (e) => { if (e.pointerType === 'mouse') fn() }
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
            ref={scrollRef}
            onScroll={scroll ? placeBar : undefined}
            onPointerEnter={scroll ? (e) => { if (e.pointerType === 'mouse') { watchLeave()(e); pan(true) } } : undefined}
            onPointerLeave={scroll ? mouseOnly(() => { outRef.current?.(); pan(false) }) : undefined}
            onFocus={scroll ? () => pan(true) : undefined}
            onBlur={scroll ? () => pan(false) : undefined}
            {...(scroll ? { tabIndex: 0, role: 'region', 'aria-label': `${alt || 'Screen'}. Shows the full screen when you point at it or focus it.` } : {})}
          >
            <img src={src} alt={still ? '' : alt || ''} loading="lazy" decoding="async" onLoad={onLoad} />
          </div>
          {scroll && fixedTop > 0 && strip(fixedTop, 'top')}
          {scroll && fixedBottom > 0 && strip(fixedBottom, 'bottom')}
          {scroll && <span className="iphone__bar" ref={barRef} aria-hidden="true" />}
        </div>
        <span className="iphone__island" aria-hidden="true" />
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

function textOf(n) {
  if (n.type === 'text') return n.value
  return (n.children || []).map(textOf).join('')
}

// Rehype plugin for case studies.
// - Quotes and the "How might we" line become pull lines (class "pull").
// - Other callouts are highlights (class "note"). With two or more in a section they get gold numbers.
// - A highlight and the screens right after it (plus their caption) are wrapped together in one box,
//   so the note and its proof read as one unit.
const blank = (n) => n.type === 'text' && !n.value.trim()
const kidsOf = (n) => (n.children || []).filter((c) => !blank(c))
const isImgEl = (n) => n.type === 'element' && n.tagName === 'img'
const isMediaP = (n) => n.type === 'element' && n.tagName === 'p' && kidsOf(n).length > 0 && kidsOf(n).every(isImgEl)
const isMediaList = (n) => n.type === 'element' && n.tagName === 'ul' && kidsOf(n).some((li) => kidsOf(li).some((c) => isImgEl(c) || (c.tagName === 'p' && kidsOf(c).some(isImgEl))))
const isCaption = (n) => n.type === 'element' && n.tagName === 'p' && kidsOf(n).length === 1 && kidsOf(n)[0].tagName === 'em'
export function groupNotes() {
  return (tree) => {
    const quotes = tree.children.filter((n) => n.type === 'element' && n.tagName === 'blockquote')
    const notes = []
    quotes.forEach((q) => {
      const head = q.children.find((c) => c.type === 'element' && c.tagName === 'h4')
      const text = head ? textOf(head).trim() : ''
      const pull = /^[\u201c"]/.test(text) || /^how might we/i.test(text)
      q.properties = { ...q.properties, className: [pull ? 'pull' : 'note'] }
      if (!pull) notes.push([q, head])
    })
    if (notes.length > 1) {
      notes.forEach(([, head], i) => {
        if (head) head.children.unshift({ type: 'element', tagName: 'span', properties: { className: ['note-n'] }, children: [{ type: 'text', value: String(i + 1).padStart(2, '0') }] })
      })
    }
    const out = []
    const list = tree.children
    for (let i = 0; i < list.length; i++) {
      const n = list[i]
      if (!(n.type === 'element' && n.tagName === 'blockquote' && n.properties.className[0] === 'note')) { out.push(n); continue }
      const media = []
      let j = i + 1
      let sawMedia = false
      while (j < list.length) {
        const m = list[j]
        if (blank(m)) { j++; continue }
        if (isMediaP(m) || isMediaList(m)) { media.push(m); sawMedia = true; j++; continue }
        if (sawMedia && isCaption(m)) { media.push(m); j++; break }
        break
      }
      if (!sawMedia) { out.push(n); continue }
      out.push({ type: 'element', tagName: 'div', properties: { className: ['note-group'] }, children: [n, ...media] })
      i = j - 1
    }
    tree.children = out
  }
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
      const stage = tiles && allScreens(node)
      return <ul className={tiles ? `tiles${stage ? ' stage' : ''}` : undefined}>{children}</ul>
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
      // [[skills: Group :: a, b || Group :: c]] is a quiet list of skills in labeled columns
      const skills = token(raw, 'skills')
      if (skills) {
        return (
          <dl className="skills">
            {skills.map((g) => {
              const [label, list = ''] = g.split('::').map((x) => x.trim())
              const items = list.split(',').map((x) => x.trim())
              // Each skill stays on one line, so lines only break between skills
              return <div key={label}><dt>{label}</dt><dd>{items.map((x, i) => <Fragment key={x}><span>{x}</span>{i < items.length - 1 ? ' · ' : ''}</Fragment>)}</dd></div>
            })}
          </dl>
        )
      }

      if (kids.length && kids.every(isImg)) {
        const stage = kids.every((k) => SCREEN_KINDS.includes(kindOf(k)))
        return <div className={`gallery${stage ? ' stage' : ''}`} data-count={Math.min(kids.length, 4)}>{children}</div>
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
