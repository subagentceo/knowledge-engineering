# Agent Surface Gap — Agents Only in Cowork+Code

Key finding from firehose prompt 11: Claude's agent capability is NOT available on all surfaces.

## Surface Availability Matrix

| Surface | Agent Support | Notes |
|---|---|---|
| claude.ai/code (Claude Code) | Full agents | Agent SDK, tool use, MCP, multi-agent orchestration |
| claude.ai Cowork (Projects) | Agent-like | Persistent context, tool use, some orchestration |
| claude.ai Chat (regular) | Limited | Tool use only; no SDK-based multi-agent flows |
| Claude Desktop | Limited | MCP client only; executes MCP tools, no SDK agents |
| Claude API (direct) | Full agents | Full Agent SDK access via API; requires OAuth |
| Claude for Enterprise | With config | Enterprise control plane governs agent behavior |

## Gap Analysis

The "Cowork+Code" gap describes a hard boundary in the Claude surface topology:

**claude.ai/chat** — Users on the regular chat surface cannot access Agent SDK orchestration features. Tool use is available but the runtime does not support multi-agent loops, sub-agent dispatch, or programmatic tool-calling chains.

**Claude Desktop** — Acts as an MCP CLIENT: it invokes MCP tools exposed by local or remote servers. It does NOT act as an agent RUNTIME. Claude Desktop does not execute multi-step autonomous agent loops; it delegates every tool call back to a human-confirmed action.

**Cowork+Code surfaces** — The agent-capable surfaces are:
- Claude Code (`claude.ai/code`) — primary; full Agent SDK, MCP orchestration, worktree agents
- Claude API (direct) — full SDK access; the knowledge-engineering chassis uses this path exclusively via OAuth

## Implications for the 4-Domain Product Map

All 4 domains (`opencoworkers.com`, `opensubagents.com`, `managedsubagents.com`, `managedcoworkers.com`) are designed around this boundary:

1. **MCP tool exposure** — All 4 domains expose functionality as MCP tools so Claude Desktop users can invoke them. This is the lowest common denominator.

2. **Advanced orchestration** — Multi-agent loops, coworker dispatch, and sub-agent fan-out require Claude Code or direct API. These features are only advertised to agent-capable surfaces.

3. **Skill catalog labeling** — `opencoworkers.com` and `opensubagents.com` skill catalogs MUST distinguish:
   - `"MCP tool"` — callable from any MCP-capable surface (Claude Desktop, Claude Code, API)
   - `"SDK agent"` — requires Claude Code or direct API; not available in claude.ai/chat or Claude Desktop

## Auth Constraint

All agent-capable paths in the chassis use OAuth exclusively (`CLAUDE_CODE_OAUTH_TOKEN`). `ANTHROPIC_API_KEY` is banned and fails closed. This means:

- Claude Desktop connections to the MCP bridge authenticate via OAuth
- Claude Code sessions use the same OAuth token
- The Cloudflare Worker env-sanitizer strips `ANTHROPIC_API_KEY` before forwarding env to the Sandbox

## See Also

- `docs/architecture/domain-product-map.md` — 4-domain deployment topology
- `vendor/open-managed-agents/architecture.md` — OMA backend architecture
- `src/oauth/token.ts` — OAuth-only enforcement
- `docs/governance.md` — enterprise control plane config
