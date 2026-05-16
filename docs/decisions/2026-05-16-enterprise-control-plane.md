---
date: 2026-05-16
status: accepted
deciders: alex-jadecli
outcome_id: OCP1
---

# ADR — knowledge-engineering as primary control plane for `subagentmcp` enterprise + `subagentceo` org

## Context

Operator's directive (logged in session todos #77): make this repo —
`subagentceo/knowledge-engineering` — **the primary place where
operator makes changes** at:

- the GitHub org level: `subagentceo`
  (https://github.com/subagentceo) — 10 repos today
- the GitHub Enterprise level: `subagentmcp`
  (https://github.com/enterprises/subagentmcp) — 6 orgs, 93 repos

Today the operator-facing change paths are scattered:
- Org-default settings: `gh api PATCH orgs/subagentceo` ad hoc
- Branch rulesets: `scripts/setup-branch-protection.ts` (this repo)
- Secret rotation: `.claude/skills/refresh-claude-oauth/SKILL.md` (this repo)
- Vendor docs: `vendor/` (this repo)
- Routines: claude.ai web UI (no per-repo trace)
- Atlassian/Jira: `subagentceo.atlassian.net` (mostly empty)

## Decision

`subagentceo/knowledge-engineering` becomes the **canonical control
plane**: every recurring or repeatable org/enterprise operation has a
home here, in one of:

| Surface | Home |
|---|---|
| Skills (operator runbooks for repeatable ops) | `plugins/platform-engineering/skills/<kebab-name>/SKILL.md` |
| Decision records | `docs/decisions/YYYY-MM-DD-<slug>.md` |
| Operator-paste runbooks | `docs/operator-runbooks/<slug>.md` |
| Reproducible imperative scripts | `scripts/<verb-noun>.ts` invoked via `npm run <verb-noun>` |
| Live-state assertion (CI) | `scripts/verify-*.ts` wired into `npm run verify` |
| Cross-repo state | `vendor/<vendor>/` mirrors fed by `npm run crawl:vendor` |

The polyrepo sibling pattern from
[`docs/decisions/2026-05-16-polyrepo-sibling-pattern.md`](./2026-05-16-polyrepo-sibling-pattern.md)
holds: no submodules, no npm `file:` deps, just env-var-referenced
siblings. The control-plane role doesn't change that — it just makes
THIS repo the **first** place to add new automation.

## Why one repo (not org-level meta-repo)

Considered:
- A `subagentceo/.github` org-profile repo (GitHub's standard pattern)
- A new `subagentceo/control-plane` repo
- The existing `subagentceo/polyrepo-engineering` repo (currently a stub)

Chose `knowledge-engineering` because:
1. **Already where automation lives.** 4 verify scripts, 8 workflows,
   7 skills, 25 vendor mirrors, the OAuth-only posture, the
   conventions test, the SessionStart hook + AlloyDB Omni install —
   all already here.
2. **Lowest friction**: extending an active repo is cheaper than
   spinning a new one and migrating.
3. **Discoverable**: the operator opens this repo every session.
4. **Reversible**: if/when a dedicated `subagentceo/control-plane`
   makes sense, the artifacts move via `git mv` — no code restructure.

## What lives here vs elsewhere

| Concern | Lives in `knowledge-engineering` | Lives elsewhere |
|---|---|---|
| Org-default settings (subagentceo) | `scripts/verify-security-posture.ts` asserts; runbook documents the `gh api PATCH` | the live state itself is on github.com (out of git) |
| Branch rulesets per repo | `scripts/setup-branch-protection.ts` | other repos invoke it via `subagentceo/<repo>` clone |
| Secret rotation | `.claude/skills/refresh-claude-oauth/SKILL.md` | the secret value itself is in keychain / GH secret store |
| Enterprise admin (subagentmcp) | future: `scripts/enterprise-*.ts` using admin-jadecli's `admin:enterprise` PAT scope | enterprise membership/policy lives on github.com |
| Per-repo CI workflows | this repo's `.github/workflows/*` | each repo owns its own — this repo just shows the canonical shape |
| Skills (reusable runbooks) | `plugins/platform-engineering/skills/` | published to a plugin marketplace later (see ADR #172) |

## Required follow-up surfaces (not in this PR)

These are the gap items: real automation that should live here but
doesn't yet. Each becomes a future PR per the (O<N>) convention.

| ID | Surface | What it does |
|---|---|---|
| OCP2 | `scripts/enterprise-repo-list.ts` | enumerate every repo across all 6 orgs in subagentmcp enterprise (admin-jadecli) — replace the manual `for org in opencoworkers outcomesdk subagentapps subagentceo subagentcowork subagentplugins` loop in `/Users/alexzh/subagentmcp/CLAUDE.md` |
| OCP3 | `scripts/org-ruleset-sync.ts` | apply the same branch ruleset to every repo in subagentceo (parameterizable to all 6 orgs) |
| OCP4 | `scripts/org-secret-rotate.ts` | rotate a named secret at the org level (`gh secret set --org`) with safe-no-echo |
| OCP5 | `plugins/platform-engineering/skills/enterprise-admin/SKILL.md` | when to use admin-jadecli vs alex-jadecli; the `admin:enterprise` ladder |
| OCP6 | `plugins/platform-engineering/skills/org-onboard-repo/SKILL.md` | bootstrap a new repo in subagentceo with the canonical settings (rulesets, OSV-Scanner CI, validate-skill-frontmatter if it has a `plugins/` dir, etc.) |

## Constraints

- **OAuth-only posture** stays. Org/enterprise admin uses
  alex-jadecli's PAT when `admin:org` is in scope (operator runs
  `gh auth refresh -u alex-jadecli -s admin:org` once), and
  admin-jadecli only when `admin:enterprise` is needed.
- **No live secrets in git.** Any rotation script writes to keychain
  or GH secret store, never to a tracked file.
- **No retroactive sweeps** without operator confirmation. The
  scripts are run-on-demand, not run-by-cron.
- **GoogleOSV-only security stack** per OSL1 — no GitHub Advanced
  Security re-enablement at the org level.

## Citations

- [`/Users/alexzh/subagentmcp/CLAUDE.md`](file:///Users/alexzh/subagentmcp/CLAUDE.md) — enterprise layout (6 orgs, 93 repos)
- [`/Users/alexzh/CLAUDE.md`](file:///Users/alexzh/CLAUDE.md) — identity rotation
- [`docs/decisions/2026-05-16-polyrepo-sibling-pattern.md`](./2026-05-16-polyrepo-sibling-pattern.md) — sibling repo pattern (unchanged)
- [`docs/decisions/2026-05-16-platform-engineering-plugin.md`](./2026-05-16-platform-engineering-plugin.md) — plugin layout
- [`docs/decisions/2026-05-16-osv-only-no-secret-scanning.md`](./2026-05-16-osv-only-no-secret-scanning.md) — security stack constraint
- [`vendor/wellarchitected-github/`](../../vendor/wellarchitected-github/) — GitHub Well-Architected mirror (crawled this session for ground-truth on org/enterprise patterns)
