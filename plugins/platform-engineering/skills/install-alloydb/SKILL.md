---
name: install-alloydb
description: >
  Install AlloyDB Omni 17.7 (Postgres + columnar engine) and Redis 7.0
  in the Claude Code cloud environment via a Setup script + SessionStart
  hook split. Pinned image, < 5 min setup budget, image cached after
  first build.
disable-model-invocation: false
---

# When to invoke

- Operator pastes the Setup script into a fresh Claude Code cloud env
- A new session starts in the cloud env and Postgres or Redis isn't
  responding (the SessionStart hook should have started them)
- AlloyDB Omni image needs to bump from 17.7 → 18.x once registration
  is approved

# Two-step pattern

1. **Setup script** (cloud-env field, cached): does the slow image
   pull and creates `/var/lib/alloydb-omni/data`.
2. **SessionStart hook** (`.claude/settings.json`): runs
   `scripts/start_services.sh` on every session — fast container
   start, idempotent.

Source of truth scripts:
- [`docs/operator-runbooks/alloydb-omni-cloud-env.md`](../../../../docs/operator-runbooks/alloydb-omni-cloud-env.md) §1 — Setup script
- [`.claude/settings.json`](../../../../.claude/settings.json) — SessionStart hook
- [`scripts/start_services.sh`](../../../../scripts/start_services.sh) — service-start

# AlloyDB schema for embeddings_mirror

The `turbopuffer-embeddings` skill writes to `embeddings_mirror`.
Operator runs once per fresh DB (or once per restored data dir):

```sql
CREATE TABLE IF NOT EXISTS embeddings_mirror (
  id         text PRIMARY KEY,
  namespace  text NOT NULL,
  content    text NOT NULL,
  metadata   jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT NOW(),
  updated_at timestamptz
);

CREATE INDEX IF NOT EXISTS embeddings_mirror_namespace_idx
  ON embeddings_mirror (namespace);
```

# Local-dev path (operator's Mac)

For local development against a real AlloyDB Omni instance (instead
of the bridge's injected fakes), the operator can use the locally
installed `google/alloydbomni:latest` image. Verified on the operator's
machine 2026-05-16:

```
google/alloydbomni:latest
  digest: sha256:1054a15cf308b28e8c52113fb788dc1a25dc702544dc8c89c14fd825ca63200c
  PostgreSQL 17.7
  size: 7.02 GB
```

To start a local container with the right schema:

```bash
export ALLOYDB_OMNI_PASSWORD="<strong password>"
./plugins/platform-engineering/scripts/start_alloydb_local.sh
```

The helper script:
- Uses `google/alloydbomni:latest` by default (override via `ALLOYDB_IMAGE`)
- Names the container `alloydb-omni-local` (override via `ALLOYDB_NAME`)
- Persists data to `~/.local/share/alloydb-omni/data` (override via `ALLOYDB_DATA`)
- Exposes port 5432 (override via `ALLOYDB_PORT`)
- Creates `embeddings_mirror` table + index for the
  [`turbopuffer-embeddings`](../turbopuffer-embeddings/SKILL.md) bridge
- Refuses to pull at start time — operator runs
  `docker pull google/alloydbomni:latest` explicitly when bumping

**Cloud-env vs local-dev divergence**: the cloud-env Setup script
([`docs/operator-runbooks/alloydb-omni-cloud-env.md`](../../../../docs/operator-runbooks/alloydb-omni-cloud-env.md))
pins to `:17.7.0-bookworm` to prevent drift across automated session
starts. The local-dev script accepts `:latest` because the operator
controls when to re-pull. Both paths converge on PostgreSQL 17.7.

# Environment variable contract

| Variable | Where | Purpose |
|---|---|---|
| `ALLOYDB_OMNI_PASSWORD` | Cloud-env UI | Postgres superuser password (visible to anyone with cloud-env edit access) |

# Citations

- `docs/operator-runbooks/alloydb-omni-cloud-env.md` — runbook
- `docs/operator-runbooks/cloud-env-vars-contract.md` — env var inventory
- `vendor/anthropics/code.claude.com/docs/en/claude-code-on-the-web.md` — cloud-env Setup field
- `vendor/anthropics/code.claude.com/docs/en/settings.md` — SessionStart hook spec
