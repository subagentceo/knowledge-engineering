---
phase: 15
title: Codify project management (Cowork-style)
status: in-progress
issue: 50
prs:
  - 45  # this PR (Phase 15.A + 15.B)
---

# Phase 15 — Codify project management

Per the operator's request: codify project management as a first-class
artifact, mapping each Cowork primitive to a concrete repo artifact,
and surface the operator-pending action queue clearly.

Cited from:
- `vendor/anthropics/claude.com/docs/cowork/guide/projects.md`
- `vendor/anthropics/claude.com/docs/cowork/guide/dispatch.md`
- `vendor/anthropics/claude.com/docs/cowork/guide/plugins.md`
- `vendor/anthropics/platform.claude.com/docs/en/managed-agents/{agent-setup,sessions,multi-agent,skills,memory,dreams}.md`
- `vendor/anthropics/platform.claude.com/docs/en/build-with-claude/{prompt-caching,batch-processing,citations,embeddings}.md`
- `vendor/anthropics/code.claude.com/docs/en/agent-sdk/*` (29 files)
- `vendor/anthropics/code.claude.com/docs/en/chrome.md`

## Sub-phases

| Sub | Status | What |
|---|---|---|
| 15.A | ✅ this PR | `docs/PROJECT.md` — Cowork-style project manifest |
| 15.B | ✅ this PR | `docs/pending.md` — live dashboard of pending operator + agent actions |
| 15.C | ✅ this PR | `.claude/skills/heartbeat.md` updated with Cowork→repo mapping + read-order |
| 15.D | 🟡 follow-up | `scripts/verify-project.ts` — assert PROJECT.md sections + pending.md freshness; chain into `verify` |
| 15.E | 🟡 follow-up | `scripts/render-pending.ts` — auto-generate `pending.md` from GH issue labels (`needs:operator`, `kind:agent-followup`, `kind:operator-runbook`) |

## Criteria

### 1. PROJECT.md exists with all Cowork sections — ✅ DONE

- `docs/PROJECT.md` ships with these sections (each cited):
  Description, Folders, Instructions, Links, Memory, Dispatch, Plugins,
  Managed-Agents primitive mapping, Build-with-Claude primitive mapping,
  Project-management discipline, Web-orchestrator bootstrap, Forking.
- Every section cites the specific Cowork or Managed-Agents doc that
  grounds the mapping.

### 2. pending.md surfaces 3-column dashboard — ✅ DONE

- `docs/pending.md` ships with three explicit columns:
  - Column 1: Operator browser-driven (Claude-in-Chrome runbooks; 6 rows)
  - Column 2: Operator CLI-driven (3 trigger-action pairs)
  - Column 3: Autonomous agent follow-ups (10+ rows: phase 12, 13, 14, 15)
- Suggested execution order included.
- "How to update" instructions included.

### 3. Heartbeat skill maps to Cowork Dispatch — ✅ DONE

- `.claude/skills/heartbeat.md` updated to make explicit:
  - "This skill IS our Dispatch" with citation to `cowork/guide/dispatch.md`
  - Read-order on every tick: PROJECT.md → pending.md → next-actions.md
  - Each PR is a Dispatch child task
  - Two-surface dispatch model preserved (heartbeat + claude-code-action)

### 4. Web-orchestrator bootstrap pattern surfaced — ✅ DONE

- `docs/PROJECT.md` includes a "Web-orchestrator bootstrap" section with:
  - Files to paste into claude.ai Opus 4.7 1M context
  - Constraint envelope (no shell, can read GH via Chrome, can drive runbooks)
  - Handoff protocol (web orchestrator posts comments → CLI heartbeat picks up)
- Cross-references RUNBOOK.md (issue #49, deferred) for the productized one-shot bootstrap.

### 5. verify:project script + label-driven render — 🟡 DEFERRED (15.D + 15.E)

- `scripts/verify-project.ts`: asserts PROJECT.md has all expected
  sections; asserts pending.md `last-reviewed` is ≤14 days; chained
  into `verify`.
- `scripts/render-pending.ts`: queries GH for issues labeled
  `needs:operator` / `kind:agent-followup` / `kind:operator-runbook`;
  rebuilds pending.md from the live state.
