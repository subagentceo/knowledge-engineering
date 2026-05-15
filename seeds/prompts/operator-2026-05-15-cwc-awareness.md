---
kind: operator-prompt-seed-cwc-awareness
date: 2026-05-15
verbatim: false
note: |
  Operator directive 2026-05-15 (mid-session, after PRs #87/#88 merged):
  add 5 awareness items + a long-running-agents decomposition target to
  the heartbeat queue. Queued per user-input.md discipline; decomposed
  by next tick.
status: queued
parent: operator-2026-05-10.md
---

# Operator seed — cwc-long-running-agents + awareness queue

## Directive (paraphrased)

> we don't want to install all of these plugins, but we want to be aware
> of them. add tasks, subtasks, todos to decompose usefulness out of
> [cwc-long-running-agents]. you are working through completing all
> open issues.

## Awareness items (industry plugins — NOT installed)

| Repo | What it is | Relevance to chassis |
| :--- | :--- | :--- |
| [anthropics/claude-for-legal](https://github.com/anthropics/claude-for-legal) | Industry plugin for legal workflows | Reference for industry-specific skill packaging; we don't ship a legal product |
| [anthropics/financial-services](https://github.com/anthropics/financial-services) | Industry plugin for FSI workflows | Reference; same — reusable patterns may exist for compliance/audit |
| [anthropics/healthcare](https://github.com/anthropics/healthcare) | Industry plugin for healthcare | Reference; subprocessor/PHI handling patterns |

**Action:** add these to `seeds/citations/industry-plugins.md` as a note-only citation source. Do NOT install. Do NOT clone. Forking founders in those verticals can reference them directly.

## Decompose: `anthropics/cwc-long-running-agents`

URL: `https://github.com/anthropics/cwc-long-running-agents/blob/main/README.md`

Specific files of interest:

- `claude-code-config/.claude/agents/evaluator.md` — sub-agent for evaluation
- `claude-code-config/.claude/hooks/commit-on-stop.sh` — auto-commit on session stop (we have a similar `stop-hook-git-check.sh`)
- `claude-code-config/.claude/hooks/kill-switch.sh` — emergency stop pattern
- `claude-code-config/.claude/hooks/steer.sh` — mid-session steering
- `claude-code-config/.claude/hooks/track-read.sh` — file-read provenance tracking
- `claude-code-config/.claude/hooks/verify-gate.sh` — pre-action verification gate
- `claude-code-config/.claude/CLAUDE.md` — project-level CLAUDE.md
- `claude-code-config/.claude/settings.json` — settings + hook wiring
- `claude-code-config/README.md` — overview

### Proposed decomposition (for next tick)

**T1** — Crawl `cwc-long-running-agents` as `vendor/cwc-long-running-agents/` so we own the citation source.

**T2** — Compare-and-contrast our chassis vs theirs:

- `track-read.sh` — do we track file reads? (No — could be useful for citation provenance)
- `verify-gate.sh` — pre-action verification — we have `npm run verify` but it's reactive, not gate-based
- `steer.sh` — mid-session steering — operator-prompt-driven, similar to our user-input.md discipline
- `evaluator.md` sub-agent — we have `grade-phase.ts` (rubric grader); evaluator may be a runtime variant
- `commit-on-stop.sh` — we have `.claude/stop-hook-git-check.sh` (warns on uncommitted state)
- `kill-switch.sh` — emergency stop — no current equivalent; could be useful for runaway crawls or budget exhaustion

**T3** — Adopt the bits that align with our chassis discipline:

- Likely: `verify-gate.sh` pattern → wire into `npm run verify` as a pre-tool hook (extending today's reactive model)
- Maybe: `track-read.sh` → extends `verify:citations` with run-time read provenance
- Skip: `kill-switch.sh` unless we hit a real runaway scenario

**T4** — Open issue(s) per adoption decision. Each becomes its own PR.

## Awareness items (reference workshops + tools)

| Repo | What it is | Why mentioned |
| :--- | :--- | :--- |
| [anthropics/cwc-workshops](https://github.com/anthropics/cwc-workshops/blob/main/README.md) | Workshop materials (rightmodel, agent-decomposition, how-we-claude-code, ship-your-first-managed-agent, agent-battle, agents-that-remember, eval-driven-agent-development, production-ready-agent) | Reference patterns for skill packaging + multi-agent decomposition |
| [anthropics/swift-markdown](https://github.com/anthropics/swift-markdown) | Swift package for parsing/building/editing Markdown | Cross-language reference — our chassis is TS/JS; not directly useful but the immutable-tree-with-CoW pattern is interesting |
| [anthropics/headvis](https://github.com/anthropics/headvis) | Visualization tool for attention heads in transformer LMs | ML interpretability — not chassis-relevant; reference if/when we surface model-internals analysis |

**Action:** add to `seeds/citations/anthropic-reference-repos.md` as a note-only citation. Forking founders who need these patterns reference them directly.

## Heartbeat next-actions queue update (proposed)

After this seed lands, the next tick adds:

1. **Crawl `cwc-long-running-agents`** as a new vendor (T1)
2. **Compare hooks** between our `.claude/` and theirs (T2) — produces a comparison report at `docs/comparisons/cwc-long-running-agents.md`
3. **Adopt `verify-gate.sh` pattern** — wire into `npm run verify` (T3) — only if T2 finds clear wins
4. **Awareness citations** — small docs PR creating `seeds/citations/{industry-plugins,anthropic-reference-repos}.md`

## Closes / refs

Refs #49 (Phase 14 docs refresh — this seed informs the eventual CLAUDE.md content)
Refs O1, O2, O3 (the 3 docs landing in PR-this-PR)

## Citations

- `vendor/anthropics/code.claude.com/docs/en/agent-sdk/user-input.md` — queue discipline
- `vendor/anthropics/code.claude.com/docs/en/agent-sdk/todo-tracking.md` — TodoWrite pattern
- `vendor/anthropics/code.claude.com/docs/en/agent-sdk/agent-loop.md` — loop structure
- `docs/CONVENTIONS.md` — outcome-driven Conventional Commits
- `seeds/memory/heartbeat/README.md` — heartbeat memory layout
