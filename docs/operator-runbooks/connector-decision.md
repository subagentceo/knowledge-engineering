---
runbook: connector-decision
outcome: Phase 12 ship-as-Connector decision recorded (yes / no / postpone)
unblocks: Phase 12 implementation OR closes Phase 12 deferred
operator-manual-steps: reading + decision only (no browser action)
---

# Runbook: Phase 12 connector decision

Cited from:
- `vendor/anthropics/claude.com/docs/connectors/building.md` — Connector spec
- `seeds/citations/connectors-building.md` — extract
- `rubrics/phase-12.md`

## Decision framing

Phase 12 (long-arc) ships the `knowledge-bridge` MCP server as a
**Connector** for use in claude.ai and Claude Code clients without
local install. The cited doc describes:

- Building a custom MCP server (the bridge already exists at
  `dist/mcp/bridge-server.js`)
- Transport options (stdio for local; SSE/HTTP for remote)
- **Authentication** — "the most common stumbling block"
- **Hosting** — "Platforms like Cloudflare offer remote MCP server
  hosting with autoscaling and OAuth management"

## Three paths

| Path | Operator effort | Outcome |
|---|---|---|
| **Yes — ship publicly** | high: marketing surface, support burden, license decisions | Anyone with claude.ai or Claude Code can install the bridge as a Connector and get all 16 tools + the local mirror |
| **Yes — ship privately** | medium: hosting only, no marketing | Only the operator (and authorized teammates) can use the remote bridge. Cloudflare hosts behind operator's OAuth. |
| **No / postpone** | none | Bridge stays local (current state). The 16 tools work for the operator + sub-agents via `mcp__knowledge-bridge__*` already. |

## Recommendation

**Postpone** unless the operator has a concrete external audience.

Reasoning:
1. The bridge's value today is the **local vendor mirror** (~286 .md
   files committed). A remote Connector would need to either
   (a) ship the mirror as a hosted artifact (complex; bandwidth cost), or
   (b) drop the mirror in favor of live HTTP (defeats the purpose).
2. **Auth complexity**: the operator's posture is OAuth-only via
   `CLAUDE_CODE_OAUTH_TOKEN`. Connectors typically use a separate
   OAuth flow tied to the Connector's app registration — a different
   identity than the operator's Claude Code session.
3. **No external demand signal yet.** Phase 12 was scaffolded for
   future-proofing; nothing concrete depends on it.

If postponing: close issue #16 with a "deferred — no audience" comment.

## If proceeding (yes — public or private)

The follow-up implementation would land in a future PR labeled
`phase:12-impl`. Scope:

1. `infra/connector/manifest.json` — Connector manifest per the cited
   spec.
2. Hosting: deploy `infra/cloudflare/` as a remote MCP server (or
   reuse the Phase 8 cloud-agent Worker as the host).
3. OAuth flow: implement the Connector's three-legged OAuth against
   the operator's identity provider (NOT `CLAUDE_CODE_OAUTH_TOKEN`).
4. Tests: install the Connector in a fresh claude.ai session;
   verify all 16 tools surface and the local mirror is reachable.

## Why this isn't a Claude-in-Chrome runbook

The decision is a strategic one, not a browser-driven task. There's
no UI to click — the operator reads the framing above and records the
decision in issue #16's comment.

## Action

After deciding, the operator (or an authorized teammate) comments on
issue #16 with one of:

- `decision: postpone — no audience` (close issue)
- `decision: ship private — OAuth flow against <provider>` (keep open;
   open phase-12-impl PR)
- `decision: ship public — proceed` (keep open; phase-12-impl PR
   includes marketplace listing + license review)
