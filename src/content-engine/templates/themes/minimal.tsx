import React from 'react'

const GREEN = '#9FE870'
const DARK = '#0F172A'
const WHITE = '#FFFFFF'

export function MinimalCover({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: WHITE,
        padding: '80px',
        textAlign: 'center',
      }}
    >
      <div style={{ width: '60px', height: '4px', backgroundColor: GREEN, marginBottom: '48px' }} />
      <h1
        style={{
          fontFamily: 'Inter',
          fontWeight: 800,
          fontSize: '72px',
          lineHeight: 1.1,
          color: DARK,
          margin: 0,
          maxWidth: '900px',
          letterSpacing: '-0.02em',
        }}
      >
        {title}
      </h1>
      {subtitle && (
        <p
          style={{
            fontFamily: 'Inter',
            fontWeight: 400,
            fontSize: '28px',
            color: '#64748b',
            marginTop: '32px',
            maxWidth: '700px',
          }}
        >
          {subtitle}
        </p>
      )}
      <div
        style={{
          position: 'absolute',
          bottom: '48px',
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
            fontSize: '18px',
            color: '#94a3b8',
            letterSpacing: '0.05em',
          }}
        >
          @MUUDAY
        </span>
      </div>
    </div>
  )
}

export function MinimalTip({
  number,
  title,
  description,
}: {
  number: number
  title: string
  description: string
}) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: WHITE,
        padding: '80px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '48px' }}>
        <span
          style={{
            fontFamily: 'Inter',
            fontWeight: 200,
            fontSize: '96px',
            color: GREEN,
            lineHeight: 1,
          }}
        >
          {String(number).padStart(2, '0')}
        </span>
        <div style={{ width: '40px', height: '2px', backgroundColor: '#e2e8f0' }} />
      </div>
      <h2
        style={{
          fontFamily: 'Inter',
          fontWeight: 700,
          fontSize: '44px',
          color: DARK,
          margin: 0,
          marginBottom: '24px',
          lineHeight: 1.2,
        }}
      >
        {title}
      </h2>
      <p
        style={{
          fontFamily: 'Inter',
          fontWeight: 400,
          fontSize: '28px',
          color: '#475569',
          lineHeight: 1.6,
          margin: 0,
          flex: 1,
        }}
      >
        {description}
      </p>
      <div style={{ marginTop: '48px' }}>
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

export function MinimalCTA({ cta, hashtags }: { cta: string; hashtags?: string[] }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: DARK,
        padding: '80px',
        textAlign: 'center',
      }}
    >
      <div style={{ width: '60px', height: '4px', backgroundColor: GREEN, marginBottom: '48px' }} />
      <h2
        style={{
          fontFamily: 'Inter',
          fontWeight: 800,
          fontSize: '56px',
          color: WHITE,
          margin: 0,
          marginBottom: '48px',
          lineHeight: 1.15,
          maxWidth: '900px',
        }}
      >
        {cta}
      </h2>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '32px' }}>
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: GREEN }} />
        <span
          style={{
            fontFamily: 'Inter',
            fontWeight: 600,
            fontSize: '20px',
            color: WHITE,
            letterSpacing: '0.05em',
          }}
        >
          @MUUDAY
        </span>
      </div>
      {hashtags && hashtags.length > 0 && (
        <p style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '22px', color: '#64748b' }}>
          {hashtags.slice(0, 5).join(' ')}
        </p>
      )}
    </div>
  )
}
