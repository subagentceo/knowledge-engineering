---
phase: 2
title: Crawl all 12 + commit
status: stub
---

# Phase 2 — Crawl all 12 + commit

Run `crawl:vendors` for all 12; audit; commit `vendor/` tree. Repo grows by
the expected amount.

## Criteria

### 1. All 12 vendors crawled

- `npm run crawl:vendors` exits 0.
- Each `vendor/<name>/{llms.txt,urls.md,crawl.json}` exists.
- Each vendor has at least one `<host>/.../*.md` body file.

### 2. No HTML leaks

- For all `vendor/cloudflare/**` files, the body does not start with
  `<!DOCTYPE` or `<html`.
- For all `vendor/anthropics/**` files, same.

### 3. Repo size sanity

- `du -sh vendor/` reports a value in a documented range
  (initial cap: <500 MB; if exceeded, escalate per the risks table).

### 4. `verify:freshness` is all-fresh

- `npm run verify:freshness` exits 0 with all vendors fresh.
- Touching `vendor/anthropics/urls.md` to 30 days ago flips it to a warning.
