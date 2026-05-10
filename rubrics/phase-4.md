---
phase: 4
title: Refactor existing 4 lanes to mirror-first
status: stub
---

# Phase 4 — Refactor existing 4 lanes to mirror-first

## Criteria

### 1. Behavioural parity

- `engineering_fetch`, `blog_fetch`, `support_article`, `llms_fetch` each
  return the same body (byte-equal) for a known URL when reading from the
  mirror as they do via live HTTP fallback.

### 2. Speed win on `llms_grep`

- `llms_grep` benchmarked on a representative query is ≥10× faster than the
  Phase 3 baseline (asserted in test).

### 3. Allowlist enforcement

- `support_article` rejects an unallowlisted URL with `AllowlistError`
  (the Phase 0 behaviour skipped this check; Phase 4 makes it strict).
