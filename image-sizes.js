// Reads the size of every image in public/ so pages can reserve the right space before
// a picture loads. Without this, lazy pictures pop in and the page jumps while scrolling.
import fs from 'node:fs'
import path from 'node:path'

function size(buf) {
  // PNG
  if (buf.readUInt32BE(0) === 0x89504e47) return [buf.readUInt32BE(16), buf.readUInt32BE(20)]
  // GIF
  if (buf.toString('ascii', 0, 3) === 'GIF') return [buf.readUInt16LE(6), buf.readUInt16LE(8)]
  // WebP
  if (buf.toString('ascii', 0, 4) === 'RIFF' && buf.toString('ascii', 8, 12) === 'WEBP') {
    const kind = buf.toString('ascii', 12, 16)
    if (kind === 'VP8X') return [1 + buf.readUIntLE(24, 3), 1 + buf.readUIntLE(27, 3)]
    if (kind === 'VP8L') { const b = buf.readUInt32LE(21); return [1 + (b & 0x3fff), 1 + ((b >> 14) & 0x3fff)] }
    if (kind === 'VP8 ') return [buf.readUInt16LE(26) & 0x3fff, buf.readUInt16LE(28) & 0x3fff]
  }
  // JPEG
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2
    while (i < buf.length) {
      if (buf[i] !== 0xff) { i++; continue }
      const m = buf[i + 1], len = buf.readUInt16BE(i + 2)
      if (m >= 0xc0 && m <= 0xcf && m !== 0xc4 && m !== 0xc8 && m !== 0xcc) return [buf.readUInt16BE(i + 7), buf.readUInt16BE(i + 5)]
      i += 2 + len
    }
  }
  return null
}

function scan(dir, base, out) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) scan(p, base, out)
    else if (/\.(webp|png|jpe?g|gif)$/i.test(e.name)) {
      const s = size(fs.readFileSync(p))
      if (s) out['/' + path.relative(base, p).split(path.sep).join('/')] = s
    }
  }
  return out
}

export default function imageSizes() {
  const id = 'virtual:image-sizes'
  return {
    name: 'image-sizes',
    resolveId: (x) => (x === id ? '\0' + id : null),
    load(x) {
      if (x !== '\0' + id) return null
      const pub = path.resolve('public')
      return `export default ${JSON.stringify(scan(pub, pub, {}))}`
    },
  }
}
