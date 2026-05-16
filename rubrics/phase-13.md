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
| 13.B | ✅ done | `vendor/anthropic-engineering/` + sitemap.xml + openfeature/flagship + SDK + color-code (O1-O6) — superseded 2026-05-16 by `vendor/anthropic-sitemap/` (PR #161) |
| 13.C | ✅ done | `vendor/claude-blog/` 4 categories — superseded 2026-05-16 by `vendor/claude-sitemap/blog/` (PR #160) |
| 13.D | ✅ done | 4 marketing surfaces — superseded 2026-05-16 by `vendor/claude-sitemap/{customers,plugins,connectors,resources}/` (PR #160) |

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

### 9. `vendor/anthropic-engineering/` mirror committed — ✅ 13.B (O1) — superseded 2026-05-16 by `vendor/anthropic-sitemap/`

Original: `vendor/anthropic-engineering/crawl.json` used live HTML index
discovery + html-extract transform, producing
`vendor/anthropic-engineering/www.anthropic.com/engineering/<slug>.md`.

Replaced by sitemap.xml-driven `vendor/anthropic-sitemap/` (PR #161)
which mirrors all anthropic.com content topologies (engineering + news +
research + learn + product + features + economic-futures + claude)
under `vendor/anthropic-sitemap/<topology>/<slug>.md`. The 24
engineering posts are now at `vendor/anthropic-sitemap/engineering/`.

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

### 13. OpenFeature SDK + Flagship provider wired — ✅ 13.B+ (O5)

- `package.json` declares `@openfeature/server-sdk`.
- `infra/cloudflare/package.json` declares `@openfeature/server-sdk`
  for symmetry; the Worker uses Cloudflare Flagship's native binding
  (no SDK install required at the Worker layer).
- `src/lib/openfeature.ts` exposes a singleton `getOpenFeatureClient()`.
  Default provider: `InMemoryProvider` seeded from
  `seeds/openfeature/local-flags.json`. `OPENFEATURE_<flag>` env vars
  override values per-flag (the Worker uses this to forward
  Flagship-resolved values into the Sandbox).
- `src/agent/run.ts` initializes the client after `requireOAuth()`.
- `infra/cloudflare/wrangler.jsonc` declares the `FLAGSHIP` binding
  (placeholder app_id; operator runbook
  `docs/operator-runbooks/cf-flagship-setup.md` provisions the real
  app_id).
- `infra/cloudflare/src/worker.ts` `resolveFlagshipString()` returns
  the Flagship-resolved value when the binding is bound, else the
  supplied default. The result is forwarded into the Sandbox env as
  `OPENFEATURE_color_code` so the in-Sandbox InMemoryProvider picks
  it up via the env-override path.
- 6/6 unit tests pass: `npx tsx --test src/lib/openfeature.test.ts`.
- Auth posture preserved: NO ANTHROPIC_API_KEY introduced; NO new
  secrets in Cloudflare Secrets Store (Flagship is a Worker binding,
  not an API key).

### 14. Color-code demo gated by OpenFeature flag — ✅ 13.B+ (O6)

- `src/lib/ansi-color.ts` declares `ALLOWED_COLORS` (8: red, blue,
  green, yellow, purple, orange, pink, cyan); pure `colorize()` wraps
  text in 256-color ANSI prefix, returns plain text when `isTty=false`
  (no escape leakage in CI / log files).
- `src/agent/todo-tracker.ts` `display()` resolves `color-code` via
  `getOpenFeatureClient().getStringValue("color-code", "cyan")` once
  per tracker instance and wraps each task icon in the resolved color.
- 9/9 unit tests pass: `npx tsx --test src/lib/ansi-color.test.ts`.
  Each of the 8 colors yields a unique ANSI prefix; invalid values
  fall back to `cyan` (no throw).
- End-to-end:
  - Default: `npm run dev "..."` → cyan icons.
  - Override: `OPENFEATURE_color_code=red npm run dev "..."` → red icons.
  - In Worker runtime: Flagship binding pre-evaluates the flag →
    `OPENFEATURE_color_code` env var passed into Sandbox → in-Sandbox
    InMemoryProvider picks it up → TodoTracker renders the chosen color.

### 15. Neon `vendor_pages` + per-PR branching CI — ✅ 13.B+ (O8)

- `migrations/0001_vendor_pages.sql` declares the `vendor_pages` table
  (vendor, path, content, content_hash, etag, last_modified, updated_at)
  with composite PK + indexes on `vendor` and `updated_at`. Idempotent
  via `IF NOT EXISTS` guards.
- `scripts/migrate-neon.ts` applies migrations in lexical order against
  the `NEON_DATABASE_URL` target. Used by CI on per-PR branch creation.
- `scripts/lib/neon-client.ts` thin wrapper over `@neondatabase/serverless`:
  `neonEnabled()` (gate), `upsertVendorPage()` (UPSERT helper that returns
  true only when content_hash actually differs), `exec()` (raw SQL).
  Lazy-imports the package so contexts without it don't break.
- `scripts/crawl-vendors.ts` accumulates a `neonBatch` per crawl and
  flushes via `flushNeonBatch()` after the filesystem write completes.
  When `NEON_DATABASE_URL` is unset (local dev), the flush is a no-op.
  Failures are logged but never fatal — the filesystem mirror is the
  source of truth, Neon is a cache.
- `.github/workflows/neon-branch.yml` was already creating per-PR
  branches (existing infra). This PR uncomments + activates the
  migration step + the schema-diff comment step. Every `pull_request`
  open / sync / reopen now applies the schema to the fresh branch.
- `package.json` declares `@neondatabase/serverless`.
- 2/2 unit tests pass: `npx tsx --test scripts/lib/neon-client.test.ts`
  (covers the `neonEnabled()` env-var gate; live-DB integration is
  exercised by the per-PR neon-branch.yml workflow).
- `docs/operator-runbooks/neon-hyperdrive-setup.md` documents the
  one-time Hyperdrive provisioning (operator-pending; the frontend's
  Hyperdrive read path lands in a follow-up PR after the operator
  runs the runbook).
- Auth posture preserved: NO ANTHROPIC_API_KEY introduced; the
  existing `NEON_API_KEY` Secrets Store binding (declared in
  `infra/cloudflare/wrangler.jsonc`) is reused.

### 16. outcomesdk.com pretext frontend — ✅ 13.B+ (O7)

- New `frontend/` workspace at the repo root, separate `wrangler.jsonc`,
  separate `outcomesdk-frontend` Worker. Architectural separation from
  `infra/cloudflare/ke-cloud-agent` so the public surface inherits ZERO
  Claude secrets.
- `frontend/src/index.html` — half-and-half grid (`100svh`, ASCII top,
  accordion bottom). Mobile-first (iPhone 16 Pro Chrome baseline).
- `frontend/src/ascii-art.ts` (~140 LOC) — particle-and-attractor
  brightness field driving an 11-char monospace luminance ramp.
  IntersectionObserver pauses when off-screen; respects
  `prefers-reduced-motion`.
- `frontend/src/accordion.ts` (~140 LOC) — `@chenglou/pretext`-measured
  section heights ("finally sane accordion" pattern). One section open
  at a time, click-to-toggle with Enter/Space keyboard activation.
- `frontend/src/vendor-loader.ts` — fetches `/vendor/<vendor>/<path>.md`,
  renders via `marked` + DOMPurify (browser singleton; jsdom-injected
  in tests via `setPurifierWindow()` so jsdom never ships to browser).
- `frontend/src/worker.ts` — serves Vite-built bundle + vendor markdown
  via Workers Static Assets binding.
- `frontend/scripts/build-vendor-manifest.ts` — build-time: walks
  `vendor/`, copies `*.md` to `frontend/public/vendor/`, emits
  `vendor-manifest.json`.
- `frontend/wrangler.jsonc` — `routes[]` declares `outcomesdk.com` and
  `www.outcomesdk.com` as `custom_domain: true`. Operator runbook
  `docs/operator-runbooks/outcomesdk-domain.md` verifies API token
  permissions for first deploy.
- 11/11 frontend unit tests pass: `cd frontend && npm test`.
- `wrangler deploy --dry-run` validates: 2055 files (vendor mirror +
  bundle), 19 KiB Worker, 4.86 KiB gzipped.
- Bundle size: 109 KiB (37 KiB gzipped). jsdom kept out of the
  browser bundle by deferring DOMPurify init.
