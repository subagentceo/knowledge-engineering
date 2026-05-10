# infra/terraform

Cloudflare-IaC skeleton. **Off by default.** This subtree is `validate`/
`plan`-only — no resource creation, no apply.

## Inputs (all from env)

| Variable | Env var | Effect |
|---|---|---|
| `cloudflare_provider_version` | `CLOUDFLARE_TERRAFORM_PROVIDER_VERSION` | Provider pin (e.g. `~> 4.52`). |
| `cloudflare_zone` | `CLOUDFLARE_ZONE` | Zone name; resolved into a zone id at plan time. |
| `cloudflare_account_id` | `CLOUDFLARE_ACCOUNT_ID` | Optional at plan time, required at apply. |
| _(plugin cache)_ | `TF_PLUGIN_CACHE_DIR` | Where downloaded providers are cached. |

## Verify, don't apply

```bash
TF_PLUGIN_CACHE_DIR=$TF_PLUGIN_CACHE_DIR \
  terraform -chdir=infra/terraform init -backend=false -input=false
TF_PLUGIN_CACHE_DIR=$TF_PLUGIN_CACHE_DIR \
  terraform -chdir=infra/terraform validate
TF_PLUGIN_CACHE_DIR=$TF_PLUGIN_CACHE_DIR \
  terraform -chdir=infra/terraform plan -refresh=false -input=false
```

`scripts/verify.ts` runs the same three commands as `npm run verify:tf`.

## Going further

Cloudflare's [MCP server](https://developers.cloudflare.com/agents/model-context-protocol/) at
`${CLOUDFLARE_MCP_URL}` (default `https://mcp.cloudflare.com/mcp`) is the
recommended path for **runtime** control. Layer it on with
`claude mcp add cloudflare ${CLOUDFLARE_MCP_URL}` once the relevant scopes
are negotiated. This skeleton stays IaC-only.
