#!/usr/bin/env bash
# =============================================================================
# pause-claude-cicd.sh  (Outcome O-CICD1)
#
# Pause or remove Claude from CI/CD across every org in the subagentmcp
# enterprise. Idempotent, dry-run by default, structured (JSONL) output.
#
# Levers (most→least aggressive), select with --mode:
#   secret    delete org secret CLAUDE_CODE_OAUTH_TOKEN  → all Claude
#             actions fail auth org-wide, no per-repo edits        [DEFAULT]
#   variable  set org Actions var CLAUDE_CICD_ENABLED=false → clean
#             gated pause for repos carrying the O-CICD1 if: guard
#   disable   gh workflow disable claude.yml + claude-code-review.yml
#             in every repo that has them
#   all       variable + disable + secret
#
# Requires: gh CLI authed as an enterprise owner
#   gh auth login --hostname github.com   (or GHES host via --host)
# Enterprise-server note (code.claude.com/docs/en/github-enterprise-server):
#   GitHub MCP server is unsupported on GHES; gh CLI is the path. Pass
#   --host github.example.com for a self-hosted instance.
#
# Exit codes: 0 ok · 2 bad args · 3 gh missing/unauthed · 4 partial failure
# =============================================================================
set -euo pipefail
IFS=$'\n\t'

ENTERPRISE="subagentmcp"
ORGS=(managedsubagents opencoworkers-ai opensubagents opensubagents-ai \
      outcomesdk subagentapps subagentceo subagentcowork \
      subagentknowledge subagentplugins)
WORKFLOWS=(claude.yml claude-code-review.yml)
SECRET="CLAUDE_CODE_OAUTH_TOKEN"
VAR="CLAUDE_CICD_ENABLED"

MODE="secret"
APPLY=0
HOST="github.com"

usage() { sed -n '2,40p' "$0"; }

while (($#)); do
  case "$1" in
    --mode) MODE="${2:?}"; shift 2;;
    --apply) APPLY=1; shift;;
    --host) HOST="${2:?}"; shift 2;;
    -h|--help) usage; exit 0;;
    *) echo "Error: unknown arg '$1'. Try --help." >&2; exit 2;;
  esac
done
case "$MODE" in secret|variable|disable|all) ;; *)
  echo "Error: --mode must be one of: secret variable disable all" >&2; exit 2;; esac

command -v gh >/dev/null || { echo "Error: gh CLI not found." >&2; exit 3; }
gh auth status --hostname "$HOST" >/dev/null 2>&1 || {
  echo "Error: gh not authed on $HOST. Run: gh auth login --hostname $HOST" >&2; exit 3; }

GH() { gh --hostname "$HOST" "$@"; }
emit() { printf '{"org":"%s","repo":"%s","action":"%s","mode":"%s","applied":%s,"result":"%s"}\n' \
         "$1" "$2" "$3" "$MODE" "$([[ $APPLY -eq 1 ]] && echo true || echo false)" "$4"; }
run() { if ((APPLY)); then "$@" >/dev/null 2>&1 && echo ok || echo failed; else echo dry-run; fi; }

rc=0
[[ $APPLY -eq 0 ]] && echo "# DRY RUN — re-run with --apply to mutate. mode=$MODE host=$HOST enterprise=$ENTERPRISE" >&2

for org in "${ORGS[@]}"; do
  if [[ "$MODE" == "variable" || "$MODE" == "all" ]]; then
    r=$(run GH variable set "$VAR" --org "$org" --visibility all --body "false"); [[ $r == failed ]] && rc=4
    emit "$org" "-" "set-var:$VAR=false" "$r"
  fi
  if [[ "$MODE" == "secret" || "$MODE" == "all" ]]; then
    r=$(run GH secret delete "$SECRET" --org "$org"); [[ $r == failed ]] && rc=4
    emit "$org" "-" "delete-secret:$SECRET" "$r"
  fi
  if [[ "$MODE" == "disable" || "$MODE" == "all" ]]; then
    mapfile -t repos < <(GH repo list "$org" --no-archived --limit 1000 --json name -q '.[].name' 2>/dev/null || true)
    for repo in "${repos[@]:-}"; do
      [[ -z "$repo" ]] && continue
      for wf in "${WORKFLOWS[@]}"; do
        GH api "repos/$org/$repo/contents/.github/workflows/$wf" >/dev/null 2>&1 || continue
        r=$(run GH workflow disable "$wf" --repo "$org/$repo"); [[ $r == failed ]] && rc=4
        emit "$org" "$repo" "disable-workflow:$wf" "$r"
      done
    done
  fi
done
exit "$rc"
