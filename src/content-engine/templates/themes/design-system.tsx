// Muuday Design System — Official brand tokens
// All carousel themes must use ONLY these tokens.
//
// Brand Colors:
//   Lime    #9FE870  (primary accent, hero color)
//   Dark    #0F172A  (backgrounds, headings)
//   Slate   #64748B  (secondary text, borders)
//   Light   #F8FAFC  (page background)
//   White   #FFFFFF  (card backgrounds)
//
// Accent Colors (used sparingly):
//   Orange  #F97316
//   Blue    #3B82F6
//   Purple  #8B5CF6
//   Rose    #F43F5E
//
// Typography:
//   Sans:    'Inter', system-ui, sans-serif
//   Display: 'DM Serif Display', Georgia, serif
//   Mono:    'JetBrains Mono', monospace

export const MUUDAY = {
  colors: {
    lime: '#9FE870',
    limeLight: '#B8F09A',
    limeDark: '#7BC44A',
    dark: '#0F172A',
    darkLight: '#1E293B',
    darkLighter: '#334155',
    slate: '#64748B',
    slateLight: '#94A3B8',
    slateLighter: '#CBD5E1',
    light: '#F8FAFC',
    white: '#FFFFFF',
    orange: '#F97316',
    blue: '#3B82F6',
    purple: '#8B5CF6',
    rose: '#F43F5E',
  },
  fonts: {
    sans: "'Inter', system-ui, sans-serif",
    display: "'DM Serif Display', Georgia, serif",
    mono: "'JetBrains Mono', monospace",
  },
  space: {
    xs: 8,
    sm: 16,
    md: 24,
    lg: 40,
    xl: 60,
    '2xl': 80,
  },
  radius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    '2xl': 24,
    full: 9999,
  },
} as const

// ─── Shared Components ───

export function MuudayBadge({ text, bg, color }: { text: string; bg: string; color: string }) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '8px 16px',
        borderRadius: MUUDAY.radius.full,
        backgroundColor: bg,
      }}
    >
      <span
        style={{
          fontFamily: MUUDAY.fonts.sans,
          fontWeight: 600,
          fontSize: 16,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color,
        }}
      >
        {text}
      </span>
    </div>
  )
}

export function MuudayDivider({
  color,
  width = 60,
  height = 4,
}: {
  color: string
  width?: number
  height?: number
}) {
  return (
    <div
      style={{
        width,
        height,
        backgroundColor: color,
        borderRadius: height / 2,
      }}
    />
  )
}

export function MuudayLogo({
  color = MUUDAY.colors.lime,
  textColor = MUUDAY.colors.dark,
  size = 36,
}: {
  color?: string
  textColor?: string
  size?: number
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div
        style={{
          width: size,
          height: size,
          borderRadius: size * 0.25,
          backgroundColor: color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            fontFamily: MUUDAY.fonts.sans,
            fontWeight: 800,
            fontSize: size * 0.5,
            color: textColor,
          }}
        >
          M
        </span>
      </div>
      <span
        style={{
          fontFamily: MUUDAY.fonts.sans,
          fontWeight: 700,
          fontSize: size * 0.5,
          color: textColor,
          letterSpacing: '0.02em',
        }}
      >
        muuday
      </span>
    </div>
  )
}

export function MuudayNumberPill({
  number,
  bg,
  color,
}: {
  number: number
  bg: string
  color: string
}) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '6px 16px',
        borderRadius: MUUDAY.radius.md,
        backgroundColor: bg,
      }}
    >
      <span
        style={{
          fontFamily: MUUDAY.fonts.mono,
          fontWeight: 700,
          fontSize: 16,
          letterSpacing: '0.05em',
          color,
        }}
      >
        {String(number).padStart(2, '0')}
      </span>
    </div>
  )
}

// ─── Legacy exports for backward compatibility ───
// Themes warm/craft/calm still reference these.

export const PALETTES = {
  warm: {
    name: 'Warm',
    bg: MUUDAY.colors.light,
    bgDark: MUUDAY.colors.dark,
    primary: MUUDAY.colors.lime,
    primaryMuted: MUUDAY.colors.limeLight,
    secondary: MUUDAY.colors.blue,
    accent: MUUDAY.colors.orange,
    text: MUUDAY.colors.dark,
    textMuted: MUUDAY.colors.slate,
    textLight: MUUDAY.colors.white,
    border: MUUDAY.colors.slateLighter,
    gradient: [MUUDAY.colors.lime, MUUDAY.colors.limeDark],
  },
  craft: {
    name: 'Craft',
    bg: MUUDAY.colors.light,
    bgDark: MUUDAY.colors.dark,
    primary: MUUDAY.colors.lime,
    primaryMuted: MUUDAY.colors.limeLight,
    secondary: MUUDAY.colors.blue,
    accent: MUUDAY.colors.orange,
    text: MUUDAY.colors.dark,
    textMuted: MUUDAY.colors.slate,
    textLight: MUUDAY.colors.white,
    border: MUUDAY.colors.slateLighter,
    gradient: [MUUDAY.colors.lime, MUUDAY.colors.orange],
  },
  calm: {
    name: 'Calm',
    bg: MUUDAY.colors.light,
    bgDark: MUUDAY.colors.dark,
    primary: MUUDAY.colors.blue,
    primaryMuted: MUUDAY.colors.blue,
    secondary: MUUDAY.colors.purple,
    accent: MUUDAY.colors.orange,
    text: MUUDAY.colors.dark,
    textMuted: MUUDAY.colors.slate,
    textLight: MUUDAY.colors.white,
    border: MUUDAY.colors.slateLighter,
    gradient: [MUUDAY.colors.blue, MUUDAY.colors.purple],
  },
  dark: {
    name: 'Dark',
    bg: MUUDAY.colors.dark,
    bgDark: MUUDAY.colors.dark,
    primary: MUUDAY.colors.lime,
    primaryMuted: MUUDAY.colors.limeLight,
    secondary: MUUDAY.colors.blue,
    accent: MUUDAY.colors.rose,
    text: MUUDAY.colors.white,
    textMuted: MUUDAY.colors.slateLight,
    textLight: MUUDAY.colors.white,
    border: MUUDAY.colors.darkLighter,
    gradient: [MUUDAY.colors.lime, MUUDAY.colors.blue],
  },
  editorial: {
    name: 'Editorial',
    bg: MUUDAY.colors.light,
    bgDark: MUUDAY.colors.dark,
    primary: MUUDAY.colors.rose,
    primaryMuted: MUUDAY.colors.rose,
    secondary: MUUDAY.colors.lime,
    accent: MUUDAY.colors.lime,
    text: MUUDAY.colors.dark,
    textMuted: MUUDAY.colors.slate,
    textLight: MUUDAY.colors.white,
    border: MUUDAY.colors.slateLighter,
    gradient: [MUUDAY.colors.rose, MUUDAY.colors.lime],
  },
}

export const FONTS = {
  ...MUUDAY.fonts,
  serif: MUUDAY.fonts.display, // legacy alias
}
export const SPACE = MUUDAY.space

export function BrandMark({ color, size = 32 }: { color: string; size?: number }) {
  return MuudayLogo({
    color,
    textColor: color === MUUDAY.colors.lime ? MUUDAY.colors.dark : MUUDAY.colors.white,
    size,
  })
}

export function Badge({ text, bg, color }: { text: string; bg: string; color: string }) {
  return MuudayBadge({ text, bg, color })
}

export function Divider({
  color,
  width = 60,
  height = 4,
}: {
  color: string
  width?: number
  height?: number
}) {
  return MuudayDivider({ color, width, height })
}

export function NumberCircle({
  number,
  bg,
  color,
  size = 80,
}: {
  number: number
  bg: string
  color: string
  size?: number
}) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <span
        style={{
          fontFamily: MUUDAY.fonts.sans,
          fontWeight: 800,
          fontSize: size * 0.45,
          color,
        }}
      >
        {number}
      </span>
    </div>
  )
}

export function NumberLarge({ number, color }: { number: number; color: string }) {
  return (
    <span
      style={{
        fontFamily: MUUDAY.fonts.sans,
        fontWeight: 200,
        fontSize: 120,
        lineHeight: 1,
        color,
        letterSpacing: '-0.04em',
      }}
    >
      {String(number).padStart(2, '0')}
    </span>
  )
}
