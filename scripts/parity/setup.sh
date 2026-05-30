#!/usr/bin/env bash
# scripts/parity/setup.sh — idempotent installer that brings a macOS host to
# Managed-Agents cloud-sandbox parity.
#
# Recreates the cloud container's toolchain locally so the operator runs their
# OWN managed-agents-equivalent instead of paying for managed agents. The spec
# is codified in docs/data/toolchain-parity.json (sourced from agent-setup.md).
#
# Idempotent: every step is check-then-install. Safe to re-run. Uses the
# host's EXISTING managers (Homebrew for tools, mise for language runtimes) so
# it never fights the operator's version-manager setup.
#
# Database SERVERS are a deliberate local divergence from the cloud sandbox
# (which runs none): AlloyDB Omni + DragonflyDB are this host's real data
# plane. This script only ensures their CLIENTS; bring the servers up via
# scripts/start_services.sh (cloud) or the operator's running containers (local).
#
# Usage:
#   scripts/parity/setup.sh            # install everything missing
#   scripts/parity/setup.sh --dry-run  # print what would be installed
#
# @cite docs/data/toolchain-parity.json
# @cite docs/operator-runbooks/container-parity.md
# @cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/agent-setup.md
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "${ROOT}"
DRY="${1:-}"

ok()   { printf '\033[1;32m✓\033[0m %s\n' "$*"; }
warn() { printf '\033[1;33m⚠\033[0m %s\n' "$*"; }
run()  { if [ "$DRY" = "--dry-run" ]; then echo "  would run: $*"; else eval "$*"; fi; }

if [ -n "${ANTHROPIC_API_KEY:-}" ]; then
  printf '\033[1;31m✗\033[0m ANTHROPIC_API_KEY is set — FORBIDDEN (OAuth-only invariant). Unset it.\n' >&2
  exit 1
fi

command -v brew >/dev/null || { warn "Homebrew not found — install from https://brew.sh first"; exit 1; }

# Homebrew formulae that satisfy spec rows (linters, build, language gaps, utils).
# Listed once; `brew install` is itself idempotent so re-runs are cheap no-ops.
BREW_FORMULAE=(black cmake conan maven php composer htop screen jq ripgrep tree tmux wget)
echo "▶ Homebrew formulae (cloud-sandbox parity) …"
missing_formulae=()
for f in "${BREW_FORMULAE[@]}"; do
  brew list --formula "$f" >/dev/null 2>&1 || missing_formulae+=("$f")
done
if [ "${#missing_formulae[@]}" -gt 0 ]; then
  run "brew install ${missing_formulae[*]}"
else
  ok "all parity formulae present"
fi

# chromedriver (cask) — for the cloud-sandbox Node row's browser automation.
if ! command -v chromedriver >/dev/null 2>&1; then
  run "brew install --cask chromedriver"
else
  ok "chromedriver present"
fi

# Node global linters the cloud image ships globally.
echo "▶ Node global tooling (eslint, prettier) …"
for pkg in eslint prettier; do
  if ! command -v "$pkg" >/dev/null 2>&1; then
    run "npm install -g $pkg"
  else
    ok "$pkg present"
  fi
done

# Language runtimes via mise (the host's existing runtime manager) — NOT rbenv/nvm.
# Cloud floors: Ruby 3.3+, Node 20+ (multi-version 20/22). Python/Go/Rust/Java
# already satisfied by the host; mise pins keep them from silently drifting below
# the floor.
if command -v mise >/dev/null 2>&1; then
  echo "▶ mise language runtimes (Ruby 3.3, Node 20 + 22) …"
  run "mise use -g ruby@3.3"
  run "mise use -g node@20 node@22"
else
  warn "mise not found — install Ruby 3.3 + Node 20/22 manually to meet the spec floor"
fi

echo ""
ok "parity install complete. Verify with: scripts/parity/doctor.sh"
