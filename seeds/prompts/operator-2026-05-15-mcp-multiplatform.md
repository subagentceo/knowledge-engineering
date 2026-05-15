---
kind: operator-prompt-seed-mcp-multiplatform
date: 2026-05-15
verbatim: false
note: |
  Operator directive on 2026-05-15 (the day PR #59's snapshot landed):
  decompose the Neon MCP integration and multi-platform Claude rollout
  into tasks, subtasks, and in-session todos. The chassis is now stable
  (PR #57/#58/#61); this seed records what comes next.
status: load-bearing
parent: operator-2026-05-10.md
related-pr: 59
references:
  - https://neon.com/guides/neon-mcp-server.md
  - https://neon.com/guides/claude-code-mcp-neon.md
  - https://neon.com/docs/ai/connect-mcp-clients-to-neon
  - https://code.claude.com/docs/en/platforms.md
  - https://code.claude.com/docs/en/remote-control.md
  - https://code.claude.com/docs/en/channels.md
  - https://code.claude.com/docs/en/scheduled-tasks.md
  - https://code.claude.com/docs/en/desktop.md
  - https://code.claude.com/docs/en/vs-code.md
  - https://code.claude.com/docs/en/jetbrains.md
  - https://code.claude.com/docs/en/slack.md
  - https://code.claude.com/docs/en/chrome.md
  - https://code.claude.com/docs/en/github-actions.md
  - https://code.claude.com/docs/en/code-review.md
---

# Operator seed — Neon MCP + multi-platform Claude rollout (Phase 14)

## Why this exists

PR #59 (`docs/snapshots/2026-05-15-stable/`) snapshotted the chassis at
a stable point — crawler dual-writes to Neon, `outcomesdk.com` is live,
`neon-branch.yml` works per-PR. We've validated this loop **only inside
a single Claude Code web session**.

The operator wants this loop to be reachable from every Claude surface,
not just the web session that built it. Concretely, a future operator
should be able to:

- Open Claude Desktop on macOS, ask "list my Neon projects, then add a
  `published_at` column to `vendor_pages`," and watch it happen on a
  preview branch before merging to `main`.
- Open the Claude iOS app from a coffee shop, Dispatch a task to their
  Desktop, and have it open a PR.
- Sit in VS Code or IntelliJ, hit the Claude extension, and use the
  same Neon MCP tools that the CLI has.
- Mention `@Claude` in Slack and have the cloud session reach the same
  Neon project with the same auth.
- Schedule a recurring 6am task that refreshes vendor crawls and posts
  the diff to a Slack channel.

This seed decomposes that target into tasks → subtasks → in-session
todos, with phase-gate dependencies. It is the operator-action surface
for Phase 14.

## The target shape (platforms × integrations × away-from-terminal)

Cited from `https://code.claude.com/docs/en/platforms.md`:

**6 platforms** — CLI, Desktop, VS Code, JetBrains, Web
(`claude.ai/code`), Mobile (iOS + Android).

**5 first-party integrations** — Chrome, GitHub Actions, GitLab CI/CD,
Code Review, Slack.

**5 away-from-terminal mechanisms** — Dispatch (mobile → Desktop),
Remote Control (mobile/web → CLI or VS Code session), Channels
(Telegram/Discord/own-server → CLI), Slack (`@Claude` mention → cloud),
Scheduled tasks (CLI / Desktop / cloud `Routines`).

Phase 14 wires the Neon MCP server into the first four platforms (CLI,
Desktop, VS Code, JetBrains) and surfaces the result on the remaining
two (Web, Mobile) via shared session state. It also exercises each
integration and at least one away-from-terminal mechanism end-to-end.

## Tasks, subtasks, in-session todos

### T1 — Neon MCP runbook (per-platform install + auth)

**Why first:** every other task depends on a Claude surface having the
Neon MCP tools available.

**Subtasks:**

- T1.1 — Document the **Quick Setup** path (`npx neonctl@latest init`).
  This is the recommended CLI flow per the Neon docs; it does OAuth +
  API-key creation + Claude Code config in one command.
- T1.2 — Document the **Remote MCP (OAuth)** path for CLI:
  `claude mcp add --transport http neon https://mcp.neon.tech/mcp`.
- T1.3 — Document the **Local MCP (API key)** path for CLI:
  `claude mcp add neon -- npx -y @neondatabase/mcp-server-neon start <KEY>`.
- T1.4 — Document the **Claude Desktop** Connectors path
  (Search & Tools → Add Connector → custom → `https://mcp.neon.tech/mcp`).
- T1.5 — Document the **Claude Desktop config-file** path
  (`claude_desktop_config.json` with `mcpServers.Neon` entry pointing
  at `mcp-remote@latest`).
- T1.6 — Document the **VS Code** + **JetBrains** flows. Both share the
  CLI's MCP config when Claude Code is installed locally — no separate
  install. Note any IDE-specific gotchas.
- T1.7 — Document **Web** (`claude.ai/code`) limitations: the web
  surface runs in Anthropic cloud and **cannot reach a local MCP
  server**. Workaround: use the Remote MCP (OAuth) path, which is
  hosted by Neon at `https://mcp.neon.tech/mcp`. (Confirm whether web
  honors `claude mcp add` settings or whether Neon needs to publish a
  connector entry.)
- T1.8 — Document **Mobile** access: mobile is a thin client onto a
  cloud session or — via Remote Control — onto a local session. Neon
  MCP becomes available wherever the underlying session has it.
- T1.9 — **Security checklist**: Neon MCP server grants powerful
  database operations. Local-development only — explicitly NOT for
  production. Always require interactive approval ("Allow tool from
  'neon'?"). Never share `NEON_API_KEY` in chat or commit messages.

**Deliverable:** `docs/operator-runbooks/neon-mcp-server.md` (this PR
ships the runbook; subsequent in-session todos exercise it).

**In-session todos for T1:**

- [ ] Ship `docs/operator-runbooks/neon-mcp-server.md` (this PR).
- [ ] Cross-link from `docs/operator-runbooks/README.md`.

---

### T2 — Per-platform smoke test ("list my Neon projects")

**Why:** prove the runbook is correct before stacking more on top.

**Subtasks (one per surface):**

- T2.1 — **CLI** smoke test on macOS + Linux. Verify `neon` shows up in
  `/mcp` and `list my Neon projects` returns the `divine-cloud-27295848`
  project.
- T2.2 — **Desktop** smoke test on macOS. Verify Search & Tools shows
  `neon`, and the same prompt returns the project.
- T2.3 — **VS Code** smoke test. Same prompt, in the extension.
- T2.4 — **JetBrains** smoke test (IntelliJ on macOS — operator's
  primary IDE; PyCharm/WebStorm if available).
- T2.5 — **Web** smoke test from `claude.ai/code`. Test whether OAuth
  remote-MCP attaches to web sessions automatically or requires per-
  session config.
- T2.6 — **Mobile** smoke test (iOS) — verify Dispatch from phone to
  Desktop carries MCP context.

**Deliverable:** a checklist table in `docs/phase-gates.md` Phase 14
row, marking each surface ready/blocked.

**In-session todos for T2:**

- [ ] Operator runs the 6 smoke tests, marks status in the table.
- [ ] Agent files individual issues for any blocker surfaced.

---

### T3 — Crawler / migration loop on Neon MCP (replace the manual `npm run` flow)

**Why:** today, `scripts/migrate-neon.ts` runs from `neon-branch.yml`
against the per-PR branch. Schema changes during development still
require local commands. Neon MCP's `prepare_database_migration` +
`complete_database_migration` already do this safely on temporary
branches with built-in commit/discard prompts.

**Subtasks:**

- T3.1 — Add a CLAUDE.md note (or `docs/reference/neon-mcp-workflow.md`)
  documenting the preferred development flow:
  "When changing the `vendor_pages` schema during a Claude session, ask
   Claude to use `prepare_database_migration` rather than editing
   `migrations/*.sql` directly."
- T3.2 — Capture a worked example in
  `docs/operator-runbooks/neon-mcp-server.md` mirroring the
  "Adding a Column with Claude Code" walkthrough from
  `https://neon.com/guides/claude-code-mcp-neon.md`.
- T3.3 — Decide migration-of-record: does the SQL applied via
  `complete_database_migration` get echoed back into `migrations/000N_*.sql`
  for replay against fresh per-PR branches? **Open question** — likely
  yes (the file is the source of truth for `neon-branch.yml`'s
  `Run Migrations` step), but the operator should confirm.

**In-session todos for T3:**

- [ ] Decide T3.3 (echoed-to-migrations-file vs MCP-only).
- [ ] Add the reference doc.

---

### T4 — Slack integration (`@Claude` mention → cloud session → PR)

**Why:** moves the team's "report a bug" → "open a PR" loop into Slack,
where the team already lives.

**Subtasks:**

- T4.1 — Install the Claude Slack app to the `outcomesdk` workspace
  (operator action; needs admin).
- T4.2 — Enable **Claude Code on the web** for the workspace (per
  `https://code.claude.com/docs/en/slack.md#setting-up-claude-code-in-slack`).
- T4.3 — Connect the `subagentceo/knowledge-engineering` GitHub repo to
  the workspace so `@Claude` PRs land here.
- T4.4 — Smoke test: file an issue in `#engineering` reading "@Claude
  add a `description` column to `vendor_pages` Neon table." Verify a
  draft PR opens, the migration is applied on the per-PR Neon branch,
  and the schema-diff comment posts.
- T4.5 — Document the result in
  `docs/operator-runbooks/slack-claude-setup.md`.

**Open question:** the Neon MCP server attaches via OAuth per-account.
Does a Slack-triggered cloud session inherit the operator's Neon OAuth
token, or does each cloud session need its own? **Decision needed
before T4.4.**

**In-session todos for T4:**

- [ ] Resolve the OAuth-inheritance open question (operator answers
      after T2.5 testing).
- [ ] Sequence T4.1–T4.5 after T1+T2 are green.

---

### T5 — Scheduled tasks (recurring vendor crawl + diff post)

**Why:** Phase 13.B+ added per-PR Neon branches and the schema-diff
comment. The crawler itself runs only when the operator triggers
`npm run crawl:*`. Scheduled tasks turn the crawler into a daily/weekly
background job that surfaces drift automatically.

**Subtasks:**

- T5.1 — Pick the runner: CLI (`https://code.claude.com/docs/en/scheduled-tasks.md`),
  Desktop (`desktop-scheduled-tasks.md`), or cloud Routines
  (`https://code.claude.com/docs/en/routines.md`). **Recommendation:
  cloud Routines** — doesn't require operator's machine to be on.
- T5.2 — Define the prompt template: "Every morning at 6 AM Pacific,
  run `npm run crawl:all`, diff `vendor/` against `origin/main`, and
  if non-empty, open a draft PR titled `vendor: weekly refresh`."
- T5.3 — Decide failure-handling: if the crawl fails, should the
  routine post to Slack? File a GitHub issue? **Default: post a
  comment on a tracking issue.**
- T5.4 — Document in `docs/operator-runbooks/scheduled-vendor-refresh.md`.

**In-session todos for T5:**

- [ ] Choose runner (T5.1).
- [ ] Operator wires the routine; agent provides the prompt template.

---

### T6 — Channels integration (CI failure → Telegram alert)

**Why:** the `claude-review` workflow on every PR is the agent's main
review feedback loop. When it fails on `main` (e.g., post-merge build
break), the operator should hear about it immediately, not on next
session-start.

**Subtasks:**

- T6.1 — Pick the channel plugin. Telegram is the operator's existing
  channel; Discord is a viable alternative. See
  `https://code.claude.com/docs/en/channels.md#quickstart`.
- T6.2 — Wire a GitHub Actions step on `main`-branch CI failure that
  POSTs to the Channels webhook with the failure URL.
- T6.3 — Pair-test: trigger a known-bad commit on a throwaway branch,
  confirm the alert lands.

**In-session todos for T6:**

- [ ] Choose plugin (T6.1).
- [ ] Sequence after T1 (channels run via local CLI; need CLI working
      first).

---

### T7 — Chrome integration (visual regression smoke for `outcomesdk.com`)

**Why:** `outcomesdk.com` is the public landing page (PR #57). Today
we have no visual smoke test — only manual `curl` of the HTML payload.
Chrome integration lets Claude open the live site in a headed
browser, screenshot, and compare against a golden.

**Subtasks:**

- T7.1 — Install the Chrome integration (operator: macOS + logged-in
  Chrome profile).
- T7.2 — Capture a golden screenshot of `outcomesdk.com` at 1440x900.
- T7.3 — Wire into a daily routine (sibling of T5): "screenshot
  `outcomesdk.com`, diff against `docs/snapshots/.../outcomesdk-golden.png`,
  fail if pixel diff > 1%."
- T7.4 — On failure, post to the Channels alert from T6.

**In-session todos for T7:**

- [ ] Capture the golden after T1 ships and Chrome is available.

---

### T8 — Remote Control + Dispatch (mobile-driven sessions)

**Why:** the operator wants to start tasks from their phone (away
from the laptop) and have them complete on the Desktop/CLI session,
or be steered live via Remote Control.

**Subtasks:**

- T8.1 — Pair the mobile app with Desktop
  (https://support.claude.com/en/articles/13947068).
- T8.2 — Smoke test Dispatch: from the phone, send "What's the status
  of PR #59?" and watch Desktop pick it up.
- T8.3 — Smoke test Remote Control: run `claude remote-control` on the
  laptop, drive from `claude.ai/code` on the phone, verify the Neon
  MCP tools are still available in the remote-driven session.
- T8.4 — Document the pairing flow in
  `docs/operator-runbooks/mobile-dispatch-setup.md`.

**In-session todos for T8:**

- [ ] Sequence after T2.6 (mobile smoke test).

---

## Phase-gate dependency map

```
T1 (Neon MCP runbook, this PR)
  └─> T2 (per-platform smoke tests)
        ├─> T3 (MCP-driven migration loop)
        ├─> T4 (Slack)
        ├─> T6 (Channels)
        ├─> T7 (Chrome)
        └─> T8 (Remote Control / Dispatch)
              └─> T5 (Scheduled tasks; depends on T1 + a chosen runner)
```

T1 ships in this PR. T2 is operator-action (six manual smokes across
six surfaces). T3–T8 each become their own PRs once T1+T2 green-light.

## Open questions (operator-decision items)

| # | Question | Blocks |
|---|---|---|
| Q1 | Does Web (`claude.ai/code`) attach Remote-MCP via per-org config or per-session? | T1.7, T2.5, T4 |
| Q2 | Should `complete_database_migration` write back to `migrations/000N_*.sql`? | T3.3 |
| Q3 | Does Slack cloud session inherit operator's Neon OAuth, or per-session re-auth? | T4 |
| Q4 | Scheduled-task runner: cloud Routines vs Desktop vs CLI? | T5.1 |
| Q5 | Channels plugin: Telegram vs Discord? | T6.1 |
| Q6 | Chrome integration: macOS-only initial scope, or also Linux? | T7.1 |

## Non-goals for Phase 14

- Production use of Neon MCP server (Neon docs explicitly disrecommend).
- GitLab CI/CD wiring (`outcomesdk` lives on GitHub; defer to later).
- Computer Use (`https://code.claude.com/docs/en/computer-use.md`) —
  separate phase; macOS Pro/Max-only and broader scope.
- Anything that would invalidate PR #59's snapshot of "stable chassis";
  Phase 14 is purely additive.

## What this PR (`claude/phase-14-mcp-multiplatform-decomposition`) ships

1. This seed (`seeds/prompts/operator-2026-05-15-mcp-multiplatform.md`).
2. `docs/operator-runbooks/neon-mcp-server.md` — the T1 deliverable.
3. A Phase 14 entry in `docs/phase-gates.md` with the smoke-test table.
4. A cross-link in `docs/operator-runbooks/README.md`.

It ships **no code changes** — only docs. Subsequent PRs (one per T#)
implement.
