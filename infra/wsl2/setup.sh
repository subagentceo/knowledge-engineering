#!/usr/bin/env bash
set -euo pipefail

# WSL2 host-side setup script for knowledge-engineering dev container
# Runs inside a WSL2 Ubuntu instance (Windows 11, kernel 6.6.87.2+)
# OAuth-only: ANTHROPIC_API_KEY is never set — use `claude auth login`

# Verify we are running inside WSL2
if [[ ! -e /proc/sys/fs/binfmt_misc/WSLInterop ]]; then
  echo "ERROR: This script must run inside a WSL2 instance." >&2
  exit 1
fi

# Docker Desktop for Windows must be installed and WSL integration enabled.
# Download: https://www.docker.com/products/docker-desktop/
# Enable WSL integration: Docker Desktop → Settings → Resources → WSL Integration

WORKSPACE_DIR="/workspace/knowledge-engineering"

# Clone repo if not already present
if [[ ! -d "$WORKSPACE_DIR" ]]; then
  echo "Cloning knowledge-engineering into $WORKSPACE_DIR …"
  mkdir -p /workspace
  git clone https://github.com/subagentceo/knowledge-engineering.git "$WORKSPACE_DIR"
else
  echo "Repo already present at $WORKSPACE_DIR — skipping clone."
fi

# Install Node dependencies
echo "Running npm install …"
(cd "$WORKSPACE_DIR" && npm install)

# Start redis-server in background (idempotent)
if ! pgrep -x redis-server > /dev/null 2>&1; then
  echo "Starting redis-server …"
  redis-server --daemonize yes
else
  echo "redis-server already running."
fi

# NVIDIA GPU passthrough note:
# For RTX 2080 Ti / CUDA workloads install the NVIDIA Container Toolkit:
#   https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html
# Then pass --gpus all to docker run, or change the base image in infra/wsl2/Dockerfile to:
#   FROM nvidia/cuda:12.4.1-base-ubuntu24.04

echo ""
echo "WSL2 dev container ready — run 'npm run dev' in /workspace/knowledge-engineering"
