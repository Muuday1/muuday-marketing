# Vercel Setup — Marketing Machine

> The marketing machine is a **separate Vercel project** from the main app.
> Same account, same team, different project.

---

## Architecture

```
Vercel Team: muuday
├── Project: muuday-app        → https://app.muuday.com
├── Project: muuday-marketing  → https://brasilglobal.com (or subdomain)
└── Shared: ENV vars where it makes sense
```

---

## Why Separate Projects?

| Concern | Same Project | Separate Projects |
|---------|-------------|-------------------|
| Deploy frequency | App deploys = marketing deploys | Independent |
| Build time | Longer (both apps) | Shorter (each app) |
| Rollback risk | Rollback app = rollback marketing | Isolated |
| Environment vars | Shared (messy) | Clean separation |
| Preview URLs | `app-muuday-xyz.vercel.app` | `marketing-muuday-abc.vercel.app` |
| Custom domain | One domain per project | Each gets its own |

**Decision:** Separate projects. Same Vercel team, same API token for deploys.

---

## Setup Steps

### 1. Create Project
```bash
vercel projects add muuday-marketing
# or via Vercel Dashboard → Add New Project
```

### 2. Link Local Repo
```bash
cd /Users/igorpinto/social-media-machine
vercel link
# Select: muuday team
# Select: muuday-marketing project
```

### 3. Set Environment Variables
Use the Vercel CLI or Dashboard to set all vars from `.env.local`:

```bash
vercel env add KIMI_API_KEY
vercel env add OPENAI_API_KEY
# ... etc for all vars
```

**Important:** Do NOT copy the `.env.local` file. Set each variable individually via Vercel.

### 4. Custom Domain
```bash
vercel domains add brasilglobal.com
# or subdomain:
# vercel domains add marketing.muuday.com
```

### 5. CI/CD
The GitHub Actions workflow (`.github/workflows/ci.yml`) already deploys to Vercel:
- Preview: on every Pull Request
- Production: on every push to `main`

Both deploy to the `muuday-marketing` project.

---

## Shared vs Separate ENV Vars

### Shared (same value in both projects)
| Variable | Value Source |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Muuday-app |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Muuday-app |
| `SUPABASE_SERVICE_ROLE_KEY` | Muuday-app |
| `RESEND_API_KEY` | Muuday-app |
| `UPSTASH_REDIS_REST_URL` | Muuday-app |
| `UPSTASH_REDIS_REST_TOKEN` | Muuday-app |
| `NEXT_PUBLIC_POSTHOG_KEY` | Muuday-app |
| `NEXT_PUBLIC_POSTHOG_HOST` | Muuday-app |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Muuday-app |
| `SANITY_API_TOKEN` | Muuday-app |
| `SENTRY_DSN` | Muuday-app (same project for now) |
| `VERCEL_API_TOKEN` | Same account |

### Separate (different value)
| Variable | Why |
|----------|-----|
| `NEXT_PUBLIC_APP_URL` | `brasilglobal.com` vs `app.muuday.com` |
| `APP_SECRET` | JWT isolation |
| `KIMI_API_KEY` | Marketing machine default |
| `META_APP_ID` | Separate Meta app |
| `META_ACCESS_TOKEN` | Separate permissions |
| `META_AD_ACCOUNT_ID` | Separate ad account (or same, your call) |

---

## DNS (if using subdomain)

If you want `marketing.muuday.com` instead of `brasilglobal.com`:

1. In Vercel Dashboard: Add domain `marketing.muuday.com`
2. In Cloudflare (or DNS provider): Add CNAME record:
   ```
   marketing.muuday.com → cname.vercel-dns.com
   ```
3. Vercel automatically provisions SSL

---

## Cost

Vercel Hobby (free):
- 100GB bandwidth
- 1000 build minutes
- 100 serverless functions
- 1 concurrent build

If traffic grows:
- Vercel Pro: $20/member/month
- Or self-host on AWS/GCP with Docker

---

## Monitoring

Vercel Analytics is included. For deeper monitoring:
- Sentry (already configured)
- PostHog (already configured)
- Checkly (already configured)
