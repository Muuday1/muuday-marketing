# Architecture — Muuday

## System Overview

```
                    ┌─────────────────┐
                    │   Next.js App   │
                    │   (Vercel)      │
                    └────────┬────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
        ▼                    ▼                    ▼
┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│  Content     │   │  Meta Ads    │   │  Analytics   │
│  Engine      │   │  Monitor     │   │  Dashboard   │
└──────┬───────┘   └──────┬───────┘   └──────┬───────┘
       │                  │                  │
       ▼                  ▼                  ▼
┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│  OpenAI      │   │  Meta API    │   │  Mixpanel    │
│  Replicate   │   │              │   │
│  ElevenLabs  │   │              │   │  GA4         │
└──────────────┘   └──────────────┘   └──────────────┘
       │
       ▼
┌──────────────┐
│  Supabase    │
│  Sanity      │
│  Upstash     │
└──────────────┘
```

## Module Architecture

### Content Engine

```
src/content-engine/
├── generators/
│   ├── copy-generator.ts       # GPT-4 for captions, scripts
│   ├── image-generator.ts      # DALL-E / Stable Diffusion
│   ├── video-generator.ts      # Replicate API
│   └── podcast-generator.ts    # ElevenLabs + script
├── templates/
│   ├── instagram-carousel.tsx  # Carousel template
│   ├── instagram-reel.tsx      # Reel template
│   ├── blog-article.mdx        # Blog template
│   └── podcast-script.md       # Podcast template
├── schedulers/
│   ├── content-calendar.ts     # Schedule management
│   └── auto-publisher.ts       # Auto-publish approved content
└── validators/
    ├── brand-voice-check.ts    # Quality gate
    └── cultural-check.ts       # Cultural accuracy
```

### Meta Ads Monitor

```
src/meta-ads/
├── client/
│   ├── auth.ts                 # OAuth flow
│   ├── campaigns.ts            # Campaign CRUD
│   └── insights.ts             # Metrics fetch
├── campaigns/
│   ├── create-campaign.ts      # Campaign creation
│   └── optimize-campaign.ts    # Auto-optimization
├── reports/
│   ├── daily-report.ts         # Daily summary
│   └── weekly-report.ts        # Weekly analysis
└── alerts/
    ├── spend-alert.ts          # Budget alerts
    ├── ctr-alert.ts            # Performance alerts
    └── anomaly-detection.ts    # Unusual patterns
```

### Analytics Dashboard

```
src/analytics/
├── dashboard/
│   ├── overview.tsx            # Main dashboard
│   ├── organic-metrics.tsx     # Social organic
│   └── paid-metrics.tsx        # Paid ads
├── metrics/
│   ├── engagement-rate.ts      # Calculate engagement
│   ├── roas.ts                 # Return on ad spend
│   └── cac.ts                  # Customer acquisition
└── exports/
    ├── pdf-report.ts           # PDF generation
    └── csv-export.ts           # CSV data export
```

### Podcast Pipeline

```
src/podcast/
├── script/
│   ├── topic-selector.ts       # Select weekly topic
│   ├── script-writer.ts        # AI script generation
│   └── script-editor.ts        # Human review workflow
├── voice/
│   ├── voice-synth.ts          # ElevenLabs synthesis
│   └── voice-selector.ts       # Voice profile selection
├── editor/
│   ├── audio-mixer.ts          # Mix intro, voice, outro
│   └── metadata-tag.ts         # ID3 tags, cover art
└── distribution/
    ├── spotify-upload.ts       # Spotify for Podcasters
    ├── apple-upload.ts         # Apple Podcasts Connect
    └── rss-feed.ts             # RSS feed generation
```

## Data Flow

### Content Creation Flow

```
1. Topic Selection (AI + human input)
   → Stored in Supabase

2. Content Generation (AI)
   → OpenAI: copy/script
   → DALL-E/Replicate: visuals
   → ElevenLabs: audio (podcast)
   → Stored in Sanity (CMS)

3. Human Review
   → Dashboard approval workflow
   → Brand voice score check
   → Cultural accuracy check

4. Scheduling
   → Content Calendar (Supabase)
   → Make.com webhook trigger
   → Or manual publish

5. Publishing
   → Meta Graph API (Instagram)
   → Spotify/Apple (Podcast)
   → Newsletter (SendGrid/Resend)
   → Blog (Next.js SSR)

6. Analytics
   → Meta Insights API
   → Spotify Analytics
   → Mixpanel events
   → Stored in Supabase
```

## API Integration Patterns

### External API Client

```typescript
// src/lib/api/external-client.ts
export async function fetchWithRetry<T>(
  url: string,
  options: RequestInit,
  config: { retries: number; backoff: number }
): Promise<T> {
  // Retry with exponential backoff
  // Circuit breaker pattern
  // Rate limiting
}
```

### Webhook Handler

```typescript
// src/app/api/webhooks/[provider]/route.ts
export async function POST(request: Request) {
  // Verify signature
  // Parse payload
  // Store event
  // Trigger async processing
}
```

### Background Job

```typescript
// src/lib/jobs/content-generation.ts
export async function generateContentJob(topicId: string) {
  // Fetch topic from DB
  // Generate content with AI
  // Store results
  // Notify reviewer
}
```

## Security

### API Keys

- Stored in `.env.local` (never committed)
- Vercel environment variables for production
- Rotated every 90 days

### Authentication

- Supabase Auth for admin dashboard
- Meta OAuth for ad account access
- API key validation for webhooks

### Rate Limiting

- Upstash Redis for API rate limits
- Per-provider limits enforced
- Queue system for batch operations

### Data Privacy

- No PII in logs
- Encrypted at rest (Supabase)
- GDPR-compliant data retention
