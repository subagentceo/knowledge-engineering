# Cowork platform facts — reconciliation with the agent hierarchy

> Grounding the architecture against the **official Claude Cowork support docs** (mirrored under
> `vendor/`). What's validated, and the corrections. Companion to `agent-hierarchy.md`.
>
> @cite vendor/support-claude-sitemap/10543793-claude-cowork/ (the Claude Cowork collection)
> @cite vendor/claude-sitemap/support/en/articles/14477985-monitor-claude-cowork-activity-with-opentelemetry.md
> @cite vendor/claude-sitemap/support/en/articles/14447276-configure-a-custom-opentelemetry-collector-for-office-agents.md
> @cite https://trust.anthropic.com (Cowork desktop security architecture overview)

## Two execution environments (validated)

```yaml
native_agent_loop:        # runs on the device
  runs: [conversation, file read/write in connected folders, web fetch, local plugin MCP servers]
  gated_by: "app-layer permission system — connected-folder rules + org network egress"
isolated_vm:              # the sandbox
  runs: [shell commands, any code Claude writes]
  isolation: "Apple Virtualization.framework (macOS) / Hyper-V (Windows); own egress filter, syscall limits, per-session user"
  on_failure: "file + web tools keep working; shell/code report 'workspace unavailable' until the VM recovers"
```

This is the split we operated under all session: the **~2 GB VM** (e2m doc §10) is the isolated code VM;
local MCP and `.mcpb` (support-claude-docs) run in the **native loop**, not the VM. EDR cannot inspect
inside the VM by design — a fact the compliance/3p story must account for.

## Observability — the correction (OTel-first, not Sentry-first)

**Cowork activity is NOT in audit logs, the Compliance API, or data exports.** Anthropic's official
monitoring path is **OpenTelemetry** (article 14477985; custom collector 14447276). So the durability
design adjusts:

```yaml
observability_chain:                    # was: Sentry-first
  canonical: "OpenTelemetry — the only official Cowork telemetry (no audit logs / Compliance API / exports)"
  reuse: "src/mcp/lanes/telemetry.ts + usage-telemetry.ts (the repo's OTel lane); vendor/opentelemetry"
  errors: "Sentry ingests the OTLP error spans (Sentry speaks OTLP) — the error sink, not the source of truth"
  alerts: "escalate → operator.jsonl → iMessage (unchanged)"
```

`agent-hierarchy.md` §durability is updated accordingly: **OTel is the telemetry backbone; Sentry is the
error sink fed by OTLP.** This matters for the enterprise/3p story — an acquirer's compliance team monitors
Cowork via OTel (to a custom collector), because audit logs/Compliance API don't capture it.

## Live artifacts (validated — that's what we built)

The `session-memory` + `cowork-sessions-index` artifacts ARE Cowork **live artifacts**: persistent HTML in
the "Live artifacts" tab, version-history, reopen/refresh from any session. Two doc facts worth flagging:

- "Live artifacts use your connectors **without asking**." **Ours are self-contained** (data embedded
  inline, zero connector calls), so that risk does not apply — a deliberate, safer choice.
- Local-only, not shareable yet, no cloud sync — so the memory stores live on this Mac, consistent with
  the device-stored memory + the durable L1/L2/L3 stack.

## Projects ↔ managers (validated)

Cowork **Projects** = task workspaces with their own files, context, instructions, **memory** (scoped to
the project), and **scheduled tasks**. That is exactly the **manager tier**:

- a `<domain>-manager` maps to a Cowork **project** (its outcomes + scheduled tasks + project-scoped memory).
- the `session-memory` skill's per-project memory = Cowork project memory (device-stored, scoped).
- managers run as the project's **scheduled tasks** (the nightly cadence) — **not** the native Dispatch
  (1p-only; absent on 3P — see agent-hierarchy.md provider-portability).

## MDM / managed-device controls (for the 3p/enterprise rollout)

```yaml
mdm:
  isLocalDevMcpEnabled: "false → disables plugin-bundled + locally configured MCP servers"
  isDesktopExtensionEnabled: "false → blocks MCPB/DXT extension servers"
  org_toggle: "Organization settings > Cowork (Enable) — gates Cowork at all"
impact: "on a managed enterprise device an admin can disable local MCP / the support-claude-docs .mcpb; plan the 3p rollout assuming these may be off — keep remote-MCP fallbacks."
```

## Computer-use tool order (validated)

Cowork picks the most precise tool first: **connectors → browser (Claude in Chrome) → screen interaction**
— the exact tiering our tooling guidance follows. Computer use is Pro/Max-only, research preview, **not on
Team/Enterprise** — another 1p/3p portability gotcha to record alongside Dispatch.

## Net

The platform docs **validate** the four-tier hierarchy, the project↔manager mapping, the live-artifact
memory stores, and the two-environment split. The one substantive change: **observability is
OpenTelemetry-first** (Cowork isn't in audit logs), with Sentry as the OTLP error sink — already a repo
primitive (`src/mcp/lanes/telemetry.ts`). No reinvention.
