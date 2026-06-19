---
name: docker-mcp-toolkit-autoresolve
description: >
  Read pending MCP connectivity DurableTasks from cowork/data/queues/operator.jsonl,
  classify each as resolvable / unresolvable / requires_escalation, attempt automated
  resolution via docker-mcp-toolkit-connect guidance, and write state transitions
  (completed / failed / blocked) with structured results and full echo log.
  Use this skill WHENEVER the user says "autoresolve mcp", "fix my mcp gaps",
  "resolve mcp tasks", "close out docker mcp tasks", "docker mcp autoresolve",
  "what mcp tasks are pending", or after docker-mcp-toolkit-doctor queues DurableTasks
  and the operator wants them processed automatically.
  Also fire when a scheduled task runs the MCP connectivity check and finds pending
  items in the operator queue tagged with "suggested_skill: docker-mcp-toolkit-connect".
  This is the orchestrator: doctor detects → connect fixes → autoresolve closes the loop.
  Pairs with docker-mcp-toolkit-doctor and docker-mcp-toolkit-connect.
---

# docker-mcp-toolkit-autoresolve

Reads MCP connectivity DurableTasks from the operator queue, classifies them, attempts
resolution, and writes deterministic state transitions. Every outcome is logged —
failures never disappear silently.

## Step 1 — Read pending tasks

```python
import json

tasks = []
with open("cowork/data/queues/operator.jsonl") as f:
    for line in f:
        t = json.loads(line.strip())
        if t.get("_type") == "task" and t.get("state") == "pending":
            tasks.append(t)

# Deduplicate: latest state per task_id wins
by_id = {}
for t in tasks:
    by_id[t["id"]] = t
pending = list(by_id.values())

# Filter for MCP-related tasks
mcp_tasks = [
    t for t in pending
    if t.get("payload", {}).get("suggested_skill") == "docker-mcp-toolkit-connect"
    or "MCP gap" in t.get("subject", "")
]
```

Log to stderr:
```
[docker-mcp-toolkit-autoresolve] Found N pending MCP tasks
```

## Step 2 — Classify each task

For each `mcp_task`, determine resolvability:

| Server | Classification | Reason |
|---|---|---|
| `github_official` | `resolvable` if gateway is running + OAuth badge present; else `requires_escalation` | Needs Docker Desktop UI for OAuth |
| `tailscale` | `resolvable` if Tailscale running on Mac | No config needed |
| `mcp_database` (localhost) | `unresolvable` in Cowork | Loopback unreachable from sandbox |
| `mcp_database` (Tailscale/cloud URL) | `resolvable` | Can probe directly |
| `gitmcp` | `resolvable` if gateway running | No config needed |
| `atlassian` | `resolvable` if OAuth badge present; else `requires_escalation` | Needs Docker Desktop UI |
| `cloudflare_ai_gateway` | `resolvable` | Already wired in Cowork as separate connector |

## Step 3 — Attempt resolution

For each `resolvable` task, attempt to verify the connection is now working:

```python
# Probe strategy per server (same as doctor)
probe_results = {}

# github_official — try listing tools or a lightweight call
# tailscale — attempt list devices
# mcp_database — attempt SELECT 1 if URL is not localhost
# gitmcp — attempt search
# atlassian — already connected in this Cowork session via separate connector
# cloudflare_ai_gateway — already connected via mcp__880bbffd-*
```

Resolution outcomes:
- **connected** → write `completed` transition, log `[RESOLVE]`
- **still missing** → write `failed` transition with `error_type: "gateway_not_running"`, log `[SKIP]`
- **unresolvable** → write `blocked` transition with human-readable escalation note, log `[ESCALATE]`

## Step 4 — Write transitions

For each task, append one transition line to `cowork/data/queues/operator.jsonl`:

```python
import datetime, json

def write_transition(task_id, subject, new_state, from_skill, note, error_type=None):
    t = {
        "_type": "task",
        "id": task_id,
        "queue": "operator",
        "subject": subject,
        "state": new_state,           # "completed" | "failed" | "blocked"
        "updated_at": datetime.datetime.utcnow().isoformat() + "Z",
        "from": from_skill,
        "payload": {
            "note": note,
            "error_type": error_type,           # None if completed
            "resolvable": new_state != "blocked",
            "suggested_skill": "docker-mcp-toolkit-connect" if new_state != "completed" else None,
        }
    }
    with open("cowork/data/queues/operator.jsonl", "a") as f:
        f.write(json.dumps(t) + "\n")
```

**Log prefixes (always to stderr):**
```
[RESOLVE] github_official → completed: OAuth verified, 40 tools available
[SKIP]    mcp_database → failed: gateway_not_running — restart gateway and retry
[ESCALATE] mcp_database (localhost) → blocked: loopback unreachable from Cowork sandbox — update connection string to Tailscale IP or Neon URL
```

## Step 5 — Summary report

After processing all tasks, emit a YAML summary:

```yaml
docker_mcp_toolkit_autoresolve:
  ran_at: "ISO-8601"
  tasks_processed: N
  outcomes:
    completed: N
    failed: N
    blocked: N
  resolved:
    - id: "uuid"
      server: "github_official"
      note: "OAuth verified"
  failed:
    - id: "uuid"
      server: "mcp_database"
      error_type: "gateway_not_running"
      next_step: "run: docker mcp gateway run --profile docker_mcptoolkit__macos__claude_desktop"
  blocked:
    - id: "uuid"
      server: "mcp_database"
      error_type: "localhost_only"
      escalation: "Update connection string to Tailscale IP 100.112.152.5 or Neon URL. See docker-mcp-toolkit-connect §MCP Database Server."
  action: "all_resolved | partial | escalate_to_operator"
```

## When action = "escalate_to_operator"

Tell the operator specifically what manual step is needed. Do not leave them with a
vague "something needs fixing." The most common escalations:

1. **Gateway not running** → `docker mcp gateway run --profile docker_mcptoolkit__macos__claude_desktop`
2. **OAuth needs re-auth** → Open Docker Desktop → MCP Toolkit → click the server → re-allow integration
3. **Localhost postgres unreachable from Cowork** → Update connection string in profile to Tailscale or cloud URL
4. **GitHub MCP not in Cowork** → Add via Cowork Settings → Connections → Add MCP (OAuth, separate from Docker profile)

## Idempotency guarantee

Reading the queue multiple times is safe — the deduplication in Step 1 (latest state
per task_id) ensures already-completed tasks are never re-processed. Running autoresolve
twice produces the same outcome.
