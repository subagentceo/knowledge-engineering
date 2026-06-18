#!/bin/bash
# SessionStart hook target. Wired in .claude/settings.json. Installs Node deps
# unconditionally (local + cloud), then wires the data plane for cloud sessions.
#
# Runtime-context model (2026-06-17, OWSL1 with bridge fallback):
#   * Preferred path: DATABASE_URL + REDIS_URL set in the cloud env UI pointing
#     at wsl-ubuntu2604-jadecli (100.112.152.5) via Cloudflare Tunnel. When set,
#     no local Postgres or Redis is started.
#   * Bridge fallback (used until WSL + Cloudflare Tunnel are ready): if
#     DATABASE_URL is absent, start local PG16 + Redis 7 exactly as before.
#     Zero-downtime migration: set DATABASE_URL/REDIS_URL in the cloud env UI,
#     and on the next session start the local fallback is automatically bypassed.
#   * Local Mac session: CLAUDE_CODE_REMOTE is unset — data-plane block skipped.
#
# Source-of-truth runbooks:
#   docs/operator-runbooks/alloydb-omni-cloud-env.md
#   docs/operator-runbooks/wsl-backend-setup.md (WSL + Cloudflare Tunnel wiring)
# ADR: docs/decisions/2026-06-17-wsl-tailscale-persistent-backend.md
# @cite vendor/anthropics/code.claude.com/docs/en/claude-code-on-the-web.md
set -euo pipefail

PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)}"

log() { echo "start_services: $*" >&2; }

# ── Node deps (unconditional — node_modules is gitignored) ───────────────────
# Runs on both local worktree sessions and cloud sessions so the verify chain
# works immediately after clone/worktree without a manual `npm ci`. (OBUG1)
# Guard on .package-lock.json (written only on successful npm ci) — not the
# directory, which exists even after a partial/failed install.
if [ ! -f "${PROJECT_DIR}/node_modules/.package-lock.json" ]; then
  # timeout 360: prevents indefinite hang when npm registry is unreachable in
  # cloud containers. SessionStart hooks must not block forever — 6 min is
  # generous for npm ci; a genuine hang exits 124 and the cleanup guard fires.
  if ( cd "${PROJECT_DIR}" && timeout 360 npm ci --no-audit --no-fund 2>&1 | tail -20 >&2 ); then
    log "npm ci done"
  else
    # Remove directory so the next session retries rather than running with
    # a corrupt partial install. `|| true` keeps the hook from aborting under
    # set -e if rm lacks permission (e.g. a prior install ran as another user).
    rm -rf "${PROJECT_DIR}/node_modules" || true
    log "npm ci failed — node_modules removed for retry"
  fi
fi

# Remaining blocks are cloud-only.
if [ "${CLAUDE_CODE_REMOTE:-false}" != "true" ]; then
  exit 0
fi

PGDB="ke"
REDIS_CONF="${PROJECT_DIR}/infra/redis/redis.conf"
warn() { echo "start_services: WARN $*" >&2; }

# ── Database (external WSL backend preferred; local PG16 fallback) ────────────
# OWSL1: when DATABASE_URL is set in the cloud env UI (Cloudflare Tunnel URL),
# skip local PG16 entirely. When absent, start local PG16 as before (OKWP2
# bridge until WSL backend + Cloudflare Tunnel are confirmed ready).

if [ -n "${DATABASE_URL:-}" ]; then
  log "database: using external ${DATABASE_URL%%@*}@..."
else
  # Bridge fallback: local PostgreSQL 16 (pre-installed system cluster)
  if ! pg_isready -q 2>/dev/null; then
    service postgresql start || pg_ctlcluster 16 main start || true
    for _ in $(seq 1 30); do pg_isready -q 2>/dev/null && break; sleep 1; done
  fi

  if pg_isready -q 2>/dev/null; then
    log "postgres up (local fallback)"

    # Portable postgres impersonation — cloud containers run as root (no sudo
    # needed) or as a user with NOPASSWD sudoers. Probe sudo -n first so the
    # hook never hangs waiting for a password that never comes (B-SUDO1).
    if [ "$(id -u)" = "0" ]; then
      _pg() { su - postgres -c "$(printf '%q ' "$@")" 2>/dev/null; }
    elif sudo -n -u postgres true >/dev/null 2>&1; then
      _pg() { sudo -u postgres "$@"; }
    else
      warn "Cannot impersonate postgres without password (sudo -n failed); skipping schema load."
      _pg() { warn "skipped: $*"; return 0; }
    fi

    if ! _pg psql -tAc "SELECT 1 FROM pg_database WHERE datname='${PGDB}'" | grep -q 1; then
      _pg createdb "${PGDB}"
    fi

    # Load the Kimball dw schema once. DDL is all IF NOT EXISTS; the sentinel
    # skips the reload on resume. B5: check one sentinel per DDL file.
    _psql_has() { [ "$(_pg psql -d "${PGDB}" -tAc "SELECT to_regclass('$1')" 2>/dev/null)" = "$1" ]; }
    if ! _psql_has dw.dim_date \
       || ! _psql_has dw.events_cache_access \
       || ! _psql_has dw.dim_research_doc \
       || ! _psql_has dw.dim_memory \
       || ! _psql_has dw.dim_vendor \
       || ! _psql_has dw.events_cache_promotion \
       || ! _psql_has dw.dim_ecosystem_artifact; then
      for sql in "${PROJECT_DIR}/infra/postgres/init/"*.sql \
                 "${PROJECT_DIR}/data/models/alloydb_cache_ddl.sql" \
                 "${PROJECT_DIR}/data/models/alloydb_citations_ddl.sql" \
                 "${PROJECT_DIR}/data/models/alloydb_memory_ddl.sql" \
                 "${PROJECT_DIR}/data/models/alloydb_vendor_ddl.sql" \
                 "${PROJECT_DIR}/data/models/alloydb_events_ddl.sql" \
                 "${PROJECT_DIR}/data/models/alloydb_ecosystem_ddl.sql"; do
        _pg psql -d "${PGDB}" -v ON_ERROR_STOP=1 -f "${sql}" >/dev/null || log "schema load warn: ${sql}"
      done
      log "dw schema loaded (local fallback)"
    fi
    _pg psql -d "${PGDB}" -c "ALTER ROLE postgres WITH PASSWORD 'postgres'" >/dev/null 2>&1 || true
    DATABASE_URL="postgres://postgres:postgres@localhost:5432/${PGDB}"
  else
    log "postgres NOT up — skipping schema load"
  fi
fi

# ── Redis (external WSL backend preferred; local Redis 7 fallback) ───────────
if [ -n "${REDIS_URL:-}" ]; then
  log "redis: using external ${REDIS_URL}"
else
  # Bridge fallback: local Redis 7 (allkeys-lru + 7-day TTL from redis.conf)
  if ! redis-cli ping >/dev/null 2>&1; then
    if [ -f "${REDIS_CONF}" ]; then
      mkdir -p /var/log/redis
      redis-server "${REDIS_CONF}" --daemonize yes --logfile /var/log/redis/redis-server.log \
        || service redis-server start || true
    else
      service redis-server start || true
    fi
  fi
  if redis-cli ping >/dev/null 2>&1; then
    log "redis up (local fallback)"
    REDIS_URL="redis://localhost:6379"
  else
    log "redis NOT up"
  fi
fi

# ── Publish connection env for the rest of the session ───────────────────────
# A value already in CLAUDE_ENV_FILE (e.g. from a prior hook invocation) is
# never overwritten.
if [ -n "${CLAUDE_ENV_FILE:-}" ]; then
  if [ -n "${DATABASE_URL:-}" ]; then
    grep -q '^export DATABASE_URL=' "${CLAUDE_ENV_FILE}" 2>/dev/null \
      || printf 'export DATABASE_URL=%q\n' "${DATABASE_URL}" >> "${CLAUDE_ENV_FILE}"
  fi
  if [ -n "${REDIS_URL:-}" ]; then
    grep -q '^export REDIS_URL=' "${CLAUDE_ENV_FILE}" 2>/dev/null \
      || printf 'export REDIS_URL=%q\n' "${REDIS_URL}" >> "${CLAUDE_ENV_FILE}"
  fi
fi

# ── A2A server (background, port 41241) ──────────────────────────────────────
A2A_PID_FILE="/var/run/ke-a2a.pid"
if [ -n "${DATABASE_URL:-}" ] \
   && [ -f "${PROJECT_DIR}/src/a2a/server.ts" ] \
   && { [ ! -f "${A2A_PID_FILE}" ] || ! kill -0 "$(cat "${A2A_PID_FILE}" 2>/dev/null)" 2>/dev/null; }; then
  mkdir -p "${PROJECT_DIR}/logs"
  # B8: route stderr to a2a.log so crash output is diagnosable.
  ( cd "${PROJECT_DIR}" \
    && nohup npx tsx src/a2a/server.ts >>"${PROJECT_DIR}/logs/a2a.log" 2>&1 & echo $! > "${A2A_PID_FILE}" )
  # B8: tsx cold-start takes 3-8 s; poll up to 12 s before warning.
  _a2a_up=0
  for _i in 1 2 3 4; do
    sleep 3
    if curl -sf --max-time 2 http://localhost:41241/.well-known/agent-card.json >/dev/null 2>&1; then
      _a2a_up=1; break
    fi
  done
  [ "${_a2a_up}" -eq 1 ] || warn "A2A server did not start — check ${PROJECT_DIR}/logs/a2a.log"
fi

log "ready"
