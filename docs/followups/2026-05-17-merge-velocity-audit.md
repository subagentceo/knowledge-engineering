# Merge-velocity + AI-workflow automation audit — 2026-05-17

**Author:** alex-jadecli (autonomous /loop)
**Trigger:** operator directive — "modernize codebase using publicly available strategies for enabling Claude to handle 100% of code and orchestrate it" + reference to Boris Cherny's public talks on hundreds-of-agents/day at Anthropic.

## What's working (don't break)

- **Auto-merge train** when PRs are CLEAN — observed 1-3 min latency from open → merged across PRs #161-#183
- **`allow_auto_merge: true`** + **`delete_branch_on_merge: true`** + **`allow_update_branch: true`** all enabled on the repo. The plumbing is right.
- **Squash-only merges** (`allow_squash_merge: true`, others false) — keeps main linear.
- **`fetch-depth: 0`** in verify.yml — convention test needs full history; correctly set.
- **Outcome-driven conventional commits** `(O<N>)` are being followed consistently in trailing-2-day commits.
- **`concurrency:` cancel-in-progress** on both verify.yml and claude-code-review.yml — avoids stacking runs.
- **`npm run verify` wall time ~1m35s** — not a bottleneck.

## Findings

### [BLOCKER] 1. claude-review fails on every PR — Anthropic org disables Claude subscription for Claude Code

Root cause (from `gh run view --log-failed`):
```
SDK execution error: Claude Code returned an error result:
"Your organization has disabled Claude subscription access for Claude Code.
Use an Anthropic API key instead, or ask your admin to enable access"
```

The `anthropics/claude-code-action@v1` invocation in `.github/workflows/claude-code-review.yml` uses `CLAUDE_CODE_OAUTH_TOKEN` (correct per OAuth-only posture / OSL1) — but the **Anthropic org-level setting blocks subscription access for Claude Code SDK**. Every PR shows a red ✗ for `claude-review`. Non-required, so doesn't block merge, but creates persistent noise + bad signal.

**Fix options (operator + agent split):**
- **Operator action (5 min):** go to console.anthropic.com → org settings → enable "Claude Code SDK access" for this Anthropic org. Re-run a failing job to verify.
- **Agent fix (interim, this PR):** add `if: false` guard on the workflow until operator fixes, OR add `continue-on-error: true` so it stops looking like a regression, OR delete the workflow if operator chooses not to enable.

**Recommended:** ship interim agent fix today (skip workflow with `if: false`) and queue operator task to enable Claude Code SDK access. Don't delete the workflow — it's the right architecture once enabled.

### [BLOCKER] 2. No auto-rebase on BEHIND PRs — manual operator (or agent) intervention required

With `strict_required_status_checks_policy: true` on the branch ruleset, every merge sends remaining open PRs to `BEHIND`. Each requires:
1. `git checkout <branch>`
2. `git rebase origin/main`
3. `git push --force-with-lease`

This was the 20-hour gap on PR #185 (created 01:01, merged 20:57). The agent had to manually rebase via Bash 3+ times this session.

**Capabilities we already have:**
- `allow_update_branch: true` on the repo (GitHub UI button "Update branch" works)
- The `gh pr update-branch` API call (REST `/repos/<o>/<r>/pulls/<n>/update-branch`)

**Missing**: a workflow that **automatically** calls `gh pr update-branch` on any open PR labeled `automerge` that becomes BEHIND.

**Fix:** new workflow `.github/workflows/auto-rebase.yml` triggered on `push` to main. For each open PR labeled `automerge` and not DIRTY, call the update-branch API. The PR's existing auto-merge state machine fires once CI passes.

### [QUICK-WIN] 3. claude-review counts as a status check even when failing — bad UX

GitHub shows it as a red ✗ on the PR even though it's non-required. This makes humans assume the PR is broken. Combined with finding #1, every PR looks half-broken until the operator inspects.

**Fix:** while finding #1 is unresolved, set `continue-on-error: true` on the claude-review job. The check turns yellow ⚠ instead of red ✗.

### [QUICK-WIN] 4. Stuck PRs are invisible — no dashboard

The operator/agent has to run `gh pr list --state open --json mergeable,mergeStateStatus` to know what's stuck. There's no surfaced signal.

**Fix:** new workflow `.github/workflows/pr-queue-report.yml` triggered hourly (cron `7 * * * *`). Output: a markdown file `docs/pending-prs.md` listing BEHIND/DIRTY PRs by age. Commit to main if changed.

### [QUICK-WIN] 5. `.checksums.json` can desync from disk → silent empty mirrors

Discovered via OVS3 elevenlabs (1 .mdx file on disk + 60 entries in checksums.json). The crawler's preflight saw "prior sha matches fetched body" and skipped writeIfChanged. Result: 60 known-good URLs with **zero files on disk**.

**Fix:** `scripts/crawl-vendors.ts` `isUnchanged()` should also assert the target file exists. One-line: if `existsSync(target) && cur === body) return "unchanged"`.

### [QUICK-WIN] 6. No "rebase all my BEHIND PRs" skill

Agent has to do this by hand every loop iteration. Should be one-shot.

**Fix:** add `.claude/skills/rebase-behind-prs/SKILL.md` that wraps the rebase loop. Discoverable; one-line invocation.

### [QUICK-WIN] 7. No "open follow-up PR" skill

When a PR ships an incomplete fix (e.g., OVS3-FU vendor.ts walkMd .mdx), the agent reinvents the PR scaffold each time. Should be a skill.

**Fix:** `.claude/skills/follow-up-pr/SKILL.md` — branch off main, scaffold commit, push, PR with `automerge` label.

### [NICE-TO-HAVE] 8. No worktree dispatcher

Boris Cherny's "hundreds of agents/day" requires parallel git worktrees so multiple agents don't step on each other's branches. Today we have one repo + one branch at a time. The chassis has zero parallelism.

**Fix path:** add a worktree-orchestrator skill (or a separate scripts/worktree-dispatch.ts) that creates `worktrees/<task-id>/` clones per dispatched agent. Out of scope for today's PR — queue as multi-PR follow-up.

### [NICE-TO-HAVE] 9. `claude-code-review` workflow doesn't auto-skip docs/vendor PRs

Currently every PR (including pure-docs-or-vendor PRs) triggers the review. Most don't need it. Wasteful and adds noise.

**Fix:** add `paths-ignore: ['vendor/**', 'docs/**', '*.md']` to the workflow `on:` triggers. Skips noise.

### [NICE-TO-HAVE] 10. No `routine.yml` for "rebase + ship" loops

The /loop pattern that's been driving this session is session-only (CronCreate). For 24h+ autonomy, it needs to migrate to a cloud routine (claude.ai/code/routines + .github/workflows trigger).

**Fix path:** ADR + operator runbook for moving the auto-rebase + ship-PR loop to a cloud routine. Trigger: PR comment `/loop`. Out of scope for today; queue.

## PR queue (ordered)

| # | PR | Outcome | Effort |
|---|----|---------|--------|
| 1 | claude-review `continue-on-error: true` (finding #1 + #3) | OAUTO1 | 5 min |
| 2 | claude-review `paths-ignore: docs/vendor/md` (finding #9) | OAUTO2 | 5 min |
| 3 | auto-rebase workflow (finding #2) | OAUTO3 | 30 min |
| 4 | crawler `isUnchanged` requires file exists (finding #5) | OAUTO4 | 20 min |
| 5 | `rebase-behind-prs` skill (finding #6) | OAUTO5 | 15 min |
| 6 | `follow-up-pr` skill (finding #7) | OAUTO6 | 15 min |
| 7 | pr-queue-report workflow (finding #4) | OAUTO7 | 30 min |

Total estimate: ~2h of agent work for findings 1-7. Findings 8 + 10 (worktrees + cloud routines) need operator scoping first.

## Operator action items (cannot be done by agent)

- **Enable Claude Code SDK access** at console.anthropic.com for the org owning `CLAUDE_CODE_OAUTH_TOKEN`. Unblocks finding #1 fully. Without this, claude-review will keep failing even with the interim fix.
