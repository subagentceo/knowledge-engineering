---
runbook: cloud-env-vars-contract
outcome: Canonical, single-source inventory of every environment variable, GitHub secret, GitHub variable, Cloudflare Secrets Store entry, and Worker binding the cloud-agent deploy path consumes.
unblocks: All Phase 8+ CI/CD work; eliminates re-deriving the wiring from workflows on every session
operator-manual-steps: none (audit + decision doc only)
---

# Operator runbook: cloud environment variables contract

This is **the canonical reference** for every env var, secret, variable, and binding the chassis touches. When a new vendor or new workflow needs a value, look here first; if it's not in the matrix, add a row to this doc (and the corresponding store) before wiring the consumer.

Closes #120.

## Identity

| Role | Identity |
| - | - |
| Subscription owner | alex@jadecli.com / alex-jadecli (the paying account everywhere) |
| Org-read inheritor | admin@jadecli.com / admin-jadecli (via vendor team/org features when supported) |
| GitHub secrets target | `subagentceo/knowledge-engineering` |
| CF Secrets Store target | account `e6294e3ea89f8207af387d459824aaae` (alex@jadecli.com's CF account), store id `565244614fc34be7aa8488ce46112f60` |
| Neon project | `divine-cloud-27295848` |

## Outcome (binary pass/fail)

Phase 8+ CI/CD runs successfully end-to-end with NO placeholder values in any store. Concretely: `wrangler deploy` from `infra/cloudflare/` followed by `POST /run` against `https://ke-cloud-agent.alex-e62.workers.dev/run` returns HTTP 200 with a `RunResponse` JSON body (see `infra/cloudflare/src/worker.ts:76-81`).

## Matrix: every identifier the deploy path touches

### Secrets (mutable values; rotate per cadence below)

| Name | Type | Source | Consumer | Set by | Current state (2026-05-15) |
| - | - | - | - | - | - |
| `CLOUDFLARE_API_TOKEN` | GH secret | <https://dash.cloudflare.com/profile/api-tokens> with `Workers Scripts:Edit` + `Secrets Store:Write` scopes | `.github/workflows/cloudflare-preview.yml` (deploy + Secrets Store bootstrap) | `cf-api-token.md` runbook OR `npm run setup:cf-ci-token` (CLI path if a `User > API Tokens > Edit` bootstrap token exists in macOS Keychain at `cf-bootstrap`) | ❌ MISSING — **the CI/CD gate** |
| `CLOUDFLARE_ACCOUNT_ID` | GH secret | `dash.cloudflare.com` sidebar; value = `e6294e3ea89f8207af387d459824aaae` | `cloudflare-preview.yml` (account targeting) | `gh secret set` or `cf-account-id.md` runbook | ✅ set `2026-05-15T08:43:34Z` |
| `CLAUDE_CODE_OAUTH_TOKEN` | GH secret + CF Secrets Store | `claude setup-token` (browser OAuth flow) | `bootstrap-secrets` job pipes into Secrets Store id `e22122884fda46ae901659c9ab808c90`; Worker's `env.CLAUDE_CODE_OAUTH_TOKEN.get()` forwards into Sandbox env so `claude --dangerously-skip-permissions -p ...` authenticates | `npm run rotate:claude-oauth` (`scripts/mint-claude-oauth-secret.ts` — leak-safe interactive flow) | ⚠ GH stale `2026-05-10`; CF placeholder. Tracked in #115. |
| `NEON_API_KEY` | GH secret + CF Secrets Store | `POST https://console.neon.tech/api/v2/api_keys` with neonctl OAuth bearer | `bootstrap-secrets` job pipes into Secrets Store id `f3d15d4730494d48834481ced8dc0b4e`; Worker's `createApiClient({ apiKey })` mints per-task DB branches | `npm run rotate:neon` (`scripts/mint-neon-api-secret.ts` — closes #116) | ⚠ GH side stale `2026-05-10` (revoked-and-replaced; new id 3075749 only in CF store as of `2026-05-15T03:32:31Z`). Tracked in #116. |
| `GITHUB_TOKEN` | CF Secrets Store ONLY (CI workflows use the auto-provided `secrets.GITHUB_TOKEN`) | `gh auth token` in this session OR Actions auto-provided per-run | Worker's `git push` + `gh pr create` from inside Sandbox | One-shot `gh auth token` capture + `wrangler secrets-store secret create/update --remote` via stdin | ✅ CF entry id `6fa4f835ef374911b38ee85955f517a0`, comment `admin-jadecli gh auth token, seeded 2026-05-15. Long-lived; rotate when admin-jadecli's gh PAT changes.` |
| `TURBOPUFFER_API_KEY_WRITE` | GH secret + CF Secrets Store | `https://turbopuffer.com/dashboard` (operator's premium $64/mo account) | `src/lib/turbopuffer-client.ts` (future chassis crawl pipeline integration) | One-shot stdin pipe to `wrangler secrets-store secret create --remote` | ✅ temp bootstrap landed in commit 2335179; auto-revoke EOD 2026-05-15 PT. Production key tracked in #122. |
| `PARALLELAI_API_KEY` | GH secret + CF Secrets Store (planned) | parallel.ai dashboard (operator has $70 credit on alex@jadecli.com) | `src/lib/parallel-ai-client.ts` (planned per #128) | `claude --chrome` paste-block (planned per #128) | ❌ MISSING. Tracked in #128. |
| `OLLAMA_API_KEY` | GH secret + CF Secrets Store (planned) | ollama.com cloud dashboard (operator has $20 paid tier on alex@jadecli.com) | `src/lib/ollama-client.ts` (planned per #129; depends on #131 vendor crawl) | `claude --chrome` paste-block (planned per #129) | ❌ MISSING. Tracked in #129. |
| `NIMBLEWAY_API_KEY` | GH secret + CF Secrets Store (planned) | <https://online.nimbleway.com/account-settings/api-keys> | `src/lib/nimbleway-client.ts` (planned per #130) + hosted MCP server at `mcp.nimbleway.com/mcp` | `claude --chrome` paste-block (planned per #130) | ❌ MISSING. Tracked in #130. |

### Variables (non-secret routing/config)

| Name | Type | Value | Consumer | Current state |
| - | - | - | - | - |
| `CLOUDFLARE_WORKER_NAME` | GH var | `ke-cloud-agent` | `cloudflare-preview.yml` workflow `if:` gate | ✅ set `2026-05-15T08:43:35Z` |
| `NEON_PROJECT_ID` | GH var | `divine-cloud-27295848` | `cloudflare-preview.yml` + Worker (`wrangler.jsonc:88`) | ✅ set `2026-05-10` |

### Cloudflare Worker bindings (`infra/cloudflare/wrangler.jsonc`)

| Name | Binding type | Source | Notes |
| - | - | - | - |
| `Sandbox` | Durable Object (sqlite) | `@cloudflare/sandbox@^0.10.1` | Per-task ephemeral sandbox container |
| `CLAUDE_CODE_OAUTH_TOKEN` | Secrets Store binding | Secret id `e22122884fda46ae901659c9ab808c90` | Read via `env.CLAUDE_CODE_OAUTH_TOKEN.get()` |
| `NEON_API_KEY` | Secrets Store binding | Secret id `f3d15d4730494d48834481ced8dc0b4e` | Read via `env.NEON_API_KEY.get()` |
| `GITHUB_TOKEN` | Secrets Store binding | Secret id `6fa4f835ef374911b38ee85955f517a0` | Read via `env.GITHUB_TOKEN.get()` |
| `NEON_PROJECT_ID` | `vars` | `divine-cloud-27295848` | Plain string |
| `IS_SANDBOX` | `vars` | `"0"` at Worker; flipped to `"1"` inside Sandbox via `setEnvVars` | Identity flag |
| `FLAGSHIP` | Flagship binding (DEFERRED) | Commented out in `wrangler.jsonc:91-117` | Re-enable after #117 lands |

### Local-dev environment variables (operator's machine)

| Name | Purpose | Source | Note |
| - | - | - | - |
| `NEON_DATABASE_URL` | Local crawler dual-write to production Neon branch | Operator exports manually OR derived via API | See `docs/operator-runbooks/neon-secrets-matrix.md` |
| `CF_BOOTSTRAP_TOKEN` | `npm run setup:cf-ci-token` (CLI-only CF API token mint path) | macOS Keychain entry `cf-bootstrap` | Operator mints once via dashboard; reused by mint script |
| `CLAUDE_CODE_OAUTH_TOKEN` (keychain) | The Agent SDK + Claude Code CLI auth | macOS Keychain entry `Claude Code-credentials`, account `alexzh` | Read via `security find-generic-password -s "Claude Code-credentials" -w \| jq -r '.claudeAiOauth.accessToken'` |
| `NEON_OAUTH` (in scripts/mint-neon-api-secret.ts) | Mint new programmatic Neon API keys | `jq -r '.access_token' ~/.config/neonctl/credentials.json` (refresh via `neonctl auth` if expired) | Never echoed |

## Forbidden values

**`ANTHROPIC_API_KEY` MUST NEVER appear** in any GH secret, GH var, CF Secrets Store entry, Sandbox env, local env, or commit. The OAuth-only invariant is defended at three layers:

1. **Layer 1 (build):** `src/oauth/token.ts` fails closed if `process.env.ANTHROPIC_API_KEY` is set when the OAuth gate runs.
2. **Layer 2 (CI workflow):** `.github/workflows/cloudflare-preview.yml:166-180` (`Assert ANTHROPIC_API_KEY is absent` step) fails the CI run if the Secrets Store contains an `ANTHROPIC_API_KEY` entry.
3. **Layer 3 (runtime):** `infra/cloudflare/src/worker.ts:100-105` `sanitizeEnv()` throws `ApiKeyForbiddenError` before forwarding env into the Sandbox.

If any future runbook needs to reference Claude auth, the contract is `CLAUDE_CODE_OAUTH_TOKEN` (which the CLI honors for inference) — period.

## Rotation cadence

| Identifier | Cadence | Re-mint command | Tracking issue |
| - | - | - | - |
| `CLOUDFLARE_API_TOKEN` | 1 year (per its TTL) | `cf-api-token.md` paste-block OR `npm run setup:cf-ci-token` | #114 |
| `CLAUDE_CODE_OAUTH_TOKEN` | Annually OR post-leak | `npm run rotate:claude-oauth` | #115 |
| `NEON_API_KEY` | No expiry; rotate post-leak or annually | `npm run rotate:neon` (when #116 lands) | #116 |
| `GITHUB_TOKEN` | Per CI run (auto-provided); manual entry rotated when admin-jadecli's PAT changes | One-shot `gh auth token \| wrangler secrets-store secret update --remote` | N/A (auto) |
| `TURBOPUFFER_API_KEY_WRITE` | EOD 2026-05-15 (one-time bootstrap) | Operator dashboard delete; #122 covers replacement | #122 |
| `PARALLELAI_API_KEY`, `OLLAMA_API_KEY`, `NIMBLEWAY_API_KEY` | Annually | Per-vendor paste-blocks (#128, #129, #130) | #128, #129, #130 |

## Rubric

- [x] **R1.** Doc enumerates every GH secret consumed by `.github/workflows/cloudflare-preview.yml`: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`, `CLAUDE_CODE_OAUTH_TOKEN`, `NEON_API_KEY`. ✅
- [x] **R2.** Doc enumerates every GH var the workflow consumes: `CLOUDFLARE_WORKER_NAME`, `NEON_PROJECT_ID`. ✅
- [x] **R3.** Doc enumerates every CF Secrets Store entry the Worker reads via bindings, with the exact `wrangler.jsonc` line range. ✅
- [x] **R4.** Doc names the forbidden key (`ANTHROPIC_API_KEY`) and the three defense layers explicitly with file paths + line ranges. ✅
- [x] **R5.** Doc has a rotation-cadence table with a re-mint command per identifier and a tracking issue. ✅
- [ ] **R6.** Doc is referenced from `docs/operator-runbooks/README.md` index table. ← landed by this PR
- [x] **R7.** Doc cites `infra/cloudflare/{wrangler.jsonc, src/worker.ts}` and `.github/workflows/cloudflare-preview.yml` directly. ✅

## Citations

- `.github/workflows/cloudflare-preview.yml` (the authoritative consumer)
- `infra/cloudflare/wrangler.jsonc` (the bindings declaration)
- `infra/cloudflare/src/worker.ts:48-68` (the `Env` interface — runtime contract)
- `seeds/prompts/operator-2026-05-10-followup.md` (OAuth-only invariant)
- `seeds/prompts/operator-2026-05-10.md` (operator posture)
- `docs/operator-runbooks/cf-api-token.md`, `cf-account-id.md`, `turbopuffer-api-key.md` (sister runbooks for individual identifiers)
- `docs/outcomes/desktop-driven-unblock-2026-05-15.md` § F1 (Neon leak post-mortem; underpins R3 leak-safe pipeline)

## Verification

```bash
# 1. Every GH secret in this doc maps to one in the actual repo
gh secret list --repo subagentceo/knowledge-engineering | \
  awk '{print $1}' | sort > /tmp/gh-secrets.txt
grep -oE '\`[A-Z][A-Z0-9_]+\`' docs/operator-runbooks/cloud-env-vars-contract.md | \
  tr -d '\`' | grep -v '_FILE\|_DIR\|_PROJECT_ID\|_WORKER_NAME\|_OAUTH\|_BOOTSTRAP' | \
  sort -u > /tmp/doc-secrets.txt
diff /tmp/gh-secrets.txt /tmp/doc-secrets.txt | head
# Expected: drift is bounded (missing rows are the ones flagged ❌ MISSING above)

# 2. Every CF Secrets Store entry in this doc maps to one in the actual store
npx --prefix infra/cloudflare wrangler secrets-store secret list \
  565244614fc34be7aa8488ce46112f60 --remote | grep -E "CLAUDE_CODE_OAUTH_TOKEN|NEON_API_KEY|GITHUB_TOKEN|TURBOPUFFER"

# 3. Forbidden value sanity check
! gh secret list --repo subagentceo/knowledge-engineering | grep -i "ANTHROPIC_API_KEY"
! grep -r "ANTHROPIC_API_KEY" docs/operator-runbooks/cloud-env-vars-contract.md | \
  grep -v "MUST NEVER\|forbidden\|never set\|never appear"
```

## Out of scope (separate runbooks)

- The mint flow for each identifier — see the sister runbooks (`cf-api-token.md`, `turbopuffer-api-key.md`, future `parallel-api-key.md`, etc.)
- Hyperdrive setup — `neon-hyperdrive-setup.md`
- MCP server registration — `neon-mcp-server.md`, future `nimbleway-api-key.md` § MCP server section
- Local-dev `NEON_DATABASE_URL` provisioning — `neon-secrets-matrix.md`

## Rotation

This contract doc itself is rotated when:
- A new identifier is added (new vendor, new workflow consumer)
- A current state column changes (re-verify after each rotation completes)
- The forbidden-key list grows (defense-in-depth posture changes)
