---
name: alpine-linux-319-toolchain-doctor
description: >
  Audit the Container MCP environment against the managed-agents cloud sandbox spec
  and report present vs. missing tools as a YAML health report.
  Use this skill WHENEVER the user says "doctor", "health check", "check env",
  "what's installed", "audit the container", "validate toolchain", "what tools do I have",
  or starts a session and wants to know what's available before doing real work.
  Also fire after alpine-linux-319-toolchain-install to verify installs succeeded,
  when cfm-doctor detects infrastructure issues, or when a tool call fails and
  the root cause might be a missing binary.
  Returns a YAML scorecard with present/missing/unknown for every tool in the spec,
  plus disk/RAM/CPU summary, and a terse remediation hint pointing at the install skill.
---

# Alpine Linux 3.19 — Toolchain Doctor

The Container MCP is **Alpine Linux 3.19** (NOT Ubuntu 22.04 as the managed-agents spec claims).
This skill audits what's actually present and surfaces the gap.

## How to run the audit

Execute this script in the container via `container_exec` or `mcp__workspace__bash`:

```bash
#!/bin/sh
# alpine-toolchain-doctor.sh
# Outputs YAML health report to stdout

echo "container_env:"
echo "  os: $(cat /etc/os-release | grep PRETTY_NAME | cut -d= -f2 | tr -d '\"')"
echo "  arch: $(uname -m)"
echo "  kernel: $(uname -r)"

echo ""
echo "resources:"
echo "  ram_total: $(awk '/MemTotal/ {printf \"%.1fGB\", $2/1024/1024}' /proc/meminfo)"
echo "  ram_free:  $(awk '/MemAvailable/ {printf \"%.1fGB\", $2/1024/1024}' /proc/meminfo)"
DISK=$(df -h / | tail -1)
echo "  disk_size: $(echo $DISK | awk '{print $2}')"
echo "  disk_used: $(echo $DISK | awk '{print $3}')"
echo "  disk_free: $(echo $DISK | awk '{print $4}')"
CPU=$(nproc 2>/dev/null || echo "?")
echo "  vcpus: $CPU"

check() {
  local name="$1"; local cmd="$2"
  if command -v "$cmd" >/dev/null 2>&1; then
    VER=$($cmd --version 2>&1 | head -1 | sed 's/.*version //;s/ .*//')
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
check pip3 pip3
check go go
check rustc rustc
check cargo cargo
check java java
check ruby ruby
check php php

echo ""
echo "package_managers:"
check pnpm pnpm
check yarn yarn
check uv uv

echo ""
echo "cli_tools:"
check git git
check curl curl
check wget wget
check jq jq
check rg rg
check sqlite3 sqlite3
check psql psql
check redis-cli redis-cli
check cmake cmake
check make make
check tmux tmux
check vim vim
check nano nano
check htop htop
check tree tree
check docker docker
check ssh ssh

echo ""
echo "notes:"
echo "  - Container reboots wipe all installed packages"
echo "  - Use alpine-linux-319-toolchain-install skill to add missing tools"
echo "  - apt-get is NOT available; use apk add"
echo "  - managed_agents_spec_os: Ubuntu 22.04 LTS (DOES NOT MATCH)"
echo "  - managed_agents_spec_disk: up to 10GB (actual: ~1.8GB)"
echo "  - managed_agents_spec_ram: up to 8GB (actual: ~2.1GB)"
```

## Interpreting the output

The report emits YAML. Key fields:

```yaml
container_env:
  os: "Alpine Linux v3.19"    # NOT Ubuntu 22.04
  arch: x86_64
resources:
  disk_free: "Xmb"            # warn if <300MB — npm install will ENOSPC
runtimes:
  go: { status: missing }     # needs manual install (see install skill)
  rustc: { status: missing }  # needs rustup
cli_tools:
  jq: { status: missing }     # apk add jq
  rg: { status: missing }     # apk add ripgrep
```

## Remediation

For any `status: missing` tool, see `alpine-linux-319-toolchain-install` for the
exact `apk add` command or alternative install path.

Disk free <300MB: run before any `npm install`:
```bash
rm -rf /var/cache/apk/* /root/.npm /root/.cache/npm
```

## Known baseline (fresh Alpine 3.19 container)

Present by default: `python3`, `node`, `npm`, `pip3`, `git`, `curl`, `wget`,
`make`, `ssh`, `grep`, `sed`, `awk`, `tar` (BusyBox), `gcc`.

Missing by default: `go`, `rustc`, `java`, `ruby`, `php`, `pnpm`, `yarn`, `uv`,
`jq`, `rg`, `sqlite3`, `psql`, `redis-cli`, `cmake`, `tmux`, `vim`, `nano`,
`htop`, `tree`, `docker`.
