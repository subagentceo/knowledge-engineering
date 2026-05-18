# ADR: scriptable Cloudflare token rotation via long-lived minter (OSEC3)

**Date:** 2026-05-17
**Outcome:** OSEC3
**Status:** Accepted
**Supersedes:** the manual browser-click portion of `docs/operator-runbooks/secret-rotation.md` for Cloudflare-tier secrets

@cite vendor/cloudflare/developers.cloudflare.com/fundamentals/api/get-started/create-token/index.md
@cite scripts/secret-mint/cf-token-mint.ts
@cite infra/cloudflare/token-templates/edit-cloudflare-workers.json
@cite docs/decisions/2026-05-17-secret-store-tiers.md
@cite docs/decisions/2026-05-17-secrets-parity.md

## Problem

The OSEC2 rotation runbook for Cloudflare API tokens is a browser-click flow: dashboard → Create Token → template → scope dropdowns → Continue → Create → copy displayed value → paste into `gh secret set`. This is:

1. **Slow** — ~3 minutes per token, multiplied by N rotations.
2. **Exposure-prone** — the value displays once on the page; any screenshot, conversation log, or accidental scroll captures the literal secret.
3. **Non-deterministic** — the UI changes; selector drift breaks any Chrome automation.
4. **Non-auditable** — what scopes did the last rotation actually grant? You'd have to re-inspect the dashboard token page.

The 2026-05-17 incident (CF token value captured in conversation screenshot, forcing immediate rotation) proved the click flow is unsafe for autonomous agents.

## Decision

Two-tier minting:

1. **Long-lived MINTER token** — one browser-minted token per operator, scope `User > API Tokens > Edit` ONLY. Stored in macOS keychain as `CF_TOKEN_MINTER`. Used solely to mint other tokens via the REST API. Lives ~1 year, rotated annually.

2. **Short-lived SCOPED tokens** — every other CF API token (Worker deploy, R2, KV, etc.) is minted via `scripts/secret-mint/cf-token-mint.ts <template>`. The script reads `CF_TOKEN_MINTER` from keychain, POSTs to `https://api.cloudflare.com/client/v4/user/tokens` with the template payload, captures the response value, pipes it directly into `gh secret set` (+ optional `wrangler secrets-store`). **The value is never written to disk, never logged, never printed.**

### Templates as code

Each token type lives at `infra/cloudflare/token-templates/<name>.json` with:
- `name` (with `${ISO_DATE}` placeholder for uniqueness)
- `policies` with `permission_groups_named` (human-readable group names)
- `resources` with `${ACCOUNT_ID}` placeholder

The script resolves `permission_groups_named` → UUIDs at mint time by querying `/user/tokens/permission_groups`. This gives:
- **Auditability** — `git log infra/cloudflare/token-templates/` shows exactly what scopes were ever granted.
- **Drift detection** — if Cloudflare renames a permission group, the script fails loudly at mint time (unknown name) rather than silently granting wrong scope.
- **PR review** — scope changes go through normal code review, not a click in a dashboard.

### The `$comment` convention

JSON has no comments. Use top-level `"$comment"` keys; the script strips them before POSTing. Standard convention used by JSON Schema. Allows in-file docs without breaking the parser.

### What this does NOT replace

- **The MINTER token itself** — still browser-bootstrapped. One-time, infrequent. Same exposure risk as today, but limited to that one minute.
- **Turbopuffer / Anthropic OAuth / Neon API keys** — different vendors. Neon is similarly scriptable (OSEC4). Turbopuffer has no admin API; browser-only forever.
- **`wrangler secrets-store`** — still used for the runtime tier, but invoked by the script (not the operator).

## Outcomes

| ID | Outcome | Test |
|---|---|---|
| OSEC3-1 | `scripts/secret-mint/cf-token-mint.ts` exists and exposes the documented CLI flags | `src/lib/cf-token-mint-cli.test.ts` runs with `--dry-run` against a fixture template and asserts the substituted-but-not-POSTed JSON shape |
| OSEC3-2 | At least one template exists at `infra/cloudflare/token-templates/edit-cloudflare-workers.json` with the OSEC2 "Edit Cloudflare Workers" scope set | same test parses + validates the template |
| OSEC3-3 | The script never writes the minted value to disk or stdout | `src/lib/cf-token-mint-noleak.test.ts` greps the script body for `console.log.*value`, `writeFileSync.*value`, etc. |
| OSEC3-4 | `permission_groups_named` resolution is mandatory (no raw UUIDs in templates) | template-validate test asserts no `permission_groups` key without `_named` companion |

## Rejected alternatives

- **Pure browser automation via Claude in Chrome**: proven unsafe (the 2026-05-17 incident). Even with copy-to-clipboard + clipboard read, the value still passes through the JS bridge into the MCP transport.
- **API-token-create endpoint via wrangler**: doesn't exist. `wrangler` exposes `secret` (per-Worker bindings) and `secrets-store` (store contents), not user/account API tokens.
- **Global API Key as minter**: deprecated by Cloudflare; full-account access; security-equivalent to root.
- **Service Token + machine identity**: appropriate for Worker-to-Worker auth, not for operator-side mint flows.

## Operator bootstrap (one-time)

```bash
# 1. Browser: dash.cloudflare.com → Create Token → Custom token
#    Name: cf-token-minter-2026
#    Permissions: User → API Tokens → Edit (only)
#    Resources: All users
#    No IP filter, no TTL (or 1-year TTL with calendar reminder)
#    Create Token, copy value to clipboard, DO NOT paste in chat

# 2. Terminal:
security add-generic-password -a "$USER" -s CF_TOKEN_MINTER -w
# (paste at prompt; -w with no value reads stdin silently)

# 3. Verify:
security find-generic-password -s CF_TOKEN_MINTER -w | head -c 8 ; echo "..."

# 4. From now on:
npx tsx scripts/secret-mint/cf-token-mint.ts \
  --template infra/cloudflare/token-templates/edit-cloudflare-workers.json \
  --secret-name CLOUDFLARE_API_TOKEN
```
