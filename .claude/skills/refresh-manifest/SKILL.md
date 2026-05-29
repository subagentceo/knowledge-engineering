---
name: refresh-manifest
description: Refresh the subagentmcp enterprise manifest — re-enumerate orgs, pull every repo via the GitHub API under admin-jadecli, rebuild enterprise.json, and stamp a fresh verified_at. Use when enterprise.json is stale (the SessionStart drift warning fires past 7 days), when repos/orgs/members change, or when the operator asks to refresh/rebuild the manifest.
disable-model-invocation: true
---

# Refresh the enterprise manifest

This skill refreshes `enterprise.json` — the canonical map of the `subagentmcp`
GitHub Enterprise (10 orgs, 239 repos as of the last refresh). It is **user-only**
(`disable-model-invocation: true`) because it hits the network and overwrites
`enterprise.json`; don't run it as a side effect of something else.

## When to run

- The SessionStart hook warns the manifest is ≥7 days old (the CLAUDE.md drift SLA).
- New repos, orgs, or members were added to the enterprise.
- The operator explicitly asks to refresh / rebuild / re-verify the manifest.

## Prerequisite

The `admin-jadecli` alias must be authenticated with `admin:enterprise` scope — it
is the only alias that can query `enterprise(slug: "subagentmcp")`. Verify:

```bash
gh auth status --user admin-jadecli
```

If it's missing, run `gh auth login` (or `./setup.sh --auth`) before proceeding.

## Procedure

Two steps, both scripted. Run from the repo root (`/Users/alexzh/subagentmcp`).

### 1. Fetch raw repo data (re-enumerates orgs)

```bash
.meta/fetch.sh
```

This re-enumerates the enterprise's orgs via GraphQL (so a newly-created org is
picked up automatically), then writes `.meta/<org>.repos.json` for each. It runs
under the `admin-jadecli` token.

### 2. Rebuild enterprise.json

```bash
python3 .meta/build.py
```

This projects every raw repo to the manifest's 9-field shape, preserves the
`enterprise` and `identities` blocks (which aren't in the API), recomputes
`orgs` + `totals`, and stamps `verified_at` to today (UTC). Empty raw files
(e.g. the orphaned local `opencoworkers/`) are skipped — they are not real
enterprise orgs.

Pin a specific date with `--date YYYY-MM-DD` if reproducing a past state.

## Verify before trusting the result

After rebuilding, sanity-check the diff — a refresh should be **additive** in the
normal case (new repos/orgs), not a wholesale change:

```bash
git -C "$(git rev-parse --show-toplevel 2>/dev/null || echo .)" diff --stat enterprise.json 2>/dev/null \
  || jq '.totals' enterprise.json
```

Confirm `.totals.repos` moved in the direction you expect. If a whole org's repos
vanished, the fetch likely hit a token-scope or pagination problem — investigate
`.meta/<org>.repos.json` before committing to the new manifest.

> Note: this tree is **not** a git repo and is read-mostly. `build.py` rewrites
> `enterprise.json` in place; there's no commit step here. If the operator wants
> the refreshed manifest version-controlled, that belongs in its real home repo,
> not this mirror tree (per CLAUDE.md).

## Also update CLAUDE.md if structure changed

If the org count changed or an org's role shifted, update the org table and the
layout tree in `CLAUDE.md` to match — the prose there is hand-maintained and
won't auto-sync from `enterprise.json`.
