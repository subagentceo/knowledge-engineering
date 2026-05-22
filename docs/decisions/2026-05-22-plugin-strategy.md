---
date: 2026-05-22
status: proposed
deciders: alex-jadecli
outcome_id: OPLUG2
supersedes: none
parent_issue: 259
sub_issues: [273]
related_prs: [267]
---

# ADR — orchestrator plugin strategy: monitoring + builder layer

## Context

The orchestrator session in this repo manages the polyrepo via autonomous PR loops (task #36, cron `*/1 * * * *`). To do that work *correctly* — citing real sources, building plugins/MCPs/skills to spec, monitoring PR/issue events without polling — it needs a small set of supporting plugins.

PR #267 (OPLUG1) declared 9 project-scoped plugins in `.claude/plugins.json` but did not document the **operational role** of each. This ADR fills that gap and pins which plugin handles which orchestrator responsibility.

The operator's 2026-05-22 directive named 6 plugins for install (`code-review`, `code-simplifier`, `pr-review-toolkit`, `commit-commands`, `feature-dev`, `github`). PR #267 added 3 more for completeness (`plugin-dev`, `mcp-server-dev`, `skill-creator`, `session-report`). This ADR explains the 4 categories the 9 plugins cover and how they compose.

## Decision

Plugins are organized into 4 operational categories. Each category has a primary citation source for orchestrator behavior, and each plugin is bound to a category in `.claude/plugins.json`.

### Category 1: PR/CI automation (loop targets)

The autonomous PR loop (task #36) needs plugins that *act on* PRs:

| Plugin | Role | Citation source |
|---|---|---|
| `code-review` | Automated review pass; complements `.github/workflows/claude-code-review.yml` | `anthropics/claude-plugins-official/plugins/code-review` |
| `pr-review-toolkit` | Multi-step PR review workflow (comment threads, sub-reviews) | `anthropics/claude-plugins-official/plugins/pr-review-toolkit` |
| `code-simplifier` | Refactor passes (used by OBLOG.fidelity, the PR #174 refactor) | `anthropics/claude-plugins-official/plugins/code-simplifier` |

### Category 2: Authoring (write side)

When the orchestrator writes code/tests/docs, these plugins enforce shape:

| Plugin | Role | Citation source |
|---|---|---|
| `commit-commands` | Conventional-commit suffixes per `docs/CONVENTIONS.md` (`(O<TAG>)`) | `anthropics/claude-plugins-official/plugins/commit-commands` |
| `feature-dev` | Feature-development workflow for new `src/` surfaces (e.g. `blog-extract-fidelity.test.ts`) | `anthropics/claude-plugins-official/plugins/feature-dev` |

### Category 3: Builders (meta — author new plugins/MCPs/skills with citations)

When the orchestrator authors a *new* plugin/MCP/skill (e.g. W3 marketplace fork), these plugins provide cited scaffolding:

| Plugin | Role | Citation source |
|---|---|---|
| `plugin-dev` | New plugin authoring; enforces `.claude-plugin/plugin.json` schema | `anthropics/claude-plugins-official/plugins/plugin-dev` |
| `mcp-server-dev` | New MCP server authoring with cited grounding | `vendor/anthropics/claude.com/docs/connectors/building.md` |
| `skill-creator` | Skill authoring + evaluation for `.claude/skills/` | `anthropics/claude-plugins-official/plugins/skill-creator` |

### Category 4: Monitoring + handoff

| Plugin | Role | Citation source |
|---|---|---|
| `github` | Real-time PR/issue webhook events (beyond `gh` CLI polling); subscribes to `pr-activity` event-listener already declared in `.claude/plugins.json` | `anthropics/claude-plugins-official/plugins/github` |
| `session-report` | Dumps session state on rotation; materializes the session-rotation contract in `.claude/templates/pr-task.md` | `anthropics/claude-plugins-official/plugins/session-report` |

## Composition rules

1. **Authoring path:** any new plugin we add to `.claude/plugins.json` MUST be authored under the `plugin-dev` workflow (Category 3) and validated against the schema before commit.
2. **Citation order:** when authoring code referencing a plugin's capability, citations go to:
   - The plugin's source `.md` in `anthropics/claude-plugins-official/plugins/<name>/`
   - Local vendor mirror (e.g. `vendor/anthropics/claude.com/docs/connectors/building.md`) if relevant
   - Live URL fallback only if no local mirror exists
3. **Build new MCP servers via `mcp-server-dev`.** Do not hand-roll MCP server boilerplate — invoke the skill, let it generate the scaffold, then layer business logic.
4. **Use `github` plugin's event-listener for PR-loop wake-ups**, not polling. The cron loop is a *fallback heartbeat*; the primary wake signal should be webhook-driven.

## Why a plugin (vs a hand-rolled tool)

- **Marketplace-ready.** Once W3 (`subagentceo/knowledge-work-plugins`, issue #259 `w3_subagentceo_marketplace_fork`) lands, these plugins move from `anthropics/claude-plugins-official` source to our fork — no consumer code changes; `package` field updates only.
- **Discoverability.** Skills under plugins auto-load in Claude Code; the orchestrator session sees them as first-class capabilities without manual `Skill()` invocations.
- **Versioning.** Each plugin has its own version + manifest; upgrades isolated.

## Alternatives considered

1. **Hand-roll each capability:** rejected — duplicates Anthropic's first-party work; no upstream sync.
2. **Install via `claude plugin install` user-globally:** rejected per W1 directive (project-scoped travels with the repo).
3. **Bundle into one mega-plugin:** rejected — couples release cycles; harder to upstream-sync after W3.

## Outcome

`OPLUG2` — every orchestrator capability cites a plugin source (or a `vendor/` doc). Authoring new plugins/MCPs/skills uses Category 3 builders. PR/CI automation uses Category 1. Authoring uses Category 2. Monitoring uses Category 4.

## Citations

- `https://platform.claude.com/docs/en/test-and-evaluate/develop-tests.md` (eval design principles)
- `vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md` (outcome semantics)
- `vendor/anthropics/claude.com/docs/connectors/building.md` (MCP server authoring spec)
- `anthropics/claude-plugins-official/plugins/*` (each plugin's manifest)
- `.claude/plugins.json` (the 9 declared plugins from PR #267)
- `.claude/templates/pr-task.md` (PR-task template, session-rotation contract)
- `docs/decisions/2026-05-16-platform-engineering-plugin.md` (precedent ADR — plugin-as-install-target)
- Issue #259 `w2_monitoring_and_builder_plugins` block — design rationale persisted

## Follow-ups (NOT in this ADR)

- **W3 (issue #259 `w3_subagentceo_marketplace_fork`)** — fork `anthropics/claude-plugins-official` plugins into `subagentceo/knowledge-work-plugins`. After fork, rebind `.claude/plugins.json` `package` fields to point at our marketplace. Out of scope here.
- **Event-listener wiring** — once `github` plugin is loaded, wire `pr-activity` event-listener to wake the autonomous loop on PR comments / CI completion. Currently the loop runs on a 1m cron heartbeat only.
- **`session-report` integration** — formalize session handoff to a `docs/session-reports/YYYY-MM-DD.md` artifact on rotation.
