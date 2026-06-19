---
name: ubuntu-2004-lts-toolchain-install
description: >
  Install missing tools into an Ubuntu 20.04 LTS container environment — specifically
  the Container MCP tool's base image ("Ubuntu 20.04 base image" per its system prompt).
  Uses apt-get and direct binary installs. NOT for Alpine (use alpine-linux-319) or
  Ubuntu 22.04 managed-agents cloud sandboxes (use ubuntu-2204-lts).
  Use this skill WHENEVER you are inside the Container MCP (mcp__8a87f939 tools) and
  the user says "install tools", "bootstrap the container", "I need jq / ripgrep /
  rust / go / redis / psql / uv / pnpm", hits a "command not found" error, or needs
  to prepare the container before a build/deploy task. Also fire after
  ubuntu-2004-lts-toolchain-doctor reports missing tools.
  The Container MCP image is minimal Ubuntu 20.04 — most tools from the cloud sandbox
  spec are absent and must be manually installed. Disk is ~limited; install only what
  the session needs and clean up after.
---

# Ubuntu 20.04 LTS — Toolchain Install (Container MCP)

This skill targets the **Container MCP tool** (`mcp__8a87f939-*` tools), which uses
Ubuntu 20.04 LTS as its base image. This is a minimal image — most language runtimes
and CLI tools must be installed manually.

Pre-installed: curl, git, net-tools, build-essential, nodejs, npm, python3, python3-pip.

## First: update apt index

```bash
sudo apt-get update -qq
sudo apt-get install -y software-properties-common
```

## Core CLI tools

```bash
# JSON processing
sudo apt-get install -y jq

# Fast file search (ripgrep)
sudo apt-get install -y ripgrep

# SQLite
sudo apt-get install -y sqlite3

# PostgreSQL client
sudo apt-get install -y postgresql-client

# Redis client
sudo apt-get install -y redis-tools

# Terminal multiplexers
sudo apt-get install -y tmux screen

# Editors
sudo apt-get install -y vim nano

# htop, tree
sudo apt-get install -y htop tree

# cmake
sudo apt-get install -y cmake

# wget (may already be present)
sudo apt-get install -y wget
```

## Node package managers

```bash
# Node.js is pre-installed; add package managers
npm install -g pnpm yarn --quiet
```

## Python extras

```bash
# pip is pre-installed; add uv
pip3 install uv --break-system-packages 2>/dev/null || pip3 install uv

# venv support
sudo apt-get install -y python3-venv python3-dev
```

## Go

Ubuntu 20.04's apt Go is too old (1.13). Install from tarball:
```bash
wget -q https://go.dev/dl/go1.22.4.linux-amd64.tar.gz -O /tmp/go.tar.gz
sudo rm -rf /usr/local/go
sudo tar -C /usr/local -xzf /tmp/go.tar.gz
rm /tmp/go.tar.gz
export PATH=$PATH:/usr/local/go/bin
echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.bashrc
go version
```

## Rust

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y --default-toolchain stable
source ~/.cargo/env
rustc --version
```

## Java (OpenJDK 21)

Ubuntu 20.04 apt has OpenJDK 11/17. For 21:
```bash
sudo add-apt-repository -y ppa:openjdk-r/ppa 2>/dev/null || true
sudo apt-get update -qq
sudo apt-get install -y openjdk-21-jdk 2>/dev/null || sudo apt-get install -y openjdk-17-jdk
java -version
```

## Ruby

```bash
sudo apt-get install -y ruby-full
ruby --version
```

## PHP 8.x

```bash
sudo add-apt-repository -y ppa:ondrej/php
sudo apt-get update -qq
sudo apt-get install -y php8.1-cli   # or php8.3 if available
php --version
```

## Disk management

Container MCP disk is limited. Clean up between heavy installs:
```bash
sudo apt-get clean
sudo rm -rf /var/lib/apt/lists/*
rm -rf ~/.npm ~/.cache/npm /tmp/*.tar.gz
```

## Post-install verification

```bash
node --version && python3 --version && go version 2>/dev/null && rustc --version 2>/dev/null
jq --version && sqlite3 --version
```

## Notes

- Container MCP system prompt says "Ubuntu 20.04" — different from the managed-agents
  cloud sandbox spec (Ubuntu 22.04). Some package names differ.
- `docker` is not available inside the Container MCP.
- Installs do NOT persist across container restarts — re-run at session start.
- For managed-agents cloud sandboxes use `ubuntu-2204-lts-toolchain-install` instead.
- For Alpine Linux (actual Cowork sandbox) use `alpine-linux-319-toolchain-install`.
