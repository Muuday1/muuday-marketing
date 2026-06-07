// Muuday Editorial — Magazine sophistication
// Uses DM Serif Display for headlines, Muuday dark + lime.
// Red accent line (inspired by Monocle but with Muuday red/rose).

import { MUUDAY } from './design-system'

const C = MUUDAY.colors
const F = MUUDAY.fonts
const S = MUUDAY.space

export function EditorialCover({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: C.light,
        padding: 0,
        position: 'relative',
      }}
    >
      {/* Top rose band */}
      <div style={{ height: 10, backgroundColor: C.rose }} />

      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: S['2xl'],
          paddingTop: S.xl,
        }}
      >
        {/* Masthead */}
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            marginBottom: S.lg,
            borderBottom: `2px solid ${C.dark}`,
            paddingBottom: S.sm,
          }}
        >
          <span
            style={{
              fontFamily: F.display,
              fontWeight: 700,
              fontSize: 30,
              color: C.dark,
              letterSpacing: '-0.02em',
            }}
          >
            Muuday
          </span>
          <span
            style={{
              fontFamily: F.sans,
              fontWeight: 500,
              fontSize: 14,
              color: C.slate,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}
          >
            Brasileiros no Exterior
          </span>
        </div>

        <h1
          style={{
            fontFamily: F.display,
            fontWeight: 700,
            fontSize: 52,
            lineHeight: 1.1,
            color: C.dark,
            margin: 0,
            maxWidth: 900,
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
              color: C.slate,
              marginTop: S.md,
              maxWidth: 700,
              lineHeight: 1.5,
              fontStyle: 'italic',
            }}
          >
            {subtitle}
          </p>
        )}

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: S.sm,
            marginTop: 'auto',
            paddingTop: S.lg,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              backgroundColor: C.lime,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                fontFamily: F.sans,
                fontWeight: 800,
                fontSize: 14,
                color: C.dark,
              }}
            >
              M
            </span>
          </div>
          <span
            style={{
              fontFamily: F.sans,
              fontWeight: 600,
              fontSize: 16,
              color: C.slate,
            }}
          >
            @muuday
          </span>
          <div style={{ flex: 1 }} />
          <span
            style={{
              fontFamily: F.mono,
              fontWeight: 500,
              fontSize: 13,
              color: C.slate,
              letterSpacing: '0.05em',
            }}
          >
            Nº {new Date().getMonth() + 1} / {new Date().getFullYear()}
          </span>
        </div>
      </div>

      {/* Bottom lime line */}
      <div style={{ height: 6, backgroundColor: C.lime }} />
    </div>
  )
}

export function EditorialTip({
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
        padding: 0,
        position: 'relative',
      }}
    >
      {/* Top rose band */}
      <div style={{ height: 6, backgroundColor: C.rose }} />

      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: S.xl,
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            marginBottom: S.lg,
            borderBottom: `1px solid ${C.slateLighter}`,
            paddingBottom: S.sm,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
            <span
              style={{
                fontFamily: F.display,
                fontWeight: 700,
                fontSize: 48,
                lineHeight: 1,
                color: C.rose,
              }}
            >
              {number}
            </span>
            <span
              style={{
                fontFamily: F.sans,
                fontWeight: 600,
                fontSize: 13,
                color: C.slate,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              de 5
            </span>
          </div>
          <span
            style={{
              fontFamily: F.sans,
              fontWeight: 600,
              fontSize: 14,
              color: C.slate,
            }}
          >
            @muuday
          </span>
        </div>

        <h2
          style={{
            fontFamily: F.display,
            fontWeight: 700,
            fontSize: 38,
            color: C.dark,
            margin: 0,
            marginBottom: S.md,
            lineHeight: 1.15,
          }}
        >
          {title}
        </h2>

        <div style={{ width: 50, height: 3, backgroundColor: C.lime, marginBottom: S.md }} />

        <p
          style={{
            fontFamily: F.sans,
            fontWeight: 400,
            fontSize: 24,
            color: C.slate,
            lineHeight: 1.6,
            margin: 0,
            flex: 1,
          }}
        >
          {description}
        </p>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: S.md,
            paddingTop: S.sm,
            borderTop: `1px solid ${C.slateLighter}`,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                backgroundColor: C.lime,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span
                style={{
                  fontFamily: F.sans,
                  fontWeight: 800,
                  fontSize: 12,
                  color: C.dark,
                }}
              >
                M
              </span>
            </div>
            <span
              style={{
                fontFamily: F.sans,
                fontWeight: 600,
                fontSize: 14,
                color: C.slate,
              }}
            >
              Muuday
            </span>
          </div>
          <span
            style={{
              fontFamily: F.mono,
              fontWeight: 500,
              fontSize: 12,
              color: C.slate,
            }}
          >
            {String(number).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Bottom lime line */}
      <div style={{ height: 4, backgroundColor: C.lime }} />
    </div>
  )
}

export function EditorialCTA({ cta, hashtags }: { cta: string; hashtags?: string[] }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: C.dark,
        padding: 0,
        position: 'relative',
      }}
    >
      {/* Top rose band */}
      <div style={{ height: 8, backgroundColor: C.rose }} />

      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: S.xl,
          textAlign: 'center',
        }}
      >
        {/* Masthead */}
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: 10,
            marginBottom: S.lg,
          }}
        >
          <span
            style={{
              fontFamily: F.display,
              fontWeight: 700,
              fontSize: 26,
              color: C.white,
            }}
          >
            Muuday
          </span>
          <div
            style={{
              width: 4,
              height: 4,
              borderRadius: '50%',
              backgroundColor: C.lime,
            }}
          />
          <span
            style={{
              fontFamily: F.sans,
              fontWeight: 500,
              fontSize: 14,
              color: C.slateLight,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}
          >
            Editorial
          </span>
        </div>

        <h2
          style={{
            fontFamily: F.display,
            fontWeight: 700,
            fontSize: 44,
            color: C.white,
            margin: 0,
            lineHeight: 1.15,
            maxWidth: 900,
          }}
        >
          {cta}
        </h2>

        <div
          style={{
            width: 60,
            height: 3,
            backgroundColor: C.lime,
            marginTop: S.lg,
          }}
        />

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
              width: 32,
              height: 32,
              borderRadius: '50%',
              backgroundColor: C.lime,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                fontFamily: F.sans,
                fontWeight: 800,
                fontSize: 14,
                color: C.dark,
              }}
            >
              M
            </span>
          </div>
          <span
            style={{
              fontFamily: F.sans,
              fontWeight: 600,
              fontSize: 18,
              color: C.slateLight,
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
              fontSize: 18,
              color: C.slateLight,
              marginTop: S.md,
            }}
          >
            {hashtags.slice(0, 5).join('  ')}
          </p>
        )}
      </div>

      {/* Bottom lime line */}
      <div style={{ height: 6, backgroundColor: C.lime }} />
    </div>
  )
}
