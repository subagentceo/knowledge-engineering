# ADR: Adopt Anthropic managed-agents "dreams" pattern for long-horizon visions (OMA2)

- **Status:** accepted
- **Date:** 2026-05-17
- **Deciders:** alex-jadecli
- **Outcome ID:** OMA2
- **Supersedes / refines:** OMA1 (2026-05-17 — managed-agents primitive mapping)

## Context

ADR OMA1 mapped the Anthropic managed-agents primitives — outcomes, memory,
sessions, environments, vaults — onto this chassis and named "dreams" as a
follow-up. The upstream doc is mirrored at
`vendor/anthropics/platform.claude.com/docs/en/managed-agents/dreams.md`.

Upstream dreams are an asynchronous job that reads a pre-existing **memory
store** plus 1-100 past **sessions** and produces a **new** reorganized
memory store. The input store is never modified; the output is a separate
artifact the operator can accept or discard.

The chassis already has a short-horizon memory equivalent at
`seeds/memory/heartbeat/` — day/week-scale "what did the last tick decide"
notes. What it lacks is the month/quarter-scale layer: long-horizon visions
that successive heartbeat ticks should serve. The upstream dreams pattern
maps cleanly onto that gap.

## Decision

1. Introduce `seeds/memory/dreams/visions.md` as the canonical long-horizon
   vision store. Seeded with 5 visions (`V1`–`V5`) covering merge-train
   self-healing, external fork adoption, AI Ascent 2026 grounding, p95
   merge time, and 7-day green-main streak.
2. Each vision has a stable `V<N>` ID, a rationale, target month, success
   metric, and current status. IDs are stable forever; the store is
   **append-only** — status deltas, achievements, and sunsets are appended
   under the existing entry, never overwriting it. This mirrors the
   upstream rule that the input store is never modified.
3. Add a `heartbeat-dream` skill at
   `plugins/platform-engineering/skills/heartbeat-dream/SKILL.md` that
   consolidates heartbeat ticks into vision deltas. The skill: reads the
   last 3 ticks, reads the current visions store, proposes deltas
   (surfacing destructive ones to the operator first), appends them, and
   commits with an outcome-tagged subject.
4. Register the new skill in
   `plugins/platform-engineering/.claude-plugin/plugin.json`.

## Mapping to upstream dreams

| Upstream dreams concept | Local equivalent |
|---|---|
| Input memory store (immutable) | `seeds/memory/dreams/visions.md` prior content |
| Past session transcripts | Last 3 ticks under `seeds/memory/heartbeat/` |
| Asynchronous dreaming job | `heartbeat-dream` skill invocation |
| Output memory store (separate, reviewable) | Appended block under each `V<N>` — operator reviews via diff |
| `dreaming-2026-04-21` beta header | N/A — local pattern, not the API |

The chassis is not (yet) calling the upstream dreams API; this ADR adopts
the **discipline** the API encodes. A future ADR can wire the actual API
once the operator has Research Preview access (the upstream doc gates
behind `claude.com/form/claude-managed-agents`).

## Follow-ups

- When operator gets dreams API access, evaluate whether the local
  `heartbeat-dream` skill should additionally call the API to dream over
  real session transcripts (not just heartbeat tick notes).
- Wire a routine (`/schedule` weekly?) that invokes `heartbeat-dream` so
  vision consolidation does not depend on the operator remembering to ask.
- Cross-link visions to outcome IDs: when an outcome closes a vision's
  success metric, the closing commit should reference both the `O<N>` and
  the `V<N>`.

## Citations

- [`vendor/anthropics/platform.claude.com/docs/en/managed-agents/dreams.md`](../../vendor/anthropics/platform.claude.com/docs/en/managed-agents/dreams.md) — upstream source
- [`vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md`](../../vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md) — outcome doctrine
- [`seeds/citations/define-outcomes.md`](../../seeds/citations/define-outcomes.md) — local extract
- [`seeds/memory/dreams/visions.md`](../../seeds/memory/dreams/visions.md) — the new store
- [`plugins/platform-engineering/skills/heartbeat-dream/SKILL.md`](../../plugins/platform-engineering/skills/heartbeat-dream/SKILL.md) — the consolidation skill
