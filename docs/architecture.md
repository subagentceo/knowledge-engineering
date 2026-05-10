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

## Operator posture

PR #3 introduces an explicit, citation-backed working agreement seeded
from the operator prompt at `seeds/prompts/operator-2026-05-10.md` and
its follow-up at `seeds/prompts/operator-2026-05-10-followup.md`. The
posture is decomposed into XML at `seeds/posture/session-start.xml` and
will be loaded by `src/agent/run.ts` as a system-prompt prefix in Phase 6.

Headline rules:

- **Auth.** OAuth-only. `CLAUDE_CODE_OAUTH_TOKEN` required;
  `ANTHROPIC_API_KEY` is forbidden everywhere — host process, sandbox env,
  and forwarded env maps. The OAuth gate (`src/oauth/token.ts`) fails
  closed when `ANTHROPIC_API_KEY` is set; the cloud-agent runner repeats
  the check at the Worker boundary (see below).
- **Discipline.** Commit-per-todo / per-subtask / per-task; multi-turn
  agent loops only; ODD + TDD + Citations on every new test file
  (`@cite` headers resolved to `vendor/`, `seeds/`, or `rubrics/` by
  `scripts/lib/citation-guard.ts`).
- **Routines.** Single user-facing umbrella `/routines` at
  `.claude/skills/routines.md`, dispatching to `/loop` (interval) or
  `/schedule` (cron-style recurrence).
- **Long-arc.** Workers-resident agents writing the codebase end-to-end
  (the publicly-documented Boris Cherny subagent-loop-and-routines
  pattern). Phase 0g is the first concrete step.

The full posture (auth, discipline, routines, execution, doc-rules,
connectors, accounts, sources) lives in `seeds/posture/session-start.xml`.

## Subprocessors

Per `SUBPROCESSORS.md` (root), inspired by
<https://trust.anthropic.com/subprocessors>, we maintain a transparent
inventory of every vendor the chassis depends on with auth, data scope,
and cited docs. Tier 1 (active outbound calls):

| Vendor | Role | Auth |
|---|---|---|
| Anthropic | Claude model + Messages/Batches API | `CLAUDE_CODE_OAUTH_TOKEN` (OAuth Bearer) |
| GitHub | repo + Actions + secrets | GH MCP OAuth or workflow `GITHUB_TOKEN` |
| Cloudflare | Worker + Sandbox + Secrets Store | `CLOUDFLARE_API_TOKEN` |
| Neon | Postgres branching | `NEON_API_KEY` |
| Turbopuffer (Phase 11.C) | vector + BM25 search | `TURBOPUFFER_API_KEY` — see `seeds/citations/turbopuffer.md` for the per-vendor namespace + hybrid-search plan |
| Voyage AI (Phase 11.C optional) | embeddings | `VOYAGE_API_KEY` |
| npm registry | public package metadata | none |

Tier 2 (mirrored at crawl time, read-only at runtime) covers the other
crawled vendors. Forking founders MUST re-evaluate every row before
adding end-user data.

## Account ledger

Two GitHub accounts run the `subagentceo` org and are admins on the
following services. Connectors for these services should be registered
first; `gen:servers` (Phase 6) emits `servers/<connector>/<tool>.ts` for
each, and code-mode programmatic tool calling becomes the default path.

| Account             | GitHub org access      |
| ------------------- | ---------------------- |
| `admin@jadecli.com` | admin on `subagentceo` |
| `alex@jadecli.com`  | admin on `subagentceo` |

| Service                   | Connector role                                               | In the 12-vendor list? |
| ------------------------- | ------------------------------------------------------------ | ---------------------- |
| `parallel.ai`             | (TBD — connector availability check)                         | No (new)               |
| `dash.cloudflare.com`     | sandbox host + edge runtime; `@cloudflare/codemode`          | Yes (cloudflare)       |
| `neon.com`                | ephemeral DB branches + Neon SDK                             | Yes (neon)             |
| `turbopuffer.com`         | vector store (future use for embeddings/grep)                | Yes (turbopuffer)      |
| `nimbleway.com`           | (TBD — connector availability check)                         | No (new)               |
| `ollama.com`              | local-model fallback for offline crawl/grade tasks           | No (new)               |
| `sentry.com`              | error monitoring for the runner Worker                       | Yes (sentry)           |

## Cloud agents (Cloudflare Sandbox + Neon Database Branching)

Phase 0g of PR #3 scaffolds a Cloudflare Worker at `infra/cloudflare/`
that, per task, creates a Neon database branch (ephemeral data), launches
a Cloudflare Sandbox (ephemeral compute), clones the target repo into the
sandbox, runs Claude Code, commits and pushes a per-task branch, opens a
draft PR via `gh`, and returns the PR URL. The Neon branch is
copy-on-write: production-like data, isolated per agent, deletable on PR
merge.

**Cited from** `vendor/anthropics/neon.com/guides/cloudflare-sandbox-neon-branching.md`.

### Conflict resolution: ANTHROPIC_API_KEY → CLAUDE_CODE_OAUTH_TOKEN

The cited Neon guide forwards `ANTHROPIC_API_KEY` into the sandbox via
`sandbox.setEnvVars({ ANTHROPIC_API_KEY: env.ANTHROPIC_API_KEY, ... })`.
The operator posture forbids `ANTHROPIC_API_KEY` everywhere. **The more
restrictive auth posture wins.** Resolution:

1. The Worker forwards `CLAUDE_CODE_OAUTH_TOKEN` instead — the Claude
   Code CLI honors it for auth (existing pattern in
   `src/oauth/token.ts`).
2. A Worker-side env-sanitizer (`sanitizeEnv` in
   `infra/cloudflare/src/worker.ts`) throws `ApiKeyForbiddenError`
   whenever a forwarded env map includes `ANTHROPIC_API_KEY`. The check
   is asserted by `infra/cloudflare/src/env-sanitize.test.ts`, which
   carries `@cite` headers pointing to the Neon guide and the posture
   XML.
3. `wrangler secret list` on the deployed Worker must show
   `NEON_API_KEY`, `NEON_PROJECT_ID`, `GITHUB_TOKEN`,
   `CLAUDE_CODE_OAUTH_TOKEN` — and not `ANTHROPIC_API_KEY`. The Phase 8
   rubric formalizes this check.

### Status

The runner is **scaffolded but not deployed.** Deployment requires
operator-side action (Phase 8 rubric):

1. Install Neon's Claude / GitHub integration on `subagentceo` →
   `knowledge-engineering`.
2. Sync Neon API key + project ID to Cloudflare Worker secrets via the
   integration.
3. Operator adds `CLAUDE_CODE_OAUTH_TOKEN` and `GITHUB_TOKEN` via
   `wrangler secret put`.
4. Run `wrangler deploy`.

## Long-arc Workers goal

Per the publicly-documented Boris Cherny pattern (Anthropic), a
sufficiently scaffolded agent system can write 100% of a codebase. The
trajectory:

1. **Today.** Bridge MCP server + orchestrator running locally; tools
   curated by hand.
2. **PR #3 (this branch, Phase 0).** Posture seeds, citations, rubric
   stubs, `/routines` umbrella, citation guard, **Full-Stack Cloud Agent
   runner scaffolding under `infra/cloudflare/`** (not deployed). The
   runner is the first concrete step.
3. **Future PR.** Relocate the orchestrator into a Cloudflare Worker
   (Durable Object) that wakes on Cron Triggers; vendor mirror hydrates
   from R2; the agent writes 100% of new code by reading rubrics and
   opening PRs against itself. Routines (`/loop`, `/schedule`) drive
   scheduled work; sub-agent decomposition gates each iteration on the
   relevant phase rubric.
