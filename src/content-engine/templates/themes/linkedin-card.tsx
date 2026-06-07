import React from 'react'

const GREEN = '#9FE870'
const DARK = '#0F172A'
const WHITE = '#FFFFFF'
const SLATE = '#64748b'

/**
 * LinkedIn Insight Card — 1200x627 (optimal LinkedIn image size)
 * Single impactful visual for text posts. Not a carousel.
 */
export function LinkedInCover({ headline, insight }: { headline: string; insight: string }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: WHITE,
        padding: '80px',
        position: 'relative',
      }}
    >
      {/* Top accent bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '8px',
          backgroundColor: GREEN,
        }}
      />

      {/* Label */}
      <span
        style={{
          fontFamily: 'Inter',
          fontWeight: 600,
          fontSize: '18px',
          color: GREEN,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          marginBottom: '40px',
        }}
      >
        Insight
      </span>

      {/* Headline */}
      <h1
        style={{
          fontFamily: 'Inter',
          fontWeight: 800,
          fontSize: '52px',
          lineHeight: 1.15,
          color: DARK,
          margin: 0,
          marginBottom: '32px',
          maxWidth: '900px',
        }}
      >
        {headline}
      </h1>

      {/* Divider */}
      <div style={{ width: '60px', height: '4px', backgroundColor: GREEN, marginBottom: '32px' }} />

      {/* Insight text */}
      <p
        style={{
          fontFamily: 'Inter',
          fontWeight: 400,
          fontSize: '28px',
          lineHeight: 1.5,
          color: SLATE,
          margin: 0,
          maxWidth: '900px',
        }}
      >
        {insight}
      </p>

      {/* Brand */}
      <div
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '80px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: GREEN }} />
        <span
          style={{
            fontFamily: 'Inter',
            fontWeight: 600,
            fontSize: '16px',
            color: '#cbd5e1',
            letterSpacing: '0.1em',
          }}
        >
          @MUUDAY
        </span>
      </div>
    </div>
  )
}
