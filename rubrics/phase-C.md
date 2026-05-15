---
phase: C
title: Programmatic MCP v2 + TS strict++ (split across two PRs)
status: in-progress
issue: docs/plans/founder-refactor-2026-05-15.md
sub-phases:
  - C.1: TS strict++ (this PR)
  - C.2: servers/_client.ts dispatcher + src/agent/tool-registry.ts (next PR)
---

# Phase C — Programmatic MCP v2 + TS strict++ (rubric)

Cited from `vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md`.
Split across two PRs to keep each atomic and reviewable:

  - **C.1 (this PR)** — `tsconfig.json` strict++ flags + 8-file fix sweep
  - **C.2 (next PR)** — `servers/_client.ts` real dispatcher + `src/agent/tool-registry.ts` tagged registry

## Outcomes covered in C.1 (this PR)

| Outcome | What |
| :---: | :--- |
| **O-C3** | Add `noUncheckedIndexedAccess: true` + `exactOptionalPropertyTypes: true` to `tsconfig.json`. 15 type errors fixed across 8 files; no behavior change. |

## Outcomes covered in C.2 (follow-up PR)

| Outcome | What |
| :---: | :--- |
| **O-C1** | `servers/_client.ts` real dispatcher via `@modelcontextprotocol/sdk@^1.29` stdio MCP client. NOT `@cloudflare/codemode` (that's CF-Agents-runtime coupled, tracked under #102). Spawns the appropriate stdio server per qualified tool name (e.g., `knowledge-bridge__vendor_fetch` → spawn `dist/mcp/bridge-server.js`). |
| **O-C2** | `src/agent/tool-registry.ts` — single source-of-truth for tool tags: `{ qualifiedName, tags: ["lane:knowledge-bridge", "kind:search"] }`. Sub-agents declare slices via tag predicates instead of hardcoded allowlist arrays. |

## Criteria for C.1 (this PR)

### C1.1. `tsconfig.json` carries both strict++ flags

```bash
grep -c '"noUncheckedIndexedAccess": true' tsconfig.json   # 1
grep -c '"exactOptionalPropertyTypes": true' tsconfig.json # 1
```

### C1.2. `npm run lint` is clean

```bash
npm run lint
```

Expected: zero errors. Phase C.1 had 15 errors at start; all fixed.

### C1.3. Full verify chain green

```bash
npm run verify
```

Expected: zero failures. The new strict flags don't break any test.

### C1.4. No behavior change

Each fix is one of three patterns:
  - Guard array element access with `?? 0` / `?? ""` (noUncheckedIndexedAccess)
  - Conditional-spread optional fields when omitted (exactOptionalPropertyTypes)
  - Early `continue` / `if (!x) return` when regex match groups are undefined

Each is reviewable as a no-op at runtime.

## Criteria for C.2 (follow-up PR)

### C2.1. `servers/_client.ts` does NOT throw when wired
### C2.2. One verifier sub-agent successfully invokes a `knowledge-bridge__*` tool via the dispatcher
### C2.3. `src/agent/tool-registry.ts` exports `toolsByTag(tags)` returning filtered tool list
### C2.4. Sub-agent allowlists in `src/agent/run.ts` move from hardcoded arrays to tag predicates

## What this phase does NOT do (deferred)

- **`@cloudflare/codemode` integration** — CF-Agents-runtime coupled; tracked under issue #102 (Phase 6.B-A) post-CF-Sandbox-deploy.
- **`servers/` tree regeneration** — `npm run gen:servers` already up-to-date in main; no regen needed in Phase C.

## Citations

- `tsconfig.json` (the artifact under modification)
- `vendor/anthropics/code.claude.com/docs/en/agent-sdk/typescript.md` (Agent SDK TypeScript surface)
- `vendor/anthropics/code.claude.com/docs/en/agent-sdk/subagents.md` (sub-agent tool allowlists)
- `docs/plans/founder-refactor-2026-05-15.md` (phase scoping)
