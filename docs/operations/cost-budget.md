# Cost Budget & API Spending Controls

> Monthly budget tracking and alerts for all AI/infra providers.
> **Rule**: If any provider hits 80% of budget, pause non-essential jobs.

---

## 💰 Monthly Budget: $500 USD

| Provider   | Service                 | Budget | Alert At | Used (MTD) | Status |
| ---------- | ----------------------- | ------ | -------- | ---------- | ------ |
| OpenAI     | GPT-4.1, GPT-4o-mini    | $80    | $64      | $0         | 🟢     |
| Anthropic  | Claude 3.7              | $100   | $80      | $0         | 🟢     |
| DeepSeek   | V3 API                  | $30    | $24      | $0         | 🟢     |
| Fal.ai     | FLUX 2, image gen       | $60    | $48      | $0         | 🟢     |
| Replicate  | Video gen (Pika, Kling) | $80    | $64      | $0         | 🟢     |
| ElevenLabs | Voice/podcast           | $40    | $32      | $0         | 🟢     |
| Meta Ads   | Ad spend                | $0\*   | —        | $0         | 🟢     |
| Supabase   | DB + Auth + Storage     | $25    | $20      | $0         | 🟢     |
| Vercel     | Hosting                 | $20    | $16      | $0         | 🟢     |

|
| Resend | Email | $20 | $16 | $0 | 🟢 |
| Upstash | Redis | $10 | $8 | $0 | 🟢 |
| **Total** | | **$465** | | **$0** | 🟢 |

\*Meta Ads spend is managed separately via Meta Business Manager.

- ***

## 🔔 Alert Configuration

### Slack/Discord Webhook

Set `COST_ALERT_WEBHOOK_URL` in `.env.local` to receive alerts.

### Alert Triggers

- **80% budget**: Warning — review usage, pause non-essential generation
- **95% budget**: Critical — halt all AI generation except human-approved
- **100% budget**: Emergency — hard stop, manual approval required

### Manual Check Command

```bash
npm run cost:check  # TODO: implement this script
```

---

## 📊 Cost Per Output Type

| Output                | Provider   | Model           | Avg Cost     |
| --------------------- | ---------- | --------------- | ------------ |
| Instagram caption     | OpenAI     | GPT-4o-mini     | $0.002       |
| Premium blog post     | Anthropic  | Claude 3.7      | $0.15        |
| Structured JSON       | OpenAI     | GPT-4.1         | $0.01        |
| Image (1024x1024)     | Fal        | FLUX 2          | $0.03        |
| Image with typography | Ideogram   | Ideogram 3      | $0.04        |
| 5s video (Reel)       | Replicate  | Pika            | $0.50        |
| 30s B-roll            | Replicate  | Kling 3.0       | $2.00        |
| Podcast narration     | ElevenLabs | Multilingual v2 | $0.10/min    |
| Email newsletter      | Resend     | —               | $0.001/email |

---

## 🛡️ Cost Control Measures

1. **Model Router** — Route to cheapest model that meets quality threshold
2. **Caching** — Cache generated copy/images for 24h (Redis/Upstash)
3. **Batching** — Generate content in off-peak batches, not real-time
4. **Size Limits** — Cap image resolution at 1024x1024 unless approved
5. **Video Limits** — Max 10 videos/day unless campaign requires more
6. **Review Gate** — Human must approve before spending >$5 on a single asset

---

## 🚨 Incident Log

| Date | Provider | Amount | Cause | Action Taken |
| ---- | -------- | ------ | ----- | ------------ |
| —    | —        | —      | —     | —            |

---

## 📝 Monthly Reconciliation

**Last updated**: 2026-06-06
**Next review**: 2026-07-01

1. Export invoices from all providers
2. Update "Used (MTD)" column
3. Adjust next month's budget if over/under by >20%
4. Review cost-per-output and optimize model selection
