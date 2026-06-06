# Incident Response Plan

> Formal incident response procedure for the Brasil Global Marketing Machine.

---

## 🎯 Objectives

1. Minimize impact on users and brand reputation
2. Restore service as quickly as possible
3. Preserve evidence for root cause analysis
4. Prevent recurrence through process improvement

---

## 📋 Incident Types

| Category | Examples | Response Team |
|----------|----------|---------------|
| Infrastructure | Vercel outage, Supabase down | DevOps |
| API/Integration | Meta API broken, OpenAI rate limit | Engineering |
| Security | Key leak, unauthorized access, PII breach | Security Lead |
| Content | Brand voice violation, cultural inaccuracy | Content Lead |
| Cost | Runaway API spend, billing anomaly | Finance + Engineering |
| Data | Data loss, corruption, inconsistency | Engineering |

---

## 🔄 Response Lifecycle

### 1. Detect (T+0)
- Automated alerts (Vercel, Supabase, PostHog, UptimeRobot)
- Manual reports (user feedback, team observation)
- Create incident channel/document immediately

### 2. Triage (T+5 min)
- Assign severity (P1-P4)
- Assign incident commander
- Notify stakeholders based on severity:
  - P1: All hands + founder
  - P2: Engineering + content lead
  - P3: Assigned engineer
  - P4: Ticket in backlog

### 3. Respond (T+5 to T+resolution)
- **Contain**: Stop the damage (rollback, disable feature, rotate keys)
- **Investigate**: Logs, metrics, traces, recent deployments
- **Fix**: Apply fix in dev → test → deploy
- **Verify**: Confirm service restored, monitors green

### 4. Resolve (T+resolution)
- Close incident in tracking system
- Send all-clear notification
- Schedule post-mortem within 48 hours for P1/P2

### 5. Learn (T+48 hours)
- Post-mortem document:
  - Timeline (detect → resolve)
  - Root cause (5 Whys)
  - Impact assessment
  - What went well
  - What could improve
  - Action items with owners
- Update runbook if applicable
- Update cost-budget.md if cost-related

---

## 🛡️ Security Incident Specifics

### Immediate Actions (first 15 minutes)
1. Rotate ALL API keys (OpenAI, Anthropic, Meta, Supabase, etc.)
2. Disable compromised webhooks
3. Block suspicious IPs at firewall level
4. Preserve logs (screenshot, export before rotation)
5. If PII involved, notify DPO within 72 hours (GDPR)

### Evidence Preservation
- Do NOT delete anything until investigation complete
- Export logs to secure location
- Document exact times and affected systems
- Screenshot dashboards showing anomaly

### Communication
- Internal: Immediate Slack/Discord alert
- External: Only if user data affected, via email within 72h
- Regulatory: GDPR breach notification within 72h if required

---

## 📞 Communication Templates

### P1 Internal Alert
```
🚨 P1 INCIDENT — [SYSTEM] is DOWN
- Started: [TIME]
- Impact: [DESCRIPTION]
- Commander: [NAME]
- Status channel: [LINK]
- ETA: [ESTIMATE]
```

### All-Clear
```
✅ RESOLVED — [SYSTEM] is BACK
- Duration: [X minutes]
- Cause: [BRIEF]
- Post-mortem: [LINK or "Scheduled for TIME"]
```

---

## 📁 Incident Tracking

Create a new file for each incident:
`docs/operations/incidents/YYYY-MM-DD-{brief-description}.md`

Template:
```markdown
# Incident: [TITLE]

| Field | Value |
|-------|-------|
| Date | YYYY-MM-DD |
| Severity | P1/P2/P3/P4 |
| Duration | X minutes |
| Systems | Affected systems |
| Commander | Name |

## Timeline
- HH:MM — Detected via [alert/source]
- HH:MM — Triage complete, severity assigned
- HH:MM — Containment action [describe]
- HH:MM — Root cause identified
- HH:MM — Fix deployed
- HH:MM — Verified resolved

## Root Cause
[5 Whys analysis]

## Impact
[Users affected, data lost, cost incurred]

## Lessons Learned
1. 
2. 

## Action Items
- [ ] [Owner] [Action] [Due date]
```

---

## 🔗 Related Documents

- [Runbook](runbook.md) — What to do when X breaks
- [Cost Budget](cost-budget.md) — Spending alerts and controls
- [CHANGELOG.md](CHANGELOG.md) — Post-incident updates
