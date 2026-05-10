---
phase: 1
title: Crawler infrastructure
status: stub
---

# Phase 1 — Crawler infrastructure

Add deps, implement the offline crawler library, validate end-to-end on
`anthropics`. Don't commit crawl results yet. `npm run verify` still green
at 12 tools.

## Criteria

### 1. Crawler library compiles and unit tests pass

- `scripts/crawl-vendors.ts`, `scripts/lib/llms-txt.ts`,
  `scripts/lib/url-to-path.ts`, `scripts/lib/transforms.ts` exist.
- `npm run lint` passes (tsc --noEmit).
- A unit test covering each of the seven `transform` strategies passes.

### 2. End-to-end on the cleanest case

- `npm run crawl:vendor -- anthropics` produces
  `vendor/anthropics/{llms.txt,urls.md,www.anthropic.com/...}` on disk.
- 5 random crawled files are valid markdown (no `<html` prefix).
- Re-running the crawler is idempotent (no duplicate writes; mtime
  preserved when content unchanged).

### 3. Existing verify chain unchanged

- `npm run verify` exits 0.
- `tools/list` still returns 12 tools (no lane wiring yet).

### 4. Throwaway seed-fetch scripts removed

- `scripts/seed-fetch/` from Phase 0 is deleted in this phase.
- The deletion is a single commit: `chore: remove throwaway seed-fetch scripts`.
