---
phase: 8
title: Cloudflare Sandbox hosting (full deploy)
status: stub
---

# Phase 8 — Cloudflare Sandbox hosting

Builds on the Phase 0g scaffold and brings the runner to a deployed state.
Operator-side Neon Console + Cloudflare secret sync must complete first.

## Criteria

### 1. End-to-end local run

- `npm run sandbox:dev` accepts a POST to `/run` and returns the same
  orchestrator output as `npm run dev` locally.
- The sandbox runs `claude` with `CLAUDE_CODE_OAUTH_TOKEN` only — no
  `ANTHROPIC_API_KEY`.

### 2. Outbound allowlist enforced

- Outbound to `evil.example` is blocked.
- Outbound to `api.anthropic.com` succeeds.

### 3. Cloudflare `.md` rules tested

- `cloudflareIndexMd("https://developers.cloudflare.com/sandbox/tutorials/claude-code/")`
  returns `.../claude-code/index.md`.
- The validator throws `CloudflareNonMarkdownError` on a `text/html` response
  from any cloudflare URL.

### 4. Deployed Worker

- `wrangler deploy` succeeds.
- `wrangler secret list` shows `NEON_API_KEY`, `NEON_PROJECT_ID`,
  `GITHUB_TOKEN`, `CLAUDE_CODE_OAUTH_TOKEN` — and not `ANTHROPIC_API_KEY`.
