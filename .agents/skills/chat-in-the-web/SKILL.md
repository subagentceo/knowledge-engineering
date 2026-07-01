---
name: chat-in-the-web
description: >
  Audit and report what tools, skills, MCPs, packages, and capabilities are
  available in the current Codex.ai web session. Use whenever the user asks
  "what's in this environment", "what tools do I have", "what's installed",
  "what can you do here", "do I have postgres", "is web search on", or
  describes confusion about session capabilities. Never claim a capability
  without running its verification command in the same turn. Emits a
  DurableTask to engineering.jsonl for each tool gap found. Pairs with
  durable-toolchain-doctor (deeper env audit) and cowork-setup (role-based
  tool install). Do NOT answer from memory — always verify first.
---

<!--
  @cite cowork/templates/task-state-machine.ts   (DurableTask schema)
  @cite cowork/mcp/e2m-mcp/server.ts
  @cite .Codex/skills/durable-toolchain-doctor/SKILL.md
-->

## Verification-first protocol

Never claim a tool, package, or MCP is available without running its
verification command in the same response. Claim = run first.

```python
from pydantic import BaseModel
from typing import Literal, List

class EnvCapability(BaseModel):
    name: str
    category: Literal["tool","mcp","skill","package","network"]
    status: Literal["present","missing","unknown"]
    verify_cmd: str
    evidence: str    # stdout from verify_cmd
```

## 7-section walkthrough (one section per turn unless user asks for all)

1. **Filesystem** — `ls /sessions/ /home/ /tmp/ 2>/dev/null && df -h`
2. **Pre-installed packages** — `which python3 node npm git jq rg 2>/dev/null`
3. **MCP connectors** — list from session context; verify with one tool call each
4. **Skills** — `ls .Codex/skills/ 2>/dev/null | grep -v ".skill$"`
5. **Network/IO** — `curl -s --max-time 3 https://example.com -o /dev/null -w "%{http_code}"`
6. **Services** — `redis-cli ping 2>/dev/null; psql -c "SELECT 1" 2>/dev/null`
7. **Limits** — context window, tool call limits, file size caps (from session metadata)

## Gap → DurableTask

For each missing tool the user expects:

```json
{
  "id": "<uuid>", "queue": "engineering",
  "subject": "chat-in-the-web: <tool> missing from session environment",
  "state": "pending", "ke_fit_score": 2,
  "created_at": "<iso>", "updated_at": "<iso>",
  "error": {
    "tool": "redis-cli", "category": "package",
    "verify_cmd": "redis-cli ping",
    "resolvable": true,
    "suggested_skill": "durable-toolchain-install"
  }
}
```
