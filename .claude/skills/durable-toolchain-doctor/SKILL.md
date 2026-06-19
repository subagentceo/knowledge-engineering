---
name: durable-toolchain-doctor
description: >
  Auto-detect the execution environment (Alpine 3.19, Ubuntu 20.04 minimal,
  Ubuntu 22.04 managed-agents sandbox, Ubuntu 24.04 code-on-the-web) and emit
  a typed YAML health report, then write a DurableTask to
  cowork/data/queues/engineering.jsonl for every tool gap found.
  Use this skill WHENEVER the user says "doctor", "health check", "check env",
  "what's installed", "audit the toolchain", "validate environment", "what tools
  do I have", "why did that command fail", or "toolchain status". Also fire at
  session start before build/deploy work, after any "command not found" error,
  and before durable-toolchain-install or durable-toolchain-autoresolve runs.
  Auto-detects OS — no need to specify the environment. Every gap is logged to
  stderr with fail_fast echo and becomes a typed DurableTask envelope with
  resolvable/unresolvable/escalate classification and suggested_skill pointer.
  Pairs with durable-toolchain-install and durable-toolchain-autoresolve.

---

# durable-toolchain-doctor

Auto-detecting, fail-fast toolchain audit. Covers all four Anthropic execution
environments. Every missing tool becomes a **DurableTask** in the engineering queue —
failures are never silently dropped.

## ENV_TAG detection (run first)

```bash
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
ENV_TAG=$(detect_env)
echo "[durable-toolchain-doctor] ENV_TAG=$ENV_TAG" >&2
```

| ENV_TAG | Environment | Package mgr | Disk |
|---|---|---|---|
| `alpine-319` | Cowork / Claude desktop | `apk` | ~1.8 GB |
| `ubuntu-2004` | Container MCP minimal | `apt-get` | limited |
| `ubuntu-2204` | Managed-agents sandbox | `apt-get` | up to 10 GB |
| `ccweb-2404` | Code on the web (universal) | `apt` | generous |
| `unknown` | Unrecognized → escalate immediately | — | — |

## Full audit script

Execute via `mcp__workspace__bash` or `container_exec`. Pass `ENV_TAG` as env var.

```bash
#!/bin/bash
# durable-toolchain-audit.sh
# ENV_TAG must be set (see detection above)
set -uo pipefail

ENV_TAG="${ENV_TAG:-unknown}"
QUEUE_FILE="${QUEUE_FILE:-cowork/data/queues/engineering.jsonl}"
TIMESTAMP=$(date -u +%Y-%m-%dT%H:%M:%SZ)
FAILURES=()

# ── Helpers ──────────────────────────────────────────────────────────────────

log()       { echo "[durable-toolchain-doctor] $*" >&2; }
log_fail()  { echo "[FAIL] tool=$1 reason=$2 resolvable=$3" >&2; }

check() {
  # Usage: check <label> <cmd> [<resolvable: true|false>]
  local label="$1" cmd="$2" resolvable="${3:-true}"
  if command -v "$cmd" >/dev/null 2>&1; then
    local ver
    ver=$("$cmd" --version 2>&1 | head -1 \
          | grep -oE '[0-9]+\.[0-9]+\.?[0-9]*' | head -1 || echo "?")
    echo "    $label: { status: present, version: \"$ver\" }"
  else
    echo "    $label: { status: missing }"
    log_fail "$label" "binary not found" "$resolvable"
    FAILURES+=("{\"tool\":\"$label\",\"reason\":\"binary not found: $cmd\",\"resolvable\":$resolvable,\"env_tag\":\"$ENV_TAG\"}")
  fi
}

check_disk() {
  local min_mb="$1"
  local free_mb
  free_mb=$(df -m / | tail -1 | awk '{print $4}')
  if [ "$free_mb" -lt "$min_mb" ]; then
    log_fail "disk_space" "${free_mb}MB free, need ${min_mb}MB" "true"
    FAILURES+=("{\"tool\":\"disk_space\",\"reason\":\"${free_mb}MB free — below ${min_mb}MB threshold\",\"resolvable\":true,\"env_tag\":\"$ENV_TAG\"}")
    echo "    disk_warning: \"${free_mb}MB free — run cleanup before installing\""
  fi
}

# ── Header ───────────────────────────────────────────────────────────────────

OS=$(grep PRETTY_NAME /etc/os-release 2>/dev/null | cut -d= -f2 | tr -d '"' || uname -s)
RAM_TOTAL=$(awk '/MemTotal/    {printf "%.1fGB", $2/1024/1024}' /proc/meminfo)
RAM_FREE=$(awk  '/MemAvailable/{printf "%.1fGB", $2/1024/1024}' /proc/meminfo)
DISK_ROW=$(df -h / | tail -1)

cat <<YAML
durable_toolchain_doctor:
  timestamp: "$TIMESTAMP"
  env_tag:   "$ENV_TAG"
  os:        "$OS"
  arch:      "$(uname -m)"

  resources:
    ram_total: "$RAM_TOTAL"
    ram_free:  "$RAM_FREE"
    disk_size: "$(echo "$DISK_ROW" | awk '{print $2}')"
    disk_free: "$(echo "$DISK_ROW" | awk '{print $4}')"
    vcpus:     "$(nproc 2>/dev/null || echo '?')"

  tools:
YAML

# ── Per-env audit blocks ─────────────────────────────────────────────────────

case "$ENV_TAG" in

  alpine-319)
    check_disk 200
    echo "    # runtimes"
    check python3 python3; check node node; check npm npm; check pip3 pip3
    check go go; check rustc rustc; check java java; check ruby ruby; check php php
    echo "    # pkg managers"
    check pnpm pnpm; check yarn yarn; check uv uv
    echo "    # cli tools"
    check git git; check curl curl; check wget wget
    check jq jq; check rg rg; check sqlite3 sqlite3
    check psql psql; check redis-cli redis-cli
    check make make; check cmake cmake; check tmux tmux; check vim vim; check nano nano
    echo "  spec_notes:"
    echo "    apt_available: false"
    echo "    use_pkg_mgr: apk"
    echo "    community_repo: \"echo https://dl-cdn.alpinelinux.org/alpine/v3.19/community >> /etc/apk/repositories\""
    echo "    docker_available: false"
    ;;

  ubuntu-2004)
    check_disk 300
    echo "    # runtimes"
    check python3 python3; check node node; check npm npm; check pip3 pip3
    check go go; check rustc rustc; check java java
    echo "    # pkg managers"
    check pnpm pnpm; check yarn yarn; check uv uv
    echo "    # cli tools"
    check git git; check curl curl; check wget wget
    check jq jq; check rg rg; check sqlite3 sqlite3
    check psql psql; check redis-cli redis-cli
    check make make; check cmake cmake; check tmux tmux
    echo "  spec_notes:"
    echo "    baseline: \"curl git net-tools build-essential nodejs npm python3 python3-pip\""
    echo "    go_apt_version: \"1.13 — too old; install via tarball\""
    echo "    docker_available: false"
    echo "    persistence: \"none — container restarts wipe installs\""
    ;;

  ubuntu-2204)
    check_disk 1000
    echo "    # runtimes"
    check python3 python3; check node node; check npm npm; check pip3 pip3; check uv uv
    check go go; check rustc rustc; check java java; check ruby ruby; check php php
    echo "    # pkg managers"
    check pnpm pnpm; check yarn yarn; check mvn mvn; check gradle gradle
    check composer composer; check bundler bundler
    echo "    # cli tools"
    check git git; check curl curl; check wget wget
    check jq jq; check rg rg; check sqlite3 sqlite3
    check psql psql; check redis-cli redis-cli
    check make make; check cmake cmake; check tmux tmux; check screen screen
    check vim vim; check nano nano; check htop htop; check tree tree
    echo "  spec_notes:"
    echo "    network_default: disabled"
    echo "    enable_network: \"required before apt-get/curl/wget\""
    echo "    spec_ref: \"platform.claude.com/docs/en/managed-agents/cloud-sandboxes-reference.md\""
    ;;

  ccweb-2404)
    check_disk 500
    # Built-in check-tools first
    if command -v check-tools >/dev/null 2>&1; then
      echo "    check_tools_output: |"
      check-tools 2>&1 | sed 's/^/      /'
    fi
    echo "    # runtimes"
    check python3 python3; check node node; check npm npm; check pip3 pip3
    check go go; check rustc rustc; check java java; check ruby ruby; check php php
    check gcc gcc; check clang clang
    echo "    # pkg managers"
    check pnpm pnpm; check yarn yarn; check uv uv; check poetry poetry
    check gem gem; check bundler bundler; check composer composer; check mvn mvn
    echo "    # databases (liveness)"
    if command -v pg_isready >/dev/null 2>&1; then
      PG=$(pg_isready 2>&1 | tail -1)
      echo "    postgresql: { status: present, liveness: \"$PG\" }"
    else
      echo "    postgresql: { status: missing }"
      log_fail "postgresql" "pg_isready not found" "true"
      FAILURES+=("{\"tool\":\"postgresql\",\"reason\":\"pg_isready not found\",\"resolvable\":true,\"env_tag\":\"$ENV_TAG\"}")
    fi
    if command -v redis-cli >/dev/null 2>&1; then
      REDIS=$(redis-cli ping 2>/dev/null || echo "not running")
      echo "    redis: { status: present, liveness: \"$REDIS\" }"
    else
      echo "    redis: { status: missing }"
      log_fail "redis" "redis-cli not found" "true"
      FAILURES+=("{\"tool\":\"redis\",\"reason\":\"redis-cli not found\",\"resolvable\":true,\"env_tag\":\"$ENV_TAG\"}")
    fi
    echo "    # cli tools"
    check git git; check curl curl; check jq jq; check rg rg; check cmake cmake
    echo "    # network"
    NET="unknown"
    curl -s --max-time 3 https://registry.npmjs.org >/dev/null 2>&1 && NET="reachable"
    echo "    npm_registry: $NET"
    echo "  spec_notes:"
    echo "    remote_signal: \"CLAUDE_CODE_REMOTE=true\""
    echo "    bun_warning: \"known proxy incompatibility in remote sessions\""
    echo "    setup_script: \"add persistent installs to environment settings UI\""
    ;;

  *)
    log "ERROR: unrecognized ENV_TAG=$ENV_TAG — emitting escalation DurableTask"
    FAILURES+=("{\"tool\":\"env_detection\",\"reason\":\"unrecognized environment: apk absent, CLAUDE_CODE_REMOTE unset, /etc/os-release missing or version unknown\",\"resolvable\":false,\"env_tag\":\"unknown\"}")
    echo "    env_detection: { status: failed, resolvable: false }"
    ;;
esac

# ── Emit DurableTask envelopes ───────────────────────────────────────────────

if [ ${#FAILURES[@]} -gt 0 ]; then
  echo ""
  echo "  failure_count: ${#FAILURES[@]}"
  mkdir -p "$(dirname "$QUEUE_FILE")"
  for err_json in "${FAILURES[@]}"; do
    TOOL=$(echo "$err_json" | grep -o '"tool":"[^"]*"' | cut -d: -f2 | tr -d '"')
    RESOLVABLE=$(echo "$err_json" | grep -o '"resolvable":[a-z]*' | cut -d: -f2)
    TASK_ID=$(python3 -c "import uuid; print(str(uuid.uuid4()))" 2>/dev/null \
              || cat /proc/sys/kernel/random/uuid 2>/dev/null \
              || echo "$(date +%s)-$TOOL")
    STATE="pending"
    [ "$RESOLVABLE" = "false" ] && STATE="blocked"
    printf '%s\n' \
      "{\"id\":\"$TASK_ID\",\"queue\":\"engineering\",\"domain\":\"engineering\",\"subject\":\"Toolchain gap: $TOOL\",\"state\":\"$STATE\",\"ke_fit_score\":3,\"error\":$err_json,\"resolvable\":$RESOLVABLE,\"suggested_skill\":\"durable-toolchain-autoresolve\",\"created_at\":\"$TIMESTAMP\",\"updated_at\":\"$TIMESTAMP\"}" \
      >> "$QUEUE_FILE"
    log "DurableTask written: $TASK_ID tool=$TOOL state=$STATE resolvable=$RESOLVABLE"
  done
  echo "  action: \"run durable-toolchain-autoresolve to resolve pending tasks\""
fi
```

## Output schema

```yaml
durable_toolchain_doctor:
  timestamp: "2026-06-18T12:00:00Z"
  env_tag:   "alpine-319"
  os:        "Alpine Linux v3.19"
  resources:
    disk_free: "1.2GB"
  tools:
    jq: { status: missing }        # → DurableTask emitted, state: pending
    go: { status: missing }        # → DurableTask emitted, state: pending
    node: { status: present, version: "20.15.1" }
  failure_count: 2
  action: "run durable-toolchain-autoresolve to resolve pending tasks"
```

## DurableTask written to `cowork/data/queues/engineering.jsonl`

```json
{
  "id": "a1b2c3d4-...",
  "queue": "engineering",
  "subject": "Toolchain gap: jq",
  "state": "pending",
  "ke_fit_score": 3,
  "error": { "tool": "jq", "reason": "binary not found: jq", "resolvable": true, "env_tag": "alpine-319" },
  "resolvable": true,
  "suggested_skill": "durable-toolchain-autoresolve",
  "created_at": "2026-06-18T12:00:00Z",
  "updated_at": "2026-06-18T12:00:00Z"
}
```

`resolvable: false` → state is set to `blocked` immediately; requires human escalation.
`resolvable: true` → state is `pending`; durable-toolchain-autoresolve can act on it.
