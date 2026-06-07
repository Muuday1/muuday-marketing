import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'

async function test() {
  try {
    const svg = await satori(
      {
        type: 'div',
        props: {
          style: {
            width: 200,
            height: 200,
            background: 'red',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'Arial',
          },
          children: 'Test',
        },
      },
      { width: 200, height: 200, fonts: [] }
    )
    console.log('SVG generated:', svg.length, 'chars')
    const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: 200 } })
    const png = resvg.render()
    console.log('PNG generated:', png.asPng().length, 'bytes')
  } catch (err) {
    console.error('Failed:', (err as Error).message)
  }
}
test()
