# model-context-protocol

A Claude Code plugin distilling two video courses into actionable skills for building and consuming the Model Context Protocol (MCP).

## Source courses

- **Introduction to Model Context Protocol** (`projects/courses/introduction-to-model-context-protocol__mcp_intro.txt`) — introducing MCP, MCP clients, project setup, defining tools, the server inspector, implementing a client, defining and accessing resources, defining prompts and invoking them from the client, and an MCP review of the three server primitives.
- **MCP Advanced Topics** (`projects/courses/model-context-protocol-advanced-topics__mcp_advanced.txt`) — sampling, log and progress notifications, roots, JSON message types, the stdio transport, the StreamableHTTP transport (in depth), and stateless HTTP.

## What this covers

MCP is a communication layer that gives Claude context and tools without each developer hand-authoring tool schemas. A **client** connects to a **server**; the server exposes three primitives — **tools** (model-controlled), **resources** (app-controlled), and **prompts** (user-controlled). Advanced topics cover server-to-client features (sampling, notifications, roots) and the transports that move JSON-RPC messages between the two ends.

## Skills

| Skill | Triggers on |
|---|---|
| `mcp-overview` | What MCP is, architecture, the three primitives, when to use which |
| `project-setup` | Standing up an MCP client+server project, running it |
| `defining-tools` | Authoring `@mcp.tool` functions on a server |
| `defining-resources` | Exposing data via static and templated resources |
| `defining-prompts` | Server-authored prompt templates and slash commands |
| `server-inspector` | Debugging a server with `mcp dev` / the Inspector |
| `implementing-a-client` | Writing the client session wrapper, listing/calling tools, reading resources, invoking prompts |
| `sampling` | Server requesting LLM generation through the client |
| `notifications-and-progress` | Log + progress notifications during tool execution |
| `roots` | Granting servers scoped filesystem access |
| `json-message-types` | JSON-RPC message taxonomy and direction |
| `transports` | stdio vs StreamableHTTP, SSE internals, stateless HTTP + JSON-response flags |

## A note on src/ grounding (client side)

This workspace's `src/` is Claude Code, which is itself a production **MCP client**. Where a skill discusses the client side — connecting to servers, listing/calling tools, reading resources, transports, notifications — it cites real plumbing under `src/services/mcp/` and `src/tools/*Mcp*`. Server-side server-authoring topics (defining tools/resources/prompts, the Inspector) have no `src/` counterpart here and omit the grounding section rather than fabricate one.

## Running the scripts (programmatic tool calling)

Every script under `skills/*/scripts/*.py` is **self-contained**: it declares its own
dependencies in a [PEP 723](https://peps.python.org/pep-0723/) inline block at the top of the
file. Run any of them with [uv](https://docs.astral.sh/uv/) — it creates an isolated env,
installs the declared deps (cached after first run), and executes:

```bash
uv run skills/<skill>/scripts/<name>.py
```

No virtualenv, no `pip install`, no global package churn. Scripts that call a hosted API
(Anthropic / Bedrock / Vertex / Voyage) read credentials from the environment — set the relevant
key (`ANTHROPIC_API_KEY`, AWS creds, `GOOGLE_*`, `VOYAGE_API_KEY`) before running. Some scripts
are intentionally library-style fragments (a function you import, or an illustrative snippet);
their PEP 723 block still names the SDK so the file is self-contained when wired up.
