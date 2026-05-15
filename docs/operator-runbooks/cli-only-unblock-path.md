# CLI-only unblock path — bypass Claude-in-Chrome runbooks

> Workarounds discovered 2026-05-15 by reading `vendor/cloudflare/`, `vendor/anthropics/`, and the GitHub MCP tool surface. Each workaround uses tools the operator already has on their local shell instead of running the Chrome runbooks.
>
> **Why this exists:** the original runbooks (`docs/operator-runbooks/cf-api-token.md`, `cf-account-id.md`, `github-pat.md`, `voyage-api-key.md`) all assume `claude --chrome`. That works but adds an extension dependency. The operator may not always want Chrome; CLI-only is faster when the operator already has `wrangler`, `gh`, and `npm` locally.

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
| **#33** | Chrome extension + dashboard | Workaround 2 — `wrangler login` + 1 regular browser tab + `gh secret set` | ✅ |
| **#34** | Chrome extension | Workaround 1 — `gh secret set` with the value above + `gh variable set` | ✅ |
| **#36** | (closed already) | OSV-Scanner is the chosen path | ✅ (PR #105) |
| **#37** | Fine-grained PAT mint via Chrome | Workaround 3 — `GITHUB_TOKEN=$(gh auth token)` | ✅ |
| **#35** | Paid Voyage signup | Workaround 4 — swap to `@xenova/transformers` (free, in-process) | ✅ via re-scope |
| **#12** | Depends on #33 + #34 | Auto-fires once Workarounds 1+2 land | ✅ (cascading) |
| **#102** | Depends on #12 | Auto-actionable post-#12 | (cascade) |

## What still requires the operator

Workarounds 1+2+3 still need the operator to:

1. **Run two CLI commands** for #34 (`gh secret set` + `gh variable set`)
2. **Open one regular browser tab to `dash.cloudflare.com`** for #33 to mint the token, then run `gh secret set`
3. **Run two CLI commands** for #37 (`GITHUB_TOKEN=$(gh auth token) npm run setup:project` + `setup:branch-protection`)

Total operator time: ~5 minutes (vs ~30 minutes via Chrome runbooks). Zero Claude-in-Chrome extension dependency.

## What the agent CAN'T do

Per the operator's hard rule ("if an api key is needed it cannot pass until that's accessible"):

- ❌ Mint a CF API token from this session — Cloudflare's auth model requires a real human at `dash.cloudflare.com` for token creation. Wrangler's MCP doesn't expose token-mint.
- ❌ Set GitHub Actions secrets via the GitHub MCP — the MCP exposes issue/PR/file tools, NOT the `actions/secrets` API.
- ❌ Pay for a Voyage subscription on the operator's behalf.

Workarounds 1, 2, 3 transfer the residual operator-action to **CLI commands the operator runs locally**, eliminating Chrome dependency and cutting time ~6×.

## Citations

- `vendor/cloudflare/developers.cloudflare.com/workers/wrangler/commands/general/index.md` (`wrangler login` semantics)
- `vendor/cloudflare/developers.cloudflare.com/workers/ci-cd/external-cicd/github-actions/index.md` (CF GitHub Actions auth)
- `vendor/cloudflare/developers.cloudflare.com/fundamentals/api/get-started/create-token/index.md` (token mint)
- `scripts/setup-github-project.ts` (header comment — confirms `GITHUB_TOKEN` from any source works)
- `scripts/setup-branch-protection.ts` (header comment — same)
- `npm: @xenova/transformers@2.17.2` (Voyage replacement)
- `seeds/posture/session-start.xml` (OAuth-only posture preserved)

## See also

- `docs/unblock-sequence.md` — the original Chrome-based playbook
- `docs/operator-runbooks/README.md` — Chrome runbook index (kept for reference)
- `SUBPROCESSORS.md` — service dependency inventory
