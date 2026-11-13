import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './components/Home.jsx'
import CaseStudy from './components/CaseStudy.jsx'
import NotFound from './components/NotFound.jsx'
import About from './components/About.jsx'

export default function App() {
  const { pathname, hash, key } = useLocation()
  // New page: start at the top, unless the link points to a spot on the page (like /#work)
  useEffect(() => {
    if (!hash) { window.scrollTo(0, 0); return undefined }
    const id = decodeURIComponent(hash.slice(1))
    const t = setTimeout(() => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
    }, 60)
    return () => clearTimeout(t)
  }, [pathname, hash, key])

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/work/:slug" element={<CaseStudy />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
