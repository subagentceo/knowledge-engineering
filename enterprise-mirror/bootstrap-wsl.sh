#!/usr/bin/env bash
# bootstrap-wsl.sh — reproduce the subagentmcp enterprise mirror inside
# WSL Ubuntu (tested target: Ubuntu-26.04 on Windows 11).
#
# Run this *inside* a fresh WSL Ubuntu shell. It re-clones the 200+ repos from
# GitHub (it does NOT copy a Mac's stale clone history), so the tree is current.
#
#   1. installs gh + jq + git + python3 via apt
#   2. authenticates the enterprise aliases (admin-jadecli / alex-jadecli)
#   3. enumerates every org in the enterprise, clones every repo into {org}/{repo}
#   4. drops in the SessionStart hook + refresh-manifest skill
#
# Usage:
#   ./bootstrap-wsl.sh                       # clone into ~/subagentmcp
#   MIRROR_ROOT=/mnt/d/subagentmcp ./bootstrap-wsl.sh   # custom location
#   ./bootstrap-wsl.sh --no-clone            # tooling + auth only, skip cloning
set -euo pipefail

SLUG="subagentmcp"
PRIMARY_ALIAS="admin-jadecli"   # only alias with admin:enterprise scope
PUSH_ALIAS="alex-jadecli"
MIRROR_ROOT="${MIRROR_ROOT:-$HOME/subagentmcp}"
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

log()  { printf '\033[1;34m▶\033[0m %s\n' "$*"; }
ok()   { printf '\033[1;32m✓\033[0m %s\n' "$*"; }
warn() { printf '\033[1;33m⚠\033[0m %s\n' "$*"; }
die()  { printf '\033[1;31m✗\033[0m %s\n' "$*" >&2; exit 1; }

[[ "$(uname -s)" == "Linux" ]] || die "run this inside WSL Ubuntu, not on the host"
grep -qiE 'microsoft|wsl' /proc/version 2>/dev/null || warn "doesn't look like WSL — continuing anyway"

# ── 1. apt tooling ────────────────────────────────────────────────────────────
install_tools() {
  log "installing gh + jq + git + python3 via apt…"
  sudo install -d -m 755 /etc/apt/keyrings
  curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg \
    | sudo tee /etc/apt/keyrings/githubcli-archive-keyring.gpg >/dev/null
  sudo chmod go+r /etc/apt/keyrings/githubcli-archive-keyring.gpg
  echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" \
    | sudo tee /etc/apt/sources.list.d/github-cli.list >/dev/null
  sudo apt-get update
  sudo apt-get install -y gh jq git python3 ca-certificates curl
  ok "tooling: $(gh --version | head -1)"
}

# ── 2. gh auth ────────────────────────────────────────────────────────────────
auth() {
  for a in "$PRIMARY_ALIAS" "$PUSH_ALIAS"; do
    if gh auth status 2>/dev/null | grep -q "account ${a} "; then
      ok "authenticated: $a"
    else
      warn "logging in $a — needs admin:enterprise,admin:org,repo,workflow for $PRIMARY_ALIAS"
      gh auth login --hostname github.com \
        --scopes "admin:enterprise,admin:org,repo,workflow,gist"
    fi
  done
}

# ── 3. clone the whole enterprise ─────────────────────────────────────────────
clone_all() {
  local token
  token="$(gh auth token --user "$PRIMARY_ALIAS")" \
    || die "no token for $PRIMARY_ALIAS"

  log "enumerating orgs in enterprise '$SLUG'…"
  mapfile -t ORGS < <(
    GH_TOKEN="$token" gh api graphql --hostname github.com \
      -f query="query { enterprise(slug: \"$SLUG\") { organizations(first: 50) { nodes { login } } } }" \
      --jq '.data.enterprise.organizations.nodes[].login'
  )
  [[ ${#ORGS[@]} -gt 0 ]] || die "no orgs returned — check $PRIMARY_ALIAS scope"
  ok "found ${#ORGS[@]} orgs: ${ORGS[*]}"

  mkdir -p "$MIRROR_ROOT"
  local total=0
  for org in "${ORGS[@]}"; do
    log "cloning org: $org"
    mkdir -p "$MIRROR_ROOT/$org"
    mapfile -t REPOS < <(
      GH_TOKEN="$token" gh api --paginate "orgs/$org/repos?per_page=100&type=all" \
        --jq '.[].name'
    )
    for repo in "${REPOS[@]}"; do
      dest="$MIRROR_ROOT/$org/$repo"
      if [[ -d "$dest/.git" ]]; then
        git -C "$dest" pull --ff-only --quiet 2>/dev/null && echo "  ↻ $org/$repo" || echo "  ⚠ $org/$repo (pull skipped)"
      else
        GH_TOKEN="$token" gh repo clone "$org/$repo" "$dest" -- --quiet 2>/dev/null \
          && echo "  ✓ $org/$repo" || echo "  ✗ $org/$repo (clone failed)"
      fi
      total=$((total+1))
    done
  done
  ok "mirror ready at $MIRROR_ROOT — $total repos across ${#ORGS[@]} orgs"
}

# ── 4. drop in hook + skill ───────────────────────────────────────────────────
install_claude_bits() {
  log "installing SessionStart hook + refresh-manifest skill into $MIRROR_ROOT/.claude…"
  mkdir -p "$MIRROR_ROOT/.claude/hooks" "$MIRROR_ROOT/.claude/skills/refresh-manifest" "$MIRROR_ROOT/.meta"
  cp "$HERE/.claude/hooks/session-start.sh" "$MIRROR_ROOT/.claude/hooks/" 2>/dev/null || true
  cp "$HERE/.meta/fetch.sh" "$HERE/.meta/build.py" "$MIRROR_ROOT/.meta/" 2>/dev/null || true
  # skill lives one dir up in the repo (.claude/skills/refresh-manifest/SKILL.md)
  cp "$HERE/../.claude/skills/refresh-manifest/SKILL.md" \
     "$MIRROR_ROOT/.claude/skills/refresh-manifest/" 2>/dev/null \
    || warn "couldn't find refresh-manifest SKILL.md to copy — copy it manually"
  chmod +x "$MIRROR_ROOT/.claude/hooks/session-start.sh" "$MIRROR_ROOT/.meta/"*.sh 2>/dev/null || true

  # Register the SessionStart hook WITHOUT clobbering an existing settings.json.
  # The old `cat > settings.json` heredoc destroyed any permissions/MCP/hooks the
  # operator had added — and this script is re-run to refresh, so that loss is
  # silent and repeated. Merge with jq; only write fresh if no file exists.
  local settings="$MIRROR_ROOT/.claude/settings.json"
  local hook_entry='{"hooks":[{"type":"command","command":"\"$CLAUDE_PROJECT_DIR/.claude/hooks/session-start.sh\""}]}'
  if [[ -f "$settings" ]] && command -v jq >/dev/null 2>&1; then
    local merged
    # Append our SessionStart entry only if an identical command isn't already
    # present (idempotent), preserving every other key in the file.
    if merged="$(jq --argjson e "$hook_entry" '
          .hooks.SessionStart = ((.hooks.SessionStart // [])
            | if any(.[]; .hooks[0].command == $e.hooks[0].command) then . else . + [$e] end)
        ' "$settings")"; then
      printf '%s\n' "$merged" > "$settings"
      ok "merged SessionStart hook into existing settings.json (other keys preserved)"
    else
      warn "could not merge settings.json (invalid JSON?) — left it untouched; add the hook manually"
    fi
  else
    cat > "$settings" <<'JSON'
{
  "hooks": {
    "SessionStart": [
      { "hooks": [ { "type": "command", "command": "\"$CLAUDE_PROJECT_DIR/.claude/hooks/session-start.sh\"" } ] }
    ]
  }
}
JSON
    ok "wrote new settings.json with SessionStart hook"
  fi
  ok "claude bits installed; build the manifest with: cd $MIRROR_ROOT && python3 .meta/build.py"
}

main() {
  install_tools
  auth
  if [[ "${1:-}" != "--no-clone" ]]; then
    clone_all
    install_claude_bits
    log "next: cd $MIRROR_ROOT && .meta/fetch.sh && python3 .meta/build.py   # build enterprise.json"
  else
    ok "tooling + auth done (--no-clone)"
  fi
  ok "WSL enterprise mirror bootstrap complete."
}
main "$@"
