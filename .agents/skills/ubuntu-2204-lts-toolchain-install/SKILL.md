---
name: ubuntu-2204-lts-toolchain-install
description: >
  Install missing tools into an Ubuntu 22.04 LTS cloud sandbox (Anthropic managed-agents
  cloud sandbox spec). Uses apt-get, snap, and direct binary installs — NOT apk.
  Use this skill WHENEVER you are in the managed-agents cloud sandbox environment and
  the user says "install tools", "set up environment", "I need jq / ripgrep / rust /
  go / redis-cli / psql / uv", "bootstrap the sandbox", "install the toolchain", or a
  command fails with "not found". Also fire after ubuntu-2204-lts-toolchain-doctor
  reports missing tools, before any build/compile/deploy task needing tools beyond
  the pre-installed baseline, or at the start of any session on Ubuntu 22.04 LTS cloud
  sandboxes. This skill carries the exact apt package names, snap commands, and
  alternative install paths (rustup, go tarball, uv, pnpm, yarn) for Ubuntu 22.04.
---

# Ubuntu 22.04 LTS — Toolchain Install

This skill targets **Anthropic managed-agents cloud sandboxes** (Ubuntu 22.04 LTS).
Source: `platform.Codex.com/docs/en/managed-agents/cloud-sandboxes-reference.md`

Specs: up to 8 GB RAM, up to 10 GB disk, x86_64. apt-get is available. Do NOT use apk.

## Pre-installed — no action needed

Python 3.12+, Node.js 20+, Go 1.22+, Rust 1.77+, Java 21+, Ruby 3.3+, PHP 8.3+,
GCC 13+, make, cmake, git, curl, wget, tar, zip, unzip, ssh, scp, sed, awk, grep,
diff, patch, SQLite, psql client, redis-cli, jq, ripgrep (rg), tmux, screen,
vim, nano, htop, tree.

The cloud sandbox spec says all of these come pre-installed. If a tool is missing,
run `sudo apt-get update` first — the index may be stale.

## apt-get installs (for anything missing after index refresh)

```bash
sudo apt-get update -qq

# JSON processing
sudo apt-get install -y jq

# Fast search
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

# System monitoring / tree
sudo apt-get install -y htop tree

# Build tools
sudo apt-get install -y cmake build-essential

# Python dev headers + pip
sudo apt-get install -y python3-dev python3-pip python3-venv

# Node package managers (Node 20 pre-installed)
npm install -g pnpm yarn --quiet
```

## Language runtimes (if absent from pre-installed baseline)

### uv (fast Python package manager)
```bash
pip3 install uv --break-system-packages
# or via official installer:
curl -LsSf https://astral.sh/uv/install.sh | sh
```

### Go (if version needs upgrading)
```bash
wget -q https://go.dev/dl/go1.22.4.linux-amd64.tar.gz -O /tmp/go.tar.gz
sudo rm -rf /usr/local/go
sudo tar -C /usr/local -xzf /tmp/go.tar.gz
rm /tmp/go.tar.gz
export PATH=$PATH:/usr/local/go/bin
go version
```

### Rust (if absent or needs update)
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y --default-toolchain stable
source ~/.cargo/env
rustc --version
cargo --version
```

### Java (OpenJDK 21)
```bash
sudo apt-get install -y openjdk-21-jdk
java -version
```

### Ruby 3.3+
```bash
sudo apt-get install -y ruby-full
ruby --version
```

### PHP 8.3+
```bash
sudo add-apt-repository -y ppa:ondrej/php
sudo apt-get update -qq
sudo apt-get install -y php8.3 php8.3-cli
php --version
```

## Maven / Gradle (Java build tools)
```bash
sudo apt-get install -y maven gradle
```

## Composer (PHP)
```bash
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer
```

## Disk management

Cloud sandbox has up to 10 GB disk. If `df -h /` shows <1 GB free:
```bash
sudo apt-get clean
sudo rm -rf /var/lib/apt/lists/*
rm -rf ~/.npm ~/.cache/npm
```

## Post-install verification

Run the doctor skill (`ubuntu-2204-lts-toolchain-doctor`) or spot-check:
```bash
python3 --version && node --version && go version && rustc --version && java -version
jq --version && rg --version && sqlite3 --version && psql --version
```

## Notes

- Network is **disabled by default** in cloud sandboxes. Enable it in environment config before
  running any `apt-get`, `curl`, or `wget` command.
- `docker` has limited availability in managed sandboxes — do not rely on it.
- Package managers (npm/pip/cargo/go) work once network is enabled.
- All installs persist for the session lifetime; container restarts reset state.
