#!/bin/bash
# Local-dev companion to the cloud-env scripts/start_services.sh.
# Use this on the operator's Mac when running tests against a real
# AlloyDB Omni instead of the injected fakes.
#
# Honors the locally-installed `google/alloydbomni:latest` image
# (operator pulled this from Docker Hub 2026-05-16; on this machine
# it resolves to PostgreSQL 17.7,
# digest sha256:1054a15cf308b28e8c52113fb788dc1a25dc702544dc8c89c14fd825ca63200c).
#
# The cloud env script pins to `17.7.0-bookworm` to prevent drift.
# This local script accepts :latest because the operator controls
# when to `docker pull` and re-cache.
#
# @cite plugins/platform-engineering/skills/install-alloydb/SKILL.md
# @cite docs/operator-runbooks/alloydb-omni-cloud-env.md
set -euo pipefail

ALLOYDB_IMAGE="${ALLOYDB_IMAGE:-google/alloydbomni:latest}"
ALLOYDB_NAME="${ALLOYDB_NAME:-alloydb-omni-local}"
ALLOYDB_DATA="${ALLOYDB_DATA:-${HOME}/.local/share/alloydb-omni/data}"
ALLOYDB_PORT="${ALLOYDB_PORT:-5432}"

: "${ALLOYDB_OMNI_PASSWORD:?ALLOYDB_OMNI_PASSWORD must be set in the local env (echo \"export ALLOYDB_OMNI_PASSWORD=...\" into ~/.zshenv)}"

# Confirm the image is locally installed; refuse to pull at start
# time to keep this script fast. Operator pulls explicitly.
if ! docker image inspect "${ALLOYDB_IMAGE}" >/dev/null 2>&1; then
  echo "error: ${ALLOYDB_IMAGE} not installed locally."
  echo "       run: docker pull ${ALLOYDB_IMAGE}"
  exit 1
fi

mkdir -p "${ALLOYDB_DATA}"
chmod 700 "${ALLOYDB_DATA}"

if docker inspect "${ALLOYDB_NAME}" >/dev/null 2>&1; then
  docker start "${ALLOYDB_NAME}" >/dev/null
else
  docker run -d \
    --name "${ALLOYDB_NAME}" \
    -e POSTGRES_PASSWORD="${ALLOYDB_OMNI_PASSWORD}" \
    -e PGDATA=/var/lib/postgresql/data \
    -v "${ALLOYDB_DATA}:/var/lib/postgresql/data" \
    -p "${ALLOYDB_PORT}:5432" \
    --shm-size=1g \
    "${ALLOYDB_IMAGE}" >/dev/null
fi

# Wait up to 60s for the server to accept connections.
for _ in $(seq 1 60); do
  if docker exec "${ALLOYDB_NAME}" pg_isready -U postgres -q; then
    break
  fi
  sleep 1
done
docker exec "${ALLOYDB_NAME}" pg_isready -U postgres

# Ensure the embeddings_mirror table exists for the
# turbopuffer-alloydb-bridge module.
docker exec -i "${ALLOYDB_NAME}" psql -U postgres -v ON_ERROR_STOP=1 <<'SQL'
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
SQL

echo "alloydb-omni-local up on port ${ALLOYDB_PORT}"
echo "psql -h 127.0.0.1 -p ${ALLOYDB_PORT} -U postgres"
