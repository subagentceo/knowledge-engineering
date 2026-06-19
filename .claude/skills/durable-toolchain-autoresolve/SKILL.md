---
name: durable-toolchain-autoresolve
description: >
  Read pending DurableTask envelopes from cowork/data/queues/engineering.jsonl,
  classify each as resolvable / unresolvable / requires_escalation, attempt
  automated resolution via durable-toolchain-install, and write state transitions
  (completed / failed / blocked) with structured results and full echo log.
  Every step is logged with [RESOLVE], [SKIP], [ESCALATE] prefixes; every
  outcome is a JSONL transition — failures never disappear silently.
  Use this skill WHENEVER the user says "autoresolve", "fix toolchain gaps",
  "resolve pending tasks", "auto-fix missing tools", "what's blocking my
  toolchain", or after durable-toolchain-doctor emits the action field
  "run durable-toolchain-autoresolve". This is the orchestrator: doctor detects,
  install fixes, autoresolve closes the loop. Unresolvable tasks (unknown env,
  no package mapping) go to blocked state with a human-readable escalation note.
  Pairs with durable-toolchain-doctor and durable-toolchain-install.

---

# durable-toolchain-autoresolve

Orchestrates automated resolution of `toolchain_gap` DurableTasks from the engineering
queue. Classifies, attempts resolution, writes state transitions, escalates what it
cannot fix.

## Resolution classification

Every DurableTask is classified before any action is taken:

| Class | Criteria | Action |
|---|---|---|
| `resolvable` | `resolvable: true` AND known install command for tool + env_tag | Run durable-toolchain-install |
| `unresolvable` | `resolvable: false` OR env_tag = "unknown" | Transition to `blocked`, emit escalation note |
| `requires_escalation` | tool has no package mapping AND resolvable: true | Transition to `blocked` with fix hint |
| `already_present` | binary now found (gap may have been fixed externally) | Transition to `completed` |
| `skip` | state already `completed` or `blocked` | No-op, log skip |

## Full autoresolve script

```bash
#!/bin/bash
# durable-toolchain-autoresolve.sh
set -uo pipefail

QUEUE_FILE="${QUEUE_FILE:-cowork/data/queues/engineering.jsonl}"
TIMESTAMP=$(date -u +%Y-%m-%dT%H:%M:%SZ)
RESOLVED=(); ESCALATED=(); SKIPPED=(); FAILED=()

log()          { echo "[durable-toolchain-autoresolve] $*" >&2; }
log_resolve()  { echo "[RESOLVE]   task=$1 tool=$2" >&2; }
log_skip()     { echo "[SKIP]      task=$1 reason=$2" >&2; }
log_escalate() { echo "[ESCALATE]  task=$1 reason=$2" >&2; }

# ── Read + collapse queue (last-line-wins per id) ────────────────────────────
if [ ! -f "$QUEUE_FILE" ]; then
  log "No queue file at $QUEUE_FILE — nothing to resolve"
  exit 0
fi

# Collapse: extract unique pending tasks of type toolchain_gap
PENDING_TASKS=$(python3 - <<'PYEOF'
import json, sys, os

queue_file = os.environ.get("QUEUE_FILE", "cowork/data/queues/engineering.jsonl")
tasks = {}
with open(queue_file) as f:
    for line in f:
        line = line.strip()
        if not line:
            continue
        try:
            row = json.loads(line)
            tid = row.get("id")
            if tid:
                tasks[tid] = row   # last-line-wins
        except json.JSONDecodeError:
            continue

# Emit pending toolchain gap tasks
for t in tasks.values():
    state = t.get("state", "pending")
    subj  = t.get("subject", "")
    if state == "pending" and ("Toolchain gap" in subj or "toolchain_gap" in t.get("type","") or t.get("error",{}).get("tool")):
        print(json.dumps(t))
PYEOF
)

if [ -z "$PENDING_TASKS" ]; then
  log "No pending toolchain gap tasks found in $QUEUE_FILE"
  echo "autoresolve_result:"
  echo "  status: nothing_to_do"
  echo "  queue: \"$QUEUE_FILE\""
  exit 0
fi

log "Pending tasks found:"
echo "$PENDING_TASKS" | python3 -c "import json,sys; [print(f'  - {json.loads(l)[\"id\"][:8]}... {json.loads(l).get(\"subject\",\"\")}') for l in sys.stdin if l.strip()]" >&2

# ── Detect current env ────────────────────────────────────────────────────────
detect_env() {
  command -v apk >/dev/null 2>&1           && echo "alpine-319"   && return
  [ "${CLAUDE_CODE_REMOTE:-}" = "true" ]   && echo "ccweb-2404"   && return
  [ -f /etc/os-release ] && {
    local v; v=$(grep VERSION_ID /etc/os-release | cut -d= -f2 | tr -d '"')
    case "$v" in
      20.04) echo "ubuntu-2004" && return ;;
      22.04) echo "ubuntu-2204" && return ;;
      24.04) echo "ccweb-2404"  && return ;;
    esac
  }
  echo "unknown"
}
CURRENT_ENV=$(detect_env)
log "Current ENV_TAG: $CURRENT_ENV"

# ── Classify function ─────────────────────────────────────────────────────────
# Returns: resolvable | unresolvable | already_present | requires_escalation
classify_task() {
  local tool="$1" task_env="$2" resolvable="$3"

  # Already installed?
  command -v "$tool" >/dev/null 2>&1 && echo "already_present" && return

  # Env mismatch — task was created in a different env
  if [ "$task_env" != "$CURRENT_ENV" ] && [ "$task_env" != "unknown" ]; then
    echo "unresolvable:env_mismatch($task_env!=$CURRENT_ENV)"
    return
  fi

  # Explicitly marked unresolvable
  [ "$resolvable" = "false" ] && echo "unresolvable:marked_false" && return

  # Check if we have an install mapping
  local has_mapping="false"
  case "$CURRENT_ENV" in
    alpine-319)
      case "$tool" in
        jq|rg|sqlite3|psql|redis-cli|tmux|vim|nano|cmake|htop|tree|pnpm|yarn|uv|go|rustc|java) has_mapping="true" ;;
      esac ;;
    ubuntu-2004|ubuntu-2204)
      case "$tool" in
        jq|rg|sqlite3|psql|redis-cli|tmux|vim|nano|cmake|htop|tree|pnpm|yarn|uv|go|rustc|java|gh|mvn|gradle) has_mapping="true" ;;
      esac ;;
    ccweb-2404)
      case "$tool" in
        jq|rg|sqlite3|psql|redis-cli|tmux|gh|cmake|pnpm|yarn|uv) has_mapping="true" ;;
        # pre-installed in universal image — classify as already_present via verify(), not resolvable
        go|rustc|java|ruby|php|gcc|clang) has_mapping="true" ;;
      esac ;;
  esac

  [ "$has_mapping" = "true" ] && echo "resolvable" || echo "requires_escalation:no_package_mapping"
}

# ── Append transition to queue ────────────────────────────────────────────────
transition() {
  local tid="$1" state="$2" result_json="$3"
  mkdir -p "$(dirname "$QUEUE_FILE")"
  printf '%s\n' \
    "{\"id\":\"$tid\",\"state\":\"$state\",\"result\":$result_json,\"updated_at\":\"$TIMESTAMP\",\"owner\":\"durable-toolchain-autoresolve\"}" \
    >> "$QUEUE_FILE"
  log "Task $tid → $state"
}

# ── Process each pending task ─────────────────────────────────────────────────
while IFS= read -r task_json; do
  [ -z "$task_json" ] && continue

  TASK_ID=$(echo "$task_json" | python3 -c "import json,sys; print(json.loads(sys.stdin.read()).get('id',''))" 2>/dev/null)
  TOOL=$(echo "$task_json" | python3 -c "import json,sys; d=json.loads(sys.stdin.read()); print(d.get('error',{}).get('tool','') or d.get('subject','').replace('Toolchain gap: ','').replace('Install failed: ',''))" 2>/dev/null)
  TASK_ENV=$(echo "$task_json" | python3 -c "import json,sys; d=json.loads(sys.stdin.read()); print(d.get('error',{}).get('env_tag', d.get('env_tag','unknown')))" 2>/dev/null)
  RESOLVABLE=$(echo "$task_json" | python3 -c "import json,sys; d=json.loads(sys.stdin.read()); print('true' if d.get('resolvable', d.get('error',{}).get('resolvable', False)) else 'false')" 2>/dev/null)

  [ -z "$TASK_ID" ] && continue

  log "Processing: task=${TASK_ID:0:8}... tool=$TOOL env=$TASK_ENV resolvable=$RESOLVABLE"

  CLASSIFICATION=$(classify_task "$TOOL" "$TASK_ENV" "$RESOLVABLE")
  log "  → classified: $CLASSIFICATION"

  case "$CLASSIFICATION" in

    already_present)
      log_skip "$TASK_ID" "tool $TOOL now present"
      transition "$TASK_ID" "completed" \
        "{\"note\":\"tool $TOOL was already present — likely installed externally\",\"verified_by\":\"durable-toolchain-autoresolve\"}"
      SKIPPED+=("$TOOL")
      ;;

    resolvable)
      log_resolve "$TASK_ID" "$TOOL"
      # Run install inline for this tool
      TOOLS="$TOOL" ENV_TAG="$CURRENT_ENV" TASK_ID="$TASK_ID" \
        bash "$(dirname "${BASH_SOURCE[0]:-durable-toolchain-install.sh}")/durable-toolchain-install.sh" 2>&1 \
        || true
      # Verify outcome (install script writes transition itself)
      if command -v "$TOOL" >/dev/null 2>&1; then
        RESOLVED+=("$TOOL")
        log "[OK] $TOOL now present"
      else
        FAILED+=("$TOOL")
        log "[FAIL] $TOOL still missing after install attempt"
      fi
      ;;

    unresolvable:*|requires_escalation:*)
      local reason="${CLASSIFICATION#*:}"
      log_escalate "$TASK_ID" "$reason tool=$TOOL"
      ESCALATION_NOTE=""
      case "$reason" in
        env_mismatch*)
          ESCALATION_NOTE="Task was created in env $TASK_ENV but current env is $CURRENT_ENV. Re-run durable-toolchain-doctor in the correct environment." ;;
        marked_false)
          ESCALATION_NOTE="Tool $TOOL was classified as unresolvable at detection time. Likely cause: unknown environment, no package manager, or root-privilege required. Manual intervention needed." ;;
        no_package_mapping)
          ESCALATION_NOTE="No install mapping for $TOOL in $CURRENT_ENV. Add a case to durable-toolchain-install or install manually: check https://pkgs.alpinelinux.org or https://packages.ubuntu.com." ;;
      esac
      transition "$TASK_ID" "blocked" \
        "{\"escalation_reason\":\"$reason\",\"escalation_note\":\"$ESCALATION_NOTE\",\"env_tag\":\"$CURRENT_ENV\",\"tool\":\"$TOOL\"}"
      ESCALATED+=("$TOOL")
      ;;

  esac

done <<< "$PENDING_TASKS"

# ── Final summary ─────────────────────────────────────────────────────────────
echo ""
echo "autoresolve_result:"
echo "  timestamp: \"$TIMESTAMP\""
echo "  env_tag:   \"$CURRENT_ENV\""
echo "  resolved:  [$(printf '"%s",' "${RESOLVED[@]:-}" | sed 's/,$//')]"
echo "  skipped:   [$(printf '"%s",' "${SKIPPED[@]:-}" | sed 's/,$//')]"
echo "  failed:    [$(printf '"%s",' "${FAILED[@]:-}" | sed 's/,$//')]"
echo "  escalated: [$(printf '"%s",' "${ESCALATED[@]:-}" | sed 's/,$//')]"
[ ${#ESCALATED[@]} -gt 0 ] && echo "  action: \"Review blocked tasks in $QUEUE_FILE — human intervention required for escalated items\""
[ ${#FAILED[@]} -gt 0 ]    && echo "  action: \"Re-run durable-toolchain-doctor to reassess failed installs\""
[ ${#RESOLVED[@]} -gt 0 ]  && echo "  action: \"Run durable-toolchain-doctor to verify resolved tools\""
```

## Resolution state machine

```
DurableTask (state: pending)
  │
  ├── already_present  → completed  ✓
  ├── resolvable       → [install] → completed ✓  or  failed (new task emitted)
  ├── unresolvable     → blocked   ⚠  (escalation note written)
  └── requires_escal.  → blocked   ⚠  (package mapping note written)
```

## Escalation output examples

```yaml
autoresolve_result:
  env_tag: "alpine-319"
  resolved:  ["jq", "rg"]
  skipped:   ["git"]
  failed:    []
  escalated: ["custom-corp-tool"]
  action: "Review blocked tasks in engineering.jsonl — human intervention required for escalated items"
```

Escalated task in `cowork/data/queues/engineering.jsonl`:
```json
{
  "id": "a1b2...",
  "state": "blocked",
  "result": {
    "escalation_reason": "no_package_mapping",
    "escalation_note": "No install mapping for custom-corp-tool in alpine-319. Add a case to durable-toolchain-install or install manually.",
    "env_tag": "alpine-319",
    "tool": "custom-corp-tool"
  },
  "updated_at": "2026-06-18T12:00:00Z",
  "owner": "durable-toolchain-autoresolve"
}
```

## Wiring with the other two skills

```
User: "health check"
  → durable-toolchain-doctor   # detects env, emits DurableTasks to engineering.jsonl
  → action: "run durable-toolchain-autoresolve"

User: "autoresolve" / "fix gaps"
  → durable-toolchain-autoresolve   # reads queue, classifies, calls install inline
  → resolved tools: completed
  → unknown tools: blocked with note

User: "install jq"  (explicit, no existing task)
  → durable-toolchain-install   # direct install, emits failure task if it breaks
```
