---
name: refresh-manifest
description: >
  Refresh the subagentmcp enterprise manifest (enterprise.json) by re-enumerating
  all orgs and repos via GitHub API under admin-jadecli. Use when enterprise.json
  is stale (SessionStart drift warning fires past 7 days), when repos/orgs/members
  change, or when the operator says "refresh the manifest", "rebuild enterprise.json",
  or "re-enumerate orgs". Emits a DurableTask to engineering.jsonl if the fetch
  fails or totals.repos changes unexpectedly. Pairs with heartbeat (session-start
  audit) and durable-toolchain-doctor (prerequisite check).
  Do NOT run automatically — user-only because it overwrites enterprise.json.
---

<!--
  @cite enterprise-mirror/.meta/fetch.sh         (org enumeration)
  @cite enterprise-mirror/.meta/build.py         (manifest build)
  @cite cowork/templates/task-state-machine.ts   (DurableTask schema)
  @cite cowork/mcp/e2m-mcp/server.ts
-->

## Manifest schema (Pydantic)

```python
from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class OrgSummary(BaseModel):
    name: str
    repos: int

class ManifestTotals(BaseModel):
    orgs: int
    repos: int
    verified_at: datetime

class EnterpriseManifest(BaseModel):
    enterprise: str
    totals: ManifestTotals
    orgs: list[OrgSummary]
```

## Procedure

```bash
# Step 1 — fetch (requires admin-jadecli with admin:enterprise scope)
gh auth status --user admin-jadecli   # verify scope
.meta/fetch.sh                         # writes .meta/<org>.repos.json

# Step 2 — build
python3 .meta/build.py                 # rewrites enterprise.json, stamps verified_at
```

## Failure → DurableTask

```json
{
  "id": "<uuid>", "queue": "engineering",
  "subject": "refresh-manifest: fetch failed or repo count changed unexpectedly",
  "state": "pending", "ke_fit_score": 3,
  "created_at": "<iso>", "updated_at": "<iso>",
  "error": {
    "step": "fetch|build", "expected_repos": 239, "actual_repos": 0,
    "resolvable": true,
    "suggested_skill": "refresh-Codex-oauth"
  }
}
```

## Verify

```bash
jq ".totals" enterprise.json
git diff --stat enterprise.json   # additive change = healthy
```
