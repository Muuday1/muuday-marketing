# Daily Operating Plan — Brasil Global Marketing Machine

> The marketing machine runs on routines. This document defines what happens every day, every week, and every month to keep the machine producing and improving.

---

## ⏰ Daily Rhythm (Agent + Human)

### Morning (30 min) — Intelligence & Planning
| Time | Task | Tool | Who |
|------|------|------|-----|
| 08:00 | Check trends and competitor content | Custom scraper + AI | MACHINE |
| 08:10 | Review yesterday's analytics | PostHog / Plausible | MACHINE |
| 08:15 | Generate content brief for today | Claude 3.7 | MACHINE |
| 08:20 | Human approves brief + topics | Dashboard | HUMAN |
| 08:30 | Generate draft content batch | Content Engine | MACHINE |

### Midday (45 min) — Production
| Time | Task | Tool | Who |
|------|------|------|-----|
| 09:00 | Generate carousel backgrounds (3x) | FLUX 2 (fal.ai) | MACHINE |
| 09:15 | Compose carousels with brand template | Canvas (Satori) | MACHINE |
| 09:30 | Generate LinkedIn post copy | Claude 3.7 | MACHINE |
| 09:45 | Generate Reel script + B-roll | Kling 3.0 + Pika | MACHINE |
| 10:00 | Human review + approve all drafts | Dashboard | HUMAN |

### Afternoon (30 min) — Distribution
| Time | Task | Tool | Who |
|------|------|------|-----|
| 14:00 | Schedule approved content | Postiz / Make.com | MACHINE |
| 14:15 | Cross-post to all platforms | Publisher | MACHINE |
| 14:30 | Engage with community (DMs, comments) | Instagram + LinkedIn | HUMAN |
| 15:00 | Monitor ad performance | Meta Ads Manager | HUMAN |

### Evening (15 min) — Optimization
| Time | Task | Tool | Who |
|------|------|------|-----|
| 18:00 | Pull performance data | Analytics | MACHINE |
| 18:05 | Run brand voice check on published content | Validator | MACHINE |
| 18:10 | Update content scoreboard | Dashboard | MACHINE |
| 18:15 | Log learnings to agent memory | `.kimi/context.md` | AGENT |

---

## 📅 Weekly Rhythm

### Monday — Strategy Day (2 hours)
- [ ] Review last week's metrics (engagement, reach, leads, cost)
- [ ] Plan content pillars for the week
- [ ] Update content calendar
- [ ] Check competitor movements
- [ ] Adjust ad budgets based on performance

### Tuesday — Content Batch Day (3 hours)
- [ ] Generate full week of Instagram carousels
- [ ] Generate full week of LinkedIn posts
- [ ] Generate 2 Reels
- [ ] Generate 1 podcast script
- [ ] Human review and approve all

### Wednesday — Production Day (2 hours)
- [ ] Render all carousels with brand templates
- [ ] Produce Reels (edit, subtitles, music)
- [ ] Record podcast episode (voice synthesis + mix)
- [ ] Write blog article

### Thursday — Distribution Day (1 hour)
- [ ] Schedule all content for next week
- [ ] Set up ad campaigns
- [ ] Send newsletter
- [ ] Publish blog article

### Friday — Optimization Day (1 hour)
- [ ] A/B test analysis
- [ ] Underperforming content diagnosis
- [ ] Budget review (API costs, ad spend)
- [ ] Update agent memory with learnings

### Saturday — Community Day (30 min)
- [ ] Respond to all comments and DMs
- [ ] Feature community spotlight
- [ ] Plan weekend Stories

### Sunday — Rest & Planning (30 min)
- [ ] Light monitoring only
- [ ] Plan next week's big topics
- [ ] Read industry news

---

## 📊 Monthly Rhythm

### Week 1 — Content Strategy Review
- [ ] Deep dive into content performance (top 10 posts, bottom 10)
- [ ] Audience growth analysis
- [ ] Competitor benchmark update
- [ ] Content pillar rotation decision

### Week 2 — Funnel Optimization
- [ ] Landing page conversion review
- [ ] Email sequence performance
- [ ] Lead magnet performance
- [ ] CRO experiments planning

### Week 3 — Paid Ads Review
- [ ] Meta Ads ROAS analysis
- [ ] LinkedIn Ads performance
- [ ] Creative fatigue check (remix winning creatives)
- [ ] Budget reallocation

### Week 4 — System & Scale Review
- [ ] API cost analysis (are we overspending?)
- [ ] Automation health check (are workflows breaking?)
- [ ] New tool evaluation
- [ ] Next month's big bets

---

## 🎯 Key Metrics Dashboard

### Daily Metrics (Auto-tracked)
| Metric | Target | Alert If |
|--------|--------|----------|
| Content published | 2+ pieces | < 1 |
| Engagement rate | > 4% | < 2% |
| API cost (day) | < $15 | > $25 |
| New followers | > 50 | < 10 |
| Newsletter subs | > 5 | < 1 |

### Weekly Metrics
| Metric | Target | Alert If |
|--------|--------|----------|
| Total reach | > 50K | < 20K |
| Website visits | > 2K | < 500 |
| Lead magnet downloads | > 50 | < 10 |
| Podcast downloads | > 200 | < 50 |
| Ad spend | < £300 | > £500 |
| ROAS | > 2.5x | < 1.5x |

### Monthly Metrics
| Metric | Target M3 | Target M6 | Target M12 |
|--------|-----------|-----------|------------|
| Instagram followers | 3,000 | 10,000 | 25,000 |
| LinkedIn followers | 1,000 | 5,000 | 15,000 |
| Newsletter subscribers | 500 | 2,000 | 5,000 |
| Podcast downloads/episode | 100 | 500 | 2,000 |
| Website visits/month | 3,000 | 10,000 | 30,000 |
| Monthly revenue | £0 | £500 | £3,000 |

---

## 🔄 Automation Routines

### Auto-Run Every Hour (Machine)
1. Check API cost tracker — alert if > 80% of daily budget
2. Check scheduled posts — retry any failures
3. Pull social media metrics — update dashboard
4. Check brand mention alerts

### Auto-Run Every Day at 6 AM (Machine)
1. Generate content brief based on trends + calendar
2. Scrape competitor Instagram + LinkedIn
3. Update content scoreboard
4. Backup all generated assets to Supabase Storage

### Auto-Run Every Monday at 8 AM (Machine)
1. Generate weekly analytics report (PDF)
2. Email report to founder
3. Suggest budget adjustments for ads
4. Flag underperforming content for review

---

## 🚨 Escalation Triggers

| Trigger | Action | Who |
|---------|--------|-----|
| API cost > $50/day | Pause all non-essential generation | MACHINE |
| Engagement rate drops 50% | Alert + suggest content audit | MACHINE |
| Ad ROAS < 1.0x | Pause campaign + alert | MACHINE |
| Negative comment spike | Alert + flag for human review | MACHINE |
| Competitor launches similar product | Alert + suggest response content | MACHINE |
| Website down > 5 min | Alert + check Vercel status | MACHINE |
| Newsletter unsubscribe rate > 2% | Alert + content audit | MACHINE |
