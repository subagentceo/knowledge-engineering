#!/bin/bash
# SessionStart hook target. Wired in .claude/settings.json. Bootstraps
# AlloyDB Omni (PG18, gcr.io/alloydb-omni/alloydbomni:18) + Redis 7.0
# in the Claude Code cloud env. No-op on local sessions (CLAUDE_CODE_REMOTE guard).
#
# Source-of-truth decomposition + setup-script counterpart:
# docs/operator-runbooks/alloydb-omni-cloud-env.md (OKWP2)
#
# Image moved from Docker Hub (google/alloydbomni:17.7.0-bookworm) to
# gcr.io (gcr.io/alloydb-omni/alloydbomni:18) with the PG18 private invite.
# WHY gcr.io: Google shifted AlloyDB Omni PG18 distribution to their own registry.
set -euxo pipefail

# Only run in cloud; SessionStart hooks also run locally otherwise.
if [ "${CLAUDE_CODE_REMOTE:-false}" != "true" ]; then
  exit 0
fi

# WHY :18 not :18.x.y — Google pins the minor via digest in gcr.io; the :18
# tag tracks the latest PG18 patch without drifting to PG19.
ALLOYDB_IMAGE="gcr.io/alloydb-omni/alloydbomni:18"
ALLOYDB_NAME="alloydb-omni"
ALLOYDB_DATA="/var/lib/alloydb-omni/data"

# Degrade gracefully when ALLOYDB_OMNI_PASSWORD is absent (e.g. a bare
# "Default" cloud env with no secrets configured). Sessions that don't need
# AlloyDB still work; only AlloyDB-backed features are unavailable.
if [ -z "${ALLOYDB_OMNI_PASSWORD:-}" ]; then
  echo "start_services: ALLOYDB_OMNI_PASSWORD not set — skipping AlloyDB Omni startup" >&2
  service redis-server start || true
  exit 0
fi

# Redis 7.0 (pre-installed). Idempotent.
service redis-server start || true

# AlloyDB Omni: start existing container if present, else create.
if docker inspect "${ALLOYDB_NAME}" >/dev/null 2>&1; then
  docker start "${ALLOYDB_NAME}"
else
  docker run -d \
    --name "${ALLOYDB_NAME}" \
    -e POSTGRES_PASSWORD="${ALLOYDB_OMNI_PASSWORD}" \
    -e PGDATA=/var/lib/postgresql/data \
    -v "${ALLOYDB_DATA}:/var/lib/postgresql/data" \
    -p 5432:5432 \
    --shm-size=1g \
    "${ALLOYDB_IMAGE}"
fi

# Wait for Postgres to accept connections (max 60s).
for i in $(seq 1 60); do
  if docker exec "${ALLOYDB_NAME}" pg_isready -U postgres -q; then
    break
  fi
  sleep 1
done
docker exec "${ALLOYDB_NAME}" pg_isready -U postgres

# One-time columnar-engine bootstrap, idempotent via marker file.
MARKER="${ALLOYDB_DATA}/.columnar_engine_enabled"
if [ ! -f "${MARKER}" ]; then
  docker exec "${ALLOYDB_NAME}" psql -U postgres -c \
    "ALTER SYSTEM SET google_columnar_engine.enabled = 'on';"
  docker restart "${ALLOYDB_NAME}"
  for i in $(seq 1 60); do
    docker exec "${ALLOYDB_NAME}" pg_isready -U postgres -q && break
    sleep 1
  done
  docker exec "${ALLOYDB_NAME}" psql -U postgres -c \
    "CREATE EXTENSION IF NOT EXISTS google_columnar_engine;"
  touch "${MARKER}"
fi
