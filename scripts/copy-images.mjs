// Copies every UXfolio image and file used on the site into public/ and points the pages at the copies.
// Runs on GitHub (see .github/workflows/copy-images.yml), because it needs to download files.
import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync, existsSync } from 'node:fs'
import { join, dirname, basename, extname } from 'node:path'

const PATTERN = /https:\/\/uxfolio-prod\.s3\.us-east-1\.amazonaws\.com\/[^\s"'<>)]+/g

function walk(dir) {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f)
    return statSync(p).isDirectory() ? walk(p) : /\.(md|js|jsx)$/.test(f) ? [p] : []
  })
}

function targetFor(file, url) {
  const name = basename(new URL(url).pathname)
  if (name.toLowerCase().endsWith('.pdf')) return '/Proud-Samnakbankok-Resume.pdf'
  const slug = file.includes('/content/work/') ? `work/${basename(file, extname(file))}` : basename(file, extname(file))
  return `/${slug}/${name}`
}

let copied = 0
for (const file of walk('src')) {
  let text = readFileSync(file, 'utf8')
  const urls = [...new Set(text.match(PATTERN) || [])]
  if (!urls.length) continue
  for (const url of urls) {
    const local = targetFor(file, url)
    const out = join('public', local)
    if (!existsSync(out)) {
      const res = await fetch(url)
      if (!res.ok) throw new Error(`Download failed (${res.status}): ${url}`)
      mkdirSync(dirname(out), { recursive: true })
      writeFileSync(out, Buffer.from(await res.arrayBuffer()))
      copied++
    }
    text = text.split(url).join(local)
  }
  writeFileSync(file, text)
  console.log(`${file}: ${urls.length} files now local`)
}
console.log(`Copied ${copied} files.`)
