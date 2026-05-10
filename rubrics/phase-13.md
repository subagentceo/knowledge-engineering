---
phase: 13
title: Content surfaces beyond docs + crawler modernization
status: in-progress
issues:
  - 45  # 13.A — conditional GET + content-hash skip-write (ANCHOR; this PR)
  - 46  # 13.B — vendor/anthropic-engineering/ + daily /schedule
  - 47  # 13.C — vendor/claude-blog/ 4 categories + daily /schedule
  - 48  # 13.D — 4 marketing surfaces (claude-customers / plugins / connectors / tutorials)
---

# Phase 13 — Content surfaces beyond docs + crawler modernization

Per the operator's framing: "make improvements to crawlee using modern
crawl strategy where you skip crawling a page if the contents of the
page did not change since the last successful crawl ... add issues in
one or more phases for the anthropic.com/engineering blog posts ...
process claude.com/blog across the 4 categories ... 4 marketing
surfaces."

Cited from:
- RFC 7232 — HTTP Conditional Requests (`If-None-Match`, `If-Modified-Since`, `304 Not Modified`)
- `vendor/turbopuffer/turbopuffer.com/docs/warm-cache.md` (related skip-on-unchanged pattern)
- `vendor/anthropics/code.claude.com/docs/en/agent-sdk/slash-commands.md` (`/schedule` for daily routines)

## Sub-phases

| Sub | Status | What |
|---|---|---|
| 13.A | 🟢 in-progress | conditional GET + content-hash skip-write (anchors 13.B-D daily routines) |
| 13.B | 🟡 follow-up | `vendor/anthropic-engineering/` daily `/schedule` |
| 13.C | 🟡 follow-up | `vendor/claude-blog/` (4 categories) daily `/schedule` |
| 13.D | 🟡 follow-up | 4 marketing surfaces (claude-customers / plugins / connectors / tutorials) |

## Criteria

### 1. CrawlConfig gains `incremental` flag (default true) — ✅ 13.A

- `scripts/crawl-vendors.ts` `CrawlConfig` includes `incremental?: boolean`.
- Default is `true`. Setting `false` forces a full re-fetch.

### 2. Conditional headers sent + 304 handled as `unchanged` — ✅ 13.A

- Pre-flight pass sends `If-None-Match` from stored ETag and
  `If-Modified-Since` from stored Last-Modified.
- `304 Not Modified` counted as success-with-no-body (no failure).
- Pre-flight skips the crawlee queue when the server returns 304.

### 3. Content-hash fallback for CDNs that omit cache headers — ✅ 13.A

- When the server returns 200 but the SHA-256 of the post-transform
  body equals the stored hash, the disk write is skipped (mtime
  preserved; `git status` clean).

### 4. Checksums committed (gitignore-exempt) — ✅ 13.A

- `vendor/<name>/.checksums.json` is committed.
- The `.gitignore` does not exclude it; cross-machine re-crawls inherit
  the prior state.

### 5. Bench: ≤10% non-304 GETs on a clean re-crawl — 🟡 13.A bench-deferred

- A back-to-back full re-crawl of `vendor/anthropics/` (1362 docs)
  issues ≤10% non-304 GETs when upstream hasn't changed.
- Bench is recorded in the PR description; a stricter version is wired
  into `verify:freshness` in a follow-up.

### 6. Daily refresh routines wired — 🟡 13.B / 13.C / 13.D

- `.claude/skills/refresh-vendors.md` already emits a `/schedule`; 13.B-D
  add per-surface variants.

### 7. Citations resolve — ✅ 13.A

- New test file carries an `@cite` to this rubric and to
  `vendor/turbopuffer/turbopuffer.com/docs/warm-cache.md`.
- `verify:citations` passes.
