# corpus-viewer build orchestrator

A type-safe, multi-subagent **build orchestrator** that turns
`apps/corpus-viewer` from a macOS-only SwiftUI browser into a dual-platform
(macOS + iOS) app with in-app search/outline over the `vendor/docker` +
`vendor/xcode` corpus. It is grounded in the **Claude Opus 4.8** + Agent-SDK
feature set: per-agent pinned models, reasoning effort, adaptive thinking,
prompt caching, agent memory, and turn/token budgets — every one a real field
on the SDK's `AgentDefinition` / `Options` (SDK 0.2.x).

> This module is the *execution engine*. The app design it builds is in
> `/Users/alexzh/.claude/plans/goal-my-objective-sharded-bird.md`.

## The pieces

| File | Role |
| :--- | :--- |
| `primitives.ts` | Zod schemas + boundary invariants. `SubagentSpec`, `TaskEnvelope` (typed START boundary), `TokenBudget`, `CachePolicy`, `Citation`, `BetaFeature`, and the `assert*` boundary guards. |
| `outputs.ts` | Structured OUTPUT schemas (typed STOP boundary): `PortResult`, `BundleResult`, `IndexResult`, `VerifyResult`, the `StructuredOutput` union, `parseOutput()`, and `buildVerifierGate()`. |
| `fleet.ts` | The four build subagents — `swift-porter`, `doc-indexer`, `ios-bundler`, `build-verifier` — each pinned to a model/effort/thinking/budget/cache/memory/tools. Encodes the model routing (design → opus-4-8 + adaptive; mechanical → haiku, no thinking). |
| `orchestration.ts` | Runtime brain: `TurnLedger` (budget accounting + `stopReason()`), `compact()` (cache-preserving compaction), `MemoryBackend`/`rememberDecision()` (durable per-agent notes), `planCache()` (stable-prefix vs dynamic-suffix split). |
| `runner.ts` | The one place that maps a validated `SubagentSpec` → the SDK's `AgentDefinition` (`toAgentDefinition`, `toAgentsRecord`, `toThinkingConfig`). |
| `../../../seeds/posture/corpus-viewer-build.xml` | The XML directive primitive. Every `<directive schema="file#export">` is bound to its Zod type; `directive-binding.test.ts` proves the binding. |

## Design contract

- **START/STOP boundaries** — every dispatch is a typed `TaskEnvelope` in and a
  schema-validated `StructuredOutput` out. No prose crosses a boundary; a
  malformed reply is a failed task (`parseOutput` is the choke point).
- **Budgets** — each subagent has a `TokenBudget`; dispatch is refused past the
  ceiling (`assertWithinBudget`); `TurnLedger.stopReason()` is consulted each
  turn for "output-budget" / "turns" STOP.
- **Caching** — `planCache()` splits each dispatch into a stable cached prefix
  (system prompt + Swift templates + tool defs) and a dynamic suffix; compaction
  preserves the cache prefix (mirrors `SYSTEM_PROMPT_DYNAMIC_BOUNDARY` in
  `src/agent/run.ts`).
- **Memory** — `AgentDefinition.memory: 'project'` →
  `.claude/agent-memory/<name>/`; `rememberDecision()` keeps it bounded.
- **Outcome-driven citations** — any field encoding a doc fact carries a
  `Citation` (source + `last_fetched`); `BetaFeature` declares the
  research-preview surfaces so version drift is caught by a test.
- **TDD-first** — every module has a sibling `*.test.ts` with an `@cite` header
  (enforced by `scripts/lib/citation-guard.ts`).

## Run the tests

```bash
npx tsx --test src/agent/corpus-viewer/*.test.ts      # this module (37 tests)
npm run verify:libs                                    # whole lib + agent suite
npm run verify:citations                               # @cite headers resolve
```

## Status

Orchestration layer: **complete and tested** (37 tests, tsc clean, citations
resolve). The subagent *seeds* (the `prompt` bodies in `fleet.ts` →
`toAgentsRecord`) and the `run.ts` that calls `query()` with this fleet are the
next step — they wire these primitives into a live Agent-SDK run that executes
the Phase-1/2 app build. Until then this module is the validated scaffold the
runner plugs into, exactly mirroring how `src/agent/run.ts` wires its
`npm-research` / `verifier` / `crawl-curator` fleet.

## Grounding docs to mirror

These Opus 4.8 / agent docs are cited by the build but **not yet** in `vendor/`
(they have native `.md` endpoints — add via the `anthropics` crawl):
`about-claude/models/whats-new-claude-4-8`, `build-with-claude/{effort,adaptive-thinking,prompt-caching,handling-stop-reasons,fast-mode}`,
`models/migration-guide`, and `code.claude.com/docs/en/{agents,workflows}`.
