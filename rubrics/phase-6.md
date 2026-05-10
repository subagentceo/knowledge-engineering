---
phase: 6
title: Codemode layer (code execution with MCP)
status: stub
---

# Phase 6 — Codemode layer (code execution with MCP)

Cites `vendor/anthropics/platform.claude.com/docs/en/agents-and-tools/tool-use/programmatic-tool-calling.md`
and the Anthropic engineering post on Code Execution with MCP.

## Criteria

### 1. `servers/` tree generated and committed

- A file exists at `servers/<server>/<tool>.ts` for each tool exposed by
  every registered MCP server's `tools/list`.
- Re-running `npm run gen:servers` produces a zero-diff tree (`git diff
  --exit-code servers/`).

### 2. `search_tools` registered as the 16th bridge tool

- `tools/list` returns a tool named `search_tools`.
- Input schema accepts `{ query: string, detail: "name" | "name+description" | "full" }`.
- `scripts/verify.ts` `expected: 16`.

### 3. Codemode wiring in `src/agent/run.ts`

- Both sub-agents declare `tools: ["codemode", "search_tools"]`.
- `createCodeTool` from `@cloudflare/codemode/ai` is the source of the
  `codemode` tool definition.

### 4. Token-cost reduction

- A representative 5-turn run shows ≥40% reduction in tool-definition tokens
  vs the Phase 5 baseline (asserted in a test with logged `usage`).
