# @cite enterprise-mirror/bootstrap-wsl.sh
# @cite docs/firehose/triage-2026-06-04.md (t13-1)
FROM ubuntu:24.04

ENV DEBIAN_FRONTEND=noninteractive \
    DOCKER_HOST=npipe:////./pipe/dockerDesktopLinuxEngine \
    NODE_ENV=development

# Base tooling + ripgrep
RUN apt-get update && apt-get install -y --no-install-recommends \
      ca-certificates \
      curl \
      git \
      jq \
      build-essential \
      ripgrep \
      lsb-release \
      gnupg \
      software-properties-common \
    && rm -rf /var/lib/apt/lists/*

# Node.js 22 LTS — NodeSource apt repo
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y --no-install-recommends nodejs \
    && rm -rf /var/lib/apt/lists/*

# Python 3.12 — deadsnakes PPA
RUN add-apt-repository ppa:deadsnakes/ppa -y \
    && apt-get update \
    && apt-get install -y --no-install-recommends \
         python3.12 \
         python3.12-venv \
         python3-pip \
    && update-alternatives --install /usr/bin/python3 python3 /usr/bin/python3.12 10 \
    && rm -rf /var/lib/apt/lists/*

# Redis 7 — official Ubuntu 24.04 package ships redis 7.x
RUN apt-get update && apt-get install -y --no-install-recommends redis-server \
    && rm -rf /var/lib/apt/lists/*

# Docker CE CLI — docker.com apt repo (cli only; daemon is Docker Desktop on the host)
RUN install -m 0755 -d /etc/apt/keyrings \
    && curl -fsSL https://download.docker.com/linux/ubuntu/gpg \
         -o /etc/apt/keyrings/docker.asc \
    && chmod a+r /etc/apt/keyrings/docker.asc \
    && echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] \
         https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" \
         > /etc/apt/sources.list.d/docker.list \
    && apt-get update \
    && apt-get install -y --no-install-recommends docker-ce-cli \
    && rm -rf /var/lib/apt/lists/*

# Tailscale — official pinned install script
RUN curl -fsSL https://pkgs.tailscale.com/stable/ubuntu/noble.noarmor.gpg \
         -o /usr/share/keyrings/tailscale-archive-keyring.gpg \
    && curl -fsSL https://pkgs.tailscale.com/stable/ubuntu/noble.tailscale-keyring.list \
         -o /etc/apt/sources.list.d/tailscale.list \
    && apt-get update \
    && apt-get install -y --no-install-recommends tailscale \
    && rm -rf /var/lib/apt/lists/*

# npm global: tsx (TypeScript runner, used by the knowledge-engineering chassis)
RUN npm install -g tsx

# Non-root user
RUN useradd -m -s /bin/bash alexzh \
    && usermod -aG docker alexzh 2>/dev/null || true

WORKDIR /home/alexzh/knowledge-engineering

EXPOSE 6379

USER alexzh

CMD ["/bin/bash"]
