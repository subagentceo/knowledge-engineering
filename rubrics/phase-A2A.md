---
phase: A2A
title: Agent-to-agent writing-style + codegen latency
status: in-progress
self-graded: true
parent-issue: 255
sub-issues: [256, 257]
cites:
  - vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md
  - https://platform.claude.com/docs/en/test-and-evaluate/develop-tests.md
---

# Phase A2A — Agent-to-agent writing-style + codegen latency

Outcome: Claude sessions in this repo produce code that is cited, batched, and prose-free. Verified by `src/lib/a2a-codegen-latency.test.ts`.

Rubric format per `vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md` — explicit, gradable criteria, code-graded where possible. Eval design per `https://platform.claude.com/docs/en/test-and-evaluate/develop-tests.md` §"Build evaluations" — task-specific, automated, volume > quality.

## Latency criteria (sub-issue #256)

### L1 — Parallel batching ratio

- **Measure:** `parallel_blocks / total_assistant_turns_with_tool_use` on a session transcript
- **Threshold:** ≥0.60 when ≥10 independent reads exist in the transcript
- **Grader:** code (count assistant messages with ≥2 `tool_use` blocks)
- **Why threshold:** independent Read/Grep/Glob/context7/vendor-fetch calls in separate turns multiply round-trips; the cost of putting them in one message is identical to one of them

### L2 — code-mode adoption for chained calls

- **Measure:** for chains of length ≥3 where tool output feeds next input, fraction wrapped in `mcp__MCP_DOCKER__code-mode` or `mcp__outcomes-mcp__code`
- **Threshold:** ≥0.80
- **Grader:** code (transcript walk to identify dependency chains, count code-mode wraps)
- **Why threshold:** N sequential MCP turns = N × round-trip latency; code-mode collapses to 1

### L3 — No sleep-poll

- **Measure:** count of `sleep` / `setTimeout` / `Bash run_in_background then poll` patterns in transcript when harness will notify
- **Threshold:** 0
- **Grader:** code (regex over transcript)

### L4 — Round-trip count vs baseline

- **Measure:** for canonical task "add citation to vendor doc and commit", total assistant turns
- **Threshold:** ≤6
- **Baseline:** pre-A2A sessions average ~14 turns for the same task
- **Grader:** code (turn count)

## Tool-call quality criteria (sub-issue #257)

### T1 — Citation density

- **Measure:** `codegen_turns_with_at_least_one_cite / total_codegen_turns`
- **Threshold:** ≥0.95
- **Grader:** code (regex `@cite\s+(vendor|context7|seeds|rubrics)/`)
- **Existing enforcement:** `scripts/lib/citation-guard.ts` already enforces this for test files; this rubric extends to in-session reasoning

### T2 — Citation source order

- **Measure:** for each external citation, did the agent check closer-tier source first
- **Threshold:** ≥0.90 conformance
- **Order:** `vendor/` (local mirror) > `mcp__plugin_context7_context7__query-docs` > `mcp__MCP_DOCKER__search_cloudflare_documentation` > `mcp__MCP_DOCKER__fetch_generic_documentation`
- **Grader:** code (for each external fetch, check if a vendor path matching the URL host exists locally)

### T3 — No defensive code at internal boundaries

- **Measure:** try/catch around internal module calls; null-checks for values returned from internal modules
- **Threshold:** 0 net new
- **Grader:** code (AST scan of staged diff)

### T4 — No what-it-does comments

- **Measure:** comments in staged diff that paraphrase adjacent code (exclude `@cite`, WHY comments, JSDoc)
- **Threshold:** ≤2 per PR
- **Grader:** LLM-based binary classifier per comment (per `develop-tests.md` §"Tips for LLM-based grading" — empirical, output `yes`/`no` only)

## Aggregate score

Pass = all of: L1 ≥ 0.60, L2 ≥ 0.80, L3 = 0, L4 ≤ 6, T1 ≥ 0.95, T2 ≥ 0.90, T3 = 0, T4 ≤ 2.

## Test fixtures

Located at `seeds/transcripts/a2a/`:
- `baseline-bad.jsonl` — synthetic transcript that should FAIL (sequential turns, no citations)
- `a2a-good.jsonl` — synthetic transcript that should PASS

## Out of scope

- Wall-clock ms latency (depends on Anthropic API, not under repo control)
- Style enforcement beyond rules listed (linter handles surface-level style)
- Cross-session memory effects (deferred)

## Iteration loop

Per `define-outcomes.md`: when a session fails the rubric, the grader returns per-criterion gaps. Agent iterates within `max_iterations` (default 3, max 20). For self-graded use, the test file failure messages serve as the gap feedback.
