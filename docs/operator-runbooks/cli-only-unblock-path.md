# CLI-only unblock path — bypass Claude-in-Chrome runbooks

> Workarounds discovered 2026-05-15 by reading `vendor/cloudflare/`, `vendor/anthropics/`, and the GitHub MCP tool surface. Each workaround uses tools the operator already has on their local shell instead of running the Chrome runbooks.
>
> **Why this exists:** the original runbooks (`docs/operator-runbooks/cf-api-token.md`, `cf-account-id.md`, `github-pat.md`, `voyage-api-key.md`) all assume `claude --chrome`. That works but adds an extension dependency. The operator may not always want Chrome; CLI-only is faster when the operator already has `wrangler`, `gh`, and `npm` locally.

## Surface matters: pick the right playbook

Before running anything below, identify which Claude surface you're operating from. The capabilities differ in load-bearing ways:

| Capability | Claude Code on the web | Claude Code Desktop | Claude Code CLI |
| :--- | :---: | :---: | :---: |
| `~/.claude/CLAUDE.md` available | ❌ ([web doc:70](../../vendor/anthropics/code.claude.com/docs/en/claude-code-on-the-web.md)) | ✅ | ✅ |
| Local `gh auth` + `wrangler` OAuth state | ❌ ([web doc:73](../../vendor/anthropics/code.claude.com/docs/en/claude-code-on-the-web.md)) | ✅ | ✅ |
| macOS Keychain / `security` CLI | ❌ | ✅ | ✅ |
| Interactive auth (SSO, dashboard logins) | ❌ ([web doc:74](../../vendor/anthropics/code.claude.com/docs/en/claude-code-on-the-web.md)) | ✅ | ✅ |
| `claude-in-chrome` MCP (agent drives a real browser) | ❌ | ✅ ([desktop doc:230](../../vendor/anthropics/code.claude.com/docs/en/desktop.md)) | ✅ when `--chrome` flag passed |
| Computer use (full screen + click) | ❌ | ✅ ([desktop doc:210](../../vendor/anthropics/code.claude.com/docs/en/desktop.md)) | ❌ |
| Bypass-permissions mode | (sandboxed VM, not needed) | ✅ ([desktop doc:75](../../vendor/anthropics/code.claude.com/docs/en/desktop.md)) | ✅ via `--dangerously-skip-permissions` |
| Sandboxed VM, ephemeral filesystem | ✅ | ❌ | ❌ |

**Implication for these runbooks:**

- The original Chrome runbooks under `docs/operator-runbooks/` were written from a **web session** ([session_01TryfgvS5AM9FZe3kJet56s](https://claude.ai/code/session_01TryfgvS5AM9FZe3kJet56s)). Their "operator must run `claude --chrome` and confirm 2FA" framing is correct for that surface — the cloud session genuinely cannot reach the operator's local browser.
- On **Desktop**, the agent itself drives the browser via `claude-in-chrome` MCP. The "operator clicks" framing collapses to "agent clicks, operator approves once."
- On **CLI without `--chrome`**, the Workarounds below (W1, W2 via local browser, W2b via bootstrap token, W3, W4) are the right path.

This file is the **CLI/web playbook**. For Desktop-native equivalents, see issues [#110](https://github.com/subagentceo/knowledge-engineering/issues/110), [#111](https://github.com/subagentceo/knowledge-engineering/issues/111), [#112](https://github.com/subagentceo/knowledge-engineering/issues/112), [#113](https://github.com/subagentceo/knowledge-engineering/issues/113) — which describe the same outcomes but with the agent doing the browser work directly.

## Pre-flight checks (run once)

```bash
# Required: latest Wrangler + gh CLI authenticated locally
npm install -g wrangler@latest
gh auth status     # must show authenticated; if not: `gh auth login`

# Optional: OAuth token for Anthropic (used by the CI workflow,
# not by these workarounds — only for completeness)
echo $CLAUDE_CODE_OAUTH_TOKEN | head -c 20
```

If `gh auth status` shows authenticated to `github.com` with the `subagentceo` org, you can skip the GH PAT runbook entirely (Workaround 3 below).

## Workaround 1 — CF account ID (closes half of #34, no Chrome)

The orchestrator already reads this via the Cloudflare MCP server in-session. The account ID is **not a secret** — it appears in dashboard URLs and deploy logs.

For the `subagentceo/knowledge-engineering` repo, the relevant account is **Alex@jadecli.com's Account** with ID:

```
e6294e3ea89f8207af387d459824aaae
```

Set it locally:

```bash
gh secret set CLOUDFLARE_ACCOUNT_ID \
  --repo subagentceo/knowledge-engineering \
  --body "e6294e3ea89f8207af387d459824aaae"

gh variable set CLOUDFLARE_WORKER_NAME \
  --repo subagentceo/knowledge-engineering \
  --body "ke-cloud-agent"
```

Verify:

```bash
gh secret list   --repo subagentceo/knowledge-engineering | grep CLOUDFLARE_ACCOUNT_ID
gh variable list --repo subagentceo/knowledge-engineering | grep CLOUDFLARE_WORKER_NAME
```

Closes the data-side of #34 with **zero Chrome interaction**.

## Workaround 2 — CF API token via `wrangler login` (closes #33, no Chrome extension)

Cited from `vendor/cloudflare/developers.cloudflare.com/workers/wrangler/commands/general/index.md` and the CF docs search result for `wrangler login`:

> When running Wrangler locally, authentication to the Cloudflare API happens via the `wrangler login` command, which initiates an interactive authentication flow.

`wrangler login` opens a browser tab to `dash.cloudflare.com` (no Claude-in-Chrome extension required — just any browser), authenticates via OAuth, and stores the token at `~/.wrangler/config/default.toml`. The operator can extract it and pipe to `gh secret set`:

```bash
# 1. Local interactive OAuth (any browser)
wrangler login                # opens dash.cloudflare.com OAuth in default browser

# 2. Verify auth
wrangler whoami               # should show alex@jadecli.com + account list

# 3. Mint a CI-scoped API token via the dashboard ONCE
#    The OAuth flow above is interactive and non-extractable; for CI
#    we need a long-lived token. The fastest CLI-only path:
#
#    wrangler doesn't expose a `mint-token` subcommand. So we still
#    need ONE dashboard visit, but it's a regular browser tab — no
#    extension required.
open "https://dash.cloudflare.com/?to=/:account/api-tokens"

# 4. Click "Create Token" → "Edit Cloudflare Workers" template →
#    Scope: account = Alex@jadecli.com → Continue → Create
# 5. Copy the token to clipboard

# 6. Set as repo secret
gh secret set CLOUDFLARE_API_TOKEN \
  --repo subagentceo/knowledge-engineering \
  --body "$(pbpaste)"        # macOS; use `xclip -o` on Linux
```

Verify:

```bash
gh secret list --repo subagentceo/knowledge-engineering | grep CLOUDFLARE_API_TOKEN
```

Closes #33 with one regular browser tab + four CLI commands. **No Chrome extension required.**

## Workaround 2b — programmatic CF token mint (recurring, no dashboard)

W2 still requires a one-time dashboard visit. **After that visit**, every subsequent CI-token mint can run CLI-only via `npm run setup:cf-ci-token`.

The bootstrap is unavoidable — empirically confirmed 2026-05-15 that wrangler's OAuth Bearer at `~/Library/Preferences/.wrangler/config/default.toml` cannot call `/user/tokens` (returns code 1000 "Invalid API Token"). Cloudflare separates "OAuth-issued Bearer for wrangler" from "user-minted API tokens" by design, and only the latter can mint further tokens. Cited from:

- `mcp__3e5cbdb5...search_cloudflare_documentation` ("If you need to create a service API token programmatically, follow these steps. ### 1. Create an API token with token creation permissions ... Under **Permissions**, select **User > API Tokens > Edit**.")
- `https://developers.cloudflare.com/fundamentals/api/how-to/create-via-api/` (POST /user/tokens schema)

### One-time bootstrap

1. Visit `https://dash.cloudflare.com/profile/api-tokens` → **Create Token** → **Create Custom Token**
2. Name: `KE Bootstrap Token` (or similar)
3. Permissions: **User > API Tokens > Edit** (this is the *only* permission needed for the bootstrap — it cannot deploy Workers, only mint other tokens)
4. Account Resources: include all accounts
5. **Create Token** → copy the value
6. Save it in 1Password / Keychain. Set `CF_BOOTSTRAP_TOKEN` in your shell rc:
   ```bash
   export CF_BOOTSTRAP_TOKEN=$(security find-generic-password -s cf-bootstrap -w 2>/dev/null)
   ```

### Recurring mint (no dashboard)

```bash
CF_BOOTSTRAP_TOKEN=$CF_BOOTSTRAP_TOKEN npm run setup:cf-ci-token
# Mints a fresh CLOUDFLARE_API_TOKEN scoped to Workers Scripts Write
# + Account Settings Read on account e6294e3ea89f8207af387d459824aaae,
# then gh secret set it on subagentceo/knowledge-engineering.
```

Smoke-test the policy body first without minting:

```bash
DRY_RUN=1 npm run setup:cf-ci-token
```

Rotate with a TTL:

```bash
CF_TOKEN_TTL_DAYS=90 npm run setup:cf-ci-token
```

Implementation: [`scripts/mint-cf-ci-token.ts`](../../scripts/mint-cf-ci-token.ts). Calls `GET /user/tokens/permission_groups` to resolve permission IDs by name, builds the `[{ effect, resources, permission_groups }]` policy body, posts to `POST /user/tokens`, and pipes the returned token value to `gh secret set` (or stdout if `SKIP_GH_SECRET_SET=1`).

## Workaround 3 — GH PAT bypass (closes #37, no PAT mint at all)

The setup scripts (`scripts/setup-github-project.ts`, `scripts/setup-branch-protection.ts`) read `GITHUB_TOKEN` from env. They don't care WHERE that token came from — a fine-grained PAT, a classic PAT, or `gh auth token` all work, provided the scopes are right.

If the operator's local `gh` is already authenticated as a user with admin on `subagentceo/knowledge-engineering`, this works:

```bash
cd /path/to/knowledge-engineering
git pull origin main

# Use the operator's existing gh auth — no separate PAT needed
GITHUB_TOKEN=$(gh auth token) npm run setup:project
GITHUB_TOKEN=$(gh auth token) npm run setup:branch-protection
```

Verify (per the runbook):

```bash
gh project list --owner subagentceo | grep "Knowledge Engineering"
gh api repos/subagentceo/knowledge-engineering/milestones --jq '.[].title'
gh api repos/subagentceo/knowledge-engineering/rulesets --jq '.[].name'
```

Closes #37 with **zero PAT minting** if the operator's existing `gh auth` already has the scopes (Repository: Contents/Issues/Pull requests/Administration: write + Organization: Projects: write).

If the operator's existing `gh auth` lacks scopes, run `gh auth refresh -h github.com -s admin:repo,project,write:org` to upgrade in-place — still no PAT mint.

## Workaround 4 — Voyage replacement (closes #35, no paid service)

The original runbook for #35 wants `VOYAGE_API_KEY` for semantic `vendor_grep`. Voyage is paid (per-token billing). The chassis can use **`@xenova/transformers@2.17.2`** instead — runs Transformers ONNX models in-process via the local CPU/GPU, no API, no key, no billing.

### Recommended swap

| Aspect | Voyage AI (original) | `@xenova/transformers` (workaround) |
| :--- | :--- | :--- |
| Cost | Paid per token | Free |
| API key | Required | None |
| Model | `voyage-3` (proprietary) | `Xenova/all-MiniLM-L6-v2` (open) |
| Latency | Network roundtrip | Local CPU (faster for small batches) |
| Quality | Higher quality on long-doc retrieval | Adequate for the `vendor_grep` use case (sub-paragraph chunks) |
| Offline | No | Yes |

### Implementation sketch

```ts
// src/lib/embeddings.ts
import { pipeline } from "@xenova/transformers";

let extractor: Awaited<ReturnType<typeof pipeline>> | null = null;

export async function embed(text: string): Promise<Float32Array> {
  extractor ??= await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
  const out = await extractor(text, { pooling: "mean", normalize: true });
  return out.data as Float32Array;
}
```

Phase 11.C (semantic vendor_grep) becomes:

1. `npm install @xenova/transformers`
2. Pre-embed each `vendor/<name>/<host>/<path>.md` body (one-time, committed as `vendor/<name>/.embeddings.bin`)
3. Query-time, embed the query and rank by cosine similarity

No `VOYAGE_API_KEY` needed; `KE_VENDOR_GREP_EMBEDDINGS=1` gates the path same as the original plan.

Closes #35 by changing the contract: the chassis no longer depends on a paid 3rd party. The runbook for `voyage-api-key.md` remains as-is in `docs/operator-runbooks/` for reference, but the playbook recommends skipping it.

## Resulting unblock map

| Issue | Original blocker | CLI-only workaround | Closes? |
| :---: | :--- | :--- | :---: |
| **#33** | Chrome extension + dashboard | Workaround 2 (one-time bootstrap) + Workaround 2b (`npm run setup:cf-ci-token` for all subsequent mints) | ✅ |
| **#34** | Chrome extension | Workaround 1 — `gh secret set` with the value above + `gh variable set` | ✅ |
| **#36** | (closed already) | OSV-Scanner is the chosen path | ✅ (PR #105) |
| **#37** | Fine-grained PAT mint via Chrome | Workaround 3 — `GITHUB_TOKEN=$(gh auth token)` | ✅ |
| **#35** | Paid Voyage signup | Workaround 4 — swap to `@xenova/transformers` (free, in-process) | ✅ via re-scope |
| **#12** | Depends on #33 + #34 | Auto-fires once Workarounds 1+2 land | ✅ (cascading) |
| **#102** | Depends on #12 | Auto-actionable post-#12 | (cascade) |

## What still requires the operator

Workarounds 1+2b+3 still need the operator to:

1. **Run two CLI commands** for #34 (`gh secret set` + `gh variable set`)
2. **One-time only:** open one regular browser tab to `dash.cloudflare.com` to mint the bootstrap token (W2b). Every subsequent CI-token mint is `npm run setup:cf-ci-token`.
3. **Run two CLI commands** for #37 (`GITHUB_TOKEN=$(gh auth token) npm run setup:project` + `setup:branch-protection`)

Total operator time: ~5 minutes the first time (bootstrap), ~30 seconds for each subsequent mint. Zero Claude-in-Chrome extension dependency.

## What the agent CAN'T do (and why)

Per the operator's hard rule ("if an api key is needed it cannot pass until that's accessible"):

- ❌ **Mint the CF bootstrap token from this session.** Cloudflare's auth model gates `User > API Tokens > Edit` behind a dashboard-only flow. This is *architecturally* unavoidable: the bootstrap is the only artifact that can mint other tokens, so it can't itself be minted by a lesser token. Wrangler's OAuth Bearer does not have this scope (empirically verified — `tokens/verify` returns code 1000 with the wrangler token).
- ✅ **Mint scoped CI tokens** after the bootstrap exists — see Workaround 2b.
- ❌ Set GitHub Actions secrets via the GitHub MCP — the MCP exposes issue/PR/file tools, NOT the `actions/secrets` API. The agent uses `gh secret set` via Bash instead.
- ❌ Pay for a Voyage subscription on the operator's behalf.

Workarounds 1, 2b, 3 transfer the residual operator-action to **CLI commands the operator runs locally**, eliminating Chrome dependency. The bootstrap step is a one-time investment that pays for itself on the second mint.

## Citations

- `vendor/cloudflare/developers.cloudflare.com/workers/wrangler/commands/general/index.md` (`wrangler login` semantics)
- `vendor/cloudflare/developers.cloudflare.com/workers/ci-cd/external-cicd/github-actions/index.md` (CF GitHub Actions auth)
- `vendor/cloudflare/developers.cloudflare.com/fundamentals/api/get-started/create-token/index.md` (token mint)
- `mcp__3e5cbdb5-...search_cloudflare_documentation` 2026-05-15: `fundamentals/api/how-to/create-via-api/` (POST /user/tokens schema, permission_groups), `ai-search/configuration/indexing/service-api-token/` ("Under Permissions, select User > API Tokens > Edit"), `fundamentals/api/how-to/account-owned-token-template/` (Workers Scripts user-token template)
- empirical: `~/Library/Preferences/.wrangler/config/default.toml` OAuth Bearer cannot call `/user/tokens` (code 1000)
- `scripts/setup-github-project.ts` (header comment — confirms `GITHUB_TOKEN` from any source works)
- `scripts/setup-branch-protection.ts` (header comment — same)
- `npm: @xenova/transformers@2.17.2` (Voyage replacement)
- `seeds/posture/session-start.xml` (OAuth-only posture preserved)

## See also

- `docs/unblock-sequence.md` — the original Chrome-based playbook
- `docs/operator-runbooks/README.md` — Chrome runbook index (kept for reference)
- `SUBPROCESSORS.md` — service dependency inventory
