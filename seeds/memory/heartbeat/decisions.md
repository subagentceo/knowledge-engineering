---
title: heartbeat decisions log
description: Append-only log of decisions the orchestrator made, with date + tick + reasoning. Most recent at top. Replaces the operator's role as "the person who remembers why we did X."
---

# Decisions log

## 2026-05-15 — tick 1 (bootstrap)

### D1. No GHA cron for heartbeat — webhook-only trigger surface

**Decision:** Heartbeat wakes only on `<github-webhook-activity>` events
from subscribed PRs and on operator `@claude` mentions (via existing
`.github/workflows/claude.yml`). No new `.github/workflows/heartbeat.yml`
cron added.

**Reasoning:** Per operator guidance "find it in the repo" and the
repo's documented orchestration pattern:

- `.claude/skills/heartbeat.md` § "When to invoke" lists triggers; no
  cron is mentioned as required.
- `.claude/skills/routines.md` documents `/loop` and `/schedule` as the
  in-Claude scheduling surface — operator-driven from a session, not a
  CI cron.
- `osv-scanner.yml` is the only existing scheduled workflow; pattern
  exists but adding a heartbeat cron would invent infrastructure
  beyond what's documented.
- Webhook-driven heartbeat covers all PR-derived work; quiet periods
  are absorbed by operator `@claude` mentions or fresh sessions.

**Reversible:** Yes — adding a cron later is a one-file PR.

### D2. First-tick scope = bootstrap-only

**Decision:** Tick 1 creates `seeds/memory/heartbeat/` with seeded
state files (this PR #66). It does NOT execute the top next-action
(llms-txt parser fix) in the same tick.

**Reasoning:** The bootstrap surface should be reviewable in isolation
— mixing it with the parser fix would expand scope. Future ticks pop
the queue.

**Reversible:** Yes.

### D3. Pending.md is stale (2026-05-10 last-reviewed)

**Observation, not action:** `docs/pending.md` was last reviewed
2026-05-10 and references issues #39–#50. Since then we've shipped
PRs #56–#65 covering substantial Phase-13.B+ work that may have closed
several of those issues. The phase-gates Summary table also needs the
Phase 14 row.

**Decision:** Defer a refresh of `pending.md` to a separate tick — it's
not blocking, and refreshing would touch issue numbers that need GH
verification first. Capture as a future action.

**Reversible:** Yes; this is a note, not a write.

### D4. Heartbeat reads `docs/phase-gates.md` for status, not GH project board

**Decision:** Until `npm run setup:project` runs (operator-gated on
PAT from runbook `github-pat.md`), the heartbeat uses
`docs/phase-gates.md` as its authoritative status surface. Phase 11.C
(Turbopuffer semantic memory) further alters this.

**Reasoning:** Phase 15.B established `pending.md` as the dashboard;
`phase-gates.md` is the dependency map. The GH Project doesn't exist
yet (operator action #37 pending).

**Reversible:** Yes; switch to project-board reads after setup:project
completes.
