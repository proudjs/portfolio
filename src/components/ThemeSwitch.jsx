import { useEffect, useState } from 'react'

/*
  Sun/moon switch for light and dark. The page starts from the visitor's saved choice or, if none,
  their device setting (set before paint in index.html). Clicking saves the choice for next time.
  Until someone clicks, the site keeps following the device. Other parts (the falling flowers)
  listen for the "themechange" event to recolor.
*/
const current = () => document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'

function apply(theme) {
  document.documentElement.dataset.theme = theme
  window.dispatchEvent(new Event('themechange'))
}

export default function ThemeSwitch() {
  const [theme, setTheme] = useState(current)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const follow = () => {
      let saved = null
      try { saved = localStorage.getItem('theme') } catch { /* storage blocked */ }
      if (saved) return
      const t = mq.matches ? 'dark' : 'light'
      apply(t)
      setTheme(t)
    }
    mq.addEventListener('change', follow)
    return () => mq.removeEventListener('change', follow)
  }, [])

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    try { localStorage.setItem('theme', next) } catch { /* storage blocked: still switch for this visit */ }
    apply(next)
    setTheme(next)
  }

  const dark = theme === 'dark'
  return (
    <button type="button" className="theme-switch" onClick={toggle} aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'} title={dark ? 'Light mode' : 'Dark mode'}>
      {dark ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M20 14.6A8.2 8.2 0 0 1 9.4 4a8.2 8.2 0 1 0 10.6 10.6Z" />
        </svg>
      )}
    </button>
  )
}
