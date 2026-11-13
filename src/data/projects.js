import yaml from 'js-yaml'

/*
  Every case study is one Markdown file in src/content/work/<slug>.md.
  The block between the --- lines at the top (frontmatter) fills the card and the page header.
  Set `ready: true` when the case study should be readable on the site.
*/
function parse(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!m) return { data: {}, content: raw }
  return { data: yaml.load(m[1]) || {}, content: m[2].replace(/<!--[\s\S]*?-->/g, '').trim() }
}

const files = import.meta.glob('../content/work/*.md', { query: '?raw', import: 'default', eager: true })

const projects = Object.entries(files)
  .filter(([path]) => !path.split('/').pop().startsWith('_'))
  .map(([path, raw]) => {
    const { data, content } = parse(raw)
    return { slug: path.split('/').pop().replace(/\.md$/, ''), ...data, content }
  })
  .sort((a, b) => (a.order ?? 99) - (b.order ?? 99))

export function getProject(slug) {
  return projects.find((p) => p.slug === slug)
}
export default projects
