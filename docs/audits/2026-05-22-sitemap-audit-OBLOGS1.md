# Sitemap allow_prefixes audit (OBLOG.fullsitemap, #262)

**Date:** 2026-05-22
**Source:** `https://claude.com/sitemap.xml` (2734 URLs) + `https://www.anthropic.com/sitemap.xml` (424 URLs)
**Audit script:** see git log (one-shot bash; not committed)

## Coverage before this PR

| Sitemap | Total | Allowed | Denied | Uncovered |
|---|---|---|---|---|
| claude.com | 2734 | 1283 (47%) | 1377 (50%, locales) | **74 (2.7%)** |
| anthropic.com | 424 | 374 (88%) | 0 | **50 (12%)** |

S1 target is ≥0.95 coverage of (sitemap ∩ NOT denied). Before audit: claude.com 1283 / (2734 - 1377) = **94.5%**; anthropic.com 374 / 424 = **88.2%** → **anthropic.com fails S1 threshold**.

## Uncovered URL decisions

### claude.com — add to allow_prefixes (content surface)
- `/product/` (5) — overview + product pages
- `/pricing/` (5) — pricing tiers
- `/platform/` (2) — platform/api landing
- `/programs/` (2) — startups + campus programs
- `/partners/` (6) — partner ecosystem
- `/community/` (2) — community page
- `/skills/` (1) — agent skills surface
- `/healthcare-administration` (1) — vertical landing
- `/claude-for-chrome`, `/claude-for-microsoft-365`, `/claude-for-slack` (3) — integration landing pages
- `/fast-mode`, `/import-memory` (2) — feature pages
- `/problem-solvers` (1) — partner-adjacent

### claude.com — add to deny_prefixes (non-content)
- `/contact-sales/` (18) — sales funnel
- `/lp/` (4) — landing pages
- `/marketplace-partners`, `/marketplace-contact-sales` (2) — sales
- `/blog-category/` (4) — taxonomy duplicates
- `/unsubscribe`, `/newsletter/`, `/download` (3) — transactional
- `/app-unavailable-in-region`, `/internal-tools/`, `/regional-compliance/` (3) — error/admin pages

### claude.com — bare index URLs (already covered by prefix, ignore as duplicate-equivalent)
- `/blog`, `/customers`, `/connectors`, `/plugins`, `/code-with-claude` (5)
- `/ja`, `/de`, `/fr`, `/ko` (4) — already locale-denied

### anthropic.com — add to allow_prefixes (content surface)
- `/responsible-scaling-policy/` (2) — including /updates
- `/responsible-disclosure-policy`, `/coordinated-vulnerability-disclosure` (2) — security policy
- `/system-cards`, `/transparency` (2) — accountability docs
- `/constitution` (1) — constitutional-AI doc
- `/economic-futures` (1) — bare index (already prefix-allowed)
- `/glasswing`, `/project/` (2) — research projects
- `/science`, `/research` (2) — bare indexes
- `/company`, `/careers`, `/about-anthropic-interviewer`, `/candidate-ai-guidance` (4) — about/recruiting
- `/supported-countries` (1) — policy
- `/news`, `/learn`, `/engineering` (3) — bare indexes (already prefix-allowed)

### anthropic.com — add to deny_prefixes (non-content)
- `/legal/` (17) — intentionally excluded per spec
- `/events/` (9) — ephemeral event pages
- `/vc-partner-program-official-terms` (1) — legal-adjacent
- `/startup-program-official-terms` (1) — legal-adjacent
- `/ai-for-science-program-rules` (1) — legal-adjacent
- `//` (1) — sitemap glitch

## Coverage after this PR (measured)

| Sitemap | Allowed | Denied | Uncovered | S1 coverage |
|---|---|---|---|---|
| claude.com | 1309 | 1410 | 15 | 1309 / (2734 - 1410) = **98.9%** |
| anthropic.com | 388 | 29 | 7 | 388 / (424 - 29) = **98.2%** |

Both clear the 0.95 S1 threshold by a comfortable margin.

## Known coverage gap (deferred — bare-index URLs)

The 15 + 7 remaining "uncovered" URLs are all **bare-index pages without
trailing slash** (e.g. `https://claude.com/pricing`, `https://www.anthropic.com/learn`).
The crawler matches via `url.startsWith(prefix)` (scripts/crawl-vendors.ts:282)
and prefix-with-slash entries like `/pricing/` do not match the bare URL
`/pricing`.

Three resolution paths:

1. **Add an `allow_urls` field** to the schema (mirror of `deny_urls`) —
   clean but requires schema + crawler change. Tracked as a follow-up on
   issue #262.
2. **Drop the trailing slash** on the prefix — risks over-matching
   (e.g. `/blog` would match `/blog-category/foo`). Rejected.
3. **Accept as intentional gap** with documented rationale — bare-index
   hub pages typically serve duplicated/aggregator content already covered
   by sub-page crawls.

This PR ships path 3 with the gap documented here. Path 1 belongs in a
separate PR that touches the schema; doing it here would mix concerns.

The 4 locale bare-URLs (`/ja`, `/de`, `/fr`, `/ko`) should be denied,
not uncovered — they fall under the same prefix-without-slash limitation
and will be cleaned up by the same `allow_urls`/`deny_urls` change.

## Out of scope

- **S2 (no silent excludes):** manifest format requires `.crawl-manifest.json` with deny-reason field; that's the OBLOG.rerun work (#265). This PR only updates `crawl.json`.
- **S3 (non-EN locales):** claude.com locales already denied. anthropic.com sitemap has no `/ja/`, `/de/` etc. in surface — defer reverification to OBLOG.rerun.
- **S4 (feed/RSS):** already denied in claude.com. No feed/rss in anthropic.com sitemap.

## Verification

After config update, re-run:

```bash
# Counts should match table above
curl -s https://claude.com/sitemap.xml | grep -oE '<loc>[^<]+</loc>' | sed 's|<loc>||;s|</loc>||' > /tmp/claude.txt
curl -s https://www.anthropic.com/sitemap.xml | grep -oE '<loc>[^<]+</loc>' | sed 's|<loc>||;s|</loc>||' > /tmp/anthropic.txt
# Classify against new prefixes (see scripts/audit-sitemap-coverage.ts when authored — out of scope for this PR)
```
