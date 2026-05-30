#!/bin/bash
# setup.sh — repo entry point. Works on the operator's Mac (CLI) and is the
# reference for the Claude Code on the web "Setup script" field.
#
# Env-var model (version-controlled where safe):
#   - NON-SECRET config → .env.defaults (committed), loaded every session by the
#     scripts/load_project_env.sh SessionStart hook via $CLAUDE_ENV_FILE, and
#     mirrored in .claude/settings.json "env". Nothing to do here for those.
#   - SECRETS (ALLOYDB_OMNI_PASSWORD, *_API_KEY, *_OAUTH_TOKEN, NEON_DATABASE_URL)
#     are NEVER committed. On the web they go in the cloud-env "Environment
#     variables" UI; locally they come from the macOS Keychain / .dev.vars.
#     See docs/operator-runbooks/cloud-env-vars-contract.md. This script only
#     CHECKS for them and tells you what's missing — it never prints values.
#   - ANTHROPIC_API_KEY is FORBIDDEN (OAuth-only invariant). setup.sh asserts it.
#
# Usage:
#   ./setup.sh            # install deps, check env, print status
#   ./setup.sh --check    # env/secret check only, no install
#
# @cite docs/operator-runbooks/cloud-env-vars-contract.md
# @cite .env.defaults
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "${ROOT}"

ok()   { printf '\033[1;32m✓\033[0m %s\n' "$*"; }
warn() { printf '\033[1;33m⚠\033[0m %s\n' "$*"; }
err()  { printf '\033[1;31m✗\033[0m %s\n' "$*" >&2; }

# ── Forbidden-value guard (OAuth-only invariant) ──────────────────────────────
if [ -n "${ANTHROPIC_API_KEY:-}" ]; then
  err "ANTHROPIC_API_KEY is set — FORBIDDEN (OAuth-only invariant, src/oauth/token.ts). Unset it."
  exit 1
fi

# ── Non-secret committed config ───────────────────────────────────────────────
if [ -f "${ROOT}/.env.defaults" ]; then
  ok "non-secret config present: .env.defaults (loaded each session via scripts/load_project_env.sh)"
else
  warn ".env.defaults missing — non-secret env will not load"
fi

# ── Dependency install (skip with --check) ────────────────────────────────────
if [ "${1:-}" != "--check" ]; then
  if [ -f "${ROOT}/package-lock.json" ]; then
    echo "▶ npm ci (or install) …"
    npm ci 2>/dev/null || npm install
    ok "node deps installed"
  fi
  # Managed-Agents cloud-sandbox toolchain parity (idempotent). Recreates the
  # cloud container's languages/managers/utils locally so this host runs the
  # operator's own managed-agents-equivalent. See docs/operator-runbooks/container-parity.md.
  if [ -x "${ROOT}/scripts/parity/setup.sh" ]; then
    echo "▶ cloud-sandbox toolchain parity …"
    "${ROOT}/scripts/parity/setup.sh" || warn "parity install reported issues — run scripts/parity/doctor.sh"
  fi
fi

# ── Secret presence check (never prints values) ───────────────────────────────
# These are required for specific lanes; absence is a warning, not fatal, since
# not every session needs every secret.
check_secret() {
  local name="$1" why="$2"
  if [ -n "${!name:-}" ]; then
    ok "secret present: ${name}"
  else
    warn "secret absent: ${name} — ${why}"
  fi
}
echo "── secret check (values never printed; source: cloud-env UI / Keychain / .dev.vars) ──"
check_secret CLAUDE_CODE_OAUTH_TOKEN "Claude auth (Agent SDK + CLI). Mint: claude setup-token"
check_secret NEON_DATABASE_URL       "local crawler dual-write to Neon (optional; crawler degrades without it)"
check_secret ALLOYDB_OMNI_PASSWORD   "AlloyDB Omni container in cloud sessions (scripts/start_services.sh)"
check_secret GITHUB_TOKEN            "gh push / PR from scripts (optional locally; gh auth token works too)"

# ── Toolchain parity doctor (fail-fast drift report) ──────────────────────────
if [ -x "${ROOT}/scripts/parity/doctor.sh" ]; then
  echo "── cloud-sandbox parity check (scripts/parity/doctor.sh) ──"
  "${ROOT}/scripts/parity/doctor.sh" --quiet || warn "toolchain parity drift — see scripts/parity/doctor.sh"
fi

echo ""
ok "setup complete. Non-secret env auto-loads each session; set any missing secrets per the contract."
