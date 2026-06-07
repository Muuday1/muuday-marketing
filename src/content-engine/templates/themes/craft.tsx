import React from 'react'
// Etsy-inspired: handmade, earthy, organic textures
// Uses warm terracotta, craft paper feel, serif accents

import { PALETTES, FONTS, SPACE, Divider } from './design-system'

const P = PALETTES.craft

export function CraftCover({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: P.bg,
        padding: SPACE['2xl'],
        position: 'relative',
      }}
    >
      {/* Hand-drawn style decorative border */}
      <div
        style={{
          position: 'absolute',
          top: SPACE.lg,
          left: SPACE.lg,
          right: SPACE.lg,
          bottom: SPACE.lg,
          border: `3px solid ${P.accent}`,
          borderRadius: 4,
          opacity: 0.4,
        }}
      />

      {/* Corner accent */}
      <div
        style={{
          position: 'absolute',
          top: SPACE.lg,
          right: SPACE.lg,
          width: 80,
          height: 80,
          borderTop: `4px solid ${P.primary}`,
          borderRight: `4px solid ${P.primary}`,
        }}
      />

      <div
        style={{
          backgroundColor: P.primary,
          padding: '8px 18px',
          borderRadius: 4,
          marginBottom: SPACE.lg,
        }}
      >
        <span
          style={{
            fontFamily: FONTS.sans,
            fontWeight: 700,
            fontSize: 16,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'white',
          }}
        >
          Muuday
        </span>
      </div>

      <Divider color={P.primary} width={100} height={5} />

      <h1
        style={{
          fontFamily: FONTS.serif,
          fontWeight: 700,
          fontSize: 60,
          lineHeight: 1.15,
          color: P.text,
          margin: 0,
          marginTop: SPACE.lg,
          maxWidth: 880,
        }}
      >
        {title}
      </h1>

      {subtitle && (
        <p
          style={{
            fontFamily: FONTS.sans,
            fontWeight: 400,
            fontSize: 26,
            color: P.textMuted,
            marginTop: SPACE.md,
            maxWidth: 700,
            lineHeight: 1.5,
          }}
        >
          {subtitle}
        </p>
      )}

      <div
        style={{
          position: 'absolute',
          bottom: SPACE['2xl'],
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 4,
            backgroundColor: P.primary,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{ fontFamily: FONTS.sans, fontWeight: 800, fontSize: 16, color: 'white' }}>
            M
          </span>
        </div>
        <span
          style={{
            fontFamily: FONTS.sans,
            fontWeight: 600,
            fontSize: 18,
            color: P.textMuted,
            letterSpacing: '0.02em',
          }}
        >
          @muuday
        </span>
      </div>
    </div>
  )
}

export function CraftTip({
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
        backgroundColor: P.bg,
        padding: SPACE.xl,
        position: 'relative',
      }}
    >
      {/* Top border accent */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 6,
          background: `linear-gradient(90deg, ${P.primary} 0%, ${P.accent} 100%)`,
        }}
      />

      {/* Number */}
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: SPACE.sm,
          marginBottom: SPACE.md,
        }}
      >
        <span
          style={{
            fontFamily: FONTS.serif,
            fontWeight: 700,
            fontSize: 72,
            lineHeight: 1,
            color: P.primary,
          }}
        >
          {number}
        </span>
        <div style={{ flex: 1, height: 2, backgroundColor: P.border }} />
      </div>

      <h2
        style={{
          fontFamily: FONTS.serif,
          fontWeight: 700,
          fontSize: 42,
          color: P.text,
          margin: 0,
          marginBottom: SPACE.sm,
          lineHeight: 1.2,
        }}
      >
        {title}
      </h2>

      <p
        style={{
          fontFamily: FONTS.sans,
          fontWeight: 400,
          fontSize: 26,
          color: P.textMuted,
          lineHeight: 1.55,
          margin: 0,
          flex: 1,
        }}
      >
        {description}
      </p>

      {/* Bottom brand */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          marginTop: SPACE.md,
          paddingTop: SPACE.sm,
          borderTop: `2px solid ${P.border}`,
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 4,
            backgroundColor: P.primary,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{ fontFamily: FONTS.sans, fontWeight: 800, fontSize: 14, color: 'white' }}>
            M
          </span>
        </div>
        <span
          style={{
            fontFamily: FONTS.sans,
            fontWeight: 600,
            fontSize: 16,
            color: P.textMuted,
          }}
        >
          @muuday
        </span>
      </div>
    </div>
  )
}

export function CraftCTA({ cta, hashtags }: { cta: string; hashtags?: string[] }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: P.bgDark,
        padding: SPACE.xl,
        textAlign: 'center',
        position: 'relative',
      }}
    >
      {/* Decorative frame */}
      <div
        style={{
          position: 'absolute',
          top: SPACE.lg,
          left: SPACE.lg,
          right: SPACE.lg,
          bottom: SPACE.lg,
          border: `2px solid rgba(212,165,116,0.2)`,
          borderRadius: 4,
        }}
      />

      <div
        style={{
          backgroundColor: P.primary,
          padding: '8px 20px',
          borderRadius: 4,
          marginBottom: SPACE.lg,
        }}
      >
        <span
          style={{
            fontFamily: FONTS.sans,
            fontWeight: 700,
            fontSize: 16,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'white',
          }}
        >
          Muuday
        </span>
      </div>

      <h2
        style={{
          fontFamily: FONTS.serif,
          fontWeight: 700,
          fontSize: 52,
          color: P.textLight,
          margin: 0,
          lineHeight: 1.15,
          maxWidth: 900,
        }}
      >
        {cta}
      </h2>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          marginTop: SPACE.lg,
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 4,
            backgroundColor: P.primary,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{ fontFamily: FONTS.sans, fontWeight: 800, fontSize: 16, color: 'white' }}>
            M
          </span>
        </div>
        <span
          style={{
            fontFamily: FONTS.sans,
            fontWeight: 600,
            fontSize: 20,
            color: P.accent,
          }}
        >
          @muuday
        </span>
      </div>

      {hashtags && hashtags.length > 0 && (
        <p
          style={{
            fontFamily: FONTS.sans,
            fontWeight: 400,
            fontSize: 20,
            color: 'rgba(250,250,249,0.4)',
            marginTop: SPACE.md,
          }}
        >
          {hashtags.slice(0, 5).join('  ')}
        </p>
      )}
    </div>
  )
}
