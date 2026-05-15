---
runbook: parallel-api-key
outcome: PARALLELAI_API_KEY provisioned in GH + CF Secrets Store; chassis can call api.parallel.ai
unblocks: Phase 14+ parallel.ai integration (Search, Extract, Tasks, Chat, FindAll APIs)
operator-manual-steps: confirm 2FA on parallel.ai; one Terminal.app command for the leak-safe key staging
---

# Operator runbook: provision PARALLELAI_API_KEY

This is the **skeleton** runbook. The full bootstrap (client + smoke test + first commit) is dispatched as a cloud-session paste-prompt at `scripts/orchestrator/paste-prompts/parallel-ai.md` (landed via PR #109 orchestrator). Operator opens a fresh claude.ai/code session and pastes that prompt; the session clones the repo, mints the key, wires the client, and opens a PR.

## Identity

| Role | Identity |
| - | - |
| Subscription owner ($70 premium credit) | alex@jadecli.com / alex-jadecli |
| Org-read inheritor | admin@jadecli.com / admin-jadecli (via parallel.ai team feature if supported; otherwise per-key isolation) |
| GH secret target | `subagentceo/knowledge-engineering` |
| CF Secrets Store target | account `e6294e3ea89f8207af387d459824aaae`, store id `565244614fc34be7aa8488ce46112f60` |

## Outcome

- `gh secret list --repo subagentceo/knowledge-engineering | grep PARALLELAI_API_KEY` returns a row
- A new CF Secrets Store entry named `PARALLELAI_API_KEY` exists
- `infra/cloudflare/src/outbound-allowlist.ts` includes `api.parallel.ai` (✅ this PR)
- `scripts/smoke-parallel-ai.ts` exists and passes auth probe (in a follow-up cloud-session PR)
- `src/lib/parallel-ai-client.ts` exists (follow-up)

## Rubric

- [x] **R1.** Outbound-allowlist updated for `api.parallel.ai`. (✅ this PR)
- [ ] **R2.** GH secret `PARALLELAI_API_KEY` set. (Operator action via cloud-session prompt at `scripts/orchestrator/paste-prompts/parallel-ai.md`)
- [ ] **R3.** CF Secrets Store entry created. (Same)
- [ ] **R4.** `src/lib/parallel-ai-client.ts` + `scripts/smoke-parallel-ai.ts` land. (Cloud-session PR)
- [ ] **R5.** Smoke passes: `npm run smoke:parallel-ai` exits 0 with `OK ✅`.
- [ ] **R6.** Key value never echoed to chat/logs (leak-safe pipeline mirroring scripts/mint-claude-oauth-secret.ts + mint-neon-api-secret.ts).

## Citations

- `vendor/parallel-web/docs.parallel.ai/getting-started/overview.md` (auth shape, free vs paid tier)
- `vendor/parallel-web/docs.parallel.ai/getting-started/rate-limits.md` (limits per product)
- `vendor/parallel-web/docs.parallel.ai/getting-started/pricing.md` ($5–$2400/1000 runs by processor)
- `vendor/parallel-web/docs.parallel.ai/findall-api/findall-quickstart.md`
- `vendor/parallel-web/docs.parallel.ai/chat-api/chat-quickstart.md`
- `scripts/orchestrator/paste-prompts/parallel-ai.md` (the cloud-session task definition; PR #109)
- `docs/operator-runbooks/turbopuffer-api-key.md` (proven template this mirrors)
- `docs/operator-runbooks/cloud-env-vars-contract.md` (canonical inventory)

## Bootstrap flow

**Default path: cloud-session dispatch (operator's mobile / 2nd laptop):**

1. Operator opens claude.ai/code (web or mobile)
2. Starts a new session against `subagentceo/knowledge-engineering`
3. Pastes the prompt from `scripts/orchestrator/paste-prompts/parallel-ai.md`
4. The session clones the repo, mints the key via parallel.ai dashboard, wires the client, runs the smoke test, opens a PR
5. The pr-babysitter routine (#127) watches the PR through to merge

**Alt path: local CLI:** the operator can also run a future `scripts/mint-parallel-ai-secret.ts` (modeled on `scripts/mint-neon-api-secret.ts`) for headless rotation, once the dashboard token mint is done once.

## Verification

```bash
# Allowlist entry is present
grep -E "api\.parallel\.ai" infra/cloudflare/src/outbound-allowlist.ts
# Expected: 1 line

# After cloud-session PR lands:
gh secret list --repo subagentceo/knowledge-engineering | grep PARALLELAI_API_KEY
npm run smoke:parallel-ai
```

## Rotation

Annually, or post-leak. Re-mint via the same paste-prompt; or via a future CLI script.
