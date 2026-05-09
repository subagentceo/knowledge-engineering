---
title: Session artifact — four-lane bridge decomposition
description: How the original ten tool-lane decomposition was rotated into four content-source bridges.
---

> **Provenance.** Captured from the chat session that produced this repo.
> Every link below was named in `code.claude.com/docs/llms.txt` or
> `platform.claude.com/docs/llms.txt`; no extra fetches were performed when
> writing this page.

## Why four bridges

The earlier draft enumerated **ten Claude Code tool families**
(Subagent/Team, Filesystem, Shell, MCP, Skill, Plan/Worktree, Task/Todo,
Scheduling, Web, Onboarding) and gave each its own page.

For a knowledge bridge, the wrong axis. The same external content (an
engineering post, a help-center article, a `llms.txt` line) was being cited
across many lanes — so the page-per-tool-family layout duplicated content
and made citation routing harder. We rotated the IA so each page is one
**external source** and the sub-agent for that page is restricted to that
source's MCP tools.

## The four bridges

### 1. `anthropic.com/engineering`

Engineering blog posts cited often: `building-effective-agents`,
`effective-context-engineering-for-ai-agents`, `claude-think-tool`,
`demystifying-evals-for-ai-agents`, `code-execution-with-mcp`,
`claude-code-best-practices`, `claude-code-sandboxing`,
`claude-code-auto-mode`, `desktop-extensions`, `contextual-retrieval`,
`building-c-compiler`.

### 2. `claude.com/blog`

Strategy / product / announcement posts:
`building-multi-agent-systems-when-and-how-to-use-them`,
`multi-agent-coordination-patterns`,
`common-workflow-patterns-for-ai-agents-and-when-to-use-them`,
`building-ai-agents-for-the-enterprise`,
`what-is-model-context-protocol`,
`extending-claude-capabilities-with-skills-mcp-servers`,
`building-agents-that-reach-production-systems-with-mcp`,
`building-agents-with-skills-equipping-agents-for-specialized-work`,
`claude-api-skill`, `eight-trends-defining-how-software-gets-built-in-2026`,
`product-development-in-the-agentic-era`.

### 3. `support.claude.com`

Curated help-center collections:
`14445694-claude-code` (Claude Code), `15399129-connectors`,
`16163169-claude-desktop`, `9387370-team-and-enterprise-plans`,
`4078531-claude` (consumer), `4078534-privacy-and-legal`,
`4078535-safeguards`.

### 4. `llms.txt` namespaces

Five namespaces, treated as the index-of-indexes:
`claude.com/llms.txt`, `claude.com/docs/llms.txt`,
`code.claude.com/docs/llms.txt`, `platform.claude.com/docs/llms.txt`,
`anthropic.com/llms.txt`.

## Mapping back to the old ten lanes

The old tool-family lanes still exist in the upstream docs; this stack
just reaches them through the `llms-txt` bridge instead of mirroring them
locally:

| Old tool family | Likely landing namespace |
|---|---|
| Subagent / Team | `code.claude.com/docs` (subagents, agent-teams), `platform.claude.com/docs` (managed-agents) |
| Filesystem & code-edit | `code.claude.com/docs` (permissions, tools-reference, common-workflows) |
| Shell | `code.claude.com/docs` (sandboxing, hooks); engineering for `claude-code-sandboxing`, `claude-code-auto-mode` |
| MCP | `code.claude.com/docs` (mcp), `platform.claude.com/docs` (tool-use), `claude.com/docs` (connectors); engineering and blog for the named posts above |
| Skill | `code.claude.com/docs` (skills), `claude.com/docs` (skills authoring), `platform.claude.com/docs` (agent-skills) |
| Plan / Worktree | `code.claude.com/docs` (ultraplan, checkpointing) |
| Task / Todo | `code.claude.com/docs` (todo-tracking, user-input, headless), `platform.claude.com/docs` (managed-agents/define-outcomes) |
| Scheduling | `code.claude.com/docs` (scheduled-tasks, routines) |
| Web | `code.claude.com/docs` (network-config, auto-mode-config), `claude.com/docs` (cowork web tools), `platform.claude.com/docs` (tool-use) |
| Onboarding | `code.claude.com/docs` (champion-kit, communications-kit) |

## Density summary

The `claude-blog` and `anthropic-engineering` bridges carry the densest
narrative material (multi-paragraph posts). `support-claude` is densest by
*number* of articles but each article is short. `llms-txt` is the thinnest
bridge but the most-traversed: most cross-cutting questions start there.
