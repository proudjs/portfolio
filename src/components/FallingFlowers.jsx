import { useEffect, useRef } from 'react'
import aLine from '../assets/flowers/phut-tan-a-line.png'
import aFill from '../assets/flowers/phut-tan-a-fill.png'
import bLine from '../assets/flowers/phut-tan-b-line.png'
import bFill from '../assets/flowers/phut-tan-b-fill.png'
import cLine from '../assets/flowers/phut-tan-c-line.png'
import cFill from '../assets/flowers/phut-tan-c-fill.png'
import dLine from '../assets/flowers/phut-tan-d-line.png'
import dFill from '../assets/flowers/phut-tan-d-fill.png'

/*
  Proud's four phut tan flowers fall, rest on the ground for 3 s, then fade over 7 s.
  About 20% are gold. Falling flowers are drawn at 35% so text stays readable.
  Mouse wind: flowers within 280 px drift the way the mouse moves. A quick sweep near
  the ground lifts resting flowers back up. Everything eases, and motion is time-based
  so it looks the same on 60 Hz and 120 Hz screens.
  Pauses when off-screen, in hidden tabs, or when paused. With reduced motion they don't appear at all.
*/
const SOURCES = [[aLine, aFill], [bLine, bFill], [cLine, cFill], [dLine, dFill]]
const WIND_REACH = 280

function cssVar(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim()
}
function loadImage(src) {
  return new Promise((resolve, reject) => {
    const im = new Image()
    im.onload = () => resolve(im)
    im.onerror = reject
    im.src = src
  })
}
function tint(im, color) {
  const o = document.createElement('canvas')
  o.width = im.width; o.height = im.height
  const g = o.getContext('2d')
  g.drawImage(im, 0, 0)
  g.globalCompositeOperation = 'source-in'
  g.fillStyle = color
  g.fillRect(0, 0, o.width, o.height)
  return o
}

export default function FallingFlowers({ containerRef, paused, reduce }) {
  const canvasRef = useRef(null)
  const pausedRef = useRef(paused)
  const api = useRef({})

  useEffect(() => {
    pausedRef.current = paused
    if (paused) api.current.stop?.()
    else api.current.play?.()
  }, [paused])

  useEffect(() => {
    if (reduce) return undefined // reduced motion: no falling flowers at all
    const host = containerRef.current
    const cv = canvasRef.current
    const ctx = cv.getContext('2d')
    let W = 0, H = 0, live = [], rest = [], maxLive = 40, lastSpawn = 0, lastT = 0
    let raf = 0, running = false, visible = false, sprites = null, images = null, disposed = false
    let mouse = null, lastM = null, mvx = 0, mvy = 0, wvx = 0, wvy = 0

    function buildSprites() {
      if (!images) return
      const colors = { red: cssVar('--red'), gold: cssVar('--gold'), paper: cssVar('--surface') }
      sprites = images.map(([line, fill]) => {
        const out = {}
        ;['red', 'gold'].forEach((c) => {
          const o = document.createElement('canvas')
          o.width = line.width; o.height = line.height
          const g = o.getContext('2d')
          g.drawImage(tint(fill, colors.paper), 0, 0)
          g.drawImage(tint(line, colors[c]), 0, 0)
          out[c] = o
        })
        return out
      })
    }

    function drawF(f, alpha) {
      if (!sprites) return
      ctx.save()
      ctx.globalAlpha = alpha
      ctx.translate(f.x, f.y)
      ctx.rotate(f.rot)
      const s = sprites[f.v][f.gold ? 'gold' : 'red']
      const d = f.r * 2.3, h = d * s.height / s.width
      ctx.drawImage(s, -d / 2, -h / 2, d, h)
      ctx.restore()
    }

    function newF(top) {
      const r = 7 + Math.random() * 7
      return {
        x: r + Math.random() * (W - 2 * r), y: top ? -r - Math.random() * 30 : Math.random() * H * 0.8, r,
        vy: 0.6 + Math.random() * 0.7, ph: Math.random() * 6.28, sw: 0.4 + Math.random() * 0.9,
        rot: (Math.random() - 0.5) * 0.8, vr: (Math.random() - 0.5) * 0.012,
        v: Math.floor(Math.random() * 4), gold: Math.random() < 0.2,
        floor: H - r * 0.75 - Math.random() * 14, wx: 0, wy: 0, al: 0.35,
      }
    }

    function setup() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      W = host.clientWidth; H = host.clientHeight
      cv.width = W * dpr; cv.height = H * dpr
      cv.style.width = W + 'px'; cv.style.height = H + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      maxLive = Math.max(15, Math.min(50, Math.round(W / 28)))
    }

    function reach(f) {
      if (!mouse) return 0
      const dx = f.x - mouse.x, dy = f.y - mouse.y, d = Math.sqrt(dx * dx + dy * dy)
      if (d >= WIND_REACH) return 0
      const k = 1 - d / WIND_REACH
      return k * k * (3 - 2 * k)
    }

    function frame(t) {
      if (!running) return
      const dt = lastT ? Math.min(3, (t - lastT) / 16.667) : 1
      lastT = t
      const ease = (r) => 1 - Math.pow(1 - r, dt)
      if (live.length < maxLive && t - lastSpawn > 350) { live.push(newF(true)); lastSpawn = t }
      ctx.clearRect(0, 0, W, H)

      wvx += (mvx - wvx) * ease(0.09); wvy += (mvy - wvy) * ease(0.09)
      const decay = Math.pow(0.93, dt); mvx *= decay; mvy *= decay
      const cap = 26, wl = Math.hypot(wvx, wvy); if (wl > cap) { wvx *= cap / wl; wvy *= cap / wl }
      const wsp = Math.sqrt(wvx * wvx + wvy * wvy)

      for (let j = rest.length - 1; j >= 0; j--) {
        const s = rest[j]
        const k = wsp > 4 ? reach(s) : 0
        if (k > 0.05) {
          s.wx = wvx * 0.14 * k
          s.wy = -(0.5 + Math.min(2.4, wsp * 0.16) * k)
          rest.splice(j, 1); live.push(s); continue
        }
        s.age += 16.667 * dt
        const fade = 1 - Math.max(0, s.age - 3000) / 7000
        if (fade <= 0) { rest.splice(j, 1); continue }
        s.al += (0.9 * fade - s.al) * ease(0.05)
        drawF(s, s.al)
      }

      for (let i = live.length - 1; i >= 0; i--) {
        const f = live[i]
        const k = wsp > 0.3 ? reach(f) : 0
        const r = k ? 0.035 * k + 0.012 : 0.018
        f.wx += (wvx * 0.8 * k - f.wx) * ease(r)
        f.wy += (wvy * 0.45 * k - f.wy) * ease(r)
        f.ph += 0.02 * dt
        f.y += (f.vy + f.wy) * dt
        f.x += (Math.sin(f.ph) * f.sw * 0.5 + f.wx) * dt
        f.rot += (f.vr + f.wx * 0.003) * dt
        f.x = Math.max(f.r, Math.min(W - f.r, f.x))
        f.al += (0.35 - f.al) * ease(0.04)
        if (f.y >= f.floor && f.vy + f.wy > 0) { f.y = f.floor; f.age = 0; rest.push(f); live.splice(i, 1) }
        else drawF(f, f.al)
      }
      raf = requestAnimationFrame(frame)
    }

    function stillLife() {
      setup(); ctx.clearRect(0, 0, W, H)
      for (let n = 0; n < Math.round(maxLive * 0.6); n++) { const f = newF(false); f.y = f.floor; drawF(f, 0.9) }
    }
    function play() {
      if (running || pausedRef.current || !visible || document.hidden || reduce || !sprites) return
      running = true; lastSpawn = 0; lastT = 0
      raf = requestAnimationFrame(frame)
    }
    function stop() { running = false; cancelAnimationFrame(raf) }
    function boot() {
      setup()
      if (reduce) { stillLife(); return }
      live = []; rest = []
      for (let n = 0; n < Math.round(maxLive / 2); n++) live.push(newF(false))
      play()
    }
    api.current = { play, stop }

    const onMove = (e) => {
      const r = host.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top
      if (lastM) { mvx = mvx * 0.6 + (x - lastM.x) * 0.4; mvy = mvy * 0.6 + (y - lastM.y) * 0.4 }
      lastM = { x, y }; mouse = { x, y }
    }
    const onLeave = () => { mouse = null; lastM = null }
    const onVis = () => { if (document.hidden) stop(); else play() }
    let rt
    const ro = new ResizeObserver(() => { clearTimeout(rt); rt = setTimeout(() => { stop(); boot() }, 300) })
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) play(); else stop() }, { threshold: 0.05 })
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onScheme = () => { buildSprites(); if (reduce) stillLife() }

    // Start the flowers only after the page has loaded and gone idle, so the name and headline show first.
    const idle = window.requestIdleCallback ?? ((cb) => setTimeout(cb, 300))
    const start = () => idle(async () => {
      try {
        images = await Promise.all(SOURCES.map(([l, f]) => Promise.all([loadImage(l), loadImage(f)])))
      } catch { return }
      if (disposed) return
      buildSprites()
      boot()
      ro.observe(host)
      io.observe(host)
    })
    if (document.readyState === 'complete') start()
    else window.addEventListener('load', start, { once: true })

    if (!reduce) { host.addEventListener('pointermove', onMove); host.addEventListener('pointerleave', onLeave) }
    document.addEventListener('visibilitychange', onVis)
    mq.addEventListener('change', onScheme)

    return () => {
      disposed = true; stop(); ro.disconnect(); io.disconnect()
      window.removeEventListener('load', start)
      host.removeEventListener('pointermove', onMove); host.removeEventListener('pointerleave', onLeave)
      document.removeEventListener('visibilitychange', onVis)
      mq.removeEventListener('change', onScheme)
    }
  }, [containerRef, reduce])

  if (reduce) return null
  return <canvas ref={canvasRef} className="petals" aria-hidden="true" />
}
