---
name: ubuntu-2204-lts-toolchain-doctor
description: >
  Audit the Anthropic managed-agents cloud sandbox environment (Ubuntu 22.04 LTS) against
  the cloud-sandboxes-reference spec and emit a YAML health report flagging each tool
  as present, missing, or version-mismatch. Use this skill WHENEVER the user says
  "doctor", "health check", "check env", "what's installed", "audit the sandbox",
  "validate toolchain", "what tools do I have", "am I on 22.04", or starts a session
  on the managed-agents cloud sandbox and wants to verify the environment before
  doing real work. Also fire after any tool-not-found error to identify root cause,
  or when project-rag-toolchain runs in a managed-agents context. Returns a YAML
  scorecard with present/missing status, version strings, disk/RAM/CPU summary,
  and a remediation pointer to ubuntu-2204-lts-toolchain-install.
---

# Ubuntu 22.04 LTS — Toolchain Doctor

Audits the Anthropic **managed-agents cloud sandbox** against the official spec.
Source: `platform.claude.com/docs/en/managed-agents/cloud-sandboxes-reference.md`

Expected: Ubuntu 22.04 LTS, x86_64, up to 8 GB RAM, up to 10 GB disk.

## Run the audit

Execute in the sandbox shell (bash):

```bash
#!/bin/bash
# ubuntu-2204-toolchain-doctor.sh
set -euo pipefail

echo "container_env:"
echo "  os: $(lsb_release -d 2>/dev/null | cut -f2 || cat /etc/os-release | grep PRETTY_NAME | cut -d= -f2 | tr -d '\"')"
echo "  arch: $(uname -m)"
echo "  kernel: $(uname -r)"
echo "  hostname: $(hostname)"

echo ""
echo "resources:"
echo "  ram_total: $(awk '/MemTotal/ {printf \"%.1fGB\", $2/1024/1024}' /proc/meminfo)"
echo "  ram_free:  $(awk '/MemAvailable/ {printf \"%.1fGB\", $2/1024/1024}' /proc/meminfo)"
DISK=$(df -h / | tail -1)
echo "  disk_size: $(echo $DISK | awk '{print $2}')"
echo "  disk_used: $(echo $DISK | awk '{print $3}')"
echo "  disk_free: $(echo $DISK | awk '{print $4}')"
echo "  vcpus: $(nproc)"

check() {
  local name="$1"; local cmd="$2"; local min_ver="${3:-}"
  if command -v "$cmd" >/dev/null 2>&1; then
    VER=$($cmd --version 2>&1 | head -1 | grep -oP '[\d]+\.[\d]+\.?[\d]*' | head -1 || echo "?")
    echo "  $name: { status: present, version: \"$VER\" }"
  else
    echo "  $name: { status: missing }"
  fi
}

echo ""
echo "runtimes:"
check python3 python3
check node node
check npm npm
check go go
check rustc rustc
check cargo cargo
check java java
check ruby ruby
check php php

echo ""
echo "package_managers:"
check pip3 pip3
check uv uv
check pnpm pnpm
check yarn yarn
check mvn mvn
check gradle gradle
check composer composer
check bundler bundler

echo ""
echo "databases:"
check sqlite3 sqlite3
check psql psql
check "redis-cli" redis-cli

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
check screen screen
check vim vim
check nano nano
check htop htop
check tree tree
check docker docker
check ssh ssh
check scp scp

echo ""
echo "spec_compliance:"
echo "  expected_os: \"Ubuntu 22.04 LTS\""
echo "  expected_arch: x86_64"
echo "  expected_ram: \"up to 8GB\""
echo "  expected_disk: \"up to 10GB\""
echo "  network_default: disabled
echo ""
echo "remediation:"
echo "  install_skill: ubuntu-2204-lts-toolchain-install"
echo "  note: Run apt-get update first if tools appear missing"
echo "  note: Network must be enabled in environment config for apt/curl/wget"
```

## Interpreting the output

```yaml
container_env:
  os: "Ubuntu 22.04.X LTS"    # should match spec
runtimes:
  go: { status: present, version: "1.22.4" }   # expected ≥1.22
  rustc: { status: missing }                    # needs rustup
databases:
  sqlite3: { status: present }  # local use, fully available
  psql: { status: missing }     # apt-get install postgresql-client
resources:
  disk_free: "9.2GB"            # healthy (spec: up to 10GB)
```

## Known baseline (managed-agents cloud sandbox, Ubuntu 22.04)

Per spec, ALL of the following should be pre-installed:
Python 3.12+, Node.js 20+, Go 1.22+, Rust 1.77+, Java 21+, Ruby 3.3+, PHP 8.3+,
GCC 13+, pip, uv, npm, yarn, pnpm, maven, gradle, bundler, composer,
git, curl, wget, jq, ripgrep, sqlite3, psql client, redis-cli,
tmux, screen, make, cmake, vim, nano, htop, tree, ssh, scp,
sed, awk, grep, tar, zip, unzip, diff, patch.

If any are missing: `sudo apt-get update && sudo apt-get install -y <package>`
or see `ubuntu-2204-lts-toolchain-install` for exact package names.

## Key difference from Container MCP

This skill targets the **managed-agents cloud sandbox** (Ubuntu 22.04, up to 10 GB disk).
The Container MCP tool uses **Alpine Linux 3.19** (1.8 GB disk) — a different environment.
Use `alpine-linux-319-toolchain-doctor` for Container MCP sessions.
