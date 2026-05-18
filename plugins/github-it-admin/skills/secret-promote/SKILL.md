---
name: secret-promote
description: Promote a repo-scoped GitHub secret to org scope (visibility=selected). Use when a secret currently exists at gh-repo scope but is needed at gh-org for the OSEC1 parity table. Operator-paste required because the gh API is write-only on secret values.
---

# secret-promote

## When to invoke

- During OSEC1 audit: `npm run verify:secrets` reports a secret as missing on `gh_org` but present on `gh_repo`.
- When onboarding a new repo to the same org's secret-sharing convention.
- After ADR-driven scope changes (e.g., a previously per-repo secret becomes shared infra).

## Why operator-paste (no automation)

GitHub's API is **write-only on secret values** — `gh secret list` returns names + timestamps but never values. So a script cannot read-then-write to promote; the operator has to paste once.

This skill provides the scaffolded paste flow + read-after-write verify so the promotion isn't silent if it fails.

## Verbs

### CREATE (promote)

```bash
bash "${CLAUDE_PLUGIN_ROOT}/skills/secret-promote/scripts/promote.sh" <SECRET_NAME>
```

Behavior:
1. Reads `SECRET_NAME` from `$1`.
2. Prompts operator with the mint URL for the vendor whose secret is being promoted (mapping is hardcoded for the OSEC1 known-list; falls back to "look it up").
3. Reads value from `pbpaste` (operator copies the value from wherever they re-fetched it — vendor dashboard, not from gh).
4. `gh secret set --org ${user_config.gh_org} --visibility selected --repos ${user_config.gh_repo} <NAME>`.
5. Wipes clipboard.
6. Reads `gh secret list --org` and asserts the new name is present with a fresh timestamp.

### READ (current scope split)

```bash
bash "${CLAUDE_PLUGIN_ROOT}/skills/secret-promote/scripts/list-scope-split.sh"
```

Prints a table of every secret in the OSEC1 parity table showing org-scope + repo-scope status.

### UPDATE / DELETE

Out of scope for this skill — use the vendor-specific CRUD skills in `macos-it-admin/` for value rotation, and `gh secret delete` for removal.

## Anti-silent-failure rules

1. Never `read -p` for the value (echoes to scrollback). Use `pbpaste`.
2. Read-after-write: must see new `updatedAt` timestamp before exiting clean.
3. If `gh secret set` exits non-zero, do not wipe clipboard (operator may need to retry).

## Outcomes

| ID | Outcome | Verified by |
|---|---|---|
| OIT2-prom-1 | `promote.sh` reads from `pbpaste`, not `read -p` | conformance test |
| OIT2-prom-2 | `list-scope-split.sh` cross-references against `docs/data/secrets-parity.json` (OSEC1) | conformance test |

## Citations

@cite docs/decisions/2026-05-17-secrets-parity.md (OSEC1)
@cite docs/decisions/2026-05-17-secret-store-tiers.md (OSEC2)
@cite docs/data/secrets-parity.json
