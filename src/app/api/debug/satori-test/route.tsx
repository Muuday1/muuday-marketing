import React from 'react'
import { NextResponse } from 'next/server'
import { renderToPng } from '@/content-engine/templates/render'

export async function GET() {
  const start = Date.now()

  try {
    console.log('[DEBUG] Testing Satori...')

    const buffer = await renderToPng(
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1a1a1a',
        }}
      >
        <span style={{ color: '#9FE870', fontSize: 48, fontWeight: 'bold' }}>Muuday</span>
      </div>,
      { width: 1080, height: 1080 }
    )

    console.log('[DEBUG] Satori test complete in', Date.now() - start, 'ms')

    return NextResponse.json({
      success: true,
      pngSize: buffer.length,
      duration: Date.now() - start,
    })
  } catch (err) {
    console.error('[DEBUG] Satori test failed:', err)
    return NextResponse.json(
      {
        success: false,
        error: err instanceof Error ? err.message : 'Unknown error',
        stack: err instanceof Error ? err.stack : undefined,
        duration: Date.now() - start,
      },
      { status: 500 }
    )
  }
}
