---
phase: I
title: PR webhook event handler — typed classifier for `<github-webhook-activity>` payloads
status: in-progress
issue: mid-session dogfood iteration (2026-05-15)
pr: pending (this PR)
---

# Phase I — PR webhook event handler (rubric)

A mid-session dogfood iteration. Operator-prompted 2026-05-15: "implement
the claude-agent-sdk primitives for the listening to events mcp to
improve and dogfood orchestrate's ability to respond to all open pull
requests events in order to get pull requests merged once ci/cd is all
green."

Pre-flight: 4 parallel research agents (claude-code-guide × 3 +
Explore × 1) ran for ~70s each before any code landed:

| Agent | Topic | Key finding |
| :--- | :--- | :--- |
| A (claude-code-guide) | claude-agent-sdk event primitives | No native daemon loop. Routines (cloud) or Monitor + Hooks (session) are the two canonical patterns. 14 hook event types in TS SDK incl. `TaskCompleted` + `TeammateIdle`. `SubscribeMcpResource` + `Monitor(persistent: true)` are the SDK-side event-subscribe primitives. |
| B (claude-code-guide) | /routines + research-preview/beta/experimental | `/loop` dynamic mode uses `Monitor`-driven self-pacing (cheaper than fixed polling). `/schedule` (research preview, v2.1.86+) is cloud-hosted Routines with GitHub event triggers — 1h min interval. `/goal` (shipped v2.1.139+) uses Haiku for completion evaluation on Stop hook. `/autofix-pr` (v2.1.92+) is the cloud PR babysitter. `experimental-cc-routine-2026-04-01` beta header. |
| C (Explore) | local routine + babysitter surface | `subscribe_pr_activity` declared in `.claude/plugins.json` but **never called in any TS code**. The pr-babysitter + ci-healer scripts (164 + 201 LOC each) run raw `gh` CLI with no abstraction layer and no `.test.ts` siblings. `automerge` label applied inline in shell. Caching primitives exist (`src/lib/cache-control.ts`) and are used in `src/agent/run.ts` via `SYSTEM_PROMPT_DYNAMIC_BOUNDARY`. |
| D (claude-code-guide) | prompt caching + programmatic tool calling + citations + memory + advisor | Five composable primitives. `cache_control: ephemeral` (5-min) on posture XML + tool catalog as one breakpoint; per-PR diffs NOT cached. `code_execution_20260120` + `allowed_callers` for in-sandbox tool dispatch. `citations: {enabled: true}` on document blocks (cited_text doesn't count toward output tokens). `memory_20250818` file-mode store with 6 commands. Agent/sub-agents parallel dispatch. |

## Outcome covered

| ID | What | Files |
| :---: | :--- | :--- |
| **O-I1** | `src/lib/pr-event-handler.ts` — typed classifier (`parseWebhook(text): PrEvent` + `decide(event): PrDecision`). Codifies the orchestrator's repeated "informational vs actionable" judgement that has been recurring inline across every PR webhook tick of this session. Zod schemas at the boundary. Sibling test with 15 assertions drawn from real webhook payloads received this session. | `src/lib/pr-event-handler.ts` + `.test.ts` |

## Follow-ups (deliberately deferred to keep this PR atomic)

| ID | What | Why deferred |
| :---: | :--- | :--- |
| **O-I2** | `src/lib/github/automerge.ts` — typed helper around the github MCP tools. Encapsulates `enable_pr_auto_merge` + label application + check status. | Needs its own diligence + mock-test path; out of scope for the classifier. |
| **O-I3** | Read-side `src/lib/memory.ts` wrapping the `seeds/memory/heartbeat/*.md` store, using the memory tool action vocabulary (`view` / `create` / `str_replace` / `insert` / `delete` / `rename`). | Memory tool integration is a separate atomic outcome. |
| **O-I4** | Wire `src/lib/cache-control.ts` `withCacheBreakpoint` to the babysitter loop's posture + tool catalog as one cache breakpoint (per Agent D research). | Needs orchestrator-side wiring; this PR is the classifier only. |
| **O-I5** | Refactor `.claude/skills/routines/pr-babysitter/scripts/pr-babysitter.ts` to consume `parseWebhook` + `decide` instead of inline classification — exercise dogfooding. | Lands once O-I2 (automerge helper) is in. |
| **O-I6** | New MCP tool `pr_event_classify` exposing `parseWebhook` + `decide` to the model directly. | Bumps `knowledge-bridge` tool count; ships as its own atomic PR. |

## Criteria

### C1. Module compiles + test green

```bash
npm run lint
npx tsx src/lib/pr-event-handler.test.ts
```

Expected: clean compile + `15 passed, 0 failed`.

### C2. Verify chain passes

```bash
unset ANTHROPIC_API_KEY
npm run verify
```

Expected: every stage green.

### C3. Module is pure

```bash
grep -E "fetch\(|readFile|writeFile|spawn|exec" src/lib/pr-event-handler.ts
```

Expected: no hits. The classifier is a pure function; the orchestrator turn-handler is the I/O surface.

### C4. Coverage ≥ 70%

```bash
npm run verify:coverage
```

Expected: `src/lib/pr-event-handler.ts` is NOT on the pre-existing-baseline exemption and clears the 70% threshold.

### C5. Codifies recurring boilerplate

The classifier returns `skip` with reason `"recurring vendor_pages drift (tracked under G14)"` for schema-diff webhooks carrying `CREATE TABLE public.vendor_pages`. This is the exact phrase the orchestrator (Claude) has been writing turn-by-turn this session — now centralized.

```bash
npx tsx -e 'import("./src/lib/pr-event-handler.ts").then(({decide, parseWebhook}) => {
  const d = decide(parseWebhook("PR: subagentceo/x#1\\n+CREATE TABLE public.vendor_pages\\nNeon Schema Diff"));
  console.log(JSON.stringify(d));
})'
```

Expected: `{"action":"skip","reason":"recurring vendor_pages drift (tracked under G14)"}`.

## Why this matters

Per Agent C's local survey, the chassis has declared
`subscribe_pr_activity` in `.claude/plugins.json` as an event-listener
primitive — but no TS code actually reads webhook events. The
orchestrator (this Claude session) is doing it manually every tick,
producing identical "Recurring G14 drift; no action" text repeatedly.

Codifying the classifier:

1. **Removes repeated work** — future orchestrator sessions (or a
   future `pr-babysitter` upgrade) get a typed decision instead of
   re-reading the payload string.
2. **Reduces token spend** — the explanatory boilerplate becomes a
   one-call function return rather than a multi-sentence reply per
   tick.
3. **Lays the foundation** for the O-I4 cache-breakpoint wiring —
   once decisions are deterministic, the orchestrator's posture stays
   stable across ticks and benefits from cache reuse.
4. **Composes cleanly with the API primitives** Agent D surfaced —
   `decide(parseWebhook(text))` is a candidate for the
   `code_execution_20260120` + `allowed_callers` programmatic-tool
   pattern, keeping decisions out of the model's context window
   entirely.

## Citations

- Agent A research output (claude-agent-sdk event primitives)
- Agent B research output (/loop /schedule /goal /autofix-pr +
  research-preview / beta / experimental flags)
- Agent C research output (local routine + babysitter surface gaps)
- Agent D research output (prompt caching + programmatic tool calling
  + citations + memory + advisor)
- `vendor/anthropics/code.claude.com/docs/en/routines.md`
- `vendor/anthropics/code.claude.com/docs/en/agent-sdk/typescript.md`
- `.claude/skills/routines/pr-babysitter/SKILL.md`
- `.claude/skills/heartbeat/SKILL.md`
