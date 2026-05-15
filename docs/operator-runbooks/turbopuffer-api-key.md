---
runbook: turbopuffer-api-key
outcome: TURBOPUFFER_API_KEY provisioned in GH + CF Secrets Store; admin@jadecli.com inherits read access via the alex@jadecli.com admin invite
unblocks: Phase 11.C semantic vendor_grep (planned) + Phase G item O-G1; serves as the proven template the parallel-api-key.md + nimbleway-api-key.md runbooks cite
operator-manual-steps: confirm 2FA on turbopuffer.com; create namespace via dashboard; invite admin@jadecli.com to the team
---

# Operator runbook: provision TURBOPUFFER_API_KEY

This is the **skeleton** runbook (Phase G item O-G1). The parallel-api-key.md and nimbleway-api-key.md runbooks both cite this file as "proven template," which means the missing file was load-bearing reference rot. This PR closes that gap.

The full bootstrap (client + smoke test + first vector index) is scoped for a future cloud-session paste-prompt (`scripts/orchestrator/paste-prompts/turbopuffer.md`, not yet authored).

## Identity

| Role | Identity |
| - | - |
| Subscription owner | alex@jadecli.com / alex-jadecli (free-tier today; upgrade tracked separately) |
| Org-read inheritor | admin@jadecli.com / admin-jadecli (added to alex's turbopuffer namespace via dashboard "Invite team member" — Reader role at minimum, Admin if rotation is delegated) |
| GH secret target | `subagentceo/knowledge-engineering` |
| CF Secrets Store target | account `e6294e3ea89f8207af387d459824aaae`, store id `565244614fc34be7aa8488ce46112f60` |

## Outcome

- `gh secret list --repo subagentceo/knowledge-engineering | grep TURBOPUFFER_API_KEY` returns a row
- A CF Secrets Store entry named `TURBOPUFFER_API_KEY` exists
- `infra/cloudflare/src/outbound-allowlist.ts` includes `turbopuffer.com` (✅ pre-existing)
- alex@jadecli.com's turbopuffer namespace lists admin@jadecli.com as a team member (Admin or Reader role)
- The smoke test described under "Verification" succeeds (Bearer-token auth probe against the public API)

## Rubric

- [x] **R1.** Outbound-allowlist already includes `turbopuffer.com` (`infra/cloudflare/src/outbound-allowlist.ts`).
- [ ] **R2.** GH secret `TURBOPUFFER_API_KEY` set (operator action via dashboard token mint).
- [ ] **R3.** CF Secrets Store entry created.
- [ ] **R4.** admin@jadecli.com invited to the alex@jadecli.com namespace via turbopuffer dashboard.
- [ ] **R5.** `src/lib/turbopuffer-client.ts` + `scripts/smoke-turbopuffer.ts` land (cloud-session PR, future).
- [ ] **R6.** Smoke passes: `npm run smoke:turbopuffer` exits 0 with `OK ✅`.
- [ ] **R7.** Key value never echoed to chat/logs (leak-safe pipeline mirroring `scripts/mint-claude-oauth-secret.ts` + `scripts/mint-neon-api-secret.ts`).

## Citations

- `vendor/turbopuffer/turbopuffer.com/docs/auth.md` — Bearer-token auth shape; tokens minted via dashboard
- `vendor/turbopuffer/turbopuffer.com/docs/architecture.md` — overall service model (namespaces + vectors)
- `vendor/turbopuffer/turbopuffer.com/docs/audit-logs.md` — Admin-role visibility surfaces
- `vendor/turbopuffer/turbopuffer.com/docs/byoc.md` — BYOC option (not used here; we run on turbopuffer-managed)
- `docs/operator-runbooks/parallel-api-key.md` — sister runbook citing this file as template
- `docs/operator-runbooks/nimbleway-api-key.md` — sister runbook citing this file as template

## Bootstrap flow

### Day 1 (free-tier, current state)

1. Operator logs into turbopuffer.com as alex@jadecli.com.
2. Dashboard → Settings → API Keys → "Create token" → label `subagentceo-ke-rw`. Copy the token (it's shown once).
3. Dashboard → Settings → Team → "Invite member" → `admin@jadecli.com` → role `Admin` (so the inheritor can rotate keys without bouncing to alex).
4. Stage the secret via the standard leak-safe path used for the other vendors (Terminal.app file → `gh secret set` reading from stdin → wipe file). Pattern documented in `scripts/mint-claude-oauth-secret.ts` (cited for shape, not for token minting).
5. Add the same value to the CF Secrets Store via dashboard or `wrangler secret put TURBOPUFFER_API_KEY`.

### Day N (any session, any seat)

`admin@jadecli.com`'s turbopuffer dashboard now shows the same namespace. From there:

- Rotation: dashboard → Settings → API Keys → expire old token → create new → re-stage via the same leak-safe flow.
- Audit: dashboard → Audit Logs → confirm last-used timestamps + IPs.
- Cost: dashboard → Billing — alex's email receives invoices; admin@jadecli.com gets visibility, not the bill.

## Alt path: local CLI

A future `scripts/mint-turbopuffer-secret.ts` (mirroring `scripts/mint-neon-api-secret.ts`) can be authored once the chassis grows a turbopuffer-driven feature (Phase 11.C semantic `vendor_grep` is the leading candidate). Not in scope this phase.

## Verification

```bash
# Allowlist entry is present (pre-existing)
grep -E "turbopuffer\.com" infra/cloudflare/src/outbound-allowlist.ts
# Expected: 1 line

# After operator action lands:
gh secret list --repo subagentceo/knowledge-engineering | grep TURBOPUFFER_API_KEY
# Expected: 1 row

# Smoke (auth probe against /v1/namespaces, no writes):
curl -s -H "Authorization: Bearer $TURBOPUFFER_API_KEY" https://api.turbopuffer.com/v1/namespaces \
  | jq -e '.namespaces' >/dev/null && echo "OK ✅" || echo "FAIL ❌"
```

The auth probe avoids writes so it's safe to run on each verify pass.

## Rotation

Annually, or post-leak. The admin-invite chain means `admin@jadecli.com` can rotate without waking `alex@jadecli.com`.
