# syntax=docker/dockerfile:1.7
# @cite infra/wsl2/README.md
# Multi-stage WSL2 dev environment for knowledge-engineering chassis.
# Stage 1: CUDA base (NVIDIA RTX 2080 Ti, 11GB VRAM)
# Stage 2: Full toolchain install

ARG CUDA_VERSION=12.4.1
ARG UBUNTU_VERSION=24.04

FROM nvidia/cuda:${CUDA_VERSION}-devel-ubuntu${UBUNTU_VERSION} AS base

ENV DEBIAN_FRONTEND=noninteractive \
    TZ=UTC \
    LANG=C.UTF-8 \
    LC_ALL=C.UTF-8

# System deps + add-apt-repository support
RUN apt-get update && apt-get install -y --no-install-recommends \
        software-properties-common \
        ca-certificates \
        gnupg \
        curl \
        wget \
        git \
        jq \
        unzip \
        build-essential \
        pkg-config \
        libssl-dev \
        libffi-dev \
        libsqlite3-dev \
        libbz2-dev \
        libreadline-dev \
        zlib1g-dev \
        xz-utils \
        lsb-release \
        apt-transport-https \
        fd-find \
    && rm -rf /var/lib/apt/lists/*

# ripgrep (Ubuntu 24.04 ships rg 13; OK)
RUN apt-get update && apt-get install -y --no-install-recommends ripgrep && rm -rf /var/lib/apt/lists/*

# ── Node.js 20 LTS via NodeSource ─────────────────────────────────────────────
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y --no-install-recommends nodejs \
    && rm -rf /var/lib/apt/lists/*

# ── Python 3.12 via deadsnakes PPA ────────────────────────────────────────────
RUN add-apt-repository ppa:deadsnakes/ppa -y \
    && apt-get update \
    && apt-get install -y --no-install-recommends \
        python3.12 \
        python3.12-venv \
        python3.12-dev \
        python3-pip \
    && update-alternatives --install /usr/bin/python3 python3 /usr/bin/python3.12 1 \
    && update-alternatives --install /usr/bin/python  python  /usr/bin/python3.12 1 \
    && rm -rf /var/lib/apt/lists/*

# uv — fast Python package manager
RUN curl -LsSf https://astral.sh/uv/install.sh | sh
ENV PATH="/root/.cargo/bin:/root/.local/bin:${PATH}"

# ── Redis 7 via official Redis PPA ────────────────────────────────────────────
RUN curl -fsSL https://packages.redis.io/gpg | gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg \
    && echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) main" \
        > /etc/apt/sources.list.d/redis.list \
    && apt-get update \
    && apt-get install -y --no-install-recommends redis \
    && rm -rf /var/lib/apt/lists/*

# ── Docker CLI (docker-in-docker) ─────────────────────────────────────────────
RUN curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg \
    && echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" \
        > /etc/apt/sources.list.d/docker.list \
    && apt-get update \
    && apt-get install -y --no-install-recommends docker-ce-cli \
    && rm -rf /var/lib/apt/lists/*

# ── Terraform (latest) via HashiCorp ──────────────────────────────────────────
RUN curl -fsSL https://apt.releases.hashicorp.com/gpg | gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg \
    && echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" \
        > /etc/apt/sources.list.d/hashicorp.list \
    && apt-get update \
    && apt-get install -y --no-install-recommends terraform \
    && rm -rf /var/lib/apt/lists/*

# ── Swift 6.1 via swift.org Linux installer ───────────────────────────────────
# Noble (24.04) Swift 6.1 release tarball
ARG SWIFT_VERSION=6.1
ARG SWIFT_PLATFORM=ubuntu24.04
ARG SWIFT_ARCH=x86_64
ARG SWIFT_TAG=swift-${SWIFT_VERSION}-RELEASE
ARG SWIFT_URL=https://download.swift.org/${SWIFT_TAG}-${SWIFT_PLATFORM}/${SWIFT_TAG}-${SWIFT_PLATFORM}.tar.gz

RUN curl -fsSL "${SWIFT_URL}" -o /tmp/swift.tar.gz \
    && curl -fsSL "${SWIFT_URL}.sig" -o /tmp/swift.tar.gz.sig \
    && tar -xzf /tmp/swift.tar.gz -C /opt \
    && mv "/opt/${SWIFT_TAG}-${SWIFT_PLATFORM}" /opt/swift \
    && rm /tmp/swift.tar.gz /tmp/swift.tar.gz.sig

ENV PATH="/opt/swift/usr/bin:${PATH}"
# swiftly (swift.org/install/linux/swiftly) is NOT used here — Docker containers
# use direct tarball installs for layer-cache efficiency. swiftly is for native
# WSL2 dev environments only (@see vendor/swift/swift.org/install/linux/swiftly.md).

# ── Claude Code CLI ───────────────────────────────────────────────────────────
# OAuth-only: ANTHROPIC_API_KEY must NOT be set. Auth is via CLAUDE_CODE_OAUTH_TOKEN.
RUN npm install -g @anthropic-ai/claude-code

# ── Runtime stage ─────────────────────────────────────────────────────────────
FROM base AS runtime

WORKDIR /workspace

# Convenient fd symlink (Ubuntu ships fd-find as fdfind)
RUN ln -sf /usr/bin/fdfind /usr/local/bin/fd

# Default: drop into bash with a useful prompt
ENV PS1='\[\033[01;32m\]ke-dev\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\$ '

CMD ["bash"]
