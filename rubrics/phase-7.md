---
phase: 7
title: Source discovery + plugin marketplace
status: stub
---

# Phase 7 — Source discovery + plugin marketplace

## Criteria

### 1. `discover-sources.ts` returns the expected shape

- `seeds/discovered-sources.json` contains ≥15 `anthropics/*` repos and
  ≥10 `modelcontextprotocol/*` repos.
- Each entry has `nameWithOwner`, `url`, `repositoryTopics`, and (for
  vendors with one) a non-empty `llms.txt` byte size.

### 2. Plugin install is idempotent

- `npm run install:plugins` materializes ≥1 plugin under `.claude/plugins/`.
- Re-running the script makes no further git changes.

### 3. Vendor-list drift warning fires

- If a discovered-llms.txt repo is not in the 12-vendor list, the script
  prints a warning naming the missing vendor.
