---
tick: 2
iso: 2026-05-15T03:55:00Z
git_sha: pending (this PR)
session: claude.ai/code/session_9d8f8432-101f-466f-9c31-b1021ea934e7
trigger: webhook (PR #66 merged) — auto-popped next-actions queue
prev_tick: 1 (bootstrap, PR #66, merged as 7dcfa8f)
---

# Tick 2 — page_cap sentinel + relative-URL resolution

Popped `next-actions.md` action #1 ("Fix `scripts/lib/llms-txt.ts` parser
to unblock twilio + sentry + sift"). After investigation, the bug
turned out to be **not** in the parser but in two distinct places in
`scripts/crawl-vendors.ts`:

## Root causes (both fixed in this tick)

### Bug A — `page_cap: 0` interpreted literally

Line 392 of `scripts/crawl-vendors.ts`:

```ts
const allowed = urls.filter((u) => inAllowlist(u, cfg)).slice(0, cfg.page_cap);
```

`.slice(0, 0)` returns the empty array. Four vendor configs
(brave-search, sentry, sift, twilio) had `page_cap: 0` written as a
"no cap" sentinel. The crawler treated it as a literal zero.

**Fix:** treat `page_cap > 0 ? page_cap : Infinity` for the slice;
treat `> 0 ? page_cap : undefined` for crawlee's `maxRequestsPerCrawl`.
Updated the four configs to explicit numeric caps (twilio 200, sentry
150, sift 150, brave-search 50) to avoid runaway crawls in CI even
when the sentinel is left at 0.

### Bug B — relative URLs in llms.txt never matched the allowlist

`dedupeUrls(parsed)` returned link URLs verbatim from the parser.
twilio's llms.txt (at `https://docs.twilio.com/llms.txt`) uses
relative paths like `/docs/authy.md`. These can't match
allow_prefixes that are absolute URLs (`https://docs.twilio.com/`).

**Fix:** `dedupeUrls(parsed, baseUrl)` now resolves each link via
`new URL(link.url, baseUrl).toString()`. Both call sites pass the
source's URL (`llms.url` for the primary; `sourceUrl` for additional
`llms_txt_sources`).

## Smoke-test results (local)

| Vendor | Before | After |
| :--- | ---: | ---: |
| twilio | 1587 → 0 → 0 fetched | 1587 → 200 → **200 fetched** ✅ |
| sentry | 121 → 0 → 0 fetched | 121 → 117 → **117 fetched** ✅ |
| sift | 674 → 0 → 0 fetched | 674 → 0 → still 0 (different bug; see open-questions M2) |
| brave-search | llms.txt 404 | still 404 (Phase 13.B O2 sitemap fallback needed) |

Two of four still-miss vendors fully unblocked. Sift remains in
"miss" — its llms.txt links use a path scheme that doesn't match
the configured `allow_prefixes: ["https://sift.com/developers/"]`.
Needs vendor-specific allowlist correction; out of scope for this
tick.

## Out of scope (deliberate)

- The vendor-specific allowlist fix for sift (separate tick)
- The brave-search sitemap fallback (Phase 13.B O2 anchor; separate PR)
- Re-syncing the actual vendor markdown content. This PR ships the
  code fix; a separate re-sync PR (operator-driven, like PR #64) will
  produce the new twilio + sentry mirror commits. Mixing them would
  conflict with the still-open PR #64.

## What this PR ships

- `scripts/crawl-vendors.ts` — 2 changes: page_cap sentinel + relative-URL resolution in `dedupeUrls`.
- `vendor/{twilio,sentry,sift,brave-search}/crawl.json` — `page_cap: 0` → explicit numeric caps.
- This `last-tick.md` (tick 2 record) + an entry in `decisions.md` + queue update in `next-actions.md`.

## Next tick

Per the new top of `next-actions.md`:

**Action #2** — Investigate `migrate-neon.ts` real failure (still
WAITING on a future PR triggering `neon-branch.yml` to surface the
`::error::` annotation via PR #65's mechanism). This very PR may be
the trigger — if it fails, the annotation will tell us exactly which
SQL/connection issue is involved.
