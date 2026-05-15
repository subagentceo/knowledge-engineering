---
runbook: ollama-cloud-api-key
outcome: OLLAMA_API_KEY provisioned + vendor/ollama/ mirror created so chassis can cite ollama cloud docs
unblocks: Phase 14+ ollama cloud model access (alex@jadecli.com $20 paid tier)
operator-manual-steps: 2FA on ollama.com; signup + paid tier verification (already done); operator runs `npm run crawl:vendor -- ollama` once entry is added
---

# Operator runbook: provision OLLAMA_API_KEY + fill vendor/ollama/ citation gap

This is the **skeleton** runbook with **explicit citation gap** flagging. The full bootstrap is dispatched as a cloud-session paste-prompt at `scripts/orchestrator/paste-prompts/ollama-cloud.md` (PR #109). Operator's session does **two phases**: (a) register ollama as a vendor in `scripts/crawl-vendors.ts` + run the crawl; (b) wire client + smoke + runbook citations.

## Identity

| Role | Identity |
| - | - |
| Subscription owner ($20 paid tier) | alex@jadecli.com / alex-jadecli |
| Org-read inheritor | admin@jadecli.com / admin-jadecli (via ollama cloud team feature if supported) |
| GH secret target | `subagentceo/knowledge-engineering` |
| CF Secrets Store target | account `e6294e3ea89f8207af387d459824aaae`, store id `565244614fc34be7aa8488ce46112f60` |

## Outcome

- `vendor/ollama/` directory exists with at least 5 mirrored docs (cloud quickstart, auth, models, pricing, rate-limits)
- `gh secret list --repo subagentceo/knowledge-engineering | grep OLLAMA_API_KEY` returns a row
- A CF Secrets Store entry named `OLLAMA_API_KEY` exists
- `infra/cloudflare/src/outbound-allowlist.ts` includes `ollama.com` + `api.ollama.com` (✅ this PR)
- `src/lib/ollama-client.ts` + `scripts/smoke-ollama-cloud.ts` land via cloud-session PR

## Rubric

- [x] **R1.** Outbound-allowlist updated for `ollama.com` and `api.ollama.com`. (✅ this PR)
- [ ] **R2.** `scripts/crawl-vendors.ts` extended with an `ollama` entry. (Cloud-session PR, phase A)
- [ ] **R3.** `vendor/ollama/` populated via `npm run crawl:vendor -- ollama`. Verify with `find vendor/ollama -name '*.md' | wc -l` ≥ 5.
- [ ] **R4.** GH secret `OLLAMA_API_KEY` set.
- [ ] **R5.** CF Secrets Store entry created.
- [ ] **R6.** `src/lib/ollama-client.ts` + `scripts/smoke-ollama-cloud.ts` land. Smoke calls the simplest auth-verifying endpoint (likely `GET /api/tags` or `GET /api/v1/models` once docs are mirrored).
- [ ] **R7.** Smoke passes: `npm run smoke:ollama-cloud` exits 0 with `OK ✅`.
- [ ] **R8.** Key value never echoed; leak-safe pipeline.

## Citation gap (explicit, intentional)

**`vendor/ollama/` does NOT exist yet.** This runbook deliberately ships in the skeleton phase WITHOUT vendor/ollama/ citations because they don't exist. The cloud-session paste-prompt at `scripts/orchestrator/paste-prompts/ollama-cloud.md` runs the crawl as Phase 0 of its execution, then completes the wiring in Phase 1 with real citations.

DO NOT attempt to follow this runbook before the cloud-session PR's Phase 0 (vendor crawl) has landed.

## Citations (current — minimal until crawl lands)

- `scripts/crawl-vendors.ts` (the registration shape the crawl entry will mirror)
- `scripts/orchestrator/paste-prompts/ollama-cloud.md` (the full cloud-session task; PR #109)
- `docs/operator-runbooks/turbopuffer-api-key.md` (proven template)
- `docs/operator-runbooks/cloud-env-vars-contract.md` (canonical inventory)
- External (until mirrored): `https://ollama.com/docs/cloud` — the seed URL for the crawl

## Bootstrap flow

**Default path: cloud-session dispatch (2 phases in one session):**

Phase 0 — fill the citation gap:
1. Read `scripts/crawl-vendors.ts` to understand the `CrawlConfig` shape (~line 59)
2. Add an `ollama` entry. Seed URL: `https://ollama.com/docs/cloud` or `https://ollama.com/llms.txt` (verify which exists first via `curl -sS -o /dev/null -w "%{http_code}\n"`)
3. Run `npm run crawl:vendor -- ollama`
4. Verify `find vendor/ollama -name '*.md' | wc -l` ≥ 5
5. Commit as `feat(vendor-crawl): register ollama + crawl ollama.com/docs/cloud (O8)` → first PR

Phase 1 — wire the client:
6. Read newly-crawled `vendor/ollama/...` to find: API host, auth header, simplest GET endpoint
7. Write `src/lib/ollama-client.ts` mirroring turbopuffer pattern
8. Write `scripts/smoke-ollama-cloud.ts` reading key from mode-0600 mktemp
9. Mint key via dashboard → leak-safe stdin pipe to CF Secrets Store + GH secret
10. Commit as `feat(ollama-cloud): bootstrap client + smoke + runbook (O8)` → second PR

## Verification

```bash
# Allowlist entries present
grep -E "ollama\.com" infra/cloudflare/src/outbound-allowlist.ts
# Expected: 2 lines (ollama.com + api.ollama.com)

# After cloud-session PRs land:
find vendor/ollama -name '*.md' | wc -l    # ≥ 5
gh secret list --repo subagentceo/knowledge-engineering | grep OLLAMA_API_KEY
npm run smoke:ollama-cloud
```

## Rotation

Annually, or post-leak. Re-mint via the cloud-session prompt; or via a future `scripts/mint-ollama-api-secret.ts`.
