// Muuday Lime — Default brand theme
// Clean, modern, lime-forward. The "official" Muuday look.
// Cover: Dark bg with lime gradient accent
// Tip: Light bg, lime number pill, clean typography
// CTA: Lime bg, dark text, bold and inviting

import { MUUDAY, MuudayDivider, MuudayLogo, MuudayNumberPill } from './design-system'

const C = MUUDAY.colors
const F = MUUDAY.fonts
const S = MUUDAY.space

export function LimeCover({ title, subtitle }: { title: string; subtitle?: string }) {
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
      {/* Subtle lime glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${C.lime}18 0%, transparent 60%)`,
        }}
      />

      {/* Top lime line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 6,
          background: `linear-gradient(90deg, ${C.lime} 0%, ${C.limeDark} 100%)`,
        }}
      />

      <MuudayLogo color={C.lime} textColor={C.lime} size={32} />

      <MuudayDivider color={C.lime} width={80} height={4} />

      <h1
        style={{
          fontFamily: F.sans,
          fontWeight: 800,
          fontSize: 56,
          lineHeight: 1.1,
          color: C.white,
          margin: 0,
          marginTop: S.lg,
          maxWidth: 900,
          letterSpacing: '-0.02em',
        }}
      >
        {title}
      </h1>

      {subtitle && (
        <p
          style={{
            fontFamily: F.sans,
            fontWeight: 400,
            fontSize: 26,
            color: C.slateLight,
            marginTop: S.md,
            maxWidth: 700,
            lineHeight: 1.4,
          }}
        >
          {subtitle}
        </p>
      )}

      <div
        style={{
          position: 'absolute',
          bottom: S.lg,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: C.lime,
          }}
        />
        <span
          style={{
            fontFamily: F.mono,
            fontWeight: 500,
            fontSize: 14,
            color: C.slate,
            letterSpacing: '0.1em',
          }}
        >
          @muuday
        </span>
      </div>
    </div>
  )
}

export function LimeTip({
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
        backgroundColor: C.light,
        padding: S.xl,
        position: 'relative',
      }}
    >
      {/* Left lime accent bar */}
      <div
        style={{
          position: 'absolute',
          top: S.xl,
          left: 0,
          width: 6,
          height: 120,
          backgroundColor: C.lime,
          borderRadius: '0 4px 4px 0',
        }}
      />

      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: S.md,
          paddingLeft: S.md,
        }}
      >
        <MuudayNumberPill number={number} bg={C.lime} color={C.dark} />
        <span
          style={{
            fontFamily: F.mono,
            fontWeight: 500,
            fontSize: 13,
            color: C.slate,
            letterSpacing: '0.08em',
          }}
        >
          @muuday
        </span>
      </div>

      <h2
        style={{
          fontFamily: F.sans,
          fontWeight: 800,
          fontSize: 42,
          color: C.dark,
          margin: 0,
          marginTop: S.sm,
          lineHeight: 1.12,
          letterSpacing: '-0.02em',
          paddingLeft: S.md,
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
          lineHeight: 1.5,
          margin: 0,
          marginTop: S.sm,
          flex: 1,
          paddingLeft: S.md,
        }}
      >
        {description}
      </p>

      {/* Bottom dots */}
      <div
        style={{
          display: 'flex',
          gap: 6,
          marginTop: S.md,
          paddingLeft: S.md,
        }}
      >
        {[C.lime, C.slateLighter, C.slateLighter].map((c, i) => (
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

export function LimeCTA({ cta, hashtags }: { cta: string; hashtags?: string[] }) {
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
      {/* Dark top line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 6,
          backgroundColor: C.dark,
        }}
      />

      <MuudayLogo color={C.dark} textColor={C.dark} size={36} />

      <h2
        style={{
          fontFamily: F.sans,
          fontWeight: 800,
          fontSize: 48,
          color: C.dark,
          margin: 0,
          marginTop: S.lg,
          lineHeight: 1.1,
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
          marginTop: S.lg,
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: MUUDAY.radius.md,
            backgroundColor: C.dark,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{ fontFamily: F.sans, fontWeight: 800, fontSize: 16, color: C.lime }}>
            M
          </span>
        </div>
        <span
          style={{
            fontFamily: F.sans,
            fontWeight: 700,
            fontSize: 20,
            color: C.dark,
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
            color: `${C.dark}99`,
            marginTop: S.md,
          }}
        >
          {hashtags.slice(0, 5).join('  ')}
        </p>
      )}
    </div>
  )
}
