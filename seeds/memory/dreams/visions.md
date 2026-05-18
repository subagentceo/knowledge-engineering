# Dreams — multi-week visions

> Long-horizon visions for the chassis. Mirrors the Anthropic managed-agents
> "dreams" concept (`vendor/anthropics/platform.claude.com/docs/en/managed-agents/dreams.md`)
> applied to operator-level intent rather than agent memory stores. Heartbeat
> ticks (`seeds/memory/heartbeat/last-tick.md`) operate on day/week scale;
> visions here operate on month/quarter scale.
>
> **Editing rule:** Append-only by default. The `heartbeat-dream` skill
> (`plugins/platform-engineering/skills/heartbeat-dream/SKILL.md`) consolidates
> by appending status deltas, not by overwriting prior entries. Operator may
> hand-edit; agents never overwrite.

---

## V1 — Merge train fully self-healing for 30 days

**Rationale.** Today the merge train still needs occasional manual
`gh pr update-branch` calls when automerge PRs stack up and a base advances.
The vision is 30 consecutive days where every automerge PR reaches `merged`
without operator intervention — branch-update, required-check retries, and
mergeability recovery all handled by the automation in `.github/workflows/`
and the `OI2` typed automerge helper.

- **Target month:** 2026-07
- **Success metric:** 30-day rolling window with zero manual
  `gh pr update-branch` / `gh pr merge` invocations in the operator's shell
  history against this repo.
- **Current status:** in flight. OI2 helper landed (PR #147); 30-day clock
  has not yet started.

---

## V2 — Chassis adopted as fork-template by ≥1 external founder

**Rationale.** The README + `CONTRIBUTING.md` already frame this as a
"forking-founder" chassis. The vision is the first external solo founder
forking this repo, swapping vendor list + seeds, and shipping a Claude-powered
product on top — without needing the operator's help past the README.

- **Target month:** 2026-09
- **Success metric:** ≥1 public fork under a non-`subagent*` org with ≥10
  commits past the fork point and a green `npm run verify` run.
- **Current status:** not started. Depends on README polish + a public launch
  signal (HN, AI Engineer, or AI Ascent fellow).

---

## V3 — AI Ascent 2026 transcripts grounded into OMA1 patterns

**Rationale.** Cherny (#11), Karpathy (#6), and Brockman (#3) at AI Ascent
2026 all surfaced patterns that map onto managed-agents primitives ADR OMA1
named. The vision is transcripts mirrored under `vendor/`, citation extracts
under `seeds/citations/`, and each pattern in OMA1 footnoted with the
matching transcript timestamp.

- **Target month:** 2026-06
- **Success metric:** 3 transcripts in `vendor/`, 3 extracts in
  `seeds/citations/`, OMA1 (or a successor ADR) cites at least one
  timestamp per transcript.
- **Current status:** not started.

---

## V4 — Sub-1-hour merge time p95 on automerge PRs

**Rationale.** Operator opens an automerge PR; it should merge within an hour
at the 95th percentile. Today the long tail is dominated by serialized
required checks + branch-update races; trimming both gets the chassis to
"open and forget."

- **Target month:** 2026-08
- **Success metric:** rolling 30-day p95 time-from-open-to-merged ≤ 60min
  for PRs labeled `automerge`, sampled via `gh pr list --search` against
  this repo.
- **Current status:** in flight. Baseline not yet measured.

---

## V5 — Zero red CI on `main` for 7 consecutive days

**Rationale.** The verify chain (`citations`, `tdd`, `conventions`,
`coverage`) plus the org-wide required checks should be stable enough that
`main` stays green for a full week without any post-merge red runs.

- **Target month:** 2026-06
- **Success metric:** 7 consecutive days where the `main` branch has zero
  failing GitHub Actions runs (any workflow).
- **Current status:** in flight. Recent main commits are green; clock
  resets on any red run.

---

## How visions advance

1. Each heartbeat tick (`/loop`/`/schedule`) may propose vision deltas — new
   visions, status changes, or sunset notes. The `heartbeat-dream` skill
   handles the consolidation: read the last 3 ticks, propose deltas, **append**
   here. Never overwrite an existing vision; if a vision is obsolete, add a
   `**Sunset YYYY-MM-DD:**` line under it.
2. When a vision's success metric is met, append a `**Achieved YYYY-MM-DD:**`
   line and leave the entry in place for historical record.
3. New visions get the next free `V<N>` ID. IDs are stable forever.
