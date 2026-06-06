# Agent Memory — Brasil Global Marketing Machine

> This is the long-term memory for the AI agent. Decisions, blockers, architectural choices, and learnings live here. Read this at the start of every session.

---

## 🧠 Agent Principles (NON-NEGOTIABLE)

1. **Never cut corners** — Do it right, even if it takes longer. Shortcuts create debt.
2. **Always tell the truth** — If something is broken, say it. If an estimate is wrong, correct it.
3. **Always choose the best** — Even if it's harder. Quality compounds.
4. **Document as you go** — Every decision, every lesson, every failure. The brain forgets; files don't.
5. **Organize to scale** — Every folder, every file, every function must support 10x growth.
6. **Review after done** — Nothing is finished until you've checked it twice.
7. **Register learnings** — `.kimi/context.md` and `docs/operations/agent-memory.md` must grow every session.
8. **No secrets in code** — Ever. Not even "just for now."
9. **Test what you build** — If it's not tested, it doesn't exist.
10. **Respect the user's time** — Be concise, be accurate, be helpful.
11. **NEVER leave things behind** — If it's in the plan, it gets done. No "we'll do it later." Later never comes. Finish what you start. Do not move to the next task until the current one is 100% complete.
12. **The user has no rush** — They want it RIGHT, not fast. Take the time needed. Quality over speed. Every. Single. Time.
13. **No repeated mistakes** — If you made a mistake, document it in the brain so you never make it again. Learn once, remember forever.
14. **Tests for everything** — Every feature, every fix, every refactor gets tests. Unit, integration, edge cases, error paths. If it doesn't have tests, it doesn't ship.
15. **No God files** — No file does everything. Split by responsibility. If a file is getting fat, extract. Max lines are hard limits, not suggestions.
16. **Documents stay organized** — docs/ must be clean, current, and navigable. Outdated docs are worse than no docs. Update as you go.
17. **Maximize parallel agents** — Whenever possible, use multiple agents/subagents working in parallel. Do not serialize work that can be parallelized. Each agent handles one focused domain.
18. **Automate everything** — Every manual step must become a script, a workflow, or a command. If you do it twice, script it. If a human has to remember it, automate it.

---

## 🏗️ Architectural Decisions

### Decision: Model Router Pattern
**Date**: 2026-06-06
**Status**: Approved
**Rationale**: Never depend on a single AI provider. Route tasks to the best model for the job with automatic fallback.
**Implementation**: `src/shared/model-router/`
**Providers**: Kimi (default for ALL tasks — copy, structured, code, summaries, image/video prompts), OpenAI (fallback), Anthropic (fallback), DeepSeek (fallback)
**Update 2026-06-06**: Switched from multi-provider default to Kimi-only default. All tasks route to Kimi first. Others are pure fallback chain.

### Decision: Programmatic Templates for Brand Consistency
**Date**: 2026-06-06
**Status**: Approved
**Rationale**: AI cannot reliably place text on images with brand fonts/colors. Generate backgrounds with AI, composite with code.
**Implementation**: `src/canvas/brand-templates/` using Satori + Puppeteer
**Tools**: html-to-image, Satori, Tailwind

### Decision: fal.ai over Higgsfield
**Date**: 2026-06-06
**Status**: Approved
**Rationale**: Higgsfield has credit traps, billing complaints, and is being discontinued. fal.ai is transparent, API-first, no subscription games.
**Models**: FLUX 2 for images, Kling 3.0 for video

### Decision: Postiz for Social Scheduling (Future)
**Date**: 2026-06-06
**Status**: Planned
**Rationale**: Postiz is open source, has AI content gen, and replaces Buffer/Hootsuite. Will integrate when social publishing layer is built.
**Note**: For MVP, may use Meta Business Suite + LinkedIn native + Make.com

### Decision: Vercel Project Setup
**Date**: 2026-06-06
**Status**: Approved
**Rationale**: Marketing machine is a separate Vercel project from muuday-app. Same team/account, different project. This allows independent deploys, isolated rollbacks, and clean env var separation.
**Project name**: `muuday-marketing`
**Domain**: `brasilglobal.com` (or `marketing.muuday.com`)
**Shared**: Supabase, Redis, PostHog, Sanity, Resend, Sentry (same DSN for now)
**Separate**: App URL, APP_SECRET, Kimi key, Meta app credentials

### Decision: n8n + Make.com Hybrid
**Date**: 2026-06-06
**Status**: Approved
**Rationale**: Make.com for fast integrations (Meta, Instagram). n8n for complex orchestration (content pipeline). Activepieces evaluated but ecosystem is smaller.

### Decision: Sanity CMS (Keep)
**Date**: 2026-06-06
**Status**: Approved
**Rationale**: Already configured. Better for structured content than Ghost for this use case. Ghost may be added later for blog-only content.

---

## 🚧 Current Blockers

| # | Blocker | Impact | Workaround | Owner |
|---|---------|--------|------------|-------|
| 1 | `node_modules` missing | Cannot run app | Run `npm install` | FOUNDER |
| 2 | `.env.local` missing | App crashes on start | Create with dummy values | FOUNDER |
| 3 | `env.ts` too strict for dev | Cannot run without Supabase/Sanity keys | Make optional in dev mode | AGENT |
| 4 | Not a git repo | No version control | Run `git init` | FOUNDER |
| 5 | Missing dependencies | Supabase, Sanity clients not installed | Add to package.json | AGENT |

---

## 📊 Tech Stack Evolution Log

| Date | Change | Reason |
|------|--------|--------|
| 2026-06-03 | Project scaffolded | Initial setup |
| 2026-06-06 | Added Model Router layer | Avoid vendor lock-in |
| 2026-06-06 | Added Visual Factory layer | Separate AI gen from composition |
| 2026-06-06 | Added Canvas layer | Brand-consistent output |
| 2026-06-06 | Added Ads Manager layer | Paid acquisition |
| 2026-06-06 | Added Intelligence layer | Competitive advantage |

---

## 🎯 Business Context

### Target Audience
- Brazilians living in UK, USA, Portugal, Ireland, Australia, Canada
- Ages 25-45
- Interests: immigration, careers, finance, culture, community

### Content Mix (Target)
| Format | Frequency | Platform |
|--------|-----------|----------|
| Carousel posts | 3x/week | Instagram |
| Reels | 2x/week | Instagram/TikTok |
| LinkedIn posts | 5x/week | LinkedIn |
| Stories | Daily | Instagram |
| Blog articles | 2x/week | Website |
| Podcast episodes | 1x/week | Spotify, Apple |
| Newsletter | 1x/week | Email |

### Funnel Stages
1. **Awareness**: Instagram, Reels, TikTok, SEO
2. **Consideration**: Blog, podcast, LinkedIn
3. **Conversion**: Newsletter signup, lead magnet download
4. **Retention**: Community, email nurture, events

---

## 💡 Learnings & Notes

### What Worked
- Copy generator with Claude 3.7 produces excellent Portuguese copy
- Brand voice validator catches 80% of issues automatically
- Dashboard layout with stats cards works well for overview

### What Didn't Work
- DALL-E 3 for carousel slides (text is unreadable)
- `env.ts` requiring all env vars on startup blocks development
- Generating full carousel images with AI = inconsistent branding

### Patterns to Reuse
- `ApiResult<T>` pattern for all API calls
- Zod schema validation for all external data
- Retry with exponential backoff for all AI APIs
- Cost tracking wrapper for all paid API calls

---

## 🔮 Future Decisions Pending

| Decision | Options | When to Decide |
|----------|---------|----------------|
| Self-host Postiz? | Yes / Use API only / Skip | After MVP |
| Add Ghost for blog? | Yes / Keep Sanity only / Hybrid | After content engine |
| LinkedIn Ads API? | Direct / via Make.com / Manual | After organic works |
| Affiliate program? | Wise, Revolut, Nubank, others | After 1000 newsletter subs |
| Premium subscription? | Community access / Courses / Coaching | After 5000 followers |
