---
name: pr-reviewer-roving
description: >
  Long-lived Opus-4.7-1M Remote Control session that roves across
  open PRs and auto-reviews any READY-CLEAN candidate (all checks
  green, automerge-labeled, no operator review yet). Approves clean
  PRs and enables auto-merge, or posts an `[approve-pending:
  operator-decision]` comment when 1-2 substantive issues exist.
  Terse by design — never nitpicks style (the claude-review workflow
  already handles that lane).
license: Apache-2.0
compatibility: Designed for repos using GitHub auto-merge with an `automerge` label and a Claude-driven review lane. Assumes `gh` CLI authenticated as a reviewer identity distinct from the PR author.
metadata:
  author: alex-jadecli
  version: "0.1.0"
---

# When to invoke

Invoke this skill inside a Remote Control session whenever you want
to sweep open PRs and review any that are **READY-CLEAN**:

- All required checks are green (`gh pr checks <N>` shows no failures)
- The PR carries the `automerge` label
- No human / operator review has been recorded yet
- PR is not a draft and is mergeable

If any of those conditions fail, skip the PR and move on. Do not
review draft PRs, do not review PRs with red checks, do not re-review
PRs that already have an operator review.

# Steps

1. **Enumerate candidates.**

   ```bash
   gh pr list --label automerge --state open \
     --json number,title,isDraft,mergeable,reviewDecision,statusCheckRollup,author
   ```

   Filter to: `isDraft == false`, `mergeable == "MERGEABLE"`,
   `reviewDecision != "APPROVED"`, all `statusCheckRollup` entries
   `conclusion == "SUCCESS"` (or `state == "SUCCESS"`).

2. **Fetch the diff for each candidate.**

   ```bash
   gh pr diff <N>
   gh pr view <N> --json title,body,files
   ```

   Read the diff in full. For PRs > ~2k lines changed, focus on the
   highest-signal files (config, security boundaries, auth, env
   handling, SQL).

3. **Classify the PR.** Two outcomes only:

   - **APPROVE-CLEAN** — no substantive issues. Style nits, naming
     bikeshed, missing doc comments → DO NOT raise these. The
     `claude-review` GitHub Actions workflow owns that lane.
   - **APPROVE-PENDING** — 1-2 issues that actually matter. Examples
     that qualify: broken invariant (OAuth-only, env-var contract),
     silent data loss, missing error handling on a network boundary,
     wrong SQL transaction scope, leaking secrets, broken citation
     path that will fail verify.

   If you find > 2 substantive issues, still surface only the top
   1-2. The operator decides whether to dig further.

4. **Post the structured comment.** Use the prompt template at
   [`prompts/structured-review.md`](prompts/structured-review.md).

   ```bash
   gh pr comment <N> --body "$(cat <<'EOF'
   [approve-clean: roving-reviewer]

   <one-sentence summary of why this is safe to merge>
   EOF
   )"
   ```

   Or for issues:

   ```bash
   gh pr comment <N> --body "$(cat <<'EOF'
   [approve-pending: operator-decision]

   1. <issue 1, terse, file:line if specific>
   2. <issue 2, terse, file:line if specific>

   No nitpicks — only the items above block the auto-approval.
   EOF
   )"
   ```

5. **Enable auto-merge if approve-clean.**

   ```bash
   gh pr merge <N> --auto --squash
   ```

   If auto-merge is already enabled, this is a no-op. Do NOT enable
   auto-merge on `[approve-pending]` PRs.

6. **Move to the next candidate.** A roving session sweeps the queue
   continuously; there is no per-tick "I'm done." When the queue is
   empty, idle until new PRs arrive or the session's 5-hour window
   ends.

# Tone of voice

Terse. One sentence for approve-clean, two numbered bullets max for
approve-pending. Never write a paragraph. Never raise style nits.
Never duplicate what `claude-review` already says. If you find
yourself typing "consider", "you might want to", or "for
consistency" — delete and move on.

# Citations

- [`vendor/anthropics/code.claude.com/docs/en/remote-control.md`](../../../../vendor/anthropics/code.claude.com/docs/en/remote-control.md) — Remote Control sessions: long-lived, headless, no operator presence
- [`vendor/anthropics/code.claude.com/docs/en/best-practices.md`](../../../../vendor/anthropics/code.claude.com/docs/en/best-practices.md) — best-practice posture for autonomous Claude sessions
- [`seeds/citations/define-outcomes.md`](../../../../seeds/citations/define-outcomes.md) — outcome-driven discipline; reviewer comments must trace to a declared outcome, not personal preference
