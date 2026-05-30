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
  tmp="$out.tmp"
  echo "▶ fetching $org → $(basename "$out")"
  # --paginate + --slurp returns an array-of-pages [[…],[…]]. NOTE: `gh api`
  # rejects --slurp together with --jq, so flatten in a SEPARATE jq pass with
  # `add` (this flatten is load-bearing — build.py expects a flat repo list).
  # NO `2>/dev/null`: masking stderr here hid real auth/rate-limit failures and
  # let a truncated result land as if complete (#4). Stage to a tmp file and only
  # commit it if the fetch succeeded AND the flattened output is a JSON array of
  # repo objects — so a partial or error response never overwrites a good file.
  if GH_TOKEN="$TOKEN" gh api --hostname github.com --paginate \
       "orgs/$org/repos?per_page=100&type=all" --slurp \
       | jq 'add // []' > "$tmp" \
     && jq -e 'type == "array" and (length == 0 or (.[0] | type) == "object")' "$tmp" >/dev/null 2>&1; then
    mv "$tmp" "$out"
    echo "  $(jq 'length' "$out") repos"
  else
    rm -f "$tmp"
    echo "✗ fetch failed for $org — kept previous $(basename "$out"); not overwriting" >&2
    exit 1
  fi
done

echo "✓ raw fetch complete — run: python3 .meta/build.py"
