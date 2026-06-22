-- durable-vault-store postgres schema
-- @cite platform.claude.com/docs/en/managed-agents/vaults.md
-- @cite cowork/coworkers/skills/durable-vault-store/SKILL.md

-- ── Vault ────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS durable_vault (
    vault_id        TEXT PRIMARY KEY,               -- "vlt_01..."
    display_name    TEXT NOT NULL,
    metadata        JSONB NOT NULL DEFAULT '{}',
    status          TEXT NOT NULL DEFAULT 'active'  -- active | archived | deleted
        CHECK (status IN ('active','archived','deleted')),
    archived_at     TIMESTAMPTZ,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS durable_vault_status_idx ON durable_vault(status);

-- ── Credential (no secret columns — ever) ────────────────────────────────────

CREATE TABLE IF NOT EXISTS durable_credential (
    credential_id   TEXT PRIMARY KEY,               -- "vcrd_01..."
    vault_id        TEXT NOT NULL REFERENCES durable_vault(vault_id),
    display_name    TEXT,
    mcp_server_url  TEXT NOT NULL,
    auth_type       TEXT NOT NULL                   -- static_bearer | mcp_oauth
        CHECK (auth_type IN ('static_bearer','mcp_oauth')),
    status          TEXT NOT NULL DEFAULT 'active'
        CHECK (status IN ('active','archived','deleted')),
    archived_at     TIMESTAMPTZ,
    metadata        JSONB NOT NULL DEFAULT '{}',
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS durable_credential_active_url_idx
    ON durable_credential(vault_id, mcp_server_url)
    WHERE status = 'active';  -- enforce one active credential per URL per vault

CREATE INDEX IF NOT EXISTS durable_credential_vault_idx ON durable_credential(vault_id);
CREATE INDEX IF NOT EXISTS durable_credential_url_idx   ON durable_credential(mcp_server_url);

-- ── Rotation history ──────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS durable_credential_rotation (
    id              BIGSERIAL PRIMARY KEY,
    credential_id   TEXT NOT NULL,
    vault_id        TEXT NOT NULL,
    rotated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    rotated_by      TEXT NOT NULL    -- skill name or user ID
);

CREATE INDEX IF NOT EXISTS dcr_credential_idx ON durable_credential_rotation(credential_id);

-- ── Event log ─────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS durable_vault_event (
    id              BIGSERIAL PRIMARY KEY,
    entity_type     TEXT NOT NULL CHECK (entity_type IN ('vault','credential')),
    entity_id       TEXT NOT NULL,
    event           TEXT NOT NULL,   -- created | rotated | archived | deleted | session_wired
    note            TEXT,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS dve_entity_idx ON durable_vault_event(entity_id);

-- ── Helper function ───────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION vault_event(
    p_entity_type TEXT,
    p_entity_id   TEXT,
    p_event       TEXT,
    p_note        TEXT DEFAULT NULL
) RETURNS void LANGUAGE sql AS $$
    INSERT INTO durable_vault_event (entity_type, entity_id, event, note)
    VALUES (p_entity_type, p_entity_id, p_event, p_note);
$$;

-- ── Useful views ──────────────────────────────────────────────────────────────

CREATE OR REPLACE VIEW active_vault_credentials AS
SELECT
    v.vault_id,
    v.display_name AS vault_name,
    c.credential_id,
    c.display_name AS credential_name,
    c.mcp_server_url,
    c.auth_type,
    c.created_at AS credential_created_at,
    (SELECT MAX(rotated_at)
       FROM durable_credential_rotation r
      WHERE r.credential_id = c.credential_id) AS last_rotated_at
FROM durable_vault v
JOIN durable_credential c USING (vault_id)
WHERE v.status = 'active'
  AND c.status = 'active';

COMMENT ON VIEW active_vault_credentials IS
  'Active vaults + their active credentials with last rotation timestamp.';
