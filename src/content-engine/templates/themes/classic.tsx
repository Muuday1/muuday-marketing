import React from 'react'

const GREEN = '#9FE870'
const DARK = '#0F172A'
const WHITE = '#FFFFFF'
const LIGHT = '#F8FAFC'

export function ClassicCover({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(135deg, ${DARK} 0%, #1e293b 100%)`,
        padding: '60px',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          width: '80px',
          height: '6px',
          backgroundColor: GREEN,
          borderRadius: '3px',
          marginBottom: '40px',
        }}
      />
      <h1
        style={{
          fontFamily: 'Inter',
          fontWeight: 700,
          fontSize: '64px',
          lineHeight: 1.15,
          color: WHITE,
          margin: 0,
          maxWidth: '900px',
        }}
      >
        {title}
      </h1>
      {subtitle && (
        <p
          style={{
            fontFamily: 'Inter',
            fontWeight: 400,
            fontSize: '32px',
            color: '#94a3b8',
            marginTop: '24px',
            maxWidth: '800px',
          }}
        >
          {subtitle}
        </p>
      )}
      <div
        style={{
          position: 'absolute',
          bottom: '40px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <div
          style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: GREEN }}
        />
        <span style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '24px', color: GREEN }}>
          @muuday
        </span>
      </div>
    </div>
  )
}

export function ClassicTip({
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
        backgroundColor: LIGHT,
        padding: '60px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px' }}>
        <div
          style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            backgroundColor: GREEN,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '36px', color: DARK }}>
            {number}
          </span>
        </div>
        <div
          style={{ width: '80px', height: '4px', backgroundColor: GREEN, borderRadius: '2px' }}
        />
      </div>
      <h2
        style={{
          fontFamily: 'Inter',
          fontWeight: 700,
          fontSize: '48px',
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
          fontSize: '32px',
          color: '#475569',
          lineHeight: 1.5,
          margin: 0,
          flex: 1,
        }}
      >
        {description}
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '40px' }}>
        <div
          style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: GREEN }}
        />
        <span style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '20px', color: DARK }}>
          @muuday
        </span>
      </div>
    </div>
  )
}

export function ClassicCTA({ cta, hashtags }: { cta: string; hashtags?: string[] }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(135deg, ${GREEN} 0%, #7bc44a 100%)`,
        padding: '60px',
        textAlign: 'center',
      }}
    >
      <h2
        style={{
          fontFamily: 'Inter',
          fontWeight: 700,
          fontSize: '52px',
          color: DARK,
          margin: 0,
          marginBottom: '40px',
          lineHeight: 1.2,
          maxWidth: '900px',
        }}
      >
        {cta}
      </h2>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
        <div
          style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: DARK }}
        />
        <span style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '32px', color: DARK }}>
          @muuday
        </span>
      </div>
      {hashtags && hashtags.length > 0 && (
        <p
          style={{
            fontFamily: 'Inter',
            fontWeight: 400,
            fontSize: '24px',
            color: DARK,
            opacity: 0.8,
          }}
        >
          {hashtags.slice(0, 5).join(' ')}
        </p>
      )}
    </div>
  )
}
