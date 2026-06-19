---
name: durable-vault-store
description: >
  CRUD operations on Managed Agents Vaults and Credentials, with macOS Keychain as
  the local secret source and postgres as the durable audit layer. Use whenever the
  user wants to create a vault, store a credential, rotate a token, archive or delete
  a vault/credential, wire a vault into a session, migrate a PAT from Keychain into
  a vault, or probe that an MCP credential is live. Trigger on: "vault", "vaults",
  "vault credential", "store credential", "mcp credential", "rotate token", "archive
  vault", "credential id", "vlt_", "vcrd_", "static_bearer", "mcp_oauth",
  "GITHUB_PERSONAL_ACCESS_TOKEN vault", "put token in vault", "vault store",
  "durable-vault-store". Also fire when github-pat-setup or docker-mcp-toolkit-connect
  routes a credential-storage task here, or when a session needs vault_ids populated.
  Pairs with durable-pg-memory-store and durable-lru-dreams.
---

<!--
  @cite platform.claude.com/docs/en/managed-agents/vaults.md
  @cite platform.claude.com/docs/en/api/beta/vaults/credentials/archive.md
  @cite cowork/templates/task-state-machine.ts
  @cite cowork/coworkers/skills/github-pat-setup/SKILL.md
-->

## What this skill does

Vaults are workspace-scoped collections of `credentials`. Each credential binds
a secret to a single `mcp_server_url`. At session runtime the API matches server
URLs against active credentials and injects the token automatically — no secret
transmitted on every call, no DIY secret store.

This skill covers:

1. **Vault CRUD** — create, retrieve, list, archive, delete.
2. **Credential CRUD** — create (mcp_oauth or static_bearer), retrieve, list,
   rotate (update secret only), archive, delete.
3. **Keychain → Vault migration** — read `GITHUB_PERSONAL_ACCESS_TOKEN` (or any
   secret) from macOS Keychain, write as `static_bearer` credential, log mapping.
4. **Session wiring** — pass `vault_ids` at session creation so credentials are
   injected automatically.
5. **Postgres durable layer** — `durable_vault` + `durable_credential` tables
   track API metadata and rotation history.

Beta header required: `managed-agents-2026-04-01`  
API base: `https://api.anthropic.com/v1`  
OAuth only — `ANTHROPIC_API_KEY` must NOT be set (OAuth gate at `src/oauth/token.ts`).

Limits: max **20 credentials per vault**. Credentials are **write-only** — secret
fields (`token`, `access_token`, `refresh_token`, `client_secret`) are never
returned in API responses.

---

## Resource schemas

### Vault

```json
{
  "type": "vault",
  "id": "vlt_01ABC...",
  "display_name": "alex-opensubagents",
  "metadata": {"external_user_id": "usr_abc123"},
  "created_at": "ISO-8601",
  "updated_at": "ISO-8601",
  "archived_at": null
}
```

### Credential

```json
{
  "type": "vault_credential",
  "id": "vcrd_01...",
  "vault_id": "vlt_01...",
  "display_name": "GitHub MCP PAT",
  "auth": {
    "type": "static_bearer",
    "mcp_server_url": "https://api.githubcopilot.com/mcp/"
  },
  "created_at": "ISO-8601",
  "updated_at": "ISO-8601",
  "archived_at": null,
  "metadata": {}
}
```

Note: `auth.token` is absent — secrets are write-only and never returned.

---

## Vault CRUD

### Create

```python
vault = client.beta.vaults.create(
    display_name="alex-opensubagents",
    metadata={"external_user_id": "alex@jadecli.com"},
)
# vault.id = "vlt_01ABC..."
```

CLI equivalent:
```bash
VAULT_ID=$(ant beta:vaults create \
  --display-name "alex-opensubagents" \
  --metadata '{external_user_id: alex@jadecli.com}' \
  --transform id --format yaml)
```

After creating, upsert into postgres:

```sql
INSERT INTO durable_vault (vault_id, display_name, metadata)
VALUES ($1, $2, $3)
ON CONFLICT (vault_id) DO UPDATE
  SET display_name = EXCLUDED.display_name,
      metadata = EXCLUDED.metadata,
      updated_at = now();
```

### Retrieve

```python
vault = client.beta.vaults.retrieve(vault_id)
```

### List (paginated, newest first, excludes archived by default)

```python
for vault in client.beta.vaults.list(include_archived=False):
    print(vault.id, vault.display_name)
```

### Archive (cascades to all credentials; secrets purged, records retained)

```python
client.beta.vaults.archive(vault_id)
```

```bash
curl -fsSL https://api.anthropic.com/v1/vaults/$VAULT_ID/archive \
  -X POST \
  -H "anthropic-version: 2023-06-01" \
  -H "anthropic-beta: managed-agents-2026-04-01"
```

After archive, update postgres:
```sql
UPDATE durable_vault SET archived_at = now(), status = 'archived'
 WHERE vault_id = $1;
```

### Delete (hard delete — no audit trail)

Use archive instead unless you need a clean hard delete. Running sessions are
not interrupted by a delete, but future sessions referencing this vault fail.

---

## Credential CRUD

### Two auth types

| Type | When to use |
|---|---|
| `static_bearer` | Fixed API key / PAT (e.g. GitHub PAT, Linear API key). No refresh. |
| `mcp_oauth` | OAuth 2.0 with optional auto-refresh (e.g. Slack, Atlassian). |

### Create — static_bearer (PAT / API key)

```python
credential = client.beta.vaults.credentials.create(
    vault_id=vault.id,
    display_name="GitHub MCP PAT",
    auth={
        "type": "static_bearer",
        "mcp_server_url": "https://api.githubcopilot.com/mcp/",
        "token": pat_value,          # write-only; never returned
    },
)
# credential.id = "vcrd_01..."
```

CLI:
```bash
CREDENTIAL_ID=$(ant beta:vaults:credentials create \
  --vault-id "$VAULT_ID" <<'YAML'
display_name: GitHub MCP PAT
auth:
  type: static_bearer
  mcp_server_url: https://api.githubcopilot.com/mcp/
  token: github_pat_...
YAML
)
```

### Create — mcp_oauth (with auto-refresh)

```python
credential = client.beta.vaults.credentials.create(
    vault_id=vault.id,
    display_name="Slack OAuth",
    auth={
        "type": "mcp_oauth",
        "mcp_server_url": "https://mcp.slack.com/mcp",
        "access_token": "xoxp-...",
        "expires_at": "2026-07-01T00:00:00Z",
        "refresh": {
            "token_endpoint": "https://slack.com/api/oauth.v2.access",
            "client_id": "1234567890.0987654321",
            "scope": "channels:read chat:write",
            "refresh_token": "xoxe-1-...",
            "token_endpoint_auth": {
                "type": "client_secret_post",
                "client_secret": "abc123...",
            },
        },
    },
)
```

`token_endpoint_auth.type` options:
- `none` — public client, no secret
- `client_secret_basic` — HTTP Basic auth
- `client_secret_post` — secret in POST body

### Retrieve

```python
cred = client.beta.vaults.credentials.retrieve(
    credential.id, vault_id=vault.id
)
# cred.auth.token is absent — never returned
```

### List

```python
for cred in client.beta.vaults.credentials.list(vault.id):
    print(cred.id, cred.auth.mcp_server_url)
```

### Rotate (update secret only)

`mcp_server_url`, `token_endpoint`, and `client_id` are immutable after creation.
Only secret payload + `display_name` + `metadata` can be updated.

**Static bearer rotation:**
```python
client.beta.vaults.credentials.update(
    credential.id,
    vault_id=vault.id,
    auth={
        "type": "static_bearer",
        "token": "github_pat_NEW_TOKEN...",
    },
)
```

**OAuth token refresh:**
```python
client.beta.vaults.credentials.update(
    credential.id,
    vault_id=vault.id,
    auth={
        "type": "mcp_oauth",
        "access_token": "xoxp-new-...",
        "expires_at": "2026-08-01T00:00:00Z",
        "refresh": {"refresh_token": "xoxe-1-new-..."},
    },
)
```

After rotation, log to postgres:
```sql
INSERT INTO durable_credential_rotation
  (credential_id, vault_id, rotated_at, rotated_by)
VALUES ($1, $2, now(), 'durable-vault-store');
```

### Archive (purges secret; frees mcp_server_url for replacement)

```python
client.beta.vaults.credentials.archive(credential.id, vault_id=vault.id)
```

```bash
curl -X POST \
  "https://api.anthropic.com/v1/vaults/$VAULT_ID/credentials/$CREDENTIAL_ID/archive" \
  -H "anthropic-version: 2023-06-01" \
  -H "anthropic-beta: managed-agents-2026-04-01"
```

409 on duplicate mcp_server_url. Archive the old one first, then create the new.

---

## Keychain → Vault migration

Read a secret from macOS Keychain and store it as a vault credential. The
secret value never touches a file, env var, or log — only passes through memory.

```python
import subprocess, json

# 1. Read from Keychain (runs on the user's Mac, not in sandbox)
result = subprocess.run(
    ["security", "find-generic-password",
     "-s", "GITHUB_PERSONAL_ACCESS_TOKEN",
     "-a", "claude-cowork", "-w"],
    capture_output=True, text=True
)
token = result.stdout.strip()
if not token:
    raise RuntimeError("Token not found in Keychain — run github-pat-setup first")

# 2. Create vault if not already present
vault = client.beta.vaults.create(
    display_name="alex-opensubagents",
    metadata={"source": "macOS Keychain", "migrated_by": "durable-vault-store"},
)

# 3. Store as static_bearer — value is write-only, never stored locally again
credential = client.beta.vaults.credentials.create(
    vault_id=vault.id,
    display_name="GitHub MCP PAT",
    auth={
        "type": "static_bearer",
        "mcp_server_url": "https://api.githubcopilot.com/mcp/",
        "token": token,
    },
)

# 4. Log the mapping (IDs only, no secret)
print(f"[durable-vault-store] vault={vault.id} credential={credential.id}")
print(f"[durable-vault-store] mcp_server_url=https://api.githubcopilot.com/mcp/")

# 5. Upsert into postgres (IDs only — no secret fields)
cursor.execute("""
    INSERT INTO durable_credential
      (credential_id, vault_id, display_name, mcp_server_url, auth_type)
    VALUES (%s, %s, %s, %s, 'static_bearer')
    ON CONFLICT (credential_id) DO UPDATE
      SET updated_at = now()
""", [credential.id, vault.id, "GitHub MCP PAT",
      "https://api.githubcopilot.com/mcp/"])
conn.commit()
```

**Security invariants:**
- `token` value exists only in the `subprocess` result string, passed directly to
  the API. It is garbage-collected after `client.beta.vaults.credentials.create` returns.
- Never write `token` to a file, environment variable, or log line.
- After migration, the Keychain entry can remain as a local fallback for Claude Code
  CLI sessions that don't use Managed Agents vaults.

---

## Session wiring

Pass `vault_ids` when creating a Managed Agent session. The API matches active
credentials against each MCP server URL and injects the token automatically.

```python
session = client.beta.sessions.create(
    agent=agent_id,
    environment_id=environment_id,
    vault_ids=[vault.id],             # one or more vaults
    title="GitHub workflow session",
)
```

Runtime behavior:
- Credentials are re-resolved periodically — rotation propagates to running
  sessions without restart.
- When no credential covers an MCP server, connection is attempted unauthenticated
  (produces auth error but does not kill the session).
- When multiple vaults cover the same MCP server, the **first vault with a match wins**.

---

## Postgres durable layer

Tables track vault/credential lifecycle + rotation history (secrets never stored):

```sql
-- durable_vault
CREATE TABLE durable_vault (
    vault_id        TEXT PRIMARY KEY,
    display_name    TEXT NOT NULL,
    metadata        JSONB NOT NULL DEFAULT '{}',
    status          TEXT NOT NULL DEFAULT 'active',   -- active | archived | deleted
    archived_at     TIMESTAMPTZ,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- durable_credential (no secret columns — ever)
CREATE TABLE durable_credential (
    credential_id   TEXT PRIMARY KEY,
    vault_id        TEXT NOT NULL REFERENCES durable_vault(vault_id),
    display_name    TEXT,
    mcp_server_url  TEXT NOT NULL,
    auth_type       TEXT NOT NULL,   -- static_bearer | mcp_oauth
    status          TEXT NOT NULL DEFAULT 'active',
    archived_at     TIMESTAMPTZ,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- durable_credential_rotation
CREATE TABLE durable_credential_rotation (
    id              SERIAL PRIMARY KEY,
    credential_id   TEXT NOT NULL,
    vault_id        TEXT NOT NULL,
    rotated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    rotated_by      TEXT NOT NULL   -- skill name or user ID
);
```

Useful queries:

```sql
-- Active credentials per vault
SELECT c.credential_id, c.display_name, c.mcp_server_url, c.auth_type
  FROM durable_credential c
 WHERE c.vault_id = $1 AND c.status = 'active';

-- Rotation history for a credential
SELECT rotated_at, rotated_by
  FROM durable_credential_rotation
 WHERE credential_id = $1
 ORDER BY rotated_at DESC;

-- Vaults with credentials covering GitHub MCP
SELECT v.vault_id, v.display_name, c.credential_id
  FROM durable_vault v
  JOIN durable_credential c USING (vault_id)
 WHERE c.mcp_server_url = 'https://api.githubcopilot.com/mcp/'
   AND c.status = 'active'
   AND v.status = 'active';
```

---

## Emit a DurableTask for vault operations

When a vault/credential operation needs async follow-up (e.g. bulk credential
migration, scheduled rotation), write to the operator queue:

```python
import json, uuid, datetime

task = {
    "_type": "task",
    "id": str(uuid.uuid4()),
    "queue": "operator",
    "subject": f"Vault credential rotation needed: {credential_id}",
    "state": "pending",
    "created_at": datetime.datetime.utcnow().isoformat() + "Z",
    "updated_at": datetime.datetime.utcnow().isoformat() + "Z",
    "from": "durable-vault-store",
    "ke_fit_score": 4,
    "payload": {
        "vault_id": vault_id,
        "credential_id": credential_id,
        "mcp_server_url": mcp_server_url,
        "auth_type": "static_bearer",
        "operation": "rotate",
        "resolvable": True,
        "suggested_skill": "durable-vault-store",
        "note": "PAT expires soon — rotate before session auth fails",
    }
}

with open("cowork/data/queues/operator.jsonl", "a") as f:
    f.write(json.dumps(task) + "\n")

print(f"[durable-vault-store] DurableTask queued: {task['id']}")
```

---

## Idempotency table

| Operation | Idempotent? | Behaviour on repeat |
|---|---|---|
| Create vault | ✗ | Creates a second vault — check list first |
| Create credential | ✗ if same URL | 409 if active credential for URL exists — archive old one first |
| Rotate credential | ✓ | Updates in place; old secret purged |
| Archive vault | ✓ | Already-archived vault returns current state |
| Archive credential | ✓ | Already-archived credential returns current state |
| Keychain → vault migration | Semi | Check for existing active credential before creating |

Pre-flight check before migration:

```python
existing = [
    c for c in client.beta.vaults.credentials.list(vault.id)
    if c.auth.mcp_server_url == "https://api.githubcopilot.com/mcp/"
    and not c.archived_at
]
if existing:
    print(f"[durable-vault-store] Credential already exists: {existing[0].id} — skipping create")
else:
    # proceed with create
```

---

## Bundled references

Read when you need full type definitions:

- `references/vault_models.schema.ts` — Zod v4 DurableVault, DurableCredential, CredentialRotation
- `references/vault_models.py` — Pydantic v2 equivalents
- `references/durable-vault-store.sql` — postgres schema (durable_vault, durable_credential, durable_credential_rotation)
