---
name: cloudflare-crud
description: CRUD over Cloudflare API tokens using the OSEC3 long-lived-minter pattern. Use when rotating CLOUDFLARE_API_TOKEN, listing existing tokens for audit, updating a token's permissions, or revoking a compromised token. Never operates on the dashboard via browser; all operations go through the Cloudflare REST API with values piped directly into gh secret set + wrangler secrets-store.
---

# cloudflare-crud

## When to invoke

- Quarterly rotation of `CLOUDFLARE_API_TOKEN` per `docs/operator-runbooks/secret-rotation.md`.
- Immediately on suspected token compromise (e.g., the 2026-05-17 incident).
- When adding a new vendor-token template to `infra/cloudflare/token-templates/` and you need to mint the first instance.
- When auditing the token list — `gh secret list` only shows names; only the Cloudflare API knows scope.

## Prerequisites

- `CF_TOKEN_MINTER` in macOS keychain (`security find-generic-password -s CF_TOKEN_MINTER -w` must succeed). Bootstrap once via the procedure in `docs/decisions/2026-05-17-cf-token-mint.md` §Operator bootstrap.
- `CLOUDFLARE_ACCOUNT_ID` env var set, or in gh secrets (script reads either).
- `gh` authenticated as `alex-jadecli` with `admin:org` scope (confirm `gh auth status`).

## Verbs

### CREATE

Mint a new token from a versioned template, dual-write to gh org + gh repo + (optionally) Cloudflare Secrets Store.

```bash
npx tsx scripts/secret-mint/cf-token-mint.ts \
  --template infra/cloudflare/token-templates/<template>.json \
  --secret-name CLOUDFLARE_API_TOKEN \
  [--runtime]
```

The canonical script lives at `scripts/secret-mint/cf-token-mint.ts` (OSEC3); this skill references it rather than duplicating. Templates live at `infra/cloudflare/token-templates/`.

### READ (list / inspect)

```bash
# List all tokens (names + scopes; values are not retrievable post-mint)
curl -sS https://api.cloudflare.com/client/v4/user/tokens \
  -H "Authorization: Bearer $(security find-generic-password -s CF_TOKEN_MINTER -w)" \
  | jq '.result[] | {id, name, status, last_used_on, policies: (.policies | length)}'
```

To inspect a specific token's policies in detail, append `/<token-id>` to the URL.

### UPDATE (re-mint with new scope)

Cloudflare API tokens are **immutable on the scope side**. "Update" means: mint a fresh token with the new template, dual-write, verify the consumer (Worker / CI) works with the new token, then DELETE the old one. Sequence:

```bash
# 1. mint new (writes to gh secrets, overwrites the old value)
npx tsx scripts/secret-mint/cf-token-mint.ts \
  --template infra/cloudflare/token-templates/<new-template>.json \
  --secret-name CLOUDFLARE_API_TOKEN

# 2. trigger a Worker deploy + smoke test to confirm new value works
gh workflow run cloudflare-preview.yml --ref main
# (wait for green; check Worker /health endpoint)

# 3. DELETE the previous token (find old id via READ above)
curl -sS -X DELETE \
  https://api.cloudflare.com/client/v4/user/tokens/<OLD_TOKEN_ID> \
  -H "Authorization: Bearer $(security find-generic-password -s CF_TOKEN_MINTER -w)" \
  | jq
```

### DELETE (revoke)

```bash
curl -sS -X DELETE \
  https://api.cloudflare.com/client/v4/user/tokens/<TOKEN_ID> \
  -H "Authorization: Bearer $(security find-generic-password -s CF_TOKEN_MINTER -w)" \
  | jq
```

After delete: rerun `npm run verify:secrets` — if the deleted token was `CLOUDFLARE_API_TOKEN`'s active value, the verifier will still see the gh-secret name as present (gh has no way to know upstream invalidated it). The only loud signal is the next Worker deploy failing with 401. Mitigation: only DELETE after a green smoke test on the replacement.

## Anti-silent-failure rules (OSEC3-inherited)

1. Never `console.log(value)` or `writeFileSync(value)`.
2. Status to stderr; stdout reserved for pipes.
3. Read-after-write: after CREATE, the script verifies the new token id is in the `READ` list before exiting clean.
4. UPDATE must run smoke test between CREATE and DELETE — never delete before validating.

## Outcomes

| ID | Outcome | Verified by |
|---|---|---|
| OIT1-cf-1 | CREATE writes value to gh org + repo without disk/stdout exposure | `src/lib/cf-token-mint.test.ts` (OSEC3 no-leak test) |
| OIT1-cf-2 | READ returns name/id/scope without value | manual: curl listed above returns no `value` field |
| OIT1-cf-3 | UPDATE sequence (mint → smoke → delete-old) is documented | this file |
| OIT1-cf-4 | DELETE revokes upstream — verifiable by re-reading token id returns 404 | manual: try the curl with deleted id |

## Citations

@cite vendor/cloudflare/developers.cloudflare.com/fundamentals/api/get-started/create-token/index.md
@cite docs/decisions/2026-05-17-cf-token-mint.md
@cite docs/decisions/2026-05-17-secrets-parity.md
@cite scripts/secret-mint/cf-token-mint.ts
@cite infra/cloudflare/token-templates/edit-cloudflare-workers.json
