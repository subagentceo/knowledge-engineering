---
name: cowork-setup
description: Guided Cowork setup — install role-matched plugins, connect your tools, try a skill. Use when a new coworker (human or agent) joins the repo and asks "how do I get set up", "onboard me", "what plugins do I need", "cowork setup", or names a role (data-engineer, researcher, frontend). Walks role selection → plugin/skill install → tool connection checklist → a first skill run → the contribution loop for multi-agent, multi-session 24/7 incremental development.
---

# cowork-setup

guided onboarding for coworkers contributing to knowledge-engineering. one pass: pick a role, install its plugins, connect tools, try a skill, join the loop.

```yaml
refs:
  chain: docs/prompts/coworker-dev-chain.md
  queue: seeds/memory/heartbeat/batch-2026-06-09-citation-service.md
  mail:  mail/README.md
  prov:  src/course-plugins/PROVENANCE.md
  ops:   .claude/rules/pr-ops.md
```

## 1. pick a role

```yaml
roles:
  data-engineer:
    plugins: [claude-deployments, model-context-protocol]   # src/course-plugins/
    skills:  [semantic-cache, kimball-model-yaml, dreams-consolidate]
    surfaces: [data/models/alloydb/, scripts/dw*.ts, scripts/load-citation-warehouse.ts]
    first_skill: /semantic-cache — start services, read the tier table, run npm run dw:load
  researcher:
    plugins: [ai-fluency, claude-api]
    skills:  [read-reference-managed-agents, llms-crud, deep-research]
    surfaces: [citations MCP lane (citations_search/get/by_year/by_team), dw.csl_items, frontend citations table]
    first_skill: /read-reference-managed-agents — ask how memory stores work, then citations_search your topic
  frontend:
    plugins: [claude-code]
    skills:  [run, verify, format-markdown]
    surfaces: [frontend/src/, frontend/tests/, frontend/public/*.json feeds]
    first_skill: /run — boot the vite app and see the citations + warehouse + status panes
```

install: `npm run install:plugins` materializes the marketplace set; session skills under `.claude/skills/` are auto-discovered.

## 2. connect your tools

```yaml
checklist:
  - service postgresql start && service redis-server start   # neither runs by default
  - OAuth only — CLAUDE_CODE_OAUTH_TOKEN; ANTHROPIC_API_KEY is rejected at every layer
  - github via MCP tools (no gh CLI in web sessions)
  - DATABASE_URL for dw work: postgres://<user>@/<db>?host=/var/run/postgresql
```

## 3. try a skill

run your role's `first_skill` from section 1. success = you produced an artifact (a query result, a rendered pane, a loaded table) without editing code.

## 4. join the loop

<contribution_loop>
Read the batch queue (refs: queue) and pick the top unblocked id, or check
mail with receive_mail(agent=<your-id>) for handoffs (refs: mail). One id
per PR, branch claude/<slug>, labels automerge + skip-cost-gate at
creation, rebase auto-merge (refs: ops). Commit per todo; send_mail a
broadcast when you finish an id so other loop schedules see it.
</contribution_loop>

<role_isolation>
Worktree-isolate parallel work (agents: isolation=worktree). Never push a
worktree-agent-* branch — rescue to claude/<slug> first (refs: ops).
</role_isolation>

## tl;dr

three roles, each with plugins + skills + surfaces + a first skill to try. tools checklist is four lines (postgres, redis, oauth, mcp github). contribution = batch queue + repo mail + the pr-ops loop. a coworker goes from clone to first merged PR without asking a human.
