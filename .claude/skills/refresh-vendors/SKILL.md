---
name: refresh-vendors
description: >
  Re-crawl the vendor/ markdown mirror and schedule automated weekly refreshes.
  Use when the user asks for "weekly vendor refresh", "recrawl docs",
  "refresh vendors", "vendor mirror stale", "set up automated crawl",
  or when npm run verify:freshness reports warn (14d+) or error (30d+).
  Emits a DurableTask to engineering.jsonl if crawl exits non-zero.
  Pairs with citation-service-loop (full pipeline) and heartbeat (trigger).
  Do NOT invoke from within a session when egress is blocked — use
  npm run service:refresh:local instead.
---

<!--
  @cite scripts/crawl-vendors.ts                 (crawl implementation)
  @cite rubrics/phase-2.md                       (freshness thresholds)
  @cite cowork/templates/task-state-machine.ts   (DurableTask schema)
  @cite cowork/mcp/e2m-mcp/server.ts
-->

## Commands

```bash
npm run crawl:vendors           # all 25 vendor surfaces
npm run crawl:vendor -- <name>  # single vendor
npm run verify:freshness        # check last_crawled timestamps
```

## Failure → DurableTask

```json
{
  "id": "<uuid>", "queue": "engineering",
  "subject": "refresh-vendors: crawl failed for <vendor>",
  "state": "pending", "ke_fit_score": 3,
  "created_at": "<iso>", "updated_at": "<iso>",
  "error": {
    "vendor": "anthropics", "exit_code": 1,
    "resolvable": true,
    "suggested_skill": "durable-toolchain-doctor"
  }
}
```

## Schedule (weekly PR)

```bash
/schedule "every Monday 09:00"   "npm run crawl:vendors && npm run verify:freshness &&   (git diff --quiet vendor/ ||     (git checkout -b chore/vendor-refresh-$(date +%Y%m%d) &&      git add vendor/ &&      git commit -m 'chore(vendors): weekly mirror refresh' &&      git push -u origin HEAD &&      gh pr create --label automerge --title 'chore(vendors): weekly mirror refresh'))"
```

## Freshness thresholds (rubrics/phase-2.md)

| Age | Status |
|-----|--------|
| < 14d | ok |
| 14-29d | warn |
| 30d+ | error |
