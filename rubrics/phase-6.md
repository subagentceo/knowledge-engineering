---
phase: 6
title: Codemode layer (code execution with MCP)
status: in-progress
sub-phases:
  - 6.A: gen:servers + servers/ tree + search_tools (DONE this PR)
  - 6.B: src/agent/run.ts wiring + token-cost measurement (DEFERRED)
issue: 10
prs:
  - 26  # this PR (Phase 6.A)
---

# Phase 6 — Codemode layer (code execution with MCP)

Cites `vendor/anthropics/platform.claude.com/docs/en/agents-and-tools/tool-use/programmatic-tool-calling.md`
and the Anthropic engineering post on Code Execution with MCP.

## Phase 6.A — DONE this PR

- ✅ `scripts/generate-server-tree.ts` (npm `gen:servers`) introspects each
  MCP server's `tools/list` and emits `servers/<server>/<tool>.ts` thin
  wrappers + `index.ts` barrel + `README.md` catalog.
- ✅ `servers/_client.ts` — placeholder `callMCPTool()` that throws with a
  clear "phase 6.B wires the runtime" message. Generated wrappers
  type-check; invocation fails loudly until the codemode runtime lands.
- ✅ `servers/` tree committed (knowledge-bridge: 16 tools, npm-registry:
  4 tools = 20 wrappers + 2 indexes + 2 READMEs + the client shim).
- ✅ `search_tools` registered as the **16th bridge tool**
  (`src/mcp/lanes/search-tools.ts`); reads `servers/<name>/README.md`
  catalogs at run time.
- ✅ `scripts/verify.ts expected: 15 → 16`.

## Phase 6.B — DEFERRED to follow-up PR

- 🟡 Codemode wiring in `src/agent/run.ts`: replace per-sub-agent
  `tools: [...]` allowlists with `tools: ["codemode", "search_tools"]`,
  using `createCodeTool` from `@cloudflare/codemode/ai`. Replaces the
  `_client.ts` stub with `@cloudflare/codemode`'s
  `DynamicWorkerExecutor`-backed dispatcher.
- 🟡 Token-cost measurement: assert ≥40% reduction vs Phase 5 baseline
  on a representative 5-turn run.

These are deferred because they require:
  (a) `@cloudflare/codemode` API stability check + a test rig that can
      measure token usage across runs without leaking OAuth state.
  (b) A baseline-vs-after measurement harness (~150 LOC).

## Criteria

### 1. `servers/` tree generated and committed — ✅ DONE

- A file exists at `servers/<server>/<tool>.ts` for each tool from every
  MCP server's `tools/list`.
- Re-running `npm run gen:servers` produces a zero-diff tree (CI guard
  via `git diff --exit-code servers/` recommended in the verify chain;
  added in Phase 6.B).

### 2. `search_tools` registered as the 16th bridge tool — ✅ DONE

- `tools/list` returns a 16th tool named `search_tools`.
- Schema: `{ query: string, detail: "name"|"name+description", limit: number }`.
- `scripts/verify.ts expected: 16`.

### 3. Codemode wiring in `src/agent/run.ts` — 🟡 DEFERRED (Phase 6.B)

### 4. Token-cost reduction — 🟡 DEFERRED (Phase 6.B)
