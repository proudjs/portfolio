import { Link } from 'react-router-dom'
import Nav from './Nav.jsx'

export default function NotFound() {
  return (
    <div className="wrap">
      <Nav />
      <main className="cs-head">
        <span className="eyebrow">404</span>
        <h1>This page isn't here.</h1>
        <p><Link to="/">Go back to the home page</Link></p>
      </main>
    </div>
  )
}
