---
title: seeds/memory/heartbeat — cross-session state for the heartbeat orchestrator
description: The operator-side translation of Managed-Agents `/mnt/memory/<store>/`. Heartbeat ticks read these files at start, write them at end. Git-tracked, atomic commits, no untrusted external bodies.
---

# heartbeat memory store

Per `.claude/skills/heartbeat.md` § "State boundaries". Every heartbeat
tick:

1. **Reads** `last-tick.md` + `next-actions.md` at start.
2. Optionally reads `decisions.md` (most recent N) + `open-questions.md`.
3. **Picks** the top ready action.
4. Executes (commits per-todo, opens PR with `automerge` label).
5. **Appends** a one-line entry to `decisions.md`.
6. **Overwrites** `last-tick.md` with the new state.
7. **Commits** with message `chore(memory): heartbeat tick <iso-timestamp>`.

## File semantics

| File | Lifecycle | Format |
| :--- | :--- | :--- |
| `last-tick.md` | overwritten each tick | YAML front-matter + one-paragraph summary |
| `next-actions.md` | append + reorder; pop on execute | numbered list, top = next |
| `decisions.md` | append-only | dated entries (most recent at top) |
| `open-questions.md` | append + delete (when answered) | numbered list with status |

## Invariants

- **No untrusted external bodies.** Anything sourced from `vendor/` MUST NOT
  be pasted into these files (prompt-injection surface). Reference by
  path, not by content.
- **Atomic.** Each tick is one git commit. No half-written state.
- **Pull before tick.** A fresh session runs `git pull` before reading,
  so it sees the previous tick's writes.
- **No secrets.** Never write `NEON_API_KEY`, `CLAUDE_CODE_OAUTH_TOKEN`,
  or any connection string here.

## Bootstrap

`seeds/memory/heartbeat/` was created by PR #66 (this PR) on 2026-05-15.
Before that, every "tick" re-derived state from PRs + issues + phase-gates.
With the persistence layer in place, ticks resume from `last-tick.md`.

## Read-order on tick start

Per `.claude/skills/heartbeat.md` § "Per-tick read order":

1. `docs/PROJECT.md` — Cowork manifest (what "this project" is)
2. `docs/pending.md` — 3-column live dashboard (what's blocked vs ready)
3. `docs/phase-gates.md` — phase dependency map (which phases can advance)
4. `seeds/memory/heartbeat/last-tick.md` — where the previous tick resumed
5. `seeds/memory/heartbeat/next-actions.md` — the queue

## Phase 11.C (when it lands)

Per `.claude/skills/heartbeat.md` § "Turbopuffer dream-memory plan":
entries in `decisions.md` get embedded via Voyage AI and stored in a
Turbopuffer `heartbeat` namespace. Semantic recall replaces lexical
grep. Gated on `secrets.VOYAGE_API_KEY` + `secrets.TURBOPUFFER_API_KEY`.

## See also

- `.claude/skills/heartbeat.md` — the skill that consumes this store
- `seeds/prompts/operator-2026-05-10-heartbeat.md` — the operator
  directive that birthed the store
- `vendor/anthropics/platform.claude.com/docs/en/managed-agents/memory.md`
- `vendor/anthropics/platform.claude.com/docs/en/managed-agents/dreams.md`
