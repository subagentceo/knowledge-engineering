# ADR: auto-merge recovery — re-trigger required checks after auto-rebase (ORC7)

**Date:** 2026-05-17
**Outcome:** OAUTO12 (this ADR), ORC7 (the workflow fix)
**Status:** Accepted
**Supersedes:** N/A (extends OAUTO2 / ORC4)

@cite .github/workflows/auto-rebase.yml
@cite .github/workflows/verify.yml
@cite .github/workflows/osv-scanner.yml
@cite docs/decisions/2026-05-17-merge-train-serialization.md
@cite docs/decisions/2026-05-16-org-repo-settings-policy.md
@cite vendor/anthropics/code.claude.com/docs/en/changelog.md

## Problem

22 of 28 open PRs are `BLOCKED` with the `automerge` label. The branch ruleset (id `16440994`) requires two contexts as gating checks:

1. `npm run verify`
2. `OSV-Scanner (PR) / osv-scan`

with `strict_required_status_checks_policy: true`. Investigation across PRs #198, #215, #218, #222, #224, #227 shows:

- `verify` workflow **completed SUCCESS** for each PR
- but on a **different head SHA** than the PR's current head
- `gh api repos/.../commits/<current-head>/check-runs` for those PRs returns only the CodeQL trio — verify and osv-scanner are absent from the current SHA

## Root cause

The `auto-rebase` workflow (ORC4, `.github/workflows/auto-rebase.yml`) calls `gh pr update-branch <N>` with `GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}`. GitHub's anti-recursion protection **suppresses workflow re-triggers for events caused by `GITHUB_TOKEN`-authored pushes**. Result: the rebase advances the PR head SHA, no new `pull_request: synchronize` event fires, `verify` + `osv-scanner` never run on the new SHA, and the required-checks gate stays unsatisfied forever.

This matches the same anti-recursion class of bug that ORC4 itself fixed (auto-rebase wasn't firing on `auto-merge`'s GITHUB_TOKEN-triggered events). Identical mechanism, opposite end of the chain.

## Decision

After `gh pr update-branch` succeeds, auto-rebase explicitly dispatches the two required workflows against the rebased branch via `gh workflow run <wf> --ref <branch>`. `workflow_dispatch` is allowed with `GITHUB_TOKEN` and is not subject to anti-recursion.

```bash
if gh pr update-branch "$n"; then
  echo "rebased #$n"
  branch=$(gh pr view "$n" --json headRefName -q .headRefName)
  gh workflow run verify.yml      --ref "$branch" || echo "::warning::verify dispatch failed for #$n"
  gh workflow run osv-scanner.yml --ref "$branch" || echo "::warning::osv dispatch failed for #$n"
fi
```

Both workflows already declare `workflow_dispatch:` in their `on:` block, so no workflow trigger surface needs to change.

## Outcomes (evaluation criteria)

| ID | Outcome | Test |
|---|---|---|
| OAUTO12-1 | auto-rebase.yml re-dispatches `verify` and `osv-scanner` after a successful `update-branch` | `src/lib/auto-rebase-retrigger.test.ts` — greps the workflow body for `gh workflow run verify.yml` and `gh workflow run osv-scanner.yml` inside the post-`update-branch` block |
| OAUTO12-2 | `verify.yml` and `osv-scanner.yml` both expose `workflow_dispatch:` so the redispatch can succeed | same test asserts both files contain `workflow_dispatch:` under `on:` |
| OAUTO12-3 | Branch ruleset's two required contexts remain `npm run verify` and `OSV-Scanner (PR) / osv-scan` (no change to gate) | manual: `gh api repos/.../rulesets/16440994 -q '.rules[].parameters.required_status_checks[].context'` |

## Rejected alternatives

- **Personal Access Token (PAT) secret with `repo` scope** to push from auto-rebase: would fire downstream workflows naturally, but requires an operator action (mint+store secret) and binds workflow trust to a long-lived credential. Out of scope.
- **`workflow_run` on verify.yml/osv-scanner.yml triggered by auto-rebase**: works but expands trigger surface on two foundation workflows and complicates concurrency reasoning. The explicit redispatch is more surgical.
- **Relax `strict_required_status_checks_policy: false`**: would let stale check results gate merges, defeating the point of the ruleset (per `docs/decisions/2026-05-16-org-repo-settings-policy.md`).

## Recovery for the 22 already-BLOCKED PRs

Once this PR merges and auto-rebase next ticks (every 10 min by cron), each BLOCKED PR will be rebased onto the new main and the dispatch will run. The schedule-trigger of auto-rebase is the recovery mechanism — no per-PR manual action required.

For the 3 third_party DRAFTs (#191/#192/#193) and 2 cherry-pick DRAFTs (#201/#202), the gate is operator readiness, not infra. They need `gh pr ready <N>` first. Once ready, the same recovery applies.

## Per-PR remediation map (28 open)

| PR | Title | State | Root cause | Fix path |
|---|---|---|---|---|
| 227 | OVS5 vendor-audit | BLOCKED | stale verify SHA | auto-recovers post-merge of this ADR |
| 226 | ORC5 task-reconcile | BLOCKED | stale verify SHA | auto-recovers |
| 225 | ORC3 pr-reviewer | BLOCKED | stale verify SHA | auto-recovers |
| 224 | OVS6 html_index | BLOCKED | stale verify SHA | auto-recovers |
| 223 | OAPI1 claude-api | BLOCKED | stale verify SHA | auto-recovers |
| 222 | OBP3 rubric conformance | BLOCKED | stale verify SHA | auto-recovers |
| 221 | OBP2 guardrails | BLOCKED | stale verify SHA | auto-recovers |
| 219 | OAPI3 sdk-policy | BLOCKED | stale verify SHA | auto-recovers |
| 218 | OAPI2 runbook | BLOCKED | stale verify SHA | auto-recovers |
| 216 | OREF1 glossary | BLOCKED | stale verify SHA | auto-recovers |
| 215 | OMA5 memory | BLOCKED | stale verify SHA | auto-recovers |
| 214 | OMA3 github | BLOCKED | stale verify SHA | auto-recovers |
| 212 | ORC2 pr-healer | UNSTABLE | claude-review FAILURE (continue-on-error, non-gating); stale verify SHA | auto-recovers |
| 211 | ORC1 remote-control | DIRTY | merge conflict | needs rebase resolution (separate fix) |
| 210 | ORC6 merge-train self-test | BLOCKED | stale verify SHA | auto-recovers |
| 208 | OMSG1 messages-api | BLOCKED | stale verify SHA | auto-recovers |
| 207 | OYT1 youtube playlist | BLOCKED | stale verify SHA | auto-recovers |
| 205 | OPR3-EVAL | BLOCKED | stale verify SHA | auto-recovers |
| 202 | OCP6 turbopuffer | DRAFT/BEHIND | not ready; not labeled `automerge` | `gh pr ready 202` + add label |
| 201 | OCP5 orchestrator | DRAFT/BEHIND | not ready; not labeled `automerge` | `gh pr ready 201` + add label |
| 198 | OAUTO10 dashboard | BLOCKED | stale verify SHA | auto-recovers |
| 193 | OPR4 agent-skills | DRAFT/BEHIND | not ready; operator-review-gated per CODEOWNERS | operator decision |
| 192 | OPR3 docs-mirrors | DRAFT/BEHIND | not ready; operator-review-gated | operator decision |
| 191 | OPR2 cloudflare submodules | DRAFT/BEHIND | not ready; operator-review-gated | operator decision |
| 189 | OAUTO0 audit | BLOCKED | stale verify SHA | auto-recovers |
| 188 | feedback-digest | DRAFT/BEHIND | operator-review | operator decision |
| 174 | OKWP2 AlloyDB Omni | BLOCKED | stale verify SHA | auto-recovers |
| 155 | OCP3+OCP4 paste-prompts | BLOCKED | stale verify SHA | auto-recovers |

**19 of 28 PRs unblock from this single ADR.** Remaining 9: 1 DIRTY (#211 needs rebase), 6 DRAFT operator-gated (#188/191/192/193/201/202).
