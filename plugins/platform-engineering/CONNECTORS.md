# Connectors

Unlike the public
[`engineering` plugin's CONNECTORS](https://github.com/subagentceo/knowledge-work-plugins/blob/main/engineering/CONNECTORS.md)
which lists category placeholders (`~~source control`, `~~chat`,
etc.) so any vendor in that category works, this plugin pins to the
operator's specific stack via the Docker MCP `platform_engineering`
profile.

## How auth works

All credentials live in the **macOS Keychain** via
`docker mcp secret`. The Docker MCP gateway resolves them at runtime
and passes them as environment variables into each containerized MCP
server. No credentials live in this repo or the plugin folder.

| Server | Secret key(s) in keychain | Auth type |
|---|---|---|
| GitHub Official | `github.personal_access_token` | PAT (alex-jadecli) |
| Atlassian | `oauth/atlassian-remote` | OAuth 2.1 (Alex Zhouk, alex@jadecli.com) |
| Neon | `neon.api_key` | API key |
| Redis Cloud | `redis-cloud.api_account_key` + `redis-cloud.secret_key` | API key pair |
| Filesystem | none | Path-scoped (only this repo) |

## How to rotate

```bash
# Set or rotate a single secret
docker mcp secret set github.personal_access_token=<new-pat>

# List current secrets (values are masked)
docker mcp secret ls

# Push profile + tools allowlist (NOT secrets) to docker.io
docker mcp profile push platform_engineering
```

The push command publishes the profile's image refs, tool allowlists,
and the `secret name → env var name` mapping. **Secret values stay
local.** Anyone pulling the profile must populate their own keychain.

## How to swap a vendor

This plugin pins to specific vendors (GitHub, Atlassian, Neon,
Redis Cloud) because the operator uses them. To swap, edit the
profile in Docker Desktop or via `docker mcp profile config`:

```bash
docker mcp profile config platform_engineering
```

Then push the updated profile.

## Citations

- [`docker.io/subagentceo/platform_engineering:latest`](https://hub.docker.com/r/subagentceo/platform_engineering) — operator's pushed profile
- [`docs/decisions/2026-05-16-platform-engineering-plugin.md`](../../docs/decisions/2026-05-16-platform-engineering-plugin.md) — why local Docker MCP not remote HTTP
- Live `docker mcp profile show platform_engineering` output validates the secret keys above
