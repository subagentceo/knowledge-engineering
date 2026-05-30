# Agent Orchestrator (macOS app)

A SwiftUI surface that lets you **follow along** as the knowledge-engineering
agent team works: the left column is the Jira-bridged task DAG (SCRUM-N), the
right column is the live [agent-view](https://code.claude.com/docs/en/agent-view.md)
session list grouped by state.

It renders the `OrchestratorView` contract, defined once and mirrored in two
languages:

- **Zod** — `src/agent/team/subagent-schema.ts` (also the sub-agents.md
  frontmatter, agent-teams, and workflows enums)
- **Pydantic** — `src/agent/cowork/team_models.py` (field-for-field mirror)

The emitter `src/agent/team/emit-view.ts` reads the live sources documented in
agent-view.md / agent-teams.md and writes `view.json`:

- `claude agents --json` → session rows
- `~/.claude/teams/<team>/config.json` → team members
- `~/.claude/tasks/<team>/` → shared task list
- falls back to the SCRUM-7/8/9/10 backlog when no team is running yet

## Run it on this Mac

```bash
# 1. refresh the snapshot (or run on a loop in another terminal)
npm run emit:view

# 2. launch the app (CWD must be this dir so it finds view.json)
cd apps/agent-orchestrator && swift run
```

The window auto-reloads `view.json` every 2 seconds, so leave it open and it
follows the orchestrator. To point it at a different snapshot, set
`AGENT_VIEW_JSON=/path/to/view.json`.

## Orchestrate with a real team

```bash
CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1 claude
# then: "Create an agent team to work SCRUM-7 and SCRUM-10 in parallel."
```

As teammates spawn and tasks move, re-run `npm run emit:view` (or loop it) and
the app reflects it. `claude agents` is the terminal equivalent; this app is the
visual companion scoped to this repo's team + Jira backlog.
