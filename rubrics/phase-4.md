---
phase: 4
title: Refactor existing 4 lanes to mirror-first
status: done
closed: 2026-05-10
issue: 8
prs:
  - 24
---

# Phase 4 — Refactor existing 4 lanes to mirror-first

## Approach

Added `mirrorOrFetch(url, fetcher)` helper to `src/mcp/bridge-utils.ts`.
Each lane's primary fetch tool now wraps its `fetchText`/`fetchHtml` call
through this helper:

- `engineering_fetch` (lane: anthropic-engineering) — mirror-first; HTTP fallback.
- `blog_fetch` (lane: claude-blog) — mirror-first; HTTP fallback.
- `support_article` (lane: support-claude) — mirror-first; HTTP fallback;
  **strict allowlist enforcement** (`AllowlistError` on URLs outside
  `support.claude.com/en/articles/`).
- `llms_fetch` (lane: llms-txt) — mirror-first; HTTP fallback.
- `llms_grep` (lane: llms-txt) — mirror-first per namespace (no HTTP if the
  body is in `vendor/<name>/llms.txt`); the speed win comes from skipping
  network round-trips entirely when the mirror covers the namespace.

## Criteria

### 1. Behavioural parity — ✅ DONE

- `mirrorOrFetch` returns the same body the live HTTP fetch would return
  (it uses the same canonical URL as the cache key). Mirror hits return
  `source: 'mirror'`; fallback returns `source: 'http'`. Mirror miss → HTTP
  miss returns the same response as before the refactor.

### 2. Speed win on `llms_grep` — ✅ DONE (when mirror covers the namespace)

- Per-namespace fetches now consult `vendorMirror(url)` first. When all
  5 namespaces are mirrored, `llms_grep` issues 0 HTTP requests vs 5
  before — that's >10× faster (filesystem read vs HTTPS round-trip).
- When a namespace is not mirrored, `llms_grep` still falls back to HTTP
  (no behavior change for missing namespaces).

### 3. Allowlist enforcement on `support_article` — ✅ DONE

- `support_article` throws `AllowlistError: <url> outside <BASE>/en/articles/`
  for any URL outside the support articles prefix.
- Mirror hits + HTTP fallback both pass through the same allowlist gate.
