# Cloud-session task: nimbleway bootstrap (#130, sub-issue of #110)

You are a Claude Code on the Web session spawned to bootstrap the nimbleway vendor integration for `subagentceo/knowledge-engineering`. The operator has an active account on alex@jadecli.com (signup URL: `https://online.nimbleway.com/signup`; keys at `/account-settings/api-keys`).

## Branch

Branch off `main`. Name your branch `feat/nimbleway-bootstrap-2026-05-15`.

## Canonical reference (read these first)

- `docs/operator-runbooks/turbopuffer-api-key.md` — the proven template
- `src/lib/turbopuffer-client.ts` — the client wrapper shape
- `scripts/smoke-turbopuffer.ts` — the smoke-test shape
- `infra/cloudflare/src/outbound-allowlist.ts` — where to add `sdk.nimbleway.com` + `mcp.nimbleway.com`
- `vendor/nimble/docs.nimbleway.com/api-reference/introduction.md` — auth shape; base URL is `https://sdk.nimbleway.com/v1`
- `vendor/nimble/docs.nimbleway.com/integrations/mcp-server/mcp-server.md` — hosted MCP server at `https://mcp.nimbleway.com/mcp` with 18 tools

## Deliverables

1. `src/lib/nimbleway-client.ts` — thin wrapper exporting `makeNimblewayClient(apiKey: string)`. Use direct `fetch` against `https://sdk.nimbleway.com/v1/`.
2. `scripts/smoke-nimbleway.ts` — reads key from `~/.config/ke-nimbleway-key.tmp`. Hits the simplest auth endpoint (e.g., `GET /v1/tasks/{id}` per `api-reference/introduction.md`). Reports `OK ✅` or skip.
3. `docs/operator-runbooks/nimbleway-api-key.md` — runbook with two sections:
   - **API key path**: standard signup → dashboard → mint → CF Secrets Store
   - **Hosted MCP server path**: register `https://mcp.nimbleway.com/mcp` with the operator's Anthropic org connectors so admin@jadecli.com can use it via OAuth. Cite `vendor/anthropics/claude.com/docs/connectors/getting-started.md` and `building.md`.
4. Append both `sdk.nimbleway.com` AND `mcp.nimbleway.com` to `infra/cloudflare/src/outbound-allowlist.ts`. Note: `docs.nimbleway.com` is already there.
5. Append `"smoke:nimbleway": "tsx scripts/smoke-nimbleway.ts"` to `package.json`.
6. Append a row to `docs/operator-runbooks/README.md`.
7. Run `npm run verify`.

## Hard constraints

- Same as turbopuffer: no key echo, OAuth-only invariant, leak-safe pipeline, cite at least 3 paths under `vendor/nimble/`.
- Atomic commit: `feat(nimbleway): bootstrap client + smoke + runbook + MCP server (O8)` with `Refs #130`.

## E2E

```bash
test -f ~/.config/ke-nimbleway-key.tmp || echo "skip: key not staged"
npm run smoke:nimbleway
```

## Open PR

```bash
gh pr create --label automerge \
  --title "feat(nimbleway): bootstrap client + smoke + runbook + MCP server" \
  --body "Closes #130. Refs #110. (O8)"
```

End your run with `PR: <url>`.
