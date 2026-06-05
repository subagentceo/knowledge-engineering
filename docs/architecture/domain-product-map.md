# 4-Domain Product Architecture

The subagentceo ecosystem targets 4 product domains, each deployed as a Cloudflare Worker.

## Domain Map

| Domain | URL | Purpose | Audience |
|---|---|---|---|
| opencoworkers.com | opencoworkers.com | Open catalog of Claude coworkers (skills for knowledge work) | Founders building knowledge-work automation |
| opensubagents.com | opensubagents.com | Open catalog of Claude subagents (coding/dev-oriented) | Developers building coding tools |
| managedsubagents.com | managedsubagents.com | Managed subagent platform — OMA backend, OAuth-only, CF Workers | Enterprises deploying managed AI agents |
| managedcoworkers.com | managedcoworkers.com | Managed coworker platform — multi-agent cowork sessions | Enterprise teams using AI coworkers |

## Architecture Overview

All 4 domains are backed by this repository (knowledge-engineering chassis). The chassis provides:

- **MCP bridge** (`src/mcp/bridge-server.ts`): serves all 4 domains as MCP tool surfaces across 16+ tool lanes
- **Agent orchestration**: Orchestrator + sub-agents (`npm-research`, `verifier`, `crawl-curator`) executed via the MCP bridge
- **Vendor doc mirrors**: 25 vendor surfaces under `vendor/` — zero-latency reads for code generation

## Data Layer

| Store | Technology | Role |
|---|---|---|
| Structured data | AlloyDB (PostgreSQL) | Durable relational store for coworker/subagent records, sessions, org config |
| Edge state | Cloudflare D1 | Low-latency edge reads; D1 binding per Worker |
| Cache | Redis (ioredis) | Session cache, rate-limit counters, short-lived ephemeral state |

## Agent Execution

- **Runtime**: Cloudflare Workers — one Worker per domain
- **Observability**: Cloudflare AI Gateway sits in front of all LLM calls; logs latency, token spend, error rates
- **Auth**: OAuth-only via `CLAUDE_CODE_OAUTH_TOKEN`. `ANTHROPIC_API_KEY` is banned at every layer (`src/oauth/token.ts`, Worker env-sanitizer, Sandbox env-sanitizer)

## Cross-Domain Connectivity

The **knowledge-graph-lane** links all 4 domains via a majority-quorum D1 consensus mechanism:

- Each domain writes state changes to its D1 binding
- A background consensus job reconciles cross-domain writes using a majority-quorum protocol
- Enables shared coworker/subagent identity across `opencoworkers.com` ↔ `managedcoworkers.com` and `opensubagents.com` ↔ `managedsubagents.com`

## Deployment Topology

```
opencoworkers.com    opensubagents.com    managedsubagents.com    managedcoworkers.com
       │                    │                      │                       │
  CF Worker            CF Worker              CF Worker              CF Worker
  D1 binding           D1 binding             D1 binding             D1 binding
  Redis ns:oc          Redis ns:os            Redis ns:ms             Redis ns:mc
       │                    │                      │                       │
       └────────────────────┴──────────────────────┴───────────────────────┘
                                        │
                           knowledge-engineering chassis
                           src/mcp/bridge-server.ts
                                        │
                              AlloyDB (shared pg)
                              Redis (shared cluster)
                              Cloudflare AI Gateway
```

## See Also

- `docs/architecture/agent-surface-gap.md` — which surfaces can execute agent orchestration
- `src/mcp/bridge-server.ts` — MCP bridge implementation
- `docs/architecture/knowledge-engineering-erd.md` — entity-relationship detail
- `docs/governance.md` — branch ruleset and auto-merge state machine
