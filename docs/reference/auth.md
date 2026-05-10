---
title: OAuth-only auth
description: Why this stack refuses API-key auth, and how to provide an OAuth token.
---

## Outcome

The agent runs only when an OAuth credential is present. API-key auth is
explicitly rejected, including the implicit fallback the Anthropic SDK does
when `ANTHROPIC_API_KEY` is set.

## Provide a token

Either:

```bash
# 1. mint a long-lived OAuth token (recommended for headless runs)
claude setup-token
export CLAUDE_CODE_OAUTH_TOKEN=...
```

or:

```bash
# 2. inherit the active interactive session
claude login
export CLAUDE_CODE_SESSION_INHERIT=1
```

Then:

```bash
npm run build
npm run dev -- "Across the four bridges, what's been said about MCP?"
```

## What the gate enforces

`src/oauth/token.ts`:

- Throws if `ANTHROPIC_API_KEY` is set (no silent fallback).
- Throws if neither `CLAUDE_CODE_OAUTH_TOKEN` nor
  `CLAUDE_CODE_SESSION_INHERIT=1` is provided.
- Logs the token source to stderr (`env` or `cli-session`) when accepted.

The MCP server itself runs over stdio and does not authenticate the
transport — that's a property of stdio IPC. OAuth-only applies to the
agent's upstream calls to Anthropic.
