---
name: claude-code-web-toolchain-doctor
description: >
  Audit a Claude Code on the Web cloud session (Ubuntu 24.04 LTS, Anthropic universal
  image) and emit a YAML health report showing tool versions, database status, network
  access level, and any gaps versus the universal image spec. Use this skill WHENEVER
  you are inside a Claude Code web session (claude.ai/code, CLAUDE_CODE_REMOTE=true) and
  the user says "doctor", "health check", "what's installed", "check-tools", "audit the
  environment", "what tools do I have", "is postgres running", "is redis up", or starts
  a session and wants to verify the environment before running tasks. Also fire after any
  "command not found" error to identify root cause. Returns a YAML scorecard covering
  OS, runtimes, databases (with liveness check), network config, disk/RAM, and
  remediation pointer to claude-code-web-toolchain-install.
---

# Claude Code on the Web — Toolchain Doctor

Audits **Claude Code web sessions** (claude.ai/code, Ubuntu 24.04 LTS universal image).
Source: `code.claude.com/docs/en/claude-code-on-the-web.md`

## Step 1: Built-in check

First, run the built-in tool inventory command:
```bash
check-tools
```
This is the canonical way to see what's pre-installed. It outputs language runtimes,
package managers, and dev tools with their versions.

## Step 2: Full YAML audit script

For a comprehensive YAML-formatted health report:

```bash
#!/bin/bash
# claude-code-web-doctor.sh

echo "session_env:"
echo "  os: $(lsb_release -d 2>/dev/null | cut -f2 || grep PRETTY_NAME /etc/os-release | cut -d= -f2 | tr -d '\"')"
echo "  arch: $(uname -m)"
echo "  remote: ${CLAUDE_CODE_REMOTE:-false}"
echo "  project_dir: ${CLAUDE_PROJECT_DIR:-unknown}"

echo ""
echo "resources:"
echo "  ram_total: $(awk '/MemTotal/ {printf \"%.1fGB\", $2/1024/1024}' /proc/meminfo)"
echo "  ram_free:  $(awk '/MemAvailable/ {printf \"%.1fGB\", $2/1024/1024}' /proc/meminfo)"
DISK=$(df -h / | tail -1)
echo "  disk_size: $(echo $DISK | awk '{print $2}')"
echo "  disk_free: $(echo $DISK | awk '{print $4}')"
echo "  vcpus: $(nproc)"

check() {
  local label="$1"; local cmd="$2"
  if command -v "$cmd" >/dev/null 2>&1; then
    VER=$($cmd --version 2>&1 | head -1 | grep -oP '[\d]+\.[\d]+\.?[\d]*' | head -1 || echo "?")
    echo "  $label: { status: present, version: \"$VER\" }"
  else
    echo "  $label: { status: missing }"
  fi
}

echo ""
echo "runtimes:"
check python3 python3
check node node
check go go
check rustc rustc
check java java
check ruby ruby
check php php
check "gcc" gcc
check "clang" clang

echo ""
echo "package_managers:"
check npm npm
check yarn yarn
check pnpm pnpm
check pip3 pip3
check poetry poetry
check uv uv
check gem gem
check bundler bundler
check rbenv rbenv
check composer composer
check cargo cargo
check mvn mvn
check gradle gradle

echo ""
echo "databases:"
# PostgreSQL 16 — check if server is running
if command -v pg_isready >/dev/null 2>&1; then
  PG_STATUS=$(pg_isready 2>&1 | tail -1)
  echo "  postgresql: { status: present, liveness: \"$PG_STATUS\" }"
else
  echo "  postgresql: { status: missing }"
fi

# Redis 7.0 — check if server is running
if command -v redis-cli >/dev/null 2>&1; then
  REDIS_STATUS=$(redis-cli ping 2>/dev/null || echo "not running")
  echo "  redis: { status: present, liveness: \"$REDIS_STATUS\" }"
else
  echo "  redis: { status: missing }"
fi

check sqlite3 sqlite3

echo ""
echo "cli_tools:"
check git git
check curl curl
check wget wget
check jq jq
check rg rg
check cmake cmake
check make make
check tmux tmux
check vim vim
check docker docker
check gh gh
check ssh ssh

echo ""
echo "network:"
echo "  default_policy: limited"
echo "  package_registries: allowlisted"
echo "  github: allowlisted"
echo "  custom_domains: requires_explicit_config"
# Quick connectivity test
if curl -s --max-time 3 https://registry.npmjs.org > /dev/null 2>&1; then
  echo "  npm_registry_reachable: true"
else
  echo "  npm_registry_reachable: false"
fi

echo ""
echo "spec_compliance:"
echo "  expected_os: \"Ubuntu 24.04 LTS\""
echo "  expected_pg: \"16\""
echo "  expected_redis: \"7.0\""
echo "  expected_ruby_default: \"3.3.6\""
echo "  expected_php: \"8.4.14\""

echo ""
echo "remediation:"
echo "  install_skill: claude-code-web-toolchain-install"
echo "  builtin_check: run 'check-tools' for canonical tool inventory"
echo "  setup_script: add persistent installs to environment settings"
```

## Interpreting the output

```yaml
session_env:
  os: "Ubuntu 24.04.X LTS"
  remote: "true"              # confirms this is a web session, not local
databases:
  postgresql: { status: present, liveness: "/var/run/postgresql:5432 - accepting connections" }
  redis: { status: present, liveness: "PONG" }
runtimes:
  ruby: { status: present, version: "3.3.6" }   # default; rbenv has 3.1.6 + 3.2.6 too
  php: { status: present, version: "8.4.14" }
network:
  npm_registry_reachable: true     # "Limited" access; npm is allowlisted
```

## Known baseline (Claude Code web, Ubuntu 24.04 universal image)

Per spec, ALL of the following are pre-installed: Python 3.x, Node.js LTS, Ruby 3.3.6
(+3.1.6/3.2.6 via rbenv), PHP 8.4.14, Java (OpenJDK), Go latest, Rust, GCC, Clang,
pip, poetry, npm, yarn, pnpm, gem, bundler, composer, cargo, mvn, gradle,
PostgreSQL 16 server + client, Redis 7.0, git, curl, wget, make, cmake.

If something is missing: `apt update && apt install -y <package>` or add it to
the environment's setup script so it persists across new sessions.

## Environment disambiguation

| Environment | OS | Key signal | Skill pair |
|---|---|---|---|
| Claude Code web (this skill) | Ubuntu 24.04 | CLAUDE_CODE_REMOTE=true, `check-tools` works | claude-code-web-* |
| Managed-agents cloud sandbox | Ubuntu 22.04 | managed-agents-2026-04-01 beta header | ubuntu-2204-lts-* |
| Container MCP tool | Ubuntu 20.04 (minimal) | mcp__8a87f939 tool namespace | ubuntu-2004-lts-* |
| Cowork / Claude desktop | Alpine 3.19 | apk present, apt absent | alpine-linux-319-* |
