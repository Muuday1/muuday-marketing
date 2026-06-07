import React from 'react'
// Preply-inspired: trust, education, calm gradients
// Uses soft blues, clean geometry, rounded cards

import { PALETTES, FONTS, SPACE } from './design-system'

const P = PALETTES.calm

export function CalmCover({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(135deg, ${P.bg} 0%, #E0E7FF 50%, ${P.bg} 100%)`,
        padding: SPACE.xl,
        textAlign: 'center',
        position: 'relative',
      }}
    >
      {/* Soft gradient orbs */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '15%',
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${P.primaryMuted}40 0%, transparent 70%)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '15%',
          right: '10%',
          width: 280,
          height: 280,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${P.secondary}30 0%, transparent 70%)`,
        }}
      />

      {/* Card container */}
      <div
        style={{
          backgroundColor: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(20px)',
          borderRadius: 24,
          padding: SPACE.xl,
          maxWidth: 900,
          border: `1px solid rgba(255,255,255,0.5)`,
          boxShadow: '0 8px 32px rgba(37,99,235,0.08)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            backgroundColor: `${P.primary}15`,
            padding: '8px 18px',
            borderRadius: 100,
            marginBottom: SPACE.lg,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: P.primary,
            }}
          />
          <span
            style={{
              fontFamily: FONTS.sans,
              fontWeight: 700,
              fontSize: 16,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: P.primary,
            }}
          >
            Muuday
          </span>
        </div>

        <h1
          style={{
            fontFamily: FONTS.sans,
            fontWeight: 800,
            fontSize: 58,
            lineHeight: 1.1,
            color: P.text,
            margin: 0,
            letterSpacing: '-0.02em',
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
              lineHeight: 1.4,
            }}
          >
            {subtitle}
          </p>
        )}
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: SPACE.lg,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
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
          }}
        >
          @muuday
        </span>
      </div>
    </div>
  )
}

export function CalmTip({
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
      {/* Top gradient line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: SPACE.xl,
          right: SPACE.xl,
          height: 4,
          background: `linear-gradient(90deg, ${P.primary} 0%, ${P.secondary} 100%)`,
          borderRadius: '0 0 4px 4px',
        }}
      />

      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: SPACE.lg,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: `linear-gradient(135deg, ${P.primary} 0%, ${P.secondary} 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                fontFamily: FONTS.sans,
                fontWeight: 800,
                fontSize: 24,
                color: 'white',
              }}
            >
              {number}
            </span>
          </div>
          <div>
            <span
              style={{
                fontFamily: FONTS.sans,
                fontWeight: 700,
                fontSize: 14,
                color: P.primary,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              Dica
            </span>
            <div
              style={{
                width: 30,
                height: 3,
                backgroundColor: P.primary,
                borderRadius: 2,
                marginTop: 4,
              }}
            />
          </div>
        </div>
        <span
          style={{
            fontFamily: FONTS.sans,
            fontWeight: 600,
            fontSize: 14,
            color: P.textMuted,
            letterSpacing: '0.06em',
          }}
        >
          @muuday
        </span>
      </div>

      <h2
        style={{
          fontFamily: FONTS.sans,
          fontWeight: 800,
          fontSize: 42,
          color: P.text,
          margin: 0,
          marginBottom: SPACE.sm,
          lineHeight: 1.15,
          letterSpacing: '-0.02em',
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

      {/* Progress dots */}
      <div style={{ display: 'flex', gap: 6, marginTop: SPACE.md }}>
        {[P.primary, P.primaryMuted, P.border].map((c, i) => (
          <div
            key={i}
            style={{
              width: i === 0 ? 24 : 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: c,
            }}
          />
        ))}
      </div>
    </div>
  )
}

export function CalmCTA({ cta, hashtags }: { cta: string; hashtags?: string[] }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(135deg, ${P.bgDark} 0%, #1E293B 100%)`,
        padding: SPACE.xl,
        textAlign: 'center',
        position: 'relative',
      }}
    >
      {/* Glow effect */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${P.primary}20 0%, transparent 70%)`,
        }}
      />

      <div
        style={{
          backgroundColor: `${P.primary}20`,
          border: `1px solid ${P.primary}40`,
          borderRadius: 100,
          padding: '10px 24px',
          marginBottom: SPACE.lg,
        }}
      >
        <span
          style={{
            fontFamily: FONTS.sans,
            fontWeight: 700,
            fontSize: 16,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: P.primaryMuted,
          }}
        >
          Muuday
        </span>
      </div>

      <h2
        style={{
          fontFamily: FONTS.sans,
          fontWeight: 800,
          fontSize: 52,
          color: P.textLight,
          margin: 0,
          lineHeight: 1.15,
          maxWidth: 900,
          letterSpacing: '-0.02em',
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
            width: 40,
            height: 40,
            borderRadius: 12,
            background: `linear-gradient(135deg, ${P.primary} 0%, ${P.secondary} 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{ fontFamily: FONTS.sans, fontWeight: 800, fontSize: 18, color: 'white' }}>
            M
          </span>
        </div>
        <span
          style={{
            fontFamily: FONTS.sans,
            fontWeight: 600,
            fontSize: 20,
            color: P.textMuted,
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
            color: P.textMuted,
            marginTop: SPACE.md,
          }}
        >
          {hashtags.slice(0, 5).join('  ')}
        </p>
      )}
    </div>
  )
}
