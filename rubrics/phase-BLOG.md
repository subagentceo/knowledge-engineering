---
phase: BLOG
title: Deterministic full-sitemap crawl for Anthropic + Claude properties
status: in-progress
self-graded: true
parent-issue: 259
sub-issues: [260, 261, 262, 263, 264, 265]
cites:
  - vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md
  - https://platform.claude.com/docs/en/test-and-evaluate/develop-tests.md
  - operator/claude-blog-content.md
  - operator/agent_claude_blog_tool.json
  - rubrics/phase-A2A.md
  - scripts/crawl-vendors.ts
  - scripts/lib/transforms.ts
  - scripts/lib/claude-blog-cleanliness.test.ts
---

# Phase BLOG — Deterministic full-sitemap crawl for Anthropic + Claude properties

Outcome: every URL on the active anthropic.com + claude.com + code.claude.com + platform.claude.com sitemaps is mirrored locally with markdown that matches claude.com's own "Copy as markdown" output, the crawl is deterministic (re-runs produce byte-identical output), and the rubric in this file is graded by `src/lib/blog-extract-fidelity.test.ts`.

Rubric format per `vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md` — explicit, gradeable criteria; code-graded where possible per `https://platform.claude.com/docs/en/test-and-evaluate/develop-tests.md` (code > LLM > human).

## Fidelity criteria (sub-issue #260, OBLOG.fidelity)

### F1 — H1 title present

- **Measure:** first non-empty line of output starts with `# ` followed by the post title
- **Threshold:** 100% of `vendor/claude-sitemap/blog/*.md`
- **Grader:** code (regex `^# ` on first non-empty line)

### F2 — Headings are plain, not bold-wrapped

- **Measure:** zero occurrences of `^#+ \*\*` in output
- **Threshold:** 0
- **Grader:** code (regex)

### F3 — Inline links stripped (matching page's own extractor)

- **Measure:** zero occurrences of `\[[^\]]+\]\(https?://[^)]+\)` outside code fences
- **Threshold:** 0
- **Grader:** code (regex over code-fence-stripped body)

### F4 — Bullet markers `* ` not `-   `

- **Measure:** zero occurrences of `^-   ` (three-space indent)
- **Threshold:** 0
- **Grader:** code (regex)

### F5 — No escaped underscores outside code fences

- **Measure:** zero occurrences of `\\_` in code-fence-stripped body
- **Threshold:** 0
- **Grader:** code (regex)

### F6 — Code fences carry language hint when source provided one

- **Measure:** for `<pre><code class="language-X">` in source, output `` ```X `` not bare `` ``` ``
- **Threshold:** ≥95% of code blocks where source had `language-*` class
- **Grader:** code (count compare HTML vs markdown)

## Determinism criteria (sub-issue #261, OBLOG.determinism)

### D1 — Timestamp-free output

- **Measure:** no ISO8601 / Unix epoch / "crawled at" metadata in any output `.md` file
- **Threshold:** 0
- **Grader:** code (regex `\d{4}-\d{2}-\d{2}T\d{2}:`)

### D2 — Stable JSON manifest ordering

- **Measure:** all JSON manifests (crawl-config-derived state, `urls.md` indexes) have stable key + URL sort
- **Threshold:** `jq -S` output equals raw file
- **Grader:** code (jq diff)

### D3 — Idempotent re-crawl

- **Measure:** run crawl twice; second run produces byte-identical files modulo genuine source change
- **Threshold:** sha256 of `vendor/<mirror>` tree matches across runs
- **Grader:** integration test (`src/lib/crawl-determinism.test.ts`)

### D4 — Stable fetch order

- **Measure:** URL fetch order deterministic given fixed input (ascending sort), not `Promise.all` completion order
- **Threshold:** fetch log identical across runs
- **Grader:** code (diff two run logs)

## Full-sitemap coverage criteria (sub-issue #262, OBLOG.fullsitemap)

### S1 — Sitemap coverage ratio

- **Measure:** `(crawled ∩ sitemap) / sitemap`, excluding `deny_prefixes`/`deny_urls`
- **Threshold:** ≥0.95 for each of claude.com + anthropic.com
- **Grader:** code (compare live `sitemap.xml` parse vs `vendor/<mirror>/urls.md`)

### S2 — No silent excludes

- **Measure:** every uncrawled URL appears in `deny_prefixes` or `deny_urls` or has a logged reason in manifest
- **Threshold:** `sitemap − crawled − deny_listed = 0`
- **Grader:** code

### S3 — Non-English locales explicitly denied

- **Measure:** `/ja/`, `/de/`, `/fr/`, `/ko/`, `/es/`, `/pt/`, `/zh/` etc. in `deny_prefixes`
- **Threshold:** all observed locales denied
- **Grader:** code

### S4 — Feed / RSS denied

- **Measure:** `/feed`, `/rss`, `/sitemap.xml` not in crawled output
- **Threshold:** 0
- **Grader:** code

## Rerun criteria (sub-issue #265, OBLOG.rerun)

### R1 — All 3 mirrors re-crawled with fixed pipeline

- **Measure:** every file in each mirror has been written AFTER merge of #260 + #261
- **Threshold:** 100%
- **Grader:** code (mtime or commit-sha in `vendor/.crawl-manifest.json`)

### R2 — Diff vs prior tree is meaningful

- **Measure:** `git diff --stat vendor/{anthropics,claude-sitemap,anthropic-sitemap}` shows changes only on expected defect fixes
- **Threshold:** no unexpected churn
- **Grader:** sampled manual review (20 files) + counted diff stats

### R3 — All cleanliness + fidelity tests pass on new tree

- **Measure:** `npm run verify` exits 0 with new tree + `OBLOG_FIDELITY_REFRESHED=1`
- **Threshold:** 0 failures
- **Grader:** CI

### R4 — Mirror size sanity

- **Measure:** new total file count ≥ previous (no posts silently dropped)
- **Threshold:** ≥ 3326 (current baseline: 1369 + 377 + 1580)
- **Grader:** code (`find ... -name '*.md' | wc -l`)

## Aggregate score

**Pass = all of:**

- F1–F6 thresholds met on every file in `vendor/claude-sitemap/blog/*.md`
- D1 = 0, D2 stable, D3 byte-identical, D4 stable order
- S1 ≥ 0.95, S2 = 0 unaccounted, S3 + S4 enforced
- R1 100%, R2 reviewed, R3 CI green, R4 ≥ 3326

Each iteration toward Pass per `define-outcomes.md` — `max_iterations: 5`, default 3. The grader (`src/lib/blog-extract-fidelity.test.ts` + planned `src/lib/crawl-determinism.test.ts` + planned `src/lib/sitemap-coverage.test.ts`) returns per-criterion gaps; agent iterates.

## Iteration plan (mirrors issue #259)

1. **Iter 1 (MVP, shipped):** prior `html-extract` output, lossy. ✅
2. **Iter 2 (#260 OBLOG.fidelity):** F1-F6 fixes. PR #268 (draft, 7/7 tests pass).
3. **Iter 3 (#261 OBLOG.determinism):** D1-D4. Branch pending.
4. **Iter 4 (#262 OBLOG.fullsitemap):** S1-S4. Blocked by #260 + #261.
5. **Iter 5 (#265 OBLOG.rerun):** R1-R4. Blocked by all above.

## Out of scope

- Wall-clock latency in ms (depends on Anthropic API, not under repo control)
- Non-Anthropic vendor mirrors (each vendor has its own rubric)
- PDF lane changes (`scripts/lib/pdf-mirror.ts` is healthy)
- Embedding / vector indexing (downstream of this)
