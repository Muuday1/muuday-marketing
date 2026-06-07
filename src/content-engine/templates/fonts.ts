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

export async function loadFonts(): Promise<{ regular: ArrayBuffer; bold: ArrayBuffer }> {
  if (regularFont && boldFont) {
    return { regular: regularFont, bold: boldFont }
  }

  // Debug: log cwd and candidates
  console.log('[fonts] process.cwd():', process.cwd())
  console.log('[fonts] __dirname:', typeof __dirname !== 'undefined' ? __dirname : 'undefined')

  const candidates = [
    path.join(process.cwd(), 'public', 'fonts'),
    path.join(process.cwd(), 'fonts'),
    path.join('/var/task', 'public', 'fonts'),
    path.join('/var/task', 'fonts'),
  ]

  for (const dir of candidates) {
    const exists = await dirExists(dir)
    const regularFile = path.join(dir, 'Inter-Regular.ttf')
    const regularExists = await fileExists(regularFile)
    console.log(`[fonts] Checking: ${dir} | dirExists=${exists} | regularExists=${regularExists}`)
    if (regularExists) {
      const boldFile = path.join(dir, 'Inter-Bold.ttf')
      const [regularBuf, boldBuf] = await Promise.all([
        fs.readFile(regularFile),
        fs.readFile(boldFile),
      ])
      regularFont = bufferToArrayBuffer(regularBuf)
      boldFont = bufferToArrayBuffer(boldBuf)
      console.log('[fonts] Loaded fonts from:', dir)
      return { regular: regularFont, bold: boldFont }
    }
  }

  console.error('[fonts] FAILED to find fonts in any candidate:', candidates)
  throw new Error('Font files not found. Searched: ' + candidates.join(', '))
}
