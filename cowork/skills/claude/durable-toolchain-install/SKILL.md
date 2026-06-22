---
name: durable-toolchain-install
description: >
  Auto-detect the execution environment and install missing tools with
  deterministic per-step echo logging. Reads DurableTask envelopes from
  cowork/data/queues/engineering.jsonl, or accepts an explicit TOOLS list.
  Every install step is logged to stderr with [INSTALL], [OK], [FAIL] prefixes.
  Failed steps emit a new DurableTask with error_type and resolvable flag.
  Use this skill WHENEVER the user says "install tools", "set up environment",
  "I need TOOL", "bootstrap the container", "install the toolchain", hits a
  "command not found" error, or after durable-toolchain-doctor reports gaps.
  Also fire when durable-toolchain-autoresolve delegates an install step here.
  Knows exact package names: apk for Alpine 3.19, apt-get for Ubuntu 20.04/22.04,
  apt for Ubuntu 24.04. Never uses the wrong package manager. Verifies each
  install with binary check and updates the originating DurableTask state.
  Pairs with durable-toolchain-doctor and durable-toolchain-autoresolve.

---

# durable-toolchain-install

Fail-fast, logged, env-aware toolchain installer. Every step echoes its outcome.
Every failure becomes a typed DurableTask.

## ENV_TAG detection (same as doctor — run first)

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
```

## Install dispatch table

For each tool, the correct install command per ENV_TAG:

### Tool → command mapping

| Tool | alpine-319 | ubuntu-2004 | ubuntu-2204 | ccweb-2404 |
|---|---|---|---|---|
| `jq` | `apk add --no-cache jq` | `apt-get install -y jq` | `apt-get install -y jq` | `apt install -y jq` |
| `rg` | `apk add --no-cache ripgrep` | `apt-get install -y ripgrep` | `apt-get install -y ripgrep` | `apt install -y ripgrep` |
| `sqlite3` | `apk add --no-cache sqlite` | `apt-get install -y sqlite3` | `apt-get install -y sqlite3` | `apt install -y sqlite3` |
| `psql` | `apk add --no-cache postgresql16-client` | `apt-get install -y postgresql-client` | `apt-get install -y postgresql-client` | `apt install -y postgresql-client` |
| `redis-cli` | `apk add --no-cache redis` | `apt-get install -y redis-tools` | `apt-get install -y redis-tools` | `apt install -y redis-tools` |
| `tmux` | `apk add --no-cache tmux` | `apt-get install -y tmux` | `apt-get install -y tmux` | `apt install -y tmux` |
| `vim` | `apk add --no-cache vim` | `apt-get install -y vim` | `apt-get install -y vim` | `apt install -y vim` |
| `nano` | `apk add --no-cache nano` | `apt-get install -y nano` | `apt-get install -y nano` | `apt install -y nano` |
| `cmake` | `apk add --no-cache cmake` | `apt-get install -y cmake` | `apt-get install -y cmake` | `apt install -y cmake` |
| `htop` | `apk add --no-cache htop` | `apt-get install -y htop` | `apt-get install -y htop` | `apt install -y htop` |
| `tree` | `apk add --no-cache tree` | `apt-get install -y tree` | `apt-get install -y tree` | `apt install -y tree` |
| `pnpm` | `npm install -g pnpm` | `npm install -g pnpm` | `npm install -g pnpm` | `npm install -g pnpm` |
| `yarn` | `npm install -g yarn` | `npm install -g yarn` | `npm install -g yarn` | `npm install -g yarn` |
| `uv` | `pip3 install uv --break-system-packages` | `pip3 install uv` | `pip3 install uv --break-system-packages` | `pip install uv` |
| `go` | tarball | tarball | tarball | pre-installed |
| `rustc` | rustup | rustup | rustup | pre-installed |
| `java` | `apk add --no-cache openjdk21-jdk` | PPA + apt | `apt-get install -y openjdk-21-jdk` | pre-installed |
| `gh` | unsupported | `apt-get install -y gh` | `apt-get install -y gh` | `apt install -y gh` |

## Full install script

```bash
#!/bin/bash
# durable-toolchain-install.sh
# TOOLS: space-separated list of tools to install (or "all" to install all missing per spec)
# ENV_TAG: set by detect_env above
# TASK_ID: optional — DurableTask id to update on completion/failure
set -uo pipefail

QUEUE_FILE="${QUEUE_FILE:-cowork/data/queues/engineering.jsonl}"
TIMESTAMP=$(date -u +%Y-%m-%dT%H:%M:%SZ)
TOOLS="${TOOLS:-}"
TASK_ID="${TASK_ID:-}"
FAILED_TOOLS=()
INSTALLED_TOOLS=()

log()       { echo "[durable-toolchain-install] $*" >&2; }
log_ok()    { echo "[OK]     $1 installed — $(command -v "$1")" >&2; }
log_fail()  { echo "[FAIL]   $1 — $2" >&2; }
log_skip()  { echo "[SKIP]   $1 — already present ($(command -v "$1"))" >&2; }

# Verify after install: returns 0 if present, 1 if not
verify() {
  local cmd="$1"
  command -v "$cmd" >/dev/null 2>&1
}

# Write DurableTask on failure
emit_failure_task() {
  local tool="$1" reason="$2" resolvable="${3:-false}"
  local tid
  tid=$(python3 -c "import uuid; print(str(uuid.uuid4()))" 2>/dev/null \
        || echo "$(date +%s)-fail-$tool")
  mkdir -p "$(dirname "$QUEUE_FILE")"
  printf '%s\n' \
    "{\"id\":\"$tid\",\"queue\":\"engineering\",\"domain\":\"engineering\",\"subject\":\"Install failed: $tool\",\"state\":\"failed\",\"ke_fit_score\":4,\"error\":{\"tool\":\"$tool\",\"reason\":\"$reason\",\"resolvable\":$resolvable,\"env_tag\":\"$ENV_TAG\"},\"suggested_skill\":\"durable-toolchain-autoresolve\",\"created_at\":\"$TIMESTAMP\",\"updated_at\":\"$TIMESTAMP\"}" \
    >> "$QUEUE_FILE"
  log "DurableTask emitted: install failure for $tool (resolvable=$resolvable)"
}

# Transition an existing task to completed or failed
transition_task() {
  local tid="$1" state="$2" result_json="$3"
  [ -z "$tid" ] && return
  mkdir -p "$(dirname "$QUEUE_FILE")"
  printf '%s\n' \
    "{\"id\":\"$tid\",\"state\":\"$state\",\"result\":$result_json,\"updated_at\":\"$TIMESTAMP\"}" \
    >> "$QUEUE_FILE"
  log "Task $tid → $state"
}

# ── Pre-flight: init package index ───────────────────────────────────────────
case "$ENV_TAG" in
  alpine-319)
    log "Enabling Alpine community repo and updating index"
    grep -q "community" /etc/apk/repositories 2>/dev/null \
      || echo "https://dl-cdn.alpinelinux.org/alpine/v3.19/community" >> /etc/apk/repositories
    apk update --quiet || { log_fail "apk update" "index refresh failed" ; exit 1; }
    ;;
  ubuntu-2004|ubuntu-2204)
    log "Refreshing apt index (apt-get update)"
    apt-get update -qq 2>&1 | tail -3 \
      || { log_fail "apt-get update" "index refresh failed"; exit 1; }
    ;;
  ccweb-2404)
    log "Refreshing apt index (apt update)"
    apt update -qq 2>&1 | tail -3 \
      || { log_fail "apt update" "index refresh failed"; exit 1; }
    ;;
  *)
    log_fail "env" "unknown ENV_TAG=$ENV_TAG — cannot install"
    emit_failure_task "env_detection" "unknown environment: $ENV_TAG" "false"
    exit 1
    ;;
esac

# ── Install function ─────────────────────────────────────────────────────────
install_tool() {
  local tool="$1"

  # Skip if already present
  verify "$tool" && { log_skip "$tool"; return 0; }

  log "[INSTALL] $tool ..."

  local cmd=""
  case "$ENV_TAG" in
    alpine-319)
      case "$tool" in
        jq)         cmd="apk add --no-cache jq" ;;
        rg)         cmd="apk add --no-cache ripgrep" ;;
        sqlite3)    cmd="apk add --no-cache sqlite" ;;
        psql)       cmd="apk add --no-cache postgresql16-client" ;;
        redis-cli)  cmd="apk add --no-cache redis" ;;
        tmux)       cmd="apk add --no-cache tmux" ;;
        vim)        cmd="apk add --no-cache vim" ;;
        nano)       cmd="apk add --no-cache nano" ;;
        cmake)      cmd="apk add --no-cache cmake" ;;
        htop)       cmd="apk add --no-cache htop" ;;
        tree)       cmd="apk add --no-cache tree" ;;
        pnpm|yarn)  cmd="npm install -g $tool --quiet" ;;
        uv)         cmd="pip3 install uv --break-system-packages --quiet" ;;
        go)         install_go_tarball; return $? ;;
        rustc)      install_rustup; return $? ;;
        java)       cmd="apk add --no-cache openjdk21-jdk" ;;
        *)
          log_fail "$tool" "no apk package known for alpine-319 — classify as unresolvable" 
          emit_failure_task "$tool" "no apk package mapping for $tool in alpine-319" "false"
          FAILED_TOOLS+=("$tool"); return 1 ;;
      esac ;;

    ubuntu-2004)
      case "$tool" in
        jq)         cmd="apt-get install -y jq" ;;
        rg)         cmd="apt-get install -y ripgrep" ;;
        sqlite3)    cmd="apt-get install -y sqlite3" ;;
        psql)       cmd="apt-get install -y postgresql-client" ;;
        redis-cli)  cmd="apt-get install -y redis-tools" ;;
        tmux)       cmd="apt-get install -y tmux screen" ;;
        vim)        cmd="apt-get install -y vim" ;;
        nano)       cmd="apt-get install -y nano" ;;
        cmake)      cmd="apt-get install -y cmake" ;;
        htop)       cmd="apt-get install -y htop" ;;
        tree)       cmd="apt-get install -y tree" ;;
        pnpm|yarn)  cmd="npm install -g $tool --quiet" ;;
        uv)         cmd="pip3 install uv" ;;
        go)         install_go_tarball; return $? ;;
        rustc)      install_rustup; return $? ;;
        java)
          add-apt-repository -y ppa:openjdk-r/ppa 2>/dev/null || true
          apt-get update -qq
          cmd="apt-get install -y openjdk-21-jdk" ;;
        gh)         cmd="apt-get install -y gh" ;;
        *)
          log_fail "$tool" "no apt-get package known for ubuntu-2004"
          emit_failure_task "$tool" "no apt-get package mapping for $tool in ubuntu-2004" "false"
          FAILED_TOOLS+=("$tool"); return 1 ;;
      esac ;;

    ubuntu-2204)
      case "$tool" in
        jq)         cmd="apt-get install -y jq" ;;
        rg)         cmd="apt-get install -y ripgrep" ;;
        sqlite3)    cmd="apt-get install -y sqlite3" ;;
        psql)       cmd="apt-get install -y postgresql-client" ;;
        redis-cli)  cmd="apt-get install -y redis-tools" ;;
        tmux)       cmd="apt-get install -y tmux screen" ;;
        vim)        cmd="apt-get install -y vim" ;;
        nano)       cmd="apt-get install -y nano" ;;
        cmake)      cmd="apt-get install -y cmake" ;;
        htop)       cmd="apt-get install -y htop" ;;
        tree)       cmd="apt-get install -y tree" ;;
        pnpm|yarn)  cmd="npm install -g $tool --quiet" ;;
        uv)         cmd="pip3 install uv --break-system-packages" ;;
        go)         install_go_tarball; return $? ;;
        rustc)      install_rustup; return $? ;;
        java)       cmd="apt-get install -y openjdk-21-jdk" ;;
        gh)         cmd="apt-get install -y gh" ;;
        mvn)        cmd="apt-get install -y maven" ;;
        gradle)     cmd="apt-get install -y gradle" ;;
        *)
          log_fail "$tool" "no apt-get package known for ubuntu-2204"
          emit_failure_task "$tool" "no apt-get package mapping for $tool in ubuntu-2204" "false"
          FAILED_TOOLS+=("$tool"); return 1 ;;
      esac ;;

    ccweb-2404)
      case "$tool" in
        jq)         cmd="apt install -y jq" ;;
        rg)         cmd="apt install -y ripgrep" ;;
        sqlite3)    cmd="apt install -y sqlite3" ;;
        psql)       cmd="apt install -y postgresql-client" ;;
        redis-cli)  cmd="apt install -y redis-tools" ;;
        tmux)       cmd="apt install -y tmux" ;;
        gh)         cmd="apt install -y gh" ;;
        cmake)      cmd="apt install -y cmake" ;;
        pnpm|yarn)  cmd="npm install -g $tool --quiet" ;;
        uv)         cmd="pip install uv" ;;
        go|rustc|java|ruby|php|gcc|clang)
          log_skip "$tool (should be pre-installed in universal image — run check-tools)"
          return 0 ;;
        *)
          log_fail "$tool" "no apt package known for ccweb-2404"
          emit_failure_task "$tool" "no apt mapping for $tool in ccweb-2404" "false"
          FAILED_TOOLS+=("$tool"); return 1 ;;
      esac ;;
  esac

  # Execute and verify
  if eval "$cmd" >/dev/null 2>&1; then
    if verify "${tool/rustc/rustc}"; then
      log_ok "$tool"
      INSTALLED_TOOLS+=("$tool")
    else
      log_fail "$tool" "command ran but binary still not found after install"
      emit_failure_task "$tool" "install ran but binary missing: $cmd" "false"
      FAILED_TOOLS+=("$tool"); return 1
    fi
  else
    local exit_code=$?
    log_fail "$tool" "install command exited $exit_code: $cmd"
    emit_failure_task "$tool" "install exited $exit_code: $cmd" "true"
    FAILED_TOOLS+=("$tool"); return 1
  fi
}

# ── Go tarball install ───────────────────────────────────────────────────────
install_go_tarball() {
  log "[INSTALL] go via tarball (apt version too old or not available)"
  local GO_VERSION="1.22.4"
  local URL="https://go.dev/dl/go${GO_VERSION}.linux-amd64.tar.gz"
  wget -q "$URL" -O /tmp/go.tar.gz 2>&1 \
    || { log_fail "go" "wget failed: $URL"; emit_failure_task "go" "wget failed downloading tarball" "true"; FAILED_TOOLS+=("go"); return 1; }
  rm -rf /usr/local/go
  tar -C /usr/local -xzf /tmp/go.tar.gz 2>&1 \
    || { log_fail "go" "tar extract failed"; emit_failure_task "go" "tar extract failed" "true"; FAILED_TOOLS+=("go"); return 1; }
  rm /tmp/go.tar.gz
  export PATH=$PATH:/usr/local/go/bin
  verify go && { log_ok go; INSTALLED_TOOLS+=("go"); } \
    || { log_fail "go" "binary missing after tarball install"; emit_failure_task "go" "binary missing after install" "false"; FAILED_TOOLS+=("go"); return 1; }
}

# ── Rustup install ───────────────────────────────────────────────────────────
install_rustup() {
  log "[INSTALL] rustc via rustup"
  if [ "$ENV_TAG" = "alpine-319" ]; then
    apk add --no-cache curl bash >/dev/null 2>&1
  fi
  curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs \
    | sh -s -- -y --default-toolchain stable --quiet 2>&1 \
    || { log_fail "rustc" "rustup installer failed"; emit_failure_task "rustc" "rustup installer exited non-zero" "true"; FAILED_TOOLS+=("rustc"); return 1; }
  # shellcheck disable=SC1090
  source "${CARGO_HOME:-$HOME/.cargo}/env" 2>/dev/null || export PATH="$HOME/.cargo/bin:$PATH"
  verify rustc && { log_ok rustc; INSTALLED_TOOLS+=("rustc"); } \
    || { log_fail "rustc" "binary missing after rustup"; emit_failure_task "rustc" "binary missing after rustup" "false"; FAILED_TOOLS+=("rustc"); return 1; }
}

# ── Main: install requested tools ────────────────────────────────────────────
if [ -z "$TOOLS" ]; then
  log "No TOOLS specified. Re-run with TOOLS='jq rg sqlite3' or read from DurableTask queue."
  exit 0
fi

for tool in $TOOLS; do
  install_tool "$tool" || true  # continue to next tool even on failure
done

# ── Summary ──────────────────────────────────────────────────────────────────
log "--- install summary ---"
log "installed: ${INSTALLED_TOOLS[*]:-none}"
log "failed:    ${FAILED_TOOLS[*]:-none}"

# Transition originating DurableTask if provided
if [ -n "$TASK_ID" ]; then
  if [ ${#FAILED_TOOLS[@]} -eq 0 ]; then
    transition_task "$TASK_ID" "completed" \
      "{\"installed\":$(printf '%s' "${INSTALLED_TOOLS[*]}" | python3 -c 'import json,sys; print(json.dumps(sys.stdin.read().split()))' 2>/dev/null || echo '[]')}"
  else
    transition_task "$TASK_ID" "failed" \
      "{\"installed\":$(printf '%s' "${INSTALLED_TOOLS[*]}" | python3 -c 'import json,sys; print(json.dumps(sys.stdin.read().split()))' 2>/dev/null || echo '[]'),\"failed\":$(printf '%s' "${FAILED_TOOLS[*]}" | python3 -c 'import json,sys; print(json.dumps(sys.stdin.read().split()))' 2>/dev/null || echo '[]')}"
  fi
fi

echo ""
echo "install_result:"
echo "  env_tag: \"$ENV_TAG\""
echo "  installed: [$(printf '"%s",' "${INSTALLED_TOOLS[@]:-}" | sed 's/,$//')]"
echo "  failed:    [$(printf '"%s",' "${FAILED_TOOLS[@]:-}" | sed 's/,$//')]"
echo "  next: \"run durable-toolchain-doctor to verify\""
```

## Disk cleanup (run first if disk_free < 300MB)

```bash
case "$ENV_TAG" in
  alpine-319)
    rm -rf /var/cache/apk/* /root/.npm /root/.cache/npm
    ;;
  ubuntu-2004|ubuntu-2204)
    apt-get clean
    rm -rf /var/lib/apt/lists/* ~/.npm ~/.cache/npm /tmp/*.tar.gz
    ;;
  ccweb-2404)
    apt clean
    rm -rf /root/.npm /tmp/*.tar.gz
    ;;
esac
```

## Persistence notes per environment

| ENV_TAG | Install persistence | Workaround |
|---|---|---|
| `alpine-319` | None (container restart wipes) | Re-run at session start |
| `ubuntu-2004` | None (container restart wipes) | Re-run at session start |
| `ubuntu-2204` | Session lifetime only | SessionStart hook in `.claude/settings.json` |
| `ccweb-2404` | Session lifetime only | Setup script in environment settings UI |
