---
phase: 3
title: Manifest loader + new vendor lane
status: done
closed: 2026-05-10
issue: 7
prs:
  - 23   # Phase 3 PR
---

# Phase 3 — Manifest loader + new vendor lane (12 → 15 tools)

## Criteria

### 1. Tool count — ✅ DONE

- `tools/list` returns **15 tools** (12 existing + `vendor_list`, `vendor_fetch`, `vendor_grep`).
- `scripts/verify.ts` `expected: 15`.
- `npm run verify:mcp` exits 0.

### 2. `vendor_fetch` mirror-first behavior — ✅ DONE

- For an allowlisted-and-mirrored URL, `vendor_fetch` returns the local body
  with `source: "mirror"`. Unit-tested in `src/lib/vendor-mirror.test.ts`.
- For an unallowlisted URL, `vendor_fetch` rejects with `AllowlistError`-style
  message (no silent fallback to arbitrary HTTP).
- For an allowlisted-but-not-mirrored URL, `vendor_fetch` falls back to live
  HTTP via `bridge-utils.fetchText` and returns `source: "http"`.

### 3. `vendor_grep` returns local hits — ✅ DONE

- `vendor_grep({pattern: "..."})` walks `vendor/<name>/**/*.{md,txt}` and
  returns hits with vendor + URL + relPath + line number + matching line.
- All hits point to local files. **No HTTP requests.**
- Optional `vendor` arg restricts to one vendor; `max_per_vendor` caps results.
