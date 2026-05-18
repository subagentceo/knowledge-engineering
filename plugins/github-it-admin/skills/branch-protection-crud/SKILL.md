---
name: branch-protection-crud
description: Full CRUD over the GitHub branch protection ruleset (gh api repos/.../rulesets/<id>). Use when adding/removing required status checks, adjusting strict_required_status_checks_policy, or modifying any other ruleset parameter. The chassis ruleset id is 16440994 (from setup-branch-protection.ts).
---

# branch-protection-crud

## When to invoke

- Adding a new required status check (e.g., promoting a `verify:*` step to gate merges).
- Removing or relaxing checks (rare — usually a sign of CI fragility that should be fixed instead).
- Changing `strict_required_status_checks_policy` (this was the OAUTO12 / ORC7 root cause).
- Auditing the current ruleset shape against expectations.

## Prerequisites

- `gh auth status` returns `admin:org` scope on `alex-jadecli`.
- The existing repo helper at `scripts/setup-branch-protection.ts` (this skill wraps it for CRUD, not replaces).

## Ruleset reference

Current chassis ruleset: id `16440994` on `subagentceo/knowledge-engineering`. Source-of-truth is `scripts/setup-branch-protection.ts`.

## Verbs

### CREATE (initial setup — usually one-time per repo)

```bash
npm run setup:branch-protection
```

Already exists; this skill just documents that it's the canonical CREATE path.

### READ

```bash
gh api repos/${user_config.gh_org}/${user_config.gh_repo}/rulesets/16440994 | jq
```

Returns the full ruleset including `required_status_checks`, `strict_required_status_checks_policy`, target branches, etc.

### UPDATE

```bash
npx tsx "${CLAUDE_PLUGIN_ROOT}/skills/branch-protection-crud/scripts/update-required-checks.ts" \
  --add "npm run new-check" \
  --remove "stale-check"
```

The script:
1. `GET`s the current ruleset.
2. Computes the new `required_status_checks` array (idempotent — add-already-present is a no-op).
3. `PUT`s the updated ruleset back.
4. Verifies by re-reading and asserting the array matches.

### DELETE

```bash
gh api -X DELETE repos/${user_config.gh_org}/${user_config.gh_repo}/rulesets/16440994
```

Skill provides this verb for documentation, but **does not script it** — deleting a branch ruleset is a high-blast-radius operation that opens the main branch to direct pushes. Operator must run the raw `gh api` command intentionally.

## Anti-silent-failure rules

1. Every UPDATE does read-after-write — compares the array post-PUT against the expected diff.
2. Never silently drop a required check during an UPDATE — if the diff is unexpected, abort and report.
3. DELETE has no script — must be operator-initiated.

## Outcomes

| ID | Outcome | Verified by |
|---|---|---|
| OIT2-bp-1 | Wraps existing `setup:branch-protection` for CREATE (no duplication) | this SKILL.md references the script |
| OIT2-bp-2 | UPDATE script is idempotent and does read-after-write | unit test |
| OIT2-bp-3 | DELETE intentionally has no script (high blast radius) | SKILL.md states this explicitly |

## Citations

@cite scripts/setup-branch-protection.ts
@cite docs/decisions/2026-05-17-auto-merge-recovery.md (OAUTO12 — strict_required_status_checks_policy interaction)
@cite https://docs.github.com/en/rest/repos/rules
