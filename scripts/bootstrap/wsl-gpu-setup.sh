#!/usr/bin/env bash
# WSL2 NVIDIA GPU passthrough setup for Docker — RTX 2080 Ti / Ubuntu 24.04
# @cite vendor/anthropics/code.claude.com/docs/en/reference/claude-code-on-the-web.md
# @cite infra/wsl2/Dockerfile
#
# Target: RTX 2080 Ti 11GB VRAM in WSL2 on Windows 11 with CUDA 12.4
# Requires: Windows NVIDIA driver ≥560.xx (provides CUDA 12.4 in WSL2)

set -euo pipefail

# ── 1. Prerequisites ──────────────────────────────────────────────────────────
echo "==> Checking prerequisites"

# WSL2 kernel (not WSL1)
if ! grep -qi "microsoft" /proc/version 2>/dev/null; then
  echo "ERROR: not running under WSL" >&2
  exit 1
fi
if ! uname -r | grep -q "WSL2\|microsoft-standard-WSL2"; then
  echo "WARNING: kernel does not identify as WSL2 — verify with 'wsl --list --verbose' in PowerShell"
fi

# Ubuntu 24.04 check
. /etc/os-release
if [[ "${VERSION_ID}" != "24.04" ]]; then
  echo "WARNING: expected Ubuntu 24.04, got ${PRETTY_NAME} — proceeding anyway"
fi

echo "    OS : ${PRETTY_NAME}"
echo "    WSL kernel : $(uname -r)"

# ── 2. Verify GPU visible in WSL2 ────────────────────────────────────────────
echo "==> Checking nvidia-smi (requires Windows driver ≥560.xx for CUDA 12.4)"
if ! command -v nvidia-smi &>/dev/null; then
  echo "ERROR: nvidia-smi not found. Install NVIDIA driver ≥560.xx on Windows 11 first." >&2
  echo "       Download: https://www.nvidia.com/drivers" >&2
  exit 1
fi
nvidia-smi
echo "    GPU visible in WSL2 — OK"

# ── 3. Install nvidia-container-toolkit ──────────────────────────────────────
echo "==> Installing nvidia-container-toolkit"

curl -fsSL https://nvidia.github.io/libnvidia-container/gpgkey \
  | sudo gpg --dearmor -o /usr/share/keyrings/nvidia-container-toolkit-keyring.gpg

curl -s -L https://nvidia.github.io/libnvidia-container/stable/deb/nvidia-container-toolkit.list \
  | sed 's#deb https://#deb [signed-by=/usr/share/keyrings/nvidia-container-toolkit-keyring.gpg] https://#g' \
  | sudo tee /etc/apt/sources.list.d/nvidia-container-toolkit.list

sudo apt-get update && sudo apt-get install -y nvidia-container-toolkit
echo "    nvidia-container-toolkit installed — OK"

# ── 4. Configure Docker runtime ──────────────────────────────────────────────
echo "==> Configuring Docker runtime for NVIDIA GPU"
sudo nvidia-ctk runtime configure --runtime=docker
sudo systemctl restart docker
echo "    Docker NVIDIA runtime configured — OK"

# ── 5. Smoke test with public CUDA image ─────────────────────────────────────
echo "==> Smoke test: nvidia/cuda:12.4.1-base-ubuntu22.04"
docker run --rm --gpus all nvidia/cuda:12.4.1-base-ubuntu22.04 nvidia-smi
echo "    Smoke test passed — OK"

# ── 6. Test with knowledge-engineering container ─────────────────────────────
echo "==> Testing GPU passthrough in ke-dev container"
if docker image inspect ke-dev &>/dev/null; then
  docker run --rm --gpus all ke-dev nvidia-smi
  echo "    ke-dev GPU passthrough — OK"
else
  echo "    ke-dev image not found — build it first with: docker build -t ke-dev infra/wsl2/"
  echo "    Then re-run this script to validate GPU passthrough in the dev container."
fi

echo ""
echo "==> WSL2 NVIDIA GPU passthrough setup complete."
echo "    RTX 2080 Ti (11GB VRAM) is accessible from Docker containers via --gpus all"
