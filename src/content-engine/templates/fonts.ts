import { GlobalFonts } from '@napi-rs/canvas'
import { promises as fs } from 'fs'
import path from 'path'

// ── Canvas font registration ──
let canvasFontsRegistered = false

export function registerFonts(): void {
  if (canvasFontsRegistered) return

  const fontPath = path.join(process.cwd(), 'public', 'fonts', 'inter', 'Inter-Variable.ttf')
  try {
    GlobalFonts.registerFromPath(fontPath, 'Inter')
    console.log('[FONTS] Registered Inter for Canvas. Families:', GlobalFonts.families)
    canvasFontsRegistered = true
  } catch (err) {
    console.warn('[FONTS] Failed to register Inter for Canvas:', err)
  }
}

// ── Satori font loading (legacy) ──
let regularFont: ArrayBuffer | null = null
let boldFont: ArrayBuffer | null = null

function bufferToArrayBuffer(buf: Buffer): ArrayBuffer {
  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer
}

const GITHUB_FONT_BASE =
  'https://raw.githubusercontent.com/Muuday1/muuday-marketing/main/public/fonts'

export async function loadFonts(): Promise<{ regular: ArrayBuffer; bold: ArrayBuffer }> {
  if (regularFont && boldFont) {
    return { regular: regularFont, bold: boldFont }
  }

  const localRegular = path.join(process.cwd(), 'public', 'fonts', 'inter', 'Inter-Variable.ttf')
  const localBold = path.join(process.cwd(), 'public', 'fonts', 'inter', 'Inter-Variable.ttf')

  try {
    const [regularBuf, boldBuf] = await Promise.all([
      fs.readFile(localRegular),
      fs.readFile(localBold),
    ])
    regularFont = bufferToArrayBuffer(regularBuf)
    boldFont = bufferToArrayBuffer(boldBuf)
    return { regular: regularFont, bold: boldFont }
  } catch {
    // Fallback: download from GitHub
    const [regularData, boldData] = await Promise.all([
      fetch(`${GITHUB_FONT_BASE}/inter/Inter-Variable.ttf`).then((r) => r.arrayBuffer()),
      fetch(`${GITHUB_FONT_BASE}/inter/Inter-Variable.ttf`).then((r) => r.arrayBuffer()),
    ])
    regularFont = regularData
    boldFont = boldData
    return { regular: regularFont, bold: boldFont }
  }
}
