import { site } from '../data/site.js'

export default function Footer() {
  return (
    <footer className="foot">
      <span><b>Open to UX/UI roles.</b> {site.email} · <a href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></span>
      <span>Product of Thailand. Assembled around the world. Built with Claude.</span>
    </footer>
  )
}
