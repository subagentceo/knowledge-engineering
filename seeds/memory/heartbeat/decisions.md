---
title: heartbeat decisions log
description: Append-only log of decisions the orchestrator made, with date + tick + reasoning. Most recent at top. Replaces the operator's role as "the person who remembers why we did X."
---

# Decisions log

## 2026-05-15 — tick 2 (execute next-actions #1)

### D5. Two-bug fix in `scripts/crawl-vendors.ts`; vendor markdown re-sync deferred

**Decision:** Ship the code fix (`page_cap` sentinel + relative-URL resolution) and the four config updates in this PR. Do NOT include the resulting vendor markdown re-sync content in the same PR.

**Reasoning:**
- The smoke test locally produced ~317 new vendor files (twilio +200, sentry +117). Mixing them with the code fix would expand the PR from a clean 5-file code review to a 300+-file content review.
- PR #64 (the vendor re-sync from earlier this session) is still open and operator-driven. Adding more vendor content here would conflict.
- A follow-up tick or PR can run `npm run crawl:vendors` against the fixed code and produce a clean content-only commit.

**Reversible:** Yes; the markdown is reproducible from the source.

### D6. Sift remains "miss" — distinct vendor-specific bug

**Observation:** After the two fixes, twilio and sentry both unblocked cleanly. Sift's llms.txt parses to 674 links, all pass relative-URL resolution to absolute, but 0 pass the `allow_prefixes: ["https://sift.com/developers/"]` filter. This means sift's llms.txt actually points to URLs on different paths (likely `sift.com/api/...` or similar).

**Decision:** Don't fix sift in this tick — it requires inspecting the actual link URLs and either broadening the allowlist or pointing at a different llms.txt source. Logged as a new entry on the queue.

### D7. brave-search needs sitemap fallback — Phase 13.B O2 anchor

**Observation:** `brave-search` returned `no valid llms.txt found in 2 candidate(s)`. Their site doesn't publish llms.txt at the configured URLs. The repo already has `sitemap_xml_sources` and `html_index_sources` mechanisms (used by openfeature and anthropic-engineering respectively).

**Decision:** Add a sitemap source to brave-search's crawl.json — separate tick (it's in the queue as action #3).

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
