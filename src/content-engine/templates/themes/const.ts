export const CAROUSEL_THEMES = [
  // Brand-aligned themes (default)
  {
    id: 'lime' as const,
    label: 'Lime',
    description: 'Muuday oficial: lime vibrante, dark bg, clean',
  },
  { id: 'dark' as const, label: 'Dark', description: 'Muuday dark: grid tech, glow lime, premium' },
  {
    id: 'editorial' as const,
    label: 'Editorial',
    description: 'Muuday magazine: serif, rose accent, elegante',
  },
  {
    id: 'minimal' as const,
    label: 'Minimal',
    description: 'Muuday minimal: whitespace, tipografia fina',
  },
  {
    id: 'bold' as const,
    label: 'Bold',
    description: 'Muuday bold: alto contraste, bordas grossas',
  },
  // Legacy themes (kept for backward compatibility)
  {
    id: 'classic' as const,
    label: 'Classic',
    description: 'Gradiente escuro com verde limão (legado)',
  },
  { id: 'warm' as const, label: 'Warm', description: 'Airbnb-inspired (legado)' },
  { id: 'craft' as const, label: 'Craft', description: 'Etsy-inspired (legado)' },
  { id: 'calm' as const, label: 'Calm', description: 'Preply-inspired (legado)' },
]

export type CarouselTheme = (typeof CAROUSEL_THEMES)[number]['id']
