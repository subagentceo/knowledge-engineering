# infra/cloudflare/Dockerfile
#
# Cloudflare Sandbox container image for Full-Stack Cloud Agent runs.
# Cited from vendor/anthropics/neon.com/guides/cloudflare-sandbox-neon-branching.md.
#
# OAuth substitution applies: Claude Code CLI is invoked with
# CLAUDE_CODE_OAUTH_TOKEN forwarded by the Worker (see src/worker.ts
# sanitizeEnv). ANTHROPIC_API_KEY is never forwarded.

# Per https://developers.cloudflare.com/sandbox/configuration/dockerfile/:
# "Always match the Docker image version to your npm package version."
# 2026-05-15: pinned to 0.10.1 to match @cloudflare/sandbox@^0.10.1 in
# package.json. `latest` is not published for cloudflare/sandbox; verified
# 2026-05-15 against https://hub.docker.com/v2/repositories/cloudflare/sandbox/tags.
FROM docker.io/cloudflare/sandbox:0.10.1

# gh CLI for PR creation; git is already in the base image.
USER root
RUN apt-get update \
 && apt-get install -y --no-install-recommends curl ca-certificates gnupg \
 && curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg \
      | gpg --dearmor -o /usr/share/keyrings/githubcli-archive-keyring.gpg \
 && chmod go+r /usr/share/keyrings/githubcli-archive-keyring.gpg \
 && echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" \
      > /etc/apt/sources.list.d/github-cli.list \
 && apt-get update \
 && apt-get install -y --no-install-recommends gh \
 && rm -rf /var/lib/apt/lists/*

# Claude Code CLI. The CLI honors CLAUDE_CODE_OAUTH_TOKEN for auth, which is
# the substitution path the operator posture mandates over the cited guide's
# ANTHROPIC_API_KEY directive.
RUN npm install -g @anthropic-ai/claude-code

# Verify the substitution works at build time: the binary should fail loudly
# when neither auth path is present, but should accept CLAUDE_CODE_OAUTH_TOKEN.
# We do not hard-fail the build here because the runtime env is set per-task
# by the Worker; build-time only confirms the binary is on PATH.
RUN which claude && claude --version
