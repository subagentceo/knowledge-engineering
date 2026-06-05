<!--
@cite vendor/anthropics/code.claude.com/docs/en/overview.md
@cite seeds/citations/define-outcomes.md
-->

# Bootstrap Scripts

Minimal, idempotent shell scripts that spin up a fresh Claude Code agent session on each supported surface.

## Prerequisites (all surfaces)

- Git
- Node 20+ (scripts install via nvm or brew if absent)
- npm
- A valid `CLAUDE_CODE_OAUTH_TOKEN` in your environment — **never** `ANTHROPIC_API_KEY`

## Scripts

| Script | Surface | Node install method |
|---|---|---|
| `wsl-cli.sh` | WSL2 Ubuntu + Claude CLI | nvm |
| `macos-cli.sh` | macOS + Claude CLI | nvm or Homebrew |
| `vscode-agent.sh` | VS Code extension agent | pre-existing node required |
| `ghostty-agent.sh` | Ghostty terminal + Claude CLI | pre-existing node required |

## Usage

```bash
# Make executable (one-time)
chmod +x scripts/bootstrap/*.sh

# Run the script for your surface
bash scripts/bootstrap/wsl-cli.sh
bash scripts/bootstrap/macos-cli.sh
bash scripts/bootstrap/vscode-agent.sh
bash scripts/bootstrap/ghostty-agent.sh
```

Each script is safe to re-run (idempotent). Re-running will:
- Skip installs already present
- `git pull --ff-only` instead of re-cloning

## Auth posture

All scripts enforce OAuth-only mode. If `ANTHROPIC_API_KEY` is set in the environment, the script exits with an error. Set `CLAUDE_CODE_OAUTH_TOKEN` instead:

```bash
export CLAUDE_CODE_OAUTH_TOKEN="<your-token>"
```

## What each script does

1. Checks platform prerequisites
2. Installs Node 20+ if needed (platform-specific method)
3. Installs `@anthropic-ai/claude-code` globally if absent
4. Verifies `claude --version`
5. Rejects `ANTHROPIC_API_KEY` if present
6. Clones or fast-forward pulls `knowledge-engineering`
7. Runs `npm install` in the repo
8. Prints a success message with next steps

## Surface-specific notes

**wsl-cli.sh** — Checks `/proc/version` for Microsoft kernel signature. Installs nvm automatically if Node is absent or below 20.

**macos-cli.sh** — Tries nvm first, then falls back to `brew install node`. Requires at least one of nvm or Homebrew to be present.

**vscode-agent.sh** — Requires the `code` CLI on PATH (enable via VS Code shell command install). Installs the `anthropic.claude-vscode` extension via `code --install-extension`.

**ghostty-agent.sh** — Checks for `ghostty` binary. Sets `TERM=xterm-256color` for tool compatibility with Ghostty's GPU renderer.
