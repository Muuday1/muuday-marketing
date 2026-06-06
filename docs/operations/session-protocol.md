# Session Protocol — Brasil Global Marketing Machine

> This document defines the exact routine to follow at the start and end of every working session. Following it ensures consistency, memory persistence, and zero context loss between sessions.

---

## 🟢 PRE-SESSION CHECKLIST (Do This First)

### Step 1: Load Context (2 min)
```bash
cd /Users/igorpinto/social-media-machine
git status
```
- [ ] Understand what branch you're on
- [ ] Check for uncommitted changes
- [ ] Note any files modified outside of last session

### Step 2: Read Memory (3 min)
- [ ] Read `AGENTS.md` — rules and conventions
- [ ] Read `.kimi/context.md` — current project state
- [ ] Read `docs/operations/agent-memory.md` — pending decisions and blockers
- [ ] Read `docs/operations/CHANGELOG.md` — what happened recently

### Step 3: Set Goals (2 min)
- [ ] Update todo list with today's objectives
- [ ] Identify the single most important task
- [ ] Estimate session duration
- [ ] Note any API keys that might be needed

### Step 4: Environment Check (1 min)
```bash
npm run typecheck   # Must pass or be fixing it
npm run test        # Know current test state
```

---

## 🟡 DURING SESSION CHECKPOINTS

### Every 30 Minutes
- [ ] Are you still working on the most important task?
- [ ] Have you exceeded file line limits?
- [ ] Are you writing tests for new logic?

### Before Any Major Change
- [ ] Does this follow the Model Router pattern?
- [ ] Will this break existing tests?
- [ ] Is this change documented in `.kimi/context.md`?

### After Any API Integration
- [ ] Is rate limiting implemented?
- [ ] Is cost tracking implemented?
- [ ] Is retry logic with exponential backoff implemented?
- [ ] Is there a mock for testing?

---

## 🔴 POST-SESSION CHECKLIST (Do This Before Stopping)

### Step 1: Quality Gates (3 min)
```bash
npm run typecheck
npm run lint
npm run test
```
- [ ] TypeScript compiles with zero errors
- [ ] ESLint passes
- [ ] All tests pass (or known failures documented)

### Step 2: Documentation (3 min)
- [ ] Update `docs/operations/CHANGELOG.md` with changes
- [ ] Update `.kimi/context.md` with current state
- [ ] Update `docs/operations/agent-memory.md` with new blockers/decisions
- [ ] Update todo list — mark done, add new items

### Step 3: Commit (2 min)
```bash
git add -A
git commit -m "type(scope): description"
```
- [ ] Commit message follows conventional commits
- [ ] All changes staged
- [ ] No secrets in diff

### Step 4: Session End Script (1 min)
```bash
node scripts/session-end.js "What was accomplished this session"
```

### Step 5: Handoff Note (1 min)
Write in `.kimi/context.md` under `## Next Session`:
- What was done
- What's blocked
- What's the very next step
- Any API keys that need renewal

---

## 📋 Emergency Protocol

### If Something Breaks
1. `git stash` or revert to last known good commit
2. Document the error in `docs/operations/agent-memory.md`
3. Do NOT spend more than 30 min debugging alone — escalate

### If API Costs Spike
1. Check `src/shared/model-router/cost-tracker.ts`
2. Disable non-essential providers immediately
3. Alert in `docs/operations/agent-memory.md`
4. Switch to budget tier (DeepSeek, local models)

### If Git Is Messy
1. `git status` — understand the mess
2. `git diff` — review all changes
3. Commit what works, stash what doesn't
4. Never force push

---

## 🧠 Memory Persistence Rules

The agent (AI) has NO memory between sessions. These files ARE the memory:

| File | What It Remembers |
|------|-------------------|
| `.kimi/context.md` | Current state, recent decisions, next steps |
| `docs/operations/agent-memory.md` | Long-term decisions, blockers, architectural choices |
| `docs/operations/CHANGELOG.md` | What was built, when, why |
| `docs/operations/daily-plan.md` | Operational rhythm, routines, metrics |

**Rule**: If it's not written in one of these files, it doesn't exist for the next session.
