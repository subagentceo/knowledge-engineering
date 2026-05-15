---
phase: 16
title: Verified vendor coverage
status: in-progress
opened: 2026-05-15
issue: TBD (Phase 16 anchor)
prs:
  - 70   # Phase 16: catalog + rubric + test + config patches
citations:
  - seeds/citations/vendor-graph-v2.xml
---

# Phase 16 — Verified vendor coverage

## Outcome

The repo's vendor crawl coverage is **explicit, machine-verifiable, and
grounded in a citable catalogue**. Every vendor whose existence + URLs
were verified in the v2 catalog (`seeds/citations/vendor-graph-v2.xml`)
either has a `vendor/<id>/crawl.json` pointing at the verified URLs OR
is explicitly excluded with a documented reason.

This phase dogfoods the outcome-driven discipline:

1. Citation source first (`seeds/citations/vendor-graph-v2.xml`).
2. Outcome rubric second (this file).
3. Failing test third (`src/lib/vendor-catalog.test.ts`).
4. Vendor configs that make the test pass (per-commit, per-vendor).
5. Content re-sync as a follow-up tick.

## Criteria

### 1. Catalog is parseable + citable

- `seeds/citations/vendor-graph-v2.xml` is well-formed XML.
- Every `<entity>` has the 5 link slots populated.
- Every slot value is one of: a URL, `n/a`, `unverified`, or `user:<slug>`.
- Total: 29 entities (16 subprocessors + 7 ecosystem + 6 first-party).

### 2. Test asserts coverage

`src/lib/vendor-catalog.test.ts` runs as part of `npm run verify` and:

- Parses the catalog.
- For each entity whose `<llms_txt>` is a URL (not `n/a` / `unverified`):
  - Asserts `vendor/<id>/crawl.json` exists (with id normalization:
    underscores → hyphens; e.g. `brave_search` → `brave-search`).
  - Asserts the URL is in `llms_txt_candidates` OR `llms_txt`.
- For each entity with `<llms_txt>n/a</llms_txt>` AND a sitemap URL:
  - Asserts either `vendor/<id>/crawl.json` exists with
    `sitemap_xml_sources` containing that URL, OR the entity is
    excluded by listing its id in an explicit `EXCLUDED_IDS` Set with
    a reason.

### 3. Existing 4 vendor crawl.json configs are patched per v2 corrections

- `vendor/brave-search/crawl.json` — primary docs corrected from the
  NXDOMAIN `api-docs.search.brave.com` to `brave.com/search/api/`;
  html-index discovery pattern wired since brave has no llms.txt.
- `vendor/intercom/crawl.json` — llms.txt candidate
  `https://developers.intercom.com/llms.txt` is in the candidates list
  (it already is, per the heartbeat tick-1 audit).
- `vendor/arkose-labs/crawl.json` — primary docs explicit at
  `developer.arkoselabs.com`.
- `vendor/sift/crawl.json` — note added recording the SiftScience
  GitHub org as the canonical SDK surface (no JS path).

### 4. New vendor crawl.json configs added (catalog-confirmed llms.txt)

The following entities in v2 have a confirmed-URL `<llms_txt>` AND no
existing `vendor/<id>/crawl.json`. Each gets its own:

- `aws` — `https://docs.aws.amazon.com/llms.txt`. Cap at 200 (large surface).
- `opentelemetry` — `https://opentelemetry.io/llms.txt`. Cap at 200.
- `spotify-confidence` — `https://confidence.spotify.com/llms.txt`. Cap at 60.
- `parallel-web` — `https://docs.parallel.ai/llms.txt`. Cap at 60.
- `nimble` — `https://docs.nimbleway.com/llms.txt`. Cap at 60.

### 5. New vendor crawl.json configs added (sitemap fallback)

For entities with `<llms_txt>n/a</llms_txt>` AND a confirmed sitemap:

- `gcp` — `https://cloud.google.com/sitemap.xml` via `sitemap_xml_sources`.
  Cap at 100 (massive surface, narrow allowlist needed).
- `iterable` — `https://iterable.com/sitemap_index.xml`. Cap at 60.

Note: `nutun` and `boldr` are BPO service providers with no developer
docs; explicitly EXCLUDED in the test.

### 6. Anthropic first-party (6 entities) — already covered

The 6 first-party Anthropic entities are already mirrored by the
existing multi-source `vendor/anthropics/crawl.json` (covers
platform.claude.com, code.claude.com, claude.com/docs) and
`vendor/anthropic-engineering/`. The remaining 3 (claude.ai,
support.claude.com, www.anthropic.com) are consumer/marketing surfaces
that are out of scope for the developer-docs chassis — explicitly
EXCLUDED in the test.

### 7. Heartbeat state updated

`seeds/memory/heartbeat/last-tick.md` records tick 5 (this PR) with
the criterion-by-criterion outcome.

## Out of scope (deferred to future phases)

- Running the actual crawl + committing vendor content (Phase 16.B — a
  separate PR mirroring the tick-3 / PR #68 pattern).
- The remaining "miss" vendors from PR #67 that this phase doesn't
  address (e.g. sift's allowlist mismatch — distinct bug per D6).
- Embedding the catalog into Turbopuffer (Phase 11.C; gated on
  Voyage API key).

## Verify

After this PR lands:

```
npm run verify     # vendor-catalog.test.ts is part of run-tests
```

Expected: 0 errors. Each new criterion in §2 §3 §4 §5 §6 §7 is
asserted by either the test or a manual rubric check on this file.

## PRs

- **PR #70** — this PR (catalog citation + rubric + test + 7 config patches/additions + tick 5 record).
- **PR #71** (next tick) — Phase 16.B: run-the-crawl content commit.
