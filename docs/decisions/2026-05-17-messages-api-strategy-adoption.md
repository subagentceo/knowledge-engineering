---
date: 2026-05-17
status: accepted
deciders: alex-jadecli
outcome_id: OMSG1
---

# ADR — adopt Messages API + thinking + server-tool strategies into the chassis

## Context

The chassis is Agent-SDK-routed (`@anthropic-ai/claude-agent-sdk`'s `query`)
behind OAuth, not a direct first-party Messages API caller. That is a hard
constraint: `src/oauth/token.ts` fails closed when `ANTHROPIC_API_KEY` is set
anywhere, and the Worker + Sandbox env-sanitizers strip the key before it can
reach a child process. **We are not switching to direct Messages API calls.**

What we *can* do is leverage the Anthropic platform capabilities — model
selection, adaptive thinking, the `effort` knob, server-side tools
(`web_search`, `code_execution`, `computer_use`), parallel tool use — through
the SDK surface, and choose the right capability per task class. Today the
chassis names exactly one model (`claude-opus-4-7` in `src/lib/token-counting.ts`
and `src/examples/_client.ts`) and treats thinking, server tools, and parallel
fan-out as out-of-scope. This ADR ratifies a deliberate strategy.

We are **not** adopting:
- Direct Messages API HTTP calls (OAuth-only invariant; see `docs/decisions/`
  background on `requireOAuth()`).
- Manual `thinking: {type: "enabled", budget_tokens: N}` on Opus 4.7 — the
  vendor doc explicitly says it returns 400 there; adaptive is the only mode.
- Anthropic-side `web_search`/`code_execution` for vendor doc traffic that
  already lives under `vendor/` — the local mirror remains the source of truth
  per the citation-guard rule.

## Model-selection policy

| Task class | Model | Rationale (citation) |
| :--- | :--- | :--- |
| Orchestrator / planner (`src/agent/run.ts`, `src/agent/planning.ts`) | `claude-opus-4-7` | "Our most capable model for complex reasoning and agentic coding" — `vendor/anthropics/platform.claude.com/docs/en/intro.md`. Current default in `src/lib/token-counting.ts:16`. |
| Code-review / feature-dev subagents (`code-review`, `feature-dev`, `security-review` skills) | `claude-sonnet-4-6` | "Frontier intelligence at scale — built for coding, agents, and enterprise workflows" — same intro. Cheaper-per-token than Opus while keeping coding strength. |
| High-volume classification, triage, log-scan, vendor-crawl summarization | `claude-haiku-4-5` | "Fastest model with near-frontier intelligence" — same intro. Right tier for the per-vendor crawl loop in `scripts/crawl-vendors.ts` and any per-PR triage in CI. |
| Long-horizon agentic loops with bimodal step complexity | `claude-opus-4-7` + adaptive thinking | Adaptive thinking "can drive better performance ... for bimodal tasks and long-horizon agentic workflows" — `vendor/anthropics/platform.claude.com/docs/en/build-with-claude/adaptive-thinking.md`. |

Implementation note: model strings stay in `src/lib/token-counting.ts` and
`src/examples/_client.ts`. This ADR does **not** edit them. Subagent skills
that want a different tier set it in their own SKILL.md frontmatter (the
SDK respects per-subagent model).

## Extended-thinking adoption (adaptive + effort)

Default posture: adaptive thinking ON, effort=high (the documented default —
`vendor/.../build-with-claude/effort.md`: "Setting `effort` to `"high"`
produces exactly the same behavior as omitting the `effort` parameter
entirely"). Five chassis touchpoints where thinking should be **explicitly
asserted** (not just defaulted) so the posture survives SDK upgrades:

1. **ADR drafting** — when the orchestrator authors a `docs/decisions/*.md`,
   set `thinking: {type: "adaptive"}, effort: "max"`. Cross-cutting decisions
   are exactly the "thorough over fast" tradeoff `effort=max` exists for.
2. **`security-review` skill** — same posture as ADR drafting. Skipping a
   reasoning step here is the failure mode worth paying for.
3. **`superpowers:systematic-debugging` skill** — adaptive thinking with
   `effort: "high"` (default). Debugging is the canonical bimodal task
   adaptive is tuned for.
4. **Verifier subagent** (`seeds/prompts/subagent-verifier.md`) — adaptive on,
   `effort: "high"`. The verifier's job is to second-guess; cheaping out on
   thinking defeats the purpose.
5. **Planner** (`src/agent/planning.ts`) — adaptive on. The planner emits
   TodoWrite/TaskCreate; one bad plan poisons the whole run.

Budget guideline: do **not** use manual `budget_tokens` on Opus 4.7 (rejected
with 400 per `extended-thinking.md`). On Sonnet 4.6 it is deprecated; use
`effort` instead. Lower `effort` to `"medium"` only for high-volume Haiku
tasks where latency dominates.

## Server-tool adoption

Per `vendor/.../agents-and-tools/tool-use/` the available server tools are:
`web_search`, `web_fetch`, `code_execution`, `computer_use`, `bash`,
`text_editor`, `memory`, plus `parallel_tool_use` and
`programmatic_tool_calling` as posture modifiers.

| Tool | Chassis use today | Adoption opportunity | Risk gate |
| :--- | :--- | :--- | :--- |
| `web_search` (`web_search_20260209`) | None — vendor docs are mirrored under `vendor/` | Use it **only** outside the vendor-doc lane: e.g. the `crawl-curator` subagent confirming "is there a newer published article since our last mirror?" | Must not bypass `vendor/` for citations. Citation-guard (`scripts/lib/citation-guard.ts`) enforces this; the ADR ratifies that contract. |
| `code_execution` (`code_execution_20260120`) | None | Enable specifically so `web_search` dynamic filtering works (vendor doc: "Dynamic filtering requires the code execution tool"). Also unlocks the verifier doing ad-hoc Python data checks on crawl manifests. | Not ZDR-eligible per the vendor doc — never feed it operator secrets or `.env`. Worker env-sanitizer already strips secrets; this rule is belt-and-suspenders. |
| `computer_use` (`computer-use-2025-11-24`) | None | Out of scope for the orchestrator. Only adopt if a future `subagent-browser` lane needs desktop automation that the existing `claude-in-chrome` MCP can't cover. | Beta header required. Operator approval gate before any subagent gets this tool — no auto-adoption. |
| `web_fetch` | None | Mirror partner to `web_search` for known-URL fetches when the URL is *not* mirrored under `vendor/`. | Same gate as `web_search`. |
| `bash` / `text_editor` | Covered by Claude Code's built-in Bash + Edit tools | No-op: don't double-mount. | n/a |
| `memory` | Not adopted; chassis uses `seeds/memory/heartbeat/*.md` (git-tracked) | Keep git-tracked heartbeat as canonical. Server-side `memory` tool is incompatible with the OAuth-only + git-as-memory invariant. | Do not adopt. |

## Interleaved thinking / parallel tool use

The current session already uses parallel subagent fan-out (multiple ADR PRs
opened concurrently via the `superpowers:dispatching-parallel-agents` skill).
This ADR **ratifies the pattern**: when 2+ tasks are independent (no shared
state, no sequential dependency), dispatch them in parallel. The platform
backs this — `vendor/.../tool-use/parallel-tool-use.md` documents
`disable_parallel_tool_use` defaulting to false; parallel is the intended
default.

Interleaved thinking (`interleaved-thinking-2025-05-14` beta on Sonnet 4.6) is
**deprecated** per `extended-thinking.md`. Do not adopt for new work; adaptive
thinking covers the use case.

## Citation chain validated

Every claim above resolves under `vendor/anthropics/platform.claude.com/docs/en/`:

- `vendor/anthropics/platform.claude.com/docs/en/intro.md` (model tier descriptions)
- `vendor/anthropics/platform.claude.com/docs/en/api/messages.md` (Messages API surface)
- `vendor/anthropics/platform.claude.com/docs/en/api/models/list.md` (model enumeration)
- `vendor/anthropics/platform.claude.com/docs/en/build-with-claude/extended-thinking.md` (Opus 4.7 manual-thinking 400; interleaved deprecation)
- `vendor/anthropics/platform.claude.com/docs/en/build-with-claude/adaptive-thinking.md` (adaptive-only on Opus 4.7; bimodal tasks)
- `vendor/anthropics/platform.claude.com/docs/en/build-with-claude/effort.md` (effort defaults + tiers)
- `vendor/anthropics/platform.claude.com/docs/en/agents-and-tools/tool-use/web-search-tool.md` (`web_search_20260209`, dynamic filtering)
- `vendor/anthropics/platform.claude.com/docs/en/agents-and-tools/tool-use/code-execution-tool.md` (code execution tool versions; non-ZDR)
- `vendor/anthropics/platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool.md` (`computer-use-2025-11-24` beta header)
- `vendor/anthropics/platform.claude.com/docs/en/agents-and-tools/tool-use/parallel-tool-use.md` (parallel default)
- `vendor/anthropics/platform.claude.com/docs/en/agents-and-tools/tool-use/web-fetch-tool.md`
- `vendor/anthropics/platform.claude.com/docs/en/agents-and-tools/tool-use/memory-tool.md` (rejected; conflicts with git-as-memory invariant)

Anything not adoptable: none of the capabilities cited here are unmirrored.
If Anthropic ships a brand-new server tool after 2026-05-17 that is not yet
under `vendor/anthropics/`, treat it as "not adoptable until vendor mirror
refreshed" per the `refresh-vendors` skill cadence.

## Consequences

- Subagent SKILL.md files become the place where per-task model + thinking
  posture is asserted. Follow-up: audit `.claude/skills/*/SKILL.md` and
  `plugins/platform-engineering/` skills to add explicit `model` + `thinking`
  hints where the table above prescribes a deviation.
- `web_search` / `code_execution` are unlocked **outside the citation lane
  only**. Citation-guard remains the contract.
- `computer_use` and `memory` server tool are deliberately deferred.
- Parallel subagent dispatch is ratified, not new behavior.
