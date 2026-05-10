---
title: Knowledge Engineering
description: A four-lane bridge from a Claude Agent SDK orchestrator to anthropic.com/engineering, claude.com/blog, support.claude.com, and the llms.txt namespaces. TypeScript only, MCP SDK v2, OAuth-only.
---

This site documents a Claude Agent SDK node whose information architecture
is a **four-lane bridge** to the upstream content sources we cite most:

- [`anthropic.com/engineering`](./lanes/anthropic-engineering)
- [`claude.com/blog`](./lanes/claude-blog)
- [`support.claude.com`](./lanes/support-claude)
- [`llms.txt` namespaces](./lanes/llms-txt)

Each bridge is a sub-agent restricted to a small set of MCP tools served by
one stdio MCP server (`knowledge-bridge`, on
[MCP SDK v2](./reference/bridge-mcp)). Upstream calls to Anthropic are
[OAuth-only](./reference/auth).

Start with [Quickstart](./quickstart) or jump to the
[session artifact](./session-artifact) that captured the original
decomposition.
