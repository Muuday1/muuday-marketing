import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'
import { ReactNode } from 'react'
import { loadFonts } from './fonts'

export interface RenderOptions {
  width?: number
  height?: number
}

/**
 * Render a React component to PNG using Satori + resvg.
 */
export async function renderToPng(
  element: ReactNode,
  options: RenderOptions = {}
): Promise<Buffer> {
  const { width = 1080, height = 1080 } = options

  try {
    console.log('[SATORI] Loading fonts...')
    const fonts = await loadFonts()
    console.log(
      '[SATORI] Fonts loaded, regular:',
      fonts.regular.byteLength,
      'bold:',
      fonts.bold.byteLength
    )

    console.log('[SATORI] Rendering SVG...')
    const svg = await satori(element, {
      width,
      height,
      fonts: [
        {
          name: 'Inter',
          data: fonts.regular,
          weight: 400,
          style: 'normal',
        },
        {
          name: 'Inter',
          data: fonts.bold,
          weight: 700,
          style: 'normal',
        },
      ],
    })
    console.log('[SATORI] SVG rendered, length:', svg.length)

    const resvg = new Resvg(svg, {
      fitTo: {
        mode: 'width',
        value: width,
      },
    })

    const pngData = resvg.render()
    const buffer = Buffer.from(pngData.asPng())
    console.log('[SATORI] PNG rendered, size:', buffer.length)
    return buffer
  } catch (err) {
    console.error('[SATORI] renderToPng failed:', err)
    throw err
  }
}
