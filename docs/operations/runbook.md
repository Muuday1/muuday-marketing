# Runbook — Muuday Marketing Machine

> What to do when things break. Keep this open during incidents.

---

## 🚨 Severity Levels

| Level | Name     | Response Time | Examples                                    |
| ----- | -------- | ------------- | ------------------------------------------- |
| P1    | Critical | 15 min        | All sites down, data loss, security breach  |
| P2    | High     | 1 hour        | Core feature broken (publishing, payments)  |
| P3    | Medium   | 4 hours       | Non-core feature degraded (analytics delay) |
| P4    | Low      | 24 hours      | Cosmetic issues, minor bugs                 |

---

## 🔥 P1: Application Completely Down

### Symptoms

- Vercel dashboard shows deployment failed
- `curl https://brasilglobal.com` returns 5xx or timeout
- Uptime monitor alerts firing

### Response

1. **Check Vercel status**: https://www.vercel-status.com
2. **Check last deployment**: Vercel dashboard → Deployments → Last deploy
3. **Roll back**: Click "Promote to Production" on last known good deployment
4. **Check logs**: Vercel dashboard → Logs (filter by ERROR)
5. **If database issue**: Check Supabase status → https://status.supabase.com
6. **Escalate**: If not resolved in 15 min, page the on-call engineer

### Commands

```bash
# Check deployment status
vercel --version
vercel logs brasilglobal.com --json

# Rollback (via Vercel CLI)
vercel rollback
```

---

## 💸 P1: Runaway API Cost

### Symptoms

- OpenAI/Anthropic/Fal dashboard shows 10x normal usage
- Billing alert triggered
- Suspicious traffic patterns

### Response

1. **Rotate API keys immediately**:
   - OpenAI: https://platform.openai.com/api-keys
   - Anthropic: https://console.anthropic.com/settings/keys
   - Fal: https://fal.ai/dashboard/keys
2. **Update .env.local** with new keys
3. **Redeploy** to Vercel with new env vars
4. **Check usage logs** for abnormal patterns (same IP, same prompt repeated)
5. **Enable stricter rate limits** in provider dashboards
6. **Document incident** in cost-budget.md

---

## 🗄️ P2: Database Connection Errors

### Symptoms

- "connection refused" or "too many connections" errors
- Supabase dashboard shows high connection count
- Requests timing out on DB operations

### Response

1. Check Supabase dashboard → Database → Connections
2. If maxed out, restart connection pool:
   - Go to Supabase → Settings → Database → Restart
3. Check for connection leaks in application code
4. Verify `SUPABASE_SERVICE_ROLE_KEY` hasn't expired
5. If persistent, scale up Supabase plan temporarily

---

## 📤 P2: Social Publishing Fails

### Symptoms

- Content stuck in "scheduled" status
- Meta/Instagram API errors in logs
- Posts not appearing on social platforms

### Response

1. Check Meta token expiry:
   ```bash
   curl "https://graph.facebook.com/v18.0/me?access_token=$META_ACCESS_TOKEN"
   ```
2. If expired, refresh token at https://developers.facebook.com/tools/explorer
3. Check rate limits: Meta Graph API has 200 calls/hour/user
4. Verify `INSTAGRAM_BUSINESS_ACCOUNT_ID` is correct
5. Check content for policy violations (too promotional, restricted topics)
6. Retry failed posts manually via admin dashboard

---

## 🎨 P3: Image/Video Generation Slow or Failing

### Symptoms

- Fal/Replicate requests timing out
- Generated media missing or corrupted
- High queue times

### Response

1. Check Fal/Replicate status pages
2. Switch to fallback provider:
   - Fal down → use Replicate
   - Replicate down → use Ideogram
3. Check credit balance in provider dashboard
4. Reduce concurrent generation requests (batch size)
5. Enable CDN caching for generated assets

---

## 📊 P3: Analytics Data Missing

### Symptoms

- Mixpanel showing zero events
- Dashboards empty
- Conversion tracking broken

### Response

1. Check
2. Verify `NEXT_PUBLIC_POSTHOG_KEY` in deployed env vars
3. Check browser console for
4. Verify Mixpanel token hasn't been rotated
5. If using server-side tracking, check API rate limits

---

## 🔐 P1: Security Incident

### Symptoms

- Unauthorized API usage
- Suspicious webhooks
- Data exfiltration indicators

### Response

1. **Immediate**: Rotate ALL API keys (OpenAI, Anthropic, Meta, Supabase, etc.)
2. **Block suspicious IPs** at Vercel firewall or Cloudflare
3. **Check audit logs**: Supabase → Logs, Vercel → Analytics
4. **Verify webhooks**: Check signature validation is working
5. **If PII leaked**: Follow GDPR incident response procedure
6. **Document everything** for post-mortem

---

## 🔄 General Recovery Steps

For any incident:

1. **Acknowledge** — Update status page / notify stakeholders
2. **Contain** — Stop the bleeding (rollback, rotate keys, block traffic)
3. **Diagnose** — Find root cause via logs, metrics, traces
4. **Fix** — Apply fix and verify
5. **Document** — Write incident report in CHANGELOG.md
6. **Prevent** — Add monitoring/alerting to catch this earlier next time

---

## 📞 Escalation Contacts

| Role         | Contact   | When to Escalate          |
| ------------ | --------- | ------------------------- |
| Founder      | (private) | P1 not resolved in 15 min |
| DevOps       | (private) | Infrastructure issues     |
| Meta Partner | (private) | API bans or policy issues |

---

## 🔗 Quick Links

- Vercel Dashboard: https://vercel.com/dashboard
- Supabase Dashboard: https://supabase.com/dashboard
- OpenAI Usage: https://platform.openai.com/usage
- Anthropic Console: https://console.anthropic.com
- Fal Dashboard: https://fal.ai/dashboard
- Meta Business: https://business.facebook.com
-
- Mixpanel: https://mixpanel.com
