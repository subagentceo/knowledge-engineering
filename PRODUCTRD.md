# PRODUCTRD — Knowledge-Engineering Starter Chassis

A Product Requirements Document for positioning this repo as a forkable
starter chassis for solo founders building AI products on the Claude Agent
SDK.

---

## 1. One-line summary

A multi-agent research chassis — orchestrator, researcher, and verifier —
that solo founders fork to ship a Claude-powered product in weeks instead of
quarters, with OAuth-only billing, an MCP-tool-as-knowledge-substrate pattern,
and a CI-shaped verify ladder baked in.

## 2. Problem

Solo founders building AI startups in 2026 hit four predictable walls in
the first 30 days:

1. **Bill blowups.** Accidental `ANTHROPIC_API_KEY` fallback or uncached
   prompts during dev push monthly spend past the founder's budget before
   the first paying customer arrives.
2. **Hallucinated outputs.** Single-agent loops produce confident-but-wrong
   answers; users churn on the first bad response.
3. **Knowledge-integration boilerplate.** Wiring custom data (docs, tickets,
   logs, registries) into Claude via MCP is a multi-week side quest before
   any product work happens.
4. **Ship-vs-experiment drift.** No CI, no release pipeline, no docs site →
   demos work, production doesn't.

A solo founder shouldn't spend their first month writing OAuth gates, MCP
plumbing, planner state machines, and a verify ladder. They should spend it
on their domain.

## 3. Target user

- Solo or two-person technical founder.
- Building a Claude-powered product (research assistant, support automation,
  code agent, knowledge-synthesis tool, etc.).
- Pre-revenue or early-revenue, on a Claude Max plan.
- TypeScript-comfortable; happy with ESM + Node ≥ 20.
- Wants the founder's own identity to back all model calls during build-out
  (single-tenant by design — see §5 N1).

## 4. Goals & non-goals

### Goals

| ID | Goal |
|---|---|
| G1 | Forkable in under 1 hour to a domain-specific MCP topology. |
| G2 | First end-to-end agent run (research + verify) within day-1 of forking. |
| G3 | Predictable, capped monthly Claude bill via OAuth-only gate plus prompt-cache and tool-cache idioms. |
| G4 | One-command `npm run verify` proves a commit is shippable. |
| G5 | Docs site, release pipeline, and IaC skeleton ready on day-1. |

### Non-goals

| ID | Non-goal |
|---|---|
| N1 | Multi-tenant SaaS plumbing (end-user auth, billing, per-customer DB). The OAuth-only stance is single-tenant on purpose. |
| N2 | Non-Claude model support. Single-vendor by design. |
| N3 | Replacing the Claude Agent SDK. This is a chassis on top of it. |
| N4 | End-user-facing OAuth flows. The founder's identity backs every call until they front the chassis with their own server. |

## 5. User stories

- As a founder, I `git clone`, replace four files under `src/mcp/lanes/`,
  and within an hour my own MCP tools are exposed via stdio and answer
  queries from the orchestrator.
- As a founder, I never want to wake up to a runaway API bill —
  `ANTHROPIC_API_KEY` being set in any environment must crash the process
  before a single token is sent.
- As a founder, I want every research answer to be graded by a
  separate-context verifier against a rubric I can edit (`docs/rubric.md`).
- As a founder, I want `npm run verify` to be the one command that proves
  a commit is shippable — MCP servers boot, planner invariants hold,
  Terraform validates.
- As a founder, I want a Mintlify docs site and release-please changelog
  without writing the config myself.
- As a founder, I want strict-mode bash bootstrap scripts for any new agent
  "team" I add, with transcript URLs printed on every exit.

## 6. Functional requirements

### 6.1 OAuth-only auth gate (`src/oauth/token.ts`)

- FR-OAUTH-1: `requireOAuth()` MUST throw if `ANTHROPIC_API_KEY` is set.
- FR-OAUTH-2: `requireOAuth()` MUST accept `CLAUDE_CODE_OAUTH_TOKEN` (env)
  or `CLAUDE_CODE_SESSION_INHERIT=1` (CLI session).
- FR-OAUTH-3: A strict subset `assertOAuthOnly()` MUST be available for
  modules that don't need a token but must guarantee no API-key fallback.
- FR-OAUTH-4: Every entry point in `src/agent/`, `src/examples/`, and
  `scripts/` MUST call one of these gates before any model call.

### 6.2 MCP servers (high-level `McpServer.tool()` API)

- FR-MCP-1: Two stdio MCP servers MUST be shipped:
  - `bridge-server` exposing 12 tools across 4 lanes
    (`engineering_*`, `blog_*`, `support_*`, `llms_*`).
  - `npm-registry` exposing 4 tools
    (`npm_org_packages`, `npm_package_metadata`, `npm_downloads`, `npm_search`).
- FR-MCP-2: All tool inputs MUST be Zod-typed.
- FR-MCP-3: Adding a new lane MUST be a single-file change under
  `src/mcp/lanes/` plus one composition line in `bridge-server.ts`.
- FR-MCP-4: Both servers MUST pass a `tools/list` smoke test via
  `@modelcontextprotocol/inspector`-shaped JSON-RPC.

### 6.3 Orchestrator topology (`src/agent/run.ts`)

- FR-ORCH-1: A single orchestrator MUST delegate primary research to a
  `npm-research` sub-agent restricted to `npm-registry` tools.
- FR-ORCH-2: After research, a `verifier` sub-agent restricted to
  `knowledge-bridge` tools MUST grade the output against `docs/rubric.md`.
- FR-ORCH-3: Each sub-agent MUST run in a separate context window.
- FR-ORCH-4: Seed prompts (`seeds/prompts/*.md`) MUST be the single source
  of truth for sub-agent system messages.

### 6.4 Planner (`src/agent/planning.ts`)

- FR-PLAN-1: Planner MUST emit `TodoWrite` in headless mode, `TaskCreate`
  and `TaskUpdate` in interactive mode.
- FR-PLAN-2: Loop and schedule steps MUST dispatch via `SlashCommand`
  (`/loop`, `/schedule`).
- FR-PLAN-3: At most one step MAY be `in_progress` at any time
  (`enforceSinglyInProgress`).

### 6.5 Verify ladder (`scripts/`, `package.json`)

- FR-VER-1: `npm run verify:mcp` MUST start each MCP server, send
  `tools/list`, and assert the expected tool count.
- FR-VER-2: `npm run verify:planner` MUST exercise both modes and assert
  emission contracts.
- FR-VER-3: `npm run verify:tf` MUST run `terraform validate` and `plan`
  with no apply path.
- FR-VER-4: `npm run verify` MUST chain all of the above.

### 6.6 Cost-saving example library (`src/examples/`)

- FR-EX-1: Working examples for `prompt-caching`, `tool-caching`,
  `citations`, `programmatic-tool-loop`, and `deep-links` MUST exist and
  be runnable individually.
- FR-EX-2: All examples MUST flow through the OAuth gate; none MAY read
  `ANTHROPIC_API_KEY`.

### 6.7 Docs, release, and IaC

- FR-DOC-1: A Mintlify-renderable site MUST live under `docs/` with at
  least architecture, quickstart, rubric, and per-lane index pages.
- FR-DOC-2: `release-please` MUST be wired so conventional-commit messages
  generate `CHANGELOG.md` and version bumps automatically.
- FR-DOC-3: `infra/terraform/` MUST contain a Cloudflare-zone skeleton
  pinned via `CLOUDFLARE_TERRAFORM_PROVIDER_VERSION`, with `validate` +
  `plan` only — no `apply`.

### 6.8 Team scaffold pattern (`.claude/agents/teams/`)

- FR-TEAM-1: A team scaffold MUST consist of at minimum a `setup.sh`
  bootstrap and a `CONVENTIONS.md` file.
- FR-TEAM-2: `setup.sh` MUST be strict-mode bash (`set -euo pipefail`,
  `IFS=$'\n\t'`).
- FR-TEAM-3: `setup.sh` MUST print the transcript URL on every exit (success
  or failure) by rewriting `cse_*` → `session_*` from
  `CLAUDE_CODE_REMOTE_SESSION_ID`.

## 7. Non-functional requirements

| ID | Requirement |
|---|---|
| NFR-1 | Strict TypeScript (`tsc --noEmit` clean), ESM, Node ≥ 20. |
| NFR-2 | Stdio MCP servers only — no HTTP server to operate or secure. |
| NFR-3 | Caching examples MUST demonstrate ≥ 50% token reduction on a repeat run with identical prefix. |
| NFR-4 | First clone-to-green-`npm run verify` in under 5 minutes on a clean machine. |
| NFR-5 | Zero secrets committed; `.gitignore` covers `.env`, Terraform state, and provider plugins. |
| NFR-6 | All sub-agent topology decisions MUST be inspectable from a single file (`src/agent/run.ts`). |

## 8. Success metrics

| Metric | Target |
|---|---|
| Time-to-first-customized-MCP-tool after fork | < 1 hour |
| Time-to-first-`verify`-green after fork | < 1 day |
| Monthly Claude spend variance (founder solo use) | < 10% (capped by Max plan) |
| Verify-ladder pass rate on `main` | > 95% |
| Verifier-rubric agreement with founder-graded sample | > 80% |
| Active examples runnable end-to-end with one command | 5 of 5 |

## 9. Risks & open questions

| ID | Risk / question |
|---|---|
| R1 | OAuth-only gate is single-tenant. The day a customer hits the agent, the founder MUST front it with a server holding the OAuth identity, or relax the gate. PRD assumes single-tenant build-out only. |
| R2 | Lanes are hard-coded to Anthropic-owned surfaces. Founders MUST rewrite `src/mcp/lanes/*` to point at their domain (Notion, Linear, Stripe, internal wiki). The chassis pattern survives the swap; the content does not. |
| R3 | `@anthropic-ai/claude-agent-sdk` ships a native binary. Container/serverless deploys MUST include the right per-platform binary, or `pathToClaudeCodeExecutable` must be set. |
| R4 | The verifier is only as good as `docs/rubric.md`. Founders MUST treat the rubric as a first-class artifact and version it alongside code. |
| R5 | Cloudflare IaC ships as a skeleton. Real resources (records, workers, rulesets) require credentials at plan time, which today's `verify:tf` does not exercise. |
| R6 | Open: should the chassis ship a "fronting server" template (HTTP API in front of the orchestrator with per-customer auth) so founders can take it to production without rewriting the gate? Out of v1 scope; track for v2. |

## 10. Out-of-the-box inventory

What a founder gets the moment they `git clone`:

| Capability | Path |
|---|---|
| OAuth-only gate | `src/oauth/token.ts` |
| Four-lane bridge MCP server | `src/mcp/bridge-server.ts`, `src/mcp/lanes/*.ts` |
| npm-registry MCP server | `src/mcp/npm-registry/server.ts`, `tools/*.ts` |
| Orchestrator + sub-agents | `src/agent/run.ts`, `seeds/prompts/*.md` |
| Planner with `/loop` and `/schedule` | `src/agent/planning.ts`, `src/agent/todo-tracker.ts` |
| Cost-saving example recipes | `src/examples/{prompt,tool}-caching.ts`, `citations.ts`, `programmatic-tool-loop.ts`, `deep-links.ts` |
| Verify ladder | `scripts/verify.ts`, `scripts/verify-planner.ts`, `package.json` scripts |
| Mintlify docs site | `docs/` |
| Cloudflare IaC skeleton | `infra/terraform/` |
| release-please pipeline | `release-please-config.json`, `.github/workflows/release-please.yml` |
| Team scaffold pattern | `.claude/agents/teams/data_science_and_analytics/` |

## 11. Out of scope (explicit cut-list)

- End-user authentication (OAuth, JWT, sessions).
- Per-customer billing or usage metering.
- Database schema, migrations, ORMs.
- Frontend / UI.
- Vector store or embedding pipeline (use MCP tools to delegate to one).
- Non-Claude model adapters.
- HTTP-transport MCP servers (stdio only in v1).

## 12. Acceptance criteria (v1)

A v1 release of this chassis is shippable when:

- [ ] All FR-* items pass.
- [ ] All NFR-* items hold under `npm run verify` on Node 20 and 22.
- [ ] A founder can fork, replace one lane, and re-run `verify` green in
      under 60 minutes (timed walkthrough in `docs/quickstart.md`).
- [ ] The five examples all execute end-to-end with a real OAuth token.
- [ ] `release-please` cuts a 0.1.0 → 0.2.0 bump from a single
      conventional commit.
