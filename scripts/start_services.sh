#!/bin/bash
# SessionStart hook target. Wired in .claude/settings.json. Bootstraps
# AlloyDB Omni (PG17.7) + Redis 7.0 in the Claude Code cloud env. No-op
# on local sessions (the CLAUDE_CODE_REMOTE guard below).
#
# Source-of-truth decomposition + setup-script counterpart:
# docs/operator-runbooks/alloydb-omni-cloud-env.md (OKWP2)
set -euxo pipefail

# Only run in cloud; SessionStart hooks also run locally otherwise.
if [ "${CLAUDE_CODE_REMOTE:-false}" != "true" ]; then
  exit 0
fi

ALLOYDB_IMAGE="google/alloydbomni:17.7.0-bookworm"
ALLOYDB_NAME="alloydb-omni"
ALLOYDB_DATA="/var/lib/alloydb-omni/data"

# Required env var, set in the cloud environment config.
: "${ALLOYDB_OMNI_PASSWORD:?ALLOYDB_OMNI_PASSWORD must be set in environment vars}"

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
