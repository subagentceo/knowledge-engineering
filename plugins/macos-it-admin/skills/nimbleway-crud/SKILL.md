---
name: nimbleway-crud
description: CRUD over Nimbleway (Nimble) admin API tokens, used by the Nimble MCP connector for crawl/extract/agent operations. Uses the OSEC3 minter pattern with NIMBLEWAY_TOKEN_MINTER from macOS keychain. Operations cover the Nimble admin API (api.webit.live or app.nimbleway.com depending on the product surface).
---

# nimbleway-crud

## When to invoke

- Quarterly rotation of `NIMBLEWAY_API_KEY` per `docs/operator-runbooks/secret-rotation.md`.
- When a new Routine needs its own crawl-scoped key (Nimble supports per-key crawl budgets — useful for blast-radius isolation).
- On compromise.

## Prerequisites

- `NIMBLEWAY_TOKEN_MINTER` in macOS keychain. Bootstrap:
  ```bash
  # 1. Browser: app.nimbleway.com/settings/api or equivalent
  #    Create admin token, name: "nimbleway-token-minter-YYYY"
  # 2. Terminal:
  security add-generic-password -a "$USER" -s NIMBLEWAY_TOKEN_MINTER -w
  ```

**Note on Nimble's API surface**: Nimble's public REST endpoints are at `api.webit.live` (data plane: `POST /unblocker/...`). The admin/account API for key management is documented at https://docs.nimbleway.com (verify exact endpoint at first run). The skill's script assumes `POST /account/api-keys` shape; bump the script's `@cite` once confirmed.

The MCP connector `claude.ai Nimble` (UUID `f41545b8`) exposes 18 tools including `nimble_agent_run_async`, `nimble_crawl_run`, etc. — these use the API key indirectly via the connector's own auth. This skill manages the same underlying key that gets configured into the connector + the Worker runtime.

## Verbs

### CREATE

```bash
npx tsx plugins/macos-it-admin/skills/nimbleway-crud/scripts/create.ts \
  --name "knowledge-engineering-$(date +%Y-Q%q)" \
  --secret-name NIMBLEWAY_API_KEY \
  [--runtime]
```

Behavior identical to neon-crud and parallel-ai-crud: mint → dual-write → read-after-write verify.

### READ

```bash
curl -sS https://api.webit.live/account/api-keys \
  -H "Authorization: Basic $(security find-generic-password -s NIMBLEWAY_TOKEN_MINTER -w)" \
  | jq '.[] | {id, name, created_at, scopes}'
```

(Confirm whether Nimble uses `Basic` or `Bearer` auth at first run.)

### UPDATE

Same mint → smoke → delete-old sequence. Smoke test for Nimble: trigger a small crawl with `nimble_crawl_run` via the connector, or `POST /unblocker/web` via REST.

### DELETE

```bash
curl -sS -X DELETE "https://api.webit.live/account/api-keys/<KEY_ID>" \
  -H "Authorization: Basic $(security find-generic-password -s NIMBLEWAY_TOKEN_MINTER -w)"
```

## Anti-silent-failure rules

1. Never log the response key field.
2. Status to stderr.
3. Read-after-write + smoke crawl request.
4. If smoke returns 401/403, do NOT proceed to DELETE old key.
5. **Connector sync** — after rotation, the operator must update the claude.ai connector's stored API key via the customize-connectors UI. The skill prints a reminder; there is no API path to sync this automatically.

## Outcomes

| ID | Outcome | Verified by |
|---|---|---|
| OIT1-nim-1 | Script exists and never logs response key field | no-leak test |
| OIT1-nim-2 | Read-after-write verify | script exit code |
| OIT1-nim-3 | Operator-reminder banner about claude.ai connector sync | script stderr output |
| OIT1-nim-4 | First-run operator confirms endpoint shape (api.webit.live vs app.nimbleway.com) and updates script `@cite` | one-line commit |

## Citations

@cite https://docs.nimbleway.com
@cite docs/decisions/2026-05-17-cf-token-mint.md
@cite docs/decisions/2026-05-17-secrets-parity.md
@cite /Users/alexzh/.claude/projects/-Users-alexzh-subagentmcp-subagentceo-knowledge-engineering/memory/reference_mcp_connectors.md (Nimble connector inventory)
