# Runbook: secret rotation (OSEC2)

@cite docs/decisions/2026-05-17-secret-store-tiers.md
@cite docs/decisions/2026-05-17-secrets-parity.md
@cite docs/data/secrets-parity.json

## When to run

- Quarterly rotation per `docs/governance.md`.
- Immediately on suspected compromise.
- When a new secret is added to the parity table.

## Procedure

### 1. Mint the new value

Mint at the vendor's console:

| Secret | Mint URL |
|---|---|
| `CLOUDFLARE_API_TOKEN` | https://dash.cloudflare.com/profile/api-tokens → "Create Token" → use template `Edit Cloudflare Workers` |
| `NEON_API_KEY` | https://console.neon.tech/app/settings/api-keys → "New API Key" |
| `TURBOPUFFER_API_KEY_WRITE` | https://turbopuffer.com/dashboard/api-keys → "Create write key" |
| `CLAUDE_CODE_OAUTH_TOKEN` | `claude auth` in terminal — prints token after browser flow |

### 2. Stage the value locally (operator's choice)

Paste into a shell variable for the duration of the rotation. Do not write to a file.

```bash
read -rs NEW_VALUE   # silent prompt; paste; press enter
```

Or, if it's in macOS keychain:

```bash
NEW_VALUE=$(security find-generic-password -s NEON_API_KEY -w)
```

### 3. Dual-write to both tiers

```bash
# CI tier (GitHub org secret — visible to all selected repos)
printf '%s' "$NEW_VALUE" | gh secret set --org subagentceo \
  --visibility selected --repos knowledge-engineering NEON_API_KEY

# Runtime tier (Cloudflare Secrets Store — read by Workers at runtime)
wrangler secrets-store secret create "$CLOUDFLARE_SECRETS_STORE_ID" \
  --name NEON_API_KEY --value "$NEW_VALUE" --scopes workers --remote
```

For secrets only in the CI tier (e.g., `CLOUDFLARE_API_TOKEN`), skip the wrangler command. The per-secret table in `docs/decisions/2026-05-17-secret-store-tiers.md` is canonical.

### 4. Trigger a redeploy

The wrangler binding is read at deploy time. After rotating any runtime-tier secret:

```bash
cd infra/cloudflare && wrangler deploy
```

### 5. Clear the local variable

```bash
unset NEW_VALUE
```

### 6. Verify

```bash
npm run verify:secrets
```

Must report `[OSEC1] parity OK`. If a row reports missing, repeat step 3 for that secret.

### 7. Update parity table if needed

If the rotation added a new secret to the system (not just a value change), append a row to `docs/data/secrets-parity.json` and bump its `version`. The OSEC1 tests will fail until you do.

## Anti-silent-failure checks during rotation

- Run `npm run verify:secrets` immediately after each `gh secret set` and after each `wrangler secrets-store secret create`. If it doesn't transition from violation to clean, the write failed silently.
- After redeploy, hit a known Worker endpoint that exercises the rotated secret (e.g., `curl https://<worker>/health` for `CLAUDE_CODE_OAUTH_TOKEN`). A 500 or 401 means the new value didn't propagate.
- Do not delete the old secret value until verification passes — Cloudflare Secrets Store keeps versions; gh secrets are name-keyed (set overwrites), so the gh tier can't preserve a fallback. Test before you'd otherwise need to revert.

## What this runbook does NOT cover

- `ANTHROPIC_API_KEY` rotation: it is FORBIDDEN on every plane per OSEC1. There is nothing to rotate.
- `claude.ai/code` cloud_env values: operator updates via UI; run the `cloud-env-audit` skill afterwards to confirm.
- `GITHUB_TOKEN`: GitHub Actions provides this per-run; not a managed secret.
