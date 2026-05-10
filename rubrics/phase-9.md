---
phase: 9
title: ODD rubric grader (Messages API, OAuth)
status: stub
---

# Phase 9 — ODD rubric grader

Cites `vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md`.
**Messages API only — does NOT call the Managed Agents API.**

## Criteria

### 1. Grader exists and runs

- `scripts/grade-phase.ts` exists and runs as `npm run grade -- phase-<N>`.
- It reads `rubrics/phase-<N>.md` and emits a per-criterion pass/fail report.

### 2. Fresh-context grading per criterion

- For prose-only criteria, the grader makes a Messages API call (OAuth)
  with a fresh context window per criterion (per `define-outcomes.md`'s
  "separate context window to avoid being influenced").

### 3. Iteration cap

- The `iteration` counter caps at 5 per `define-outcomes.md` defaults.
- Exceeding the cap exits non-zero and prints the current report.

### 4. Backfill

- All earlier phases' rubrics are re-graded mechanically and pass.
