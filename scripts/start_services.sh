#!/bin/bash
# SessionStart hook target. Wired in .claude/settings.json. Brings up the
# per-session data plane for Claude Code cloud sessions: Redis 7 + the
# pre-installed system PostgreSQL 16, with the Kimball `dw` schema loaded.
# No-op on local sessions (CLAUDE_CODE_REMOTE guard).
#
# Runtime-context model (corrected 2026-06-14, OKWP2):
#   * Cloud session (here): PostgreSQL 16 + Redis 7 ship pre-installed as system
#     services (per the cloud-on-web docs) but are NOT auto-started. We start
#     them and load the dw schema. AlloyDB Omni cannot run in the cloud session —
#     there is no persistent docker daemon, gcr.io/alloydb-omni is a private
#     image, and Docker Hub rate-limits per-session pulls. The dw DDL is plain
#     PG and runs on PG16 unchanged (the columnar engine is the only thing lost).
#   * AlloyDB Omni 18 runs on the operator's Docker Desktop host (container
#     e2m-alloydb, alloydb-omni/alloydbomni:18, :5432) and is reached via the
#     MCP_DOCKER gateway in sessions where that connector is loaded — never from
#     this hook. See the runbook for the host-side wiring.
#
# Source-of-truth runbook: docs/operator-runbooks/alloydb-omni-cloud-env.md
# @cite vendor/anthropics/code.claude.com/docs/en/claude-code-on-the-web.md
set -euo pipefail

# Only run in cloud; SessionStart hooks also fire locally otherwise.
if [ "${CLAUDE_CODE_REMOTE:-false}" != "true" ]; then
  exit 0
fi

PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)}"
REDIS_CONF="${PROJECT_DIR}/infra/redis/redis.conf"
PGDB="ke"
DATABASE_URL_LOCAL="postgres://postgres:postgres@localhost:5432/${PGDB}"
REDIS_URL_LOCAL="redis://localhost:6379"

log() { echo "start_services: $*" >&2; }

# ── Redis 7 (allkeys-lru + 7-day TTL from infra/redis/redis.conf) ─────────────
if ! redis-cli ping >/dev/null 2>&1; then
  if [ -f "${REDIS_CONF}" ]; then
    mkdir -p /var/log/redis
    redis-server "${REDIS_CONF}" --daemonize yes --logfile /var/log/redis/redis-server.log \
      || service redis-server start || true
  else
    service redis-server start || true
  fi
fi
redis-cli ping >/dev/null 2>&1 && log "redis up" || log "redis NOT up"

# ── PostgreSQL 16 (pre-installed system cluster) ─────────────────────────────
if ! pg_isready -q 2>/dev/null; then
  service postgresql start || pg_ctlcluster 16 main start || true
  for _ in $(seq 1 30); do pg_isready -q 2>/dev/null && break; sleep 1; done
fi

if pg_isready -q 2>/dev/null; then
  log "postgres up"
  # Create the ke database if absent (peer auth via the postgres OS user).
  if ! sudo -u postgres psql -tAc "SELECT 1 FROM pg_database WHERE datname='${PGDB}'" | grep -q 1; then
    sudo -u postgres createdb "${PGDB}"
  fi
  # Load the Kimball dw schema once. DDL is all IF NOT EXISTS; the sentinel skips
  # the reload on resume. infra/postgres/init holds the model-registry lane; the
  # data/models/alloydb_*_ddl.sql files hold the cache/citations/memory/vendor/
  # events/ecosystem lanes.
  if [ "$(sudo -u postgres psql -d "${PGDB}" -tAc "SELECT to_regclass('dw.dim_ecosystem_artifact')")" != "dw.dim_ecosystem_artifact" ]; then
    for sql in "${PROJECT_DIR}/infra/postgres/init/"*.sql \
               "${PROJECT_DIR}/data/models/alloydb_cache_ddl.sql" \
               "${PROJECT_DIR}/data/models/alloydb_citations_ddl.sql" \
               "${PROJECT_DIR}/data/models/alloydb_memory_ddl.sql" \
               "${PROJECT_DIR}/data/models/alloydb_vendor_ddl.sql" \
               "${PROJECT_DIR}/data/models/alloydb_events_ddl.sql" \
               "${PROJECT_DIR}/data/models/alloydb_ecosystem_ddl.sql"; do
      sudo -u postgres psql -d "${PGDB}" -v ON_ERROR_STOP=1 -f "${sql}" >/dev/null || log "schema load warn: ${sql}"
    done
    log "dw schema loaded"
  fi
  # TCP password so DATABASE_URL works from node-pg over localhost (local-only creds).
  sudo -u postgres psql -d "${PGDB}" -c "ALTER ROLE postgres WITH PASSWORD 'postgres'" >/dev/null 2>&1 || true
else
  log "postgres NOT up — skipping schema load"
fi

# ── Publish connection env for the rest of the session ───────────────────────
# Points at the in-cloud PG16 + Redis. Non-secret (local-only creds). A value
# already set (cloud-UI override, e.g. a tunnel to host AlloyDB) always wins.
if [ -n "${CLAUDE_ENV_FILE:-}" ]; then
  grep -q '^export DATABASE_URL=' "${CLAUDE_ENV_FILE}" 2>/dev/null \
    || printf 'export DATABASE_URL=%q\n' "${DATABASE_URL_LOCAL}" >> "${CLAUDE_ENV_FILE}"
  grep -q '^export REDIS_URL=' "${CLAUDE_ENV_FILE}" 2>/dev/null \
    || printf 'export REDIS_URL=%q\n' "${REDIS_URL_LOCAL}" >> "${CLAUDE_ENV_FILE}"
fi

# ── Node deps (SessionStart-hook responsibility per cloud docs) ──────────────
if [ ! -d "${PROJECT_DIR}/node_modules" ]; then
  ( cd "${PROJECT_DIR}" && npm ci --no-audit --no-fund >/dev/null 2>&1 ) \
    && log "npm ci done" || log "npm ci skipped/failed"
fi

# ── A2A server (background, port 41241) ──────────────────────────────────────
A2A_PID_FILE="/var/run/ke-a2a.pid"
if [ -f "${PROJECT_DIR}/src/a2a/server.ts" ] \
   && { [ ! -f "${A2A_PID_FILE}" ] || ! kill -0 "$(cat "${A2A_PID_FILE}" 2>/dev/null)" 2>/dev/null; }; then
  mkdir -p "${PROJECT_DIR}/logs"
  ( cd "${PROJECT_DIR}" \
    && DATABASE_URL="${DATABASE_URL_LOCAL}" REDIS_URL="${REDIS_URL_LOCAL}" \
       nohup npx tsx src/a2a/server.ts >"${PROJECT_DIR}/logs/a2a.log" 2>&1 & echo $! > "${A2A_PID_FILE}" )
fi

log "ready"
