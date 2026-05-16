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

# Environment variable contract

| Variable | Where | Purpose |
|---|---|---|
| `ALLOYDB_OMNI_PASSWORD` | Cloud-env UI | Postgres superuser password (visible to anyone with cloud-env edit access) |

# Citations

- `docs/operator-runbooks/alloydb-omni-cloud-env.md` — runbook
- `docs/operator-runbooks/cloud-env-vars-contract.md` — env var inventory
- `vendor/anthropics/code.claude.com/docs/en/claude-code-on-the-web.md` — cloud-env Setup field
- `vendor/anthropics/code.claude.com/docs/en/settings.md` — SessionStart hook spec
