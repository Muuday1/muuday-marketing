// Muuday Minimal — Pure whitespace, thin typography
// White background, lime as single accent, maximum breathing room.
// Inspired by Dieter Rams / Braun philosophy within Muuday identity.

import { MUUDAY } from './design-system'

const C = MUUDAY.colors
const F = MUUDAY.fonts
const S = MUUDAY.space

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
        backgroundColor: C.white,
        padding: S['2xl'],
        textAlign: 'center',
        position: 'relative',
      }}
    >
      {/* Single lime dot */}
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: C.lime,
          marginBottom: S.lg,
        }}
      />

      <h1
        style={{
          fontFamily: F.sans,
          fontWeight: 800,
          fontSize: 64,
          lineHeight: 1.05,
          color: C.dark,
          margin: 0,
          maxWidth: 900,
          letterSpacing: '-0.03em',
        }}
      >
        {title}
      </h1>

      {subtitle && (
        <p
          style={{
            fontFamily: F.sans,
            fontWeight: 300,
            fontSize: 26,
            color: C.slate,
            marginTop: S.lg,
            maxWidth: 650,
            lineHeight: 1.5,
            letterSpacing: '0.01em',
          }}
        >
          {subtitle}
        </p>
      )}

      <div
        style={{
          position: 'absolute',
          bottom: S['2xl'],
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            backgroundColor: C.lime,
          }}
        />
        <span
          style={{
            fontFamily: F.sans,
            fontWeight: 600,
            fontSize: 14,
            color: C.slate,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}
        >
          @muuday
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
        backgroundColor: C.white,
        padding: S['2xl'],
        position: 'relative',
      }}
    >
      {/* Large thin number */}
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: S.md,
          marginBottom: S.lg,
        }}
      >
        <span
          style={{
            fontFamily: F.sans,
            fontWeight: 200,
            fontSize: 100,
            lineHeight: 1,
            color: C.lime,
            letterSpacing: '-0.04em',
          }}
        >
          {String(number).padStart(2, '0')}
        </span>
        <div style={{ flex: 1, height: 1, backgroundColor: C.slateLighter }} />
      </div>

      <h2
        style={{
          fontFamily: F.sans,
          fontWeight: 700,
          fontSize: 40,
          color: C.dark,
          margin: 0,
          marginBottom: S.md,
          lineHeight: 1.15,
          letterSpacing: '-0.02em',
        }}
      >
        {title}
      </h2>

      <p
        style={{
          fontFamily: F.sans,
          fontWeight: 400,
          fontSize: 26,
          color: C.slate,
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
          marginTop: S.lg,
          paddingTop: S.md,
          borderTop: `1px solid ${C.slateLighter}`,
        }}
      >
        <span
          style={{
            fontFamily: F.sans,
            fontWeight: 600,
            fontSize: 14,
            color: C.slateLighter,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}
        >
          @muuday
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
        backgroundColor: C.dark,
        padding: S['2xl'],
        textAlign: 'center',
        position: 'relative',
      }}
    >
      {/* Single lime dot */}
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: C.lime,
          marginBottom: S.lg,
        }}
      />

      <h2
        style={{
          fontFamily: F.sans,
          fontWeight: 800,
          fontSize: 52,
          color: C.white,
          margin: 0,
          lineHeight: 1.08,
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
          gap: 8,
          marginTop: S.lg,
        }}
      >
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            backgroundColor: C.lime,
          }}
        />
        <span
          style={{
            fontFamily: F.sans,
            fontWeight: 600,
            fontSize: 16,
            color: C.slateLight,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          @muuday
        </span>
      </div>

      {hashtags && hashtags.length > 0 && (
        <p
          style={{
            fontFamily: F.sans,
            fontWeight: 400,
            fontSize: 20,
            color: C.slate,
            marginTop: S.md,
          }}
        >
          {hashtags.slice(0, 5).join('  ')}
        </p>
      )}
    </div>
  )
}
