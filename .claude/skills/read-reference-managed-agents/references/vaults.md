# Authenticate with vaults

Register per-user credentials when creating sessions.

---

Vaults and credentials are authentication primitives that let you register credentials for third-party services once and reference them by ID at session creation. This means you don't need to run your own secret store, transmit tokens on every call, or lose track of which end user an agent acted on behalf of.

The vault reference is a per-session parameter, so you can manage your product at the agent level and your users at the session level.

<Note>
All Managed Agents API requests require the `managed-agents-2026-04-01` beta header. The SDK sets the beta header automatically.
</Note>

## Create a vault

<Warning>
Vaults and credentials are workspace-scoped, meaning anyone with API key access can use them for authorizing an agent to complete a task. To revoke access, delete the vault or credential.
</Warning>

A vault is the collection of `credentials` associated with an end-user. Give it a `display_name` and optionally tag it with `metadata` so you can map it back to your own user records.

```python
vault = client.beta.vaults.create(
    display_name="Alice",
    metadata={"external_user_id": "usr_abc123"},
)
print(vault.id)  # "vlt_01ABC..."
```

## Add a credential

Each credential binds to a single `mcp_server_url`. When the agent connects to an MCP server at session runtime, the API matches the server URL against active credentials on the referenced vault and injects the token.

### MCP OAuth credential

Use `mcp_oauth` when the MCP server uses OAuth 2.0. If you supply a `refresh` block, Anthropic refreshes the access token on your behalf when it expires.

```python
credential = client.beta.vaults.credentials.create(
    vault_id=vault.id,
    display_name="Alice's Slack",
    auth={
        "type": "mcp_oauth",
        "mcp_server_url": "https://mcp.slack.com/mcp",
        "access_token": "xoxp-...",
        "expires_at": "2099-12-31T23:59:59Z",
        "refresh": {
            "token_endpoint": "https://slack.com/api/oauth.v2.access",
            "client_id": "1234567890.0987654321",
            "scope": "channels:read chat:write",
            "refresh_token": "xoxe-1-...",
            "token_endpoint_auth": {"type": "client_secret_post", "client_secret": "abc123..."},
        },
    },
)
```

### Static bearer credential

Use `static_bearer` when the MCP server accepts a fixed bearer token (API key, personal access token, or similar). No refresh flow is needed.

```python
bearer_credential = client.beta.vaults.credentials.create(
    vault_id=vault.id,
    display_name="Linear API key",
    auth={
        "type": "static_bearer",
        "mcp_server_url": "https://mcp.linear.app/mcp",
        "token": "lin_api_your_linear_key",
    },
)
```

<Warning>
Secret fields (`token`, `access_token`, `refresh_token`, `client_secret`) are write-only. They are never returned in API responses.
</Warning>

Credentials are stored as provided and are not validated until session runtime. A bad token surfaces as an MCP auth error during the session.

Constraints:

- **One active credential per `mcp_server_url` per vault.** Creating a second credential for the same URL returns a 409.
- **`mcp_server_url` is immutable.** To point at a different server, archive this credential and create a new one.
- **Maximum 20 credentials per vault.** This matches the maximum amount of MCP servers per agent.

## Reference the vault at session creation

Pass `vault_ids` when creating a session:

```python
session = client.beta.sessions.create(
    agent=agent.id,
    environment_id=environment.id,
    vault_ids=[vault.id],
    title="Alice's Slack digest",
)
```

Runtime behavior:
- When a vault has no credential for the MCP server, the connection is attempted unauthenticated and produces an error if the server requires authentication.
- When multiple vaults cover the MCP server, the first vault with a match wins.

## Credential refresh

Credentials are re-resolved periodically, both during a session and during the vault lifecycle.

| Event | Trigger |
| ----- | ------- |
| `vault.archived` | Vault archived. A `vault_credential.archived` event is also emitted for each underlying credential. |
| `vault.deleted` | Vault deleted. A `vault_credential.deleted` event is also emitted for each underlying credential. |
| `vault_credential.archived` | Credential archived, either directly or as a result of vault archival. |
| `vault_credential.deleted` | Credential deleted, either directly or as a result of vault deletion. |
| `vault_credential.refresh_failed` | A `mcp_oauth` credential cannot be refreshed (invalid refresh token, or irrecoverable error from the OAuth server). |

### Diagnose an OAuth refresh failure

To diagnose why a refresh failed, use the `/mcp_oauth_validate` endpoint. The top-level `status` tells you what to do next:

- `valid`: the token works; no action needed.
- `invalid`: the grant is gone or the OAuth server rejected the refresh with a 4xx. Prompt the end user to re-authorize.
- `unknown`: a transient error (5xx, 429, or network failure). Wait and retry.

## Rotate a credential

Only the secret payload and a handful of metadata fields are mutable. `mcp_server_url`, `token_endpoint`, and `client_id` are locked after creation.

```python
client.beta.vaults.credentials.update(
    credential.id,
    vault_id=vault.id,
    auth={
        "type": "mcp_oauth",
        "access_token": "xoxp-new-...",
        "expires_at": "2099-12-31T23:59:59Z",
        "refresh": {"refresh_token": "xoxe-1-new-..."},
    },
)
```

## Other operations

- **List vaults or credentials:** Paginated, newest first. Archived records are excluded by default (pass `include_archived=true` to include them).
- **Archive a vault:** `POST /v1/vaults/{id}/archive`. Cascades to all credentials. Secrets are purged; records are retained for auditing. Future sessions referencing this vault fail; running sessions continue.
- **Archive a credential:** `POST /v1/vaults/{id}/credentials/{cred_id}/archive`. Purges the secret payload; `mcp_server_url` remains visible. Frees the `mcp_server_url` for a replacement credential.
- **Delete a vault or credential:** Hard delete. The record is not retained. Use archive if you need an audit trail.
