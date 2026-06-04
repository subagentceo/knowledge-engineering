# open-managed-agents — Governance Schema

> @cite vendor/open-managed-agents/README.md
> @cite vendor/open-managed-agents/architecture.md
> @cite vendor/open-managed-agents/api-reference.md

## Overview

`governance.json` is the IaC file that defines the entire access model for an
`open-managed-agents` deployment. Operators version-control it alongside the
service and apply changes live via `PUT /v1/governance`.

## Full schema

```json
{
  "org": "string",
  "teams": ["string"],
  "providers": [
    {
      "name": "string",
      "type": "anthropic | ollama",
      "auth": "oauth | none",
      "base_url": "string (ollama only)",
      "default_model": "string"
    }
  ],
  "mcp_servers": [
    {
      "name": "string",
      "connector": "slack | notion | github | linear | sentry | asana | amplitude | intercom | atlassian | gdrive | postgres | stripe",
      "allowed_teams": ["string"],
      "allowed_tools": ["string | *"]
    }
  ],
  "rbac": [
    {
      "team": "string",
      "role": "admin | member | viewer",
      "members": ["string (email)"]
    }
  ],
  "team_policies": [
    {
      "team": "string",
      "providers": ["string (name ref)"],
      "mcp_servers": ["string (name ref)"]
    }
  ]
}
```

## Field reference

### `org`

Top-level tenant identifier. Shown in the UI and used in audit logs.

### `teams`

Ordered list of team slugs. Must match slugs used in `rbac` and `team_policies`.

### `providers[]`

| Field | Type | Description |
|---|---|---|
| `name` | string | Unique reference name (used in `team_policies`) |
| `type` | `anthropic` \| `ollama` | Provider driver |
| `auth` | `oauth` \| `none` | `oauth` reads `CLAUDE_CODE_OAUTH_TOKEN`; `none` for local models |
| `base_url` | string | Ollama only — OpenAI-compat endpoint (`http://localhost:11434/v1`) |
| `default_model` | string | Model ID passed to the provider API (e.g. `claude-opus-4-5`, `qwen3:8b`) |

`ANTHROPIC_API_KEY` is never read. The `anthropic` provider type uses
`CLAUDE_CODE_OAUTH_TOKEN` exclusively. See `oauth-patch.md`.

### `mcp_servers[]`

| Field | Type | Description |
|---|---|---|
| `name` | string | Unique reference name (used in `team_policies`) |
| `connector` | string | One of the 12 built-in connector types |
| `allowed_teams` | string[] | Teams that may invoke this MCP server (subset of `teams`) |
| `allowed_tools` | string[] \| `["*"]` | Tool name allowlist; `["*"]` permits all tools |

### `rbac[]`

| Field | Type | Description |
|---|---|---|
| `team` | string | Team slug |
| `role` | `admin` \| `member` \| `viewer` | Role within the team |
| `members` | string[] | Email addresses of users with this role |

Role permissions:

| Action | admin | member | viewer |
|---|---|---|---|
| Read sessions/threads | yes | yes | yes |
| Create sessions/threads | yes | yes | no |
| Configure connectors | yes | no | no |
| Update governance | yes | no | no |

### `team_policies[]`

| Field | Type | Description |
|---|---|---|
| `team` | string | Team slug |
| `providers` | string[] | Provider `name` refs allowed for this team |
| `mcp_servers` | string[] | MCP server `name` refs allowed for this team |

Members of a team may only use providers and MCP servers listed in their
team's policy. The agent loop enforces this at runtime.

## managedsubagents.com example

This is the reference `governance.json` for the `managedsubagents.com` fork
of the knowledge-engineering project. Teams: engineering, knowledge-work, legal, finance.

```json
{
  "org": "managedsubagents",
  "teams": ["engineering", "knowledge-work", "legal", "finance"],
  "providers": [
    {
      "name": "claude-oauth",
      "type": "anthropic",
      "auth": "oauth",
      "default_model": "claude-opus-4-5"
    },
    {
      "name": "local-qwen3",
      "type": "ollama",
      "auth": "none",
      "base_url": "http://localhost:11434/v1",
      "default_model": "qwen3:8b"
    }
  ],
  "mcp_servers": [
    {
      "name": "github-eng",
      "connector": "github",
      "allowed_teams": ["engineering"],
      "allowed_tools": ["*"]
    },
    {
      "name": "linear-eng",
      "connector": "linear",
      "allowed_teams": ["engineering", "knowledge-work"],
      "allowed_tools": ["*"]
    },
    {
      "name": "sentry-eng",
      "connector": "sentry",
      "allowed_teams": ["engineering"],
      "allowed_tools": ["*"]
    },
    {
      "name": "notion-shared",
      "connector": "notion",
      "allowed_teams": ["engineering", "knowledge-work", "legal", "finance"],
      "allowed_tools": ["*"]
    },
    {
      "name": "slack-shared",
      "connector": "slack",
      "allowed_teams": ["engineering", "knowledge-work", "legal", "finance"],
      "allowed_tools": ["slack_post_message", "slack_list_channels", "slack_get_messages"]
    },
    {
      "name": "gdrive-legal",
      "connector": "gdrive",
      "allowed_teams": ["legal"],
      "allowed_tools": ["*"]
    },
    {
      "name": "stripe-finance",
      "connector": "stripe",
      "allowed_teams": ["finance"],
      "allowed_tools": ["*"]
    },
    {
      "name": "intercom-support",
      "connector": "intercom",
      "allowed_teams": ["knowledge-work"],
      "allowed_tools": ["*"]
    },
    {
      "name": "amplitude-analytics",
      "connector": "amplitude",
      "allowed_teams": ["knowledge-work", "engineering"],
      "allowed_tools": ["*"]
    }
  ],
  "rbac": [
    {
      "team": "engineering",
      "role": "admin",
      "members": ["admin@jadecli.com"]
    },
    {
      "team": "engineering",
      "role": "member",
      "members": []
    },
    {
      "team": "knowledge-work",
      "role": "admin",
      "members": ["admin@jadecli.com"]
    },
    {
      "team": "knowledge-work",
      "role": "member",
      "members": []
    },
    {
      "team": "legal",
      "role": "admin",
      "members": ["admin@jadecli.com"]
    },
    {
      "team": "legal",
      "role": "member",
      "members": []
    },
    {
      "team": "finance",
      "role": "admin",
      "members": ["admin@jadecli.com"]
    },
    {
      "team": "finance",
      "role": "member",
      "members": []
    }
  ],
  "team_policies": [
    {
      "team": "engineering",
      "providers": ["claude-oauth", "local-qwen3"],
      "mcp_servers": ["github-eng", "linear-eng", "sentry-eng", "notion-shared", "slack-shared", "amplitude-analytics"]
    },
    {
      "team": "knowledge-work",
      "providers": ["claude-oauth"],
      "mcp_servers": ["notion-shared", "slack-shared", "linear-eng", "intercom-support", "amplitude-analytics"]
    },
    {
      "team": "legal",
      "providers": ["claude-oauth"],
      "mcp_servers": ["gdrive-legal", "notion-shared", "slack-shared"]
    },
    {
      "team": "finance",
      "providers": ["claude-oauth"],
      "mcp_servers": ["stripe-finance", "notion-shared", "slack-shared"]
    }
  ]
}
```

## Live reload

`PUT /v1/governance` replaces the in-memory config atomically. The server
validates the new document against the schema before writing; invalid updates
return `400 VALIDATION_ERROR` and the existing config remains active.

No restart required. Connector and RBAC changes take effect on the next
request after a successful PUT.
