---
name: ubuntu-2004-lts-toolchain-doctor
description: >
  Audit the Container MCP environment (Ubuntu 20.04 LTS base image) and emit a YAML
  health report showing present/missing tools, OS version, disk, RAM, and a gap analysis
  against what the managed-agents spec expects. Use this skill WHENEVER you are inside
  the Container MCP tool (mcp__8a87f939-* tools) and the user says "doctor", "health
  check", "what's installed", "check the container", "audit tools", "what do I have",
  or starts a session and needs to know what's available before running commands.
  Also fire after any "command not found" error to surface root cause, or when
  ubuntu-2004-lts-toolchain-install is about to run (verify first, install only what's
  missing). Returns a YAML scorecard covering OS, RAM, disk, all language runtimes,
  CLI tools, and a spec-gap summary comparing against the Ubuntu 22.04 cloud sandbox spec.
---

# Ubuntu 20.04 LTS — Toolchain Doctor (Container MCP)

Audits the **Container MCP** base image (Ubuntu 20.04 LTS, minimal install).
The Container MCP system prompt describes: "Ubuntu 20.04 base image with curl, git,
net-tools, build-essential, nodejs, npm, python3, python3-pip."

This is NOT the same as the managed-agents cloud sandbox (Ubuntu 22.04, full spec).

## Run the audit

```bash
#!/bin/bash
# ubuntu-2004-toolchain-doctor.sh

echo "container_env:"
OS=$(lsb_release -d 2>/dev/null | cut -f2 || grep PRETTY_NAME /etc/os-release | cut -d= -f2 | tr -d '"')
echo "  os: \"$OS\""
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
echo "  vcpus: $(nproc 2>/dev/null || grep -c processor /proc/cpuinfo)"

check() {
  local label="$1"; local cmd="$2"
  if command -v "$cmd" >/dev/null 2>&1; then
    VER=$($cmd --version 2>&1 | head -1 | grep -oP '[\d]+\.[\d]+\.?[\d]*' | head -1 2>/dev/null || echo "?")
    echo "  $label: { status: present, version: \"$VER\" }"
  else
    echo "  $label: { status: missing }"
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

echo ""
echo "databases:"
check sqlite3 sqlite3
check psql psql
check redis-cli redis-cli

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
check nano nano
check htop htop
check tree tree
check ssh ssh

echo ""
echo "spec_gap_vs_ubuntu_2204_cloud_sandbox:"
echo "  # Tools present in 22.04 spec but likely absent in this 20.04 minimal image:"
for cmd in uv pnpm yarn rg jq sqlite3 psql redis-cli tmux vim nano htop tree go rustc; do
  if ! command -v "$cmd" >/dev/null 2>&1; then
    echo "  - $cmd"
  fi
done

echo ""
echo "remediation:"
echo "  install_skill: ubuntu-2004-lts-toolchain-install"
echo "  upgrade_path: For full spec compliance, use ubuntu-2204-lts cloud sandbox instead"
echo "  warning: Go from apt on 20.04 is v1.13 — install via tarball (see install skill)"
```

## Interpreting the output

```yaml
container_env:
  os: "Ubuntu 20.04.6 LTS"     # Container MCP base image
runtimes:
  node: { status: present, version: "20.x.x" }   # pre-installed
  python3: { status: present }                     # pre-installed
  go: { status: missing }                          # apt version too old; use tarball
  rustc: { status: missing }                       # needs rustup
databases:
  sqlite3: { status: missing }    # apt-get install sqlite3
  psql: { status: missing }       # apt-get install postgresql-client
spec_gap_vs_ubuntu_2204_cloud_sandbox:
  - uv
  - pnpm
  - rg
  - jq
  - sqlite3
  ...
```

## Known baseline (Container MCP, Ubuntu 20.04 minimal)

Pre-installed: `curl`, `git`, `net-tools`, `build-essential` (gcc/g++/make),
`nodejs`, `npm`, `python3`, `python3-pip`.

Everything else requires manual installation. See `ubuntu-2004-lts-toolchain-install`.

## Environment disambiguation

| Environment | OS | Disk | Skill pair |
|---|---|---|---|
| Container MCP (`mcp__8a87f939`) | Ubuntu 20.04 | limited | ubuntu-2004-lts-* |
| Managed-agents cloud sandbox | Ubuntu 22.04 | up to 10 GB | ubuntu-2204-lts-* |
| Cowork / Codex desktop sandbox | Alpine 3.19 | ~1.8 GB | alpine-linux-319-* |
