# data/models/fivetran — Claude data model, one file per table

Two Fivetran connectors, each table = one self-contained `.yaml` holding **typed
semantics + PostgreSQL 16 DDL together**. Generated from the two ERD PDFs.

```
compliance/   claude.ai data — YOUR data        schema: claude_ai        (23 tables)
platform/     org / billing (Console Admin API)  schema: anthropic_claude (18 tables)
```

**You use claude.ai → `compliance/` is your data.** It models chats, messages,
message content/files/artifacts, projects, project documents, organization users,
groups/roles, and the compliance `activity` event stream. The Fivetran Claude
**Platform** connector explicitly *excludes* claude.ai data — it's the
Console/Admin side (usage/cost/claude_code reports, workspaces, API keys), kept in
`platform/` for when you wire an Admin API key.

## File shape

```yaml
# yaml-language-server: $schema=../../../../schemas/fivetran-table-semantics.schema.json
apiVersion: anthropic.com/v1
kind: FivetranTableSemantics
table_kind: entity            # entity | usage | compliance
metadata: { name: chat, labels: { connector: compliance } }
spec:
  schema: claude_ai
  grain: "one row per claude.ai chat"
  primary_key: [id]
  columns: [ { name: id, kind: dimension, sql_type: text }, ... ]
  ddl: |
    CREATE TABLE IF NOT EXISTS claude_ai.chat ( ... );
```

The `ddl:` block is the physical source of truth; `columns:` carries semantics.
Validator enforces they match 1:1.

## Determinism / incremental load

- Every table is keyed exactly as the Fivetran ERD shows — single PKs and
  composite PKs (e.g. `chat_message` = `(id, chat_id)`, `chat_message_content` =
  `(index, chat_id, chat_message_id)`). Child tables carry the parent's
  `*_fivetran_id`. This is what makes upserts deterministic and idempotent.
- `load_type: incremental` on every table. Re-running a sync upserts on the PK;
  no duplicates.
- `_all.sql` in each connector dir is a generated schema + all `CREATE TABLE`s
  for a one-shot `psql -f`.

## Regenerate / validate

`generate.py` is the single source (edit the `COMPLIANCE` / `PLATFORM` lists):

```bash
python3 data/models/fivetran/generate.py data/models/fivetran
python3 data/models/fivetran/validate.py      # 41 files, 0 issues (verified)
```

Validation = YAML parses + DDL parses as PostgreSQL (sqlglot) + DDL columns equal
YAML columns + composite PKs present.

## Fivetran connection (Platform connector, private preview)

```
POST https://api.fivetran.com/v1/connections
{ "service": "anthropic_claude", "group_id": "...",
  "config": { "api_admin_key": "...", "api_key": "...", "schema": "anthropic_claude" } }
```

The Platform connector needs a Console **Admin API key** (org data) + standard API
key (workspace data) and is workspace-specific. The compliance/claude.ai export is
a separate Fivetran connector.

## Note: old flat files

The 20 first-pass flat files in this dir are emptied tombstones (the sandbox can't
delete them). Remove on your Mac: `git clean -fd data/models/fivetran` or
`rm data/models/fivetran/*.yaml data/models/fivetran/_all.sql`.
