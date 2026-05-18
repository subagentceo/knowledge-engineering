# anthropics crawl failures — 2026-05-17

_Mode: --dry-run (stub; no child crawl spawned)._

## Totals

- total parsed failures: **5**
- 404 / not-found: 3
- 5xx: 0
- timeout: 1
- rate-limit (429): 1
- parse-error: 0
- unknown: 0

## Top failing URLs (by frequency)

| # | count | url | reason |
|---|---|---|---|
| 1 | 1 | https://code.claude.com/docs/en/removed-page-a | HTTP 404 |
| 2 | 1 | https://code.claude.com/docs/en/removed-page-b | HTTP 404 |
| 3 | 1 | https://platform.claude.com/docs/en/legacy/x | HTTP 404 |
| 4 | 1 | https://example.invalid/sitemap.xml | ETIMEDOUT |
| 5 | 1 | https://platform.claude.com/docs/en/burst-throttled | HTTP 429 rate-limited |

## Recommended `deny_urls` additions

Per OVS5, only durable 404s are recommended for `deny_urls`; transient
(timeout/5xx/429) failures should be retried, not denied.

```json
{
  "deny_urls": [
    "https://code.claude.com/docs/en/removed-page-a",
    "https://code.claude.com/docs/en/removed-page-b",
    "https://platform.claude.com/docs/en/legacy/x"
  ]
}
```

## Notes

- Source: `scripts/crawl-vendors.ts` keeps the `failures[]` array in-memory; the
  current stderr stream contains only targeted lines (additional-source, sitemap,
  html_index, neon-upsert). HTTP non-200 per-URL failures during the main crawlee
  loop (`HTTP <status>`) are not yet stderr-logged — see the canonical
  `[<vendor>] FAIL <url>: <reason>` pattern this audit will pick up once added.
- Cited: `vendor/${vendor}/crawl.json`, `seeds/citations/define-outcomes.md`.

