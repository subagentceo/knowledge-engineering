---
title: Session artifact — tool-anchored llms.txt bridge
description: Cross-lane index mapping each Claude Code tool family to docs, blog, engineering, and support sources.
---

> **Provenance.** Captured from the chat session that produced this repo. No
> new fetches were performed; every link below was already named in
> `code.claude.com/docs/llms.txt` or `platform.claude.com/docs/llms.txt`.

## Subagent / team tools

`Agent`, `SendMessage`, `TeamCreate`, `TeamDelete`. Docs:
`code.claude.com/docs/en/sub-agents`, `code.claude.com/docs/en/agent-sdk/subagents`,
`code.claude.com/docs/en/agent-teams`, `code.claude.com/docs/en/agent-sdk/agent-loop`.
Platform: `platform.claude.com/docs/en/managed-agents/*` (overview, quickstart,
define-outcomes, agent-setup, environments, dreams). Blog:
`/blog/building-multi-agent-systems-when-and-how-to-use-them`,
`/blog/multi-agent-coordination-patterns`,
`/blog/common-workflow-patterns-for-ai-agents-and-when-to-use-them`,
`/blog/building-ai-agents-for-the-enterprise`. Engineering:
`building-effective-agents`, `effective-context-engineering-for-ai-agents`,
`claude-think-tool`, `demystifying-evals-for-ai-agents`. Support:
`14445694-claude-code`.

## Filesystem & code-edit tools

`Read`, `Write`, `Edit`, `Glob`, `Grep`, `NotebookEdit`. Docs:
`code.claude.com/docs/en/permissions`, `permission-modes`, `tools-reference`,
`common-workflows`, `checkpointing`, `agent-sdk/file-checkpointing`,
`claude-directory`, `memory`. Platform: — (no platform analog; these are
CLI/agent tools). Blog: `/blog/eight-trends-defining-how-software-gets-built-in-2026`,
`/blog/product-development-in-the-agentic-era`. Engineering:
`claude-code-best-practices`, `building-c-compiler`. Support: `14445694-claude-code`.

## Shell tools

`Bash`, `PowerShell`, `Monitor`. Docs: `code.claude.com/docs/en/sandboxing`,
`permissions`, `env-vars`, `hooks`, `hooks-guide`, `terminal-config`. Platform:
`platform.claude.com/docs/en/agents-and-tools/tool-use/bash-tool` (the API-level
bash tool — semantically related but a different surface). Blog: —. Engineering:
`claude-code-sandboxing`, `claude-code-auto-mode`. Support: `4078535-safeguards`,
`14445694-claude-code`.

## MCP tools

`ListMcpResourcesTool`, `ReadMcpResourceTool`, `ToolSearch` (and the broader
MCP integration that produces dynamically-named MCP tools). Docs:
`code.claude.com/docs/en/mcp`, `code.claude.com/docs/en/agent-sdk/mcp`,
`code.claude.com/docs/en/agent-sdk/tool-search`,
`code.claude.com/docs/en/channels`/`channels-reference`. Platform:
`platform.claude.com/docs/en/agents-and-tools/tool-use/overview` and the
`### Messages` tool-use entries. Claude.com docs: `claude.com/docs/connectors/*`
and `claude.com/docs/connectors/building/mcp-apps/*` (cross-compatibility,
design-guidelines, external-links, instance-supersession, transparent-theming,
troubleshooting). Blog: `/blog/what-is-model-context-protocol`,
`/blog/extending-claude-capabilities-with-skills-mcp-servers`,
`/blog/building-agents-that-reach-production-systems-with-mcp`. Engineering:
`code-execution-with-mcp`, `desktop-extensions`, `contextual-retrieval`. Support:
`15399129-connectors`, `16163169-claude-desktop`.

## Skill tool

`Skill`. Docs: `code.claude.com/docs/en/skills`,
`code.claude.com/docs/en/agent-sdk/skills`. Claude.com docs:
`claude.com/docs/skills/overview`, `claude.com/docs/skills/how-to`. Platform:
`platform.claude.com/docs/en/agents-and-tools/agent-skills/overview`,
`quickstart`. Blog:
`/blog/building-agents-with-skills-equipping-agents-for-specialized-work`,
`/blog/extending-claude-capabilities-with-skills-mcp-servers`,
`/blog/claude-api-skill`. Engineering: —. Support: `14445694-claude-code`,
`4078531-claude` (consumer skills).

## Plan-mode & worktree tools

`EnterPlanMode`, `ExitPlanMode`, `EnterWorktree`, `ExitWorktree`. Docs:
`code.claude.com/docs/en/ultraplan`, `code.claude.com/docs/en/checkpointing`,
`code.claude.com/docs/en/agent-sdk/file-checkpointing`. Platform: —. Blog: —.
Engineering: `claude-code-best-practices`, `claude-code-auto-mode`. Support:
`14445694-claude-code`.

## Task & todo tools

`TaskCreate`, `TaskGet`, `TaskList`, `TaskUpdate`, `TaskStop`, deprecated
`TaskOutput`, `TodoWrite`, `AskUserQuestion`. Docs:
`code.claude.com/docs/en/agent-sdk/todo-tracking`,
`code.claude.com/docs/en/agent-sdk/user-input`,
`code.claude.com/docs/en/headless`. Platform:
`platform.claude.com/docs/en/managed-agents/define-outcomes` is the conceptual
cousin — it is how outcome-driven sessions express the same "track work to
completion" shape at the API level. Blog:
`/blog/common-workflow-patterns-for-ai-agents-and-when-to-use-them`,
`/blog/building-ai-agents-for-the-enterprise`. Engineering:
`effective-context-engineering-for-ai-agents`. Support: `14445694-claude-code`.

## Scheduling tools

`CronCreate`, `CronList`, `CronDelete`. Docs:
`code.claude.com/docs/en/scheduled-tasks`,
`code.claude.com/docs/en/desktop-scheduled-tasks`,
`code.claude.com/docs/en/routines`. Platform: —. Blog: —. Engineering: —.
Support: `16163169-claude-desktop`, `14445694-claude-code`.

## Web tools

`WebFetch`, `WebSearch`. Docs: `code.claude.com/docs/en/network-config`,
`code.claude.com/docs/en/auto-mode-config`, plus `claude.com/docs/cowork/3p/web-tools`.
Platform: `platform.claude.com/docs/en/agents-and-tools/tool-use/*` includes the
analogous server-side web/search tools. Blog: —. Engineering: —. Support:
`4078534-privacy-and-legal`, `4078535-safeguards`.

## Onboarding & sharing

`ShareOnboardingGuide`. Docs: implied by `code.claude.com/docs/en/champion-kit`
and `communications-kit`; called from `/team-onboarding`. Platform: —. Blog:
`/blog/product-development-in-the-agentic-era`. Engineering: —. Support:
`9387370-team-and-enterprise-plans`, `14445694-claude-code`.

## Cross-cutting

`code.claude.com/docs/en/tools-reference` is the index. Companion pages that
govern *all* tools above: `permissions`, `permission-modes`, `hooks`,
`hooks-guide`, `claude-directory`, `memory`, `glossary`, `how-claude-code-works`,
`agent-sdk/agent-loop`, `agent-sdk/permissions`, `agent-sdk/hooks`,
`agent-sdk/custom-tools`, `agent-sdk/observability`. On the platform side,
`platform.claude.com/docs/en/agents-and-tools/tool-use/overview` is the
conceptual analog for API users defining tool schemas.

## Density summary

The `Agent` / `Team*` / `SendMessage` family is the densest cross-lane node
(every lane has substantive content). MCP and Skill families come next (all
four lanes covered, plus a fifth claude.com surface for connectors and skills
authoring). Filesystem, plan/worktree, scheduling, and task/todo families are
docs- and engineering-heavy with little blog presence. The shell family is
docs-and-engineering with a unique safety story carried by `claude-code-sandboxing`.
Web tools and cron tools are docs-only.
