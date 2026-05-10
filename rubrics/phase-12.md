---
phase: 12
title: Bridge as a Connector (long-arc)
status: deferred-pending-operator-decision
issue: 16
prs:
  - 31  # this PR (closeout/scaffold)
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

All criteria marked **deferred** until operator decision.

## Phase 12 closeout: runbooks + issues

Per the operator's autonomy directive ("instead of putting the ownership
on the operator fully, dogfood the documentation available to come up
with solutions"), Phase 12's closeout decomposes ALL remaining items
into individual GitHub issues, each backed by a
[`docs/operator-runbooks/`](../docs/operator-runbooks/README.md)
Claude-in-Chrome paste-prompt:

- 6 operator-side runbooks (CF token, CF account/var, Voyage key, Code
  scanning, GH PAT + setup scripts, Connector decision)
- 4 autonomous-follow-up issues (Phase 2.B, 6.B, 7.B, 11.B)

The runbooks honor `vendor/anthropics/code.claude.com/docs/en/chrome.md`:
the agent acts as the operator's authenticated identity, never bypasses
auth, pauses for 2FA/CAPTCHA, and never logs secrets to chat output.
