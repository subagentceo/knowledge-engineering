---
name: neon-crud
description: CRUD over Neon API keys using the OSEC3 minter pattern. Use when rotating NEON_API_KEY, listing existing keys for audit, creating a per-environment scoped key, or revoking a compromised key. Operates via Neon REST API (api.neon.tech/api/v2/api_keys) with a long-lived NEON_TOKEN_MINTER from macOS keychain.
---

# neon-crud

## When to invoke

- Quarterly rotation of `NEON_API_KEY` per `docs/operator-runbooks/secret-rotation.md`.
- When creating a per-branch or per-environment scoped key (Neon supports key-per-project; useful for blast-radius isolation).
- On suspected key compromise.
- When auditing the org's key inventory.

## Prerequisites

- `NEON_TOKEN_MINTER` in macOS keychain. Bootstrap:
  ```bash
  # 1. Browser: console.neon.tech/app/settings/api-keys
  #    Create new key, name: "neon-token-minter-YYYY"
  #    Neon doesn't have granular permissions — all keys are full-account.
  #    Treat this key as your minter; it IS what other keys would look like.
  # 2. Terminal:
  security add-generic-password -a "$USER" -s NEON_TOKEN_MINTER -w
  # (paste at prompt)
  ```
- `gh` authenticated with `admin:org` scope.

**Important note on Neon's permission model**: Neon API keys are not scope-able. Every key has full access to the account's projects. This means the "minter" pattern provides less benefit here than for Cloudflare — the minter and the minted are equivalent in scope. The script is still worthwhile for: (a) avoiding browser exposure on every rotation, (b) auditability via consistent naming, (c) read-after-write verification.

## Verbs

### CREATE

```bash
npx tsx plugins/macos-it-admin/skills/neon-crud/scripts/create.ts \
  --name "knowledge-engineering-$(date +%Y-Q%q)" \
  --secret-name NEON_API_KEY \
  [--runtime]
```

Behavior:
1. Read `NEON_TOKEN_MINTER` from keychain.
2. `POST https://console.neon.tech/api/v2/api_keys` with `{ key_name: <name> }`.
3. Capture response `key` field (the actual token value).
4. `gh secret set` to org + repo.
5. If `--runtime` and `CLOUDFLARE_SECRETS_STORE_ID` set: `wrangler secrets-store secret create`.
6. Read-after-write: `GET /api_keys` and assert the new `id` appears in the response.

### READ

```bash
curl -sS https://console.neon.tech/api/v2/api_keys \
  -H "Authorization: Bearer $(security find-generic-password -s NEON_TOKEN_MINTER -w)" \
  -H "Accept: application/json" | jq '.[] | {id, name, created_at, created_by, last_used_at}'
```

Values are never returned by Neon's API after creation.

### UPDATE

Neon keys can be **renamed** but not re-scoped (Neon has no scopes). For value rotation: CREATE new + verify consumer + DELETE old, identical sequence to Cloudflare:

```bash
# 1. Mint new (overwrites gh secret value)
npx tsx plugins/macos-it-admin/skills/neon-crud/scripts/create.ts \
  --name "knowledge-engineering-$(date +%Y-Q%q)" \
  --secret-name NEON_API_KEY

# 2. Smoke test: trigger the neon-branch workflow
gh workflow run neon-branch.yml --ref main
# (wait for green)

# 3. Find old key id via READ and DELETE
OLD_ID=$(curl -sS https://console.neon.tech/api/v2/api_keys \
  -H "Authorization: Bearer $(security find-generic-password -s NEON_TOKEN_MINTER -w)" \
  | jq -r '.[] | select(.name | test("knowledge-engineering-2026-Q1")) | .id')
curl -sS -X DELETE "https://console.neon.tech/api/v2/api_keys/$OLD_ID" \
  -H "Authorization: Bearer $(security find-generic-password -s NEON_TOKEN_MINTER -w)"
```

### DELETE

```bash
curl -sS -X DELETE "https://console.neon.tech/api/v2/api_keys/<KEY_ID>" \
  -H "Authorization: Bearer $(security find-generic-password -s NEON_TOKEN_MINTER -w)"
```

## Anti-silent-failure rules

1. Never log the response `key` field.
2. Status messages to stderr.
3. Read-after-write — assert the new id is in `GET /api_keys` response.
4. Smoke test before DELETE old.

## Outcomes

| ID | Outcome | Verified by |
|---|---|---|
| OIT1-neon-1 | `scripts/create.ts` exists and never logs the `key` response field | unit test in `src/lib/macos-it-admin-noleak.test.ts` |
| OIT1-neon-2 | Read-after-write verify on CREATE | the script's exit code |
| OIT1-neon-3 | UPDATE sequence (mint → smoke → delete-old) documented | this file |

## Citations

@cite vendor/neon/ (mirror of Neon docs if available)
@cite https://api-docs.neon.tech/reference/listapikeys
@cite docs/decisions/2026-05-17-cf-token-mint.md
@cite docs/decisions/2026-05-17-secrets-parity.md
