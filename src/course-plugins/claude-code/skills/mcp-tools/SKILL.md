---
name: mcp-tools
description: Extend Claude Code with MCP servers (local or remote) that add tools beyond code editing — install with `claude mcp add [name] [start-command]`, approve tools on first use or auto-approve by adding "mcp__[server]" to the allow array in settings.local.json, and use servers like Playwright to drive a browser, screenshot, and iterate on UI. Trigger when asked to add an MCP server, automate a browser, or give Claude access to an external system.
---

# MCP tools

> Distilled from the *Claude Code in Action* course. Grounded in `src/tools/MCPTool/` and `src/services/mcp`.

MCP servers are external tools that extend Claude Code's capabilities. They can run **locally or remotely**, unlocking multi-step workflows that go beyond editing code (e.g. controlling external systems).

- **Install:** `claude mcp add [name] [start-command]` adds an MCP server to Claude Code.
- **Permissions:** the first use of a server's tool requires approval. Auto-approve by adding `"mcp__[servername]"` to the `allow` array in `settings.local.json`.
- **Playwright example (the course's headline use case):** Claude navigated to `localhost:3000`, generated a UI component, analyzed its styling visually, and then automatically refined its own generation prompt based on the visual feedback — producing significantly better styling.

Key benefit: MCP servers let Claude perform sophisticated multi-step tasks involving external systems (browser automation, testing, integrations), turning Claude Code into a full development-automation surface rather than just a code editor.

MCP servers are also usable from the GitHub integration (each MCP tool must be listed explicitly in the workflow permissions — no shortcuts).

## Grounded in src/
- `src/tools/MCPTool/` — the tool wrapper that exposes MCP server tools to Claude (`MCPTool.ts`, `prompt.ts`).
- `src/services/mcp`, `src/utils/mcp`, `src/utils/mcpWebSocketTransport.ts` — MCP server connection/transport (local + remote).
- `src/services/mcpServerApproval.tsx` — the first-use approval / allow-list flow.
- `src/tools/ReadMcpResourceTool`, `src/tools/ListMcpResourcesTool`, `src/tools/McpAuthTool` — MCP resource access and auth.

## Source
Course note(s): "Extending Claude Code with MCP Servers", "Github Integration" — projects/courses/claude-code-in-action__claudecode.txt
