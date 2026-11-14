import { useEffect, useRef, useState } from 'react'
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
  const [paused, setPaused] = useState(false)
  useEffect(() => { document.title = 'Jutamat (Proud) Samnakbankok · UX/UI + Visual Designer' }, [])

  return (
    <div className="page" ref={pageRef}>
      <FallingFlowers containerRef={pageRef} paused={paused} reduce={reduce} />
      <div className="wrap">
        <Nav fullName />
        <main style={{ display: 'grid', gap: 64 }}>
          <section className="hero" aria-labelledby="headline">
            <div>
              <Greeting reduce={reduce} />
              <h1 id="headline">I design digital products that make everyday tasks harder to get wrong.</h1>
              <p>UX/UI + Visual Designer. Communication Design (BFA) and UX (UT Austin).<br />Based in Milwaukee, WI. Open to Chicago and remote.</p>
            </div>
            <HeroFlower reduce={reduce} />
          </section>
          <section id="work" aria-labelledby="work-title" style={{ display: 'grid', gap: 22, scrollMarginTop: 96 }}>
            <h2 id="work-title" className="eyebrow" style={{ margin: 0, fontWeight: 400 }}>Selected work</h2>
            <ProjectCards />
          </section>
        </main>
        <Footer />
      </div>
      {!reduce && (
        // Moving content needs a way to pause it (accessibility). Kept as a small, quiet icon.
        <button
          type="button"
          className="pause-btn"
          aria-pressed={paused}
          aria-label={paused ? 'Play the falling flowers' : 'Pause the falling flowers'}
          title={paused ? 'Play the falling flowers' : 'Pause the falling flowers'}
          onClick={() => setPaused((p) => !p)}
        >
          {paused
            ? <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M5 3.5v9l7-4.5z" /></svg>
            : <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M5 3.5h2v9H5zM9 3.5h2v9H9z" /></svg>}
        </button>
      )}
    </div>
  )
}
