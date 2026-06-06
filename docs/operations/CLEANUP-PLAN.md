# Cleanup Plan — Remove Inconsistencies Before Building

## Inconsistencies Found (35 items)

### CRITICAL — Must Fix Before Any New Build

1. **Branding:** All docs say "Muuday", code says "Muuday Marketing"
2. **Auth:** Architecture doc says "Supabase Auth", actual is simple cookie auth
3. **PostHog:** Removed from code but still in package.json, env.ts, .env.example, 6 docs
4. **Middleware:** Two files (`src/middleware.ts` and `src/app/middleware.ts`)
5. **Makefile:** References targets that don't exist (`verify`, `docker-down`, `clean`)

### HIGH — Fix Before Next Feature

6. **Brand voice docs:** All strategy docs still reference "Muuday"
7. **Tech stack doc:** Lists 10+ tools not in code (Zapier, Inngest, GA4, Sentry, Checkly, etc.)
8. **Architecture doc:** Says auth is Supabase Auth, says SendGrid is used
9. **Daily plan:** References tools not integrated (Postiz, Plausible, FLUX 2, Kling)
10. **Cost budget:** Lists PostHog with $0 budget
11. **Env comparison:** Lists PostHog as shared infrastructure
12. **Vercel setup:** References Sentry, Checkly, PostHog as "already configured"
13. **Session protocol:** References file that doesn't exist (`cost-tracker.ts`)

### MEDIUM — Fix When Convenient

14. **Model router:** Doc says Anthropic is in chain, code has no Anthropic provider
15. **CHANGELOG:** Says webhooks were added, git shows they were deleted
16. **README:** Says `make verify` exists, Makefile has no such target
17. **12-week roadmap:** Describes building things that require Postiz/Listmonk/etc. that aren't integrated
18. **Vision doc:** Treats Postiz/Listmonk/Ghost/Plausible/n8n as if they exist

### LOW — Polish

19. **Component max lines:** AGENTS.md says 150, tech-stack.md says 200
20. **Daily plan:** Monthly metrics include revenue targets (internal tool has no revenue)
21. **Community strategy:** Describes public community building (pages deleted)
22. **Marketing funnel:** Describes public funnel (pages deleted)
23. **Content strategy:** References blog/public content (pages deleted)

---

## Execution Order

### Phase 1: Brand & Identity (all docs)

- [ ] AGENTS.md — "Muuday" → "Muuday"
- [ ] README.md — "Muuday" → "Muuday Marketing Machine"
- [ ] All strategy docs — update branding
- [ ] All operations docs — update branding
- [ ] All tech docs — update branding

### Phase 2: Remove Dead Code

- [ ] Remove PostHog from package.json
- [ ] Remove PostHog from env.ts
- [ ] Remove PostHog from .env.example
- [ ] Delete `src/app/middleware.ts` (keep root `src/middleware.ts`)
- [ ] Fix Makefile targets

### Phase 3: Fix Documentation

- [ ] Update architecture.md (auth = cookie, remove SendGrid)
- [ ] Update tech-stack.md (remove tools not in code)
- [ ] Update daily-plan.md (remove tools not integrated)
- [ ] Update cost-budget.md (remove PostHog)
- [ ] Update env-comparison.md (remove PostHog)
- [ ] Update vercel-setup.md (remove Sentry, Checkly, PostHog)
- [ ] Update session-protocol.md (fix references)
- [ ] Update agent-memory.md (update blockers, fix PostHog/Postiz confusion)
- [ ] Update CHANGELOG.md (fix webhook references, PostHog)

### Phase 4: Create Master Plan

- [ ] Single source of truth: docs/strategy/MASTER-PLAN.md
- [ ] Merge vision + roadmap + architecture into one coherent doc
- [ ] Remove aspirational content that contradicts current state
