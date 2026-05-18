---
date: 2026-05-17
status: accepted
deciders: alex-jadecli
outcome_id: OMA1
---

# ADR — adopt Claude Managed Agents strategies (dreams, outcomes, multi-session) into the chassis

<!--
@cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md
@cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/dreams.md
@cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/sessions.md
@cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/memory.md
@cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/multi-agent.md
@cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/overview.md
@cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/onboarding.md
@cite seeds/citations/define-outcomes.md
-->

## Context

`platform.claude.com/docs/en/managed-agents/*` documents the Anthropic-hosted
**Managed Agents** runtime — a server-side harness with sessions, environments,
memory stores, dreams, and outcome-driven evaluation. The chassis in this repo
does **not** use Managed Agents as its runtime: orchestration runs on Cloudflare
Workers + Sandbox SDK with OAuth-only auth (see
`docs/decisions/2026-05-16-enterprise-control-plane.md` and the OAuth-only
invariant enforced in `src/oauth/token.ts`). Managed Agents requires
`ANTHROPIC_API_KEY`, which the chassis rejects at three layers.

But the **strategies** documented in those pages are independently valuable:
they encode the design taste of the team building Claude's own agent harness.
The operator's directive is to **adopt the patterns** without adopting the
runtime — graft proven primitives onto our existing chassis where the mapping
is clean, and explicitly defer or skip where it isn't.

This ADR enumerates 7 concrete adoptions, each mapped to an existing chassis
primitive, with named files to change or confirm.

## Adoption index

| # | Managed-Agents concept | Source doc | Chassis primitive | Action |
| :-- | :-- | :-- | :-- | :-- |
| 1 | Outcomes (`outcome_id`, rubrics) | `define-outcomes.md` | `docs/CONVENTIONS.md`, `rubrics/phase-*.md` | **Ratify** — already adopted as `(O<N>)` commit suffix |
| 2 | Dreams (memory consolidation) | `dreams.md` | `seeds/memory/heartbeat/` | **Evolve** — add periodic dream-pass over heartbeat |
| 3 | Multi-session continuity | `sessions.md`, `memory.md` | `seeds/memory/heartbeat/last-tick.md` + autoloaded `CLAUDE.md` | **Confirm** — pattern already in place |
| 4 | Memory stores as workspace docs | `memory.md` | `seeds/memory/heartbeat/`, `seeds/citations/` | **Confirm + name** — git-tracked text is our memory store |
| 5 | Multi-agent sub-task delegation | `multi-agent.md` | sub-agents in `src/agents/*` (`npm-research`, `verifier`, `crawl-curator`) | **Confirm** — three-sub-agent split mirrors the doc |
| 6 | Agent prototyping in Console | `onboarding.md` | `.claude/skills/*/SKILL.md` + `seeds/posture/session-start.xml` | **Adopt** — name SKILL.md authoring as our prototyping surface |
| 7 | Environments (containers, network) | `overview.md` | Cloudflare Worker + Sandbox SDK | **Skip-by-design** — different runtime; document the mapping for forking founders |

## 1. Outcomes — ratified, gap-close pass

**Source.** `vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md`
defines outcomes as the unit of evaluation: a named, gradeable target that
multiple sessions converge on, separate from any one task.

**Chassis primitive.** Already deeply adopted:

- `docs/CONVENTIONS.md` mandates `(O<N>)` suffix on every commit after
  2026-05-15T04:30Z (enforced by `src/lib/conventions.test.ts`).
- `rubrics/phase-{0..16}.md` encode per-phase rubrics that `npm run grade`
  consumes.
- `seeds/citations/define-outcomes.md` already extracts the source language.

**Gap-close action.** None mechanical. This ADR ratifies that the existing
`(O<N>)` discipline + rubrics chain is **the** outcome implementation for the
chassis. New outcomes should be allocated in `docs/PROJECT.md` (one section per
outcome family, `OMA*` is reserved by this ADR for managed-agents adoptions).

**Closes:** the gap a forking founder might feel reading `define-outcomes.md`
and not seeing it labelled as such in the chassis. The convention test +
rubrics directory ARE the implementation.

## 2. Dreams — evolve heartbeat with a consolidation pass

**Source.** `dreams.md` describes an async job that takes a memory store + 1–100
past session transcripts and produces a *new* memory store with duplicates
merged, stale entries replaced, and patterns surfaced. The input is never
mutated; the output is reviewable.

**Chassis primitive.** `seeds/memory/heartbeat/` is the chassis memory store
(four files: `last-tick.md`, `next-actions.md`, `decisions.md`,
`open-questions.md`). Today these are only appended/edited tick-by-tick. Over
many ticks they drift: decisions get superseded, next-actions get stale,
open-questions get answered without being closed.

**Adoption action.** Add a dream-equivalent pass:

- New skill: `.claude/skills/heartbeat-dream/SKILL.md` (NOT in this PR — this
  ADR specifies the contract; the skill lands in a follow-up under `OMA2`).
- Contract: reads `seeds/memory/heartbeat/*.md` plus the last N tick artifacts
  (TBD — likely the last 10–20 commits touching `seeds/memory/heartbeat/`),
  writes to a side file `seeds/memory/heartbeat/dream-<date>.md`, and opens a
  PR that the operator reviews before merging into the canonical four files.
- Cadence: weekly via `/schedule` (see `.claude/skills/refresh-vendors/SKILL.md`
  for the bridge pattern).
- Invariant preserved from `dreams.md`: **the input is never mutated in place.**
  The dream-pass produces a reviewable artifact; only an explicit operator
  merge updates the canonical heartbeat.

**Why this is the right mapping.** Managed-Agents dreams treat the memory
store as the durable surface that needs occasional curation by Claude itself.
Our heartbeat is the same shape (git-tracked text the operator and Claude both
edit) and exhibits the same drift problem. The dream pattern transplants
cleanly.

## 3. Multi-session agent coding — confirm pattern, document it

**Source.** `sessions.md` + `memory.md`: sessions are ephemeral but
continuity is preserved via memory stores that get auto-mounted with a note in
the system prompt telling the agent where to look.

**Chassis primitive.** Two surfaces already provide this:

1. **Autoloaded `CLAUDE.md`** at every level (user global, polyrepo, repo) —
   the rough equivalent of Managed Agents' system-prompt mount note. The
   session-start file at `seeds/posture/session-start.xml` is the load-bearing
   XML primitive the CLI consumes.
2. **`seeds/memory/heartbeat/last-tick.md`** — explicit hand-off doc updated
   at the end of each session, the rough equivalent of a per-session "what I
   learned" memory.

**Adoption action.** No file changes. This ADR confirms:

- The pattern is correct and matches Managed Agents' documented design.
- Forking founders should be pointed at the `last-tick.md` + `CLAUDE.md` pair
  as the multi-session continuity primitive (action: a follow-up `OMA3` adds
  a paragraph to `CONTRIBUTING.md`).
- The operator's 3× Max rotation (see `~/.claude/CLAUDE.md`) is a
  user-of-the-pattern, not a duplicate — rotation produces multiple sessions
  per outcome and the heartbeat is what makes them coherent.

## 4. Memory stores — name what we already have

**Source.** `memory.md` describes memory stores as workspace-scoped collections
of text addressed by path, mounted into the session container, with immutable
per-edit versions.

**Chassis primitive.** Git-tracked text under two directories:

- `seeds/memory/heartbeat/` — operational memory (decisions, next-actions).
- `seeds/citations/` — extractive memory (vendor doc citations, 15+ files).

Immutability + version history comes from git itself. The "mount note" comes
from the autoloaded CLAUDE.md.

**Adoption action.** None mechanical. This ADR names these two directories as
**the chassis memory stores**, in the Managed-Agents sense. Forking founders
should add to these directories rather than inventing new memory locations.

## 5. Multi-agent — confirm sub-agent layout

**Source.** `multi-agent.md` describes orchestrator + sub-agents with scoped
tool surfaces.

**Chassis primitive.** The chassis already runs an orchestrator + three
sub-agents (`npm-research`, `verifier`, `crawl-curator`) over the MCP bridge,
as described in `CLAUDE.md`. The three sub-agents each have a scoped tool
lane (npm registry, verifier surface, vendor crawler).

**Adoption action.** None. The shape matches. This ADR confirms the
sub-agent split is consistent with the Managed-Agents recommendation and
should not be collapsed back into a monolithic orchestrator in any future
refactor without an ADR-level reversal.

## 6. Console prototyping — map to skill authoring

**Source.** `onboarding.md` describes the Console as the visual surface for
prototyping an agent (model, system prompt, MCP servers, tools, skills) before
moving to code.

**Chassis primitive.** We don't use Console (no `ANTHROPIC_API_KEY`). The
equivalent surface in this chassis is **skill authoring**:

- `.claude/skills/{heartbeat,routines,refresh-vendors,schedule-bridge}/SKILL.md`
  — each SKILL.md is a small, prompt-shaped artifact a forking founder can
  iterate on the way they'd iterate in Console.
- `seeds/posture/session-start.xml` — the system-prompt equivalent.

**Adoption action.** Document this mapping in `CONTRIBUTING.md` (follow-up
`OMA4`): "where Managed Agents users would use Console, this chassis uses
`SKILL.md` files + `seeds/posture/session-start.xml`." Same iterative loop,
different surface.

## 7. Environments — skip-by-design

**Source.** `overview.md` describes Environments as configured container
templates with pre-installed packages and network access rules.

**Chassis primitive.** Cloudflare Worker + Sandbox SDK (see
`src/sandbox/*` and `docs/architecture.md`). The Sandbox SDK serves the
environment role. The outbound allowlist (see
`docs/decisions/2026-05-16-platform-engineering-plugin.md` and the OCP1 cloud
env-vars runbook) is the network-rules equivalent.

**Adoption action.** Skip. This is a runtime, not a strategy, and the chassis
already has a runtime. The mapping note exists in this ADR so a forking
founder reading `overview.md` does not conclude we are missing a primitive —
we just realize it in a different substrate.

## Dreams — durable visions across many days

The `dreams.md` doc surfaces a softer use of "dreams": Claude reflecting on
many sessions and producing not just deduplicated memory, but **new insights**.

For multi-day visions (operator-level "what should this codebase become over
the next 30 days?"), the chassis primitive should be:

- A new file `seeds/memory/heartbeat/visions.md` (introduced by `OMA2` along
  with the dream skill — not in this PR).
- Updated only by the dream-pass or by explicit operator commit, never by
  routine tick work.
- Read by the session-start posture so Claude has the multi-day frame, not
  just the last tick.

This is the heartbeat-equivalent of the "what patterns did Claude notice
across 50 sessions?" output that dreams produce.

## Outcomes — ratification + register OMA family

Outcomes are already the unit of work in this chassis. This ADR:

1. Allocates the `OMA*` outcome family for managed-agents adoption work.
2. Reserves `OMA1` for this ADR.
3. Pre-allocates: `OMA2` (dream skill + visions file), `OMA3` (CONTRIBUTING
   paragraph on multi-session continuity), `OMA4` (CONTRIBUTING paragraph on
   skill-authoring as Console-equivalent).
4. Closes no other gap — `define-outcomes.md` is already the most-cited
   managed-agents source in the chassis (see grep `@cite.*define-outcomes`).

## Multi-session agent coding — confirmation

The operator runs three Anthropic Max accounts in a 5-hour rotation (see
`~/.claude/CLAUDE.md`). Each rotation is a fresh Claude session with no
in-process state from the previous account. Continuity comes from:

- Autoloaded `CLAUDE.md` (three levels: `~/.claude/`, polyrepo root, this
  repo).
- `seeds/memory/heartbeat/last-tick.md` updated at end of each tick.
- The `(O<N>)` commit suffix that lets any new session search git log for
  prior work on the current outcome.

This is exactly the `sessions.md` + `memory.md` pattern, just expressed in
git + autoloaded markdown instead of API-managed memory stores. **The
adoption here is to name the pattern explicitly**, so future contributors
know not to invent a parallel continuity mechanism (e.g., a sqlite memory
DB, an external KV) when the existing one already implements the documented
strategy.

## Consequences

- **Outcome family `OMA*` is reserved.** Future PRs implementing the
  follow-ups (`OMA2..OMA4`) will land as small focused PRs.
- **No runtime code changes in this PR.** Per scope constraint: this is an
  ADR-only PR.
- **Forking founders get a map.** A reader of `platform.claude.com/managed-agents`
  who lands in this chassis can now find each of the seven concepts mapped to
  a real file or a real follow-up outcome.
- **OAuth-only invariant is unaffected.** Adopting strategies != adopting the
  runtime. `ANTHROPIC_API_KEY` remains rejected at every layer.

## References

- `vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md`
- `vendor/anthropics/platform.claude.com/docs/en/managed-agents/dreams.md`
- `vendor/anthropics/platform.claude.com/docs/en/managed-agents/sessions.md`
- `vendor/anthropics/platform.claude.com/docs/en/managed-agents/memory.md`
- `vendor/anthropics/platform.claude.com/docs/en/managed-agents/multi-agent.md`
- `vendor/anthropics/platform.claude.com/docs/en/managed-agents/overview.md`
- `vendor/anthropics/platform.claude.com/docs/en/managed-agents/onboarding.md`
- `seeds/citations/define-outcomes.md`
- `docs/decisions/2026-05-16-enterprise-control-plane.md` (OCP1)
- `docs/CONVENTIONS.md`
