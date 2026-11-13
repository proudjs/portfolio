import { useEffect, useId, useRef } from 'react'
import flower from '../assets/flowers/hero-flower.json'

/*
  Proud's phut tan flower appears the way she drew it: her real ink is revealed one stroke at a time.
  A wide invisible "brush" follows the center line of each stroke (flower.center, already in drawing
  order: long outlines first, then the hatching) and uncovers the ink underneath. When the last stroke
  is done, any small dots the brush missed fade in. Reduced motion shows the finished drawing.
*/
const SPEED = 2.6 // drawing units per ms
const MIN_STROKE = 60 // ms
const PEN_LIFT = 15 // ms pause between strokes
const BRUSH = 30 // brush width in drawing units, wider than her widest stroke
const NS = 'http://www.w3.org/2000/svg'

export default function HeroFlower({ reduce }) {
  const maskId = useId().replace(/:/g, '')
  const brushRef = useRef(null)
  const fullRef = useRef(null)

  useEffect(() => {
    const brush = brushRef.current
    const full = fullRef.current
    const timers = []
    brush.innerHTML = ''

    if (reduce) {
      full.style.opacity = 1
      return undefined
    }
    full.style.transition = 'none'
    full.style.opacity = 0

    let t = 300
    flower.center.split(/(?=M)/).forEach((d) => {
      const p = document.createElementNS(NS, 'path')
      p.setAttribute('d', d)
      brush.appendChild(p)
      const len = p.getTotalLength()
      const dur = Math.max(MIN_STROKE, len / SPEED)
      p.style.strokeDasharray = `${len} ${len}`
      p.style.strokeDashoffset = len
      timers.push(setTimeout(() => {
        p.style.transition = `stroke-dashoffset ${dur}ms cubic-bezier(.35,0,.65,1)`
        p.style.strokeDashoffset = 0
      }, t))
      t += dur + PEN_LIFT
    })
    timers.push(setTimeout(() => {
      full.style.transition = 'opacity 700ms ease'
      full.style.opacity = 1
    }, t + 100))
    return () => timers.forEach(clearTimeout)
  }, [reduce])

  return (
    <svg className="motif" viewBox={flower.viewBox} role="img" aria-label="Phut tan flower, hand drawn by Proud">
      <defs>
        <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="1176" height="1248">
          <g ref={brushRef} fill="none" stroke="#fff" strokeWidth={BRUSH} strokeLinecap="round" strokeLinejoin="round" />
        </mask>
      </defs>
      <path className="sil" fillRule="evenodd" d={flower.sil} />
      <path className="ink" fillRule="evenodd" d={flower.ink} mask={`url(#${maskId})`} />
      <path ref={fullRef} className="ink" fillRule="evenodd" d={flower.ink} />
    </svg>
  )
}
