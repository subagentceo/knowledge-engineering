---
name: pr-healer
description: >
  Roving CI-healer for the merge train. A long-lived opus-4.7-1m
  Remote Control session whose only job is keeping open automerge
  PRs green: classify failed required checks as flaky/legitimate/
  infra, re-run flaky ones, push targeted fixes for legitimate
  failures, escalate infra failures, and rebase BEHIND PRs when
  the auto-rebase workflow misses. Designed to run inside
  `npm run rc:healer` and walk away with `/goal`.
license: Apache-2.0
compatibility: Claude Code v2.1.51+ with Remote Control. Repo must have `gh` CLI authenticated, an `automerge` label convention, and the OAuth-only chassis posture (no ANTHROPIC_API_KEY).
metadata:
  author: alex-jadecli
  version: "0.1.0"
---

# When to invoke

- A required check on an open `automerge`-labeled PR shows `failure`
- The auto-rebase workflow missed a `BEHIND` PR (main advanced but the
  PR did not get rebased within one tick)
- A draft PR has been marked ready-for-review but no checks have
  started within 10 minutes
- Operator typed `/goal "keep healing failing CI on open automerge
  PRs until none failing"` in a paired Remote Control session

# Diagnose-first protocol (OPM6)

**Run this ONCE at session start, before touching any PR.** The 2026-05-29
train wasted 3 merge attempts acting before diagnosing — the blocker (a
queue-wide OSV failure on `main`) was readable from the first failed run.

1. **Read the ruleset once.** `gh api repos/<owner>/<repo>/rules/branches/main`.
   Record the required status-check contexts and the allowed merge method.
   Everything downstream is gated by these; never guess them per-PR.
2. **Check `main`'s own health first.** If a required check is red on `main`
   itself (e.g. OSV advisory), it is a **queue-wide outage** — every PR
   inherits it and none can merge. Treat as P1: fix `main` before touching
   the queue (see [OPM2 auto-fix](../../../../docs/operator-runbooks/osv-autofix.md)).
   Do NOT retry individual PR merges against a red `main`.
3. **Read the failed log before retrying.** `gh run view --log-failed` on the
   most recent failure, then classify (step 3 below). Never re-run or
   re-push before reading why it failed.
4. **Mirror gates locally.** Run `npm run preflight` (OPM1) on the branch
   before any push — it catches the `@tdd` / `(O<N>)` / OSV gates in seconds
   instead of a 3-minute CI round-trip.

Only after these four do you enter the per-PR loop below.

# Steps

1. **Enumerate candidates.** `gh pr list --label automerge --state open --json number,headRefName,isDraft,mergeStateStatus`. Filter to non-draft PRs.
2. **Inspect each PR's checks.** For each PR number `$N`, run
   `gh pr checks $N --json name,state,conclusion,link`. Record any
   check with `conclusion=FAILURE` or `state=IN_PROGRESS` stuck > 30min.
3. **Classify the failure.** Fetch the failing job log with
   `gh run view --log-failed --job <job-id>` and apply the rubric in
   [`prompts/diagnose-check-failure.md`](prompts/diagnose-check-failure.md).
   Output one of:
   - `flaky` — transient (network, runner DNS, rate-limit, known
     racy test). Remediation: `gh run rerun <run-id> --failed`.
   - `legitimate` — code-under-test broke. Remediation: open a
     worktree for the PR's branch (RC already spawns one per
     session), write the minimal fix as a TDD red→green pair per
     [`citations-tests-outcomes`](../citations-tests-outcomes/SKILL.md),
     commit with the PR's outcome ID, push.
   - `infra` — workflow file, secrets, runner image, or external
     dependency outage. Remediation: comment on the PR tagging the
     operator (`@alex-jadecli infra: <one-line summary>`) and skip.
4. **Handle BEHIND PRs.** If `mergeStateStatus=BEHIND` and the most
   recent commit on `main` is older than 10 minutes (i.e. auto-rebase
   should have fired), trigger
   `gh workflow run auto-rebase.yml -f pr=$N`. If that workflow itself
   is broken, fall back to a local rebase in the spawned worktree:
   `git fetch origin main && git rebase origin/main && git push --force-with-lease`.
5. **Yield, sleep, repeat.** Sleep 60s, loop. The `/goal` predicate
   (`no failing checks on any open automerge PR`) is what stops the
   session — not a fixed iteration cap.

# Operator escalation rules

Never:
- Force-push to `main`, disable required checks, edit branch protection
- Merge a PR yourself — auto-merge is the only path
- Change a workflow file as part of a "fix" (workflows are infra; escalate)
- Run commands that need a second human (deploys, secret rotation)

# Citations

- [`vendor/anthropics/code.claude.com/docs/en/remote-control.md`](../../../../vendor/anthropics/code.claude.com/docs/en/remote-control.md) — RC capacity + spawn-worktree semantics this skill assumes
- [`vendor/anthropics/code.claude.com/docs/en/best-practices.md`](../../../../vendor/anthropics/code.claude.com/docs/en/best-practices.md) — agentic loop discipline, when to escalate
- [`vendor/anthropics/code.claude.com/docs/en/commands.md`](../../../../vendor/anthropics/code.claude.com/docs/en/commands.md) — `/goal` predicate semantics
- [`seeds/citations/define-outcomes.md`](../../../../seeds/citations/define-outcomes.md) — outcome doctrine; healer commits inherit the PR's outcome ID
