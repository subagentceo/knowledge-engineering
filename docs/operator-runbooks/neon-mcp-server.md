---
title: neon-mcp-server
description: One-time operator runbook to install the Neon MCP server into every Claude surface (CLI, Desktop, VS Code, JetBrains, Web, Mobile) so natural-language Neon database operations work from any platform. T1 of the Phase 14 decomposition.
issue: TBD (Phase 14 T1)
estimated_time: ~15 min for CLI + Desktop; +5 min per additional surface
phase: 14
task: T1
---

# Operator runbook: Neon MCP server across every Claude surface

## Why

PR #59 stabilized the chassis (Neon dual-write + per-PR branches +
schema-diff comments). Today, all Neon work happens via direct SQL
in `migrations/000N_*.sql` or by hand-running
`scripts/migrate-neon.ts`. The **Neon MCP server**
(`https://github.com/neondatabase/mcp-server-neon`) lets any Claude
session call the Neon API in natural language — list projects,
create branches, run SQL, prepare/commit migrations on temporary
branches.

This runbook installs it on every Claude surface so the same loop is
reachable from CLI, Desktop, VS Code, JetBrains, Web, and Mobile.

Cited from:

- `https://neon.com/guides/neon-mcp-server.md`
- `https://neon.com/guides/claude-code-mcp-neon.md`
- `https://neon.com/docs/ai/connect-mcp-clients-to-neon`
- `https://code.claude.com/docs/en/platforms.md`
- `https://code.claude.com/docs/en/mcp.md`

## ⚠ Security — read first

The Neon MCP server grants powerful database management capabilities
via natural language. Neon's own docs are explicit:

> **The Neon MCP Server is intended for local development and IDE
> integrations only. We do not recommend using the Neon MCP Server in
> production environments. It can execute powerful operations that may
> lead to accidental or unauthorized changes.**

Operator rules of engagement:

1. **Always require interactive approval** for tool calls. When Claude
   prompts "Allow tool from 'neon'?" — read the request before
   approving. LLMs can produce unexpected results.
2. **Never paste `NEON_API_KEY` into chat or commit messages.** Prefer
   the OAuth-based Remote MCP path (no key in config).
3. **Never connect the MCP server to a Neon project that holds
   production data.** The project ID for this repo —
   `divine-cloud-27295848` — is development-scope; if you ever
   provision a production project, do **not** add it as an MCP target.
4. **Disable when not in use** if you share your machine. `claude mcp
   list` shows registered servers; `claude mcp remove neon` removes it.

## Pre-reqs

- A Neon account (you have one — the chassis depends on it).
- Node.js ≥ 18 and `npm` (already required by the repo).
- A Neon API key only if you choose a **Local** install path. Get one
  from `https://console.neon.tech/app/settings/api-keys`. The
  **Remote** (OAuth) path needs no key.
- Claude Code installed for whichever surface you're configuring.

## Install matrix

| Surface | Quick? | Recommended path |
| :--- | :--- | :--- |
| **CLI** | yes | T1.1 Quick Setup (`npx neonctl@latest init`) |
| **Claude Desktop** | yes | T1.4 Custom Connector (Search & Tools → Add) |
| **VS Code** | yes | inherits CLI config (T1.6) |
| **JetBrains** | yes | inherits CLI config (T1.6) |
| **Web** (`claude.ai/code`) | partial | T1.7 — see limitations |
| **Mobile** | n/a | inherits the underlying session's MCP |

---

## T1.1 — CLI: Quick Setup (recommended)

```sh
npx neonctl@latest init
```

This single command authenticates via OAuth, creates an API key, and
writes the MCP config into Claude Code's settings. After it completes,
restart `claude` and ask:

```text
Get started with Neon
```

You should see Claude call `list_projects` and return your projects.

## T1.2 — CLI: Remote MCP (manual OAuth)

If you prefer to register the server explicitly:

```sh
claude mcp add --transport http neon https://mcp.neon.tech/mcp
claude
```

The first `claude` session triggers OAuth in your browser. You can
also re-trigger auth from inside Claude with `/mcp`.

To connect to an **organization** rather than your personal account,
authenticate with an API key:

```sh
claude mcp add --transport http neon https://mcp.neon.tech/mcp \
  --header "Authorization: Bearer <NEON_API_KEY>"
```

## T1.3 — CLI: Local MCP (API key)

Runs the MCP server locally as a subprocess of Claude. Lower latency
than Remote, but you manage the key:

```sh
claude mcp add neon -- npx -y @neondatabase/mcp-server-neon start "<NEON_API_KEY>"
claude
```

## T1.4 — Claude Desktop: Custom Connector (recommended)

1. Open Claude Desktop. Click **Search & Tools** → **Add Connector**.
2. Click **Add a custom one**.
3. Fill in:
   - **Name:** `Neon`
   - **Remote MCP server URL:** `https://mcp.neon.tech/mcp`
4. Click **Add**. Authorize the OAuth flow that opens.

Verify by clicking the **neon** tool in **Search & Tools** — you
should see the full Neon tool list (`list_projects`, `run_sql`,
`prepare_database_migration`, etc.).

## T1.5 — Claude Desktop: config-file path

Some Desktop deployments prefer config-file install. Open Desktop →
**Settings** → **Developer** → **Edit Config**. The file
(`claude_desktop_config.json`) opens. Add or merge:

```json
{
  "mcpServers": {
    "Neon": {
      "command": "npx",
      "args": ["-y", "mcp-remote@latest", "https://mcp.neon.tech/mcp"]
    }
  }
}
```

Save and **restart** Claude Desktop. An OAuth window will open the
first time you use the server.

## T1.6 — VS Code & JetBrains: shared with CLI

Both IDE extensions read the same MCP config as the CLI. Steps:

1. Install Claude Code CLI (`npm install -g @anthropic-ai/claude-code`).
2. Run **either** T1.1 (Quick Setup) **or** T1.2 (manual Remote MCP)
   from your terminal.
3. Open the IDE. Open the Claude panel.
4. Verify with `/mcp` (in VS Code's Claude terminal) — `neon` should
   appear in the list.

The CLI install is the single source of truth. Do **not** add the MCP
server separately inside the IDE.

## T1.7 — Web (`claude.ai/code`): partial support

Web sessions run in Anthropic's cloud and **cannot reach a local MCP
server**. They **can** reach the Neon-hosted Remote MCP at
`https://mcp.neon.tech/mcp` via OAuth.

**As of this writing, the operator must test** whether web sessions
auto-attach Remote MCP after the desktop OAuth flow, or whether each
web session needs to re-authorize. This is **Q1** in the Phase 14
open-questions table.

Smoke test:

1. Open `https://claude.ai/code`.
2. Open a session in this repo.
3. Type: `list my Neon projects`.

If the session prompts to connect Neon: complete the OAuth. If it
returns the project list directly: web already knows. Either way,
record the answer in the Phase 14 row of `docs/phase-gates.md`.

## T1.8 — Mobile (iOS / Android)

Mobile is a thin client. It does not host its own MCP server. Two
paths to use Neon MCP from your phone:

1. **Cloud session**: open the Claude app, start a new chat backed by
   `https://claude.ai/code`. If T1.7 resolved to "auto-attach," the
   Neon tools are already there.
2. **Remote Control**: with a local CLI session running
   `claude remote-control` on your machine, drive the session from the
   phone. The Neon MCP server attached in T1.1–T1.3 is available
   because the underlying CLI session is the one executing tools.
3. **Dispatch**: from the iOS Claude app, send a task with the
   Dispatch icon. It spawns a Desktop session on your paired machine
   (T1.4–T1.5). Neon MCP is available because Desktop is the
   executor.

See `docs/operator-runbooks/mobile-dispatch-setup.md` once Phase 14 T8
ships for full pairing steps.

---

## Verification (per surface)

After install on any surface, the smoke test is the same:

```text
list my Neon projects
```

Expected: the response includes the project name and ID for our
chassis project — `divine-cloud-27295848`. If you also have
`outcomesdk-prod` or other projects, they appear too.

Then exercise one read and one branch op:

```text
What tables are in database 'neondb' of project divine-cloud-27295848?
```

```text
Create a Neon branch named 'mcp-smoke-test' off main in project divine-cloud-27295848.
```

The second prompt will ask for approval — say **yes once**, watch the
branch appear in the [Neon Console](https://console.neon.tech), then
ask Claude to delete it:

```text
Delete the Neon branch mcp-smoke-test.
```

If both round-trips work, that surface is green. Mark the
corresponding cell in the Phase 14 smoke-test table.

## Worked example: "add a `published_at` column"

Mirroring the canonical example from
`https://neon.com/guides/claude-code-mcp-neon.md`, scoped to this
repo's schema:

```text
Operator: In project divine-cloud-27295848, add a `published_at`
timestamptz column to the `vendor_pages` table with default `now()`.

Claude: I'll prepare this on a temporary branch.
> Calls prepare_database_migration
> Returns: migration ID, temp branch name, success

Claude: The change is staged on temp branch
'br-quiet-meadow-aXXXXXXX'. Want me to commit to main?

Operator: yes

Claude: Calls complete_database_migration. Migration applied to main.
Temp branch cleaned up.
```

Two safety properties to verify:

1. The temp branch is named and visible in the Neon Console before you
   approve commit. If it isn't, **decline**.
2. After commit, the next per-PR Neon branch created by
   `neon-branch.yml` reflects the new schema. (It will, because
   per-PR branches fork from `main`.)

**Open question (Phase 14 Q2):** should the SQL applied via
`complete_database_migration` also be echoed back into
`migrations/000N_<name>.sql` for replay against fresh per-PR branches?
Operator decision pending; default for now is **yes** — the file
remains the source of truth for `neon-branch.yml`'s `Run Migrations`
step.

## Troubleshooting

| Symptom | Likely cause | Fix |
| :--- | :--- | :--- |
| `claude mcp add` returns "command not found" | Claude Code CLI not installed | `npm install -g @anthropic-ai/claude-code` |
| `/mcp` shows `neon` but tools list is empty | OAuth not completed | Re-run `claude` from the terminal to retrigger auth |
| Desktop Connector shows error after Add | Wrong URL | Confirm `https://mcp.neon.tech/mcp` exactly |
| `npx neonctl@latest init` fails on `EACCES` | npm prefix not writable | Use `~/.npm-global` prefix or `nvm` |
| Tool calls hang at "Allow tool from 'neon'?" | Approval prompt buried | Look in the right panel; some surfaces hide it under a notification |
| Same prompt returns different projects on different surfaces | Different Neon accounts OAuth'd | Sign out and OAuth as the right account |

## Cleanup

If you ever need to remove the server:

```sh
# CLI / VS Code / JetBrains
claude mcp remove neon

# Desktop (Connectors UI)
Settings → Connectors → Neon → Remove

# Desktop (config file)
# Edit claude_desktop_config.json, delete the "Neon" block, restart
```

## Cross-references

- Decomposition seed: `seeds/prompts/operator-2026-05-15-mcp-multiplatform.md`
- Phase-gates entry: `docs/phase-gates.md` § Phase 14
- Sibling runbook: `docs/operator-runbooks/neon-hyperdrive-setup.md`
  (production-path read replica for the Worker; complementary to MCP)
- Adjacent runbook (Phase 14 T8): `docs/operator-runbooks/mobile-dispatch-setup.md` (TBD)
- Adjacent runbook (Phase 14 T4): `docs/operator-runbooks/slack-claude-setup.md` (TBD)
