import { useEffect, useState } from 'react'

const WORDS = [
  { text: 'สวัสดี', lang: 'th' },
  { text: 'ສະບາຍດີ', lang: 'lo' },
  { text: 'Hello', lang: 'en' },
]

export default function Greeting({ reduce }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (reduce) return undefined
    const id = setInterval(() => setI((n) => (n + 1) % WORDS.length), 2200)
    return () => clearInterval(id)
  }, [reduce])
  const w = WORDS[i]
  return <div className="greet" lang={w.lang} aria-hidden="true">{w.text}</div>
}
