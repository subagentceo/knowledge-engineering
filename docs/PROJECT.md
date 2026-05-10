---
title: PROJECT.md
description: Canonical Cowork-style project manifest for knowledge-engineering. Maps each Cowork primitive (project / dispatch / plugin) and Managed-Agents primitive (agent / session / environment / skill) to a concrete repo artifact, with citations.
---

# Project: knowledge-engineering

> A Cowork-style project manifest for this repo. Cited from
> `vendor/anthropics/claude.com/docs/cowork/guide/{projects,dispatch,plugins}.md`
> and `vendor/anthropics/platform.claude.com/docs/en/managed-agents/{agent-setup,sessions,multi-agent,skills,memory,dreams}.md`.
>
> If you're reading this in **claude.ai (Opus 4.7 1M context)**, scroll
> to "Web-orchestrator bootstrap" at the bottom — there's a paste-prompt
> that loads the full posture so you can resume work.

## Description

Per `PRODUCTRD.md` §1: a multi-agent research chassis (orchestrator + researcher + verifier) that solo founders fork to ship a Claude-powered product in weeks instead of quarters, with OAuth-only billing, an MCP-tool-as-knowledge-substrate pattern, and a CI-shaped verify ladder baked in.

In Cowork terms (per `vendor/anthropics/claude.com/docs/cowork/guide/projects.md`): the project's **Description** is what Dispatch reads when choosing a project for a task. Our description is `PRODUCTRD.md`.

## Folders

Cowork's projects bundle "one or more local folders Claude can read and write inside this project's sessions." Our folders:

| Folder | Purpose |
|---|---|
| `src/` | runtime code (orchestrator, MCP servers, lanes, lib helpers) |
| `vendor/` | committed local mirror of 12 vendor doc surfaces (~83MB; 1500+ .md files) |
| `scripts/` | crawler, verify chain, gen:servers, grade-phase, discover-sources, setup:* |
| `infra/` | Cloudflare Worker scaffold + Terraform skeleton |
| `docs/` | architecture, governance, phase-gates, operator-runbooks, session summary, **this file** |
| `seeds/` | prompts (operator + orchestrator), posture XML, citation extracts, discovered-sources.json |
| `rubrics/` | per-phase outcome rubrics (`phase-{0..15}.md`) |
| `.claude/` | skills (routines, heartbeat, refresh-vendors, schedule-bridge, loop), plugins.json |
| `.github/` | 9 workflows (verify, OSV, neon-branch, cloudflare-preview, copilot, auto-merge, claude.yml, claude-code-review.yml, release-please.yml) |
| `servers/` | auto-generated MCP-tool wrapper tree (Phase 6.A; codemode runtime substrate) |

## Instructions

Cowork's projects hold "standing guidance applied to every session in the project." Ours:

- **`seeds/posture/session-start.xml`** — the load-bearing XML primitive (auth / discipline / routines / execution / doc-rules / connectors / accounts / sources). Loaded as system-prompt prefix.
- **`seeds/prompts/operator-2026-05-10.md`** — the original operator prompt seed.
- **`seeds/prompts/operator-2026-05-10-followup.md`** — Cloudflare Sandbox + Neon addendum.
- **`seeds/prompts/operator-2026-05-10-heartbeat.md`** — heartbeat directive (cross-session orchestrator).
- **`seeds/prompts/operator-2026-05-10-autonomy.md`** — no-HITL autonomy directive.

Per `seeds/posture/session-start.xml`'s `<discipline>` block: commit-per-todo, multi-turn-only, ODD + TDD + Citations required, seed-vs-spec rule (cited doc beats operator prompt on conflict).

## Links

Cowork projects keep "reference URLs (documents, dashboards, repositories) Claude can consult." Ours:

- **`SUBPROCESSORS.md`** — Tier 1 (active outbound) + Tier 2 (mirrored read-only) vendor inventory inspired by <https://trust.anthropic.com/subprocessors>
- **`vendor/<name>/llms.txt`** (12 of them) — canonical link indexes per vendor
- **`docs/architecture.md`** — runtime topology + lane map
- **`docs/governance.md`** — branch ruleset, auto-merge state machine, two-surface dispatch model
- **`docs/phase-gates.md`** — per-phase dependency map + operator-pending action surface
- **`docs/pending.md`** — live dashboard of pending ops/agent actions (Phase 15.B)
- **`docs/operator-runbooks/`** — 6 paste-into-`claude --chrome` runbooks (issues #33-#38)
- **`docs/session-2026-05-10.md`** — full session scoreboard

## Memory

Cowork's project memory store "persists across sessions." Ours (per `vendor/anthropics/platform.claude.com/docs/en/managed-agents/memory.md`):

- **`seeds/memory/heartbeat/`** (planned, currently unpopulated) — `last-tick.md`, `next-actions.md`, `decisions.md`, `open-questions.md`, `_shared/` (rubrics-snapshot, project-state). Per `.claude/skills/heartbeat.md`, the cross-session orchestrator reads/writes here.
- **Phase 11.C activates Turbopuffer-backed semantic recall** over the same memory store (per `seeds/citations/turbopuffer.md` + `seeds/citations/dreams.md`).

The dream sub-routine (per `vendor/anthropics/platform.claude.com/docs/en/managed-agents/dreams.md`) reorganizes the store weekly via `/schedule`.

## Dispatch (cross-session orchestrator)

Cowork's Dispatch is a "long-running agent that takes high-level instructions and carries them out in the background." Per `vendor/anthropics/claude.com/docs/cowork/guide/dispatch.md`: "you describe an outcome in a single conversation; the Dispatch agent breaks it into tasks, runs each one as a separate Cowork or Code session."

Our Dispatch surface:

- **`.claude/skills/heartbeat.md`** — the skill that defines the per-tick procedure (read state → pick action → verify rubric gates → execute → open PR with auto-merge → record decision → yield)
- **Each PR** is a Dispatch child task. We shipped 23+ in this session.
- **The two-surface dispatch model** (per `docs/governance.md`):
  - In-session orchestrator (this skill, running in Claude Code)
  - In-CI claude-code-action (`.github/workflows/{claude,claude-code-review}.yml`) — auto-reviews every PR; responds to `@claude` mentions

## Plugins

Cowork's plugins package skills + connectors + agents + hooks. Per `vendor/anthropics/claude.com/docs/cowork/guide/plugins.md`. Our plugin manifest is `.claude/plugins.json` (3 marketplaces + 6 install entries).

| Component | Repo location | Examples |
|---|---|---|
| **Skills** | `.claude/skills/*.md` | routines, heartbeat, refresh-vendors, schedule-bridge, loop |
| **Connectors (MCP servers)** | `src/mcp/{bridge-server,npm-registry/server}.ts` | knowledge-bridge (16 tools), npm-registry (4 tools) |
| **Agents (subagents)** | `seeds/prompts/subagent-*.md` + `src/agent/run.ts` `agents:` block | npm-research, verifier, crawl-curator |
| **Hooks** | `.github/workflows/*.yml` | verify, OSV-scanner, neon-branch, cloudflare-preview, copilot, auto-merge, claude-review |

## Managed-Agents primitive mapping

Per `vendor/anthropics/platform.claude.com/docs/en/managed-agents/agent-setup.md`'s agent-config schema (`name, model, system, tools, mcp_servers, skills, multiagent, description, metadata`):

| MA primitive | Repo equivalent |
|---|---|
| Agent | `src/agent/run.ts` orchestrator declaration (model: claude-opus-4-7; system: concatenated `seeds/prompts/system-orchestrator.md` + `orchestrator.system.md`; tools: implicit via mcpServers; multiagent: 3-sub-agent declaration) |
| Session | one `npm run dev` invocation OR one CI heartbeat tick |
| Environment | local machine OR Phase 8 Cloudflare Sandbox (per `infra/cloudflare/`) |
| Skills | `.claude/skills/*.md` |
| MCP servers | `src/mcp/{bridge-server,npm-registry/server}.ts` (stdio) |
| Multiagent (coordinator) | the 3 sub-agents in `src/agent/run.ts`'s `agents:` block |

Note: per the operator-stated posture, we use these as **architectural patterns** (outcomes, rubrics, multiagent, memory, dreams) but do NOT call the Managed Agents API. We use the Messages API over OAuth instead.

## Build-with-Claude primitive mapping

Per `vendor/anthropics/platform.claude.com/docs/en/build-with-claude/`:

| Primitive | Repo usage |
|---|---|
| Prompt caching (`prompt-caching.md`) | `src/examples/prompt-caching.ts` (existing); used by sub-agents implicitly via SDK |
| Batch processing (`batch-processing.md`) | `scripts/grade-phase.ts --batch-prepare` (Phase 11.A) |
| Embeddings (`embeddings.md`) | Phase 11.C deferred (Voyage AI + Turbopuffer; see `seeds/citations/turbopuffer.md`) |
| Citations (`citations.md`) | `src/examples/citations.ts` + the `@cite` test-header discipline enforced by `scripts/lib/citation-guard.ts` |
| Context windows / extended thinking / compaction | informs how we use Opus 4.7 1M (this web session's lead orchestrator) |

## Project-management discipline

Per `vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md`:

> The grader returns a per-criterion breakdown: either confirmation that
> the artifact satisfies the rubric, or the specific gaps between the
> current work and the requirements. That feedback is handed back to the
> agent for the next iteration.

We dogfood this verbatim:

- Each phase has a `rubrics/phase-<N>.md` with ≥3 measurable criteria
- `scripts/grade-phase.ts` (Phase 9; lives at `scripts/grade-phase.ts`) is the grader
- Fresh context per criterion ("separate context window to avoid being influenced by the main agent's implementation choices")
- Iteration cap = 5 (matches the cited doc's default)

The phase pipeline:

```
seed prompt arrives
  → decomposed into phase rubric
  → broken into PR-sized tasks (~3 per phase)
  → each PR opened with `automerge` label
  → CI gates (verify + OSV + claude-review)
  → auto-merge fires on green
  → heartbeat dispatches sub-agents on CI failure (retry cap 3)
  → grader (Phase 9) validates the rubric mechanically
  → phase closeout PR marks rubric DONE
```

## Web-orchestrator bootstrap

If you're reading this in **claude.ai (Opus 4.7 1M context)** and want to resume orchestrating this project from the web instead of Claude Code:

1. **Load the load-bearing posture** by pasting the contents of:
   - `seeds/posture/session-start.xml`
   - `seeds/prompts/operator-2026-05-10.md` + `-followup.md` + `-heartbeat.md` + `-autonomy.md`
2. **Read the current state**:
   - `docs/pending.md` (Phase 15.B; the live dashboard)
   - `docs/phase-gates.md` (per-phase status + operator-pending list)
   - `docs/session-2026-05-10.md` (most-recent session scoreboard)
3. **Constraint envelope** for the web orchestrator:
   - Can read code via Chrome on github.com (Claude in Chrome — see `vendor/anthropics/code.claude.com/docs/en/chrome.md`)
   - **Can NOT** run shell, edit files, push commits, or merge PRs (no CLI access)
   - **Can** comment on issues, label PRs, drive operator runbooks via `claude --chrome` (paste prompts at `docs/operator-runbooks/*`)
4. **Handoff protocol**: the web orchestrator finishes a unit of decision-making by posting a comment on the relevant GH issue. The CLI heartbeat (in a future session) reads the comment and continues with code changes.
5. **The XML primitives + directives + load-bearing posture memory** that have worked across this session are exactly what to load. RUNBOOK.md (issue #49, deferred) will productize this bootstrap as a one-shot prompt.

## Forking

Per `PRODUCTRD.md` §R2 + `SUBPROCESSORS.md`: a forking founder MUST replace `vendor/<their-vendor>/` with their own domain (Notion, Linear, Stripe, internal wiki) and re-evaluate every Tier 1 row before adding end-user data. The chassis pattern survives the swap; the content does not.

## Last reviewed

2026-05-10 (this PR). Refresh on every Phase closeout PR.
