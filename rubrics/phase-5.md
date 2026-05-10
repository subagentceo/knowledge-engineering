---
phase: 5
title: Refresh ergonomics
status: stub
---

# Phase 5 — Refresh ergonomics

## Criteria

### 1. Freshness check is wired

- `npm run verify:freshness` is part of the `verify:mcp` chain.
- Touching `vendor/anthropics/urls.md` to 30 days ago emits a warning
  (non-fatal); 60 days ago emits an error (fatal).

### 2. `/schedule` template emits the expected text

- Activating `.claude/skills/refresh-vendors.md` causes the planner to emit
  a SlashCommand of the form
  `/schedule "every Monday 09:00 run npm run crawl:vendors and open a PR with the diff"`.

### 3. Verify still green

- `npm run verify` exits 0 across the full chain.
