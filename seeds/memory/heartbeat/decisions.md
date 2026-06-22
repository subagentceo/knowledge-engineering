---
title: heartbeat decisions log
description: Append-only log of decisions the orchestrator made, with date + tick + reasoning. Most recent at top. Replaces the operator's role as "the person who remembers why we did X."
---

# Decisions log

## 2026-06-19 — coworker naming canonicalization (kill `pm-agent` / `product-management-agent`)

### Canonical rule

There are exactly **two** product/project coworker identities. Never use the `pm` shorthand or the legacy `-agent` suffix for either:

- **`project-management-coworker`** — execution tracker (nightly review, queue/type-safety audits, dependency tracking). Reports to product-management. Trigger `/project-management-coworker`.
- **`product-management-coworker`** — lead PM / chief-of-staff (roadmap, specs, prioritization, routing). Trigger `/product-management-coworker`.

Banned aliases: `pm-coworker`, `pm-agent`, `/pm-agent`, `product-management-agent`, `/product-management-agent`, and bare `pm` as a role.

### What was changed (this tick)

- Removed the `/pm-agent` shorthand + `pm-agent (queue reader/claimer)` from `dispatch-coworker/SKILL.md` (both `.claude/` and `cowork/skills/claude/` copies) → `/product-management-coworker`.
- Renamed `product-management-agent` → `product-management-coworker` across active identity/trigger/reference text: the product-management-coworker SKILL.md frontmatter (`name`, `Trigger`, inbox) — which still carried a stale `product-management-agent` name and a `# TODO rename` — plus the legacy agents-tier skill, sibling agent ROUTE targets (sales/design/data), `apps/mail/AGENTS.md`, `contracts.ts` comments, and the operations negative-trigger line.
- `cowork/agents/manifest.json`: logical `id` + `trigger_phrase` → `product-management-coworker`.
- Completed earlier in the same session: eliminated all `pm-coworker` aliases in scheduled-task prompts, `dispatch-coworker`, a stale skill copy, and `data`/`finance` queue `from` fields.

### Deliberately left as provenance / unavoidable

- Immutable completed-transition `owner` fields and the dead `product-management-agent.jsonl` / `pm-coworker.jsonl` history in queues/mailboxes — they record what actually happened; rewriting them falsifies provenance.
- Two **path** fields in `agents/manifest.json` (`skill`, `test`) still name the physical `product-management-agent/` dir + test file. The sandbox mount allows create but **not delete**, so the dir cannot be renamed; the paths resolve to real files and the coworkers/ tier is the canonical surface regardless.
- `pm_room` (Zoom scope), `pm_relevance` (SQL column), third-party `/pm-tool` URLs, and `<pm_agent_identity>` in the user `structured-prompt-*` skills (that skill's own internal tag) — not aliases of these coworkers.

**Reversible:** Yes — all string edits; no data deleted.

## 2026-05-18 — tick 16 (instrumentation + roving reviewer + submodule discard)

- 2026-05-18 — ORC3 roving-reviewer skill landed as cf7aa6d (#241). Superseded source PR #225 (3 merge-noise commits dropped).
- 2026-05-18 — OHYG1 supersedes third_party/-submodule attempts. Closed PRs #191, #192, #193 as DISCARD; future fix is OHYG2 (.gitattributes + SOURCES.json + citation-guard rejection).
- 2026-05-18 — OINST1 landed as e7bf14e (#243). Tracked infra/cloudflare/package-lock.json, bumped frontend 0.1.0→0.2.0 + cloud-agent 0.0.1→0.1.0. Root not bumped (release-please owns it).

## 2026-05-15 — tick 7 (audit + close the Neon CI gap)

### D8. Auto-merge gap has two layers; PR #72 closes layer 1; layer 2 is operator-pending

**Decision:** Treat the operator's "PRs merged without full green CI" complaint as having two distinct root causes; fix the agent-actionable layer (Layer 1 — Create Neon Branch genuinely fails); document the operator-actionable layer (Layer 2 — branch protection not in place).

**Reasoning:** Audit of 7 merged PRs today (#60, #63, #65, #66, #67, #69, #70) showed Create Neon Branch was `failure` on every one. Two causes acted together: the check was actually broken (Layer 1 — fixed by PR #72) AND it wasn't required (Layer 2 — needs `setup:branch-protection` to run, which is gated on operator PAT runbook #37).

**Reversible:** Yes. Layer 1 = code; Layer 2 = config that can be added later.

### D9. PR #72 ws-constructor fix is the actual root cause; PR #69's retry stays as a complementary layer

**Decision:** Keep PR #69's `warmConnection()` retry in place even after PR #72 lands. The two are complementary: PR #72 makes the WebSocket connect possible; PR #69 absorbs any genuine cold-start race that may remain.

**Reasoning:** PR #69 alone wasn't sufficient — retrying a missing-constructor call 5 times still fails. But after PR #72 wires the constructor, the connect actually works, and any post-connect cold-start delay (Neon compute warming up) is then absorbed by the retry. Defense in depth.

**Reversible:** Yes. The retry costs 1 extra `SELECT 1` on the warm path.

**Verification (post-merge of PR #72):** PRs #64, #62, #59 all posted Neon Schema Diff comments showing `vendor_pages` cleanly added vs production — the first successful end-to-end Phase 13.B+ O8 runs since PR #58 wired the design in.

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
