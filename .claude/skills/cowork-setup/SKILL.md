---
name: cowork-setup
description: >
  Onboard a new coworker (human or agent) to the knowledge-engineering repo.
  Walks role selection, plugin/skill install, tool connection, first skill
  run, and contribution loop. Use when anyone asks "how do I get set up",
  "onboard me", "what plugins do I need", "cowork setup", or names a role
  (data-engineer, researcher, frontend). Emits a DurableTask to
  engineering.jsonl if toolchain gaps are detected. Pairs with
  durable-toolchain-doctor (environment audit) and heartbeat (first tick).
  Do NOT use for per-session context recovery — use heartbeat for that.
---

<!--
  @cite cowork/coworkers/manifest.json           (coworker registry)
  @cite cowork/templates/task-state-machine.ts   (DurableTask schema)
  @cite cowork/mcp/e2m-mcp/server.ts
  @cite .claude/rules/pr-ops.md
-->

## Onboarding schema (Pydantic)

```python
from pydantic import BaseModel
from typing import Literal, List

class CoworkerSetup(BaseModel):
    role: Literal["data-engineer", "researcher", "frontend", "engineering"]
    plugins: List[str]
    skills: List[str]
    first_skill: str
    gaps: List[str] = []   # filled by durable-toolchain-doctor
```

## Roles

| Role | Plugins | First skill |
|------|---------|-------------|
| data-engineer | claude-deployments, model-context-protocol | semantic-cache |
| researcher | ai-fluency, claude-api | read-reference-managed-agents |
| frontend | claude-code | format-markdown |
| engineering | claude-code, model-context-protocol | durable-toolchain-doctor |

## Step 1 — Environment audit

```bash
# runs durable-toolchain-doctor; emits DurableTask for each gap
python3 .claude/skills/durable-toolchain-doctor/SKILL.md
```

If gaps found → DurableTask emitted to `cowork/data/queues/engineering.jsonl`:

```json
{
  "id": "<uuid>", "queue": "engineering",
  "subject": "cowork-setup: toolchain gap for role=<role>",
  "state": "pending", "ke_fit_score": 3,
  "created_at": "<iso>", "updated_at": "<iso>",
  "error": {
    "role": "<role>", "missing": ["redis-cli", "psql"],
    "resolvable": true,
    "suggested_skill": "durable-toolchain-install"
  }
}
```

## Step 2 — Tool checklist

```yaml
checklist:
  - service postgresql start && service redis-server start
  - OAuth only: CLAUDE_CODE_OAUTH_TOKEN; ANTHROPIC_API_KEY rejected everywhere
  - GitHub via MCP tools (no gh CLI in web sessions)
  - DATABASE_URL: postgres://<user>@/<db>?host=/var/run/postgresql
```

## Step 3 — Contribution loop

```
Read cowork/data/queues/<domain>.jsonl → claim top pending task →
git checkout -b claude/<slug> → commit per todo → push →
PR with labels automerge → auto-merge on CI green.
```

One task per PR. Branch must start with `claude/`.
