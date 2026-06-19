---
name: docker-mcp-toolkit-doctor
description: >
  Audit which Docker MCP Toolkit servers are connected and healthy — GitHub Official
  MCP, Tailscale MCP, MCP Database Server, GitMCP, Atlassian MCP, Cloudflare AI
  Gateway MCP — emit a typed YAML health report, and write a DurableTask for every
  missing or broken server. Use WHENEVER the user says "check my MCP connections",
  "which MCPs are connected", "docker mcp health", "mcp toolkit doctor",
  "is github mcp connected", "check tailscale mcp", "mcp status", starts a session
  needing connectivity verified, or after any tool call fails with "tool not found".
  Also fire when a GitHub operation fails and you suspect the MCP isn't wired in,
  or when the user pastes the Docker Desktop MCP Toolkit profile screenshot.
  Pairs with docker-mcp-toolkit-connect and docker-mcp-toolkit-autoresolve.
  Do NOT use for shell toolchain gaps — use durable-toolchain-doctor for those.
---

# docker-mcp-toolkit-doctor

Deterministic audit of the Docker MCP Toolkit server connections available in the
current session. Every gap becomes a **DurableTask** in the operator queue — nothing
is silently dropped.

## The 6 servers to check

Your Docker MCP Toolkit profile (`docker_mcptoolkit__macos__claude_desktop`) provides
these servers. Check each one by attempting a lightweight probe call:

| Server | Tool prefix | Probe call | Expected |
|---|---|---|---|
| GitHub Official MCP | `mcp__github__*` | list repos or get authenticated user | 40 tools |
| Tailscale MCP | `mcp__tailscale__*` or detect via tool list | list devices | 4 tools |
| MCP Database Server | `mcp__database__*` or postgres via bash | query `SELECT 1` | connects |
| GitMCP | `mcp__gitmcp__*` | search docs or list tools | 5 tools |
| Atlassian MCP | `mcp__atlassian__*` or `mcp__5c8122be-*` | getAccessibleResources | authenticated |
| Cloudflare AI Gateway | `mcp__880bbffd-*` or `mcp__cf_ai_gateway__*` | list_gateways | authenticated |

## Detection strategy

Tool prefixes vary by session. Use this priority order to find each server:

1. **Tool list scan** — look for known tool names in the available tool list
2. **Probe call** — attempt the lightest read operation; a non-error response = connected
3. **Mark absent** — if probe errors with "tool not found" / "no such tool" / timeout

For each server, record one of:
- `connected` — probe succeeded, OAuth/auth confirmed
- `degraded` — server present but probe returned an error (auth expired, wrong config)
- `missing` — no matching tools found in session

## Health report format

Emit this YAML block after running all probes (run probes in parallel where possible):

```yaml
docker_mcp_toolkit_health:
  checked_at: "ISO-8601"
  profile: "docker_mcptoolkit__macos__claude_desktop"
  clients: [claude_code, claude_desktop, gemini_cli, vscode]  # from profile

  servers:
    github_official:
      status: connected | degraded | missing
      tools_available: 40          # or 0 if missing
      auth: oauth                  # oauth | pat | none
      note: ""                     # error message if degraded/missing

    tailscale:
      status: connected | degraded | missing
      tools_available: 4
      note: ""

    mcp_database:
      status: connected | degraded | missing
      connection_string: "postgresql+asyncpg://postgres@127.0.0.1:5432/e2m"
      note: ""

    gitmcp:
      status: connected | degraded | missing
      tools_available: 5
      note: ""

    atlassian:
      status: connected | degraded | missing
      auth: oauth
      note: ""

    cloudflare_ai_gateway:
      status: connected | degraded | missing
      auth: oauth
      note: ""

  summary:
    total: 6
    connected: N
    degraded: N
    missing: N
    action: "all_healthy | run_docker-mcp-toolkit-connect | escalate"
```

## DurableTask emission

For every server with `status: missing` or `status: degraded`, append one task to
`cowork/data/queues/operator.jsonl`:

```python
import json, uuid, datetime

task = {
    "_type": "task",
    "id": str(uuid.uuid4()),
    "queue": "operator",
    "subject": f"MCP gap: {server_name} is {status} — connect via docker-mcp-toolkit-connect",
    "state": "pending",
    "created_at": datetime.datetime.utcnow().isoformat() + "Z",
    "updated_at": datetime.datetime.utcnow().isoformat() + "Z",
    "from": "docker-mcp-toolkit-doctor",
    "ke_fit_score": 4 if status == "missing" else 3,
    "payload": {
        "server": server_name,
        "status": status,
        "note": error_note,
        "resolvable": True,
        "suggested_skill": "docker-mcp-toolkit-connect",
        "profile": "docker_mcptoolkit__macos__claude_desktop",
    }
}

with open("cowork/data/queues/operator.jsonl", "a") as f:
    f.write(json.dumps(task) + "\n")
```

Log every emission to stderr:
```
[docker-mcp-toolkit-doctor] GAP github_official: missing → DurableTask queued
[docker-mcp-toolkit-doctor] GAP mcp_database: degraded (auth error) → DurableTask queued
[docker-mcp-toolkit-doctor] ✓ tailscale: connected
```

## After the audit

- If `action: all_healthy` → report to operator, no further action
- If gaps found → tell the operator which servers are missing and suggest `/docker-mcp-toolkit-connect` to fix them
- If `action: escalate` (all 6 missing) → Docker MCP Gateway may not be running; instruct operator to run:
  ```bash
  docker mcp gateway run --profile docker_mcptoolkit__macos__claude_desktop
  ```

## Postgres connection note

The MCP Database Server is configured with:
```
postgresql+asyncpg://postgres@127.0.0.1:5432/e2m
```
This connects to the `e2m` database on localhost. If running in a Cowork session
(not on the user's Mac), this will be unreachable — mark as `degraded` with note
"localhost only — not reachable from Cowork sandbox". The fix is to expose postgres
over Tailscale or use a cloud postgres URL.
