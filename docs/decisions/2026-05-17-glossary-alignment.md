---
title: "ADR: Glossary alignment — chassis terms vs Anthropic glossary"
id: OREF1
status: accepted
date: 2026-05-17
deciders:
  - alex-jadecli
tags:
  - reference
  - terminology
  - glossary
  - alignment
---

<!--
@cite vendor/anthropics/code.claude.com/docs/en/glossary.md
@cite docs/architecture.md
@cite seeds/citations/define-outcomes.md
-->

## Context

This chassis (a multi-agent research scaffold living in
`knowledge-engineering`) freely reuses Claude Code terminology — `subagent`,
`skill`, `plugin`, `hook`, `session`, `worktree`, `MCP`, `tool`, `routine`,
`memory` — without ever pinning those words to a canonical reference. It
**also** invents its own meanings for several of the same words. The most
load-bearing case is `outcome`: in the chassis "outcome" is the rubric +
grading discipline that bookends every commit (`(O<N>)` trailer); in
Anthropic's product surface "outcome" is a specific Managed Agents primitive
with its own grader, separate context window, and evaluation event stream
([`vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md`](../../vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md),
extract at [`seeds/citations/define-outcomes.md`](../../seeds/citations/define-outcomes.md)).
These are related but **not the same thing**, and the difference matters
when a future agent reads `docs/architecture.md` and tries to act on it.

The canonical Claude Code glossary lives at
[`vendor/anthropics/code.claude.com/docs/en/glossary.md`](../../vendor/anthropics/code.claude.com/docs/en/glossary.md)
(just-crawled, 314 lines, 30 defined terms). This ADR cross-walks the
chassis's working vocabulary against that glossary, flags real divergences,
and decides — per term — whether to keep the chassis usage as a documented
extension or to rename for alignment.

The default bias is **keep but document the difference**. Renaming costs
churn across `docs/`, `CLAUDE.md`, `seeds/`, `plugins/`, and 200+ commit
trailers. Documenting a delta costs one row in this table.

## Procedure used

1. Read the full Anthropic glossary at
   `vendor/anthropics/code.claude.com/docs/en/glossary.md`.
2. Read `docs/architecture.md` for the chassis's own runtime vocabulary
   (the "ten tool families → four lanes" map, the runtime topology, the
   posture sub-section).
3. Grep `docs/`, `CLAUDE.md`, and `plugins/platform-engineering/skills/`
   for the top-10 candidate terms (agent, subagent, skill, plugin,
   outcome, memory, hook, routine, session, worktree).
4. For each term, compare the chassis definition (as actually used) to
   the glossary definition (as authored by Anthropic).
5. Record alignment status: **Aligned** / **Extended** / **Divergent**.
6. Record a remediation: **None** / **Document delta here** /
   **Rename**.

No code was read, written, or touched. This ADR is pure prose + table.

## Cross-walk table

| Term | Chassis definition (as used in this repo) | Anthropic glossary definition | Aligned? | Remediation |
|---|---|---|---|---|
| **agent** | The top-level Claude process that runs the orchestrator in `src/agent/run.ts`; sometimes used loosely for "any Claude session doing work for us." | Not a glossary headword. Closest neighbors are *agentic coding*, *agentic harness*, *agentic loop*. The product surface treats `claude` itself as the agent and reserves "agent" the noun for SDK-level usage. | **Extended** | Document delta here. The chassis uses "agent" as a noun the glossary does not; keep, but prefer "orchestrator" or "session" when the precise concept is one of those. |
| **subagent** | A specialized AI assistant spawned by the orchestrator with its own context window, custom system prompt, scoped tool access. Concrete instances in this repo: `npm-research`, `verifier`, `crawl-curator` (per `CLAUDE.md` and `docs/architecture.md`). Configured under `.claude/agents/` or invoked via the SDK. | "A specialized AI assistant that runs in its own context window with a custom system prompt, specific tool access, and independent permissions. It works on a delegated task and returns a summary to the main conversation." | **Aligned** | None. Chassis usage matches the glossary one-for-one. |
| **agent team / teammate** | Not used. The chassis pattern is orchestrator + subagents, not peer teammates with shared task lists. | "Multiple independent Claude Code sessions coordinated by a team lead, with a shared task list and peer-to-peer messaging." Experimental, gated by `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`. | **N/A** | None. If the chassis ever introduces peer agents, use the glossary term as-is. |
| **skill** | A `SKILL.md` file Claude loads as a workflow. The chassis ships skills under `.claude/skills/{heartbeat,routines,refresh-vendors,schedule-bridge}/SKILL.md` and under `plugins/platform-engineering/skills/*/`. Listed in `CLAUDE.md` "Loaded primitives." | "A `SKILL.md` file containing instructions, knowledge, or a workflow that Claude adds to its toolkit. Claude loads a skill automatically when relevant, or you invoke it directly with `/skill-name`. Skills follow the Agent Skills open standard." | **Aligned** | None. |
| **plugin** | A bundle distributed via marketplace (`.claude/plugins.json` lists 3 marketplaces). The repo's own `plugins/platform-engineering/` is a plugin source tree containing skills, hooks, MCP servers. | "A bundle of skills, hooks, subagents, and MCP servers packaged as a single installable unit. Plugin skills are namespaced as `plugin-name:skill-name`." | **Aligned** | None. |
| **outcome** | The chassis's rubric-and-grading discipline that anchors every commit (`(O<N>)` trailer), every phase rubric (`rubrics/phase-{0..16}.md`), every test file `@cite` chain. Defined operationally by the commit-discipline rules in `CLAUDE.md` and the rubrics. | **Not a Claude Code glossary headword.** It IS a Managed Agents primitive on the platform side: "When you define an outcome, the harness automatically provisions a grader to evaluate the artifact against a rubric. It leverages a separate context window to avoid being influenced by the main agent's implementation choices." (`vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md`, extracted at `seeds/citations/define-outcomes.md`). | **Divergent** | **Document delta here** (see Findings §1). The chassis borrows the *discipline* (separate-context grading, explicit gradeable criteria) but does NOT invoke the Managed Agents outcome API. Keep the `(O<N>)` trailer convention; never claim the chassis runs `define-outcomes` at the API level. |
| **memory / auto memory / CLAUDE.md** | Two distinct things conflated in chassis prose: (a) `CLAUDE.md` files at user/project scope (manually authored), and (b) `seeds/memory/heartbeat/` (operator-authored markdown that persists tick-to-tick decisions). Neither is auto-written by Claude. | Three distinct headwords: **CLAUDE.md** = user-authored persistent instructions; **Auto memory** = Claude-written notes under `~/.claude/projects/`, surviving compaction; **Rules** = modular files in `.claude/rules/` with path-scoped frontmatter. | **Divergent** | **Document delta here** (see Findings §2). The chassis has no auto memory and no `.claude/rules/`. `seeds/memory/heartbeat/` is operator-curated, not Claude-curated; it is closer to "manually authored CLAUDE.md fragments under a different filesystem layout" than to glossary *auto memory*. Rename internally? No — too churny. Just stop calling it "memory" without qualification. |
| **hook** | Used in `docs/governance.md` and skills (e.g., `hookify` plugin in `subagentcoworkers`) to mean "lifecycle handler that fires deterministically at hook events." Aligned with glossary at the concept level. The chassis's verifier chain (`npm run verify`) is hook-adjacent but is not itself a hook — it is a script invoked by humans and CI. | "A user-defined handler that executes automatically at a specific point in Claude Code's lifecycle…Hooks are deterministic: they fire at fixed lifecycle points rather than at the model's discretion." Configured at three levels (event / matcher / handler). | **Aligned** | None. Just stop calling `npm run verify` a "hook"; it is a script. |
| **routine** | The chassis's user-facing umbrella `/routines` skill at `.claude/skills/routines/SKILL.md`, which dispatches to `/loop` (interval) or `/schedule` (cron). Operator term, not Anthropic product term. | **Not a glossary headword.** The CLI changelog references `/loop` and scheduled tasks under the Desktop changelog, but neither product surface uses "routine" as the umbrella noun. | **Extended** | Document delta here. "Routine" is a chassis-local umbrella; never claim it is an Anthropic primitive. The underlying `/loop` and `/schedule` ARE product features; the umbrella is ours. |
| **session** | Used in `CLAUDE.md` and posture XML to mean "the conversation a Claude Code instance is running right now." | "A conversation tied to your current directory, with its own independent context window. Sessions can be resumed with `claude -c`, forked with `--fork-session`, or run in parallel across terminals. Each session's transcript is stored under `~/.claude/projects/`." | **Aligned** | None. |
| **worktree / worktree isolation** | The chassis is aware of `git worktree` but does not lean on Claude Code's `-w` flag. `docs/architecture.md` does not mandate worktree isolation; subagents share the orchestrator's filesystem. | "An isolation mode that runs Claude in a separate git worktree under `.claude/worktrees/`, enabled with the `-w` flag or `isolation: worktree` in subagent config." | **Extended** | Document delta here (low priority). The chassis is conservative; if parallel subagent writes ever land, adopt the glossary pattern verbatim. |
| **MCP** | `src/mcp/bridge-server.ts` + `src/mcp/npm-registry/server.ts` are stdio MCP servers. The chassis treats MCP as the *only* allowed path to external data (per `docs/architecture.md` "web" row: "only through MCP tools, never as a free-form `web_*`"). | "An open standard for connecting AI tools to external data sources and services. MCP servers give Claude new tools…" | **Aligned** | None. The chassis's "MCP-only for external data" rule is a chassis-local discipline layered on top of the standard; that discipline lives in `docs/architecture.md` already. |
| **tool** | The chassis's "ten tool families" map in `docs/architecture.md` is grounded in [`code.claude.com/docs/en/tools-reference`](https://code.claude.com/docs/en/tools-reference). Tool calls are how every subagent acts. | "An action Claude can take: read a file, edit code, run a shell command, search the web, spawn a subagent. Tools are what make Claude Code agentic." | **Aligned** | None. |
| **model / effort level** | The chassis uses Opus 4.7 (1M context) as the orchestrator; effort level not currently tuned at runtime. Documented in `RUNBOOK.md`. | "Effort level: A setting that controls how much of the adaptive-reasoning thinking budget Claude uses on each turn. Supported on Opus 4.7, Opus 4.6, and Sonnet 4.6." | **Aligned** | None. |
| **slot / gate** | Chassis-local jargon for the rotation protocol (3 Max accounts, 5-hour windows — see operator `~/CLAUDE.md`) and for the verifier subagent's role as a "gate" before commits land. | **Not glossary headwords.** | **Extended** | Document delta here. Both terms are operator vocabulary. Keep, but do not introduce them in agent-facing prose without a one-line definition. |

**Row count: 15** (including the N/A row for *agent team*, which is included so future agents searching the table find the term and learn it does not apply to the chassis).

## Findings

Four genuine divergences emerged. For each, the call is **keep but document**, never **rename**.

### §1 — "outcome" (Divergent, high impact)

The chassis's commit trailer `(O<N>)` and rubrics-as-the-grader pattern are
**inspired by** the Managed Agents `define-outcomes` primitive. They are
**not the same thing**. The platform primitive is an API: the harness
provisions a grader, emits `outcome_evaluation_*` events, and scores the
artifact in a separate context window. The chassis pattern is a
human-and-CI discipline: `scripts/grade-phase.ts` runs against
`rubrics/phase-{N}.md`, and the `(O<N>)` trailer in commit messages anchors
each commit to a numbered outcome that lives in `docs/pending.md` or in a
phase rubric.

**Call:** keep the trailer and the rubrics-as-grader pattern. Stop
implying in any doc that we "use Managed Agents outcomes." We do not. The
borrowing is at the discipline level, citing
`seeds/citations/define-outcomes.md` as the source of the pattern.

### §2 — "memory" (Divergent, medium impact)

`seeds/memory/heartbeat/` is operator-curated markdown. It is
distinct from Anthropic's *auto memory* (Claude-written, lives under
`~/.claude/projects/`, indexed by `MEMORY.md`). The chassis has no auto
memory and no `.claude/rules/`. Calling `seeds/memory/heartbeat/` "memory"
without qualification invites confusion — a future agent may look for
`MEMORY.md` index semantics that do not exist here.

**Call:** keep the filesystem layout (`seeds/memory/heartbeat/`). When
referencing it in prose, qualify: "heartbeat memory" or "operator-curated
heartbeat notes." Reserve "auto memory" exclusively for the glossary
sense.

### §3 — "routine" (Extended, low impact)

`/routines` is a chassis-local umbrella that dispatches to the product's
own `/loop` and `/schedule`. Anthropic does not ship a top-level "routine"
primitive. The chassis treats the umbrella as ergonomic glue, not as a new
primitive.

**Call:** keep `/routines` as the operator-facing entry point. In any prose
that touches the underlying mechanism, cite `/loop` and `/schedule` by
their glossary-correct names. Never claim "routines" is an Anthropic
feature.

### §4 — "agent" (Extended, low impact)

The Anthropic glossary deliberately avoids "agent" as a standalone noun;
it uses *agentic coding*, *agentic harness*, *agentic loop*, *subagent*,
*agent teams* — each precise. The chassis uses "agent" loosely (e.g., "the
agent decides," "long-arc Workers agent"). This is a stylistic delta, not
a functional one.

**Call:** keep loose usage in operator prose; prefer precise terms
("orchestrator," "subagent," "session") in agent-facing prose like
`CLAUDE.md` and posture XML, where ambiguity costs the most.

## Consequences

- New ADRs and docs SHOULD cite the glossary by URL when introducing any
  of these terms for the first time, and SHOULD link this ADR when using
  one of the four divergent terms in a way that differs from the glossary.
- No code changes. No file renames. No commit-trailer convention change.
- The next reference-lane ADR (OREF2, if needed) can cover terminology
  drift in `seeds/posture/session-start.xml` against the same glossary
  baseline.

## Sources

- `vendor/anthropics/code.claude.com/docs/en/glossary.md` — Anthropic's
  canonical Claude Code glossary (30 headwords, just-crawled).
- `docs/architecture.md` — chassis runtime topology and the
  ten-tool-families map.
- `seeds/citations/define-outcomes.md` (and the vendor file it extracts,
  `vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md`)
  — Managed Agents outcome primitive, the inspiration for the chassis's
  `(O<N>)` rubric discipline.
- `CLAUDE.md` (project-level) — "Loaded primitives" table, the source of
  truth for which chassis terms are in active use.
- `plugins/platform-engineering/skills/*/SKILL.md` — concrete `Skill`
  instances confirming glossary alignment for that term.
