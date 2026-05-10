---
phase: 1
title: Crawler infrastructure
status: done
closed: 2026-05-10
issue: 5
prs:
  - 19   # Phase 1.A: lib helpers + tests
  - 20   # Phase 1.B: crawler CLI + 12 crawl.json + anthropics validation
  - 21   # Phase 1.C: this closeout
---

# Phase 1 — Crawler infrastructure

Add deps, implement the offline crawler library, validate end-to-end on
`anthropics`. Don't commit crawl results yet. `npm run verify` still green
at 12 tools.

## Criteria

### 1. Crawler library compiles and unit tests pass — ✅ DONE (PR #19)

- `scripts/lib/llms-txt.ts`, `scripts/lib/url-to-path.ts`,
  `scripts/lib/transforms.ts` exist (PR #19; `scripts/crawl-vendors.ts`
  added in PR #20).
- `npm run lint` passes (tsc --noEmit).
- 14 transforms test cases + 9 url-to-path + 5 llms-txt = **28 assertions
  in 3 new test files**, plus the existing env-sanitize (3) = 31 total.
- `npm run verify:libs` runs all of them via the new
  `scripts/lib/run-tests.ts` discoverer. Wired into the top-level
  `verify` chain.

### 2. End-to-end on the cleanest case — ✅ DONE (PR #20)

- `npx tsx scripts/crawl-vendors.ts --vendor anthropics` produces
  `vendor/anthropics/{llms.txt,urls.md,...host trees}` on disk.
- Validation evidence: `code.claude.com/llms.txt` discovered → 126 URLs
  in allowlist → 119 fetched + 7 unchanged on first run (matches the
  Phase 0c-committed bodies). `vendor/anthropics/urls.md` lists all 126.
- Re-running idempotently: `writeIfChanged` compares against existing
  bytes; no duplicate writes; mtime preserved.

### 3. Existing verify chain unchanged — ✅ DONE

- `npm run verify` exits 0.
- `tools/list` still returns 12 tools (no lane wiring yet — that's Phase 3).

### 4. Throwaway seed-fetch scripts removed — ✅ DONE (vacuously)

- `scripts/seed-fetch/` was never created. Phase 0c citation pulls were
  fetched **inline via `curl`** during PR #3, never as a standalone
  script tree. Criterion is vacuously satisfied; no deletion commit
  needed.
