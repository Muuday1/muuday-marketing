// Muuday Bold — High impact, high contrast
// Thick borders, lime neon feel, geometric shapes.
// For when you need to stop the scroll.

import { MUUDAY, MuudayLogo } from './design-system'

const C = MUUDAY.colors
const F = MUUDAY.fonts
const S = MUUDAY.space

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
        backgroundColor: C.lime,
        padding: S['2xl'],
        position: 'relative',
      }}
    >
      {/* Thick dark border frame */}
      <div
        style={{
          position: 'absolute',
          top: S.md,
          left: S.md,
          right: S.md,
          bottom: S.md,
          border: `4px solid ${C.dark}`,
        }}
      />

      {/* Corner accents */}
      <div
        style={{
          position: 'absolute',
          top: S.md,
          left: S.md,
          width: 40,
          height: 40,
          borderTop: `4px solid ${C.dark}`,
          borderLeft: `4px solid ${C.dark}`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: S.md,
          right: S.md,
          width: 40,
          height: 40,
          borderBottom: `4px solid ${C.dark}`,
          borderRight: `4px solid ${C.dark}`,
        }}
      />

      <div style={{ position: 'relative' }}>
        <MuudayLogo color={C.dark} textColor={C.dark} size={30} />
      </div>

      <div
        style={{
          width: 100,
          height: 8,
          backgroundColor: C.dark,
          marginTop: S.lg,
          marginBottom: S.lg,
          position: 'relative',
        }}
      />

      <h1
        style={{
          fontFamily: F.sans,
          fontWeight: 900,
          fontSize: 60,
          lineHeight: 1.0,
          color: C.dark,
          margin: 0,
          maxWidth: 900,
          textTransform: 'uppercase',
          letterSpacing: '-0.02em',
          position: 'relative',
        }}
      >
        {title}
      </h1>

      {subtitle && (
        <p
          style={{
            fontFamily: F.sans,
            fontWeight: 600,
            fontSize: 24,
            color: C.dark,
            marginTop: S.md,
            maxWidth: 700,
            lineHeight: 1.4,
            opacity: 0.8,
            position: 'relative',
          }}
        >
          {subtitle}
        </p>
      )}

      <div
        style={{
          position: 'absolute',
          bottom: S.lg,
          right: S.lg,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <span
          style={{
            fontFamily: F.sans,
            fontWeight: 900,
            fontSize: 18,
            color: C.dark,
            letterSpacing: '0.05em',
          }}
        >
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
        backgroundColor: C.dark,
        padding: S.xl,
        position: 'relative',
      }}
    >
      {/* Thick lime top bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 8,
          backgroundColor: C.lime,
        }}
      />

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: S.md,
          marginBottom: S.lg,
          marginTop: S.sm,
        }}
      >
        <span
          style={{
            fontFamily: F.sans,
            fontWeight: 900,
            fontSize: 72,
            lineHeight: 1,
            color: C.lime,
          }}
        >
          {number}
        </span>
        <div style={{ width: 50, height: 6, backgroundColor: C.lime }} />
      </div>

      <h2
        style={{
          fontFamily: F.sans,
          fontWeight: 900,
          fontSize: 40,
          color: C.white,
          margin: 0,
          marginBottom: S.sm,
          lineHeight: 1.1,
          textTransform: 'uppercase',
          letterSpacing: '-0.01em',
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
          flex: 1,
        }}
      >
        {description}
      </p>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          marginTop: S.md,
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 4,
            backgroundColor: C.lime,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{ fontFamily: F.sans, fontWeight: 800, fontSize: 14, color: C.dark }}>
            M
          </span>
        </div>
        <span
          style={{
            fontFamily: F.sans,
            fontWeight: 900,
            fontSize: 16,
            color: C.lime,
            letterSpacing: '0.05em',
          }}
        >
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
        backgroundColor: C.lime,
        padding: S.xl,
        textAlign: 'center',
        position: 'relative',
      }}
    >
      {/* Thick border frame */}
      <div
        style={{
          position: 'absolute',
          top: S.md,
          left: S.md,
          right: S.md,
          bottom: S.md,
          border: `4px solid ${C.dark}`,
        }}
      />

      <div style={{ position: 'relative' }}>
        <MuudayLogo color={C.dark} textColor={C.dark} size={32} />
      </div>

      <div
        style={{
          width: 80,
          height: 8,
          backgroundColor: C.dark,
          marginTop: S.lg,
          marginBottom: S.lg,
          position: 'relative',
        }}
      />

      <h2
        style={{
          fontFamily: F.sans,
          fontWeight: 900,
          fontSize: 48,
          color: C.dark,
          margin: 0,
          lineHeight: 1.05,
          maxWidth: 900,
          textTransform: 'uppercase',
          position: 'relative',
        }}
      >
        {cta}
      </h2>

      <div
        style={{
          marginTop: S.lg,
          marginBottom: S.md,
          position: 'relative',
        }}
      >
        <span
          style={{
            fontFamily: F.sans,
            fontWeight: 900,
            fontSize: 22,
            color: C.dark,
            letterSpacing: '0.05em',
          }}
        >
          @muuday
        </span>
      </div>

      {hashtags && hashtags.length > 0 && (
        <p
          style={{
            fontFamily: F.sans,
            fontWeight: 600,
            fontSize: 20,
            color: C.dark,
            opacity: 0.7,
            position: 'relative',
          }}
        >
          {hashtags.slice(0, 5).join('  ')}
        </p>
      )}
    </div>
  )
}
