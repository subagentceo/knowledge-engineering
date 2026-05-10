---
slug: define-outcomes
source: https://platform.claude.com/docs/en/managed-agents/define-outcomes.md
local: vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md
drives: ODD/rubric layer (Phase 9)
---

# define-outcomes — extract

## Header tree

- # Define outcomes
  - ## Create a rubric
  - ## Create a session with an outcome
  - ## Outcome events
    - ### Define outcome user event
    - ### Outcome evaluation start
    - ### Outcome evaluation ongoing
    - ### Outcome evaluation end
  - ## Checking on outcome status

## Plan-relevant pull quotes

> When you define an outcome, the harness automatically provisions a *grader*
> to evaluate the artifact against a rubric. **It leverages a separate
> context window to avoid being influenced by the main agent's
> implementation choices.**

> A rubric is a markdown document describing per-criterion scoring. The
> rubric is required.

> **Structure the rubric as explicit, gradeable criteria**, such as "The CSV
> contains a price column with numeric values" rather than "The data looks
> good." The grader scores each criterion independently, so vague criteria
> produce noisy evaluations.

## Why this drives Phase 9

Phase 9 (`scripts/grade-phase.ts`) borrows the **separate context window**
discipline and the **explicit, gradeable criteria** discipline. We do NOT
call the Managed Agents API — we use the Messages API over OAuth with a
fresh context per criterion, and assert each `rubrics/phase-<N>.md`
criterion mechanically.
