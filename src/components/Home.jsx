import { useRef, useState } from 'react'
import Nav from './Nav.jsx'
import Footer from './Footer.jsx'
import Greeting from './Greeting.jsx'
import HeroFlower from './HeroFlower.jsx'
import FallingFlowers from './FallingFlowers.jsx'
import ProjectCards from './ProjectCards.jsx'
import useReducedMotion from '../hooks/useReducedMotion.js'

export default function Home() {
  const pageRef = useRef(null)
  const reduce = useReducedMotion()
  const [replay, setReplay] = useState(0)
  const [paused, setPaused] = useState(false)

  return (
    <div className="page" ref={pageRef}>
      <FallingFlowers containerRef={pageRef} paused={paused} reduce={reduce} />
      <div className="wrap">
        <Nav fullName />
        <main style={{ display: 'grid', gap: 48 }}>
          <section className="hero" aria-labelledby="headline">
            <div>
              <Greeting reduce={reduce} />
              <h1 id="headline">UX/UI + Visual Designer who makes complex things easy to follow.</h1>
              <p>Communication Design (BFA) and UX (UT Austin). Based in Milwaukee, WI. Open to Chicago and remote.</p>
            </div>
            <HeroFlower replayKey={replay} reduce={reduce} />
          </section>
          {!reduce && (
            <div className="controls">
              <button type="button" className="textbtn" onClick={() => setReplay((n) => n + 1)}>Replay the drawing</button>
              <button type="button" className="textbtn" aria-pressed={paused} onClick={() => setPaused((p) => !p)}>
                {paused ? 'Play the flowers' : 'Pause the flowers'}
              </button>
            </div>
          )}
          <section id="work" aria-labelledby="work-title" style={{ display: 'grid', gap: 18, scrollMarginTop: 24 }}>
            <h2 id="work-title" className="eyebrow" style={{ margin: 0, fontWeight: 400 }}>Selected work</h2>
            <ProjectCards />
          </section>
        </main>
        <Footer />
      </div>
    </div>
  )
}
