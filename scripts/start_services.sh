#!/bin/bash
# SessionStart hook target. Wired in .claude/settings.json. Installs Node deps
# unconditionally (local + cloud), then wires the data plane for cloud sessions.
#
# Runtime-context model (2026-06-17, OWSL1):
#   * Cloud session: consumes DATABASE_URL + REDIS_URL set in the cloud env UI
#     pointing at the WSL persistent backend via Cloudflare Tunnel. No local
#     Postgres or Redis is started. If the vars are absent the session degrades
#     gracefully — DB-dependent features warn and skip; npm verify still works.
#   * WSL machine (wsl-ubuntu2604-jadecli, 100.112.152.5): runs AlloyDB Omni
#     (ghcr.io/microsoft/pg_durable:pg18-compatible + AlloyDB Omni) + Redis 7
#     persistently in Docker. cloudflared exposes port 5432 + 6379 as private
#     Cloudflare Tunnel endpoints; Mac connects via Tailscale directly.
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

warn() { echo "start_services: WARN $*" >&2; }

# ── Data-plane connectivity (external WSL backend) ────────────────────────────
# DATABASE_URL and REDIS_URL must be set in the cloud env UI pointing at the
# WSL persistent backend (AlloyDB Omni + Redis on wsl-ubuntu2604-jadecli) via
# Cloudflare Tunnel. No local Postgres or Redis is started here.
#
# If the vars are absent, DB-dependent features warn and degrade gracefully.
# The npm verify chain (type-check + unit tests) does NOT require a DB — it
# still succeeds. Only the A2A server is skipped.
#
# OWSL1: ADR docs/decisions/2026-06-17-wsl-tailscale-persistent-backend.md

if [ -n "${DATABASE_URL:-}" ]; then
  log "database: using ${DATABASE_URL%%@*}@..."
else
  warn "DATABASE_URL not set — A2A server skipped. Set in cloud env UI (Cloudflare Tunnel URL to WSL AlloyDB Omni)."
fi

if [ -n "${REDIS_URL:-}" ]; then
  log "redis: using ${REDIS_URL}"
else
  warn "REDIS_URL not set — Redis-dependent features degraded. Set in cloud env UI (Cloudflare Tunnel URL to WSL Redis)."
fi

# Publish to CLAUDE_ENV_FILE so sub-processes pick up the values. A value
# already in the file (e.g. from a prior hook invocation) is never overwritten.
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
# Requires DATABASE_URL — skip if not set.
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
