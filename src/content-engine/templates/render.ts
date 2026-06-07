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

  const fonts = await loadFonts()

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

  const resvg = new Resvg(svg, {
    fitTo: {
      mode: 'width',
      value: width,
    },
  })

  const pngData = resvg.render()
  return Buffer.from(pngData.asPng())
}
