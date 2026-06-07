import { promises as fs } from 'fs'
import path from 'path'

let regularFont: ArrayBuffer | null = null
let boldFont: ArrayBuffer | null = null

function bufferToArrayBuffer(buf: Buffer): ArrayBuffer {
  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer
}

function findFontsDir(): string {
  // Try multiple paths for different environments (local, Vercel, Docker)
  const candidates = [
    path.join(process.cwd(), 'public', 'fonts'),
    path.join(process.cwd(), 'fonts'),
    path.join(__dirname, '..', '..', '..', 'public', 'fonts'),
    path.join('/var/task', 'public', 'fonts'),
  ]
  return candidates[0]
}

export async function loadFonts(): Promise<{ regular: ArrayBuffer; bold: ArrayBuffer }> {
  if (regularFont && boldFont) {
    return { regular: regularFont, bold: boldFont }
  }

  const fontDir = findFontsDir()
  const regularPath = path.join(fontDir, 'Inter-Regular.ttf')
  const boldPath = path.join(fontDir, 'Inter-Bold.ttf')

  const [regularBuf, boldBuf] = await Promise.all([fs.readFile(regularPath), fs.readFile(boldPath)])

  regularFont = bufferToArrayBuffer(regularBuf)
  boldFont = bufferToArrayBuffer(boldBuf)

  return { regular: regularFont, bold: boldFont }
}
