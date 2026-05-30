# Reference: Rovo-tool-catalog API + MCP-orchestrator blueprint (claude-in-chrome, unvetted)

> **Provenance & status.** These two artifacts were produced by a _claude-in-chrome_
> agent that did **not** examine this repository. They are idea-level starting
> points, saved for mining — **not** an accepted design. The decomposition below
> reconciles them against what already exists here. Implement only the extracted,
> repo-aware items, never the blueprint as-is.

## Decomposition — useful vs. already-exists

### Reality check (the blueprint ignored all of this)

| Blueprint proposes                                            | Already in this repo                                                                                                                                | Verdict                                                                                              |
| ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `schema/models.py` + `schema/models.ts` (new top-level dir)  | `src/agent/team/subagent-schema.ts` (zod) + `src/agent/cowork/team_models.py` (pydantic mirror) — the real shared contract                          | **Reuse existing.** A parallel `schema/` would be a second source of truth.                          |
| `apps/Orchestrator/` SwiftUI app                             | `apps/agent-orchestrator/Sources/AgentOrchestrator/{Model,Store,Views,AgentOrchestratorApp}.swift` + Tests                                          | **Already shipped (PR #295).** Blueprint's app is a lesser duplicate.                                |
| Swift polls FastAPI `/v1/orchestration` for a live snapshot  | `emit-view.ts` writes `apps/agent-orchestrator/view.json` (keys: `team, tasks, sessions, workflows, generatedAt`); the app reads that file          | **Different, simpler, OAuth-safe transport.** Keep file-emit; FastAPI is optional.                   |
| `mcp/profiles/{client}.yaml` + `gen_client_config.py`        | `.mcp/profiles/` (repo) + `subagentmcp-platform-github/.mcp/` (org)                                                                                 | **Partially exists.** The per-client-profile _pattern_ is the net-new, useful idea.                  |
| FastAPI control plane (`control-plane/app.py`)               | `docs/decisions/2026-05-16-enterprise-control-plane.md` (ADR) — no FastAPI service                                                                  | **Net-new IF wanted.** Conflicts with OAuth-only + Cloudflare-Worker posture; needs scrutiny.       |
| `ANTHROPIC_API_KEY` / `x-api-key` auth middleware            | **FORBIDDEN** — OAuth-only invariant (`src/oauth/token.ts`)                                                                                         | **Reject outright.**                                                                                 |

### Genuinely useful ideas to extract (repo-aware)

1. **List-envelope + pagination convention** — `{ data, has_more, first_id, last_id }`, a `request-id` header, `limit`/`after_id` query params. Canonical shape for any new list endpoint or collection-returning MCP tool; matches the Claude API style the repo already cites. Candidate for a `docs/CONVENTIONS.md` subsection.
2. **`check_access` permission-gate** modeling the Rovo tool tiers (interactive / read-only / write-delete). Maps to the real Atlassian MCP permission tiers and the repo's `.claude/settings.json` `permissions.allow`. Useful as a _validator_ (is this tool call within an allowed set?), not a served API.
3. **Per-surface MCP profile taxonomy** — Desktop=broad-read (Atlassian, Notion, Memory, Brave, Wikipedia); CLI=repo-centric (Filesystem, Git, GitHub, Sequential-Thinking); devcontainer=pinned CLI toolset (+context7); JetBrains=observability/quality (SonarQube, Grafana, Dynatrace). Clean documentation of which servers each Claude surface enables; ties into the container-parity work.
4. **OpenAPI/zod/pydantic/Swift type-sync** — the _principle_ is already half-real via the zod+pydantic mirror; the Swift `Codable` structs are the third leg. A `gen` step asserting the three stay structurally identical is a real win — built on the EXISTING `subagent-schema.ts` / `team_models.py`, not a new `schema/`.
5. **`docker-outside-of-docker` devcontainer feature** to reach the host Docker MCP gateway without re-auth — concrete detail for the VS Code parity surface.

### Reject / ignore

- The parallel `schema/` directory (duplicate source of truth).
- The duplicate `apps/Orchestrator/` app (we have `apps/agent-orchestrator/`).
- Any `ANTHROPIC_API_KEY` / `x-api-key` middleware (OAuth-only violation).
- A FastAPI server as the _primary_ control plane (conflicts with the Worker + file-emit posture) — revisit only if a live multi-client telemetry feed is genuinely needed.

---

## Artifact 1 — Rovo tool catalog as a RESTful API (verbatim, unvetted)

FastAPI/Pydantic backend (paginated list, get-by-id, `check_access`) + a TypeScript Zod client. **Contains `anthropic-version`/`x-api-key`-style auth which is FORBIDDEN here.**

API surface:

```
GET  /v1/tools                 list tools (query: permission, limit, after_id)
GET  /v1/tools/{tool_id}       retrieve one tool
POST /v1/tools/check_access    check whether a tool is allowed under a permission set
```

List envelope: `{ data, has_more, first_id, last_id }` + a `request-id` header.

The 19 Rovo tools span three permission tiers: **interactive** (create/update/get/search/transition issue), **read-only** (current-user, ARI fetch, accessible-resources, link-types, remote-links, field-metadata, issue-types, transitions, projects, lookup-users, Rovo search), **write-delete** (add-comment, worklog, create-issue-link). The full Pydantic + Zod source is preserved in the originating session transcript; only the extracted conventions above are load-bearing.

## Artifact 2 — knowledge-engineering MCP-orchestrator blueprint (verbatim, unvetted)

Premise: "one shared schema describes MCP clients, Docker toolkit profiles, and live agent state; a FastAPI control plane + per-client config generators + a SwiftUI visualizer all read that one contract."

Proposed (duplicative) layout: `schema/{models.py,models.ts}`, `control-plane/app.py`, `mcp/profiles/*.yaml` + `gen_client_config.py`, `.devcontainer/`, `apps/Orchestrator/`.

Proposed enums (overlap the real `subagent-schema.ts` — reconcile, don't re-add): `ClientStatus` (assigned/connected/download_required/disconnected), `Surface` (desktop/cli/devcontainer/ide/other), `AgentState` (idle/planning/running/waiting_tool/blocked/done/error).

The full FastAPI + Pydantic + Zod + Swift source is preserved in the originating session transcript.

## Live Jira projects (browser-verified this session)

`subagentceo.atlassian.net` has **3 projects** (lead: Alex Zhouk):

| Name                                    | Key     | Type                    |
| --------------------------------------- | ------- | ----------------------- |
| managedsubagents                        | MSA     | Team-managed software   |
| opensubagents                           | OP      | Company-managed software |
| `subagentceo__knowledge-engineering__`  | SCRUM   | Team-managed software   |

The SCRUM project is the one to rename → **KENG** per [the branch-topology runbook](../operator-runbooks/jira-key-rename-and-github-integration.md).
