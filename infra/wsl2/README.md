# WSL2 Ubuntu 24.04 Dev Environment

Persistent dev container and WSL2 bootstrap for the knowledge-engineering chassis.
Targets the NVIDIA RTX 2080 Ti (11 GB VRAM) operator environment.

## What's included

| Tool | Version | Why |
|---|---|---|
| Ubuntu | 24.04 LTS (Noble) | LTS baseline; stable CUDA support |
| NVIDIA CUDA | 12.4.1 devel | RTX 2080 Ti local inference |
| Node.js | 20 LTS | `npm run verify`, tsx, Claude Code |
| Python | 3.12 | apps/kg-api, apps/admin-api, apps/fivetran-bridge |
| uv | latest | Fast Python package manager |
| Redis | 7 | Session caching, RediSQL |
| Swift | 6.1 | apps/subagent-dashboard, apps/agent-orchestrator |
| Docker CLI | latest | Container-in-container work |
| Terraform | latest | infra/terraform |
| Claude Code CLI | latest | `claude` command, OAuth-only |
| ripgrep | 13+ | grep sweep in verify chain |
| fd | latest | File search (fd-find) |
| jq | latest | JSON processing in scripts |

## Prerequisites

### Docker path (recommended for CI / isolated builds)

- Docker 24+ with NVIDIA Container Toolkit installed on the host
- NVIDIA driver 550+ on the host (supports CUDA 12.4)

```bash
# Install NVIDIA Container Toolkit on host (once):
distribution=$(. /etc/os-release; echo $ID$VERSION_ID)
curl -s -L https://nvidia.github.io/libnvidia-container/gpgkey | sudo apt-key add -
curl -s -L "https://nvidia.github.io/libnvidia-container/$distribution/libnvidia-container.list" \
  | sudo tee /etc/apt/sources.list.d/nvidia-container-toolkit.list
sudo apt-get update && sudo apt-get install -y nvidia-container-toolkit
sudo systemctl restart docker
```

### WSL2 setup.sh path (recommended for day-to-day development)

- WSL2 on Windows 11 (or Windows 10 build 19041+)
- Ubuntu 24.04 from the Microsoft Store
- NVIDIA driver 550+ with WSL2 CUDA support installed in Windows
- `wsl --update` to get the latest WSL kernel

## Docker usage

```bash
# Build the image (from repo root):
docker build -t ke-dev infra/wsl2/

# Run interactively with GPU access:
docker run --gpus all -it --rm \
  -v "$(pwd)":/workspace \
  -e CLAUDE_CODE_OAUTH_TOKEN="${CLAUDE_CODE_OAUTH_TOKEN}" \
  ke-dev

# Run a single verify pass:
docker run --gpus all --rm \
  -v "$(pwd)":/workspace \
  -w /workspace \
  -e CLAUDE_CODE_OAUTH_TOKEN="${CLAUDE_CODE_OAUTH_TOKEN}" \
  ke-dev \
  bash -c "npm ci && npm run verify"
```

### Docker build args

| ARG | Default | Override example |
|---|---|---|
| `CUDA_VERSION` | `12.4.1` | `--build-arg CUDA_VERSION=12.6.0` |
| `UBUNTU_VERSION` | `24.04` | — |
| `SWIFT_VERSION` | `6.1` | `--build-arg SWIFT_VERSION=6.2` |

## WSL2 setup.sh usage

Run once on a fresh Ubuntu 24.04 WSL2 instance. The script is idempotent — safe to re-run.

```bash
# From repo root:
bash infra/wsl2/setup.sh
```

After the script completes:

```bash
source ~/.bashrc
# Verify toolchain:
node --version    # v20.x
python3 --version # 3.12.x
swift --version   # Swift 6.1
redis-cli ping    # PONG
terraform version
claude --version
```

## Environment variables

Create `.env.wsl2` in the repo root (gitignored). The setup script sources it automatically.

```bash
# .env.wsl2 — OAuth only, never ANTHROPIC_API_KEY
CLAUDE_CODE_OAUTH_TOKEN=your-token-here
REDIS_URL=redis://127.0.0.1:6379
```

**Never set `ANTHROPIC_API_KEY`.** This project is OAuth-only. The OAuth gate at
`src/oauth/token.ts` fails closed when `ANTHROPIC_API_KEY` is present.

## Integration with SessionStart hook

The `.claude/hooks/session-start.sh` hook (if present) runs automatically when a
Claude Code session starts. The hook expects:

1. `CLAUDE_CODE_OAUTH_TOKEN` in env (sourced from `.env.wsl2`)
2. `redis-server` reachable at `$REDIS_URL`
3. `node` 20+ on PATH

The WSL2 setup fulfils all three. On the Docker path, pass env vars via `-e` flags.

## Verify the full chain

```bash
npm ci
npm run verify
```

`npm run verify` runs: plugin-cache build, MCP verification, Terraform validate/plan,
citation guard, phase gates, lib tests, coverage, TDD stage, freshness check, project
check, and security posture. All must pass before committing.

## Troubleshooting

**Redis not starting in WSL2:** WSL2 ships without systemd by default. Enable it:

```bash
# /etc/wsl.conf
[boot]
systemd=true
```

Then `wsl --shutdown` + reopen, and `sudo systemctl enable --now redis-server`.

**Swift not on PATH after setup:** Run `source ~/.bashrc` or open a new terminal.

**NVIDIA GPU not visible in Docker:** Ensure `nvidia-container-toolkit` is installed
and `--gpus all` is passed to `docker run`.

**`fdfind: command not found`:** The setup script creates `/usr/local/bin/fd → fdfind`.
If missing, run `sudo ln -sf /usr/bin/fdfind /usr/local/bin/fd`.
