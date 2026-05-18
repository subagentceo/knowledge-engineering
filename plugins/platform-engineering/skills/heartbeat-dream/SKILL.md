---
name: heartbeat-dream
description: >
  Consolidate recent heartbeat ticks into the long-horizon visions store
  at seeds/memory/dreams/visions.md. Mirrors the Anthropic managed-agents
  "dreams" concept applied to operator-level intent. Use after the last
  3 heartbeat ticks have landed, when proposing status deltas to existing
  visions, or when surfacing a new multi-week vision from recent activity.
license: Apache-2.0
compatibility: Designed for repos that adopt the heartbeat memory pattern at seeds/memory/heartbeat/. Portable but assumes the visions.md append-only convention from OMA2.
metadata:
  author: alex-jadecli
  version: "0.1.0"
---

# When to invoke

- After the last 3 heartbeat ticks have landed and you want to roll their
  signal up to month/quarter scale.
- When proposing a status delta to an existing `V<N>` vision (in flight →
  achieved, in flight → sunset, not started → in flight).
- When recent activity surfaces a new multi-week vision worth recording.
- Before an ADR that references long-horizon intent — to make sure the
  vision is captured in the canonical store first.

# Steps

1. **Read the last 3 heartbeat ticks** under `seeds/memory/heartbeat/`
   (start with `last-tick.md`, then walk back via the dated archive). Note
   recurring themes, blockers, and any explicit operator framing of
   "long-term" or "multi-week" intent.
2. **Read the current `seeds/memory/dreams/visions.md`** end to end. List
   each `V<N>` with its current status. Do not skim — the append-only
   convention means historical context matters.
3. **Propose deltas.** For each vision, decide: no change / status update /
   sunset / achieved. Separately, decide whether any new vision (`V<N+1>`)
   should be opened from the heartbeat signal. Surface the proposal to the
   operator first if any delta is destructive (sunset) or introduces a new
   vision; status updates on existing visions can proceed.
4. **Append, never overwrite.** Add `**YYYY-MM-DD status:**`,
   `**Achieved YYYY-MM-DD:**`, or `**Sunset YYYY-MM-DD:**` lines under the
   relevant `V<N>` entry. New visions get appended at the bottom with the
   next free `V<N>` ID. IDs are stable forever — never renumber.
5. **Commit** with subject ending in the relevant outcome ID (e.g. `(OMA2)`
   for the initial dreams adoption; later consolidations get their own
   outcome ID per `docs/CONVENTIONS.md`). Cite both the upstream dreams
   doc and `seeds/citations/define-outcomes.md` in the commit body.

# Citations

- [`vendor/anthropics/platform.claude.com/docs/en/managed-agents/dreams.md`](../../../../vendor/anthropics/platform.claude.com/docs/en/managed-agents/dreams.md) — upstream "dreams" doctrine: input store untouched, output is a reorganized store; the same input-immutable / append-output rule applies here.
- [`vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md`](../../../../vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md) — outcome discipline that vision success metrics borrow from.
- [`seeds/citations/define-outcomes.md`](../../../../seeds/citations/define-outcomes.md) — local extract.
- [`seeds/memory/dreams/visions.md`](../../../../seeds/memory/dreams/visions.md) — the store this skill writes to.
- [`docs/decisions/2026-05-17-managed-agents-dreams.md`](../../../../docs/decisions/2026-05-17-managed-agents-dreams.md) — ADR OMA2.
