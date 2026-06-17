#!/usr/bin/env bash
# container/setup.sh
#
# One-shot bootstrap for a fresh Claude Code remote-execution container
# (claude.ai web + mobile). The container is ephemeral: the repo is cloned
# fresh at session start and the VM is reclaimed after inactivity, so this
# script is idempotent and safe to re-run.
#
# What it does, in order:
#   1. assert the OAuth-only invariant (ANTHROPIC_API_KEY must be absent)
#   2. install Node deps (npm ci) and build
#   3. start the per-session data plane (Redis 7 + PostgreSQL 16) if present
#
# The repo's real SessionStart hook is scripts/start_services.sh; this script
# is the manual/portable equivalent for agents that bypass the hook (CI
# runners, raw `claude --dangerously-skip-permissions`). See container/doctor.sh
# to verify the result.
#
# @cite vendor/anthropics/code.claude.com/docs/en/claude-code-on-the-web.md
# @cite CLAUDE.md  (Worktree Bootstrap + OAuth-only invariant)
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT"

log() { printf '\033[1;36m[setup]\033[0m %s\n' "$*"; }
warn() { printf '\033[1;33m[setup]\033[0m %s\n' "$*"; }
die() { printf '\033[1;31m[setup]\033[0m %s\n' "$*" >&2; exit 1; }

# 1. OAuth-only invariant — fail closed if the forbidden key is present.
if [[ -n "${ANTHROPIC_API_KEY:-}" ]]; then
  die "ANTHROPIC_API_KEY is set — this repo is OAuth-only and fails closed. Unset it."
fi
if [[ -n "${ANTHROPIC_ADMIN_API_KEY:-}" ]]; then
  die "ANTHROPIC_ADMIN_API_KEY is set — not used anywhere in this chassis. Unset it."
fi
log "OAuth-only invariant OK (no forbidden keys in env)"

# 2. Node deps + build.
if [[ ! -d node_modules ]]; then
  log "installing Node deps (npm ci)…"
  npm ci --no-audit --no-fund
else
  log "node_modules present — verifying lockfile integrity"
  npm ci --no-audit --no-fund --prefer-offline || npm ci --no-audit --no-fund
fi

log "building (tsc)…"
npm run build

# 3. Data plane: Redis 7 + PostgreSQL 16 ship pre-installed in cloud sessions
#    but are NOT auto-started. Bring them up if the binaries exist.
if command -v redis-server >/dev/null 2>&1; then
  if redis-cli ping >/dev/null 2>&1; then
    log "redis already running ($(redis-cli ping))"
  else
    log "starting redis-server (daemonized)…"
    redis-server --daemonize yes --save '' --appendonly no
  fi
else
  warn "redis-server not found — skipping (data-plane lanes will be degraded)"
fi

if command -v pg_isready >/dev/null 2>&1; then
  if pg_isready >/dev/null 2>&1; then
    log "postgres already accepting connections"
  else
    warn "postgres present but not ready — start it via the service manager"
    (service postgresql start 2>/dev/null || pg_ctlcluster 16 main start 2>/dev/null) || \
      warn "could not auto-start postgres; start it manually if you need the dw"
  fi
else
  warn "postgres client not found — skipping (citation warehouse unavailable)"
fi

log "bootstrap complete. Run container/doctor.sh to verify."
