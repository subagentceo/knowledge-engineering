---
title: Architecture
description: Tool-anchored bridge — the ten Claude Code tool families mapped to the four content lanes.
---

> **Source URL:** <https://code.claude.com/docs/en/tools-reference> &nbsp; · &nbsp; **Last fetched:** 2026-05-10

This stack is a **bridge**, not a wrapper. Every Claude Code tool family
that this repo's orchestrator and sub-agents *could* exercise is mapped here
to one (or more) of the four content lanes that should be cited when the
behaviour comes up. The map is the architecture.

## The four lanes

| Lane | Source | What it carries |
|---|---|---|
| `engineering` | <https://www.anthropic.com/engineering> | Technical writeups, research notes (e.g. multi-agent research, effective context engineering, prompt-caching internals). |
| `blog` | <https://www.claude.com/blog> | Product / strategy posts, feature announcements (e.g. MCP, Skills, agent platform). |
| `support` | <https://support.claude.com> | End-user help center articles by collection (Claude Code, Connectors, Desktop, plans). |
| `llms` | <https://anthropic.com/llms.txt> et al. | Plain-text doc indexes for `claude.com`, `claude.com/docs`, `code.claude.com/docs`, `platform.claude.com/docs`, `anthropic.com`. |

## Tool families → lane citations

The ten tool families documented at
[`code.claude.com/docs/en/tools-reference`](https://code.claude.com/docs/en/tools-reference)
each map to a primary citation lane. The orchestrator and sub-agents in this
repo follow the same map.

| Tool family | This repo's analogue | Primary lane | Why |
|---|---|---|---|
| **subagent / team** | `agents: { "npm-research", verifier }` in `src/agent/run.ts` | `engineering` | The multi-agent research pattern is documented in [`built-multi-agent-research-system`](https://www.anthropic.com/engineering/built-multi-agent-research-system). |
| **filesystem (read/write/edit)** | `seed()` in `src/agent/run.ts` reads `seeds/prompts/*.md` from disk; no edits at runtime | `engineering` | Filesystem semantics are covered in [`effective-context-engineering-for-ai-agents`](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents). |
| **shell** | not used at runtime; `scripts/verify.ts` shells out only locally | `engineering` | Sandboxing patterns: [`claude-code-sandboxing`](https://www.anthropic.com/engineering/claude-code-sandboxing). |
| **MCP** | `src/mcp/bridge-server.ts` + `src/mcp/npm-registry/server.ts` (SDK v2, stdio) | `blog` | Strategy posts: [`what-is-model-context-protocol`](https://www.claude.com/blog/what-is-model-context-protocol), [`building-agents-that-reach-production-systems-with-mcp`](https://www.claude.com/blog/building-agents-that-reach-production-systems-with-mcp). |
| **Skill** | not used here; reserved for follow-up | `blog` | [`extending-claude-capabilities-with-skills-mcp-servers`](https://www.claude.com/blog/extending-claude-capabilities-with-skills-mcp-servers). |
| **plan-mode** | the `verifier` sub-agent runs in a separate context, mirroring plan-mode's read-only stance | `engineering` | [`built-multi-agent-research-system`](https://www.anthropic.com/engineering/built-multi-agent-research-system) — separate context for verification. |
| **task / todo** | `npm-research` returns a JSON shape that includes `next_steps[]` for the orchestrator to schedule | `engineering` | Workflow guidance: [`claude-code-best-practices`](https://www.anthropic.com/engineering/claude-code-best-practices). |
| **scheduling** | not directly used; `release-please` handles release scheduling | `support` | Operational guidance for plans is on [`support.claude.com/en/collections/9387370-team-and-enterprise-plans`](https://support.claude.com/en/collections/9387370-team-and-enterprise-plans). |
| **web** | `bridge-utils.fetchText/fetchHtml` and `npm-registry/schemas.fetchJson` — *only* through MCP tools, never as a free-form `web_*` | `llms` | Canonical URLs come from `llms.txt`; the bridge always returns a `source` URL. |
| **onboarding** | `README.md` + `docs/quickstart.md` are the onboarding surface | `support` | Onboarding articles live in [`support.claude.com/en/collections/14445694-claude-code`](https://support.claude.com/en/collections/14445694-claude-code). |

## Runtime topology

```
       user prompt
            │
            ▼
   ┌──────────────────┐
   │  orchestrator    │  systemPrompt = seeds/prompts/system-orchestrator.md
   │  (top-level)     │
   └─────┬──────┬─────┘
         │      │
         │      └────────────────────────────────────────────────┐
         ▼                                                       ▼
 ┌────────────────┐                                 ┌──────────────────────────┐
 │  npm-research  │  tools = mcp__npm-registry__*   │  verifier                │  tools = mcp__knowledge-bridge__*
 │  (sub-agent)   │  (4 tools)                      │  (sub-agent, runs after) │  (12 tools, 3 per lane)
 └───────┬────────┘                                 └────────────┬─────────────┘
         │                                                       │
         ▼                                                       ▼
 ┌────────────────┐                                 ┌────────────────────────────┐
 │ npm-registry   │  stdio MCP server               │ knowledge-bridge           │  stdio MCP server
 │   - org_pkgs   │                                 │   - engineering_*          │
 │   - metadata   │                                 │   - blog_*                 │
 │   - downloads  │                                 │   - support_*              │
 │   - search     │                                 │   - llms_*                 │
 └────────────────┘                                 └────────────────────────────┘
```

## Auth boundary

`src/oauth/token.ts` is invoked at process start by every entry point
(`src/agent/run.ts`, every `src/examples/*.ts`). The check is binary:

- `ANTHROPIC_API_KEY` is set → process exits non-zero.
- `CLAUDE_CODE_OAUTH_TOKEN` (or inherited CLI session) is present → continue.
- Neither → process exits non-zero.

Billing therefore stays on the Max-plan OAuth identity. There is no
fallback path through API-key auth.

## Cloudflare-IaC opt-in (off by default)

`infra/terraform/` ships a skeleton that wires a Cloudflare zone via
`hashicorp/cloudflare` (provider pin from `CLOUDFLARE_TERRAFORM_PROVIDER_VERSION`,
zone from `CLOUDFLARE_ZONE`). `verify:tf` runs `terraform validate` and
`terraform plan` only — never `apply`. Production use should layer on the
[Cloudflare MCP server](https://developers.cloudflare.com/agents/model-context-protocol/) at
`${CLOUDFLARE_MCP_URL}` for runtime control, not Terraform.
