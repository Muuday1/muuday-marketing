/**
 * Design Tokens — Brasil Global
 * Single source of truth for all design values.
 * Import these instead of hardcoding values anywhere.
 */

export const colors = {
  brand: {
    lime: '#9FE870',
    dark: '#0F172A',
    slate: '#64748B',
    light: '#F8FAFC',
    white: '#FFFFFF',
  },
  accent: {
    orange: '#F97316',
    blue: '#3B82F6',
    purple: '#8B5CF6',
    rose: '#F43F5E',
  },
  semantic: {
    success: '#22C55E',
    warning: '#EAB308',
    error: '#EF4444',
    info: '#3B82F6',
  },
} as const

export const darkModeColors = {
  bg: {
    page: '#0F172A',
    surface: '#1E293B',
    elevated: '#334155',
  },
  text: {
    primary: '#F8FAFC',
    secondary: '#94A3B8',
    muted: '#64748B',
  },
  border: '#334155',
} as const

export const typography = {
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    display: ['DM Serif Display', 'Georgia', 'serif'],
    mono: ['JetBrains Mono', 'monospace'],
  },
  sizes: {
    xs: { size: '12px', lineHeight: '16px' },
    sm: { size: '14px', lineHeight: '20px' },
    base: { size: '16px', lineHeight: '24px' },
    lg: { size: '18px', lineHeight: '28px' },
    xl: { size: '20px', lineHeight: '30px' },
    '2xl': { size: '24px', lineHeight: '32px' },
    '3xl': { size: '30px', lineHeight: '36px' },
    '4xl': { size: '36px', lineHeight: '40px' },
    '5xl': { size: '48px', lineHeight: '52px' },
    '6xl': { size: '60px', lineHeight: '64px' },
  },
} as const

export const spacing = {
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
  20: '80px',
} as const

export const radius = {
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  '2xl': '24px',
  full: '9999px',
} as const

export const shadows = {
  sm: '0 1px 2px rgba(0,0,0,0.05)',
  md: '0 4px 6px rgba(0,0,0,0.07)',
  lg: '0 10px 15px rgba(0,0,0,0.1)',
  xl: '0 20px 25px rgba(0,0,0,0.1)',
} as const

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const
