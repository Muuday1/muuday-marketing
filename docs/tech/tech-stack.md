# Tech Stack — Brasil Global

## Core

| Layer | Technology | Why |
|-------|-----------|-----|
| **Runtime** | Node.js 20+ | LTS, stable, ecosystem |
| **Framework** | Next.js 15 (App Router) | SSR, API routes, Vercel native |
| **Language** | TypeScript 5.6+ | Type safety, DX |
| **Styling** | Tailwind CSS v4 | Utility-first, fast, maintainable |
| **UI Components** | shadcn/ui + custom | Accessible, customizable |
| **State (client)** | Zustand | Simple, no boilerplate |
| **State (server)** | React Query (TanStack) | Caching, mutations, sync |

## AI & Content

| Service | API | Purpose |
|---------|-----|---------|
| **OpenAI** | GPT-4o / GPT-4o-mini | Copy generation, scripts, SEO |
| **DALL-E 3** | OpenAI | Image generation |
| **Replicate** | REST API | Video generation (Kling, Luma, etc.) |
| **ElevenLabs** | REST API | Podcast voice synthesis |
| **Stable Diffusion** | Local or API | Image generation alternative |

## Data & CMS

| Service | Purpose |
|---------|---------|
| **Supabase** | PostgreSQL DB, auth, realtime |
| **Sanity** | Structured content (articles, guides) |
| **Upstash Redis** | Rate limiting, caching |

## Analytics & Ads

| Service | Purpose |
|---------|---------|
| **Meta Marketing API** | Ad management, reporting |
| **Meta Graph API** | Organic post insights |
| **Mixpanel** | Product analytics |
| **PostHog** | Web analytics, funnels |
| **Google Analytics 4** | Web traffic |

## Automation

| Service | Purpose |
|---------|---------|
| **Make.com** | Workflow automation, webhook orchestration |
| **Inngest** | Background jobs, scheduling (optional) |
| **Zapier** | Quick integrations (optional) |

## DevOps

| Service | Purpose |
|---------|---------|
| **Vercel** | Hosting, CI/CD, preview deploys |
| **GitHub** | Code, issues, actions |
| **GitHub Actions** | CI (typecheck, lint, test) |

## Testing

| Tool | Purpose |
|------|---------|
| **Vitest** | Unit tests |
| **Playwright** | E2E tests |
| **Storybook** | Component development, visual testing |
| **Chromatic** | Visual regression testing |

## Design & Assets

| Tool | Purpose |
|------|---------|
| **Figma** | UI design, prototypes |
| **Storybook** | Living design system |
| **Canva API** | Template-based image generation |

## External APIs

| API | Purpose |
|-----|---------|
| **Meta Marketing API** | Ad campaigns, insights |
| **Meta Graph API** | Page posts, engagement |
| **Instagram Graph API** | Publishing, insights |
| **Spotify API** | Podcast distribution data |
| **OpenAI API** | GPT-4, DALL-E |
| **Replicate API** | Video generation |
| **ElevenLabs API** | Text-to-speech |
| **News API** | Trending topics, news |
| **Google Trends API** | Search trend data |

## File Limits (Enforced)

| File Type | Max Lines |
|-----------|-----------|
| Pages | 150 |
| Components | 200 |
| Hooks | 150 |
| Utils | 40 |
| Actions | 100 |
| Config | 200 |
