# claude-code subprocessor

Platform matrix and container entrypoint for running Claude Code as a subprocessor across WSL2, macOS, and Linux targets.

## Files

| File | Purpose |
|---|---|
| `matrix.yaml` | Per-platform binary requirements, OAuth posture, shell setup snippets |
| `docker-entrypoint.sh` | Container entrypoint — validates OAuth env, sources nvm, execs CMD |

## matrix.yaml

Documents which binaries and environment setup steps are required for `claude` (Claude Code CLI) to work on each platform:

- `wsl2-ubuntu-22.04` — Jammy LTS, supported
- `wsl2-ubuntu-24.04` — Noble LTS, **primary** (matches `infra/wsl2/Dockerfile`)
- `wsl2-ubuntu-26.04` — Plucky (future)
- `macos-arm64` — Apple Silicon, supported
- `macos-x86_64` — Intel Mac, supported
- `linux-x86_64` — CI runners / bare metal, supported

All platforms enforce OAuth-only posture: `ANTHROPIC_API_KEY` must NOT be set; `CLAUDE_CODE_OAUTH_TOKEN` must be present.

## docker-entrypoint.sh

Used as the `ENTRYPOINT` for subprocessor containers derived from `infra/wsl2/Dockerfile`:

```dockerfile
COPY infra/claude-code-subprocessor/docker-entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["bash"]
```

Run with OAuth token:

```bash
docker run --rm \
  -e CLAUDE_CODE_OAUTH_TOKEN="${CLAUDE_CODE_OAUTH_TOKEN}" \
  ke-dev \
  claude --version
```

## See also

- `infra/wsl2/Dockerfile` — primary WSL2/Docker build (Ubuntu 24.04 + CUDA 12.4.1)
- `infra/wsl2/README.md` — full WSL2 setup guide
- `enterprise-mirror/setup.sh` — macOS entry point
- `src/oauth/token.ts` — OAuth gate (fails closed on ANTHROPIC_API_KEY)
