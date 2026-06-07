import { promises as fs } from 'fs'
import path from 'path'

let regularFont: ArrayBuffer | null = null
let boldFont: ArrayBuffer | null = null

function bufferToArrayBuffer(buf: Buffer): ArrayBuffer {
  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer
}

async function dirExists(dir: string): Promise<boolean> {
  try {
    await fs.access(dir)
    return true
  } catch {
    return false
  }
}

async function fileExists(file: string): Promise<boolean> {
  try {
    await fs.access(file)
    return true
  } catch {
    return false
  }
}

async function loadFontFromFile(fontPath: string): Promise<ArrayBuffer> {
  const buf = await fs.readFile(fontPath)
  return bufferToArrayBuffer(buf)
}

async function loadFontFromUrl(url: string): Promise<ArrayBuffer> {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Failed to fetch font from ${url}: ${res.status}`)
  }
  const buf = Buffer.from(await res.arrayBuffer())
  return bufferToArrayBuffer(buf)
}

const GITHUB_FONT_BASE =
  'https://raw.githubusercontent.com/Muuday1/muuday-marketing/main/public/fonts'

export async function loadFonts(): Promise<{ regular: ArrayBuffer; bold: ArrayBuffer }> {
  if (regularFont && boldFont) {
    return { regular: regularFont, bold: boldFont }
  }

  // Try filesystem first
  const fsCandidates = [
    path.join(process.cwd(), 'public', 'fonts'),
    path.join(process.cwd(), 'fonts'),
    path.join('/var/task', 'public', 'fonts'),
    path.join('/var/task', 'fonts'),
  ]

  console.log('[FONTS] process.cwd():', process.cwd())

  for (const dir of fsCandidates) {
    console.log('[FONTS] Checking:', dir)
    if (await dirExists(dir)) {
      console.log('[FONTS] Directory exists:', dir)
      const regularPath = path.join(dir, 'Inter-Regular.ttf')
      if (await fileExists(regularPath)) {
        console.log('[FONTS] Loading from filesystem:', regularPath)
        regularFont = await loadFontFromFile(regularPath)
        boldFont = await loadFontFromFile(path.join(dir, 'Inter-Bold.ttf'))
        return { regular: regularFont, bold: boldFont }
      } else {
        console.log('[FONTS] Font not found at:', regularPath)
      }
    } else {
      console.log('[FONTS] Directory not found:', dir)
    }
  }

  // Fallback: fetch from GitHub raw CDN
  console.log('[FONTS] Falling back to GitHub CDN')
  const start = Date.now()
  regularFont = await loadFontFromUrl(`${GITHUB_FONT_BASE}/Inter-Regular.ttf`)
  console.log('[FONTS] Regular font loaded from CDN in', Date.now() - start, 'ms')
  boldFont = await loadFontFromUrl(`${GITHUB_FONT_BASE}/Inter-Bold.ttf`)
  console.log('[FONTS] Bold font loaded from CDN in', Date.now() - start, 'ms')

  return { regular: regularFont, bold: boldFont }
}
