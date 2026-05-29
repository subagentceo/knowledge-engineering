# Devcontainer for the subagentmcp enterprise mirror.
# Debian-based so `gh` installs via apt (the official path). This is the "web"
# service in docker-compose.yml; redis 7.0 + postgres 16 run as sidecars.
FROM mcr.microsoft.com/devcontainers/base:debian-12

# ── GitHub CLI via apt (official repo) ────────────────────────────────────────
RUN install -d -m 755 /etc/apt/keyrings \
 && curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg \
      -o /etc/apt/keyrings/githubcli-archive-keyring.gpg \
 && chmod go+r /etc/apt/keyrings/githubcli-archive-keyring.gpg \
 && echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" \
      > /etc/apt/sources.list.d/github-cli.list \
 && apt-get update \
 && apt-get install -y --no-install-recommends \
      gh \
      jq \
      git \
      python3 \
      python3-pip \
      postgresql-client \
      redis-tools \
      ca-certificates \
      curl \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /workspace
