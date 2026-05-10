---
phase: 12
title: Bridge as a Connector (long-arc)
status: deferred
---

# Phase 12 — Bridge as a Connector

Cites `vendor/anthropics/claude.com/docs/connectors/building.md`.
Out-of-scope for the merge that completes Phases 0-11; tracked here so the
rubric set is complete.

## Criteria

### 1. Connector manifest validates

- A connector manifest at `infra/connector/manifest.json` validates against
  the schema in the cited doc.

### 2. Installable in claude.ai and Claude Code clients

- Following the cited doc's install steps surfaces the bridge's tools in
  the client's tool list.

### 3. OAuth flow honored

- The connector inherits `CLAUDE_CODE_OAUTH_TOKEN` from the parent client;
  no separate API key is required.

## Status

All criteria marked **deferred** until a future PR.
