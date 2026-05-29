#!/usr/bin/env bash
# setup.sh — entry point into the subagentmcp GitHub Enterprise mirror.
#
# Bootstraps a fresh environment to work across the enterprise:
#   - ensures the GitHub CLI (gh) is installed (apt on Debian/Ubuntu, brew on macOS)
#   - verifies auth for the enterprise aliases (admin-jadecli / alex-jadecli)
#   - prints the entry points (enterprise → orgs → repos)
#   - optionally brings up the Docker devcontainer stack (redis 7.0 + postgres 16)
#
# Usage:
#   ./setup.sh              # check + bootstrap host tooling, print entry points
#   ./setup.sh --dev        # also bring up the .devcontainer compose stack
#   ./setup.sh --auth       # run the interactive gh enterprise auth flow
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
MANIFEST="$ROOT/enterprise.json"
ENTERPRISE_SLUG="subagentmcp"

# Identities with enterprise scope (the only aliases that can query enterprise(slug:...)).
ENTERPRISE_ALIASES=("admin-jadecli" "alex-jadecli")

log()  { printf '\033[1;34m▶\033[0m %s\n' "$*"; }
ok()   { printf '\033[1;32m✓\033[0m %s\n' "$*"; }
warn() { printf '\033[1;33m⚠\033[0m %s\n' "$*"; }
die()  { printf '\033[1;31m✗\033[0m %s\n' "$*" >&2; exit 1; }

# ── gh CLI: install if missing ────────────────────────────────────────────────
install_gh() {
  if command -v gh >/dev/null 2>&1; then
    ok "gh present: $(gh --version | head -1)"
    return
  fi
  log "Installing GitHub CLI…"
  if [[ "$(uname -s)" == "Linux" ]] && command -v apt-get >/dev/null 2>&1; then
    # Official apt install per https://github.com/cli/cli/blob/trunk/docs/install_linux.md
    sudo mkdir -p -m 755 /etc/apt/keyrings
    curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg \
      | sudo tee /etc/apt/keyrings/githubcli-archive-keyring.gpg >/dev/null
    sudo chmod go+r /etc/apt/keyrings/githubcli-archive-keyring.gpg
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" \
      | sudo tee /etc/apt/sources.list.d/github-cli.list >/dev/null
    sudo apt-get update && sudo apt-get install -y gh
  elif command -v brew >/dev/null 2>&1; then
    brew install gh
  else
    die "No apt-get or brew found — install gh manually: https://cli.github.com"
  fi
  ok "gh installed: $(gh --version | head -1)"
}

# ── gh auth: verify the enterprise aliases ────────────────────────────────────
check_auth() {
  local interactive="${1:-no}"
  for alias in "${ENTERPRISE_ALIASES[@]}"; do
    if gh auth status 2>/dev/null | grep -q "account ${alias} "; then
      ok "authenticated: ${alias}"
    elif [[ "$interactive" == "yes" ]]; then
      warn "missing alias ${alias} — launching login (needs admin:enterprise, admin:org, repo, workflow)"
      gh auth login --hostname github.com --scopes "admin:enterprise,admin:org,repo,workflow,gist"
    else
      warn "alias ${alias} not authenticated — run \`./setup.sh --auth\` (or \`gh auth login\`)"
    fi
  done
}

# ── entry points: enterprise → orgs → repos ──────────────────────────────────
print_entry_points() {
  log "Entry points into the enterprise:"
  cat <<EOF
  Enterprise : https://github.com/enterprises/${ENTERPRISE_SLUG}
  Orgs+repos : enterprise.json  (canonical map — read before assuming repo existence)

  Enumerate orgs (admin-jadecli token required):
    GH_TOKEN=\$(gh auth token --user admin-jadecli) \\
      gh api graphql -f query='query { enterprise(slug: "${ENTERPRISE_SLUG}") {
        organizations(first: 50) { nodes { login databaseId } } } }'

  List one org's repos:
    GH_TOKEN=\$(gh auth token --user admin-jadecli) \\
      gh api "orgs/<org>/repos?per_page=100&type=all"

  Refresh the manifest:  /refresh-manifest   (or see CLAUDE.md "Refresh protocol")
EOF
  if [[ -f "$MANIFEST" ]] && command -v jq >/dev/null 2>&1; then
    local orgs repos verified
    orgs="$(jq -r '.orgs | length' "$MANIFEST")"
    repos="$(jq -r '[.orgs[].repo_count] | add' "$MANIFEST")"
    verified="$(jq -r '.verified_at' "$MANIFEST")"
    ok "manifest: ${orgs} orgs · ${repos} repos · verified ${verified}"
  fi
}

# ── devcontainer stack ────────────────────────────────────────────────────────
up_devcontainer() {
  command -v docker >/dev/null 2>&1 || die "docker not found"
  log "Bringing up devcontainer stack (web + redis 7.0 + postgres 16)…"
  warn "Docker premium org login (admin@jadecli.com / alex@jadecli.com) is a manual step:"
  echo "    docker login            # use the Docker Hub account for the premium org"
  docker compose -f "$ROOT/.devcontainer/docker-compose.yml" up -d --build
  ok "stack up — \`docker compose -f .devcontainer/docker-compose.yml ps\` to inspect"
}

main() {
  install_gh
  case "${1:-}" in
    --auth) check_auth yes ;;
    --dev)  check_auth no; print_entry_points; up_devcontainer ;;
    *)      check_auth no; print_entry_points ;;
  esac
}
main "$@"
