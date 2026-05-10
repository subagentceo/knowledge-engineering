---
phase: 9
title: ODD rubric grader (Messages API, OAuth)
status: done
closed: 2026-05-10
issue: 13
prs:
  - 28
---

# Phase 9 — ODD rubric grader

Cites `vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md`.
**Messages API only — does NOT call the Managed Agents API.**

## Criteria

### 1. Grader exists and runs — ✅ DONE

- `scripts/grade-phase.ts` exists.
- Runs as `npm run grade -- phase-N` (live; uses Messages API + OAuth).
- `--dry-run` mode prints the grading plan without API calls (validated
  parse on phases 0, 1, 3, 6 — 4, 4, 3, 4 criteria each).
- Per-criterion pass/fail/ambiguous/skipped report with rationale.

### 2. Fresh-context grading per criterion — ✅ DONE

- Each criterion is graded with a NEW `client.messages.create({...})`
  call. No conversation history shared between criteria. Per the cited
  doc's "separate context window to avoid being influenced by the main
  agent's implementation choices".
- The prompt includes a compact **repo-state context** (file paths +
  sizes for the load-bearing files, vendor list) — enough grounding
  for the grader to decide pass/fail without seeing the full code.

### 3. Iteration cap — ✅ DONE

- `ITERATION_CAP = 5` matches the `define-outcomes.md` default.
- Each criterion retries up to 5× on JSON-parse / verdict-shape errors
  before recording an `ambiguous` verdict with the last error.

### 4. Backfill — 🟡 PARTIAL

- The grader CAN re-grade earlier phases (`npm run grade -- phase-N`
  for any N where a rubric exists). Rubrics 0-7 + 12 are populated.
- Live grading requires `CLAUDE_CODE_OAUTH_TOKEN`; CI does not have it,
  so the verify chain runs `--dry-run` only. Operator-side runs of the
  live grader are the path to backfill verification.
