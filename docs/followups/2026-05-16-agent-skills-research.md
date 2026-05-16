---
date: 2026-05-16
status: research
owner: agent
outcome_id: OKWP-FUTURE-2
---

# Research — Agent Skills ecosystem + proposed architecture for knowledge-work-profiles / knowledge-work-routines

Operator gave 12 reference repos and asked for a proposed
architecture. Not implementation — proposal only, deferred to the
follow-up PR string.

## What I found (one-line per repo, sourced from each repo's README)

| Repo | Format | What it is | Install path |
|---|---|---|---|
| [`redis/agent-skills`](https://github.com/redis/agent-skills) | Agent Skills | Redis development best practices: data structures, vector search, caching | `npx skills add redis/agent-skills` |
| [`neondatabase/agent-skills`](https://github.com/neondatabase/agent-skills) | Agent Skills | Neon Serverless Postgres skills, branches, queries | `SKILL.md` entry per skill |
| [`cloudflare/skills`](https://github.com/cloudflare/skills) | Agent Skills | Workers, Agents SDK, Developer Platform | `/plugin marketplace add cloudflare/skills` (Claude Code marketplace) |
| [`agentskills/agentskills`](https://github.com/agentskills/agentskills) | spec + SDK | **Open format spec maintained by Anthropic** at [agentskills.io](https://agentskills.io) | reference SDK |
| [`hashicorp/agent-skills`](https://github.com/hashicorp/agent-skills) | Agent Skills | Terraform + Packer skills + Claude Code plugins | `npx skills add hashicorp/agent-skills` |
| [`atlassian/atlassian-mcp-server`](https://github.com/atlassian/atlassian-mcp-server) | MCP server | Rovo MCP for Jira, Confluence, Compass with OAuth 2.1 or API token | MCP client config |
| Atlassian [TWG CLI agent skills](https://developer.atlassian.com/cloud/twg-cli/agents/skills/) | TWG CLI Beta | Atlassian-side agent skills (Beta) | docs only |
| [`anthropics/knowledge-work-plugins`](https://github.com/anthropics/knowledge-work-plugins) `/small-business` | Claude Code plugin | 15 skills + 15 workflows + router for SMB tasks | `claude plugin install small-business@knowledge-work-plugins` |
| [`anthropics/financial-services`](https://github.com/anthropics/financial-services) | Plugin **and** Managed Agent | Pitch Agent, Market Researcher, GL Reconciler — same prompt, two runtimes | Cowork plugin or `/v1/agents` |
| [`anthropics/claude-for-legal`](https://github.com/anthropics/claude-for-legal) | Plugin + Managed Agent | In-house/firm/legal practice plugins + cookbooks | same |
| [`anthropics/claude-plugins-official`](https://github.com/anthropics/claude-plugins-official) | Plugin marketplace | curated directory; `/plugins` (internal) + `/external_plugins` | `/plugin install <name>@claude-plugins-official` |
| [`anthropics/claude-cookbooks`](https://github.com/anthropics/claude-cookbooks) | tutorials | API examples and integration patterns | reference docs |
| [`gruntwork-io/terragrunt`](https://github.com/gruntwork-io/terragrunt) | Terraform orchestrator | OpenTofu/Terraform at scale | adjacent infra primitive, not a skill |

## Three patterns visible across the ecosystem

The references fall into three distinct architectures, often mixed in
one repo:

### Pattern A — Agent Skills (the open format)

A folder per skill, each with a `SKILL.md` frontmatter (name +
description), discoverable by any agent that supports the spec. The
canonical spec is `agentskills/agentskills`, maintained by Anthropic
but open-format. Installed via `npx skills add <repo>` or the
Claude Code plugin marketplace. **This is what `redis/agent-skills`,
`neondatabase/agent-skills`, `cloudflare/skills`,
`hashicorp/agent-skills` all are**, and what
`knowledge-engineering/.claude/skills/` already follows for its
4 existing skills (heartbeat, refresh-vendors, routines,
schedule-bridge, plus the new refresh-claude-oauth in PR #171).

### Pattern B — Claude Code plugin (marketplace package)

A bundle that combines skills + slash commands + MCP servers + a
router prompt. Installed as a single unit via
`claude plugin install <name>@<marketplace>`. The
`anthropics/knowledge-work-plugins/small-business` plugin is the
clearest reference — 15 skills + 15 workflows + plain-English
router, all installed in one shot. Pattern B is *Pattern A composed*
with the runtime affordances Claude Code adds (commands, MCP wire-up).

### Pattern C — Cowork plugin **and** Managed Agent (dual deploy)

The vertical Anthropic plugins (`financial-services`,
`claude-for-legal`) ship the *same* system prompt + skills in two
runtimes: interactive Cowork plugin **and** programmatic Managed
Agents API (`/v1/agents`). One source, two delivery surfaces. This
is the architectural ambition for repos that target a real customer
vertical, not just a tool integration.

## Proposed architecture for our two new repos

Map the three patterns onto the two new repos:

### `subagentceo/knowledge-work-profiles`

**Pattern A + Pattern B mix.** Hosts:

1. Docker MCP Toolkit profile exports (`profiles/*.yaml`) — the
   first concrete artifact, starting with the operator's existing
   `platform-engineering` profile from `~/.docker/mcp/`.
2. Cloud-env setup scripts (the AlloyDB Omni + Redis decomposition
   in [`2026-05-16-alloydb-omni-cloud-env.md`](./2026-05-16-alloydb-omni-cloud-env.md))
   organized by profile name. Each profile owns its setup script,
   SessionStart hook, service-start script, and env-var contract.
3. Optional: a Claude Code plugin manifest
   (`.claude-plugin/plugin.json`) so the entire repo installs in one
   `claude plugin install knowledge-work-profiles@subagentceo` and
   exposes each profile as a discoverable skill.

**Why Pattern A first**: matches what redis/neon/cloudflare/hashicorp
all chose, and the Anthropic Skills spec is the openness commitment
that future-proofs this against Claude Code / Codex / Cursor
divergence.

**Why Pattern B optional**: if you want one-command install, the
plugin manifest is ~15 lines on top. If you don't, raw skills still
install via `npx skills add subagentceo/knowledge-work-profiles`.

### `subagentceo/knowledge-work-routines`

**Pattern A + Pattern C eventually.** Hosts:

1. Routine manifest YAMLs — one per routine, parsed by the
   `src/lib/schemas/routine.ts` schema landed in PR #169. Each
   manifest names the cron / run_once_at / GitHub trigger, the
   prompt, the source repos, the environment, and required MCP
   connectors.
2. A `manifests/` directory mirrors the live routines via
   `gh api /v1/code/triggers` export tooling (deferred).
3. **Pattern C aspiration**: each routine is ALSO a Managed Agent
   spec when stable. The `/v1/agents` runtime can host the same
   prompt + tool surface that the claude.ai Routine fires on. Single
   source, two delivery surfaces — same dual-deploy story as
   `claude-for-legal`. This depends on Managed Agents being
   appropriate for the routine; many routines (e.g. the CI-fix
   routine the operator wanted earlier) stay routine-only.

### Cross-cutting

- Both repos publish via `npx skills add subagentceo/<repo>` (Pattern A
  free), and optionally via `claude plugin install <name>@subagentceo`
  (Pattern B free).
- Each repo carries its own `.claude/settings.json` per the polyrepo
  ADR (`docs/decisions/2026-05-16-polyrepo-sibling-pattern.md`).
- Cowork plugin packaging is not a near-term goal; the repos start
  Pattern A and graduate to Pattern B when there's user demand.

## Future follow-ups (post PR string)

- **Adopt the Agent Skills spec frontmatter exactly** in our existing
  `.claude/skills/*/SKILL.md` files. They're close but check against
  [agentskills.io/specification](https://agentskills.io/specification).
- **Vendor `terragrunt` into the `vendor/` mirror** if and when this
  repo's terraform setup grows beyond the current single-module
  shape. Terragrunt is an infra primitive, not a skill — orthogonal
  but referenced.
- **Mirror `claude-cookbooks` integration patterns** into our
  `src/examples/` if the operator wants reference implementations
  beyond the current 5 examples (prompt-caching, tool-caching, etc.).
- **Atlassian MCP connector**: separate from `knowledge-work-profiles`
  but plausibly profile-attached. If a profile names Atlassian in its
  `mcp_connections`, the profile YAML references the upstream
  `atlassian/atlassian-mcp-server` image.

## What this proposal explicitly does NOT do

- Does not start `knowledge-work-profiles` or `knowledge-work-routines`
  in this PR. Those are PRs 4 and 7 in the string per the ADR.
- Does not adopt Pattern B (plugin manifest) on day one. Pattern A
  ships first.
- Does not commit to Pattern C (Managed Agent dual-deploy). That's an
  aspiration once a routine is stable enough to warrant it.

## Citations

- [`agentskills/agentskills`](https://github.com/agentskills/agentskills) — open format spec
- [`agentskills.io`](https://agentskills.io) — canonical site
- [`anthropics/skills`](https://github.com/anthropics/skills) — Anthropic's reference examples
- [`anthropics/knowledge-work-plugins`](https://github.com/anthropics/knowledge-work-plugins) — closest analog repo name; explicit prior art
- ADR for sibling repos: [`docs/decisions/2026-05-16-polyrepo-sibling-pattern.md`](../decisions/2026-05-16-polyrepo-sibling-pattern.md)
- AlloyDB Omni follow-up: [`2026-05-16-alloydb-omni-cloud-env.md`](./2026-05-16-alloydb-omni-cloud-env.md)
