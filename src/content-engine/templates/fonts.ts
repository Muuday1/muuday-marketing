import { promises as fs } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

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

async function getFontDir(): Promise<string> {
  // ESM-compatible way to get __dirname
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)

  // Try fonts next to this file first (works in Vercel serverless)
  const localDir = path.join(__dirname, 'fonts')
  if (await dirExists(localDir)) {
    return localDir
  }

  // Fallback to public/fonts (works locally)
  return path.join(process.cwd(), 'public', 'fonts')
}

export async function loadFonts(): Promise<{ regular: ArrayBuffer; bold: ArrayBuffer }> {
  if (regularFont && boldFont) {
    return { regular: regularFont, bold: boldFont }
  }

  const fontDir = await getFontDir()
  const regularPath = path.join(fontDir, 'Inter-Regular.ttf')
  const boldPath = path.join(fontDir, 'Inter-Bold.ttf')

  const [regularBuf, boldBuf] = await Promise.all([fs.readFile(regularPath), fs.readFile(boldPath)])

  regularFont = bufferToArrayBuffer(regularBuf)
  boldFont = bufferToArrayBuffer(boldBuf)

  return { regular: regularFont, bold: boldFont }
}
