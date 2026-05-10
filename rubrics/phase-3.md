---
phase: 3
title: Manifest loader + new vendor lane
status: stub
---

# Phase 3 — Manifest loader + new vendor lane (12 → 15 tools)

## Criteria

### 1. Tool count

- `tools/list` returns 15 tools.
- `scripts/verify.ts` `expected: 15`.
- `npm run verify:mcp` exits 0.

### 2. `vendor_fetch` mirror-first behavior

- For an allowlisted-and-mirrored URL, `vendor_fetch` returns the local body
  with `source: "mirror"`.
- After renaming the mirror file, `vendor_fetch` returns the live body with
  `source: "http"`.

### 3. `vendor_grep` returns local hits

- Calling `vendor_grep({namespace:"stripe", pattern:"idempotency-key"})`
  returns at least one hit, all rows pointing to local files.
- No HTTP request is made (verified with a deny-all outbound stub).
