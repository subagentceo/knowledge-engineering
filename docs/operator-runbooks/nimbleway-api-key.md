---
runbook: nimbleway-api-key
outcome: NIMBLEWAY_API_KEY provisioned + hosted MCP server registered with operator's Anthropic org connectors
unblocks: Phase 14+ nimbleway web-scraping integration (Search/Extract/Map/Crawl/Agents) + admin-jadecli's Claude sessions can use the MCP server
operator-manual-steps: signup at online.nimbleway.com/signup (if not done); 2FA on github.com; org-connector registration at claude.com/settings/connectors
---

# Operator runbook: provision NIMBLEWAY_API_KEY + register hosted MCP server

This is the **skeleton** runbook. The full bootstrap (client + smoke + first commit) is dispatched as a cloud-session paste-prompt at `scripts/orchestrator/paste-prompts/nimbleway.md` (PR #109).

## Identity

| Role | Identity |
| - | - |
| Subscription owner | alex@jadecli.com / alex-jadecli |
| Org-read inheritor | admin@jadecli.com / admin-jadecli (registers the nimbleway MCP at claude.com/settings/connectors so all 3 aliases' Claude sessions can use it) |
| GH secret target | `subagentceo/knowledge-engineering` |
| CF Secrets Store target | account `e6294e3ea89f8207af387d459824aaae`, store id `565244614fc34be7aa8488ce46112f60` |

## Outcome

- `gh secret list --repo subagentceo/knowledge-engineering | grep NIMBLEWAY_API_KEY` returns a row
- A CF Secrets Store entry named `NIMBLEWAY_API_KEY` exists
- `infra/cloudflare/src/outbound-allowlist.ts` includes `sdk.nimbleway.com` AND `mcp.nimbleway.com` (✅ this PR)
- The hosted MCP server at `https://mcp.nimbleway.com/mcp` is registered in the operator's Anthropic org connectors (admin-jadecli's Claude sessions can use it)

## Rubric

- [x] **R1.** Outbound-allowlist updated for both `sdk.nimbleway.com` and `mcp.nimbleway.com`. (✅ this PR)
- [ ] **R2.** GH secret `NIMBLEWAY_API_KEY` set. (Cloud-session prompt path)
- [ ] **R3.** CF Secrets Store entry created.
- [ ] **R4.** `src/lib/nimbleway-client.ts` + `scripts/smoke-nimbleway.ts` land. Smoke calls `GET https://sdk.nimbleway.com/v1/tasks/{id}` with Bearer.
- [ ] **R5.** Hosted MCP server registered at claude.com/settings/connectors. Verification: `claude /mcp` lists `nimbleway` as a connected server.
- [ ] **R6.** Key value never echoed; leak-safe pipeline.

## Citations

- `vendor/nimble/docs.nimbleway.com/api-reference/introduction.md` (auth shape; base URL `https://sdk.nimbleway.com/v1`)
- `vendor/nimble/docs.nimbleway.com/home.md` (overview)
- `vendor/nimble/docs.nimbleway.com/integrations/mcp-server/mcp-server.md` (hosted MCP at `https://mcp.nimbleway.com/mcp` with 18 tools)
- `vendor/nimble/docs.nimbleway.com/integrations/mcp-server/mcp-docs.md`
- `vendor/anthropics/claude.com/docs/connectors/getting-started.md` (how to register MCP at org level)
- `vendor/anthropics/claude.com/docs/connectors/building.md`
- `scripts/orchestrator/paste-prompts/nimbleway.md` (cloud-session task; PR #109)
- `docs/operator-runbooks/turbopuffer-api-key.md` (proven template)
- `docs/operator-runbooks/cloud-env-vars-contract.md` (canonical inventory)

## Bootstrap flow

**Default path: cloud-session dispatch:**

1. Operator opens claude.ai/code; pastes `scripts/orchestrator/paste-prompts/nimbleway.md`
2. Session mints key from `https://online.nimbleway.com/account-settings/api-keys`
3. Session wires client + smoke test against `GET https://sdk.nimbleway.com/v1/tasks/{id}`
4. Session opens PR
5. pr-babysitter watches through merge

**Org-connector registration (separate flow):**

1. Operator opens claude.com/settings/connectors as the org admin (admin-jadecli)
2. Adds nimbleway MCP server: `https://mcp.nimbleway.com/mcp`
3. Pastes the `NIMBLEWAY_API_KEY` value as Bearer
4. All org Claude sessions can now invoke the MCP's 18 tools (Search, Extract, Map, Crawl, Agents)

## Verification

```bash
# Allowlist entries are present
grep -E "sdk\.nimbleway\.com|mcp\.nimbleway\.com" infra/cloudflare/src/outbound-allowlist.ts
# Expected: 2 lines

# After cloud-session PR lands:
gh secret list --repo subagentceo/knowledge-engineering | grep NIMBLEWAY_API_KEY
npm run smoke:nimbleway

# Connector verification (from a Claude Code session):
# /mcp → list servers → nimbleway should appear as "connected" with 18 tools
```

## Rotation

Annually, or post-leak. Re-mint via the cloud-session prompt; or via a future `scripts/mint-nimbleway-api-secret.ts`.
