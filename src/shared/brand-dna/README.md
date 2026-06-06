# Brand DNA

> The single source of truth for brand consistency. Every piece of content must pass through here.

## What It Does

1. **Validates** that generated content matches brand rules
2. **Injects** brand parameters into prompts (colors, fonts, tone)
3. **Scores** content against the brand rubric (0-10)
4. **Rejects** content that scores below 8/10

## Brand Rules

### Colors
- Primary: `#9FE870` (lime green)
- Dark: `#0F172A` (slate)
- Light: `#F8FAFC` (background)
- Warm accent: `#F97316`
- Cool accent: `#3B82F6`

### Typography
- Headings: `Geist` (or `Inter` fallback)
- Body: `Inter`
- Sizes: Hero 48px, H2 32px, Body 16px, Caption 14px

### Photography Style
- Natural lighting, golden hour preferred
- Shallow depth of field
- Real people, real situations
- Warm, inviting atmosphere
- Never stock-photo generic

### Tone
- Warm, empathetic, informed
- Brazilian Portuguese (not European)
- Active voice
- One idea per sentence
- Never "imigrante" — use "brasileiro no exterior"
- Never minimize the struggle

## Usage

```typescript
import { brandDNA } from '@/shared/brand-dna'

// Validate copy
const score = brandDNA.scoreCopy({
  headline: '...',
  body: '...',
  cta: '...',
})
// score.passed must be true to publish

// Enhance prompt for image generation
const enhancedPrompt = brandDNA.enhanceImagePrompt(
  'Brazilian woman walking in London'
)
// Adds: "Brand colors: lime green #9FE870 on dark slate #0F172A..."

// Get design tokens for template
const tokens = brandDNA.getDesignTokens()
// { primaryColor: '#9FE870', fontFamily: 'Geist', ... }
```
