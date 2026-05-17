---
runbook: github-event-routine-setup
outcome: Claude.ai Routine listens to GitHub pull_request events on this repo (`subagentceo/knowledge-engineering`) and auto-fires the platform-engineering security-review skills, fixing or commenting on each PR without operator involvement.
unblocks: Operator's earlier request "i want you add the plugin so you listen to github events." Routines API is web-UI-only for GitHub triggers per vendor/anthropics/code.claude.com/docs/en/routines.md §218.
operator-manual-steps:
  - install the Claude GitHub App on subagentceo/knowledge-engineering
  - create a Routine at claude.ai/code/routines with the prompt below
  - attach a GitHub trigger filtered to pull_request.opened + is-draft=false
outcome_id: OGER1
---

# Operator runbook: GitHub-event-triggered Routine setup

The Routines API (POST /v1/code/triggers) accepts cron + run_once_at
but **not** GitHub triggers. Per
[`vendor/anthropics/code.claude.com/docs/en/routines.md`](../../vendor/anthropics/code.claude.com/docs/en/routines.md)
§218 — "GitHub triggers are configured from the web UI only."

This runbook is the operator-side step-by-step for wiring one.

## Prerequisites

- Operator signed into claude.ai with **alex@jadecli.com** (per
  `~/CLAUDE.md` rotation; Max account, claude-in-chrome enabled)
- Operator has admin on `subagentceo/knowledge-engineering` (alex-jadecli is org Owner)
- Claude GitHub App installed on the repo (the trigger setup wizard
  prompts to install if not already)
- `CLAUDE_CODE_OAUTH_TOKEN` set at the org level (one-time, see PR #171
  [refresh-claude-oauth skill](../../.claude/skills/refresh-claude-oauth/SKILL.md))

## Step-by-step

### 1. Open Routines

Browser → https://claude.ai/code/routines → **Create routine**.

### 2. Name + environment

| Field | Value |
|---|---|
| Name | `platform-engineering: pull_request.opened security sweep` |
| Environment | `subagent-products` (or `managed-subagents`) — both are `anthropic_cloud` |
| Sources | `https://github.com/subagentceo/knowledge-engineering` |
| Model | `claude-sonnet-4-6` (fast + cheap for a triage pass; bump to opus-4-7 if false-positive rate too high) |
| Allowed tools | `Bash, Read, Write, Edit, Grep, Glob, WebFetch, TaskCreate, TaskUpdate, TaskList` |

### 3. Connectors

Include the **MCP_DOCKER** profile so the routine inherits GitHub +
Atlassian + Neon + Redis-Cloud + Filesystem MCPs from the operator's
[`docker-platform-engineering`](../../plugins/platform-engineering/skills/docker-platform-engineering/SKILL.md)
profile.

If MCP_DOCKER isn't in your claude.ai connector list yet, add the
gateway URL — see `plugins/platform-engineering/.mcp.json`.

### 4. Prompt (paste verbatim)

```
You are platform-engineering's PR-event responder. A new non-draft pull
request just opened on subagentceo/knowledge-engineering. Do this:

1. `gh pr view $PR_NUMBER` to load title/body/files-changed.
2. Run the github-repo-security-review skill from plugins/platform-engineering:
   - Pattern-scan the diff for AWS, GitHub, Anthropic, OpenAI, Stripe key
     formats via scanDiffForSecretPatterns in src/lib/github-security-review.ts.
   - If any pattern findings: leave a "::SECURITY::" PR comment naming the
     finding line + kind + a redacted excerpt, request changes, and STOP.
3. Otherwise:
   - Run `npm run verify`. If green, post a one-line "verify green" comment.
   - If red, paste the failing test names + first-line errors as a PR comment.
4. Always cross-link to Jira: create a SCRUM Task named
   `subagentceo__knowledge-engineering__pr-$PR_NUMBER` with the verify
   outcome + first finding (if any). Use mcp__MCP_DOCKER__createJiraIssue.
5. Never push commits to main. Only comment on the PR or open a sub-PR
   into the PR's branch with the fix.

OAuth-only posture: ANTHROPIC_API_KEY must NOT be in env. Use
CLAUDE_CODE_OAUTH_TOKEN (already provided to the routine).
```

### 5. Trigger configuration

| Field | Value |
|---|---|
| Trigger type | **GitHub event** |
| Repository | `subagentceo/knowledge-engineering` |
| Event | `Pull request` |
| Action | `opened` |
| Filter — Is draft | `false` (equals) |

Optional second action: `synchronize` (covers force-pushes; doubles
the cost). Skip on first pass.

### 6. Save and test

Open a no-op test PR (e.g. trivial `docs/` README typo fix) in
`subagentceo/knowledge-engineering`. Within 30-60s, the routine should
fire and leave a comment.

If it doesn't:
- Check `claude.ai/code/routines` → routine detail → past runs for
  the error
- Common: GitHub App not installed on this repo → install when prompted
- Common: CLAUDE_CODE_OAUTH_TOKEN secret missing/expired → use the
  refresh-claude-oauth skill

### 7. Limits (research preview)

Per `routines.md` §223 — "during the research preview, GitHub
webhook events are subject to per-routine and per-account hourly
caps." See your current limits in routine detail. Operator's session
notes 15 routines per 24h.

## Why this is operator-only

The API surface I (the agent) can call from a session does not
include the GitHub-trigger flow. The `RemoteTrigger` tool supports
only cron + run_once_at. The `docker mcp gateway` flow gives me read
access to claude.ai's MCP connectors but not write access to
Routines. Hence: web UI, operator's hands.

## Citations

- [`vendor/anthropics/code.claude.com/docs/en/routines.md`](../../vendor/anthropics/code.claude.com/docs/en/routines.md) — §218-286 GitHub triggers
- [`plugins/platform-engineering/skills/github-repo-security-review/SKILL.md`](../../plugins/platform-engineering/skills/github-repo-security-review/SKILL.md) — the skill the routine runs
- [`plugins/platform-engineering/.mcp.json`](../../plugins/platform-engineering/.mcp.json) — MCP wiring
- [`docs/decisions/2026-05-16-osv-only-no-secret-scanning.md`](../decisions/2026-05-16-osv-only-no-secret-scanning.md) — security-stack rationale (OSL1)
- `/Users/alexzh/CLAUDE.md` — operator's identity rotation (alex@jadecli.com is primary, claude-in-chrome enabled)
