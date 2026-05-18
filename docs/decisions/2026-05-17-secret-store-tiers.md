# ADR: secret-store tiers — Cloudflare Secrets Store + GitHub org secrets (OSEC2)

**Date:** 2026-05-17
**Outcome:** OSEC2
**Status:** Accepted
**Supersedes:** the 1Password reference in OSEC1's "Operator-paste fallback" section (operator does not use 1Password)

@cite vendor/cloudflare/developers.cloudflare.com/secrets-store/llms.txt
@cite docs/decisions/2026-05-17-secrets-parity.md
@cite docs/decisions/2026-05-16-cloud-env-vars-contract.md
@cite docs/data/secrets-parity.json

## Problem

OSEC1 defined the parity table (which secrets must be present on which plane) and a verifier. It punted on *where* secrets canonically live. The operator confirmed:

- **Does not use 1Password.** All references must be removed.
- Wants Cloudflare Secrets Store and GitHub org secrets used "properly."

This ADR defines the two-tier canonical-storage model and the per-runtime read path for each tier.

## Decision

### Two canonical tiers — no third store

| Tier | Stores | Read path | Mint path |
|---|---|---|---|
| **Runtime (Workers / RC sessions)** | **Cloudflare Secrets Store** | bound to Worker via `[[secrets_store_secrets]]` in `wrangler.toml`; read at runtime as `env.<NAME>` | `wrangler secrets-store secret create <store-id> --name <NAME> --value <VALUE> --scopes workers` |
| **Build / CI (GitHub Actions, gh CLI scripts)** | **GitHub org secrets** (`subagentceo`) | `${{ secrets.<NAME> }}` in workflows; `gh secret list --org subagentceo` for inventory | `gh secret set --org subagentceo --visibility selected --repos knowledge-engineering <NAME>` |

**Local development** does not have a "tier" — operator uses macOS keychain or shell env at their own discretion. The OSEC1 verifier's `local` plane checks `process.env` only; how it got there is operator's choice.

**The two tiers are deliberately not mirrored automatically.** Both are write-only via API (read-after-write impossible by design). Promoting between them requires the value at mint time — there is no `cp` operation. This is a feature, not a limitation.

### Per-secret canonical home

| Secret | Runtime tier (CF Secrets Store) | CI tier (gh org) | Notes |
|---|---|---|---|
| `CLAUDE_CODE_OAUTH_TOKEN` | ✓ (Worker `[[secrets_store_secrets]]`) | ✓ (already) | Read by the Sandbox container; pinned at org scope. |
| `CLOUDFLARE_API_TOKEN` | n/a (CF is the platform) | ✓ | Used by deploy workflows only. |
| `CLOUDFLARE_ACCOUNT_ID` | n/a (CF auto-injects) | ✓ (promoted 2026-05-17 to org) | Not a secret — public account-scoped UUID; storing in gh secrets for ergonomics. |
| `NEON_API_KEY` | ✓ | ✓ | Worker reads at branch-creation time; CI reads for `npm run rotate:neon`. |
| `TURBOPUFFER_API_KEY_WRITE` | ✓ | ✓ | Worker reads for write-path; CI reads for smoke tests. |

`ANTHROPIC_API_KEY` is **explicitly absent** from both tiers (FORBIDDEN per OSEC1).

### Cloudflare Secrets Store specifics (cited)

From `vendor/cloudflare/developers.cloudflare.com/secrets-store/llms.txt`:
- A Secrets Store is account-scoped; one store-id per account is typical.
- Secrets are mounted into Workers via `wrangler.toml`:
  ```toml
  [[secrets_store_secrets]]
  binding = "CLAUDE_CODE_OAUTH_TOKEN"
  store_id = "${CLOUDFLARE_SECRETS_STORE_ID}"
  secret_name = "CLAUDE_CODE_OAUTH_TOKEN"
  ```
- The store_id for this account: see `process.env.CLOUDFLARE_SECRETS_STORE_ID` (already referenced in src/).
- Workers cannot list secrets — they can only bind explicitly named secrets at deploy time. Adding a secret requires a wrangler deploy to pick up the new binding.

### How an autonomous agent writes a secret (no 1Password)

When the operator provides a value (or when a value is in macOS keychain via `security find-generic-password`), the agent:

1. **For runtime tier**:
   ```bash
   wrangler secrets-store secret create $CLOUDFLARE_SECRETS_STORE_ID \
     --name NAME --value <VALUE> --scopes workers --remote
   ```
2. **For CI tier**:
   ```bash
   echo -n "<VALUE>" | gh secret set --org subagentceo \
     --visibility selected --repos knowledge-engineering NAME
   ```

For values that must exist in **both** tiers, the agent runs both commands with the same value in one operator-paste cycle. There is no auto-sync after that; rotation requires repeating both writes.

### Cloud env (`claude.ai/code` environments)

ADR OSEC1 specifies that the cloud_env plane has no API. This stays true. The cloud-env-audit skill drives Claude in Chrome to verify names. The operator is the only entity that can mint or rotate values via the claude.ai/code UI. Values flow operator → cloud_env directly, not via either tier.

## Outcomes

| ID | Outcome | Test |
|---|---|---|
| OSEC2-1 | The parity ADR (OSEC1) contains no reference to 1Password | `src/lib/no-1password-reference.test.ts` greps `docs/decisions/2026-05-17-secrets-parity.md` and asserts no match for `1password\|op://\|1Password` (case-insensitive) |
| OSEC2-2 | This ADR enumerates the two tiers and each parity-table secret has a canonical home | manual: table above must list every row from `docs/data/secrets-parity.json` |
| OSEC2-3 | `CLOUDFLARE_ACCOUNT_ID` is present at gh org scope | `gh secret list --org subagentceo \| grep CLOUDFLARE_ACCOUNT_ID` returns a row (already true as of 2026-05-17T23:48Z) |
| OSEC2-4 | A rotation runbook documents the dual-write procedure for runtime+CI tier | `docs/operator-runbooks/secret-rotation.md` exists |

## Rejected alternatives

- **1Password as canonical mint source**: operator does not use 1Password.
- **HashiCorp Vault**: third store; adds vendor and self-hosting burden. Cloudflare Secrets Store already provides what we need at the runtime tier.
- **AWS Secrets Manager / GCP Secret Manager**: out-of-tier vendors; introduces cross-cloud auth complexity for no marginal benefit.
- **Repo-scoped GitHub secrets as canonical**: works but doesn't span repos. Org scope is the right unit when the same secret is needed in `knowledge-engineering` + `subagentworkers` + future repos.
- **Auto-mirror Cloudflare Secrets Store → gh org**: both stores are write-only on values; the mirror operation cannot exist by API design.
