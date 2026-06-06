# 🇧🇷 Social Media Machine

> **A world-class AI-powered content engine and community platform for Brazilians living abroad.**

## What We're Building

Not another social media tool. A **content machine** that operates at the quality level of a top-tier creative agency — powered by AI, guided by human strategy, built for the Brazilian diaspora.

### Products
1. **Content Engine** — Generate Instagram posts, carousels, Reels, stories with AI
2. **Meta Ads Monitor** — Track ad performance, auto-alerts, budget optimization
3. **Analytics Dashboard** — Unified view of organic + paid performance
4. **Podcast Generator** — AI-generated podcast episodes (voice + script)
5. **Community Platform** — Content hub for Brazilians abroad (articles, guides, forums)

### Target Audience
- Brazilians living in UK, USA, Portugal, Ireland, Australia, Canada
- Ages 25-45
- Interested in: immigration, careers, finance, culture, community

## Quick Start

```bash
# 1. Clone and install
git clone <repo>
cd social-media-machine
npm install

# 2. Configure environment
cp .env.example .env.local
# Fill in your API keys (see Environment Variables below)

# 3. Run development
npm run dev

# 4. Run Storybook
npm run storybook

# 5. Run tests
npm run test

# 6. Run type check
npm run typecheck
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server (localhost:3000) |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript compiler (no emit) |
| `npm run test` | Run Vitest test suite |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run storybook` | Start Storybook (localhost:6006) |
| `npm run storybook:build` | Build Storybook for deployment |
| `npm run content:generate` | Generate content batch via CLI |
| `npm run podcast:generate` | Generate podcast episode via CLI |
| `npm run meta:sync` | Sync Meta Ads data via CLI |

## Project Structure

```
social-media-machine/
├── AGENTS.md                 # Agent rules and conventions
├── README.md                 # This file
├── docs/                     # All documentation
│   ├── strategy/             # Content, community, marketing strategy
│   ├── design/               # Design tokens, palette, typography
│   ├── tech/                 # Architecture, API docs
│   └── operations/           # Workflows, changelog
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── (pages)/          # Public pages
│   │   ├── dashboard/        # Admin dashboard
│   │   ├── api/              # API routes & webhooks
│   │   └── middleware.ts     # Auth & rate limiting
│   ├── components/           # React components
│   │   ├── ui/               # Base UI (Button, Card, Badge)
│   │   ├── layout/           # Header, Footer
│   │   └── sections/         # Landing page sections
│   ├── content-engine/       # AI content generation
│   │   ├── generators/       # Copy, image, video generators
│   │   └── validators/       # Brand voice, quality checks
│   ├── meta-ads/             # Meta Marketing API integration
│   │   ├── client/           # Auth, insights
│   │   └── monitor/          # Alerts, optimization
│   ├── analytics/            # Performance tracking
│   │   ├── metrics/          # Engagement rate, benchmarks
│   │   └── tracking.ts       # Event tracking (PostHog stub)
│   ├── podcast/              # Podcast generation pipeline
│   │   ├── script/           # Script writer (OpenAI)
│   │   └── voice/            # Voice synthesis (ElevenLabs)
│   ├── community/            # Community content management
│   ├── lead-capture/         # Forms, server actions
│   ├── scheduler/            # Content calendar, scheduling
│   ├── publisher/            # Social media publishing
│   ├── newsletter/           # Newsletter generation
│   ├── integrations/         # Make.com, external APIs
│   ├── ab-testing/           # A/B testing framework
│   ├── cache/                # Redis caching utilities
│   ├── middleware/           # Auth, rate limiting logic
│   ├── config/               # Centralized configuration
│   ├── lib/                  # Shared utilities
│   └── types/                # Global TypeScript types
├── scripts/                  # Automation scripts
├── tests/                    # Test suites (Vitest)
├── .storybook/               # Storybook configuration
└── .github/workflows/        # CI/CD (GitHub Actions)
```

## Environment Variables

See `.env.example` for full list. Key ones:

| Variable | Source | Purpose |
|----------|--------|---------|
| `OPENAI_API_KEY` | OpenAI | Content generation, podcast scripts |
| `ELEVENLABS_API_KEY` | ElevenLabs | Podcast voice synthesis |
| `META_APP_ID` | Meta Developers | Meta Marketing API |
| `META_APP_SECRET` | Meta Developers | Meta Marketing API auth |
| `META_ACCESS_TOKEN` | Meta Business | Ad account access |
| `META_AD_ACCOUNT_ID` | Meta Business | Ad account ID |
| `MAKE_WEBHOOK_API_KEY` | Make.com | Webhook authentication |
| `MAKE_CONTENT_WEBHOOK_URL` | Make.com | Content generation trigger |
| `MAKE_META_SYNC_WEBHOOK_URL` | Make.com | Meta sync trigger |
| `SUPABASE_URL` | Supabase | Database |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase | Server-side DB access |

## Content Strategy (High Level)

### Pillars
1. **Immigration & Legal** — Visas, citizenship, paperwork
2. **Career Abroad** — Jobs, networking, career growth
3. **Finance** — Banking, taxes, investments, remittances
4. **Culture & Identity** — Being Brazilian abroad, saudade, food, traditions
5. **Community** — Events, connections, support networks
6. **Lifestyle** — Travel, food, wellness, relationships

### Content Mix
| Format | Frequency | Platform |
|--------|-----------|----------|
| Carousel posts | 3x/week | Instagram |
| Reels | 2x/week | Instagram/TikTok |
| Stories | Daily | Instagram |
| Blog articles | 2x/week | Website |
| Podcast episodes | 1x/week | Spotify, Apple |
| Newsletter | 1x/week | Email |

## Design System

See Storybook: `npm run storybook`

Design tokens are centralized in `src/config/design-tokens.ts`.

### Brand Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `--brand-primary` | `#9FE870` | CTAs, accents, highlights |
| `--brand-dark` | `#0F172A` | Headers, text, dark mode bg |
| `--brand-light` | `#F8FAFC` | Page backgrounds |
| `--accent-warm` | `#F97316` | Warm accents, alerts |
| `--accent-cool` | `#3B82F6` | Links, info |

## Testing

Tests are written with **Vitest** and **@testing-library/react**.

```bash
# Run all tests
npm run test

# Watch mode
npm run test:watch

# With coverage
npm run test:coverage
```

### Test Structure
- `tests/*.test.ts` — Unit tests for utilities and pure functions
- Co-located `*.test.tsx` — Component tests (add next to component)

## CI/CD

GitHub Actions workflow in `.github/workflows/ci.yml`:
- Type check
- Lint
- Run tests
- Build

## Roadmap

### Phase 1: MVP (Weeks 1-4)
- [x] Project scaffolding and design system
- [x] Content generation engine (text + image stubs)
- [x] Basic landing pages
- [x] Dashboard layout
- [ ] Connect OpenAI API keys
- [ ] First generated content batch

### Phase 2: Automation (Weeks 5-8)
- [ ] Meta Ads monitoring integration
- [ ] Auto-alerts and reports
- [ ] Podcast generation pipeline
- [ ] Make.com automation flows

### Phase 3: Community (Weeks 9-12)
- [ ] Community platform launch
- [ ] Newsletter automation
- [ ] User-generated content workflow

### Phase 4: Scale (Months 4-6)
- [ ] Multi-language support
- [ ] Advanced analytics + AI insights
- [ ] Monetization (ads, partnerships, premium)

## License
Proprietary — All rights reserved.
