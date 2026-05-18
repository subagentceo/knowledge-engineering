---
name: claude-action-lint
description: Lints .github/workflows/claude*.yml files for the OAUTO13 security baseline derived from https://github.com/anthropics/claude-code-action/blob/main/docs/security.md. Use whenever editing claude.yml or claude-code-review.yml; this skill catches anti-patterns (wildcard allowed_bots, pull_request_target with write perms, missing @v1 pin, ANTHROPIC_API_KEY presence, etc.) at edit time instead of CI time. Also exposed as MCP tool lint_claude_action_workflow.
---

# claude-action-lint

## When to invoke

- **Always automatically** via the `PreToolUse` hook on Write/Edit of any file under `.github/workflows/`. (See `hooks/hooks.json`.)
- Manually before opening a PR that touches Claude Code Action config.
- From other Claude sessions via the MCP tool `lint_claude_action_workflow`.

## What it checks

Codifies the rules from upstream `claude-code-action` `docs/security.md` plus OAUTO13's `src/lib/claude-action-workflows.test.ts`. Each finding is severity-tagged:

| Severity | Check |
|---|---|
| ERROR | `ANTHROPIC_API_KEY:` present anywhere (OSEC1 invariant violation) |
| ERROR | `allowed_bots: '*'` or `allowed_non_write_users: '*'` (public-repo invocation risk) |
| ERROR | Action pinned to `@main`, `@beta`, or `@v0` instead of `@v1` |
| ERROR | `pull_request_target` trigger + any `contents:write/pull-requests:write/issues:write` permission (pwn-request escalation) |
| ERROR | `workflow_run` trigger + checkout with `ref: ${{ github.event.workflow_run.head_sha }}` at workspace root (same as above) |
| WARNING | `claude.yml`-shape workflow with `contents:read` (interactive flows need write) |
| WARNING | `claude-code-review.yml`-shape workflow with `contents:write` (PR-event escalation) |
| WARNING | `--comment` flag passed to `/code-review:code-review` (no-op at best in v1; flag is local-CLI only) |
| INFO | `continue-on-error: true` on a Claude Code Action step without a comment explaining why (OAUTO1 tolerance must be documented) |

## Verbs

### READ (lint a file)

```bash
npx tsx "${CLAUDE_PLUGIN_ROOT}/skills/claude-action-lint/scripts/lint.ts" .github/workflows/claude-code-review.yml
```

Exit code:
- `0` — no ERRORs (WARNINGs / INFO ok)
- `1` — at least one ERROR

Output: per-finding `severity | rule | line | message`.

### READ (lint via MCP)

```
mcp__github-it-admin__lint_claude_action_workflow file_path=".github/workflows/claude.yml"
```

Same logic; returns JSON for tool consumption.

## Anti-silent-failure rules

1. **Lint MUST exit non-zero on ERROR.** Hooks and CI rely on this signal.
2. Unknown workflow shapes (no `claude-code-action@v1` reference) → skip silently. This is not the right linter for those files.
3. If the rules drift from upstream `docs/security.md`, update both the lint script AND `src/lib/claude-action-workflows.test.ts` in the same PR — they must stay in lockstep.

## Outcomes

| ID | Outcome | Verified by |
|---|---|---|
| OIT2-lint-1 | Detects all 5 ERROR-class patterns (ANTHROPIC_API_KEY, wildcard, wrong @ref, pull_request_target+write, workflow_run+head_sha+root) | unit test with fixture workflows |
| OIT2-lint-2 | Distinguishes claude-code-review (PR-event, needs contents:read) from claude.yml (interactive, needs writes) by detecting plugin invocation vs @claude trigger | unit test |
| OIT2-lint-3 | MCP tool returns same findings as CLI | conformance test |

## Citations

@cite https://github.com/anthropics/claude-code-action/blob/main/docs/security.md
@cite https://github.com/anthropics/claude-code-action/blob/main/action.yml (input source-of-truth)
@cite src/lib/claude-action-workflows.test.ts (OAUTO13 — same rules in test form)
@cite .github/workflows/claude.yml
@cite .github/workflows/claude-code-review.yml
@cite vendor/anthropics/code.claude.com/docs/en/github-actions.md
