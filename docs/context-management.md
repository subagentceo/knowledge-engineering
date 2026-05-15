# Context management

> How this repo applies the Anthropic context-management surface, what's wired, and what's deferred. Closes Phase 18 per issue #94.

## Why this exists

The orchestrator at `src/agent/run.ts` runs Claude Opus 4.7 (1M context) over the `@anthropic-ai/claude-agent-sdk`. As phases land, more seeds, citations, and tool definitions accumulate. Without observability + caching, every turn pays the full token cost of every seed.

The Anthropic platform exposes five primitives for managing this:

| Primitive | Source doc | Wired here? |
| :--- | :--- | :--- |
| Token counting | `build-with-claude/token-counting.md` | ✅ `src/lib/token-counting.ts` |
| Context windows | `build-with-claude/context-windows.md` | ✅ `npm run context:budget` |
| Prompt caching | `build-with-claude/prompt-caching.md` | ✅ `SYSTEM_PROMPT_DYNAMIC_BOUNDARY` in `run.ts` |
| Context editing | `build-with-claude/context-editing.md` | ❌ deferred — needs raw Messages API |
| Server-side compaction | `build-with-claude/compaction.md` | ❌ deferred — same reason |
| Task budgets | `build-with-claude/task-budgets.md` | ❌ deferred — needs extended-thinking integration |

## What's wired

### Token counting — `src/lib/token-counting.ts`

OAuth-only wrapper around `client.messages.countTokens()`. Returns `{ input_tokens, model }`. Callers pre-flight a request before paying for it.

```ts
import { countTokens } from "./src/lib/token-counting.js";

const r = await countTokens({
  system: assembledSystemPrompt,
  messages: [{ role: "user", content: "..." }],
});
console.log(r.input_tokens); // 2,695 (today's orchestrator baseline)
```

### Context budget — `npm run context:budget`

Walks the five orchestrator seeds (`system-orchestrator`, `orchestrator.system`, `subagent-npm-research`, `subagent-verifier`, `subagent-crawl-curator`) and emits a table:

```
                            seed     bytes    tokens   % of budget
------------------------------------------------------------------
             system-orchestrator      2400       599        0.060%
             orchestrator.system      2478       617        0.062%
           subagent-npm-research      1383       344        0.034%
               subagent-verifier      2311       576        0.058%
          subagent-crawl-curator      2244       559        0.056%
------------------------------------------------------------------
                           TOTAL     10816      2695        0.270%
budget: 1,000,000 tokens
```

Default budget is Opus 4.7's 1M token window. Override with `--budget N`. The cheap estimator (`length/4`) runs offline; pass `--live` for an OAuth-backed `countTokens()` call per seed.

### Prompt caching — `SYSTEM_PROMPT_DYNAMIC_BOUNDARY`

`src/agent/run.ts` passes the system prompt as an array, not a string:

```ts
import { query, SYSTEM_PROMPT_DYNAMIC_BOUNDARY } from "@anthropic-ai/claude-agent-sdk";

const systemPrompt: string[] = [
  topology,
  planningDiscipline,
  SYSTEM_PROMPT_DYNAMIC_BOUNDARY,
];
```

Everything before the boundary is a stable prefix that the prompt cache reuses across turns. Per-session dynamic context (cwd, memory paths, git status) lands after the boundary.

The existing `src/examples/prompt-caching.ts` and `src/examples/tool-caching.ts` demonstrate the same primitive at the raw SDK level via `cachedText()` / `withCacheBreakpoint()` from `src/lib/cache-control.ts`. They remain useful as worked examples for direct Messages API consumers.

## What's deferred

### Context editing (`clear_tool_uses_20250919`, `clear_thinking_20251015`)

Requires the `context_management` config block on `messages.create()` plus the `context-management-2025-06-27` beta header. The Agent SDK abstracts these and does not currently expose them.

Future work: when (a) the Agent SDK surfaces `context_management`, or (b) we move a sub-agent off the Agent SDK and onto raw `@anthropic-ai/sdk`, wire `clear_tool_uses_20250919` on the `verifier` and `crawl-curator` sub-agents (both heavy tool-result consumers).

### Server-side compaction

Same constraint — needs raw Messages API access. The recommended primary strategy per the context-editing doc; our orchestrator turns are short enough today that this is not pressing.

### Task budgets

`task-budgets.md` requires extended-thinking + a budget allocator. The Planner (`src/agent/planning.ts`) already enforces a "singly in-progress" invariant; a future extension would attach a per-task token budget.

## How to extend

Adding a new seed? Run `npm run context:budget` before and after to see the delta. Then update `rubrics/phase-N.md` with the new context-budget criterion.

Adding a new sub-agent? Add its seed name to the list in `scripts/context-budget.ts` `ORCHESTRATOR_SEEDS` so the report stays in sync with the runtime.

## Filesystem-loaded context (Phase 19)

Beyond the system prompt assembled at module-load, `src/agent/run.ts` opts in to project-level filesystem inputs via:

```ts
settingSources: ["project"],   // CLAUDE.md + .claude/skills + .claude/settings.json
skills: "all",                 // heartbeat, routines, refresh-vendors, schedule-bridge
hooks: { PreToolUse: [...] },  // programmatic safety hook (see below)
```

Per `vendor/anthropics/code.claude.com/docs/en/agent-sdk/claude-code-features.md`:

- `"project"` loads `<cwd>/CLAUDE.md`, `.claude/rules/*.md`, `.claude/skills/<name>/SKILL.md`, and `.claude/settings.json` hooks. Parent-directory CLAUDE.md files load additively.
- User (`~/.claude/`) and local (`CLAUDE.local.md`, `.claude/settings.local.json`) sources are **not** loaded — the orchestrator chassis is the single source of truth.
- `skills: "all"` enables all discovered project skills; the Skill tool is auto-registered.
- `~/.claude.json` global config and managed policy settings are read regardless of `settingSources` (per the SDK doc's "What settingSources does not control" table).

Skills must live as `.claude/skills/<name>/SKILL.md` (directory form). Phase 19 migrated 4 flat-form skills to directory form; see PR #97 / issue #96.

## Runtime safety hook

`src/lib/safety-hooks.ts` exports `auditBashPreToolUse()`, wired into `run.ts` as a `PreToolUse(Bash)` hook. It blocks four patterns at runtime — supplementing the startup-time OAuth gate in `src/oauth/token.ts`:

| Pattern | Reason |
| :--- | :--- |
| `ANTHROPIC_API_KEY=` / `export ANTHROPIC_API_KEY` | OAuth-only posture |
| `rm -rf /` | filesystem root |
| `git push --force` to `main` or `master` | branch protection by convention |
| `--no-verify` on git commit/push/rebase/merge | preserves pre-commit hooks |

Tests at `src/lib/safety-hooks.test.ts` cover allow + block paths for each pattern.

## See also

- `src/lib/token-counting.ts` — the wrapper
- `src/lib/context-budget.ts` — the report builder
- `scripts/context-budget.ts` — the CLI
- `src/lib/cache-control.ts` — the `cachedText()` / `withCacheBreakpoint()` helpers used by `src/examples/*caching.ts`
- `src/lib/safety-hooks.ts` — the PreToolUse audit
- `vendor/anthropics/platform.claude.com/docs/en/build-with-claude/` — the five source docs
- `vendor/anthropics/code.claude.com/docs/en/agent-sdk/claude-code-features.md` — filesystem feature loader contract
