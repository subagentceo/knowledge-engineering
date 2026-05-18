---
name: parallel-ai-crud
description: CRUD over Parallel.ai (parallel.ai) API keys covering both Search and Task plans. Use when rotating PARALLEL_API_KEY, listing keys for audit, scoping a new key to a specific plan, or revoking a compromised key. Uses the OSEC3 minter pattern with PARALLEL_TOKEN_MINTER from macOS keychain.
---

# parallel-ai-crud

## When to invoke

- Quarterly rotation of `PARALLEL_API_KEY` per `docs/operator-runbooks/secret-rotation.md`.
- When this chassis adds a Routine that calls Parallel Search or Parallel Task and needs its own scoped key.
- On compromise.

## Prerequisites

- `PARALLEL_TOKEN_MINTER` in macOS keychain. Bootstrap:
  ```bash
  # 1. Browser: platform.parallel.ai/settings/api-keys (or equivalent)
  #    Create new key, name: "parallel-token-minter-YYYY"
  #    Permission: Admin (to allow this minter to create other keys)
  # 2. Terminal:
  security add-generic-password -a "$USER" -s PARALLEL_TOKEN_MINTER -w
  ```

**Note on Parallel.ai's API surface**: Parallel.ai's public docs (as of 2026-05-17) focus on the data plane (`POST /v1/search`, `POST /v1/tasks`). The admin/key API is documented at https://docs.parallel.ai/api-reference/auth — endpoints likely `POST /v1/api-keys` and `GET /v1/api-keys`. The script in `scripts/create.ts` assumes that shape; if Parallel.ai's API differs, update the script and bump its `@cite` header. Until verified end-to-end (operator first-run), treat the script as schema-stub.

## Verbs

### CREATE

```bash
npx tsx plugins/macos-it-admin/skills/parallel-ai-crud/scripts/create.ts \
  --name "knowledge-engineering-$(date +%Y-Q%q)" \
  --secret-name PARALLEL_API_KEY \
  [--runtime]
```

Behavior:
1. Read `PARALLEL_TOKEN_MINTER` from keychain.
2. `POST https://api.parallel.ai/v1/api-keys` with `{ name: <name> }`.
3. Capture response `key` (or `value`, or `api_key` — confirm at first run).
4. Dual-write to gh org + repo + (optionally) Cloudflare Secrets Store.
5. Read-after-write via `GET /v1/api-keys`.
6. Smoke: `POST https://api.parallel.ai/v1/search { "search_queries": ["test"] }` returns 200.

### READ

```bash
curl -sS https://api.parallel.ai/v1/api-keys \
  -H "x-api-key: $(security find-generic-password -s PARALLEL_TOKEN_MINTER -w)" \
  | jq '.[] | {id, name, created_at, last_used_at}'
```

(Confirm header name — Parallel.ai uses `x-api-key` per docs, not `Authorization: Bearer`. The script wraps this difference.)

### UPDATE (rotate value)

Same mint→smoke→delete-old pattern as Cloudflare and Neon.

### DELETE

```bash
curl -sS -X DELETE "https://api.parallel.ai/v1/api-keys/<KEY_ID>" \
  -H "x-api-key: $(security find-generic-password -s PARALLEL_TOKEN_MINTER -w)"
```

## Anti-silent-failure rules

1. Never log the response key field.
2. Status to stderr.
3. Read-after-write + smoke search query.
4. If smoke returns 401, do NOT proceed to DELETE old key.

## Outcomes

| ID | Outcome | Verified by |
|---|---|---|
| OIT1-par-1 | Script exists and never logs the response key field | no-leak test |
| OIT1-par-2 | Smoke query in `--runtime` mode | the script's exit code |
| OIT1-par-3 | First-run operator updates the script if Parallel.ai's actual API differs from the assumed shape | a one-line comment-update commit, cited from confirmed-response shape |

## Citations

@cite https://docs.parallel.ai/api-reference/auth
@cite https://docs.parallel.ai/api-reference/search
@cite docs/decisions/2026-05-17-cf-token-mint.md
@cite docs/decisions/2026-05-17-secrets-parity.md
