---
phase: 10
title: Multi-agent decomposition refinement
status: done
closed: 2026-05-10
issue: 14
prs:
  - 29
---

# Phase 10 — Multi-agent decomposition refinement

Cites `vendor/anthropics/platform.claude.com/docs/en/managed-agents/multi-agent.md`.

## Criteria

### 1. Three sub-agents declared — ✅ DONE

`src/agent/run.ts` declares three sub-agents:

| Agent | Tools | Outcome |
|---|---|---|
| `npm-research` | 4 npm-registry tools | primary npm data; cites registry URLs |
| `verifier` | 12 knowledge-bridge tools (engineering/blog/support/llms) | independent verification post npm-research |
| `crawl-curator` | 3 vendor_* tools | per-vendor crawl.json audit + drift detection |

Each has a one-line outcome (in description) and a citation-cited rubric
(`subagent-crawl-curator.md` cites `multi-agent.md` directly).

### 2. Same allowlist (no tool-def explosion) — 🟡 PARTIAL

**Note:** The plan originally called for all three sub-agents to declare
`tools: ["codemode", "search_tools"]`. That requires Phase 6.B's
codemode wiring to land first (currently deferred). For Phase 10 we
keep per-sub-agent allowlists to avoid loading the full 16-tool
context into each sub-agent.

Current allowlists per sub-agent: 4, 12, 3 (= 19 tool defs across
agents, but each sub-agent only sees its own slice). Phase 6.B
collapses this to `[codemode, search_tools]` everywhere = 2 defs per
sub-agent = 6 total. Token-cost reduction lands in Phase 6.B.

### 3. Per-sub-agent rubric satisfied — ✅ DONE

Each sub-agent has a structured outcome:

- `npm-research`: returns `{primary_research, citations[], next_steps[]}` JSON
- `verifier`: returns `{verdict, gaps[]}` JSON against docs/rubric.md
- `crawl-curator`: returns `{audit{vendor: {...}}, next_steps[]}` JSON

The `scripts/grade-phase.ts` (Phase 9) can grade each sub-agent's
output against its own one-criterion-per-call rubric (operator-runnable
with `CLAUDE_CODE_OAUTH_TOKEN`).
