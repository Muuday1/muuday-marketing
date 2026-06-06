# Brand Templates

> Programmatic content composition. AI generates backgrounds. Code places text, logos, and layouts.

## Why Not AI-Generated Text on Images?

- AI cannot reliably render Portuguese text
- Colors drift between generations
- Fonts are never exact
- Logo placement is random
- Consistency is impossible

## Solution

1. AI generates **background image** (no text)
2. Template composes **text + logo + layout** with exact brand specs
3. Export as PNG for Instagram, PDF for LinkedIn

## Templates

| Template | Platform | Slides | Size |
|----------|----------|--------|------|
| Carousel Hero | Instagram | 5-10 | 1080x1350 |
| Carousel Education | Instagram | 5-10 | 1080x1350 |
| LinkedIn Document | LinkedIn | 5-10 | 1920x1080 |
| Reel Cover | Instagram | 1 | 1080x1920 |
| Story Series | Instagram | 3-5 | 1080x1920 |
| Thumbnail | YouTube | 1 | 1280x720 |

## Tools

- **Satori** — React → SVG → PNG (fast, serverless)
- **Puppeteer + html-to-image** — HTML → PNG (full CSS)
- **Sharp** — Image manipulation (resize, composite)

## Usage

```typescript
import { carouselBuilder } from '@/canvas/brand-templates'

const carousel = await carouselBuilder.create({
  template: 'carousel-hero',
  slides: [
    { type: 'cover', title: '5 erros no UK', subtitle: 'Que todo brasileiro comete' },
    { type: 'content', number: 1, title: 'Erro #1', body: '...' },
    // ...
  ],
  backgroundImage: '/assets/generated/bg-1.png',
  brandTokens: brandDNA.getDesignTokens(),
})

// Returns: ['/output/carousel-1.png', '/output/carousel-2.png', ...]
```
