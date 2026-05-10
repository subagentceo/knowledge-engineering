---
phase: 10
title: Multi-agent decomposition refinement
status: stub
---

# Phase 10 — Multi-agent decomposition refinement

Cites `vendor/anthropics/platform.claude.com/docs/en/managed-agents/multi-agent.md`.

## Criteria

### 1. Three sub-agents declared

- `src/agent/run.ts` declares three sub-agents: `npm-research`, `verifier`,
  `crawl-curator`.
- Each has a one-line outcome and a citation-cite-required rubric.

### 2. Same allowlist (no tool-def explosion)

- All three sub-agents declare `tools: ["codemode", "search_tools"]`.

### 3. Per-sub-agent rubric satisfied

- Each sub-agent's per-task outcome is asserted via `scripts/grade-phase.ts`.
