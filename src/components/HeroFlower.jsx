import { useEffect, useRef } from 'react'
import flower from '../assets/flowers/hero-flower.json'

/*
  Proud's phut tan flower, drawn like a pen: one stroke at a time, never overlapping.
  `flower.center` holds the center line of every stroke, already in drawing order:
  long outlines first (starting with the longest), then the hatching, each stroke
  starting near where the last one ended. When the pen is done, her bold ink fades in.
*/
const SPEED = 1.9 // drawing units per ms
const MIN_STROKE = 70 // ms
const PEN_LIFT = 30 // ms pause between strokes
const NS = 'http://www.w3.org/2000/svg'

export default function HeroFlower({ replayKey, reduce }) {
  const penRef = useRef(null)
  const inkRef = useRef(null)
  const silRef = useRef(null)

  useEffect(() => {
    const pen = penRef.current, ink = inkRef.current, sil = silRef.current
    const timers = []
    pen.innerHTML = ''
    pen.style.opacity = 1

    if (reduce) {
      ink.style.opacity = 1
      sil.style.opacity = 1
      return undefined
    }

    ink.style.transition = 'none'
    ink.style.opacity = 0
    sil.style.opacity = 0
    void ink.getBoundingClientRect()
    ink.style.transition = ''

    let t = 400
    flower.center.split(/(?=M)/).forEach((d) => {
      const p = document.createElementNS(NS, 'path')
      p.setAttribute('d', d)
      pen.appendChild(p)
      const len = p.getTotalLength()
      const dur = Math.max(MIN_STROKE, len / SPEED)
      p.style.strokeDasharray = len
      p.style.strokeDashoffset = len
      p.style.opacity = 0
      timers.push(setTimeout(() => {
        p.style.opacity = 1
        p.style.transition = `stroke-dashoffset ${dur}ms cubic-bezier(.35,0,.65,1)`
        p.style.strokeDashoffset = 0
      }, t))
      t += dur + PEN_LIFT
    })

    timers.push(setTimeout(() => { sil.style.opacity = 1; ink.style.opacity = 1 }, t + 600))
    timers.push(setTimeout(() => { pen.style.transition = 'opacity 1s'; pen.style.opacity = 0 }, t + 1400))
    timers.push(setTimeout(() => { pen.innerHTML = ''; pen.style.transition = ''; pen.style.opacity = 1 }, t + 2600))

    return () => timers.forEach(clearTimeout)
  }, [replayKey, reduce])

  return (
    <svg className="motif" viewBox={flower.viewBox} role="img" aria-label="Phut tan flower, hand drawn by Proud">
      <path ref={silRef} className="sil" fillRule="evenodd" d={flower.sil} />
      <g ref={penRef} className="pen" />
      <path ref={inkRef} className="ink" fillRule="evenodd" d={flower.ink} />
    </svg>
  )
}
