export const CAROUSEL_THEMES = [
  { id: 'classic' as const, label: 'Classic', description: 'Gradiente escuro com verde limão' },
  { id: 'minimal' as const, label: 'Minimal', description: 'Branco clean, tipografia elegante' },
  { id: 'bold' as const, label: 'Bold', description: 'Verde vibrante, tipografia impactante' },
]

export type CarouselTheme = (typeof CAROUSEL_THEMES)[number]['id']
