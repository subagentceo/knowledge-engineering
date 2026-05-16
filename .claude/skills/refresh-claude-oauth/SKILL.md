---
name: refresh-claude-oauth
description: >
  Refresh the CLAUDE_CODE_OAUTH_TOKEN secret used by GitHub Actions
  (claude.yml, claude-code-review.yml) when CI fails with "Your
  organization has disabled Claude subscription access for Claude
  Code." Until 2026-06-15, this repo uses CLAUDE_CODE_OAUTH_TOKEN
  only — never ANTHROPIC_API_KEY.
disable-model-invocation: false
---

# When to invoke

- A GitHub Actions run for `claude.yml` or `claude-code-review.yml`
  fails with the org-disabled message.
- Token age exceeds ~11 months (tokens are 1-year per
  `vendor/anthropics/code.claude.com/docs/en/authentication.md`).
- A new repo is created and needs the secret bootstrapped.

# Two-step process

The agent cannot generate the token (browser OAuth required) but
can do everything else. Hand the operator step 1; the agent does step 2.

## Step 1 — operator (one minute, interactive)

In a Max-plan account terminal as **alex@jadecli.com** (default
operator identity for this repo — `~/.claude/CLAUDE.md` lists
admin@ and zhouk.alex@ as fallback rotation only, never the
deprecated JADECLI Team org):

```
claude setup-token
```

This walks through OAuth and prints a 1-year token. Copy the value.

Then set the secret yourself so the agent never sees the token:

```
gh secret set CLAUDE_CODE_OAUTH_TOKEN \
  --org subagentceo \
  --visibility all \
  --body "<paste-token>"
```

Sets at the **org level** so every repo in `subagentceo` picks it up
on the next workflow run. One rotation covers all repos.

Requires the `admin:org` PAT scope. `alex-jadecli` is an org Owner
(can grant the scope) but their current PAT carries only
`gist, read:org, repo, workflow`. To run `gh secret set --org` as
alex, first rescope:

```
gh auth refresh -h github.com -u alex-jadecli -s admin:org
```

If rescoping is blocked, fall back to admin-jadecli for this one
command only:

```
gh auth switch -u admin-jadecli
gh secret set CLAUDE_CODE_OAUTH_TOKEN --org subagentceo --visibility all --body "<token>"
gh auth switch -u alex-jadecli   # restore default
```

(Per-repo override only if a repo has its own
`CLAUDE_CODE_OAUTH_TOKEN` secret, which takes precedence.)

Tell the agent "token refreshed" when done.

## Step 2 — agent (automated)

1. Confirm the secret's updated timestamp:
   `gh secret list --org subagentceo | grep CLAUDE_CODE_OAUTH_TOKEN`
   (falls back to `gh secret list -R subagentceo/knowledge-engineering`
   if the agent's gh token lacks org-secrets read scope; absent at the
   repo level + present at org level is the expected healthy state)
2. Rerun the most recent failed `Claude Code Review` run:
   `gh run list -R subagentceo/knowledge-engineering --workflow="Claude Code Review" --status failure --limit 1 --json databaseId --jq '.[0].databaseId'`
   then `gh run rerun <id>`.
3. Watch the rerun; report green/red back to operator.

# Failure modes

- **Operator pastes token from JADECLI Team org**: same org-disabled
  error recurs. Re-run `claude setup-token` from a Max account.
- **Operator runs `export CLAUDE_CODE_OAUTH_TOKEN=...` in their shell**:
  that does NOT propagate to the agent's Bash tool (different shell)
  and does NOT update the GitHub secret. The `gh secret set --org`
  call is the only thing that matters.
- **`gh secret set --org` returns 403**: alex-jadecli's PAT lacks
  `admin:org`. Run `gh auth refresh -u alex-jadecli -s admin:org`
  to rescope, or temporarily switch to admin-jadecli (see Step 1).
- **Secret set but check still fails**: token may be valid but for a
  different identity than the one the org-disabled message expects.
  Try a different rotation account in step 1.

# Citations

- `vendor/anthropics/code.claude.com/docs/en/authentication.md` —
  canonical `claude setup-token` reference
- `vendor/anthropics/code.claude.com/docs/en/env-vars.md` —
  `CLAUDE_CODE_OAUTH_TOKEN` env var documentation
- `/Users/alexzh/CLAUDE.md` — three Max-plan rotation accounts,
  deprecated JADECLI Team org warning
- `agent-sdk-credit-decision.md` (subagentmcp root) — why this
  posture holds until 2026-06-15
