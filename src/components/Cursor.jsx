import { useEffect, useRef } from 'react'

/*
  Red dot cursor. Only on computers with a mouse or trackpad (phones keep their normal touch).
  The dot follows the pointer exactly. Over links and buttons it grows into a thin ring.
  It hides when the pointer leaves the window. The native cursor comes back if this ever fails to load.
  It swaps colors with what is under it: the part over blush shows Thai red, the part over Thai red
  shows blush. Two stacked layers do this: the first flips the colors (difference with white), the
  second adds --cursor-add back, so blush becomes red and red becomes blush, pixel by pixel.

  Magnifier: resting on a case study picture for a moment turns the dot into a round loupe that
  shows the picture under it at 2x, so small text in diagrams and tables can be read in place.
  Links keep the plain ring. Phone screens and the hero flower never magnify.
*/
const HOT = 'a, button, [role="button"], label, summary, select, .iphone.is-scroll .iphone__scroll'
const ZOOMABLE = '.cs-sec img.cs-img'
const ZOOM = 2
const SIZE = 150 // loupe diameter in px
const DWELL = 300 // ms of resting on a picture before the loupe appears

export default function Cursor() {
  const ref = useRef(null)
  const loupeRef = useRef(null)
  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (!mq.matches) return undefined
    const el = ref.current
    const loupe = loupeRef.current
    const root = document.documentElement
    root.classList.add('has-dot-cursor')
    let x = -100, y = -100, raf = 0
    let pic = null, picTimer = 0, zooming = false
    // The loupe glides after the pointer and grows out of the dot. Both are driven here, frame by
    // frame, so every browser (Safari included) plays the same animation.
    let lx = -100, ly = -100, lt = 0, lraf = 0
    let g = 0 // 0 = a red dot, 1 = the full loupe
    let rect = null
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const DOT = 10 / SIZE
    const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

    const paintLoupe = () => {
      const r = rect
      if (!r) return
      const cx = Math.min(r.right, Math.max(r.left, lx)), cy = Math.min(r.bottom, Math.max(r.top, ly))
      const e = ease(g)
      const sc = DOT + (1 - DOT) * e
      loupe.style.transform = `translate3d(${cx}px, ${cy}px, 0) scale(${sc})`
      loupe.style.opacity = g > 0.001 ? '1' : '0'
      loupe.style.setProperty('--fill', String(1 - Math.min(1, e * 1.25)))
      loupe.style.backgroundSize = `${r.width * ZOOM}px ${r.height * ZOOM}px`
      loupe.style.backgroundPosition = `${-(cx - r.left) * ZOOM + SIZE / 2}px ${-(cy - r.top) * ZOOM + SIZE / 2}px`
    }
    const frame = (t) => {
      lraf = 0
      const dt = lt ? Math.min(64, t - lt) : 16.7
      lt = t
      // follow the pointer while zooming; when shrinking, travel back to the pointer like the dot
      const k = still ? 1 : 1 - Math.pow(1 - 0.18, dt / 16.7)
      lx += (x - lx) * k
      ly += (y - ly) * k
      if (zooming && pic) rect = pic.getBoundingClientRect()
      const target = zooming ? 1 : 0
      const step = still ? 1 : dt / (zooming ? 420 : 300)
      g = target > g ? Math.min(1, g + step) : Math.max(0, g - step)
      if (!zooming && rect) {
        // while shrinking, let the loupe move freely to the pointer
        rect = { left: -1e6, top: -1e6, right: 1e6, bottom: 1e6, width: rect.width, height: rect.height }
      }
      paintLoupe()
      if (!zooming && g === 0) { set('is-zoom', false); lt = 0; rect = null; return }
      const moving = Math.abs(x - lx) > 0.2 || Math.abs(y - ly) > 0.2
      if (g !== target || moving) lraf = requestAnimationFrame(frame)
      else lt = 0
    }
    const kick = () => { if (!lraf && (zooming || g > 0)) lraf = requestAnimationFrame(frame) }
    const draw = () => {
      raf = 0
      const t = `translate3d(${x}px, ${y}px, 0)`
      els.forEach((d) => { d.style.transform = t })
      if (zooming && pic) {
        const r = pic.getBoundingClientRect()
        if (x < r.left || x > r.right || y < r.top || y > r.bottom) stopZoom()
      }
      kick()
    }
    const startZoom = (img) => {
      zooming = true
      const bg = getComputedStyle(img).backgroundColor
      loupe.style.backgroundColor = bg && bg !== 'rgba(0, 0, 0, 0)' ? bg : 'var(--paper)'
      loupe.style.backgroundImage = `url("${img.currentSrc || img.src}")`
      if (g === 0) { lx = x; ly = y }
      rect = img.getBoundingClientRect()
      set('is-zoom', true)
      kick()
    }
    function stopZoom() {
      clearTimeout(picTimer)
      zooming = false
      pic = null
      kick()
    }
    const track = (target) => {
      const img = target?.closest?.(ZOOMABLE) || null
      if (img === pic) return
      stopZoom()
      if (img) {
        pic = img
        picTimer = setTimeout(() => { if (pic === img) startZoom(img) }, DWELL)
      }
    }
    const move = (e) => {
      x = e.clientX; y = e.clientY
      set('is-on', true)
      set('is-hot', !!e.target.closest?.(HOT))
      track(e.target)
      if (!raf) raf = requestAnimationFrame(draw)
    }
    // The page can scroll under a resting pointer, so check what is under it again
    const scroll = () => {
      if (x < 0) return
      track(document.elementFromPoint(x, y))
      if (!raf) raf = requestAnimationFrame(draw)
    }
    const hide = () => { set('is-on', false); stopZoom() }
    const down = () => set('is-down', true)
    const up = () => set('is-down', false)
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('scroll', scroll, { passive: true })
    window.addEventListener('pointerdown', down)
    window.addEventListener('pointerup', up)
    document.addEventListener('pointerleave', hide)
    window.addEventListener('blur', hide)
    return () => {
      root.classList.remove('has-dot-cursor')
      window.removeEventListener('pointermove', move)
      window.removeEventListener('scroll', scroll)
      window.removeEventListener('pointerdown', down)
      window.removeEventListener('pointerup', up)
      document.removeEventListener('pointerleave', hide)
      window.removeEventListener('blur', hide)
      cancelAnimationFrame(raf)
      cancelAnimationFrame(lraf)
      clearTimeout(picTimer)
    }
  }, [])
  return (
    <>
      <div ref={ref} className="dot-cursor flip" aria-hidden="true"><span /></div>
      <div className="dot-cursor add" aria-hidden="true"><span /></div>
      <div ref={loupeRef} className="loupe" aria-hidden="true" />
    </>
  )
}
