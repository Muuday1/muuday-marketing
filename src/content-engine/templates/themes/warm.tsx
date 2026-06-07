// Airbnb-inspired: warm, inviting, lifestyle photography feel
// Uses gradient overlays, rounded corners, generous whitespace

import { PALETTES, FONTS, SPACE, Divider } from './design-system'

const P = PALETTES.warm

export function WarmCover({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(160deg, #FF5A5F 0%, #FC642D 40%, #FFB400 100%)`,
        padding: SPACE.xl,
        textAlign: 'center',
        position: 'relative',
      }}
    >
      {/* Decorative circles */}
      <div
        style={{
          position: 'absolute',
          top: -60,
          right: -60,
          width: 240,
          height: 240,
          borderRadius: '50%',
          backgroundColor: 'rgba(255,255,255,0.1)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 40,
          left: -40,
          width: 160,
          height: 160,
          borderRadius: '50%',
          backgroundColor: 'rgba(255,255,255,0.08)',
        }}
      />

      <div
        style={{
          backgroundColor: 'rgba(255,255,255,0.15)',
          backdropFilter: 'blur(10px)',
          borderRadius: 100,
          padding: '10px 24px',
          marginBottom: SPACE.lg,
        }}
      >
        <span
          style={{
            fontFamily: FONTS.sans,
            fontWeight: 600,
            fontSize: 18,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'white',
          }}
        >
          Muuday
        </span>
      </div>

      <h1
        style={{
          fontFamily: FONTS.sans,
          fontWeight: 800,
          fontSize: 64,
          lineHeight: 1.1,
          color: 'white',
          margin: 0,
          maxWidth: 880,
          textShadow: '0 2px 20px rgba(0,0,0,0.15)',
        }}
      >
        {title}
      </h1>

      {subtitle && (
        <p
          style={{
            fontFamily: FONTS.sans,
            fontWeight: 400,
            fontSize: 28,
            color: 'rgba(255,255,255,0.9)',
            marginTop: SPACE.md,
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
          bottom: SPACE.lg,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            backgroundColor: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{ fontFamily: FONTS.sans, fontWeight: 800, fontSize: 18, color: P.primary }}>
            M
          </span>
        </div>
        <span
          style={{
            fontFamily: FONTS.sans,
            fontWeight: 600,
            fontSize: 20,
            color: 'white',
          }}
        >
          @muuday
        </span>
      </div>
    </div>
  )
}

export function WarmTip({
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
        backgroundColor: P.bg,
        position: 'relative',
      }}
    >
      {/* Left accent bar */}
      <div
        style={{
          width: 12,
          height: '100%',
          background: `linear-gradient(180deg, ${P.primary} 0%, ${P.accent} 100%)`,
        }}
      />

      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: SPACE.xl,
          paddingLeft: SPACE.lg,
        }}
      >
        {/* Header row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            marginBottom: SPACE.md,
          }}
        >
          <div
            style={{
              backgroundColor: P.primary,
              color: 'white',
              fontFamily: FONTS.sans,
              fontWeight: 800,
              fontSize: 16,
              padding: '6px 14px',
              borderRadius: 8,
              letterSpacing: '0.05em',
            }}
          >
            DICA {String(number).padStart(2, '0')}
          </div>
          <span
            style={{
              fontFamily: FONTS.sans,
              fontWeight: 700,
              fontSize: 14,
              color: P.textMuted,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            @muuday
          </span>
        </div>

        <Divider color={P.border} width={80} height={3} />

        <h2
          style={{
            fontFamily: FONTS.sans,
            fontWeight: 800,
            fontSize: 44,
            color: P.text,
            margin: 0,
            marginTop: SPACE.md,
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
            marginTop: SPACE.sm,
            flex: 1,
          }}
        >
          {description}
        </p>

        {/* Bottom decorative dots */}
        <div style={{ display: 'flex', gap: 8, marginTop: SPACE.md }}>
          {[P.primary, P.accent, P.secondary].map((c, i) => (
            <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: c }} />
          ))}
        </div>
      </div>
    </div>
  )
}

export function WarmCTA({ cta, hashtags }: { cta: string; hashtags?: string[] }) {
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
      {/* Decorative ring */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500,
          height: 500,
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.06)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 350,
          height: 350,
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.04)',
        }}
      />

      <div
        style={{
          backgroundColor: P.primary,
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
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'white',
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
          color: 'white',
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
            borderRadius: '50%',
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
            color: 'rgba(255,255,255,0.7)',
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
            color: 'rgba(255,255,255,0.4)',
            marginTop: SPACE.md,
          }}
        >
          {hashtags.slice(0, 5).join('  ')}
        </p>
      )}
    </div>
  )
}
