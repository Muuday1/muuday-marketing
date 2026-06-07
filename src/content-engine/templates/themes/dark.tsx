import React from 'react'
// Muuday Dark — Premium dark mode
// Sophisticated, tech-forward. Dark bg with lime glow and grid texture.
// Uses JetBrains Mono for accents.

import { MUUDAY, MuudayDivider, MuudayLogo, MuudayNumberPill } from './design-system'

const C = MUUDAY.colors
const F = MUUDAY.fonts
const S = MUUDAY.space

export function DarkCover({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: C.dark,
        padding: S['2xl'],
        position: 'relative',
      }}
    >
      {/* Subtle grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `linear-gradient(${C.lime}06 1px, transparent 1px), linear-gradient(90deg, ${C.lime}06 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Lime glow */}
      <div
        style={{
          position: 'absolute',
          top: -100,
          right: -100,
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${C.lime}20 0%, transparent 60%)`,
        }}
      />

      {/* Top accent line */}
      <div
        style={{
          width: 80,
          height: 4,
          background: `linear-gradient(90deg, ${C.lime} 0%, ${C.limeDark} 100%)`,
          borderRadius: 2,
          marginBottom: S.lg,
        }}
      />

      <div style={{ position: 'relative' }}>
        <MuudayLogo color={C.lime} textColor={C.lime} size={28} />
      </div>

      <h1
        style={{
          fontFamily: F.sans,
          fontWeight: 800,
          fontSize: 58,
          lineHeight: 1.08,
          color: C.white,
          margin: 0,
          marginTop: S.lg,
          maxWidth: 900,
          letterSpacing: '-0.03em',
          position: 'relative',
        }}
      >
        {title}
      </h1>

      {subtitle && (
        <p
          style={{
            fontFamily: F.sans,
            fontWeight: 400,
            fontSize: 24,
            color: C.slateLight,
            marginTop: S.md,
            maxWidth: 700,
            lineHeight: 1.5,
            position: 'relative',
          }}
        >
          {subtitle}
        </p>
      )}

      {/* Corner bracket */}
      <div
        style={{
          position: 'absolute',
          bottom: S['2xl'],
          right: S['2xl'],
          width: 48,
          height: 48,
          borderRight: `2px solid ${C.lime}40`,
          borderBottom: `2px solid ${C.lime}40`,
        }}
      />
    </div>
  )
}

export function DarkTip({
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
        backgroundColor: C.dark,
        padding: S.xl,
        position: 'relative',
      }}
    >
      {/* Grid background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `linear-gradient(${C.lime}04 1px, transparent 1px), linear-gradient(90deg, ${C.lime}04 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: S.lg,
          position: 'relative',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <MuudayNumberPill number={number} bg={`${C.lime}20`} color={C.lime} />
          <div style={{ width: 20, height: 1, backgroundColor: `${C.lime}40` }} />
          <span
            style={{
              fontFamily: F.mono,
              fontWeight: 600,
              fontSize: 13,
              color: C.slate,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            Dica
          </span>
        </div>
        <span
          style={{
            fontFamily: F.mono,
            fontWeight: 500,
            fontSize: 12,
            color: C.slate,
            letterSpacing: '0.1em',
          }}
        >
          @muuday
        </span>
      </div>

      <MuudayDivider color={`${C.lime}30`} width={40} height={2} />

      <h2
        style={{
          fontFamily: F.sans,
          fontWeight: 800,
          fontSize: 42,
          color: C.white,
          margin: 0,
          marginTop: S.lg,
          lineHeight: 1.12,
          letterSpacing: '-0.02em',
          position: 'relative',
        }}
      >
        {title}
      </h2>

      <p
        style={{
          fontFamily: F.sans,
          fontWeight: 400,
          fontSize: 26,
          color: C.slateLight,
          lineHeight: 1.5,
          margin: 0,
          marginTop: S.sm,
          flex: 1,
          position: 'relative',
        }}
      >
        {description}
      </p>

      {/* Bottom indicator */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          marginTop: S.md,
          position: 'relative',
        }}
      >
        <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: C.lime }} />
        <div style={{ flex: 1, height: 1, backgroundColor: `${C.lime}20` }} />
        <span
          style={{
            fontFamily: F.mono,
            fontWeight: 500,
            fontSize: 12,
            color: C.slate,
          }}
        >
          {number}/5
        </span>
      </div>
    </div>
  )
}

export function DarkCTA({ cta, hashtags }: { cta: string; hashtags?: string[] }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: C.dark,
        padding: S.xl,
        textAlign: 'center',
        position: 'relative',
      }}
    >
      {/* Center glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${C.lime}12 0%, transparent 60%)`,
        }}
      />

      <div
        style={{
          backgroundColor: `${C.lime}15`,
          border: `1px solid ${C.lime}30`,
          borderRadius: MUUDAY.radius.lg,
          padding: '10px 24px',
          marginBottom: S.lg,
          position: 'relative',
        }}
      >
        <span
          style={{
            fontFamily: F.mono,
            fontWeight: 600,
            fontSize: 14,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: C.lime,
          }}
        >
          Muuday
        </span>
      </div>

      <h2
        style={{
          fontFamily: F.sans,
          fontWeight: 800,
          fontSize: 48,
          color: C.white,
          margin: 0,
          lineHeight: 1.1,
          maxWidth: 900,
          letterSpacing: '-0.02em',
          position: 'relative',
        }}
      >
        {cta}
      </h2>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          marginTop: S.lg,
          position: 'relative',
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: MUUDAY.radius.md,
            backgroundColor: C.lime,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{ fontFamily: F.sans, fontWeight: 800, fontSize: 16, color: C.dark }}>
            M
          </span>
        </div>
        <span
          style={{
            fontFamily: F.mono,
            fontWeight: 600,
            fontSize: 18,
            color: C.slateLight,
            letterSpacing: '0.05em',
          }}
        >
          @muuday
        </span>
      </div>

      {hashtags && hashtags.length > 0 && (
        <p
          style={{
            fontFamily: F.mono,
            fontWeight: 400,
            fontSize: 18,
            color: C.slate,
            marginTop: S.md,
            letterSpacing: '0.02em',
            position: 'relative',
          }}
        >
          {hashtags.slice(0, 5).join('  ')}
        </p>
      )}
    </div>
  )
}
