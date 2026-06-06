# 🇧🇷 Muuday — Marketing Machine

> A world-class AI-powered content engine and community platform for Brazilians living abroad.

---

## 🎯 What This Is

This is **not** a generic social media scheduler. It's a full-stack marketing machine that:

- **Generates** premium content (copy, images, video, audio) using the best AI models
- **Publishes** across Instagram, TikTok, LinkedIn, Twitter, YouTube, Spotify
- **Manages** Meta Ads campaigns with real-time cost tracking
- **Builds** a community of ambassadors and engaged members
- **Tracks** everything — analytics, costs, brand voice scores, cultural accuracy

**Philosophy**: Quality over quantity. Authenticity over automation noise. Every piece of content must score 8+/10 on brand voice before publishing.

---

## 🏗️ Architecture — 8 Layers

```
┌─────────────────────────────────────────────────────────────┐
│  intelligence      → Model Router (Claude/GPT/DeepSeek)     │
│  strategy          → Content strategy, pillar rotation        │
│  content-engine    → Copy, blog, podcast scripts             │
│  visual-factory    → Image/video generation (FLUX, Pika)     │
│  canvas            → Programmatic templates (Satori → SVG)   │
│  studio            → Review, approval, brand voice scoring   │
│  publisher         → Social scheduling + Meta Ads            │
│  analytics         → Mixpanel, custom events        │
│  community         → Members, ambassadors, referrals         │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 Quick Start

```bash
# 1. Use correct Node version
nvm use  # Reads .nvmrc

# 2. Install dependencies
npm install --legacy-peer-deps

# 3. Set up environment
cp .env.example .env.local
# Edit .env.local with your real API keys

# 4. Start development
npm run dev          # Next.js dev server
npm run storybook    # Component library

# 5. Verify everything
make verify          # lint + typecheck + test
```

---

## 📋 Available Commands

| Command                    | Description                         |
| -------------------------- | ----------------------------------- |
| `npm run dev`              | Start Next.js dev server            |
| `npm run build`            | Production build                    |
| `npm run test`             | Run Vitest suite                    |
| `npm run test:coverage`    | Tests with coverage                 |
| `npm run lint`             | ESLint check                        |
| `npm run typecheck`        | TypeScript check (no emit)          |
| `npm run content:generate` | Generate AI content                 |
| `npm run podcast:generate` | Generate podcast episode            |
| `npm run meta:sync`        | Sync Meta Ads data                  |
| `npm run session:start`    | Begin dev session (runs checks)     |
| `npm run session:end`      | End dev session (updates changelog) |
| `make help`                | Show all Make targets               |
| `make verify`              | Full verification pipeline          |
| `make docker-up`           | Start Docker services               |

---

## 🔧 Tech Stack

| Layer      | Technology                                  |
| ---------- | ------------------------------------------- |
| Framework  | Next.js 15 (App Router) + React 19          |
| Language   | TypeScript 5.6+                             |
| Styling    | Tailwind CSS v4                             |
| Testing    | Vitest + React Testing Library              |
| State      | Zustand (client), React Query (server)      |
| Database   | Supabase (PostgreSQL) — `marketing_` tables |
| CMS        | Sanity                                      |
| Analytics  | Mixpanel                                    |
| Email      | Resend                                      |
| Cache      | Upstash Redis                               |
| AI Text    | Claude 3.7, GPT-4.1, DeepSeek V3            |
| AI Image   | FLUX 2 (fal.ai), Ideogram 3, Recraft V3     |
| AI Video   | Pika, Kling 3.0, Runway Gen-4.5, HeyGen     |
| AI Voice   | ElevenLabs                                  |
| Deployment | Vercel                                      |

---

## 🧠 AI Model Routing

The Model Router automatically selects the optimal AI model based on task:

| Task Type         | Model                   | Why                                |
| ----------------- | ----------------------- | ---------------------------------- |
| Premium copy      | Claude 3.7              | Best creative writing, brand voice |
| Structured JSON   | GPT-4.1                 | Reliable schema adherence          |
| Budget/volume     | DeepSeek V3             | Cheapest for high volume           |
| Images            | FLUX 2 (fal.ai)         | Best quality/cost ratio            |
| Typography images | Ideogram 3              | Perfect text rendering             |
| Reels             | Pika                    | Fast, cost-effective               |
| Cinematic B-roll  | Kling 3.0               | Best motion quality                |
| Podcast voice     | ElevenLabs Multilingual | Natural Brazilian Portuguese       |

---

## 🎨 Brand Consistency Strategy

AI generates **only visual elements** (backgrounds, scenes, objects). All text, logos, colors, fonts, and layouts are applied via **programmatic templates** using Satori (React → SVG → PNG). This guarantees:

- 100% brand consistency
- Perfect typography every time
- Fast iteration (change template, regenerate all)
- No "AI slop" text artifacts

---

## 🗄️ Database

Same Supabase instance as the main app, with `marketing_` prefixed tables:

- `marketing_content_pieces` — All content
- `marketing_social_posts` — Published/scheduled posts
- `marketing_meta_campaigns` — Ad campaigns
- `marketing_community_members` — Community & ambassadors
- `marketing_analytics_events` — Custom events
- `marketing_cost_log` — AI cost tracking
- `marketing_templates` — Template registry
- `marketing_leads` — Lead capture

See `docs/operations/database-schema.md` for full schema.

---

## 🧪 Testing

```bash
npm run test          # Unit tests
npm run test:coverage # With coverage report
npm run test:watch    # Watch mode
```

Every pure function gets a test. Every API client gets a mock.

---

## 📁 Project Structure

```
src/
  ab-testing/        → A/B test framework
  analytics/         → Event tracking, dashboards
  app/               → Next.js App Router pages
  cache/             → Redis caching utilities
  community/         → Members, ambassadors, referrals
  components/        → Shared React components
  config/            → Environment, constants
  content-engine/    → Copy, blog, podcast generators
  integrations/      → Third-party API clients
  lead-capture/      → Forms, landing pages
  publisher/         → Social scheduling, Meta Ads
  scheduler/         → Content calendar
  seo/               → SEO utilities
  shared/            → Shared utilities, model router
  strategy/          → Content pillars, rotation
  studio/            → Review, approval workflows
  types/             → Global TypeScript types
  visual-factory/    → Image/video generation
```

---

## 🔐 Security

- No API keys in code — `.env.local` + Vercel env vars
- No PII in logs
- Rate limiting on all external APIs (Upstash Redis)
- Webhook signature validation
- Row Level Security on all Supabase tables

---

## 💰 Cost Monitoring

Monthly budget: **$500 USD**

Tracked providers: OpenAI, Anthropic, DeepSeek, Fal, Replicate, ElevenLabs, Supabase, Vercel, Resend, Upstash.

See `docs/operations/cost-budget.md` for detailed breakdown.

---

## 📚 Documentation

| Document                               | Purpose                         |
| -------------------------------------- | ------------------------------- |
| `AGENTS.md`                            | Agent guidelines and principles |
| `docs/operations/agent-memory.md`      | Architectural decisions         |
| `docs/operations/daily-plan.md`        | Daily routines                  |
| `docs/operations/session-protocol.md`  | Start/end rituals               |
| `docs/operations/runbook.md`           | What to do when X breaks        |
| `docs/operations/cost-budget.md`       | Monthly API budget              |
| `docs/operations/incident-response.md` | Incident procedures             |
| `docs/operations/database-schema.md`   | Database schema                 |
| `docs/operations/seed-data.md`         | Development seed data           |

---

## 🤝 Contributing

1. Run `git status` first
2. Read `AGENTS.md` before every session
3. Update `docs/operations/CHANGELOG.md` after changes
4. Run `npm run typecheck && npm run lint` before done
5. End session with `npm run session:end "description"`

---

## 📜 License

MIT — See `LICENSE`

---

_Built with ❤️ for brasileiros no exterior._
