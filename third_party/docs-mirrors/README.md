# third_party/docs-mirrors/

On-demand catalog of Cloudflare agent resources fetched into a gitignored
local cache. The catalog itself (`sources.yaml`) is tracked; the fetched
bodies under `_cache/` are not.

This complements the upstream submodules under `third_party/` per
[ADR OPR2](../../docs/decisions/2026-05-17-third-party-submodules-supersede-opr1.md).
Submodules give us source trees; docs-mirrors gives us llms.txt corpora
and Cloudflare developer-docs pages in markdown form.

## The /index.md rule

`developers.cloudflare.com` serves the markdown of any page at
`<url>/index.md`. Catalog entries with `kind: page-md` store the **bare**
URL — the fetch script appends `/index.md` before curling.

`llms.txt` and `llms-full.txt` are already plaintext/markdown; the script
fetches them verbatim (no suffix appended).

This split keeps `sources.yaml` clean. The rule lives in one place:
`scripts/fetch-cloudflare-docs.sh`.

## Catalog (8 entries)

| Name | Kind | Source |
|---|---|---|
| agent-setup | page-md | https://developers.cloudflare.com/agent-setup |
| cloudflare-skills | submodule | https://github.com/cloudflare/skills [TODO-OPERATOR: not yet added under third_party/] |
| code-mode-mcp-server | page-md | https://developers.cloudflare.com/agents/api-reference/configuration/code-mode |
| domain-specific-mcp-servers | page-md | https://developers.cloudflare.com/agents/model-context-protocol/mcp-servers-for-cloudflare-apis |
| durable-objects-llms.txt | llms-index | https://developers.cloudflare.com/durable-objects/llms.txt |
| durable-objects-llms-full.txt | llms-full | https://developers.cloudflare.com/durable-objects/llms-full.txt |
| cloudflare-docs-llms.txt | llms-index | https://developers.cloudflare.com/llms.txt |
| cloudflare-docs-llms-full.txt | llms-full | https://developers.cloudflare.com/llms-full.txt |

## Usage

```bash
# Dry-run (default posture per repo convention): prints curl commands
MSA_DRY_RUN=1 scripts/fetch-cloudflare-docs.sh

# Fetch everything into _cache/
scripts/fetch-cloudflare-docs.sh
```

The script is idempotent. It exits 0 on full success, non-zero on first
failure with the failing URL printed.

## What's NOT here yet

[TODO-OPERATOR] PR D — wire `third_party/agents`, `third_party/mcp`,
`third_party/skills`, and `third_party/docs-mirrors/_cache` into the
runtime agent loader. This PR is catalog-only; no `src/` imports yet.

[TODO-OPERATOR] `third_party/agents`, `third_party/mcp`, and
`third_party/skills` submodules are not yet present. The catalog
references `cloudflare-skills` for discoverability; the actual fetch is
a no-op for that entry until the submodule lands.
