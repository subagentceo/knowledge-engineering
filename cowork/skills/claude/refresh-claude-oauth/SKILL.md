---
name: refresh-claude-oauth
description: >
  Refresh CLAUDE_CODE_OAUTH_TOKEN for GitHub Actions when CI fails with
  "organization has disabled Claude subscription access". Use when claude.yml
  or claude-code-review.yml CI fails with that message, token age exceeds
  11 months, or a new repo needs the secret bootstrapped. Emits a DurableTask
  to engineering.jsonl after token refresh so the CI rerun is tracked.
  Pairs with heartbeat (CI failure response) and refresh-manifest (org-level
  operations). ANTHROPIC_API_KEY is always rejected — OAuth only.
  Do NOT generate the token (browser OAuth required) — guide the operator.
---

<!--
  @cite vendor/anthropics/code.claude.com/docs/en/authentication.md
  @cite cowork/templates/task-state-machine.ts   (DurableTask schema)
  @cite .claude/rules/pr-ops.md
-->

## Pydantic schema

```python
from pydantic import BaseModel
from datetime import datetime
from typing import Literal

class OAuthRefreshTask(BaseModel):
    token_owner: Literal["alex@jadecli.com"]
    gh_org: str = "subagentceo"
    visibility: Literal["all"] = "all"
    status: Literal["pending","refreshed","verified"]
    refreshed_at: datetime | None = None
    rerun_id: str | None = None    # GitHub Actions run ID
```

## Step 1 — operator (browser, 1 min)

```bash
# Run on a Max-plan account terminal
claude setup-token
# Copy the printed token, then:
gh secret set CLAUDE_CODE_OAUTH_TOKEN   --org subagentceo --visibility all --body "<paste-token>"
```

If `admin:org` scope missing on gh token:
```bash
gh auth refresh -h github.com -u alex-jadecli -s admin:org
```

## Step 2 — agent (automated after operator says "token refreshed")

```bash
# Verify secret updated
gh secret list --org subagentceo | grep CLAUDE_CODE_OAUTH_TOKEN

# Rerun last failed workflow
RUN_ID=$(gh run list -R subagentceo/knowledge-engineering   --workflow="Claude Code Review" --status failure --limit 1   --json databaseId --jq ".[0].databaseId")
gh run rerun "$RUN_ID"
```

Emit DurableTask tracking the rerun:

```json
{
  "id": "<uuid>", "queue": "engineering",
  "subject": "refresh-claude-oauth: rerun dispatched for run_id=<id>",
  "state": "pending", "ke_fit_score": 2,
  "created_at": "<iso>", "updated_at": "<iso>",
  "error": {
    "run_id": "<id>", "workflow": "Claude Code Review",
    "resolvable": true, "suggested_skill": "heartbeat"
  }
}
```

## Failure modes

| Symptom | Fix |
|---------|-----|
| Same org-disabled error after refresh | Token from wrong account — use Max-plan |
| `gh secret set` returns 403 | Rescope: `gh auth refresh -s admin:org` |
| Token valid but wrong identity | Try different rotation account |
