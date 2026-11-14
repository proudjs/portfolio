import { useEffect, useRef } from 'react'

/*
  Red dot cursor. Only on computers with a mouse or trackpad (phones keep their normal touch).
  The dot follows the pointer exactly. Over links and buttons it grows into a thin ring.
  It hides when the pointer leaves the window. The native cursor comes back if this ever fails to load.
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
    const draw = () => { raf = 0; el.style.transform = `translate3d(${x}px, ${y}px, 0)` }
    const move = (e) => {
      x = e.clientX; y = e.clientY
      el.classList.add('is-on')
      el.classList.toggle('is-hot', !!e.target.closest?.(HOT))
      if (!raf) raf = requestAnimationFrame(draw)
    }
    const hide = () => el.classList.remove('is-on')
    const down = () => el.classList.add('is-down')
    const up = () => el.classList.remove('is-down')
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
  return <div ref={ref} className="dot-cursor" aria-hidden="true"><span /></div>
}
