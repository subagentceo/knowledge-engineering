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
| 13.A | ✅ done | conditional GET + content-hash skip-write — merged via PR #52 |
| 13.B | 🟢 in-progress | `vendor/anthropic-engineering/` + daily `/schedule` (O1; this PR) |
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

### 6. Daily refresh routines wired — 🟢 13.B (O1) / 🟡 13.C / 13.D

- `.claude/skills/refresh-vendors.md` already emits a weekly `/schedule`;
  13.B (this PR) adds the per-surface daily template for
  `anthropic-engineering`. 13.C/13.D add `claude-blog` and the
  marketing surfaces using the same template shape.

### 7. Citations resolve — ✅ 13.A

- New test file carries an `@cite` to this rubric and to
  `vendor/turbopuffer/turbopuffer.com/docs/warm-cache.md`.
- `verify:citations` passes.

### 8. Crawler supports `html_index_sources` discovery — ✅ 13.B (O1)

- `scripts/crawl-vendors.ts` `CrawlConfig` includes
  `html_index_sources?: { url: string; link_regex: string }[]`.
- For vendors without an llms.txt (e.g.
  `www.anthropic.com/engineering`), the crawler fetches each index
  URL, regex-extracts capture-group links, resolves them against the
  index URL, and merges them into the URL pool ahead of allowlist
  filtering.

### 9. `vendor/anthropic-engineering/` mirror committed — ✅ 13.B (O1)

- `vendor/anthropic-engineering/crawl.json` declares the live HTML
  index discovery + html-extract transform.
- `npm run crawl:vendor -- anthropic-engineering` produces ≥10
  `vendor/anthropic-engineering/www.anthropic.com/engineering/<slug>.md`
  files; the urls.md index lists every fetched post.

### 10. Crawler supports `sitemap_xml_sources` discovery — ✅ 13.B (O2)

- `scripts/crawl-vendors.ts` `CrawlConfig` includes
  `sitemap_xml_sources?: string[]`.
- `scripts/lib/sitemap-xml.ts` parses sitemaps.org-compliant
  `<urlset>` and `<sitemapindex>` bodies (one-level recursion).
- For vendors lacking an llms.txt, the sitemap-discovered URLs merge
  into the URL pool ahead of allowlist filtering.

### 11. `vendor/openfeature/` mirror committed — ✅ 13.B (O3)

- `vendor/openfeature/crawl.json` declares the sitemap discovery +
  `html-extract` transform; allowlist scopes to `/docs/` +
  `/specification/`.
- `npm run crawl:vendor -- openfeature` produces 64
  `vendor/openfeature/openfeature.dev/...` pages.

### 12. `vendor/cloudflare/` extended with Flagship — ✅ 13.B (O4)

- `vendor/cloudflare/crawl.json` `llms_txt_sources` includes
  `https://developers.cloudflare.com/flagship/llms.txt`.
- `page_cap` raised to 200 to absorb the 15 Flagship pages alongside
  the existing per-product index entries.
- All 16 Flagship docs (15 pages + llms.txt) mirrored under
  `vendor/cloudflare/developers.cloudflare.com/flagship/`.
