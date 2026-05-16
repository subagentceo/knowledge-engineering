---
name: docker-platform-engineering
description: >
  Wire Claude Code (and Claude Desktop) to the operator's Docker MCP
  Toolkit profile `platform_engineering` so GitHub, Atlassian, Neon,
  Redis Cloud, and Filesystem MCP servers come up with one command.
  Credentials stay in the macOS Keychain; OAuth is brokered by
  Docker Desktop.
disable-model-invocation: false
---

# When to invoke

- New machine onboarded: clone profile from
  `docker.io/subagentceo/platform_engineering:latest` and populate
  keychain secrets
- A profile secret rotates and needs reseating
- A profile gets a new MCP server added
- Operator wants Claude Desktop wired alongside Claude Code

# Connect Claude Code

```bash
docker mcp profile pull subagentceo/platform_engineering
docker mcp client connect claude-code --profile platform_engineering
```

This writes `.mcp.json` at the repo root pointing Claude Code at the
gateway. The plugin folder ships its own copy at
[`plugins/platform-engineering/.mcp.json`](../../.mcp.json) so users
who install the plugin get the wiring even without the host repo.

# Connect Claude Desktop

```bash
docker mcp client connect claude-desktop --profile platform_engineering
```

Then restart Claude Desktop.

# Populate secrets

All credentials live in macOS Keychain via `docker mcp secret set`:

```bash
docker mcp secret set github.personal_access_token=<pat>
docker mcp secret set neon.api_key=<key>
docker mcp secret set redis-cloud.api_account_key=<account-key>
docker mcp secret set redis-cloud.secret_key=<secret-key>
# Atlassian uses OAuth — Docker Desktop's MCP Toolkit UI walks the flow
```

# Verify

```bash
docker mcp profile show platform_engineering
docker mcp secret ls | grep -E "github|neon|redis|atlassian"
docker mcp tools ls
```

In a Claude Code session, `mcp__MCP_DOCKER__get_me` (GitHub) and
`mcp__MCP_DOCKER__atlassianUserInfo` should return identity info.

# Push profile updates

```bash
docker mcp profile push platform_engineering
```

Pushes image refs, tool allowlists, and secret-name → env-var
mapping. **Secret values stay local** — anyone pulling the profile
populates their own keychain.

# Citations

- [`plugins/platform-engineering/CONNECTORS.md`](../../CONNECTORS.md) — full auth model
- [`plugins/platform-engineering/.mcp.json`](../../.mcp.json) — wiring file
- [`docs/decisions/2026-05-16-platform-engineering-plugin.md`](../../../../docs/decisions/2026-05-16-platform-engineering-plugin.md) — why local Docker MCP not remote HTTP
- `docker.io/subagentceo/platform_engineering:latest` — operator's pushed profile
- Live verified this session: GitHub Official (40 tools) + Atlassian + Filesystem all returned successful identity calls
