import { useEffect, useRef } from 'react'

/*
  Red dot cursor. Only on computers with a mouse or trackpad (phones keep their normal touch).
  The dot follows the pointer exactly. Over links and buttons it grows into a thin ring.
  It hides when the pointer leaves the window. The native cursor comes back if this ever fails to load.
  It swaps colors with what is under it: the part over blush shows Thai red, the part over Thai red
  shows blush. Two stacked layers do this: the first flips the colors (difference with white), the
  second adds --cursor-add back, so blush becomes red and red becomes blush, pixel by pixel.
*/
const HOT = 'a, button, [role="button"], label, summary, select, .iphone.is-scroll .iphone__scroll'

export default function Cursor() {
  const ref = useRef(null)
  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (!mq.matches) return undefined
    const el = ref.current
    const root = document.documentElement
    root.classList.add('has-dot-cursor')
    let x = -100, y = -100, raf = 0
    const els = [...el.parentNode.querySelectorAll('.dot-cursor')]
    const draw = () => { raf = 0; els.forEach((d) => { d.style.transform = `translate3d(${x}px, ${y}px, 0)` }) }
    const set = (c, on) => els.forEach((d) => d.classList.toggle(c, on))
    const move = (e) => {
      x = e.clientX; y = e.clientY
      set('is-on', true)
      set('is-hot', !!e.target.closest?.(HOT))
      if (!raf) raf = requestAnimationFrame(draw)
    }
    const hide = () => set('is-on', false)
    const down = () => set('is-down', true)
    const up = () => set('is-down', false)
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerdown', down)
    window.addEventListener('pointerup', up)
    document.addEventListener('pointerleave', hide)
    window.addEventListener('blur', hide)
    return () => {
      root.classList.remove('has-dot-cursor')
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerdown', down)
      window.removeEventListener('pointerup', up)
      document.removeEventListener('pointerleave', hide)
      window.removeEventListener('blur', hide)
      cancelAnimationFrame(raf)
    }
  }, [])
  return (
    <>
      <div ref={ref} className="dot-cursor flip" aria-hidden="true"><span /></div>
      <div className="dot-cursor add" aria-hidden="true"><span /></div>
    </>
  )
}
