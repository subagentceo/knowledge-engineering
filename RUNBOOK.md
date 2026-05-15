# RUNBOOK.md — using Claude Opus 4.7 (1M context) as the web orchestrator

> The **toggle pattern**: when to use Claude Code CLI (local, can run npm scripts) vs **claude.ai web** (no shell, but 1M context + Chrome via the extension) for orchestrating this repo.
>
> Closes Phase 14.E per issue #49. Cited from session-2026-05-15 development.

---

## TL;DR

This repo's lead-orchestration agent works across two surfaces:

| Surface | What it can do | What it can't do |
| :--- | :--- | :--- |
| **Claude Code CLI** (local) | Run `npm` scripts, `git push`, `wrangler dev`, all MCP tools, all heartbeat ticks | No `claude.ai`-only UI; per-session context limit |
| **claude.ai (Opus 4.7 1M)** | Read 1M-token context (entire `vendor/` + all rubrics in one window); drive Chrome via the extension; long-arc planning | No shell; no `git`; no `npm`; no `wrangler` |

Most of this session ran in the CLI. The web surface is for **planning + driving Chrome runbooks** — anything that needs a shell handoffs back to the CLI via PR comments or `@claude` mentions.

---

## When to use Claude Code CLI (the default)

The CLI is the daily driver. It can:

- Run `npm run verify` and chain into the full verify ladder
- Open PRs via the GitHub MCP and apply the `automerge` label
- Subscribe to PR webhook activity and respond to CI events
- Write heartbeat memory ticks (`seeds/memory/heartbeat/`)
- Execute the crawler (`npm run crawl:vendor -- <name>`)
- Run `scripts/grade-phase.ts` against rubrics

If a task touches code, configs, or the verify chain, do it in the CLI. The Claude Code CLI is where the chassis IS — the web surface is a viewer + planner that hands off back to the CLI.

---

## When to use claude.ai (Opus 4.7 1M context)

The web surface unlocks three patterns the CLI can't do:

### Pattern 1 — Whole-vendor reasoning

The `vendor/` tree is ~80 MB of mirrored markdown. The CLI session's context window can't fit it all. **Paste a vendor's `urls.md` + 10-20 selected `.md` files into a 1M-context claude.ai window** and ask cross-cutting questions: "Compare Stripe's idempotency-key handling against Twilio's; flag any divergence the chassis should document."

The output goes back into the CLI as a citation source under `seeds/citations/` for the heartbeat to act on.

### Pattern 2 — Chrome-driven operator runbooks

Per `docs/operator-runbooks/README.md`, each runbook is a **paste-into-`claude --chrome` prompt**. The Chrome extension makes the web Claude drive the operator's authenticated browser session — sign into Cloudflare, create an API token, copy it back. The operator's 2FA prompts pause the agent; the operator confirms; the agent continues.

This is the only path for operator-side auth provisioning (CF API token, GitHub PAT, Voyage key) — the CLI can't drive a browser.

### Pattern 3 — Long-arc planning sessions

When you need to draft a multi-PR roadmap (like the initial vendor-directory plan), the web Claude's 1M context fits the operator's prompt + all rubrics + all `seeds/citations/` extracts + the relevant `vendor/anthropics/` docs in one window. The CLI can't.

The output: a markdown plan file checked into `docs/plans/` (this session's `docs/plans/plan-2026-05-15-continuation.md` was authored this way).

---

## Web-orchestrator bootstrap (paste-prompt)

To start a new orchestration session on `claude.ai` against this repo, paste this into a new Claude conversation (recommend model: **Claude Opus 4.7 1M**):

````markdown
You are the lead orchestration agent for the `subagentceo/knowledge-engineering`
repo on GitHub. This conversation runs on claude.ai (Opus 4.7, 1M context) —
not in the CLI. Your handoffs to the CLI happen via:

  - PR comments and reviews (via Chrome → github.com)
  - GitHub issue threads
  - `@claude` mentions that trigger `.github/workflows/claude.yml`

Read these first (link via Chrome, no shell):

  1. https://github.com/subagentceo/knowledge-engineering/blob/main/seeds/posture/session-start.xml
     The load-bearing XML primitive. Loaded as a system-prompt prefix in
     local CLI sessions. Encodes: OAuth-only posture (no ANTHROPIC_API_KEY),
     commit-per-todo + ODD + TDD + citations discipline, /routines slash
     command pattern, codemode + sandbox + connector posture.

  2. https://github.com/subagentceo/knowledge-engineering/blob/main/docs/CONVENTIONS.md
     Outcome-driven Conventional Commits. Every commit ends with (O<N>)
     outcome ID. Every PR body declares outcomes + Closes/Refs #N.

  3. https://github.com/subagentceo/knowledge-engineering/blob/main/docs/PROJECT.md
     Cowork-style project manifest. Maps every Cowork primitive
     (description / folders / instructions / links / memory / dispatch /
     plugins) to a concrete repo artifact.

  4. https://github.com/subagentceo/knowledge-engineering/blob/main/docs/pending.md
     Live dashboard of pending operator-browser-driven, operator-CLI-driven,
     and autonomous-agent-followup actions. Your queue.

  5. https://github.com/subagentceo/knowledge-engineering/tree/main/seeds/prompts
     Four operator-seed files (operator-2026-05-10.md + followup +
     heartbeat + autonomy + the 2026-05-15-mcp-multiplatform decomp).

  6. https://github.com/subagentceo/knowledge-engineering/blob/main/.claude/skills/heartbeat.md
     The skill that defines per-tick procedure: read state → pick action
     → verify rubric gates → execute → open PR with auto-merge → record
     decision → yield. Used cross-session.

  7. https://github.com/subagentceo/knowledge-engineering/tree/main/seeds/memory/heartbeat
     The persistent memory store. last-tick.md is where you resume from;
     next-actions.md is your work queue; decisions.md is the audit log;
     open-questions.md is the operator-decision items.

Your turn N+1 protocol:

  1. Read seeds/memory/heartbeat/last-tick.md — what did tick N decide?
  2. Read seeds/memory/heartbeat/next-actions.md — what's the top action?
  3. Read rubrics/phase-<P>.md for the phase that owns the top action.
  4. If gates green: plan the work; commission a CLI agent to execute it
     (via a comment on the relevant GH issue mentioning @claude; or post
     a PR description + ask the operator to merge a queued PR).
  5. If gates red: surface the blocker on the issue + queue it in
     open-questions.md for the operator.
  6. Record your decision in seeds/memory/heartbeat/decisions.md by
     PR'ing it (commit message: `chore(heartbeat): tick <N+1> record ...`).

You cannot run shell, npm, or git. Use Chrome to read files, comment on
PRs, and create issues. Hand off to CLI via PR comments tagged @claude.
````

---

## Handoff protocol: web ↔ CLI

```
+----------------+                              +----------------+
|  claude.ai     |    PR comment / @claude      |  Claude Code   |
|  (Opus 4.7 1M) | <--------------------------> |  CLI (local)   |
|                |    PR description / review   |                |
+----------------+                              +----------------+
        |                                                |
        | reads via Chrome:                              | runs:
        | - vendor/                                      | - npm run verify
        | - rubrics/                                     | - git push
        | - seeds/                                       | - mcp__github__*
        | - docs/                                        | - heartbeat ticks
        |                                                | - crawler
        | drives:                                        |
        | - Chrome runbooks                              |
        | - operator authentication flows                |
```

### Web → CLI

The web orchestrator hands off to the CLI by:

1. **Commenting on a GitHub issue** with `@claude <instruction>` — the `.github/workflows/claude.yml` workflow spins up a CLI claude-code-action that picks up the instruction.
2. **Opening a PR** with a clear test plan — the CLI heartbeat picks up the PR via webhook and reviews / merges.
3. **Adding an entry to `seeds/memory/heartbeat/next-actions.md`** — the CLI's next tick reads the queue.

### CLI → Web

The CLI hands off to the web by:

1. **Posting to an issue** asking the operator to run a Chrome runbook (e.g. CF API token provisioning).
2. **Updating `seeds/memory/heartbeat/open-questions.md`** with decisions the operator needs to make.
3. **PR-merging a snapshot** (like PR #59) — the web Claude can read the snapshot for context.

---

## Discipline boundaries

| Discipline | Both surfaces | Web-only | CLI-only |
| :--- | :---: | :---: | :---: |
| Outcome IDs on commits | ✅ | — | — |
| Citation `@cite` headers | ✅ | — | — |
| OAuth-only (no `ANTHROPIC_API_KEY`) | ✅ | — | — |
| `seeds/memory/heartbeat/` discipline | ✅ | — | — |
| Read all 80MB of `vendor/` in one context | — | ✅ | — |
| Drive Chrome (operator browser) | — | ✅ | — |
| Run `npm` / `git` / `wrangler` | — | — | ✅ |
| Subscribe to PR webhooks | — | — | ✅ |

The hard constraint: **the web surface never modifies code directly**. It plans, reviews, drives Chrome runbooks, and hands off to the CLI. The CLI is the only surface with write access to the repo.

---

## See also

- `docs/CONVENTIONS.md` — outcome-driven Conventional Commits
- `docs/PROJECT.md` — Cowork-style project manifest
- `docs/pending.md` — live action dashboard
- `seeds/memory/heartbeat/README.md` — heartbeat memory store layout
- `.claude/skills/heartbeat.md` — the heartbeat skill (per-tick procedure)
- `.claude/skills/routines.md` — `/loop` + `/schedule` umbrella
- `docs/operator-runbooks/README.md` — Claude-in-Chrome paste-prompts
- `vendor/anthropics/code.claude.com/docs/en/platforms.md` — surface comparison

## Citations

- `vendor/anthropics/code.claude.com/docs/en/platforms.md` — 6 platforms × 5 integrations × 5 away-from-terminal mechanisms
- `vendor/anthropics/code.claude.com/docs/en/claude-code-on-the-web.md` — web-surface mechanics
- `vendor/anthropics/code.claude.com/docs/en/desktop.md` — Desktop tab + Dispatch
- `vendor/anthropics/code.claude.com/docs/en/chrome.md` — Chrome extension safety + invariants
- `vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md` — outcome-driven discipline
- `seeds/posture/session-start.xml` — load-bearing XML primitive
- `seeds/prompts/operator-2026-05-10*.md` — 4 operator seeds
