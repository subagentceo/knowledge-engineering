---
tick: 11
iso: 2026-05-15T05:15:00Z
git_sha: pending (this PR)
session: claude.ai/code/session_9d8f8432-101f-466f-9c31-b1021ea934e7
trigger: operator-direct (spotify-confidence npm + GitHub inventory pasted)
prev_tick: 10 (PR #76 — outcome-driven conventions; merged as 304e231)
---

# Tick 11 — spotify-confidence ecosystem citation (O1) + O2 deferral

The operator pasted the complete Spotify Confidence developer-surface
inventory: 7 npm packages + 13 GitHub repos covering 9 languages.
This tick captures that data as a citation source. The companion
investigation of the 38-fail crawl (queued O2) revealed the source is
a moving target and is deferred.

## Outcomes declared upfront

- **O1** — Capture Spotify Confidence's SDK ecosystem as a citation
  source for the v2 vendor_graph's `spotify_confidence` entity. ✅
- **O2** — Investigate the 38-fail crawl. ⚠ deferred — see below.

## O1 — ✅ DONE

`seeds/citations/spotify-confidence.md` records:
- 7 npm packages under `@spotify-confidence/*` (5 active, 1 stale, 1 deprecated)
- 13 GitHub repos under `spotify/confidence-*` (9-language SDK coverage)
- The OpenFeature provider trio (cross_refs edge: `implements_provider_for`)
- Distinction between the SDK family and the separate
  `spotify/confidence` Python AB-test-analysis library (289 stars)

Cited from operator's authenticated browser session.

## O2 — ⚠ deferred (moving target)

Re-running `npm run crawl:vendor -- spotify-confidence` from `main`
now reports:

```
[spotify-confidence] no valid llms.txt found in 1 candidate(s)
[spotify-confidence] FAIL fetched=0 unchanged=0 preflight-304=0 failed=1
```

But the tick-6 run (~hour earlier; PR #71) successfully fetched
22 pages from the same URL (38 failed). The discovery probe is now
failing where it succeeded an hour ago. Two possibilities:

1. **Spotify changed their llms.txt** during this session. The .md
   appendage convention is custom; they may have reorganized.
2. **Transient network or rate-limit issue** at the time of this
   re-run.

Either way, **a code fix can't safely land without a stable failure
mode to fix.** Defer until either:
- A future tick reproduces the failure pattern consistently, OR
- The operator confirms the canonical llms.txt URL (or its absence).

Per the new docs/CONVENTIONS.md discipline, an unstable failure mode
is "out of scope" until a stable outcome can be declared.

## What this PR ships (single commit)

| # | Commit | Outcome | Type | SemVer |
| :-- | :--- | :---: | :---: | :---: |
| 1 | `docs(citations): add spotify-confidence SDK ecosystem inventory (O1)` | O1 | docs | none |
| 2 | `chore(heartbeat): tick 11 record (O1)` | O1 | chore | none |

## Verify

```
$ npm run verify
21 vendor(s) | 0 warning(s) | 0 error(s)
```

## Cross-references

- v2 catalog entity: `seeds/citations/vendor-graph-v2.xml` entity id=`spotify_confidence`
- vendor mirror: `vendor/spotify-confidence/` (configs in main; content in PR #71)
- Cross-vendor link: `openfeature` entity (Confidence implements provider for it)
- Next-actions queue: O2 remains item 4 ("spotify-confidence 38-failure"); status now "deferred — moving target"

## Next tick

`next-actions.md` queue:
1. `scripts/get-neon-db-url.ts` — auto-derive `NEON_DATABASE_URL`
2. sift allowlist mismatch
3. gcp allowlist broadening
4. spotify-confidence 38-failure (DEFERRED — moving target)
