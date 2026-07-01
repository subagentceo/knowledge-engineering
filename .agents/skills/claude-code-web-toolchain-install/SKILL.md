---
name: Codex-web-toolchain-install
description: >
  Install missing tools into a Codex on the Web cloud session (Ubuntu 24.04 LTS,
  Anthropic universal image). Uses apt install, setup scripts, and SessionStart hooks.
  Use this skill WHENEVER you are inside a Codex web session (Codex.ai/code,
  CLAUDE_CODE_REMOTE=true) and the user says "install tools", "I need X", "set up the
  environment", "add to setup script", "configure the environment", or hits a
  "command not found" error. Also fire when Codex-web-toolchain-doctor reports
  missing tools, or before any task needing tools beyond the universal image baseline.
  This skill knows the exact Ubuntu 24.04 apt package names, the setup script pattern
  for cloud environments, and the SessionStart hook pattern for repo-committed installs.
  Note: the universal image pre-installs most common tools — check first with
  Codex-web-toolchain-doctor or `check-tools` before installing.
---

# Codex on the Web — Toolchain Install

This skill targets **Codex web sessions** (`Codex.ai/code`, Ubuntu 24.04 LTS).
Source: `code.Codex.com/docs/en/Codex-on-the-web.md`

Scripts run as root. `apt install` works without `sudo`. Network is "Limited" by default
(package registries are allowlisted). Disk: generous (exact size unspecified, not limited
like Container MCP). Installs persist for the session but not across new sessions.

## First: check what's already there

Before installing anything, run:
```bash
check-tools
```
This is a built-in command in Codex web sessions that shows pre-installed tools
and their versions. Most common tools are already present in the universal image.

## Universal image baseline (pre-installed — no action needed)

**Languages:** Python 3.x, Node.js LTS, Ruby 3.3.6 (also 3.1.6, 3.2.6 via rbenv),
PHP 8.4.14, Java (OpenJDK + Maven + Gradle), Go (latest stable), Rust + cargo,
GCC + Clang (C/C++).

**Package managers:** pip, poetry, npm, yarn, pnpm, bun*, gem, bundler, rbenv,
composer, maven, gradle, cargo, go modules.

**Databases:** PostgreSQL 16 (server + client), Redis 7.0.

**Tools:** git, curl, wget, make, cmake, and standard GNU utils.

*Bun has known proxy compatibility issues in remote environments.

## apt install — for anything missing

```bash
apt update -qq

# JSON processing
apt install -y jq

# Fast search
apt install -y ripgrep

# SQLite (client only; PostgreSQL 16 and Redis 7.0 are pre-installed)
apt install -y sqlite3

# Terminal tools
apt install -y tmux screen vim nano htop tree

# Build tools
apt install -y build-essential cmake

# gh CLI (not in universal image)
apt install -y gh

# Python extras
apt install -y python3-dev python3-venv
pip install uv
```

## Setup script (persistent across new sessions of the same environment)

The right place for environment-level installs is the **setup script** in environment
settings (`Codex.ai/code` → environment settings → Setup script). It runs as root
before Codex launches on every new session:

```bash
#!/bin/bash
# Runs on Ubuntu 24.04 as root before Codex starts
apt update -qq && apt install -y gh
# Add other tools your project always needs here
```

Setup scripts only run on new sessions, not resumed ones. Append `|| true` to
non-critical commands so a flaky install doesn't block the session from starting.

## SessionStart hook (repo-committed, runs everywhere including local)

For installs that should also run locally, commit to `.Codex/settings.json`:

```json
{
  "hooks": {
    "SessionStart": [{
      "matcher": "startup",
      "hooks": [{
        "type": "command",
        "command": "\"$CLAUDE_PROJECT_DIR\"/scripts/install_pkgs.sh"
      }]
    }]
  }
}
```

`scripts/install_pkgs.sh`:
```bash
#!/bin/bash
# Skip locally — only run in remote cloud sessions
if [ "$CLAUDE_CODE_REMOTE" != "true" ]; then exit 0; fi
npm install
pip install -r requirements.txt
```

Make executable: `chmod +x scripts/install_pkgs.sh`

## Key constraints

- **Network:** "Limited" by default — package registries (npm, PyPI, apt, crates.io,
  RubyGems, etc.) are allowlisted. Custom domains need explicit allowlisting.
- **Bun:** Known proxy incompatibility — avoid for package installs in remote sessions.
- **Docker:** Available in the universal image (limited availability note in spec).
- **Database servers:** PostgreSQL 16 and Redis 7.0 server processes — check if they
  are running with `pg_isready` and `redis-cli ping` before using.
- **No persistence across new sessions:** Use setup scripts for tools needed every time.

## Difference from other environments

| Environment | OS | Install method |
|---|---|---|
| Codex web (this skill) | Ubuntu 24.04 | apt install, setup scripts |
| Managed-agents cloud sandbox | Ubuntu 22.04 | apt-get install |
| Container MCP | Ubuntu 20.04 (minimal) | apt-get install |
| Cowork / Codex desktop | Alpine 3.19 | apk add |
