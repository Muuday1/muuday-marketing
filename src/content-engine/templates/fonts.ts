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

  for (const dir of fsCandidates) {
    if (await dirExists(dir)) {
      const regularPath = path.join(dir, 'Inter-Regular.ttf')
      if (await fileExists(regularPath)) {
        regularFont = await loadFontFromFile(regularPath)
        boldFont = await loadFontFromFile(path.join(dir, 'Inter-Bold.ttf'))
        return { regular: regularFont, bold: boldFont }
      }
    }
  }

  // Fallback: fetch from GitHub raw CDN
  regularFont = await loadFontFromUrl(`${GITHUB_FONT_BASE}/Inter-Regular.ttf`)
  boldFont = await loadFontFromUrl(`${GITHUB_FONT_BASE}/Inter-Bold.ttf`)

  return { regular: regularFont, bold: boldFont }
}
