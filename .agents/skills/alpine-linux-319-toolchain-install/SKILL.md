---
name: alpine-linux-319-toolchain-install
description: >
  Install missing tools into an Alpine Linux 3.19 container MCP environment.
  The Container MCP is Alpine 3.19, NOT Ubuntu — standard apt-get/snap commands fail.
  Use this skill WHENEVER the user says "install tools", "set up my environment",
  "I need jq / ripgrep / rust / go / redis-cli / psql", "install the toolchain",
  "bootstrap the container", or hits a "command not found" error in the container.
  Also fire when cfm-doctor reports missing tools, when project-rag-toolchain runs
  in a container context, or any time a container exec fails due to a missing binary.
  This skill knows the exact apk package names for Alpine 3.19 and the correct
  install paths for tools not in the Alpine repos (Rust via rustup, Go via tarball,
  jq/rg via direct binary, uv via pip).
---

# Alpine Linux 3.19 — Toolchain Install

The Container MCP environment is **Alpine Linux 3.19** (not Ubuntu). This matters because:
- `apt-get` does not exist — use `apk add`
- Many tools need the `edge` or `community` repo enabled
- Some tools (Rust, Go, uv) are not in apk at all and need alternative install paths
- Disk is ~1.8GB total — install only what the session needs; clean cache after

## Quick reference — apk package names

```bash
# Enable community repo first (one-time per container boot)
echo "https://dl-cdn.alpinelinux.org/alpine/v3.19/community" >> /etc/apk/repositories
apk update --quiet

# Core dev tools
apk add --no-cache git curl wget make patch bash openssh-client

# JSON / text processing
apk add --no-cache jq

# Ripgrep (rg)
apk add --no-cache ripgrep

# SQLite
apk add --no-cache sqlite

# PostgreSQL client
apk add --no-cache postgresql16-client

# Redis client
apk add --no-cache redis

# tmux / screen
apk add --no-cache tmux screen

# Editors
apk add --no-cache vim nano

# htop / tree
apk add --no-cache htop tree

# cmake
apk add --no-cache cmake

# Python extras
apk add --no-cache python3-dev py3-pip

# Node package managers (Node 20 already present)
npm install -g pnpm yarn --quiet
```

## Language runtimes not in apk

### uv (fast Python package manager)
```bash
pip3 install uv --break-system-packages --quiet
```

### Go (1.22+)
```bash
wget -q https://go.dev/dl/go1.22.4.linux-amd64.tar.gz -O /tmp/go.tar.gz
tar -C /usr/local -xzf /tmp/go.tar.gz
rm /tmp/go.tar.gz
export PATH=$PATH:/usr/local/go/bin
go version
```

### Rust (via rustup)
```bash
apk add --no-cache curl bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y --default-toolchain stable --quiet
source /root/.cargo/env
rustc --version
```

### Java (OpenJDK 21)
```bash
apk add --no-cache openjdk21-jdk
java -version
```

### Ruby
```bash
apk add --no-cache ruby ruby-dev
ruby --version
```

### PHP
```bash
apk add --no-cache php83 php83-cli
php --version
```

## Disk management

The container disk is ~1.8GB. After installing node_modules for multiple projects
the disk can fill (ENOSPC). Standard mitigation:

```bash
# Clean apk cache
rm -rf /var/cache/apk/*

# Clean npm cache
rm -rf /root/.npm /root/.cache/npm

# Remove node_modules from a prior project before installing the next
rm -rf /path/to/prior-project/node_modules
```

If `df -h /` shows <200MB free, run the cleanup above before any `npm install`.

## Post-install verification

After installing, run the doctor skill (alpine-linux-319-toolchain-doctor) or spot-check:

```bash
jq --version && rg --version && sqlite3 --version && psql --version
```

## Notes

- `grep`, `sed`, `awk`, `diff`, `tar`, `curl`, `wget`, `make`, `git`, `ssh` are already present
- Node.js 20.x and Python 3.11 are pre-installed; do not reinstall them
- `pnpm` and `yarn` install cleanly via npm global; `uv` via pip3
- `docker` is NOT available (no Docker-in-Docker in this container)
- Container reboots wipe all installs — re-run as needed at session start
