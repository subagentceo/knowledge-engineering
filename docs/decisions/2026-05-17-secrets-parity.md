# ADR: secrets parity across local / GitHub / claude.ai/code cloud (OSEC1)

**Date:** 2026-05-17
**Outcome:** OSEC1
**Status:** Accepted

@cite src/oauth/token.ts
@cite docs/decisions/2026-05-16-osv-only-no-secret-scanning.md
@cite vendor/anthropics/code.claude.com/docs/en/security/best-practices.md
@cite .github/workflows/verify.yml

## Problem

Three runtime planes can each have a different view of which credentials exist:

1. **Local shell** — operator's `~/.zshrc` / macOS keychain via `security` / `op` (1Password CLI). Used for `npm run dev`, `npm run verify`, `npm run crawl:vendors`.
2. **GitHub Actions** — repo `secrets.*` and org `subagentceo/secrets.*`. Used by every workflow in `.github/workflows/`.
3. **claude.ai/code cloud environment** — env vars configured per-environment at `claude.ai/code/environments/<env-id>` UI. Used by Remote Control (RC) sessions and Routines that run in `subagent-products`, `agentwarehouses`, etc.

When these drift, you get **silent failures**:
- A workflow's `${{ secrets.X }}` resolves to empty string; the workflow proceeds and "succeeds" with degraded behavior (the `claude-review` workflow's `ANTHROPIC_API_KEY:` empty-string footgun was exactly this class).
- A local script reads `process.env.X` as `undefined`, falls back to a default, and the bug ships to production.
- An RC session in the cloud lacks a key the local session had, and the agent silently can't perform a tool call.

The goal is **loud parity**: every required secret is present on every plane it's needed on, every forbidden secret is absent from every plane, and CI fails red if either invariant is violated.

## Decision

### Three columns, three planes

| Secret | Local | GH repo | GH org | Cloud env | Rationale |
|---|---|---|---|---|---|
| `ANTHROPIC_API_KEY` | **FORBIDDEN** | **FORBIDDEN** | **FORBIDDEN** | **FORBIDDEN** | OAuth-only invariant. `src/oauth/token.ts` fails closed when present. Cited as load-bearing in CLAUDE.md. |
| `CLAUDE_CODE_OAUTH_TOKEN` | REQUIRED | REQUIRED | REQUIRED (✓) | REQUIRED | The OAuth token replacing the API key. Already org-scoped. |
| `GITHUB_TOKEN` | n/a | auto-provided | auto-provided | auto-provided | GitHub Actions injects this; not a managed secret. |
| `CLOUDFLARE_ACCOUNT_ID` | OPTIONAL (dev only) | REQUIRED (✓) | REQUIRED | REQUIRED | Worker deploy + Hyperdrive provisioning. Cited from `vendor/cloudflare/`. |
| `CLOUDFLARE_API_TOKEN` | OPTIONAL | REQUIRED | REQUIRED | REQUIRED | Worker deploy. Referenced from `.github/workflows/cloudflare-preview.yml`. |
| `NEON_API_KEY` | OPTIONAL | REQUIRED (✓) | REQUIRED | REQUIRED | `scripts/mint-neon-api-secret.ts` + Neon branch workflow. |
| `NEON_DATABASE_URL` | OPTIONAL | OPTIONAL | OPTIONAL | OPTIONAL | Generated per-branch at deploy time; not a static secret. |
| `TURBOPUFFER_API_KEY_WRITE` | OPTIONAL | REQUIRED (✓) | REQUIRED | REQUIRED | Platform-engineering bridge writes to turbopuffer. |

**`GH_*` env vars** (`GH_ORG`, `GH_OWNER`, `GH_PROJECT`, `GH_REPO`, `GH_SECRET`) are **configuration, not secrets**. Excluded from parity-check.

### Loud verifier

`scripts/verify-secrets-parity.ts` runs in the `verify:security-posture` step (already a gate). It:

1. Reads this ADR's machine-readable parity table from `docs/data/secrets-parity.json`.
2. For each plane:
   - **Local**: checks `process.env` against REQUIRED/FORBIDDEN.
   - **GH repo/org**: shells `gh secret list` (no values, only names) + `gh secret list --org subagentceo`.
   - **Cloud env**: there is no API for claude.ai/code env vars. Skipped at CI time, but a separate skill (`secrets-parity-cloud-audit`) drives Claude in Chrome to screenshot each environment's env vars and diff against the table. Output written to `docs/research/cloud-env-audit-<date>.md`.
3. **Exits non-zero** if any REQUIRED is missing where required, or any FORBIDDEN appears anywhere. The failure message names the secret, the plane, and the violation type — no silent-skip.

### Operator-paste fallback

GitHub's API is write-only on secret values (by design — read-after-write is impossible). For the 3 secrets currently at repo scope but not org scope (`CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_API_TOKEN`, `TURBOPUFFER_API_KEY_WRITE`), an autonomous agent cannot promote them — it has no read access to the value. The verifier surfaces the gap; the operator pastes the value once into the org-secrets UI or runs a single one-liner per secret.

Operator one-liner template:
```bash
# read the value from 1Password / keychain, pipe to gh
op read "op://Private/<item>/credential" | gh secret set --org subagentceo --visibility selected --repos knowledge-engineering NAME
```

### Anti-silent-failure rules

1. **No empty-string defaults for secrets.** `process.env.X || ""` is banned in src/ + scripts/ for any name in the parity table. A test (`src/lib/no-silent-secret-default.test.ts`) greps for the pattern and fails red.
2. **`continue-on-error: true` on a workflow that consumes a REQUIRED secret** must carry an `# OSEC1-exempt:` comment naming the reason. (Currently only `claude-code-review.yml` has this, exempted as documented.)
3. **Workflow that conditionally needs a secret** must wrap the step in `if: ${{ env.X != '' }}` and emit an explicit `echo "::notice::skipping <step> because <secret> is not set"`. Silent skip via empty `${{ secrets.X }}` is banned by lint.

## Outcomes

| ID | Outcome | Test |
|---|---|---|
| OSEC1-1 | `docs/data/secrets-parity.json` exists with the table above as machine-readable rows | `src/lib/secrets-parity-schema.test.ts` validates shape (zod) |
| OSEC1-2 | `scripts/verify-secrets-parity.ts` exits 0 when parity holds, non-zero otherwise | `src/lib/verify-secrets-parity.test.ts` runs the verifier in 3 modes (pass / missing-required / present-forbidden) |
| OSEC1-3 | The verifier is wired into `npm run verify:security-posture` | `src/lib/security-posture-wiring.test.ts` greps `scripts/verify-security-posture.ts` for the parity invocation |
| OSEC1-4 | `ANTHROPIC_API_KEY` is the only `FORBIDDEN` row and stays so | `src/lib/anthropic-api-key-forbidden.test.ts` asserts the row exists and value is `FORBIDDEN` on all planes |
| OSEC1-5 | A cloud-env-audit skill exists for the Chrome-driven plane | `plugins/platform-engineering/skills/cloud-env-audit/SKILL.md` exists; conformance asserted |

## Rejected alternatives

- **Single source-of-truth in 1Password + `op` CLI in CI**: introduces a 1Password dependency in every workflow and a long-lived service-account secret. The current model (GH secrets as canonical for CI plane, local plane self-owned, cloud plane audited) avoids that.
- **Auto-promote repo secrets to org via `gh`**: requires reading the value, which GitHub's API forbids by design.
- **Use Vault / Cloudflare Secrets Store as canonical**: ADR `2026-05-16-cloud-env-vars-contract.md` already defines the chassis posture; this ADR is the parity layer above it, not a replacement.
