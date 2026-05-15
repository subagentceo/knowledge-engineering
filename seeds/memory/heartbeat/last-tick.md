---
tick: 5
iso: 2026-05-15T04:15:00Z
git_sha: pending (this PR)
session: claude.ai/code/session_9d8f8432-101f-466f-9c31-b1021ea934e7
trigger: operator-direct ("safely add these to the crawl by patching ...")
prev_tick: 4 (PR #69 — merged as 75681a3)
---

# Tick 5 — Phase 16 verified vendor coverage

Operator-direct request: extend the crawl coverage based on the v2
vendor_graph catalogue + verification-pass patches.

Operator constraint: "treat user prompt as starting point but dogfood
what we created in this long running agent session and refactor code
and update the codebase to avoid introducing new code if its not
needed."

Operator constraint: "decompose user prompt into tasks, subtasks, and
todos in session that are all their own commits."

Operator constraint: "use the outcome + rubric approach we dogfood
created for outcome driven development to include citations in tests
to write first."

## Outcome-driven discipline executed

This tick is the worked example of the repo's TDD + rubric pattern:

1. **Citation source first.** Saved the patched v2 catalogue at
   `seeds/citations/vendor-graph-v2.xml` (commit 1/8).
2. **Outcome rubric second.** `rubrics/phase-16.md` (commit 2/8).
3. **Failing test third.** `src/lib/vendor-catalog.test.ts` (commit
   3/8) — TDD red phase: 7 failures asserting that missing vendor
   configs need to exist.
4. **Configs that make the test pass, one per commit.** Commits 4–7
   each turn one failure green.
5. **Heartbeat state update last.** This file (commit 8/8).

## Commits in this PR (#70)

| # | Path | Purpose |
| :-- | :--- | :--- |
| 1/8 | `seeds/citations/vendor-graph-v2.xml` | Patched v2 catalog as citation source |
| 2/8 | `rubrics/phase-16.md` | Verified Vendor Coverage rubric (7 criteria) |
| 3/8 | `src/lib/vendor-catalog.test.ts` | TDD red — failing coverage test |
| 4/8 | `vendor/brave-search/crawl.json` | NXDOMAIN fix (api-docs.search.brave.com) |
| 5/8 | `vendor/aws/crawl.json` | NEW — docs.aws.amazon.com/llms.txt |
| 6/8 | `vendor/{opentelemetry,spotify-confidence,parallel-web,nimble}/crawl.json` | NEW — 4 ecosystem llms.txt vendors |
| 7/8 | `vendor/{gcp,iterable}/crawl.json` | NEW — 2 sitemap-only fallback vendors |
| 8/8 | `seeds/memory/heartbeat/last-tick.md` | This tick record |

## Code reuse — no new infrastructure

Per operator's "avoid introducing new code if not needed":

- ✅ Reused existing `crawl.json` schema (transform, allow_prefixes,
  page_cap, llms_txt_candidates, sitemap_xml_sources, html_index_sources).
- ✅ Reused existing crawler (`scripts/crawl-vendors.ts`) — no
  changes. Tick 2 fixes (page_cap sentinel + relative-URL resolution)
  already handle the new vendor URL patterns.
- ✅ Reused existing test runner (`scripts/lib/run-tests.ts`) —
  auto-discovers `src/lib/vendor-catalog.test.ts`.
- ✅ Reused existing citation-guard pattern (`@cite` headers in test
  file pointing at the v2 XML and the rubric).
- ✅ Reused existing rubric structure (`rubrics/phase-N.md` with
  criteria + outcome).
- ✅ Reused existing heartbeat memory layout (`seeds/memory/heartbeat/`).
- ❌ No new dep introduced (XML parsed via regex, not via a library).

## Test status

```
20 passed, 0 failed
```

All catalog coverage assertions green. 21 vendors total tracked
(was 14 before this PR; +7 new).

## Verify status

```
21 vendor(s) | 0 warning(s) | 0 error(s)
```

Existing fresh vendors unchanged. 10 vendors show "miss" in
verify:freshness — that's expected: they don't have urls.md yet
because the actual crawl is **Phase 16.B** (next tick / PR #71).

## What this PR does NOT ship

Per the heartbeat tick-2 decision D5 (don't mix code-fix PRs with
content re-syncs), this PR ships **only the configs + test + rubric**.
The actual crawl that produces `vendor/<name>/urls.md` + markdown
content lands in a separate PR (Phase 16.B / PR #71 / tick 6).

## Next tick (Phase 16.B)

Run `npm run crawl:vendors` against the new configs, commit the
content per the tick-3 / PR #68 pattern. Expected new content:

- `aws/` — ~200 pages (large surface)
- `opentelemetry/` — ~200 pages
- `spotify-confidence/` — ~60 pages
- `parallel-web/` — ~60 pages (single docs surface)
- `nimble/` — ~60 pages
- `gcp/` — up to ~100 pages (sitemap-derived)
- `iterable/` — up to ~60 pages (sitemap-derived)

Plus the already-passing existing vendors (brave-search now points at
the right URL; should pick up content via html-index discovery).
