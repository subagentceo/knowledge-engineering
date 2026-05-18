# CLAUDE.md — github-it-admin plugin

## Purpose

Operator-side IT admin tooling for **GitHub-tier operations**: OAuth/secret CRUD, branch protection, and Claude Code Action workflow safety. Complements `macos-it-admin/` (OIT1, vendor-API token CRUD); together they cover the operator's day-to-day token+secret+CI surface.

This plugin **dogfoods** what prior session PRs codified:
- **OSEC1** (parity model) → `secret-audit` skill wraps `npm run verify:secrets`
- **OSEC2** (two-tier store model) → `secret-promote` skill documents the gh-write-only-on-values constraint
- **OSEC3** (long-lived minter pattern) → `claude-oauth-rotate` skill uses the same keychain pattern for the `CLAUDE_CODE_OAUTH_TOKEN` rotation flow we did manually in this session
- **OIT1** (`macos-it-admin/` plugin shape) → mirrors directory layout, anti-leak rules, read-after-write verify
- **OAUTO13** (Claude Code Action security baseline) → `claude-action-lint` skill + `PreToolUse` hook codify the upstream security rules from `docs/security.md` of `anthropics/claude-code-action`
- **Plugin reference spec** → exercises hooks, monitors, agents, MCP server, userConfig (not just skills like OIT1 did)

## Skills

| Skill | Verbs | Backend |
|---|---|---|
| `claude-oauth-rotate` | CREATE (re-mint via `claude setup-token` + dual-write) | shell scaffold (interactive) |
| `secret-promote` | CREATE/READ (promote repo→org; list current scope split) | shell scaffold + `gh secret list` |
| `secret-audit` | READ (parity check via OSEC1 verifier; drift report by age) | wraps `npm run verify:secrets` + `gh secret list --json updatedAt` |
| `branch-protection-crud` | full CRUD over `gh api repos/.../rulesets/<id>` | TS scripts using `gh api` |
| `claude-action-lint` | READ (lint `.github/workflows/claude*.yml` for OAUTO13 anti-patterns) | TS, callable as skill OR via the bundled MCP server |

## Hooks (security spec dogfood)

`hooks/hooks.json`:

1. **`PreToolUse` matcher `Write|Edit`** — when the operator (or another Claude session) edits any file under `.github/workflows/`, runs `claude-action-lint` against the post-edit content. Surfaces the OAUTO13 anti-patterns (no `pull_request_target` + write perms, no wildcard `allowed_bots`, must pin `@v1` not `@main/@beta`, OAuth-only invariant) at edit time, not at CI time.
2. **`SessionStart`** — verifies `gh auth status` returns `alex-jadecli` with required scopes (`admin:org`, `repo`, `workflow`); checks `CLAUDE_CODE_OAUTH_TOKEN` age at both gh-org and gh-repo scope. Loud notify on drift.

## Agent

`agents/claude-action-workflow-reviewer.md` — Sonnet, `disallowedTools: Write,Edit`. Dispatched when the operator says "review my Claude Code Action workflow changes" or similar. Reads the OAUTO13-cited sources (vendored + upstream) and audits. Pure read-only — per plugin spec, agents in plugins cannot ship `hooks/mcpServers/permissionMode` (security), so this agent's safety surface is naturally narrow.

## Monitor

`monitors/monitors.json` — `secret-age-watch`. Polls `gh secret list --json name,updatedAt -q ...` every 6 hours; notifies if any secret is older than `${user_config.secret_max_age_days}` (default 90). Active drift detection beats passive verify-only.

## MCP server

`mcp/server.ts` — exposes one tool, `lint_claude_action_workflow(file_path)`. Lets other Claude sessions (e.g., a Routine running in the cloud) lint a workflow without learning the rules in-context. The `gh` ops themselves are NOT wrapped in MCP — `gh` CLI is already perfectly ergonomic; wrapping it would just add a layer.

## Anti-silent-failure rules (inherited from OIT1)

1. Never `console.log(value)`, `writeFileSync(value)`, or any equivalent.
2. Status messages to stderr (`console.error`); stdout reserved for pipes.
3. Every CREATE/UPDATE does read-after-write verify.
4. Every `gh secret set` call is followed by `gh secret list` to confirm the timestamp moved.
5. The lint skill (and its MCP tool) **fail loudly with a non-zero exit code** rather than silently flagging; CI must reject misconfigured workflows.

## userConfig

| Key | Type | Default | Purpose |
|---|---|---|---|
| `gh_org` | string | `subagentceo` | Org for secret/branch-protection ops |
| `gh_repo` | string | `knowledge-engineering` | Repo name |
| `secret_max_age_days` | number | `90` | Drift threshold for the monitor |

These are substituted into monitor commands as `${user_config.<KEY>}` per plugin spec. Exported to subprocesses as `CLAUDE_PLUGIN_OPTION_<KEY>` env vars.

## Why this exists alongside macos-it-admin/

`macos-it-admin/` covers **vendor APIs** (Cloudflare/Neon/Turbopuffer/Parallel/Nimble). This plugin covers **GitHub itself + the Claude Code Action subsurface**. The two together = operator's entire token+secret+workflow attack surface. Keeping them separate matches the plugin-marketplace convention (one focused responsibility per plugin).

## Related ADRs / docs

- `docs/decisions/2026-05-17-secrets-parity.md` (OSEC1)
- `docs/decisions/2026-05-17-secret-store-tiers.md` (OSEC2)
- `docs/decisions/2026-05-17-cf-token-mint.md` (OSEC3)
- `docs/operator-runbooks/secret-rotation.md`
- `src/lib/claude-action-workflows.test.ts` (OAUTO13 — lint rules originate here)
- `plugins/macos-it-admin/CLAUDE.md` (sibling plugin)
- Upstream: https://github.com/anthropics/claude-code-action/blob/main/docs/security.md

## Plugin spec citations

- https://code.claude.com/docs/llms.txt (index)
- Plugins reference: https://docs.claude.com/en/docs/claude-code/plugins-reference
  - Skills: directory with `SKILL.md`
  - Hooks: `hooks/hooks.json` w/ `PreToolUse` matcher
  - Monitors: `monitors/monitors.json` (experimental key)
  - Agents: `agents/*.md` (cannot ship `hooks/mcpServers/permissionMode`)
  - MCP servers: `.mcp.json` w/ `${CLAUDE_PLUGIN_ROOT}` substitution
  - userConfig: `${user_config.<KEY>}` substitution + `CLAUDE_PLUGIN_OPTION_<KEY>` env vars
