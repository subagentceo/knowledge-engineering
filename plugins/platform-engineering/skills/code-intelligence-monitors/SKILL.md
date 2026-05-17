---
name: code-intelligence-monitors
description: >
  Declare a Claude Code plugin Monitor (`monitors/monitors.json`) that
  listens for PR/issue/CI events and dispatches a local handler. Use
  when wiring an event-driven workflow into a plugin, when an existing
  monitor isn't firing, or when designing the local handler shape for
  a GitHub-triggered routine (the trigger itself stays web-UI-only per
  the routines spec; the monitor declares what runs locally).
license: Apache-2.0
compatibility: Designed for Claude Code v2.1.105+ which introduced the Monitor primitive. GitHub-event routing requires a parallel web-UI configuration in claude.ai/code/routines (see operator runbook docs/operator-runbooks/github-event-routine-setup.md).
metadata:
  author: alex-jadecli
  version: "0.1.0"
---

# When to invoke

- Wiring a PR/issue/CI event listener into a plugin
- An existing monitor isn't firing (debug declaration vs trigger)
- Designing the local handler shape for a GitHub-triggered routine
- Auditing monitors for security-posture compliance (no
  `secret_scanning_*` references — GoogleOSV-only per ADR OSL1)

# Shape of `monitors/monitors.json`

Per `vendor/anthropics/code.claude.com/docs/en/remote-control.md`
(Monitor §), a plugin's `monitors/monitors.json` lives one level
below the plugin root. It declares an array of monitor specs:

```json
{
  "monitors": [
    {
      "id": "gh-pr-open",
      "description": "Run the github-repo-security-review skill on every new PR opened in the org.",
      "event": "github.pull_request",
      "filter": { "action": "opened" },
      "handler": {
        "type": "skill",
        "name": "github-repo-security-review"
      }
    }
  ]
}
```

# Trigger vs handler

Per `vendor/anthropics/code.claude.com/docs/en/routines.md` §218,
GitHub-source triggers are configured **in the web UI only** at
`https://claude.ai/code/routines`. The plugin's `monitors.json`
declares the **local handler** — what runs when a routine fires.
Operator runbook for the web-UI side:
`docs/operator-runbooks/github-event-routine-setup.md`.

# Security invariants (ADR OSL1)

A monitor's declaration **MUST NOT** request:

- `secret_scanning` / `secret_scanning_push_protection` enable
- `dependabot_security_updates` enable
- Any other GitHub Advanced Security toggle

The chassis uses **GoogleOSV** for vuln scanning, not GitHub's native
toolset (cheaper). `scripts/verify-security-posture.ts` will fail the
verify chain if any monitor or workflow re-enables these.

# Failure modes

- **Monitor declared but not firing**: trigger not yet wired in the
  web UI. Run the operator runbook.
- **Handler skill not found**: skill ID must match one registered in
  the plugin's `plugin.json` `skills` list.
- **Filter too narrow**: `filter: { action: "opened" }` only fires on
  the `opened` action. Drop the filter for all actions on the event.

# Citations

- `vendor/anthropics/code.claude.com/docs/en/remote-control.md`
- `vendor/anthropics/code.claude.com/docs/en/routines.md` (§218 web-UI triggers)
- `vendor/anthropics/code.claude.com/docs/en/monitoring-usage.md`
- `docs/decisions/2026-05-16-osv-only-no-secret-scanning.md` (OSL1)
- `docs/operator-runbooks/github-event-routine-setup.md`
