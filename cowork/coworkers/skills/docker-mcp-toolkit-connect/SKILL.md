---
name: docker-mcp-toolkit-connect
description: >
  Guide Claude and the operator through connecting missing or degraded Docker MCP
  Toolkit servers to the current session — GitHub Official MCP, Tailscale MCP,
  MCP Database Server, GitMCP, Atlassian MCP, Cloudflare AI Gateway MCP.
  Use this skill WHENEVER the user says "connect my MCPs", "add github mcp",
  "wire up docker mcp", "mcp toolkit connect", "docker mcp toolkit connect",
  "reconnect tailscale", "my github tools are missing", "add atlassian to this
  session", or after docker-mcp-toolkit-doctor reports servers as missing/degraded.
  Also fire when a tool call fails because a server isn't wired in and the fix is
  to connect it via the Docker Desktop MCP Toolkit interface.
  Pairs with docker-mcp-toolkit-doctor (detect gaps) and
  docker-mcp-toolkit-autoresolve (queue and close the loop). Do NOT use this for
  shell toolchain gaps — use durable-toolchain-install for those.
---

# docker-mcp-toolkit-connect

Connection guide for each server in the operator's Docker MCP Toolkit profile.
Run `docker-mcp-toolkit-doctor` first to know which servers are missing before
following the steps below.

## Profile reference

Profile: `docker_mcptoolkit__macos__claude_desktop`  
Gateway command: `docker mcp gateway run --profile docker_mcptoolkit__macos__claude_desktop`  
Connected clients: Claude Code, Claude Desktop, Gemini CLI, VS Code  

The Docker MCP Gateway bridges the server connections to all four clients. If none
of the 6 servers are available, the gateway is probably not running — start there.

## Step 0 — Verify gateway is running

```bash
# On the operator's Mac:
docker mcp gateway run --profile docker_mcptoolkit__macos__claude_desktop
```

If this returns immediately or errors, the gateway isn't running. Start it and
then re-run `docker-mcp-toolkit-doctor` to check which servers became available.

## Server connection guides

### GitHub Official MCP (40 tools)

**Auth method in profile:** OAuth (already authenticated — "AUTHENTICATED" badge shown)

If missing in session:
1. The gateway must be running (Step 0)
2. Open Docker Desktop → MCP Toolkit → profile `docker_mcptoolkit__macos__claude_desktop`
3. Confirm "GitHub Official" shows green "AUTHENTICATED" badge
4. If badge is absent, click the GitHub row → "Allow the GitHub Official MCP server to use the GitHub integration"
5. Restart the gateway

The GitHub MCP provides 40 tools including `create_pull_request`, `list_issues`,
`get_file_contents`, `push_files`, `create_branch`, etc.

**Note:** This MCP is OAuth-only. Never use a PAT in the profile config — the OAuth
flow is the correct path.

---

### Tailscale MCP (4 tools)

**Auth method:** No configuration required (badge: "No configuration required")

If missing:
1. Gateway must be running
2. Tailscale must be running on the Mac (`tailscale status` should show connected)
3. The MCP exposes: list devices, get device, enable/disable routes
4. WSL Tailscale IP for this machine: `100.112.152.5` (wsl-ubuntu2604-jadecli)

---

### MCP Database Server (postgres)

**Connection string:** `postgresql+asyncpg://postgres@127.0.0.1:5432/e2m`

This connects to the `e2m` database on localhost (the Mac). From a Cowork session
(sandboxed Linux), this is **not reachable** — it's a loopback address on the Mac.

Fixes ranked by preference:
1. **Expose via Tailscale** — change connection string to use Tailscale IP:
   `postgresql+asyncpg://postgres@100.112.152.5:5432/e2m` (if postgres is bound to
   the Tailscale interface)
2. **Use Neon cloud postgres** — update connection string in Docker Desktop profile
   to the Neon connection string from `src/` config
3. **Local Mac sessions only** — localhost is fine; just note the Cowork limitation

To update the connection string in Docker Desktop:
- Open Docker Desktop → MCP Toolkit → profile → MCP Database Server → Configuration field → paste new string → Save

---

### GitMCP (5 tools, docker-mcp-catalog)

**Auth method:** No configuration required

GitMCP provides: search repository code, read files, list branches, get commits.
If missing, gateway restart is usually sufficient. No OAuth required.

---

### Atlassian MCP (authenticated)

**Auth method:** OAuth (already authenticated — "AUTHENTICATED" badge shown)

If badge is missing:
1. Open Docker Desktop → MCP Toolkit → profile → Atlassian row
2. Click "Allow the Atlassian MCP server to use the Atlassian integration"
3. Complete OAuth in browser (admin@jadecli.com account)
4. Restart gateway

---

### Cloudflare AI Gateway MCP (authenticated)

**Auth method:** OAuth (already authenticated — "AUTHENTICATED" badge shown)

If badge is missing:
1. Open Docker Desktop → MCP Toolkit → profile → Cloudflare AI Gateway row
2. Click "Allow the Cloudflare AI Gateway MCP server to use the Cloudflare AI Gateway integration"
3. Account to use: Alex@jadecli.com (account_id: `e6294e3ea89f8207af387d459824aaae`)
4. Restart gateway

Tools available: `list_gateways`, `list_logs`, `get_log_details`,
`get_log_request_body`, `get_log_response_body`.

---

## After connecting

Once server(s) are connected:
1. Re-run `docker-mcp-toolkit-doctor` to verify all statuses show `connected`
2. If any DurableTasks were queued in `cowork/data/queues/operator.jsonl` for the
   gaps, mark them completed:

```python
import json, datetime

# Read the queue, find matching task_id, append completed transition
transition = {
    "_type": "task",
    "id": task_id,          # same ID as the pending task
    "queue": "operator",
    "subject": original_subject,
    "state": "completed",
    "updated_at": datetime.datetime.utcnow().isoformat() + "Z",
    "from": "docker-mcp-toolkit-connect",
    "payload": {"note": f"{server_name} now connected"}
}
with open("cowork/data/queues/operator.jsonl", "a") as f:
    f.write(json.dumps(transition) + "\n")
```

3. Log resolution:
```
[docker-mcp-toolkit-connect] ✓ github_official: connected — OAuth verified
[docker-mcp-toolkit-connect] ✓ tailscale: connected — 4 tools available
```

## Cowork session limitation

In Cowork (this session), tools from the Docker MCP Gateway are only available if
the gateway explicitly routes them here. Currently this session has:
- Cloudflare MCP: ✓ connected (separate Cowork connector)
- Atlassian MCP: ✓ connected (separate Cowork connector)
- GitHub MCP: ✗ not connected (only in Claude Code / Claude Desktop via gateway)
- Tailscale MCP: ✗ not connected
- GitMCP: ✗ not connected
- MCP Database: ✗ not reachable (localhost only)

To get GitHub MCP in Cowork specifically, the operator needs to add the GitHub
Official MCP as a standalone Cowork connector (Settings → Connections → Add MCP).
This is separate from the Docker Desktop profile and works via OAuth directly.
