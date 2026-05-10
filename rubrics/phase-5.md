---
phase: 5
title: Refresh ergonomics
status: done
closed: 2026-05-10
issue: 9
prs:
  - 22  # verify:freshness landed in Phase 2.A
  - 25  # this PR (refresh-vendors skill)
---

# Phase 5 — Refresh ergonomics

Most of the work landed early in Phase 2.A. This rubric documents what's
done and what remains:

## Criteria

### 1. Freshness check is wired — ✅ DONE (Phase 2.A; PR #22)

- `npm run verify:freshness` runs as part of the top-level `verify` chain.
- Per-vendor staleness:
  - 0–13d: `fresh` ✓
  - 14–29d: `warn` ⚠ (non-fatal)
  - 30d+: `error` ✗ (exits non-zero)
- Implementation: `scripts/verify-freshness.ts` parses each
  `vendor/<name>/urls.md` `last_crawled` front-matter.

### 2. `/schedule` template emits the expected text — ✅ DONE (this PR)

- `.claude/skills/refresh-vendors.md` exists.
- Activating it emits a `/schedule` SlashCommand of the documented form
  (`every Monday 09:00 run "npm run crawl:vendors && verify:freshness
  && open auto-PR"`).
- Cited from `code.claude.com/docs/en/commands.md` and
  `code.claude.com/docs/en/agent-sdk/slash-commands.md`.

### 3. Verify still green — ✅ DONE

- `npm run verify` exits 0 across the full chain.
