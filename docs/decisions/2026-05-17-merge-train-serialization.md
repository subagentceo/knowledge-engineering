---
date: 2026-05-17
status: accepted
deciders: alex-jadecli
outcome_id: OAUTO8
---

# ADR — keep strict_required_status_checks + pair with auto-rebase

## Context

Branch ruleset `16440994` for `main` sets:

```
required_status_checks:
  strict_required_status_checks_policy: true
  required_status_checks:
    - "npm run verify"
    - "OSV-Scanner (PR) / osv-scan"
```

`strict_required_status_checks_policy=true` means a PR can only merge
when it is **up-to-date** with `main`. Every merge therefore invalidates
every other PR's "up-to-date" state, moving them all to `BEHIND`.

Observed pain (this session, 2026-05-15 → 2026-05-17):
- **PR #187 sat BEHIND for 20+ hours** before being manually rebased
- Mean PR latency over the trailing 24h was 1200+ minutes (20h+)
  for PRs that landed AFTER the audit horizon
- Each merge requires an explicit `gh pr update-branch` call per
  remaining open PR — operator was unable to keep up

## Options considered

### (a) Keep strict; no automation

Status quo before this ADR. **Rejected**: hand-rebasing every PR after
every merge is unsustainable. The session loop spent more time on
rebases than on shipping.

### (b) Disable strict_required_status_checks_policy

Pros: PRs can merge without re-running CI after main advances. No more
BEHIND blockages.

Cons: A semantic conflict (e.g. PR A adds a function, PR B removes the
file that hosts it) can merge silently because B's CI ran against the
pre-A base. With our chassis tests (`verify:libs`, `verify:gates`,
`verify:citations`) this is a real risk — citation guard scans test
files for `@cite` paths that the parallel PR may have removed.

**Rejected**: the cost of one silent broken-main incident is higher
than the cost of the train delay.

### (c) Keep strict, pair with automated rebase ← CHOSEN

`.github/workflows/auto-rebase.yml` (OAUTO2, PR #195 merged 2026-05-17):
on push to `main`, rebase every open `automerge`-labeled non-draft PR
that is currently `BEHIND`. PRs whose rebase hits a conflict are left
alone (DIRTY) for human review.

This gives us:
- Strict safety: CI re-runs against the new base before merge
- Throughput: rebase happens automatically; the GitHub auto-merge
  state machine handles the queue
- DIRTY-on-conflict: human review preserved for the genuinely-hard
  cases

## Decision

Adopt option (c). The ruleset is not changed by this PR — it stays
strict. The behavior change comes from `auto-rebase.yml` already
shipped in OAUTO2.

## Companion fixes shipped in the same session

- **OAUTO7 (PR #194)**: convention regex allowed internal hyphens in
  outcome IDs. Without this fix, several PRs (e.g. `OVS3-FU`) failed
  `npm run verify` after rebase even though the code was correct.
- **OAUTO3 (PR #197)**: crawler `isUnchanged` now also verifies the
  destination file exists. Without this fix, vendor mirrors could
  silently drift to empty trees.
- **OAUTO10 (PR #198)**: `npm run gen:pr-queue` → `docs/pending-prs.md`
  for at-a-glance train state.

## Bootstrap caveat

`auto-rebase.yml` cannot rebase the PR that introduces it. Future
infra-bootstrap PRs that depend on themselves must be hand-rebased
once. Documented here so a future agent doesn't burn time tracing
the chicken-and-egg.

## Consequences

**Positive**

- Mean PR latency from open → merge should drop from 20h+ to a few
  CI cycles (~10 min per blocker ahead in the queue)
- No silent base-divergence merges
- DIRTY PRs surface explicitly — operator review focused on the
  actually-hard cases

**Negative**

- Workflow consumes GitHub Actions minutes on every push to main.
  For our volume (~10 merges/day) this is negligible.
- `automerge` label discipline still required. PRs not labeled won't
  be auto-rebased — by design, so human-driven PRs stay opt-in.

## Citations

@cite vendor/anthropics/code.claude.com/docs/en/best-practices.md
@cite docs/followups/2026-05-17-merge-velocity-audit.md
