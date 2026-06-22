---
name: read-reference-managed-agents
description: >
  Answer questions about Claude Managed Agents concepts (sessions, threads,
  vaults, permission policies, multiagent, define-outcomes, memory stores,
  environments, files, github, webhooks, dreams) from the local vendor mirror
  at vendor/anthropics/platform.claude.com/docs/en/managed-agents/. Zero
  network — read the mirror, never web_fetch. Use whenever the user asks how
  a managed-agents concept works or names any topic in the /managed-agents/
  namespace. Emits a DurableTask to engineering.jsonl if the mirror is stale.
  Pairs with llms-crud (URL topology) and durable-pg-memory-store (persistence).
  Do NOT use for API calls or code generation — this is a reference-read skill.
---

<!--
  @cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/overview.md
  @cite cowork/templates/task-state-machine.ts   (DurableTask schema)
  @cite cowork/mcp/e2m-mcp/server.ts
-->

## Protocol (all steps in one turn)

```python
# Pydantic schema for the answer envelope
from pydantic import BaseModel
from typing import Optional

class ManagedAgentsAnswer(BaseModel):
    topic: str
    source_path: str          # vendor/anthropics/.../managed-agents/<topic>.md
    section: Optional[str]    # header of the matched section
    answer: str               # paraphrase, not verbatim copy
    cite: str                 # "vendor/anthropics/.../<topic>.md § <section>"
    mirror_fresh: bool        # False → emit DurableTask
```

1. Resolve doc root: `vendor/anthropics/platform.claude.com/docs/en/managed-agents/`
2. If root missing → emit stale-mirror DurableTask, fall back to `references/` snapshot.
3. Grep manifest for matching header → open only the matched section (not the whole file).
4. Answer with `cite:` field populated.

## Stale mirror → DurableTask

```json
{
  "id": "<uuid>", "queue": "engineering",
  "subject": "read-reference-managed-agents: vendor mirror missing or stale",
  "state": "pending", "ke_fit_score": 2,
  "created_at": "<iso>", "updated_at": "<iso>",
  "error": {
    "vendor_path": "vendor/anthropics/platform.claude.com/docs/en/managed-agents/",
    "resolvable": true,
    "suggested_skill": "refresh-vendors"
  }
}
```

Refresh: `npm run crawl:vendor -- anthropics`

## Topic → file map

| Topic | File |
|-------|------|
| sessions, threads, events | sessions.md |
| memory stores, memories | memory.md |
| dreams, consolidation | dreams.md |
| environments, sandboxes | environments.md |
| vaults, credentials | vaults.md |
| permission policies | permission-policies.md |
| define outcomes | define-outcomes.md |
| files | files.md |
| github integration | github.md |
| multiagent, coordinator | multiagent.md |
| webhooks | webhooks.md |
