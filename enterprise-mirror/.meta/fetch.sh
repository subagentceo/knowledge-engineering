#!/usr/bin/env bash
# fetch.sh — refresh the raw .meta/<org>.repos.json files from the GitHub API.
#
# Re-enumerates the enterprise's orgs (so a newly-added org is picked up), then
# pulls every repo per org. Runs under the admin-jadecli token (the only alias
# with admin:enterprise scope). Driven by the /refresh-manifest skill, but safe
# to run standalone.
#
# After this, run `python3 .meta/build.py` to rebuild enterprise.json.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
META="$ROOT/.meta"
SLUG="subagentmcp"
ALIAS="admin-jadecli"

TOKEN="$(gh auth token --user "$ALIAS" 2>/dev/null)" \
  || { echo "error: no gh token for $ALIAS (run: gh auth login)" >&2; exit 1; }

echo "▶ enumerating orgs in enterprise '$SLUG' (as $ALIAS)…"
mapfile -t ORGS < <(
  GH_TOKEN="$TOKEN" gh api graphql --hostname github.com \
    -f query="query { enterprise(slug: \"$SLUG\") { organizations(first: 50) { nodes { login } } } }" \
    --jq '.data.enterprise.organizations.nodes[].login'
)
[[ ${#ORGS[@]} -gt 0 ]] || { echo "error: no orgs returned — token scope?" >&2; exit 1; }
echo "  found ${#ORGS[@]} orgs: ${ORGS[*]}"

for org in "${ORGS[@]}"; do
  out="$META/$org.repos.json"
  echo "▶ fetching $org → $(basename "$out")"
  GH_TOKEN="$TOKEN" gh api --hostname github.com --paginate \
    "orgs/$org/repos?per_page=100&type=all" \
    --slurp --jq 'add // .' > "$out" 2>/dev/null \
    || GH_TOKEN="$TOKEN" gh api --hostname github.com \
         "orgs/$org/repos?per_page=100&type=all" > "$out"
  echo "  $(jq 'length' "$out") repos"
done

echo "✓ raw fetch complete — run: python3 .meta/build.py"
