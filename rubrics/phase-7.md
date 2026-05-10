---
phase: 7
title: Source discovery + plugin marketplace
status: in-progress
sub-phases:
  - 7.A: discover-sources.ts + snapshot (DONE this PR)
  - 7.B: install-plugins.ts real materializer (DEFERRED)
issue: 11
prs:
  - 27   # this PR (Phase 7.A)
---

# Phase 7 — Source discovery + plugin marketplace

## Phase 7.A — DONE this PR

- ✅ `scripts/discover-sources.ts` (npm `discover:sources`) — refresh
  the snapshot via GitHub REST + `GITHUB_TOKEN`. With `--check` runs
  the drift detection without network.
- ✅ `seeds/discovered-sources.json` — committed snapshot of 51
  anthropics + 37 modelcontextprotocol repos (top-30 each by stars,
  with name/stars/topics/description). Seeded via the GH MCP in this
  session; refresh-from-CI is a one-line script run.
- ✅ Drift check warns when an org repo has topics
  `["claude-code", "skills"]` but isn't in `.claude/plugins.json`
  marketplaces.

## Phase 7.B — DEFERRED

- 🟡 `scripts/install-plugins.ts` real materializer — currently a
  reporter that reads `.claude/plugins.json`. Phase 7.B replaces with
  shallow-clone via GH GraphQL `Tree` queries to materialize each
  plugin under `.claude/plugins/<name>/`.

Defer rationale: materializing pulls non-trivial subtrees from
external marketplaces. Best done with operator review of license
implications + a CI guard for plugin-tree size.

## Criteria

### 1. `discover-sources.ts` returns the expected shape — ✅ DONE

- `seeds/discovered-sources.json` contains ≥15 `anthropics/*` repos
  (have 30) and ≥10 `modelcontextprotocol/*` repos (have 30).
- Each entry has `name`, `stars`, `topics`, `description`.

### 2. Plugin install is idempotent — 🟡 DEFERRED (Phase 7.B)

### 3. Vendor-list drift warning fires — ✅ DONE

- `npm run discover:sources -- --check` reads the snapshot offline,
  walks `vendor/<name>/` directories, and prints a `::warning::` line
  for each org repo that looks like a marketplace candidate but isn't
  yet in `.claude/plugins.json`. Currently 0 drift — both anthropics
  marketplaces (`claude-plugins-official` + `knowledge-work-plugins`)
  are already listed.
