import { renderToPng } from '../src/content-engine/templates/render'
import React from 'react'
import fs from 'fs'

async function test() {
  try {
    const buf = await renderToPng(
      React.createElement(
        'div',
        {
          style: {
            width: 1080,
            height: 1080,
            background: '#9FE870',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'Inter',
          },
        },
        React.createElement(
          'span',
          { style: { fontSize: 60, color: '#0F172A', fontWeight: 700 } },
          'Teste Satori'
        )
      ),
      { width: 1080, height: 1080 }
    )
    console.log('Generated PNG:', buf.length, 'bytes')
    fs.writeFileSync('/tmp/test-satori.png', buf)
    console.log('Saved to /tmp/test-satori.png')
  } catch (err) {
    console.error('Failed:', (err as Error).message)
    console.error('Stack:', (err as Error).stack)
  }
}
test()
