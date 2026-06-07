import React from 'react'

const GREEN = '#9FE870'
const DARK = '#0F172A'
const WHITE = '#FFFFFF'

export function BoldCover({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: GREEN,
        padding: '60px',
      }}
    >
      <div style={{ width: '100px', height: '8px', backgroundColor: DARK, marginBottom: '40px' }} />
      <h1
        style={{
          fontFamily: 'Inter',
          fontWeight: 900,
          fontSize: '68px',
          lineHeight: 1.05,
          color: DARK,
          margin: 0,
          maxWidth: '900px',
          textTransform: 'uppercase',
        }}
      >
        {title}
      </h1>
      {subtitle && (
        <p
          style={{
            fontFamily: 'Inter',
            fontWeight: 500,
            fontSize: '30px',
            color: DARK,
            marginTop: '28px',
            maxWidth: '800px',
            opacity: 0.8,
          }}
        >
          {subtitle}
        </p>
      )}
      <div
        style={{
          position: 'absolute',
          bottom: '40px',
          right: '60px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <span style={{ fontFamily: 'Inter', fontWeight: 900, fontSize: '22px', color: DARK }}>
          @muuday
        </span>
      </div>
    </div>
  )
}

export function BoldTip({
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
        backgroundColor: DARK,
        padding: '60px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '36px' }}>
        <span
          style={{
            fontFamily: 'Inter',
            fontWeight: 900,
            fontSize: '80px',
            color: GREEN,
            lineHeight: 1,
          }}
        >
          {number}
        </span>
        <div style={{ width: '60px', height: '6px', backgroundColor: GREEN }} />
      </div>
      <h2
        style={{
          fontFamily: 'Inter',
          fontWeight: 800,
          fontSize: '46px',
          color: WHITE,
          margin: 0,
          marginBottom: '20px',
          lineHeight: 1.15,
          textTransform: 'uppercase',
        }}
      >
        {title}
      </h2>
      <p
        style={{
          fontFamily: 'Inter',
          fontWeight: 400,
          fontSize: '28px',
          color: '#cbd5e1',
          lineHeight: 1.5,
          margin: 0,
          flex: 1,
        }}
      >
        {description}
      </p>
      <div style={{ marginTop: '36px' }}>
        <span style={{ fontFamily: 'Inter', fontWeight: 900, fontSize: '18px', color: GREEN }}>
          @muuday
        </span>
      </div>
    </div>
  )
}

export function BoldCTA({ cta, hashtags }: { cta: string; hashtags?: string[] }) {
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
        padding: '60px',
        textAlign: 'center',
      }}
    >
      <div
        style={{ width: '100px', height: '8px', backgroundColor: GREEN, marginBottom: '40px' }}
      />
      <h2
        style={{
          fontFamily: 'Inter',
          fontWeight: 900,
          fontSize: '56px',
          color: DARK,
          margin: 0,
          marginBottom: '40px',
          lineHeight: 1.1,
          maxWidth: '900px',
          textTransform: 'uppercase',
        }}
      >
        {cta}
      </h2>
      <div style={{ marginBottom: '28px' }}>
        <span style={{ fontFamily: 'Inter', fontWeight: 900, fontSize: '24px', color: DARK }}>
          @muuday
        </span>
      </div>
      {hashtags && hashtags.length > 0 && (
        <p style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: '22px', color: GREEN }}>
          {hashtags.slice(0, 5).join(' ')}
        </p>
      )}
    </div>
  )
}
