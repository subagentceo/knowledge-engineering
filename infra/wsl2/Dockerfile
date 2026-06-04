# Ubuntu 24.04 LTS (Noble Numbat) — basis for WSL2 Ubuntu 26.04-class dev container
# Target: Windows 11 WSL2 (kernel 6.6.87.2, 128GB RAM, 24 CPU threads)
# OAuth-only: ANTHROPIC_API_KEY is never set — claude CLI uses `claude auth login`
FROM ubuntu:24.04

ENV DEBIAN_FRONTEND=noninteractive

# System deps
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    git \
    build-essential \
    ca-certificates \
    gnupg \
    lsb-release \
    redis-server \
    python3 \
    python3-pip \
    python3-venv \
  && rm -rf /var/lib/apt/lists/*

# Node.js 22.x via NodeSource
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
  && apt-get install -y nodejs \
  && rm -rf /var/lib/apt/lists/*

# npm globals
RUN npm install -g typescript tsx prettier

# Python deps
RUN pip3 install --no-cache-dir --break-system-packages \
    "pydantic>=2.0" \
    fastapi \
    "uvicorn[standard]" \
    httpx \
    strawberry-graphql

# Claude CLI (OAuth-only — never set ANTHROPIC_API_KEY; authenticate with `claude auth login`)
RUN npm install -g @anthropic-ai/claude-code

# NVIDIA CUDA GPU passthrough note:
# For RTX 2080 Ti / CUDA workloads, replace the base image with:
#   FROM nvidia/cuda:12.4.1-base-ubuntu24.04
# and run the container with:  docker run --gpus all ...
# See: https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html

WORKDIR /workspace

# bridge-server | OMA server | redis | kg-api
EXPOSE 3000 3001 6379 8000

CMD ["bash"]
