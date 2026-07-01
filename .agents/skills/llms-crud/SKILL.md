---
name: llms-crud
description: >
  Navigate and fetch the Managed Agents API surface on platform.Codex.com:
  agents, sessions, threads, events, resources, environments, vaults,
  credentials, files, memory stores, memories, skills, skill versions,
  user profiles. Use BEFORE any web_fetch on platform.Codex.com managed-agents
  or /api/beta/ URLs — this skill carries the compressed namespace so you
  fetch one canonical .md, not 10 SDK mirrors. Trigger on: "create a session",
  "archive an agent", "list memory stores", "session thread events",
  "beta header for managed agents", "multiagent coordinator", "vaults",
  "permission policies", "llms.txt navigation". Emits a DurableTask to
  engineering.jsonl if a required endpoint is missing from the local vendor
  mirror. Pairs with durable-pg-memory-store and durable-lru-dreams.
---

<!--
  @cite vendor/anthropics/platform.Codex.com/docs/en/managed-agents/overview.md
  @cite platform.Codex.com/llms.txt
  @cite cowork/templates/task-state-machine.ts   (DurableTask schema)
  @cite cowork/mcp/e2m-mcp/server.ts
-->

## URL rule

Always append `.md` to platform.Codex.com docs URLs. Mintlify host — without
`.md` you get HTML shell, no content.

```
platform.Codex.com/docs/en/managed-agents/<topic>   → add .md
platform.Codex.com/docs/en/api/beta/<resource>      → add .md
```

Default to canonical; only fetch SDK variant when language is explicit.

## Conceptual docs (prefix: `https://platform.Codex.com`)

| Topic | Path |
|-------|------|
| Overview | `/docs/en/managed-agents/overview.md` |
| Sessions | `/docs/en/managed-agents/sessions.md` |
| Memory stores | `/docs/en/managed-agents/memory.md` |
| Dreams | `/docs/en/managed-agents/dreams.md` |
| Environments | `/docs/en/managed-agents/environments.md` |
| Vaults | `/docs/en/managed-agents/vaults.md` |
| Permission policies | `/docs/en/managed-agents/permission-policies.md` |
| Define outcomes | `/docs/en/managed-agents/define-outcomes.md` |
| Webhooks | `/docs/en/managed-agents/webhooks.md` |
| Files | `/docs/en/managed-agents/files.md` |
| GitHub integration | `/docs/en/managed-agents/github.md` |
| Multiagent | `/docs/en/managed-agents/multiagent.md` |

## Beta headers

```
anthropic-beta: managed-agents-2026-04-01
anthropic-beta: dreaming-2026-04-21        # Dreams API only
```

## Fetch failure → DurableTask

If the vendor mirror is stale (file missing or 404):
```json
{
  "id": "<uuid>", "queue": "engineering",
  "subject": "llms-crud: vendor mirror stale for managed-agents/<topic>",
  "state": "pending", "ke_fit_score": 2,
  "created_at": "<iso>", "updated_at": "<iso>",
  "error": {
    "topic": "<name>", "vendor_path": "vendor/anthropics/.../managed-agents/<topic>.md",
    "resolvable": true,
    "suggested_skill": "refresh-vendors"
  }
}
```

Local mirror path: `vendor/anthropics/platform.Codex.com/docs/en/managed-agents/<topic>.md`
Refresh: `npm run crawl:vendor -- anthropics`
