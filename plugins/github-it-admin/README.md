# github-it-admin

Operator-side IT admin plugin for **GitHub-tier operations**: claude-code OAuth rotation, repo→org secret promotion, secrets parity audit, branch-protection ruleset CRUD, and Claude Code Action workflow safety linting.

Companion to `plugins/macos-it-admin/` (vendor-API tokens). Together they cover the operator's full token+secret+CI admin surface.

## Install

```bash
claude plugin install github-it-admin --scope project
```

Bootstraps userConfig prompts for `gh_org`, `gh_repo`, `secret_max_age_days`.

## Skills

| Skill | What it does |
|---|---|
| `claude-oauth-rotate` | Re-mint `CLAUDE_CODE_OAUTH_TOKEN` via `claude setup-token` and dual-write to gh org+repo. Wraps the manual flow used 2026-05-18. |
| `secret-promote` | Promote a repo-scoped secret to org scope. Browser-paste required (gh API is write-only on values). |
| `secret-audit` | OSEC1 parity check + drift report by `updatedAt` age. |
| `branch-protection-crud` | CRUD over the branch protection ruleset (`gh api repos/.../rulesets/<id>`). |
| `claude-action-lint` | Lints `.github/workflows/claude*.yml` for OAUTO13 security anti-patterns. |

## Hooks

- `PreToolUse` on Write/Edit of `.github/workflows/*.yml` → runs the lint skill at edit time.
- `SessionStart` → verifies `gh auth status` + secret rotation freshness.

## Monitor

- `secret-age-watch` — polls every 6 hours, notifies on secrets older than `${user_config.secret_max_age_days}` (default 90 days).

## Agent

- `claude-action-workflow-reviewer` (Sonnet, read-only) — dispatched for workflow review requests.

## MCP server

One tool: `lint_claude_action_workflow(file_path)` — exposes the lint skill to other Claude sessions.

## What this plugin does NOT do

- **General `gh` CLI wrapping.** `gh` is already perfectly ergonomic; wrapping it adds nothing. This plugin only wraps the operations that have non-obvious safety contracts (OSEC + OAUTO13).
- **Vendor token minting.** That's `macos-it-admin/`.
- **Cross-org operations.** Pinned to `${user_config.gh_org}` (defaults to subagentceo). For multi-org workflows, install the plugin in each repo with different config.

## Related

- `plugins/macos-it-admin/` — vendor token CRUD (Cloudflare, Neon, Turbopuffer, Parallel, Nimble)
- `docs/decisions/2026-05-17-{secrets-parity,secret-store-tiers,cf-token-mint}.md` — OSEC1/2/3 ADRs
- `src/lib/claude-action-workflows.test.ts` — OAUTO13 lint-rule source
