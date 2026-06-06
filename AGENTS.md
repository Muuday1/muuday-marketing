---
last_updated: 2026-06-06
owner: founder
scope: global
---

# Brasil Global — Marketing Machine Agent Guidelines

## Vision
Build a **world-class, AI-powered Marketing Machine** that operates at the quality level of a top-tier creative agency — for the Brazilian diaspora. Not just posts — a **movement**. Quality over quantity. Authenticity over automation noise. Distribution as important as creation.

This is the **marketing engine** of the company. The product/site/app exists separately. This machine feeds it with traffic, leads, community, and brand authority.

## Brand Identity: "Brasil Global"
- **Mission**: Connect, inform, and empower Brazilians worldwide through premium AI-generated content
- **Tone**: Warm, informed, aspirational, deeply Brazilian but globally minded
- **Languages**: Portuguese (primary), English (secondary for broader reach)
- **Never**: Generic AI slop, clickbait, toxic positivity, cultural stereotypes

## Architecture: 8 Layers

```
LAYER 1: INTELLIGENCE     → Trend radar, competitor spy, audience personas
LAYER 2: STRATEGY         → Campaign builder, funnel designer, briefs
LAYER 3: CONTENT ENGINE   → Copy, image, video, voice generation
LAYER 4: CANVAS           → Carousel builder, reel editor, brand templates
LAYER 5: STUDIO           → Podcast production, video editing
LAYER 6: PUBLISHER        → Instagram, LinkedIn, YouTube, TikTok, Blog, Newsletter, Podcast
LAYER 7: ADS MANAGER      → Meta, LinkedIn, creative remixer, optimizer
LAYER 8: ANALYTICS        → Organic, paid, content performance, LLM SEO
```

## Tech Stack (Locked)
| Layer | Tool | Role |
|-------|------|------|
| Framework | Next.js 15 (App Router) | Dashboard + Studio |
| Styling | Tailwind CSS v4 | Design system |
| Language | TypeScript 5.6+ | Type safety |
| Testing | Vitest | Unit tests |
| DB | Supabase (PostgreSQL) | Data persistence |
| CMS | Sanity | Content management |
| Automation | Make.com (fast) + n8n (complex) | Orchestration |
| Text AI | Claude 3.7 + GPT-4.1 + DeepSeek V3 | Model Router pattern |
| Image AI | FLUX 2 (fal.ai) + Ideogram 3 + Recraft V3 | Visual factory |
| Video AI | Pika + Kling 3.0 + Runway Gen-4.5 | Video studio |
| Voice AI | ElevenLabs | Podcast + voice |
| Analytics | PostHog + Plausible | Event + web analytics |
| Email | Listmonk (self-hosted) | Newsletter |
| Scheduling | Postiz (self-hosted) | Social publishing |
| Deployment | Vercel | Hosting |

## Code Quality Rules (Hard Limits)
| File Type | Max Lines | Rule |
|-----------|-----------|------|
| Page/component | 150 | Orchestration only |
| Utility function | 40 | Single responsibility |
| Hook | 150 | One concern only |
| Server action | 100 | Thin controller |
| Config file | 200 | Centralized only |

### No God Files
- **One file = one job**. If a file has more than 3 imports from different domains, it's too big.
- **Extract early**: At 80% of max lines, start splitting. Don't wait for the limit.
- **No "utils.ts" dumping grounds**: Specific names only (`date-formatter.ts`, `slug-generator.ts`).
- **No catch-all handlers**: Each webhook gets its own file. Each API route handles one action.
- **Tests reflect structure**: If a file is hard to test, it's too complex. Split it.

## Architecture Principles
1. **DRY**: Extract shared logic to `src/shared/`
2. **Single Responsibility**: One module = one domain
3. **Config Centralization**: All API keys, limits, timeouts in `src/config/`
4. **Type Safety**: Zero `any`. Use `unknown` + narrowing.
5. **Test Coverage**: Every pure function gets a test. Every API client gets a mock. Every feature gets integration tests. Every bug fix gets a regression test. No exceptions.
6. **Model Router**: Never call AI provider directly. Always route through `src/shared/model-router/`
7. **Brand Consistency**: Never generate text-on-image with AI. Always use programmatic templates.

## Content Generation Rules
1. **Human-in-the-loop**: AI generates drafts; human approves before publish
2. **Cultural accuracy**: Every post about Brazil must be verified by a Brazilian
3. **Quality gate**: Content must score 8+/10 on brand voice rubric before publish
4. **Diversity**: Rotate topics — culture, finance, immigration, careers, mental health, community
5. **Brand DNA**: Every visual output must inject `#9FE870`, `Geist` font, warm photography

## Security
- No API keys in code. Use `.env.local` + Vercel env vars
- No PII in logs
- Rate limit all external API calls
- Validate all webhooks with signatures
- Cost monitoring alerts on all AI APIs

## Session Protocol (MANDATORY)

### Before Every Session
1. Run `git status` — understand the current state
2. Read `AGENTS.md` (this file)
3. Read `.kimi/context.md` — load agent memory
4. Read `docs/operations/agent-memory.md` — check pending blockers
5. Check `docs/operations/CHANGELOG.md` — see what changed last

### During Every Session
6. Update todo list at start — be explicit about goals
7. Write code that follows hard limits (max lines per file)
8. Run `npm run typecheck` after significant changes
9. Run `npm run test` before committing
10. Update `.kimi/context.md` whenever state changes

### Before Ending Session
11. Update `docs/operations/CHANGELOG.md`
12. Run `npm run typecheck && npm run lint`
13. Run `npm run test`
14. Run `node scripts/session-end.js "description of changes"`
15. Update `.kimi/context.md` with current state + next steps

## Automation Rules
- All repetitive tasks must become scripts or workflows
- Every API client must have retry + exponential backoff
- Every batch operation must have progress logging
- Every expensive operation (video, image gen) must have cost tracking
- All content must be versioned in Supabase before publish

## Document Organization Rules
- **docs/ is sacred**: Every doc has a clear owner and last-updated date. Stale docs are deleted or updated.
- **One topic = one file**: No 500-line docs covering 10 subjects. Split into `topic-subtopic.md`.
- **Cross-references are mandatory**: If you mention something documented elsewhere, link to it.
- **No orphaned docs**: Every doc must be reachable from README.md or AGENTS.md.
- **Code and docs move together**: Rename a module? Update all docs that reference it. Same PR.
- **Operations docs live in `docs/operations/`**: runbook, incident-response, cost-budget, schema, seed-data.
- **Strategy docs live in `docs/strategy/`**: content pillars, funnel, community playbook.
- **Design docs live in `docs/design/`**: tokens, voice, templates, logo usage.

## Scaling Rules
- Design for 10x traffic with zero code changes (caching, connection pooling)
- Queue long operations (video gen, batch publishing)
- Monitor API costs daily — alert at 80% of budget
- Archive old content; never delete
- Document every decision in `.kimi/context.md`
