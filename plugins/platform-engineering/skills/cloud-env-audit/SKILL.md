---
name: cloud-env-audit
description: Drive Claude in Chrome to screenshot claude.ai/code environment env vars and diff against the OSEC1 parity table. Use when the secrets-parity verifier reports clean for local/gh planes but the cloud_env plane is unaudited (verifier cannot reach the cloud plane via API).
---

# cloud-env-audit

## Purpose

claude.ai/code environment env vars have **no API**. The only way to verify parity on the `cloud_env` plane defined in `docs/decisions/2026-05-17-secrets-parity.md` is to drive the browser. This skill orchestrates that audit.

## When to invoke

- After a green `npm run verify:security-posture` run, on any cadence where the cloud plane may have drifted (e.g., once per week, or when a new environment is added).
- When a Routine fails in a way consistent with a missing secret (e.g., Worker deploy 401, Neon connect timeout).
- Before promoting a workflow that depends on a new secret to `REQUIRED` in the parity table.

## Procedure

### 1. Establish browser context

Load the Chrome MCP tools and confirm a tab is logged into claude.ai:

```
ToolSearch select:mcp__claude-in-chrome__tabs_context_mcp,mcp__claude-in-chrome__navigate,mcp__claude-in-chrome__get_page_text,mcp__claude-in-chrome__gif_creator
```

Call `tabs_context_mcp` to see existing tabs. If none target claude.ai, create a new tab via `tabs_create_mcp` to `https://claude.ai/code/environments`.

### 2. Enumerate environments

From `reference_mcp_connectors.md`, the active environment list for this operator is:
- `subagent-products` (env_01BmwJ1TZB5BQt5bvdPVcus7)
- `agentwarehouses` (env_01StJ1RxquC16d9uxBoANG6R)
- `managed-subagents` (env_013UVgC4YL5DaidRJgu892Rd)
- plus 17 others (see memory file for full list)

Per-environment URL: `https://claude.ai/code/environments/<env-id>`

### 3. For each environment, capture env-var names (NOT values)

Navigate to the environment's env-vars panel. Use `get_page_text` to read the names of all configured env vars. **Do not screenshot the values** — they are secrets. The DOM may render values as masked dots; if so, screenshot is fine.

Record the set of names per environment.

### 4. Diff against the parity table

For each environment that is expected to run this repo's Routines (currently `subagent-products` is the primary):

- Load `docs/data/secrets-parity.json`.
- For each row where `cloud_env == "REQUIRED"`, assert the secret name appears in the environment's env-var name list.
- For each row where `cloud_env == "FORBIDDEN"` (i.e., `ANTHROPIC_API_KEY`), assert it does NOT appear.

### 5. Emit audit report

Write `docs/research/cloud-env-audit-<YYYY-MM-DD>.md` with:

- Audit date and operator identity.
- One section per environment audited.
- Per-secret pass/fail row.
- A `## Remediation` section listing exactly which env-vars the operator must add via the UI, with the operator-paste template:

```
Environment: <env-id>
Add: <SECRET_NAME>
Source: 1Password "op://Private/<item>/credential" OR keychain "<service>"
```

### 6. Commit the report

Commit the report file with `(OSEC1)` outcome suffix. Do not commit any captured values. The report contains only names + presence flags.

## Outcomes

| ID | Outcome | Verified by |
|---|---|---|
| OSEC1-cloud-1 | Every REQUIRED-on-cloud_env secret is present in the primary environment | report file's primary-env section |
| OSEC1-cloud-2 | ANTHROPIC_API_KEY is absent from every audited environment | report file's "forbidden audit" section |
| OSEC1-cloud-3 | Remediation list is empty OR contains an operator-paste template for each gap | report file's "remediation" section |

## Anti-silent-failure rules

1. If the Chrome MCP cannot reach claude.ai (auth expired, tab closed), the skill must **abort and report** — not skip silently. Emit: `[OSEC1-cloud] AUDIT BLOCKED: <reason>`.
2. If any environment's page does not render an env-vars panel (UI changed), abort with `[OSEC1-cloud] UI DRIFT: <env-id>` and ask the operator to update this skill.
3. Never click "reveal value" buttons. Names only.

## Citations

@cite docs/decisions/2026-05-17-secrets-parity.md
@cite docs/data/secrets-parity.json
@cite /Users/alexzh/.claude/projects/-Users-alexzh-subagentmcp-subagentceo-knowledge-engineering/memory/reference_mcp_connectors.md
