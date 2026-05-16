---
name: manage-local-container
description: >
  Manage the alloydb-omni-local Docker container on the operator's Mac.
  Start, stop, inspect, snapshot, destroy. Use when the local AlloyDB
  Omni 17.7 container needs to come up for tests, when port 5432 is
  taken and a different port is needed, when the data directory needs
  to be wiped and re-bootstrapped, or when secrets need rotation.
license: Apache-2.0
compatibility: Requires docker, the operator's Mac with google/alloydbomni installed locally, and bash. Companion to the install-alloydb cloud-env skill.
metadata:
  author: alex-jadecli
  version: "0.1.0"
---

# When to invoke

- Operator wants to start the local AlloyDB Omni for bridge tests
- A previous container is wedged and needs replacement
- Port 5432 collides with another Postgres and a non-default port is needed
- `embeddings_mirror` table missing or needs wipe
- `ALLOYDB_OMNI_PASSWORD` rotation
- Operator wants a snapshot of the data dir before a risky migration

# Primitives

This skill composes three other primitives:

1. [`gen_secret.sh`](../../scripts/gen_secret.sh) — generates the
   password without ever showing it
2. [`start_alloydb_local.sh`](../../scripts/start_alloydb_local.sh) —
   pulls + starts the container, creates `embeddings_mirror`
3. Plain `docker` for inspection, stop, destroy, snapshot

# Recipes

## Start (cold)

```bash
export ALLOYDB_OMNI_PASSWORD="$(./plugins/platform-engineering/scripts/gen_secret.sh --length 48 --alphanumeric)"
export ALLOYDB_PORT=5435   # 5432 commonly taken on Mac dev machines
./plugins/platform-engineering/scripts/start_alloydb_local.sh
```

Output: `alloydb-omni-local up on port 5435`.

## Verify

```bash
docker exec alloydb-omni-local pg_isready -U postgres
docker exec alloydb-omni-local psql -U postgres -tAc "SELECT version();"
docker exec alloydb-omni-local psql -U postgres -tAc \
  "SELECT count(*) FROM information_schema.tables WHERE table_name='embeddings_mirror';"
```

Expected: `accepting connections`, `PostgreSQL 17.7`, `1`.

## Stop (preserve data)

```bash
docker stop alloydb-omni-local
```

Restart with `docker start alloydb-omni-local`; password and data
persist via the bind mount at `~/.local/share/alloydb-omni/data`.

## Destroy (preserve data)

```bash
docker rm -f alloydb-omni-local
```

Container gone, data dir intact. Re-run
`start_alloydb_local.sh` to bring a new container up against the
same data.

## Destroy (wipe data)

```bash
docker rm -f alloydb-omni-local
rm -rf "${HOME}/.local/share/alloydb-omni/data"
```

`embeddings_mirror` will be recreated on next
`start_alloydb_local.sh` run.

## Snapshot before risky migration

```bash
SNAP_DIR="${HOME}/.local/share/alloydb-omni/snapshots/$(date -u +%Y%m%dT%H%M%SZ)"
mkdir -p "$SNAP_DIR"
docker exec alloydb-omni-local pg_dumpall -U postgres > "$SNAP_DIR/dumpall.sql"
echo "snapshot: $SNAP_DIR"
```

## Rotate password

```bash
# Generate new password without echoing it:
NEW_PW="$(./plugins/platform-engineering/scripts/gen_secret.sh --length 48 --alphanumeric)"

# Apply to running container:
docker exec alloydb-omni-local psql -U postgres -c "ALTER USER postgres WITH PASSWORD '$NEW_PW';"

# Export for this shell so subsequent restarts use it:
export ALLOYDB_OMNI_PASSWORD="$NEW_PW"
unset NEW_PW
```

For persistent rotation, also update the operator's `~/.zshenv` or
keychain entry — those are not edited by this skill to keep the agent
hands-off on secret-bearing files.

## Reseed embeddings_mirror

```bash
docker exec alloydb-omni-local psql -U postgres -c "TRUNCATE embeddings_mirror;"
```

Useful between test runs.

# Cloud-vs-local divergence

| Aspect | Local (this skill) | Cloud env (install-alloydb skill) |
|---|---|---|
| Image | `:latest` (operator pulls explicitly) | `:17.7.0-bookworm` (pinned in setup script) |
| Container name | `alloydb-omni-local` | `alloydb-omni` |
| Data dir | `~/.local/share/alloydb-omni/data` | `/var/lib/alloydb-omni/data` |
| Default port | 5432 (overridable) | 5432 |
| Password source | `gen_secret.sh` → shell env | Cloud-env UI variable |
| SessionStart hook | none — operator runs explicitly | `.claude/settings.json` runs `start_services.sh` |

# Citations

- [`vendor/agentskills/agentskills.io/specification.md`](../../../../vendor/agentskills/agentskills.io/specification.md) — Agent Skills format this SKILL.md conforms to
- [`vendor/agentskills/agentskills.io/skill-creation/best-practices.md`](../../../../vendor/agentskills/agentskills.io/skill-creation/best-practices.md) — skill-authoring guidance
- [`plugins/platform-engineering/scripts/start_alloydb_local.sh`](../../scripts/start_alloydb_local.sh) — local start helper
- [`plugins/platform-engineering/scripts/gen_secret.sh`](../../scripts/gen_secret.sh) — safe password generator
- [`plugins/platform-engineering/skills/install-alloydb/SKILL.md`](../install-alloydb/SKILL.md) — cloud-env counterpart
