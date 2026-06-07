import React from 'react'
// Story template for Instagram (1080x1920)

const BRAND_GREEN = '#9FE870'
const BRAND_DARK = '#0F172A'
const BRAND_WHITE = '#FFFFFF'

interface StoryTemplateProps {
  title: string
  subtitle?: string
}

export function StoryTemplate({ title, subtitle }: StoryTemplateProps) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(180deg, ${BRAND_DARK} 0%, #1e293b 50%, ${BRAND_DARK} 100%)`,
        padding: '80px 60px',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          width: '60px',
          height: '6px',
          backgroundColor: BRAND_GREEN,
          borderRadius: '3px',
          marginBottom: '60px',
        }}
      />
      <h1
        style={{
          fontFamily: 'Inter',
          fontWeight: 700,
          fontSize: '80px',
          lineHeight: 1.1,
          color: BRAND_WHITE,
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
            fontSize: '40px',
            color: '#94a3b8',
            marginTop: '40px',
            maxWidth: '800px',
          }}
        >
          {subtitle}
        </p>
      )}
      <div
        style={{
          position: 'absolute',
          bottom: '60px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: BRAND_GREEN,
          }}
        />
        <span
          style={{
            fontFamily: 'Inter',
            fontWeight: 700,
            fontSize: '32px',
            color: BRAND_GREEN,
          }}
        >
          @muuday
        </span>
      </div>
    </div>
  )
}
