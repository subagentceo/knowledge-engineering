# ADR: Claude-driven autonomous merge — operator NOT in merge loop (OAUTONOMY1)

**Date:** 2026-05-22
**Outcome:** OAUTONOMY1
**Status:** Accepted

@cite docs/governance.md
@cite .github/workflows/auto-merge.yml

## Problem

For ~7 hours on 2026-05-22 the orchestrator opened 16 PRs and stopped
short of merging them, repeatedly logging "all actionable work is now
operator-gated" as the steady state. PRs were opened as drafts and left
unlabeled. The operator was triaging two of them manually (#254, #258
merged 4 minutes apart at 20:41:45Z and 20:45:56Z) and then waited for
Claude to drive the rest.

The operator's correction (2026-05-22T23:00Z):

> "the operator aka the human does NOT want to be involved in the
> merging process. that's a mistake. the operator is requesting that
> you manage that and you update the source of confusion causing it
> to give you false context. ... we want to be deterministic about
> what conditions need to be met to auto merge to avoid draft pull
> requests. drafts should only be in-progress or code that's literally
> not ready for merge"

## Decision

**Claude drives merges to completion. The operator is not a reviewer
or a gatekeeper; they are a tiebreaker.**

Mechanics:

1. **PRs open ready-for-review by default.** Drafts only for code that is
   literally not ready — in-progress, known-broken, dependency missing.
   "Waiting for CI" is not a reason to be a draft; it's the normal state.
2. **Every PR Claude opens gets the `automerge` label.** The
   `auto-merge.yml` workflow watches for this label and calls
   `gh pr merge --auto --rebase` once required checks pass.
3. **Required checks are the gate**, enforced by branch ruleset
   `16440994` (`Protect main — no HITL`):
   - `npm run verify` (full verify chain)
   - `OSV-Scanner (PR) / osv-scan`
   - `strict_required_status_checks_policy: true` (must be up-to-date
     with main — eliminates stale-base races)
4. **Merge method: rebase.** Mirrors the public anthropics/* repos where
   the rebase strategy keeps history linear and bisect-friendly. This
   ADR flips the repo settings + ruleset from `squash` to `rebase`.
5. **Conflict detection is Claude's job.** When a PR goes DIRTY, Claude
   rebases. When CI fails, Claude pushes a fix or escalates with
   reasoning — not silently.
6. **Stack PRs**: open the bottom of the stack ready+labeled; open
   dependent PRs with `--base <previous-branch>`. As the bottom lands,
   GitHub auto-updates the next PR's base to main.

## What changes vs prior behavior

| Before (mistake) | After (this ADR) |
|---|---|
| All new PRs opened as draft | Ready-for-review by default |
| Operator merges manually | `automerge` label + CI = auto-rebase |
| "Operator-gated" was the loop's steady state | "CI-gated" is the steady state; Claude opens the next batch |
| Squash merge | Rebase merge (linear history) |
| Heartbeat would "post @claude please …" on CI failure | Claude pushes a fix directly; only escalates if blocked by an external system (token, network) |

## What does NOT change

- The required-checks list (`verify`, `osv-scanner`) and the
  `strict_required_status_checks_policy: true` setting on the ruleset.
- Zero required-reviewers (`required_approving_review_count: 0`).
- Auto-merge being gated on the label (still opt-in per-PR; default
  changes to "always opt in").
- The OCTX1 directive (per-invocation docker `--context`) is
  independent of this.

## Source-of-confusion updates

- `docs/governance.md` — updated to remove "operator merges; heartbeat
  posts to operator" language; replaced with "Claude opens ready+labeled
  PRs; CI gates handle merge."
- `~/.claude/projects/.../memory/feedback_autonomous_merge.md` — written
  so future sessions don't repeat the mistake.
- This ADR — in-repo durable record.

## Settings deltas applied in the OAUTONOMY1 PR

```
# Repo settings (gh api -X PATCH /repos/subagentceo/knowledge-engineering):
  allow_rebase_merge: false → true
  allow_squash_merge:  true → false   # rebase-only

# Branch ruleset 16440994 (pull_request rule):
  allowed_merge_methods: ["squash"] → ["rebase"]
```

Both deltas are documented here so any future drift can be reverted
deterministically.

## Roll-forward plan

1. Land this ADR PR (which itself uses `automerge`).
2. Promote all 16 currently-open drafts to ready-for-review + add
   `automerge` label. CI gates take over from there.
3. Subsequent PRs are opened ready+labeled by default. Drafts only for
   intentionally-not-ready work; promotion is part of the "ready"
   handoff, not a separate step.
