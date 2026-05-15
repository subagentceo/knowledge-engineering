# Plan: Crawl-and-mirror 12-vendor llms.txt + code-execution-with-MCP runtime + Cloudflare Sandbox hosting

## Context

`src/mcp/lanes/*.ts` hard-codes a `BASE` constant and a curated array per lane (`KNOWN_COLLECTIONS`, `NAMESPACES`) as the URL allowlist. Adding a new vendor is a 4-place code edit. There's no offline mode — every fetch is live HTTP. `src/agent/run.ts` also passes the full bridge tool list (12 names) plus the npm-registry tool list (4 names) into each sub-agent's `tools: [...]` allowlist, exposing every tool definition into context up front.

The user wants:
1. A `vendor/` directory at the repo root, one folder per vendor across 12 vendors (anthropics, arkose-labs, brave-search, cloudflare, intercom, modelcontextprotocol, neon, sentry, sift, stripe, turbopuffer, twilio).
2. **Each vendor's `llms.txt` is crawled with [crawlee](https://crawlee.dev/), and every linked markdown file is saved locally with the URL path mirrored as the directory structure** (e.g. `https://docs.stripe.com/api/charges` → `vendor/stripe/docs.stripe.com/api/charges.md`).
3. Crawled bodies committed to git (intentional repo growth — full state in PRs, offline-deterministic).
4. Bridge MCP server reads **local-first, HTTP fallback** at runtime.
5. Refresh is **both** an on-demand `npm run crawl:vendors` script and a `/schedule` template that drives weekly recrawls via the existing planner.
6. For the 5 vendors I previously believed lacked an llms.txt (brave-search, intercom, sift, arkose-labs, sentry), the user says they're "likely available — try finding them yourself" → the crawler runs an llms.txt discovery probe (common paths) before falling back.
7. **Adopt the Code Execution with MCP pattern** (Anthropic engineering blog + Cloudflare's `@cloudflare/codemode`). Present MCP tools as a TypeScript filesystem tree (`servers/<name>/<tool>.ts`) so the agent imports only what it needs and processes intermediate results in the execution environment instead of through the model's context window.
8. **Host the agent on Cloudflare Sandbox** (`@cloudflare/sandbox` + `@cloudflare/codemode` + `DynamicWorkerExecutor`) per the Anthropic *Hosting the Agent SDK* guide's Pattern 1 (Ephemeral Sessions) and the Cloudflare *Run Claude Code on a Sandbox* tutorial.
9. **Install `anthropics/claude-plugins-official`** (the user's "claude-official-plugins" — actual repo name) as a pluggable skill source, plus `anthropics/knowledge-work-plugins` and `anthropics/claude-plugins-community`.
10. **Discover sources via GH GraphQL** for `anthropics/*` and `modelcontextprotocol/*` so vendor configs and plugin lists are derived from live repo metadata, not hand-curated lists.
11. **Hard rule for `developers.cloudflare.com`**: append `/index.md` if missing — never the HTML or JavaScript form. Encoded as a first-class transform with a validator that rejects non-`.md` Cloudflare responses at runtime.

The intended outcome: declarative URL governance backed by a committed local mirror; an agent runtime that loads tool defs on demand and runs intermediate logic in a sandbox; a plugin layer that pulls Anthropic-managed skills; and a discovery layer that keeps it all in sync with upstream. New vendor = drop a folder + run `crawl:vendors`. New plugin = bump `.claude/plugins.json`. Bridge runs offline; agent runs in an ephemeral sandbox per task.

## Operator posture (this PR's working agreement)

The operator prompt for this PR is committed verbatim as `seeds/prompts/operator-2026-05-10.md` in Phase 0 and treated as a **starting point, not a spec**. The plan adopts the disciplines below and refines them as cited Anthropic / Claude Code / MCP docs are ingested one at a time.

### Auth and scope
- **OAuth only** (`CLAUDE_CODE_OAUTH_TOKEN` via existing `src/oauth/token.ts`). `ANTHROPIC_API_KEY` must never be set; the gate fails closed when it is.
- **Not** building Managed Agents and **not** calling the Managed Agents API. We **do** ingest the managed-agents documentation and reuse its rubric/outcome pattern via the Messages API (over OAuth).

### Working discipline
- **Commit-per-todo / per-subtask / per-task.** Each `TodoWrite` transition `in_progress → completed` triggers a commit. Each subtask completion is a commit. Each task completion is a commit. Atomic blast radius; PR diff readable per stride.
- **No one-shotting.** Multi-turn agent loop with prompt caching (existing `src/examples/{prompt-caching,tool-caching}.ts`) and sub-agent task assignments. Each sub-agent call has a measurable outcome before context is compacted.
- **ODD + TDD + Citations.** Every new test file ships with a citation header referencing source docs via the Citations API surface (existing `src/examples/citations.ts`). Header schema:
  ```ts
  /** @cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md#create-a-rubric */
  /** @cite vendor/anthropics/code.claude.com/docs/en/agent-sdk/slash-commands.md#routines */
  ```
  CI guard `verify:citations` parses test files and rejects any test missing a `@cite` header that resolves to a real path under `vendor/`.
- **Operator prompts are seeds.** When a directive in the operator prompt conflicts with a cited doc, the cited doc wins and the conflict is logged in the PR description.

### `/routines` slash command (umbrella over `/loop` + `/schedule`)
Single skill at `.claude/skills/routines.md`. `/routines run "<expr>"` dispatches to `/loop` or `/schedule` based on whether `<expr>` is an interval (e.g. `5m`) or a cron-style recurrence (e.g. `every Monday 09:00`). Existing `.claude/loop.md` and `.claude/skills/schedule-bridge.md` are kept; `routines.md` is the user-facing surface that emits one or the other. Cites `vendor/anthropics/code.claude.com/docs/en/commands.md` and `vendor/anthropics/code.claude.com/docs/en/agent-sdk/slash-commands.md`.

### Doc ingestion: `.md`-first rule for the three Claude hosts
We extend the existing `cloudflare-index-md` hard rule to three more hosts that publish authoritative `.md`:

| Host | Rule |
|---|---|
| `developers.cloudflare.com` | append `/index.md` if no extension |
| `code.claude.com` | append `.md` to path; reject `text/html` responses |
| `platform.claude.com` | append `.md` to path; reject `text/html` responses |
| `claude.com/docs` | append `.md` to path; reject `text/html` responses |

The transforms table grows by one new value `anthropic-mdfirst` covering the three Claude hosts. Validator rejects any non-`text/markdown` body.

### Per-doc ingestion loop (one URL per turn, one commit per doc)
The operator prompt lists 9 URLs to ingest. They are pulled **one per turn** in Phase 0c, committed individually, and decomposed into `seeds/citations/<slug>.md` (header tree + plan-relevant pull quotes). Per-doc commit message: `chore(citations): pull <slug>.md and extract headers`.

| URL | Local path | Drives plan section |
|---|---|---|
| `platform.claude.com/docs/en/managed-agents/define-outcomes.md` | `vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md` | ODD/rubric layer (Phase 9) |
| `platform.claude.com/docs/en/managed-agents/multi-agent.md` | … | sub-agent decomposition (Phase 10) |
| `platform.claude.com/docs/en/build-with-claude/batch-processing.md` | … | batched grading (Phase 11) |
| `platform.claude.com/docs/en/build-with-claude/embeddings.md` | … | optional semantic `vendor_grep` (Phase 11) |
| `platform.claude.com/docs/en/agents-and-tools/tool-use/code-execution-tool.md` | … | comparison: built-in code-exec tool vs `@cloudflare/codemode` |
| `platform.claude.com/docs/en/agents-and-tools/tool-use/build-a-tool-using-agent.md` | … | meta-pattern for `gen:servers` |
| `platform.claude.com/docs/en/agents-and-tools/tool-use/programmatic-tool-calling.md` | … | core citation for Phase 6 codemode |
| `code.claude.com/docs/en/commands.md` | … | `/routines` skill |
| `code.claude.com/docs/en/agent-sdk/slash-commands.md` | … | `/routines` skill |
| `claude.com/docs/connectors/building.md` | … | bridge-as-connector (long-arc) |
| `neon.com/guides/cloudflare-sandbox-neon-branching.md` | `vendor/anthropics/neon.com/guides/cloudflare-sandbox-neon-branching.md` | Full-Stack Cloud Agent runner (Phase 0g) |

### Outcome-driven development (ODD) applied to phases
Every phase from Phase 0 onward ships `rubrics/phase-<N>.md` modeled on the schema in `define-outcomes.md` (cited from the operator's pasted excerpt: "Structure the rubric as explicit, gradeable criteria"). Example:

```markdown
# Phase 6 — Codemode Layer Rubric

## servers/ tree generated
- A file exists at `servers/<server>/<tool>.ts` for each tool exposed by `tools/list`
- Re-running `gen:servers` produces a zero-diff tree

## search_tools tool registered
- `tools/list` returns a 16th tool named `search_tools`
- Input schema accepts `{ query: string, detail: "name" | "name+description" | "full" }`

## codemode wiring
- `src/agent/run.ts` declares `tools: ["codemode", "search_tools"]` for both sub-agents
- A representative 5-turn run shows ≥40% reduction in tool-definition tokens vs Phase 5 baseline (asserted in test)
```

Grading is mechanical (**no** Managed Agents API): `scripts/grade-phase.ts` reads the rubric, runs the phase's tests, and emits a per-criterion pass/fail report. For prose-only criteria, it falls back to a Messages API call (OAuth, fresh context per `define-outcomes.md`'s "separate context window to avoid being influenced"). PR cannot merge until the rubric for the touched phase is satisfied.

### Session-start posture XML
The operator prompt is decomposed into `seeds/posture/session-start.xml` in Phase 0b. This file is loaded by `src/agent/run.ts` as a system-prompt prefix, encoding load-bearing directives as XML primitives:

```xml
<posture>
  <auth oauth-only="true" key="CLAUDE_CODE_OAUTH_TOKEN" forbid="ANTHROPIC_API_KEY"/>
  <discipline>
    <commit-per>todo subtask task</commit-per>
    <odd-tdd-citations required="true"/>
    <multi-turn-only/>
  </discipline>
  <routines alias="/loop /schedule"/>
  <execution>
    <codemode runtime="@cloudflare/codemode"/>
    <sandbox provider="@cloudflare/sandbox" pattern="ephemeral"/>
    <long-arc>workers-resident agents</long-arc>
  </execution>
  <sources>
    <doc ref="vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md"/>
    <!-- nine more entries -->
  </sources>
</posture>
```

### Long-arc goal: Workers-resident agents writing the codebase
Per the publicly-documented Boris Cherny pattern (Anthropic), a sufficiently scaffolded agent system can write 100% of a codebase. The trajectory:

1. **Today.** Bridge MCP server + orchestrator running locally; tools curated by hand.
2. **PR 3 (this plan).** Phase 0 ships the working agreement, the cited-doc seeds, the rubric stubs, the `/routines` skill, **and the Full-Stack Cloud Agent runner scaffolding** (Cloudflare Sandbox + Neon branching, per the cited Neon guide). The runner is wired but not exercised against real PRs in this merge.
3. **Future PR.** Relocate the orchestrator into a Cloudflare Worker (Durable Object) that wakes on Cron Triggers; vendor mirror hydrates from R2; the agent writes 100% of new code by reading rubrics and opening PRs against itself. The Neon-branched DB lets the agent run migrations and tests without risk to staging/production. **This is Boris Cherny's subagent-loop-and-routines pattern operationalized:** routines (`/loop`, `/schedule`) drive scheduled work; sub-agent decomposition gates each iteration on a rubric.

Documented in `docs/architecture.md` as a future direction; the Phase 0 runner scaffolding is the first concrete step toward it.

## Full-Stack Cloud Agents: Cloudflare Sandbox + Neon Database Branching

**Citation:** `vendor/anthropics/neon.com/guides/cloudflare-sandbox-neon-branching.md` (added to the Phase 0c per-doc ingestion list as the 11th URL).

The cited guide describes a Cloudflare Worker that, per task, (a) creates a Neon branch (ephemeral data), (b) launches a Cloudflare Sandbox (ephemeral compute), (c) clones the target repo into the sandbox, (d) runs Claude Code with the branch's `DATABASE_URL` injected, (e) commits and pushes to a per-task git branch, (f) opens a PR via `gh`, (g) returns the PR URL. The Neon branch is copy-on-write: production-like data, isolated per agent, deletable on PR merge.

### Conflict with operator posture (resolved in favor of OAuth)

The cited Neon guide sets `ANTHROPIC_API_KEY` inside the sandbox via `sandbox.setEnvVars({ ANTHROPIC_API_KEY: env.ANTHROPIC_API_KEY, ... })`. **This conflicts with our operator posture's hard rule that `ANTHROPIC_API_KEY` is never set.** Per the posture clause "the cited doc wins and the conflict is logged" — but the operator posture is itself a *prior cited operator directive*. When two operator directives conflict, the more restrictive auth posture wins. Resolution:

- **Substitute `CLAUDE_CODE_OAUTH_TOKEN` for `ANTHROPIC_API_KEY` in `sandbox.setEnvVars()`.**
- The Claude Code CLI (`@anthropic-ai/claude-code`, installed in the sandbox per the guide's Dockerfile) honors `CLAUDE_CODE_OAUTH_TOKEN` for auth (existing pattern in `src/oauth/token.ts`).
- Verification: the Phase 0 rubric for the runner includes "executing `claude` inside the sandbox with only `CLAUDE_CODE_OAUTH_TOKEN` set produces a successful authenticated turn," and "setting `ANTHROPIC_API_KEY` in the sandbox is rejected by a Worker-side env-sanitizer before any sandbox call."
- The conflict is documented verbatim in `docs/architecture.md#cloud-agents` and in this PR's body.

### Architecture (per the Neon guide, OAuth-substituted)

```
POST /run { repoUrl, task }
        │
        ▼
[ Cloudflare Worker: src/worker.ts ]
        │
        ├── env-sanitize (reject ANTHROPIC_API_KEY)
        ├── createNeonBranch(NEON_PROJECT_ID, agentId) → DATABASE_URL
        ├── getSandbox(env.Sandbox, sessionId)
        ├── sandbox.exec("git clone ...")
        ├── sandbox.exec("git checkout -b agentId")
        ├── sandbox.setEnvVars({
        │     CLAUDE_CODE_OAUTH_TOKEN: env.CLAUDE_CODE_OAUTH_TOKEN,  // not API key
        │     DATABASE_URL,
        │     IS_SANDBOX: "1"
        │   })
        ├── sandbox.exec("claude --dangerously-skip-permissions -p '<task>'")
        ├── sandbox.exec("git add . && git commit -m '...'")
        ├── sandbox.exec("git push origin agentId")
        ├── sandbox.exec("gh pr create ...")
        └── return { agentId, databaseUrl, prUrl }
```

### Self-setup via Neon's Claude / GitHub integration

Per operator instruction, configure OAuth and Cloudflare via Neon's repository-level GitHub integration on `subagentceo/knowledge-engineering`. This is operator action (the agent cannot drive a browser-based OAuth flow); the plan documents the steps so the operator can perform them once:

1. In the Neon Console (`neon.com`, account `admin@jadecli.com` or `alex@jadecli.com`) → install the Claude integration on the `subagentceo` GitHub org → grant access to `knowledge-engineering`.
2. The integration provisions a project-scoped Neon API key, captures the project ID, and uploads both as Cloudflare Worker secrets via Cloudflare's API (operator must authorize the Cloudflare side).
3. Result: `wrangler secret list` on the Worker shows `NEON_API_KEY`, `NEON_PROJECT_ID`, `GITHUB_TOKEN`, `CLAUDE_CODE_OAUTH_TOKEN` — no `ANTHROPIC_API_KEY`.
4. The Phase 0 rubric for the runner includes a `setup-check` script that asserts the four expected secrets exist and `ANTHROPIC_API_KEY` does not.

### Operator account ledger

The operator runs two GitHub accounts on the `subagentceo` org with admin on the following services. Connectors for these services should be registered first; `@cloudflare/codemode` then writes against their generated `servers/<connector>/<tool>.ts` rather than direct tool calls.

| Account | GitHub org access |
|---|---|
| `admin@jadecli.com` | admin on `subagentceo` |
| `alex@jadecli.com` | admin on `subagentceo` |

| Service | Connector role | Already a vendor in this plan? |
|---|---|---|
| `parallel.ai` | (TBD — connector availability check in Phase 0) | No (new) |
| `dash.cloudflare.com` | sandbox host + edge runtime; `@cloudflare/codemode`; existing CF MCP connector | Vendor row added (`developers.cloudflare.com`) |
| `neon.com` | ephemeral DB branches + Neon SDK | Yes (in the 12) |
| `turbopuffer.com` | vector store (future use for embeddings/grep) | Yes (in the 12) |
| `nimbleway.com` | (TBD — connector availability check in Phase 0) | No (new) |
| `ollama.com` | local-model fallback for offline crawl/grade tasks | No (new) |
| `sentry.com` | error monitoring for the runner Worker | Yes (in the 12) |

The three new services (parallel.ai, nimbleway.com, ollama.com) are added to the discovery target list in Phase 7 (GH GraphQL discovery extends to their orgs once we know their canonical GitHub presence). They are **not** added to the 12-vendor crawl list in this PR; that decision is deferred until their llms.txt availability is confirmed.

### Connectors-first development

Per operator instruction: "Connectors pre-built enable more simple development by using code mode for their MCP's once connectors are used." Before any custom MCP server work, register the available pre-built connectors and let `gen:servers` (Phase 6) emit `servers/<connector>/<tool>.ts` for each. Then code-mode programmatic tool calling (Phase 6) is the default path; raw MCP tool calls are reserved for connectors that don't exist yet.

In Phase 0, this means: the Phase 0c per-doc ingestion uses the Cloudflare MCP connector (already loaded in this session) and the GitHub MCP connector (already loaded) for fetches. Only when neither connector covers a URL do we fall back to `curl`.

## Recommended approach

Five lanes total (existing 4 + new `vendor` lane), 15 tools, plus a separate offline crawler that owns the `vendor/` directory.

### Components

1. **`scripts/crawl-vendors.ts` — crawlee-based offline crawler.** Runs against a config table of 12 vendors. Per vendor: discover llms.txt → parse URL list → enqueue → fetch with vendor-specific transform rules → save to local mirror → emit `vendor/<name>/urls.md` index summarizing what was captured.

2. **`vendor/<name>/` — committed local mirror.** Layout:
   ```
   vendor/anthropics/
     llms.txt                          # raw discovered llms.txt, committed
     urls.md                           # auto-generated index (front matter + table)
     crawl.json                        # vendor-specific config (transform rule, allow/deny prefixes, page cap)
     www.anthropic.com/
       engineering/
         built-multi-agent-research-system.md
         ...
     www.claude.com/
       blog/
         ...
       llms.txt                        # nested llms.txt if it exists at this host
     support.claude.com/
       en/
         articles/...
         collections/...
   ```
   The host is the first directory under the vendor; the URL path becomes the file path; missing extensions get `.md`. Trailing-slash URLs become `index.md`.

3. **`src/lib/vendor-manifests.ts` — manifest loader (unchanged shape from the prior plan).** Reads each `vendor/<name>/urls.md` for the runtime allowlist. Auto-generated by the crawler.

4. **`src/lib/vendor-mirror.ts` — URL-to-local-path resolver + local-first read.** Maps a URL to its path under `vendor/<name>/<host>/<path>.md`. Returns local body if present, or `null` for HTTP fallback by the caller. ~50 LOC.

5. **`src/mcp/lanes/vendor.ts` — new lane (3 tools).** `vendor_list`, `vendor_fetch` (local-first → HTTP fallback), `vendor_grep` (local mirror only — that's the whole point of having one). ~120 LOC.

6. **Existing 4 lanes refactored.** Allowlist sourced from `getVendor("anthropics")`. `*_fetch` calls `vendorMirror(url)` first; if missing, falls back to existing `fetchHtml/fetchText`. `*_index`, `*_search`, `llms_grep` prefer the local mirror when present (instant; no HTTP).

7. **`.claude/skills/refresh-vendors.md` — `/schedule` template.** Emits a `/schedule "every Monday at 09:00 run npm run crawl:vendors && commit and PR"` SlashCommand for users who want automated refresh.

### Per-vendor crawl config (`vendor/<name>/crawl.json`)

```json
{
  "name": "stripe",
  "homepage": "https://docs.stripe.com",
  "llms_txt_candidates": [
    "https://docs.stripe.com/llms.txt",
    "https://docs.stripe.com/llms-full.txt"
  ],
  "transform": "append-md-and-accept",
  "allow_prefixes": ["https://docs.stripe.com/"],
  "deny_prefixes": ["https://docs.stripe.com/api-reference/changelog"],
  "page_cap": 200,
  "html_to_markdown": false
}
```

`transform` is one of six known doc-source patterns from the vendor README the user pasted earlier:

| `transform` value | Behavior | Vendors |
|---|---|---|
| `verbatim` | URLs already carry `.md`; fetch as-is | turbopuffer |
| `append-md` | Append `.md` to the URL path | anthropics, modelcontextprotocol |
| `append-md-and-accept` | Append `.md` AND send `Accept: text/markdown` | stripe, twilio, sentry, neon |
| `cloudflare-index-md` | **Hard rule.** For `developers.cloudflare.com`: if path has no extension, append `/index.md`. Never accept HTML/JS responses. Validator rejects non-markdown bodies. | cloudflare |
| `anthropic-mdfirst` | **Hard rule.** For `code.claude.com`, `platform.claude.com`, `claude.com/docs`: append `.md` if no extension; reject `text/html` responses. | anthropics (Claude docs) |
| `accept-only` | Send `Accept: text/markdown`; URL unchanged | (reserved for hosts that negotiate markdown without path rewriting) |
| `html-extract` | Fetch HTML, run [turndown](https://github.com/mixmark-io/turndown) | brave-search, intercom, sift, arkose-labs |
| `auto` | Try `verbatim`, `append-md`, `accept-only`, then `html-extract` in order | discovery default |

### llms.txt discovery probe

For vendors where the canonical URL is unknown (the 5 the user said "are likely available"), the crawler tries each candidate in order and uses the first 200-OK response that contains valid llms.txt content (heading + markdown list of links):

```
https://<vendor>/llms.txt
https://<vendor>/llms-full.txt
https://docs.<vendor>/llms.txt
https://developers.<vendor>/llms.txt
https://www.<vendor>/llms.txt
```

If none match, the crawler falls back to crawling the docs root with `transform: html-extract`, depth=3, page_cap=50, and surfaces a stderr warning recommending the user file a `crawl.json` with hand-set `allow_prefixes`. Discovery results are committed back into `crawl.json.llms_txt` so subsequent runs skip the probe.

## File inventory

### Create

| Path | Purpose |
|---|---|
| `scripts/crawl-vendors.ts` | Crawlee runner. CLI: `npm run crawl:vendors` (all) or `npm run crawl:vendor -- stripe` (one). ~250 LOC. |
| `scripts/lib/llms-txt.ts` | Parser for llms.txt → `{ title, sections: [{ heading, links: [{title, url, blurb?}] }] }`. ~60 LOC. |
| `scripts/lib/url-to-path.ts` | Pure function: URL → mirror path (deterministic, reversible). Shared by crawler and runtime resolver. ~40 LOC. |
| `scripts/lib/transforms.ts` | The six `transform` strategies as functions `(url, body) => { savePath, savedBody }`. Includes turndown for `html-extract`. ~120 LOC. |
| `vendor/README.md` | Decision matrix + navigation, modeled on the user's reference README. |
| `vendor/<name>/crawl.json` | Per-vendor crawl config (12 files). |
| `vendor/<name>/llms.txt` | Discovered llms.txt, committed verbatim (12 files). |
| `vendor/<name>/urls.md` | Auto-generated index: front matter + URL table. Used as the runtime allowlist. |
| `vendor/<name>/<host>/<path>.md` | Crawled bodies. **Hundreds of files per vendor; ~MBs to ~100s of MBs total committed.** |
| `src/lib/vendor-manifests.ts` | Manifest loader (parses `urls.md`). Same shape as prior plan. ~120 LOC. |
| `src/lib/vendor-mirror.ts` | `mirrorLookup(url)` → `string | null` from local disk. Caches stat results. ~50 LOC. |
| `src/mcp/lanes/vendor.ts` | New lane (3 tools). ~120 LOC. |
| `docs/lanes/vendor/index.md` | Mintlify lane doc + "How to add a vendor" walkthrough. |
| `.claude/skills/refresh-vendors.md` | `/schedule` template. |
| `scripts/generate-server-tree.ts` | Emits `servers/<name>/<tool>.ts` from each MCP server's `tools/list`. ~140 LOC. |
| `scripts/discover-sources.ts` | GH GraphQL discovery of `anthropics/*` and `modelcontextprotocol/*`. Writes `seeds/discovered-sources.json`. ~110 LOC. |
| `scripts/install-plugins.ts` | Reads `.claude/plugins.json`; shallow-clones marketplace subtrees into `.claude/plugins/`. ~90 LOC. |
| `scripts/lib/cloudflare-index-md.ts` | URL transformer + non-markdown response validator. ~40 LOC. |
| `servers/<server>/<tool>.ts` | Generated. Thin wrappers around `callMCPTool`. ~16+ files. |
| `servers/_client.ts` | `callMCPTool()` shim — uses `@modelcontextprotocol/sdk` client when invoked outside the SDK loop, or the codemode bridge inside `DynamicWorkerExecutor`. ~80 LOC. |
| `servers/search_tools.ts` | Progressive-disclosure search across `servers/`. ~60 LOC. |
| `seeds/discovered-sources.json` | Output of `discover-sources.ts`. Committed snapshot. |
| `.claude/plugins.json` | Pinned plugin manifest (3 marketplaces + install list). |
| `infra/cloudflare/wrangler.toml` | Sandbox + Worker config; `outbound_service` allowlist; secret bindings for `CLAUDE_CODE_OAUTH_TOKEN`. |
| `infra/cloudflare/src/worker.ts` | Outer Worker: receives task, hydrates sandbox with `vendor/`+`servers/`, runs `ke-agent`, streams output. |
| `infra/cloudflare/Dockerfile` | Sandbox container image: Node 20, the bridge bin, Claude Agent SDK, `@cloudflare/codemode`. |
| `seeds/prompts/operator-2026-05-10.md` | Verbatim operator prompt (Phase 0a). |
| `seeds/posture/session-start.xml` | XML decomposition of the operator prompt; loaded by `src/agent/run.ts` (Phase 0b). |
| `seeds/citations/<slug>.md` | Header tree + plan-relevant pull quotes per ingested doc (Phase 0c). 10 files. |
| `rubrics/phase-<N>.md` | Per-phase rubric (Phase 0d, backfilled in Phase 9). 9 files. |
| `.claude/skills/routines.md` | Umbrella over `/loop` and `/schedule`. Cites `code.claude.com/docs/en/{commands,agent-sdk/slash-commands}.md`. |
| `scripts/grade-phase.ts` | ODD rubric grader. Messages API over OAuth; fresh context per criterion (Phase 9). ~180 LOC. |
| `scripts/lib/citation-guard.ts` | `verify:citations` implementation. Parses `@cite` headers, resolves to `vendor/`, fails on missing. ~50 LOC. |

### Modify

| Path | Change |
|---|---|
| `package.json` | Add deps: `crawlee@^3`, `@crawlee/cheerio@^3`, `turndown@^7`, `@cloudflare/codemode`, `@cloudflare/sandbox`, `@octokit/graphql`. Add scripts: `crawl:vendors`, `crawl:vendor`, `verify:freshness`, `gen:servers`, `discover:sources`, `install:plugins`, `sandbox:dev`, `sandbox:deploy`. Add `"files": ["dist", "vendor", "servers"]` for future publish. |
| `src/agent/run.ts` | Replace per-sub-agent `tools: [...]` allowlists with a single `codemode` tool created via `createCodeTool` from `@cloudflare/codemode/ai`. Each sub-agent gets `codemode` plus `search_tools`. Existing OAuth gate, planner, and seed loading unchanged. |
| `src/mcp/bridge-server.ts` | `loadVendorManifests()` eager-load. Add `registerVendor(server)`. |
| `src/mcp/lanes/anthropic-engineering.ts` | Replace `BASE` with manifest. `engineering_fetch` calls `vendorMirror(url)` first → fallback `fetchHtml`. `engineering_index` reads local mirror's `engineering/` listing if present, falls back to live scrape. |
| `src/mcp/lanes/claude-blog.ts` | Same pattern, `claude.com/blog/` prefix. |
| `src/mcp/lanes/support-claude.ts` | `KNOWN_COLLECTIONS` from manifest. `support_article` does mirror-first, HTTP fallback, with allowlist enforcement. |
| `src/mcp/lanes/llms-txt.ts` | Namespaces from manifest `llms_txt` fields + `surface: llms-txt` rows. `llms_grep` greps the local mirror (huge speedup vs current per-URL fetch). |
| `scripts/verify.ts` | `expected: 12` → `15`. Add `verify:freshness`, `verify:citations`, `verify:rubrics` chained from `verify:mcp`. |
| `seeds/prompts/subagent-verifier.md` | Add `vendor_*` tools. Note that the verifier's research is now local-mirror-backed and faster. |
| `docs/architecture.md` | 4 lanes → 5. Document the offline-crawl + local-first runtime architecture. |
| `README.md` | Update lane count and tool count. Add a "Vendor mirror" section explaining commit-to-git philosophy and `npm run crawl:vendors` workflow. |
| `PRODUCTRD.md` | Update FR-MCP-1 to "15 tools across 5 lanes". Add FR-CRAWL-* requirements section for the offline crawler. |
| `.gitignore` | Add `node_modules/.crawlee-storage/` (crawlee's run state) but NOT vendor/ contents. |
| `.gitattributes` | Optional: mark `vendor/**/*.md` as `linguist-vendored` so GitHub language stats don't drown in vendor docs. |

### Reuse

| Path | Why |
|---|---|
| `src/mcp/bridge-utils.ts` — `fetchText`, `fetchHtml`, `jsonResult` | HTTP fallback path; reused as-is. |
| `src/mcp/bridge-utils.ts` — `normalizeSlug` | Still needed for slug ergonomics in `engineering_fetch` / `blog_fetch`. |
| `src/lib/cache-control.ts`, `src/lib/docs-fetch.ts` | Confirms `src/lib/` as the home for the new manifest + mirror modules. |
| `src/agent/planning.ts` SlashCommand emission | Reused by `.claude/skills/refresh-vendors.md` for the `/schedule` template. |

## Bridge runtime: local-first, HTTP fallback

`vendorMirror(url)` resolves to `vendor/<name>/<host>/<path>.md`:

```ts
export function vendorMirror(url: string): string | null {
  const u = new URL(url);
  for (const [name, manifest] of loadVendorManifests()) {
    if (manifest.urlSet.has(url) || manifest.entries.some(e => url.startsWith(e.url + "/"))) {
      const segments = u.pathname.replace(/\/$/, "/index").split("/").filter(Boolean);
      const last = segments[segments.length - 1];
      if (!last.includes(".")) segments[segments.length - 1] = `${last}.md`;
      const path = resolve(repoRoot, "vendor", name, u.host, ...segments);
      if (existsSync(path)) return readFileSync(path, "utf8");
      return null;
    }
  }
  return null;
}
```

Each `*_fetch` tool calls `vendorMirror(url)` first; if `null`, falls back to `fetchHtml/fetchText`. Stale-mirror is acceptable (caller can recrawl); missing-mirror is acceptable (live HTTP fills the gap).

## Refresh

- **`npm run crawl:vendors`** — crawl all 12.
- **`npm run crawl:vendor -- <name>`** — crawl one.
- **`npm run verify:freshness`** — warn if mirror is older than 14 days. Wired into `verify:mcp` chain (non-fatal warning).
- **`.claude/skills/refresh-vendors.md`** — invoking the skill emits `/schedule "every Monday 09:00 run npm run crawl:vendors and open a PR with the diff"`. Users who want automated refresh activate the skill once.

## Phased implementation order

Each phase ends `npm run verify`-green and **`npm run grade -- phase-<N>` rubric-green** (after Phase 9 lands the grader). **Each phase is its own PR.** **PR 3 ships Phase 0 only** — posture, seeds, citations, rubric stubs, no code-path changes. Phases 1–12 are subsequent PRs, tracked but not blocking this merge.

**Phase 0 — Seed and posture (this PR's full scope).**
1. **0a.** `seeds/prompts/operator-2026-05-10.md` — verbatim copy of the operator prompt that authored this plan. One commit: `chore(seeds): operator prompt 2026-05-10`. SHA-256 of the file logged in commit body so future audits can verify byte-equality.
2. **0b.** `seeds/posture/session-start.xml` — XML decomposition of the operator prompt (auth, discipline, routines, execution, sources). Wired into `src/agent/run.ts` as a system-prompt prefix later in Phase 6; in Phase 0 it's a static artifact only. Commit: `chore(seeds): session-start posture XML`.
3. **0c.** Per-doc hand-fetch ingestion — **the crawler does not exist yet**, so this phase uses a throwaway `scripts/seed-fetch/` directory containing per-doc shell scripts. **Connectors-first** (per operator instruction):
   - **Cloudflare MCP** `search_cloudflare_documentation` for the `developers.cloudflare.com` URL (already used in this plan turn; returns markdown directly).
   - **GitHub MCP** `mcp__github__get_file_contents` when a doc is in a public Anthropic / Neon repo.
   - **`curl`** fallback only when neither connector covers the URL, with the appropriate hard-rule transform applied by hand — append `.md` for `code.claude.com` / `platform.claude.com` / `claude.com/docs`; append `/index.md` for `developers.cloudflare.com`; append `.md` for `neon.com/guides`.
   Each of the **11 URLs** (10 from the operator prompt + the Neon guide cited later in the operator's follow-up) is fetched in its own commit: `chore(citations): pull <slug>.md` + a paired commit `chore(citations): extract headers for <slug>` that emits `seeds/citations/<slug>.md` (H1/H2/H3 tree + plan-relevant pull quotes). 22 commits total. The `scripts/seed-fetch/` directory is deleted in Phase 1 once `crawl-vendors.ts` supersedes it (commit: `chore: remove throwaway seed-fetch scripts`).
4. **0d.** `rubrics/phase-{0..12}.md` directory created with stubs. Each rubric has at least three measurable criteria modeled on `define-outcomes.md#tips-for-writing-effective-rubrics`. Phase 0's own rubric is fully populated and self-graded by hand at the end of this phase.
5. **0e.** `.claude/skills/routines.md` (umbrella over `/loop` + `/schedule`) — added now because it is doc-only, no runtime dependencies. Cites the two ingested `code.claude.com/docs` files.
6. **0f.** `scripts/lib/citation-guard.ts` + `npm run verify:citations` script — wired up; passes trivially since no tests exist yet. Establishes the `@cite` discipline before any test code lands.
7. **0g.** **Full-Stack Cloud Agent runner scaffolding** at `infra/cloudflare/` per the Neon guide (with the OAuth substitution documented above). Files: `wrangler.jsonc` (Containers + Durable Objects bindings), `Dockerfile` (Cloudflare sandbox base image + `gh` CLI + `@anthropic-ai/claude-code`), `src/worker.ts` (the runner with `createNeonBranch` / `cloneRepo` / `runClaude` / `commitChanges` / `pushBranch` / `createPR` per the guide, plus an env-sanitizer that rejects `ANTHROPIC_API_KEY` before any `setEnvVars` call), `.dev.vars.example` (lists required secrets minus secret values), and `package.json` deps for `@neondatabase/api-client` + `@cloudflare/sandbox`. **The runner is scaffolded but not deployed in this PR.** Deployment requires operator action (Neon Console → Claude integration → secrets sync to Cloudflare) which is documented in `docs/architecture.md#cloud-agents`.
8. **0h.** Operator account ledger documented in `docs/architecture.md#accounts` (the table from the Operator posture section above) so future agents know which services have admin access available without re-authenticating.

The outcome of PR 3 is: the operator prompt is a committed seed; the posture XML is committed; **eleven** cited docs (10 from operator prompt + Neon guide) live under `vendor/anthropics/...` with `seeds/citations/<slug>.md` summaries; rubrics for the remaining 12 phases exist as scaffolds; the `/routines` skill is a usable umbrella; **the Full-Stack Cloud Agent runner is scaffolded** under `infra/cloudflare/` (not deployed). **No `src/` runtime changes, no `vendor/<other>/...`, no MCP tool changes.** This makes PR 3 a focused diff that sets the working agreement and prepares the runner for a deploy gated on operator-side Neon/Cloudflare auth.

**Phase 1 — Crawler infrastructure (no MCP wiring, no committed crawl yet).**
1. Add deps (`crawlee`, `@crawlee/cheerio`, `turndown`).
2. Implement `scripts/lib/{llms-txt,url-to-path,transforms}.ts` with unit-style asserts.
3. Implement `scripts/crawl-vendors.ts` with the 12 `crawl.json` configs and llms.txt discovery probe.
4. Run `npm run crawl:vendor -- anthropics` to validate end-to-end on the cleanest case. Inspect output.
5. Don't commit crawl results yet.
6. `npm run verify` still green at 12 tools.

**Phase 2 — Crawl all 12 + commit (the big diff).**
1. Run `npm run crawl:vendors` for all 12.
2. Audit output. For any vendor that fell back to docs-root crawl, manually narrow `crawl.json` allow/deny prefixes.
3. Commit `vendor/` tree (single PR — yes, large). Add `.gitattributes` to mark vendored.
4. `npm run verify` still green; `verify:freshness` reports all-fresh.

**Phase 3 — Manifest loader + new vendor lane (12 → 15 tools).**
1. Create `src/lib/vendor-manifests.ts` and `src/lib/vendor-mirror.ts`.
2. Create `src/mcp/lanes/vendor.ts`.
3. Wire into `bridge-server.ts`. Update `verify.ts` `expected: 15`.
4. Update `seeds/prompts/subagent-verifier.md` and `docs/lanes/vendor/index.md`.
5. `npm run verify` green at 15 tools.

**Phase 4 — Refactor existing 4 lanes to mirror-first.**
1. Migrate each lane: manifest allowlist + `vendorMirror(url)` lookup before HTTP.
2. `llms_grep` rewrites to walk the local mirror (huge speedup).
3. Update prose in `docs/architecture.md`, `README.md`, `PRODUCTRD.md`.
4. `npm run verify` green, same 15 tool names.

**Phase 5 — Refresh ergonomics.**
1. Add `verify:freshness` to `verify:mcp` chain.
2. Add `.claude/skills/refresh-vendors.md`.

**Phase 6 — Code execution with MCP layer.**
1. Implement `scripts/generate-server-tree.ts`. Run it; commit the generated `servers/` tree.
2. Implement `servers/_client.ts` and `servers/search_tools.ts`. Add `search_tools` as the 16th bridge tool (`expected: 15` → `16`).
3. Migrate `src/agent/run.ts`: replace `tools: [...]` arrays with `tools: ["codemode", "search_tools"]`; wire `createCodeTool` from `@cloudflare/codemode/ai`.
4. Update `seeds/prompts/subagent-{npm-research,verifier}.md` to instruct: "Discover tools via `search_tools`. Write code that imports from `./servers/`. Filter results in code before logging."
5. `verify:planner` exercises a codemode-style script in headless mode and asserts the same Plan invariants.

**Phase 7 — Source discovery + plugin marketplace.**
1. Implement `scripts/discover-sources.ts`. Run it; commit `seeds/discovered-sources.json`.
2. Implement `scripts/install-plugins.ts`. Author `.claude/plugins.json` with the 3 Anthropic marketplaces.
3. Cross-check: vendor list ⊆ discovered llms.txt-bearing repos (warn on drift).

**Phase 8 — Cloudflare Sandbox hosting.**
1. Scaffold `infra/cloudflare/` from the `cloudflare/sandbox-sdk/examples/claude-code` template.
2. Author `wrangler.toml` with `outbound_service` allowlist derived from `vendor/<name>/crawl.json.allow_prefixes`.
3. `npm run sandbox:dev` boots the Worker locally; POST a task; assert `ke-agent` runs end-to-end inside the container.
4. `npm run sandbox:deploy` deploys; `wrangler secret put CLAUDE_CODE_OAUTH_TOKEN`.
5. Document Pattern 1 (Ephemeral) in `docs/architecture.md` with a link to `/en/agent-sdk/hosting` and `/sandbox/tutorials/claude-code/index.md`.

**Phase 9 — ODD rubric grader (Messages API, OAuth).**
1. Implement `scripts/grade-phase.ts`. Reads `rubrics/phase-<N>.md`; for each criterion, runs the matching test; for prose-only criteria, makes a Messages API call (OAuth) with a fresh context window per `define-outcomes.md`'s "separate context window to avoid being influenced by the main agent's implementation choices."
2. Output: per-criterion pass/fail report + `iteration` counter (cap at 5 per `define-outcomes.md` defaults).
3. Wire as `npm run grade -- phase-<N>`. Add `verify:rubrics` (runs all rubrics) to the `verify:mcp` chain.
4. Backfill rubrics for Phases 0–8.

**Phase 10 — Multi-agent decomposition refinement.**
1. Cite `multi-agent.md`. Refactor `src/agent/run.ts` agent topology: orchestrator → `npm-research`, `verifier`, plus a third sub-agent `crawl-curator` that owns the per-vendor `crawl.json` audits.
2. Each sub-agent gets one outcome and a citation-cite-required rubric.
3. Same `tools: ["codemode", "search_tools"]` allowlist (no new tool definitions in context).

**Phase 11 — Batched grading + optional embeddings.**
1. **Batch.** Cite `batch-processing.md`. `scripts/grade-phase.ts` collects all prose-only criteria across all rubrics into one Messages Batches API submission. Cuts grading cost ~50% per the docs.
2. **Embeddings (optional, behind a flag).** Cite `embeddings.md`. Build `vendor_grep`'s semantic mode: pre-embed all `vendor/<name>/<host>/<path>.md` bodies (one-time, committed as `vendor/<name>/.embeddings.bin`); query-time, cosine-similarity rank. Falls back to grep when the flag is off.
3. **Code-execution-tool comparison.** Cite `code-execution-tool.md`. Document the trade-off in `docs/architecture.md`: built-in Anthropic code-exec tool is simpler but less integrated; `@cloudflare/codemode` gives us the full filesystem-tree pattern. We stay with codemode for the bridge; managed-agents-style sub-agents (if ever introduced) could use the built-in tool.

**Phase 12 — Bridge as a Connector (long-arc).**
1. Cite `claude.com/docs/connectors/building.md`. Expose the bridge as a Connector for use in claude.ai and Claude Code clients without local install.
2. Out of scope for this PR; tracked as a future-PR placeholder so the rubric set is complete.

## Verification

After each phase:

```bash
unset ANTHROPIC_API_KEY
npm run lint
npm run build
npm run verify
```

Smoke checks per phase:

- **Phase 0 (this PR's scope; full smoke check).**
  - `seeds/prompts/operator-2026-05-10.md` and `seeds/prompts/operator-2026-05-10-followup.md` exist; SHA-256 of each matches the value recorded in its commit message.
  - `seeds/posture/session-start.xml` parses as well-formed XML and validates against the schema documented in the Operator Posture section.
  - All 11 cited URLs land at `vendor/anthropics/<host>/<path>.md`; `Content-Type` of the saved body was `text/markdown` (verified by inspection, since no transform validator runs in Phase 0). For `developers.cloudflare.com` URLs the path component ends in `/index.md`; for `code.claude.com` / `platform.claude.com` / `claude.com/docs` / `neon.com/guides` the path ends in `.md`.
  - Each `seeds/citations/<slug>.md` lists at least the H1+H2 of the source doc plus three pull quotes that map to the corresponding rubric.
  - `rubrics/phase-{0..12}.md` exist; each has ≥3 measurable criteria; Phase 0's own rubric is satisfied by the rest of these checks (self-graded).
  - `.claude/skills/routines.md` exists; its body cites the two ingested `code.claude.com/docs` files; invoking the skill (or otherwise reading it) does not require Phase 1+ infra.
  - **Runner scaffold check.** `infra/cloudflare/wrangler.jsonc` validates with `wrangler deploy --dry-run`; `Dockerfile` builds (locally) without errors; `src/worker.ts` typechecks under `tsc --noEmit`. **The runner is not deployed in Phase 0.**
  - **Env-sanitizer check.** A unit test (with a `@cite` to `vendor/anthropics/neon.com/guides/cloudflare-sandbox-neon-branching.md#step-6` and `@cite` to the operator posture XML) asserts: (a) attempting to call `setEnvVars({ ANTHROPIC_API_KEY: "..." })` throws `ApiKeyForbiddenError`; (b) `setEnvVars({ CLAUDE_CODE_OAUTH_TOKEN: "..." })` succeeds.
  - `verify:citations` passes (the env-sanitizer test exists and has a valid `@cite` header).
  - `scripts/seed-fetch/` is committed; will be deleted in Phase 1.
- **Phase 1.** `npm run crawl:vendor -- anthropics` produces `vendor/anthropics/{llms.txt,urls.md,www.anthropic.com/...}` on disk. Inspect 5 random files for valid markdown. Re-run idempotently (no duplicate writes; mtime preserved when content unchanged).
- **Phase 2.** Repo size grows by an expected amount (measure: `du -sh vendor/`). `git status` shows only the expected paths. Spot-check one file per vendor.
- **Phase 3.** `tools/list` returns 15 tools. `vendor_fetch` with allowlisted-and-mirrored URL returns local content (assert via stub: rename mirror file, see error). `vendor_grep` returns hits from local files (no HTTP).
- **Phase 4.** `engineering_fetch` returns same body as before for a known URL (now from mirror). With mirror file removed, falls back to live HTTP and still returns body. `llms_grep` 10x+ faster on a known query.
- **Phase 5.** Touch `vendor/anthropics/urls.md` to 30 days old → `verify:freshness` emits warning. Activate `.claude/skills/refresh-vendors.md` → planner emits a `/schedule` SlashCommand with the expected text.
- **Phase 6.** `tools/list` returns 16 tools (15 lane tools + `search_tools`). `npm run dev "..."` runs with `tools: ["codemode", "search_tools"]` and the sub-agent successfully imports `./servers/knowledge-bridge/llms_grep` to answer the seed query. Token usage on a representative 5-turn run drops by ≥40% vs Phase 5 baseline (assert via `usage` field on the agent SDK message stream).
- **Phase 7.** `seeds/discovered-sources.json` contains ≥15 anthropics repos and ≥10 mcp repos. `npm run install:plugins` materializes at least one plugin under `.claude/plugins/`. Drift check passes.
- **Phase 8.** `npm run sandbox:dev` accepts a POST and returns the same orchestrator output as `npm run dev` locally. `wrangler deploy` succeeds. Outbound to `evil.example` is blocked; outbound to `api.anthropic.com` succeeds. Cloudflare `/index.md` rule: `cloudflareIndexMd("https://developers.cloudflare.com/sandbox/tutorials/claude-code/")` returns `.../claude-code/index.md`; the validator throws on a `text/html` response from any cloudflare URL. `anthropic-mdfirst`: `anthropicMdFirst("https://platform.claude.com/docs/en/managed-agents/define-outcomes")` → `.../define-outcomes.md`; validator throws on HTML.
- **Phase 9.** `npm run grade -- phase-3` reads `rubrics/phase-3.md`, executes its tests, and emits a structured per-criterion report. Fresh-context Messages API call (OAuth) is used for prose criteria. `iteration` counter caps at 5 per `define-outcomes.md`.
- **Phase 10.** Three sub-agents declared (`npm-research`, `verifier`, `crawl-curator`) each with `tools: ["codemode", "search_tools"]` and a one-line outcome. Per-sub-agent rubric satisfied.
- **Phase 11.** Batch grading run cuts grader cost ≥40% vs Phase 9 single-shot (asserted by comparing logged token totals). Embeddings flag, when on, returns top-5 `vendor_grep` results that include hits a substring grep would miss for a synonym query.
- **Phase 12.** Connector manifest validates against the spec in `connectors/building.md`. Out of scope for merge; rubric exists, criteria all marked deferred.

## Risks

| Risk | Mitigation |
|---|---|
| **Repo size.** Cloudflare and Stripe docs alone could push the committed mirror to 50-200 MB. Clones get slow; `git log -p` pagination painful. | Per-vendor `page_cap` (default 200, tunable in `crawl.json`). `.gitattributes linguist-vendored`. Document in `vendor/README.md` that this is intentional. If total > 500 MB, revisit (LFS, sparse-checkout, or split repo). |
| **crawlee dependency weight.** Crawlee installs ~50 MB of node_modules (mostly the browser-pool deps). | Use `@crawlee/cheerio` only (no Playwright/Puppeteer). Crawlee supports cheerio-only mode without pulling browser deps. |
| **llms.txt discovery false positives.** A non-llms.txt 200-OK at `/llms.txt` could pollute. | Validator: must contain `# <heading>` and at least 3 markdown links. Unparseable → reject + try next candidate. |
| **HTML-to-markdown noise** for vendors using `html-extract`. | Default extraction strips nav/footer via turndown's selectors. Per-vendor `crawl.json.html_extract.selector` overrides for sites that need it (intercom's docs use a known content container). |
| **Stale mirror at runtime.** A user runs the bridge against a 6-month-old mirror; live source has moved. | `verify:freshness` warns at 14 days. `*_fetch` falls back to live HTTP if mirror missing. Document the "rerun crawl on stale" workflow in `vendor/README.md`. |
| **`tsconfig.json` `rootDir: "src"` excludes `vendor/` from `dist/`.** Same risk as before — production reads from `dist/` but mirror lives at repo root. | `vendor-mirror.ts` and `vendor-manifests.ts` walk two `..` from `import.meta.url` (works in both `tsx` and `node dist/`). Add `KE_VENDOR_DIR` env override for installed-package consumers. |
| **`npm publish` would not include `vendor/`.** | `"files": ["dist", "vendor"]` in `package.json` (added in Phase 1). |
| **Crawl is slow / rate-limited.** Stripe and Cloudflare have rate limits; full crawl may take 10-30 min. | Crawlee built-in: `maxRequestsPerMinute`, retry with backoff, persistent queue. Set per-vendor in `crawl.json`. |
| **Non-deterministic outputs.** Vendor adds tracking params or rotates content — diff-noisy commits. | Strip query strings on canonical URL. Sort YAML keys. Sort table rows by URL. The crawler emits stable diffs. |
| **`support_article` becomes stricter** (allowlist now enforced; current code skipped the check). | Bootstrap: pre-crawl support.claude.com so manifest covers all currently-cited articles. |
| **Stale `servers/` tree** drifts from lane source. | CI guard in `verify:mcp`: re-run `gen:servers` and `git diff --exit-code servers/` to fail the build on drift. |
| **`@cloudflare/codemode` is a moving target** (newer library; API may change). | Pin to a specific minor in `package.json`. Ship a thin adapter at `src/agent/codemode-adapter.ts` so an upgrade is a single-file change. |
| **Sandbox cold-start latency** (Hosting guide quotes 2-3 minutes for first container build). | Use the `cloudflare/sandbox-sdk/examples/claude-code` prebuilt image. Keep one warm container per session ID via `getSandbox(env.Sandbox, sessionId)` reuse semantics. |
| **Cloudflare HTML/JS leakage.** A future `developers.cloudflare.com` URL slips past the transform and an HTML body lands in the model's context. | Two-layer enforcement: (1) URL transform appends `/index.md`, (2) response validator rejects non-markdown bodies for that host. Both layers tested in the verification smoke checks. |
| **Plugin marketplace drift / supply-chain risk.** A community plugin gains a malicious dependency. | `.claude/plugins.json` pins each plugin to a commit SHA, not a branch ref. `install:plugins` records the resolved SHA. Reviewer verifies SHA before merge. |
| **GH GraphQL rate limits / no token in CI.** | `discover-sources.ts` falls back to the GitHub MCP server (already authenticated in the orchestrator's session). Cache result in `seeds/discovered-sources.json` so most runs are offline. |

## Code execution with MCP (filesystem-tree tool API)

Per the Anthropic engineering post *Code execution with MCP: Building more efficient agents* and Cloudflare's `@cloudflare/codemode` library, agents waste context when (a) every MCP tool definition is loaded up-front and (b) every intermediate tool result flows through the model. Today, `src/agent/run.ts:99-117` passes the full 12-tool bridge allowlist into the verifier sub-agent's `tools: [...]`, so every run pays that token tax even when only one tool is used.

### Components

1. **`servers/` filesystem tree (generated, committed).** One directory per MCP server, one `.ts` file per tool. Each file exports a typed wrapper that calls `callMCPTool('<server>__<tool>', input)`. Layout:
   ```
   servers/
     knowledge-bridge/
       engineering_index.ts
       engineering_fetch.ts
       engineering_search.ts
       blog_index.ts
       blog_fetch.ts
       blog_search.ts
       support_collections.ts
       support_collection.ts
       support_article.ts
       llms_namespaces.ts
       llms_fetch.ts
       llms_grep.ts
       vendor_list.ts
       vendor_fetch.ts
       vendor_grep.ts
       index.ts            # barrel export
       README.md           # auto-generated catalog
     npm-registry/
       npm_org_packages.ts
       npm_package_metadata.ts
       npm_downloads.ts
       npm_search.ts
       index.ts
       README.md
     _client.ts            # callMCPTool() implementation
     search_tools.ts       # `search_tools(query, detail)` for progressive disclosure
   ```
   Each tool file is a one-screen wrapper:
   ```ts
   // servers/knowledge-bridge/vendor_fetch.ts
   import { callMCPTool } from "../_client.js";
   interface VendorFetchInput { url: string; vendor?: string; }
   interface VendorFetchResponse { content: string; source: "mirror" | "http"; }
   /** Fetch a vendor doc page. Local mirror first, HTTP fallback. */
   export async function vendorFetch(input: VendorFetchInput): Promise<VendorFetchResponse> {
     return callMCPTool<VendorFetchResponse>("knowledge-bridge__vendor_fetch", input);
   }
   ```

2. **`scripts/generate-server-tree.ts`** — emits `servers/` from each MCP server's `tools/list` response. Produces TypeScript wrappers + per-server `README.md` catalogs (name, description, schema). Re-run after every lane change. CI guard: `npm run lint` fails if `servers/` is stale relative to the lane source.

3. **`search_tools(query, detail)` tool** — progressive-disclosure surface. `detail` is one of `name`, `name+description`, or `full` (with input schema). Returns the top N matches across all generated `servers/<name>/<tool>.ts` files. Implemented as a 16th bridge tool so the agent can call it from inside the sandbox without first loading any other tool's definition.

4. **`@cloudflare/codemode` integration in `src/agent/run.ts`.** Replace the per-sub-agent `tools: [...]` allowlist with a single `codemode` tool wired through `createCodeTool`. The agent writes JavaScript/TypeScript like:
   ```ts
   import { vendorFetch } from "./servers/knowledge-bridge/vendor_fetch";
   import { llmsGrep } from "./servers/knowledge-bridge/llms_grep";
   const hits = await llmsGrep({ namespace: "stripe", pattern: "idempotency-key" });
   const top = hits.slice(0, 3);
   const bodies = await Promise.all(top.map(h => vendorFetch({ url: h.url })));
   console.log(bodies.map(b => b.content.slice(0, 500)).join("\n---\n"));
   ```
   Only the 3 selected hits' first 500 chars flow through the model — not all 12 tool defs and not full bodies. `DynamicWorkerExecutor` runs the code in an isolated Worker; stdout/stderr/result returned to the model.

5. **`scripts/lib/cloudflare-index-md.ts`** — pure function enforcing the rule:
   ```ts
   export function cloudflareIndexMd(url: string): string {
     const u = new URL(url);
     if (u.host !== "developers.cloudflare.com") return url;
     if (u.pathname.endsWith("/index.md")) return url;
     if (/\.[a-z0-9]+$/i.test(u.pathname)) return url;
     u.pathname = u.pathname.replace(/\/?$/, "/index.md");
     return u.toString();
   }
   ```
   Plus a response validator: if `Content-Type` is `text/html` or body starts with `<!DOCTYPE` / `<html`, throw `CloudflareNonMarkdownError`. Used by both the offline crawler (Phase 1) and `vendor_fetch` runtime (Phase 3).

### Token-cost expectation

Today: verifier seed (~3 KB) + 12 tool definitions (~2.5 KB) every turn. With the codemode pattern: verifier seed + one `codemode` tool def (~0.4 KB) + on-demand `search_tools` calls. Estimated steady-state savings on a 10-turn verifier session: ~25 KB → ~3 KB context on tool defs, plus full body filtering in-sandbox (the larger win on doc-grade questions).

## Hosting on Cloudflare Sandbox

Per the Anthropic *Hosting the Agent SDK* guide and the Cloudflare *Run Claude Code on a Sandbox* tutorial. The orchestrator becomes a Cloudflare Worker that, per task, spins up an ephemeral `@cloudflare/sandbox` container holding the cloned `vendor/` mirror, the `servers/` tree, and the Claude Agent SDK.

### Components

1. **`infra/cloudflare/` — Wrangler project.** Mirrors the `cloudflare/sandbox-sdk/examples/claude-code` template. Exports `Sandbox` from `@cloudflare/sandbox`. The Worker handler:
   - Receives `{ task, mode }` over POST.
   - `getSandbox(env.Sandbox, sessionId)` creates an isolated container.
   - `sandbox.writeFile()` populates `vendor/`, `servers/`, `seeds/`.
   - `sandbox.exec("ke-agent ...")` runs the bin published from `package.json`.
   - Streams stdout via Sandbox's `onOutput` to a WebSocket back to the caller.
   - Destroys the sandbox on completion (Pattern 1: Ephemeral Sessions).

2. **`@cloudflare/codemode` runtime.** `DynamicWorkerExecutor` runs LLM-generated TS that imports from `./servers/`. The executor is sandboxed at the Dynamic Worker boundary — independent of the outer Sandbox container.

3. **OAuth token plumbing.** Existing `src/oauth/token.ts` works inside the sandbox if `CLAUDE_CODE_OAUTH_TOKEN` is provisioned via `wrangler secret put`. `ANTHROPIC_API_KEY` must remain unset inside the sandbox (the OAuth gate fails closed when it's present).

4. **Outbound network policy.** `wrangler.toml` `outbound_service` allowlist: `api.anthropic.com`, plus the 12 vendor hosts (read from `vendor/<name>/crawl.json.allow_prefixes`). Discovers an additional safety boundary beyond the in-process allowlist.

5. **Ports.** Per the Hosting guide's "How do I communicate with my sandboxes?" — expose the npm-registry MCP server on an internal-only port; expose a `/run` HTTP endpoint to the outer Worker. The bridge MCP server stays stdio (no port).

### Why Cloudflare Sandbox vs alternatives

The Anthropic Hosting guide lists Modal, Cloudflare, Daytona, E2B, Fly Machines, and Vercel Sandbox. We pick Cloudflare because (a) `@cloudflare/codemode` natively implements the code-execution-with-MCP pattern out of the box, (b) the `cloudflare/sandbox-sdk/examples/claude-code` template is a working starter, and (c) the bridge already requires Cloudflare-rule-aware fetching for `developers.cloudflare.com`, so we keep one cloud surface.

## Plugin marketplace integration

The user calls these "claude-official-plugins" — the actual Anthropic-managed repo is **`anthropics/claude-plugins-official`** (Apache-2.0, ~19k stars; topic tags `claude-code mcp skills`). Two sibling repos: **`anthropics/knowledge-work-plugins`** (Cowork-targeted) and **`anthropics/claude-plugins-community`** (community marketplace, read-only mirror).

### Components

1. **`.claude/plugins.json` — pinned plugin manifest.**
   ```json
   {
     "marketplaces": [
       { "name": "official", "repo": "anthropics/claude-plugins-official", "ref": "main" },
       { "name": "knowledge-work", "repo": "anthropics/knowledge-work-plugins", "ref": "main" },
       { "name": "community", "repo": "anthropics/claude-plugins-community", "ref": "main" }
     ],
     "install": [
       { "marketplace": "official", "plugin": "<plugin-slug-from-discovery>" }
     ]
   }
   ```

2. **`scripts/install-plugins.ts`** — for each `install` entry, shallow-clone the plugin subtree into `.claude/plugins/<plugin-slug>/`. Uses GH GraphQL `Tree` queries (not full clone) to keep the install footprint minimal. Idempotent; commits the materialized tree to git so PRs show the diff.

3. **Reference-implementation cross-pollination.** The `anthropics/cwc-workshops/agent-decomposition` workshop is the canonical worked example of "decompose a 400-line-prompt inventory agent into skills + code execution + callable_agents." Its decomposition pattern is the model for how `src/agent/run.ts` should be refactored once the codemode layer is in place — link to it in `docs/architecture.md`.

## Source discovery via GH GraphQL

Replaces hand-curated vendor and plugin lists with live queries against GitHub. Discovered repos this turn (committed to `seeds/discovered-sources.json` as a baseline):

### `anthropics/*` (16 repos, abridged)
- `claude-cookbooks` — recipes (42k★)
- `claude-plugins-official` — official plugin directory (19k★, topics: claude-code/mcp/skills)
- `knowledge-work-plugins` — Cowork plugins (12k★)
- `claude-plugins-community` — community marketplace mirror
- `claude-agent-sdk-typescript`, `claude-agent-sdk-python`, `claude-agent-sdk-demos`
- `anthropic-sdk-{python,typescript,go,java,csharp,ruby,php}`
- `anthropic-cli` — Go CLI for the Anthropic API

### `modelcontextprotocol/*` (15+ repos, abridged)
- `servers` — reference MCP servers (85k★)
- `{python,typescript,go,csharp,java,rust,kotlin,swift,php}-sdk` — official SDKs
- `inspector` — visual MCP testing tool
- `registry` — community MCP server registry (Go)
- `modelcontextprotocol` — spec
- `ext-apps` — MCP Apps protocol (UIs embedded in chatbots)
- `mcpb` — Desktop Extensions (one-click MCP install)

### Components

1. **`scripts/discover-sources.ts`** — `gh api graphql` (or `@octokit/graphql` to avoid the gh CLI dep) issuing one combined query:
   ```graphql
   query Sources($q1: String!, $q2: String!) {
     anthropics: search(query: $q1, type: REPOSITORY, first: 50) {
       nodes { ... on Repository { nameWithOwner description url defaultBranchRef { name } repositoryTopics(first: 5) { nodes { topic { name } } } object(expression: "HEAD:llms.txt") { ... on Blob { byteSize } } } }
     }
     mcp: search(query: $q2, type: REPOSITORY, first: 50) {
       nodes { ... on Repository { nameWithOwner description url repositoryTopics(first: 5) { nodes { topic { name } } } } }
     }
   }
   ```
   `$q1 = "org:anthropics fork:false archived:false"`, `$q2 = "org:modelcontextprotocol fork:false archived:false"`. Single API hit.

2. **`seeds/discovered-sources.json`** — committed snapshot. Re-run before each crawl. Drives:
   - Vendor list (any repo with a non-empty `llms.txt` blob seeds an automatic `vendor/<repo>/crawl.json` candidate).
   - Plugin marketplace list (any repo with topic `claude-code` + `skills` becomes a candidate marketplace).
   - npm-registry lane's `npm_org_packages('@anthropic-ai')` cross-check (compares discovered SDK repos against published packages — flags drift).

3. **GH MCP fallback.** If the local environment lacks an Octokit token, `discover-sources.ts` falls back to the GitHub MCP server's `mcp__github__search_repositories` (already used in this PR turn). Same shape, same output JSON.

## Critical files for execution

### PR 3 (Phase 0 — this merge)

- `seeds/prompts/operator-2026-05-10.md` — verbatim operator prompt (Phase 0a). Second commit `seeds/prompts/operator-2026-05-10-followup.md` covers the Neon/runner addendum.
- `seeds/posture/session-start.xml` — XML decomposition (Phase 0b)
- `scripts/seed-fetch/<slug>.sh` — throwaway hand-fetch scripts, eleven of them (Phase 0c, deleted in Phase 1)
- `vendor/anthropics/{code.claude.com,platform.claude.com,developers.cloudflare.com,claude.com,neon.com}/.../<path>.md` — eleven cited docs (Phase 0c)
- `seeds/citations/<slug>.md` — header + pull-quote extracts, eleven files (Phase 0c)
- `rubrics/phase-{0..12}.md` — thirteen rubric stubs (Phase 0d)
- `.claude/skills/routines.md` — `/loop`+`/schedule` umbrella (Phase 0e)
- `scripts/lib/citation-guard.ts` + `package.json` `verify:citations` script (Phase 0f)
- `infra/cloudflare/{wrangler.jsonc,Dockerfile,src/worker.ts,.dev.vars.example,package.json}` — Full-Stack Cloud Agent runner scaffolding (Phase 0g; OAuth-substituted per the Neon-guide conflict resolution)
- `docs/architecture.md` — Operator posture summary, account ledger (Phase 0h), long-arc Workers goal, and the explicit ANTHROPIC_API_KEY → CLAUDE_CODE_OAUTH_TOKEN substitution note for the cloud agents section

### Future PRs (roadmap, NOT in this merge)

- `scripts/crawl-vendors.ts` — the new crawler
- `scripts/lib/{llms-txt,url-to-path,transforms}.ts` — reusable crawl helpers
- `src/lib/vendor-manifests.ts` — runtime allowlist loader
- `src/lib/vendor-mirror.ts` — URL → local file resolver
- `src/mcp/lanes/vendor.ts` — new lane
- `src/mcp/bridge-server.ts` — eager-load + register
- `src/mcp/lanes/{anthropic-engineering,claude-blog,support-claude,llms-txt}.ts` — Phase 4 mirror-first refactor
- `vendor/<name>/crawl.json` — 12 files; the source of truth for per-vendor strategy
- `vendor/anthropics/**` — must zero-diff existing 4-lane behavior (carefully bootstrap)
- `package.json` — new deps + scripts + `"files"`
- `scripts/verify.ts` — `expected: 12` → `15` (Phase 3) → `16` (Phase 6, adds `search_tools`), plus `verify:freshness` and the `gen:servers` drift guard
- `scripts/generate-server-tree.ts`, `servers/_client.ts`, `servers/search_tools.ts` — code-execution-with-MCP layer (Phase 6)
- `src/agent/run.ts` — sub-agent `tools: [...]` → `["codemode", "search_tools"]` (Phase 6)
- `scripts/discover-sources.ts`, `seeds/discovered-sources.json` — GH GraphQL discovery (Phase 7)
- `.claude/plugins.json`, `scripts/install-plugins.ts` — plugin marketplace integration (Phase 7)
- `infra/cloudflare/{wrangler.toml,src/worker.ts,Dockerfile}` — Cloudflare Sandbox hosting (Phase 8)
- `scripts/lib/cloudflare-index-md.ts` — the hard `/index.md` rule for `developers.cloudflare.com`
- `seeds/prompts/operator-2026-05-10.md`, `seeds/posture/session-start.xml`, `seeds/citations/*.md` — Phase 0 seed and per-doc citation extracts
- `rubrics/phase-{0..12}.md` — per-phase ODD rubrics (modeled on `define-outcomes.md`)
- `scripts/grade-phase.ts` — Messages-API rubric grader (OAuth, fresh context per criterion) (Phase 9)
- `scripts/lib/citation-guard.ts` — `verify:citations` (Phase 0d wire-up)
- `.claude/skills/routines.md` — `/loop` + `/schedule` umbrella skill

---

# Phase 13.B + OpenFeature feature-flag integration (this session)

## Context

The operator's directive: continue Phase 13.B (#46 — `vendor/anthropic-engineering/` daily crawl), and additionally **begin using OpenFeature** with **Cloudflare Flagship** as the provider — demonstrated by a tiny color-coded feature in the agent's TodoTracker render.

This is a 4-PR sequence (A/B/C/D below) that:
1. Dogfoods the chassis we built (vendor crawler + auto-merge loop + ODD rubrics).
2. Dogfoods `.claude/agents/teams/data_science_and_analytics/CONVENTIONS.md` by adopting its outcome-ID commit discipline going forward (see "Outcome-ID adoption" below).
3. Adds a feature-flag runtime as a load-bearing primitive — the operator's framing is that all new agent-facing features should be flag-gated so the chassis can ship-then-decide.

Per PRODUCTRD.md §1: this is the "solo-founder chassis" — adding OpenFeature gives forking founders a turn-key feature-flag layer wired to Cloudflare Flagship, with no extra setup beyond a Wrangler binding.

## Outcomes (declared up front per `define-outcomes.md` + CONVENTIONS.md)

| ID | Outcome | PR |
|---|---|---|
| **O1** | `vendor/anthropic-engineering/` mirror crawled via live-HTML-index discovery; daily `/schedule` routine emits a refresh PR | PR A (closes #46) |
| **O2** | Crawler supports sitemap.xml discovery (`sitemap_xml_sources?: string[]` in CrawlConfig); reusable across any vendor lacking an llms.txt | PR B |
| **O3** | `vendor/openfeature/` mirror crawled via `https://openfeature.dev/sitemap.xml` | PR B |
| **O4** | `vendor/cloudflare/` extended with `https://developers.cloudflare.com/flagship/llms.txt` as an additional llms.txt source | PR B |
| **O5** | `@openfeature/server-sdk` initialized at agent startup; `@cloudflare/flagship` provider wired in the Worker runtime; `InMemoryProvider` for local dev | PR C |
| **O6** | Color-code demo: `TodoTracker.render()` accepts a `color` string flag (red \| blue \| green \| yellow \| purple \| orange \| pink \| cyan), value resolved via OpenFeature; default `cyan` | PR D |

## Outcome-ID adoption (operator-deferred decision)

The operator deferred this call to the lead orchestrator. **Decision: adopt CONVENTIONS.md outcome IDs for all NEW commits in PRs A-D, going forward only — no retro renames of existing commits.** Rationale:

- Dogfoods the artifact we created (`.claude/agents/teams/data_science_and_analytics/CONVENTIONS.md`).
- Aligns with our existing ODD discipline (`define-outcomes.md` — rubric criteria → outcome IDs is a 1:1 mapping).
- Adds traceability — every commit maps to an outcome, every outcome maps to a `rubrics/phase-13.md` criterion.
- No backfill churn (retroactively renaming PR #43-#52 commits would invalidate hashes and confuse the audit trail).

Commit message shape going forward (per CONVENTIONS.md §50-71):

```
<type>(<scope>): <subject> (<outcome-id>)

[body — wrap at 72; explain WHY not WHAT]
[footer(s), e.g. Refs: O2, O3 when a commit spans outcomes]
```

Example:

```
feat(crawl): sitemap.xml discovery source (O2)

Adds sitemap_xml_sources to CrawlConfig + scripts/lib/sitemap-xml.ts.
Parses <loc> entries from any RFC-compliant sitemap; merges discovered
URLs into the existing collectedUrls pool ahead of allowlist filtering.

Refs: O3, O4
```

The auto-merge workflow does NOT enforce outcome IDs — adoption is at the orchestrator's discipline level. A future `verify:outcomes` script (out of scope this session) can enforce mechanically.

## Recommended approach

Four atomic PRs, sequenced. Each is independently mergeable. Each ends `npm run verify` green.

### PR A — Phase 13.B core (closes #46) — O1

Discovery path: `www.anthropic.com/engineering` has no llms.txt. The existing lane at `src/mcp/lanes/anthropic-engineering.ts:24-41` already has a regex-based `parseIndex()` that extracts `/engineering/<slug>` links from the live index page. **Reuse the same regex pattern in the crawler** by adding a new optional field to `CrawlConfig`:

```ts
html_index_sources?: { url: string; link_regex: string }[];
```

For anthropic-engineering:

```json
{
  "name": "anthropic-engineering",
  "homepage": "https://www.anthropic.com/engineering",
  "llms_txt_candidates": [],
  "html_index_sources": [
    { "url": "https://www.anthropic.com/engineering", "link_regex": "<a[^>]+href=\"(/engineering/[a-z0-9-]+)\"[^>]*>" }
  ],
  "transform": "html-extract",
  "allow_prefixes": ["https://www.anthropic.com/engineering/"],
  "page_cap": 200,
  "html_extract": { "selector": "article|main" }
}
```

Daily `/schedule` extension: `.claude/skills/refresh-vendors.md` gains a per-surface template snippet. The current weekly template is preserved; a new daily section emits one schedule per content surface (anthropic-engineering today; claude-blog and marketing surfaces follow in 13.C/D).

#### File inventory (PR A)

| Action | Path | Why |
|---|---|---|
| Create | `vendor/anthropic-engineering/crawl.json` | Vendor config (html_index_sources + html-extract) |
| Modify | `scripts/crawl-vendors.ts` | Wire `html_index_sources` discovery before the existing url-pool step |
| Create | `scripts/lib/html-index.ts` | Pure function: `(html, linkRegex) => string[]` (absolute URLs); ~50 LOC + unit tests |
| Create | `scripts/lib/html-index.test.ts` | Tests with `@cite rubrics/phase-13.md` + fixture HTML |
| Modify | `.claude/skills/refresh-vendors.md` | Add daily-cadence per-surface `/schedule` template |
| Modify | `rubrics/phase-13.md` | Flip 13.B status; surface O1 as criterion 8 |
| Run | `npm run crawl:vendor -- anthropic-engineering` | Generate `vendor/anthropic-engineering/{urls.md, www.anthropic.com/engineering/<slug>.md}`. Commit the diff. |

### PR B — sitemap.xml discovery + OpenFeature/Flagship vendor crawls — O2 + O3 + O4

Sitemap discovery is orthogonal to llms.txt discovery — both populate the same `collectedUrls` pool. No transform changes needed (the new URLs flow through the existing transform dispatch).

OpenFeature transform choice: `openfeature.dev` is a Docusaurus site. Try `accept-only` first (some Docusaurus deployments serve markdown via `Accept: text/markdown`); fallback to `html-extract` with the Docusaurus content-selector. The crawler's existing per-vendor `html_extract.selector` covers this.

Cloudflare Flagship: just append `https://developers.cloudflare.com/flagship/llms.txt` to `vendor/cloudflare/crawl.json` `llms_txt_sources`. The existing `cloudflare-index-md` transform already handles every URL under `developers.cloudflare.com/`, including `/flagship/` (no allow_prefix update needed — `/flagship/` is already under the existing prefix per the Explore agent's finding).

#### File inventory (PR B)

| Action | Path | Why |
|---|---|---|
| Modify | `scripts/crawl-vendors.ts` | Add `sitemap_xml_sources?: string[]` to CrawlConfig; merge into `collectedUrls` ahead of allowlist filtering |
| Create | `scripts/lib/sitemap-xml.ts` | XML sitemap parser. Extracts `<loc>` entries. ~40 LOC. |
| Create | `scripts/lib/sitemap-xml.test.ts` | Tests with `@cite rubrics/phase-13.md` + fixture XML |
| Create | `vendor/openfeature/crawl.json` | `sitemap_xml_sources: ["https://openfeature.dev/sitemap.xml"]`, `transform: html-extract` with Docusaurus selector |
| Modify | `vendor/cloudflare/crawl.json` | Add `"llms_txt_sources": ["https://developers.cloudflare.com/flagship/llms.txt"]` |
| Modify | `rubrics/phase-13.md` | Add criterion for sitemap.xml support; mark 13.B-extended in-scope |
| Run | `npm run crawl:vendor -- openfeature` + `-- cloudflare` | Generate mirrors. Commit. |

### PR C — OpenFeature SDK + Cloudflare Flagship provider wiring — O5

OpenFeature client is initialized once at module scope in `src/agent/run.ts` (after `requireOAuth()` per the Explore agent's finding at `src/agent/run.ts:33`). The provider selection is environment-driven:

- Local dev / CI: `InMemoryProvider` seeded from `seeds/openfeature/local-flags.json` (committed; safe defaults).
- Cloudflare Worker runtime: `@cloudflare/flagship` provider bound to `env.FLAGSHIP` (a Worker binding declared in `wrangler.jsonc`).

The Worker's `infra/cloudflare/src/worker.ts` sets the provider before invoking the agent. The agent reads flags via the OpenFeature client; the agent does not know which provider is in use.

#### File inventory (PR C)

| Action | Path | Why |
|---|---|---|
| Modify | `package.json` | Add `@openfeature/server-sdk` to deps |
| Modify | `infra/cloudflare/package.json` | Add `@cloudflare/flagship` to deps |
| Create | `src/lib/openfeature.ts` | Singleton `getClient()`; provider selection by `IS_SANDBOX` env flag. ~80 LOC. |
| Modify | `src/agent/run.ts` | Initialize the client after `requireOAuth()`; no behavior change yet |
| Create | `seeds/openfeature/local-flags.json` | Local default values for all declared flags (currently: `color-code: "cyan"`) |
| Modify | `infra/cloudflare/wrangler.jsonc` | Add Flagship binding section (binding name: `FLAGSHIP`, app id placeholder) |
| Modify | `infra/cloudflare/src/worker.ts` | Register `@cloudflare/flagship` provider before agent invocation |
| Create | `src/lib/openfeature.test.ts` | Tests: InMemoryProvider seeded; client returns expected value; cites rubric |
| Modify | `rubrics/phase-13.md` | Add OpenFeature criteria (provider selection, default flags, no API token in non-Worker mode) |
| Create | `seeds/citations/openfeature.md` | Header extract from the crawled OpenFeature docs |
| Create | `seeds/citations/cloudflare-flagship.md` | Header extract from the crawled Flagship docs |

Auth posture: Cloudflare Flagship via OpenFeature does NOT require an API key in the Worker runtime — it's a native Worker binding. No new secret store entries. Local dev uses InMemoryProvider, no network. **No conflict with the operator's OAuth-only posture.**

### PR D — Color-code demo feature gated by OpenFeature — O6

The flag:

```ts
const ALLOWED_COLORS = ["red", "blue", "green", "yellow", "purple", "orange", "pink", "cyan"] as const;
type Color = typeof ALLOWED_COLORS[number];
const color = client.getStringValue("color-code", "cyan");
const safeColor: Color = (ALLOWED_COLORS as readonly string[]).includes(color) ? color as Color : "cyan";
```

The feature: `src/agent/todo-tracker.ts` `render()` wraps task icons in the resolved ANSI color. Per the Explore agent's finding (`src/agent/todo-tracker.ts:37-42`), the render emits `[x]`, `[~]`, `[ ]` icons — these get a 256-color ANSI prefix derived from the flag value.

When the Worker runtime is in use, the flag is resolved via Cloudflare Flagship at every render (cached per OpenFeature SDK semantics). When local, InMemoryProvider returns the static default.

#### File inventory (PR D)

| Action | Path | Why |
|---|---|---|
| Modify | `src/agent/todo-tracker.ts` | Add `color` resolution; wrap icons in ANSI color codes |
| Create | `src/lib/ansi-color.ts` | Pure function: `(color: Color, text: string) => string` (256-color ANSI). ~30 LOC. |
| Create | `src/lib/ansi-color.test.ts` | Tests for each of 8 colors + fallback path. Cites rubric. |
| Modify | `seeds/openfeature/local-flags.json` | Add `color-code` flag entry with default + allowed values |
| Modify | `rubrics/phase-13.md` | Add O6 criteria: all 8 colors render; invalid value falls back to default |

## Verification per PR

| PR | Smoke check |
|---|---|
| A | `npm run crawl:vendor -- anthropic-engineering` produces ≥10 `vendor/anthropic-engineering/www.anthropic.com/engineering/<slug>.md` files. `npm run verify` green. |
| B | `npx tsx scripts/lib/sitemap-xml.test.ts` passes. `npm run crawl:vendor -- openfeature` produces a non-empty `vendor/openfeature/` mirror. `npm run crawl:vendor -- cloudflare` adds new pages under `vendor/cloudflare/developers.cloudflare.com/flagship/`. |
| C | `npx tsx src/lib/openfeature.test.ts` passes (InMemoryProvider returns `cyan`). `wrangler deploy --dry-run` succeeds. `src/agent/run.ts` runs end-to-end locally with the InMemoryProvider (no Worker required). |
| D | `npm run dev "test"` with default flag renders cyan icons. All 8 colors covered by unit test. Invalid value falls back to `cyan` — no throw. Non-TTY path emits plain text (no ANSI). |

## Risks

| Risk | Mitigation |
|---|---|
| **Live index regex brittleness.** Anthropic could change `engineering/<slug>` URL pattern. | The regex lives in `crawl.json` per vendor (data, not code) — operator-editable. Existing `parseIndex()` in `src/mcp/lanes/anthropic-engineering.ts` is the regression check. |
| **Sitemap.xml ambiguity.** Large sitemaps (>10k entries) could blow page_cap silently. | `sitemap_xml_sources` discovery emits a stderr warning when discovered URL count > page_cap; allowlist still filters before fetch. |
| **OpenFeature double-init.** Initializing the provider twice (agent + Worker) breaks SDK invariants. | The Worker initializes BEFORE invoking the agent. `getClient()` is idempotent — second call returns the existing client. Worker passes `IS_SANDBOX=1` so the agent skips its own init path. |
| **Cloudflare Flagship binding requires an app id** that doesn't exist yet. | PR C ships with a placeholder app id in `wrangler.jsonc` AND a comment pointing to a new `docs/operator-runbooks/cf-flagship-setup.md` runbook (Claude-in-Chrome paste prompt). Deploy fails fast with a clear error until the operator runs the runbook. Local dev unaffected. |
| **Color-code in non-TTY environments.** ANSI codes leak into log files / CI output. | `ansi-color.ts` checks `process.stdout.isTTY` and returns plain text when false. |
| **Operator-pending action surface growth.** Adding Flagship setup grows Column 1 of `docs/pending.md`. | Document explicitly in `docs/pending.md`. The runbook follows the existing 6-runbook pattern. |
| **Outcome-ID discipline drift.** New commits could forget the `(On)` suffix. | A future `scripts/verify-outcomes.ts` enforces mechanically; for this session, the orchestrator is disciplined manually. |

## Issue-creation plan (during this session)

1. **#46** stays as-is — PR A closes it.
2. **New issue (next number, likely #53)**: "Phase 13.B-extended — OpenFeature + Cloudflare Flagship + color-code demo (O2-O6)". Body decomposes into:
   - **Task 1 — Sitemap.xml discovery (O2)** with 3 subtasks and ~8 todos.
   - **Task 2 — Vendor crawls (O3 + O4)** with 2 subtasks and ~6 todos.
   - **Task 3 — OpenFeature SDK + Flagship provider (O5)** with 4 subtasks and ~12 todos.
   - **Task 4 — Color-code demo (O6)** with 3 subtasks and ~8 todos.
   - Linked back to `rubrics/phase-13.md` and CONVENTIONS.md.
3. **Refresh `docs/pending.md`** with the new issue + new operator runbook (Flagship app setup).

## Critical files (per PR)

### PR A
- `vendor/anthropic-engineering/crawl.json` (new); `vendor/anthropic-engineering/**` (generated)
- `scripts/crawl-vendors.ts` (modify); `scripts/lib/html-index.ts` + `.test.ts` (new)
- `.claude/skills/refresh-vendors.md` (modify); `rubrics/phase-13.md` (modify)

### PR B
- `scripts/crawl-vendors.ts` (modify); `scripts/lib/sitemap-xml.ts` + `.test.ts` (new)
- `vendor/openfeature/crawl.json` (new); `vendor/openfeature/openfeature.dev/**` (generated)
- `vendor/cloudflare/crawl.json` (modify); `vendor/cloudflare/developers.cloudflare.com/flagship/**` (generated)
- `rubrics/phase-13.md` (modify)

### PR C
- `package.json` (modify); `infra/cloudflare/package.json` (modify)
- `src/lib/openfeature.ts` + `.test.ts` (new); `src/agent/run.ts` (modify)
- `seeds/openfeature/local-flags.json` (new)
- `infra/cloudflare/wrangler.jsonc` (modify); `infra/cloudflare/src/worker.ts` (modify)
- `seeds/citations/{openfeature,cloudflare-flagship}.md` (new)
- `docs/operator-runbooks/cf-flagship-setup.md` (new); `docs/pending.md` (modify)
- `rubrics/phase-13.md` (modify)

### PR D
- `src/agent/todo-tracker.ts` (modify)
- `src/lib/ansi-color.ts` + `.test.ts` (new)
- `seeds/openfeature/local-flags.json` (modify); `rubrics/phase-13.md` (modify; flip 13.B status to done)

## Reused functions / utilities (no need to recreate)

- `scripts/lib/checksums.ts` — sitemap.xml discovery reuses `fetch()` semantics for consistency.
- `scripts/lib/transforms.ts` — `html-extract` reused for anthropic-engineering (PR A) and openfeature (PR B). `cloudflare-index-md` already covers `/flagship/`.
- `src/mcp/lanes/anthropic-engineering.ts` `parseIndex()` lines 24-41 — the regex pattern is ported verbatim to `crawl.json` for PR A.
- `scripts/lib/citation-guard.ts` — already enforces `@cite` discipline; no changes.
- `src/agent/todo-tracker.ts` lines 37-42 — existing render surface; PR D modifies in-place.
- `infra/cloudflare/src/env-sanitize.test.ts` pattern — reused for OpenFeature provider tests.

## End-of-session "done" state (PRs A–D only)

- 4 PRs opened with `automerge` label; all merge after CI gates pass.
- Issue #46 closed by PR A; new issue (#53?) closed by PR D.
- `npm run verify` green on each PR.
- `vendor/anthropic-engineering/`, `vendor/openfeature/`, `vendor/cloudflare/flagship/**` committed.
- `npm run dev "..."` locally renders TodoTracker with cyan icons (default flag).
- `rubrics/phase-13.md` shows O1-O6 all ✅.
- `docs/pending.md` updated with the Flagship runbook entry.

---

# Phase 13.B+ — outcomesdk.com frontend + Neon branching (this session)

## Context

The operator purchased `outcomesdk.com` on Cloudflare (account `e6294e3ea89f8207af387d459824aaae`) and wants this session to also stand up the public frontend. Direction: **ghostty.org-style single page** optimized for iPhone 16 Pro Chrome but dynamically adaptive via the **pretext** library:

- **Top half (fixed):** Monospace × Single Weight ASCII art animation — particle-and-attractor brightness field driving char selection. Looks "cool when the app opens." Inspired by `https://chenglou.me/pretext/variable-typographic-ascii/`.
- **Bottom half:** "Finally sane accordion" — section heights calculated via pretext (no DOM measurement, no CSS hacks). Each accordion section opens a `vendor/<vendor>/<path>.md` page rendered as markdown. Inspired by `https://chenglou.me/pretext/accordion/`.

Goal: machine-readable content (markdown) is the priority — the frontend is a thin pretext-driven shell over `vendor/`. The Cloudflare+Neon branching pattern (per `vendor/anthropics/neon.com/guides/cloudflare-sandbox-neon-branching.md` lines 1-80) gives per-PR DB previews of vendor content.

This adds **PR E** and **PR F** to the session — 6 PRs total (A/B/C/D/E/F).

## Library research findings

**pretext** = `@chenglou/pretext` on npm. Pure JS/TS library for multiline text measurement and layout. Framework-agnostic. Canvas-based text measurement. Requires `Intl.Segmenter` (universally available in 2026 browsers). Exposes `prepare`, `layout`, `prepareWithSegments`, `layoutWithLines`. No React/Vue dependency.

The accordion + ASCII art demos on chenglou.me are NOT shipped as components — pretext is the measurement primitive. We implement the accordion and the ASCII generator ourselves, using pretext for layout math. The ASCII generator is small (~200 LOC): a particle simulation writes brightness into a grid, brightness maps to a char from a luminance-ordered set (e.g., ` .:;+*xX$#@`).

## Outcomes (extending O1-O6)

| ID | Outcome | PR |
|---|---|---|
| **O7** | `outcomesdk.com` serves a single-page Cloudflare Worker site: pretext-measured "sane accordion" rendering `vendor/` markdown + monospace ASCII art top half. Custom domain bound via Wrangler; HTTPS via Cloudflare-managed cert. | PR E |
| **O8** | Per-PR Neon branch wired to the frontend's preview deploys (per the cited Neon branching guide). `vendor_pages` table stores vendor markdown; crawler dual-writes (filesystem + Neon). | PR F |

## Frontend-location decision (operator-deferred)

**Decision: new `frontend/` directory at the repo root with its own `wrangler.jsonc`, its own deploy pipeline, its own Worker name (`outcomesdk-frontend`). NOT extending `infra/cloudflare/ke-cloud-agent`.**

Citations + rationale:

| Citation | Implication |
|---|---|
| `vendor/cloudflare/developers.cloudflare.com/workers/configuration/multiple-environments/index.md` (existing in our mirror) | Cloudflare's first-class pattern for multi-surface projects is multiple Workers, each with its own wrangler config. Service Bindings (one Worker calling another) is the documented composition pattern, not multi-entrypoint single Workers. |
| `infra/cloudflare/wrangler.jsonc` lines 20-43 (existing) | The current `ke-cloud-agent` Worker binds Sandbox Durable Objects + Containers (image: `./Dockerfile`). Public traffic landing here means every page view spins up — or risks spinning up — a Sandbox boundary. The blast radius of a misconfiguration is catastrophic. |
| `infra/cloudflare/wrangler.jsonc` lines 67-83 (existing) | The agent Worker binds `CLAUDE_CODE_OAUTH_TOKEN`, `NEON_API_KEY`, `GITHUB_TOKEN` from Secrets Store. The frontend needs none of these (it reads vendor markdown via Hyperdrive read-only). Mixing concerns expands the attack surface for the public domain unnecessarily. |
| `seeds/posture/session-start.xml` + PROJECT.md §"OAuth-only posture" | The repo's security posture is "OAuth-only, no ANTHROPIC_API_KEY anywhere." A public surface should bind ZERO Claude secrets — separating Workers makes that mechanically enforceable rather than vigilance-dependent. |
| `vendor/anthropics/neon.com/guides/cloudflare-sandbox-neon-branching.md` lines 15-17 (the cited guide) | The guide architecturally separates "compute" (Cloudflare Sandbox per agent task) from "data" (Neon branch per task). The frontend is a third concern — public-facing read surface — and deserves its own boundary by the same principle. |

Trade-off accepted: two `wrangler.jsonc` files to maintain, two deploys per release. Mitigated by a top-level `package.json` script `deploy:all` that fans out.

## Recommended approach (PR E + PR F)

### PR E — `outcomesdk.com` frontend (pretext + ASCII art + sane accordion) — O7

Stack:
- Vanilla TypeScript + Vite for the bundle (zero framework — pretext is framework-agnostic; React/Vue would be overhead for a single-page site).
- `@chenglou/pretext` for accordion height calc and any text-layout work.
- Custom `frontend/src/ascii-art.ts` (~200 LOC) — canvas-driven particle/attractor brightness field → monospace char grid, rendered into a `<pre>` with `requestAnimationFrame`.
- Custom `frontend/src/accordion.ts` (~150 LOC) — uses pretext to pre-measure each section's content height, then sets `style.height` directly (no JS animation hacks, just CSS transitions on a measured value).
- Marked (`marked` npm) for vendor markdown → HTML rendering, with a strict sanitizer (DOMPurify).
- Workers Static Assets binding for serving the JS/CSS bundle AND the `vendor/` markdown tree (Cloudflare's documented pattern for bundle + content).
- Custom domain via `routes: [{ pattern: "outcomesdk.com", custom_domain: true }]` — Wrangler handles DNS + cert via the operator's existing Cloudflare admin auth.

Mobile-first layout:
- CSS `100svh` (small viewport) with `display: grid; grid-template-rows: 1fr 1fr` for the half-and-half split.
- Pretext measures the accordion contents → adapts to any height/width.
- Tested target: iPhone 16 Pro Chrome (393×852 CSS px); validated to work down to 320px width and up to desktop.

#### File inventory (PR E)

| Action | Path | Why |
|---|---|---|
| Create | `frontend/package.json` | New workspace: `@chenglou/pretext`, `marked`, `dompurify`, `vite`, `wrangler` |
| Create | `frontend/wrangler.jsonc` | New Worker `outcomesdk-frontend`; `assets: { directory: "./dist" }`; `routes: [{ pattern: "outcomesdk.com", custom_domain: true }]` |
| Create | `frontend/src/worker.ts` | ~30 LOC. Routes `/` → static index.html; `/vendor/*` → asset lookup with Accept negotiation (markdown raw vs. rendered HTML); `/api/vendor-index` → JSON manifest of available vendor/ pages |
| Create | `frontend/src/index.html` | HTML shell. Grid 1fr/1fr. `<pre id="ascii">` top, `<section id="accordion">` bottom. |
| Create | `frontend/src/main.ts` | Bootstraps ASCII animation + accordion on DOMContentLoaded |
| Create | `frontend/src/ascii-art.ts` | Particle/attractor brightness field → monospace char grid. RAF loop. ~200 LOC. |
| Create | `frontend/src/accordion.ts` | Pretext-measured section heights; click-to-expand. ~150 LOC. |
| Create | `frontend/src/vendor-loader.ts` | Fetches `/vendor/<vendor>/<path>.md` raw text; runs through marked + DOMPurify |
| Create | `frontend/src/styles.css` | Mobile-first layout; system monospace stack; ghostty-style minimalist palette |
| Create | `frontend/tests/ascii-art.test.ts` + `accordion.test.ts` | Unit tests for brightness field correctness, accordion height calc. Cite `rubrics/phase-13.md`. |
| Create | `frontend/scripts/build-vendor-manifest.ts` | Build-time: walk `vendor/`, emit `frontend/dist/vendor-manifest.json` with vendor names + page paths. Copies `vendor/**/*.md` to `frontend/dist/vendor/`. |
| Create | `frontend/vite.config.ts` | Vite + Workers Static Assets dev integration |
| Create | `frontend/tsconfig.json` | Strict TS, target ES2022 |
| Modify | `package.json` (root) | Add `deploy:frontend`, `deploy:agent`, `deploy:all` scripts |
| Modify | `.github/workflows/cloudflare-preview.yml` | Add frontend preview-deploy job (separate from agent) |
| Create | `rubrics/phase-13.md` O7 criteria | Page loads <2s on iPhone 16 Pro 4G; ASCII animates at 60fps; accordion renders ≥10 vendor pages; mobile + desktop visual regression. |
| Create | `seeds/citations/pretext.md` | Header extract from the pretext README (cited from `vendor/...` once we crawl chenglou.me/github.com/chenglou/pretext, OR cite GitHub directly with a `@cite` exception note) |
| Create | `docs/operator-runbooks/outcomesdk-domain.md` | Runbook IF the Wrangler custom-domain binding fails (placeholder; should not be needed if API token has Zone:Edit) |

Cloudflare admin actions I'll take during PR E (using the existing Cloudflare MCP tools — operator pre-authorized):
1. Verify zone `outcomesdk.com` exists in account `e6294e3ea89f8207af387d459824aaae` (read-only check).
2. Confirm the existing `CLOUDFLARE_API_TOKEN` (used by `cloudflare-preview.yml`) has `Zone:Edit` permission on `outcomesdk.com` — required for `custom_domain: true` to work. If not, ship the runbook fallback.
3. On first successful merge: `wrangler deploy` from `frontend/` binds the domain automatically.

#### Verification (PR E)

| Check | Command |
|---|---|
| Bundle builds | `cd frontend && npm install && npm run build` produces `dist/` |
| Worker validates | `cd frontend && wrangler deploy --dry-run` succeeds with custom_domain config |
| ASCII animation correctness | `cd frontend && npm test -- ascii-art` (brightness field deterministic given seed) |
| Accordion correctness | `cd frontend && npm test -- accordion` (heights match expected values per fixture markdown) |
| Visual smoke | Local `vite dev` → loads at `localhost:5173` → ASCII top half animates, accordion bottom half shows ≥10 vendor sections, clicking expands |
| Mobile smoke | DevTools iPhone 16 Pro preset → layout fits in `100svh` without scroll |
| Domain bound | After merge: `curl -I https://outcomesdk.com` returns 200 with `cf-ray` header |

### PR F — Neon `vendor_pages` + per-PR branching CI — O8

Per `vendor/anthropics/neon.com/guides/cloudflare-sandbox-neon-branching.md` lines 15-17 + 45-55: each PR forks a copy-on-write Neon branch. We extend that pattern to the frontend's preview deploys.

Schema:
```sql
-- migrations/0001_vendor_pages.sql
CREATE TABLE vendor_pages (
  vendor       text   NOT NULL,
  path         text   NOT NULL,
  content      text   NOT NULL,
  content_hash text   NOT NULL,
  etag         text,
  last_modified text,
  updated_at   timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (vendor, path)
);
CREATE INDEX vendor_pages_vendor_idx ON vendor_pages(vendor);
```

Crawler dual-write: `scripts/crawl-vendors.ts` already computes content hash (PR #52). Extend to also UPSERT into Neon when `NEON_DATABASE_URL` is set. Local dev without Neon → filesystem-only path (no behavior change).

Frontend read path: `frontend/src/worker.ts` gains a Hyperdrive binding. `/vendor/<vendor>/<path>` first tries Hyperdrive, falls back to Static Assets if the binding is unbound (local + initial deploy). Once Neon is populated, Hyperdrive is the fast path; Static Assets is the resilient fallback.

CI per-PR branching:
- `.github/workflows/neon-branch-on-pr.yml` (new) — on `pull_request` opened/reopened: call Neon API `POST /projects/{project_id}/branches` with `parent_id: main` to create `pr-<PR#>`; set output `NEON_PREVIEW_BRANCH=pr-<PR#>`.
- `cloudflare-preview.yml` (extend) — pass `NEON_PREVIEW_BRANCH` env to `wrangler deploy --env preview`; Hyperdrive config uses that branch.
- On `pull_request` closed: call Neon API `DELETE /projects/{project_id}/branches/pr-<PR#>` (idempotent).

#### File inventory (PR F)

| Action | Path | Why |
|---|---|---|
| Create | `migrations/0001_vendor_pages.sql` | Neon schema for vendor markdown |
| Create | `migrations/README.md` | Migration runbook (cited from Neon docs) |
| Create | `scripts/migrate-neon.ts` | Applies migrations to a target branch. Uses NEON_DATABASE_URL. |
| Modify | `scripts/crawl-vendors.ts` | Optional UPSERT to Neon when `NEON_DATABASE_URL` is set |
| Create | `scripts/lib/neon-client.ts` | Thin wrapper over `@neondatabase/serverless`. ~60 LOC. |
| Create | `scripts/lib/neon-client.test.ts` | Mocked-driver tests; no live Neon required for CI unit gate |
| Modify | `frontend/wrangler.jsonc` | Add Hyperdrive binding (`OUTCOMES_DB`) |
| Modify | `frontend/src/worker.ts` | Hyperdrive read path for `/vendor/*` with Static-Assets fallback |
| Modify | `infra/cloudflare/wrangler.jsonc` | Add Hyperdrive binding for the agent Worker (already had NEON_API_KEY; now adds the connection-pooling layer) |
| Create | `.github/workflows/neon-branch-on-pr.yml` | Per-PR branch lifecycle (create on open, delete on close) |
| Modify | `.github/workflows/cloudflare-preview.yml` | Wire `NEON_PREVIEW_BRANCH` into the preview deploy |
| Create | `docs/operator-runbooks/neon-hyperdrive-setup.md` | One-time runbook: create the Hyperdrive config in Cloudflare dashboard pointing at the Neon main branch's pooler URL. Operator action; documented per the cited Neon guide. |
| Modify | `docs/pending.md` | Add Hyperdrive setup runbook to Column 1 |
| Create | `rubrics/phase-13.md` O8 criteria | Per-PR branch created on open; deleted on close; frontend preview reads from the branch; production reads from main |
| Modify | `package.json` (root) | Add `@neondatabase/serverless` to deps |
| Create | `seeds/citations/neon-branching.md` | Header extract from the cited Neon guide |

#### Verification (PR F)

| Check | Command |
|---|---|
| Migration applies cleanly | `npx tsx scripts/migrate-neon.ts --branch main` (against a scratch branch first) |
| Crawler dual-writes | `NEON_DATABASE_URL=... npm run crawl:vendor -- anthropics` then `psql $NEON_DATABASE_URL -c "select count(*) from vendor_pages"` returns >0 |
| CI branch lifecycle | Open a throwaway PR → Neon dashboard shows `pr-<N>` branch; close PR → branch deleted within 5 min |
| Frontend reads Neon | `curl https://pr-<N>.outcomesdk-frontend.workers.dev/vendor/anthropics/...` returns content from the PR branch (mutate via SQL to confirm it's the branch, not main) |
| Production unaffected | `curl https://outcomesdk.com/vendor/...` reads from main branch (unchanged) |

## Updated outcome map (full session)

| ID | Outcome | PR |
|---|---|---|
| O1 | anthropic-engineering crawl + daily /schedule | A (closes #46) |
| O2 | sitemap.xml discovery in crawler | B |
| O3 | vendor/openfeature/ mirror | B |
| O4 | vendor/cloudflare/flagship/ extension | B |
| O5 | @openfeature/server-sdk + @cloudflare/flagship wired | C |
| O6 | Color-code demo (8 colors) gated by flag | D |
| O7 | outcomesdk.com pretext frontend (ASCII + accordion) | E |
| O8 | Per-PR Neon branch + vendor_pages dual-write | F |

## Updated risks (PR E + PR F additions)

| Risk | Mitigation |
|---|---|
| **pretext API surface evolves.** `@chenglou/pretext` is one-author, low-version. Breaking change could brick the frontend. | Pin to exact version in `frontend/package.json`. Wrap pretext in `frontend/src/lib/pretext-shim.ts` so upgrades touch one file. |
| **ASCII animation drains battery on mobile.** RAF loop at 60fps on iPhone is hot. | `IntersectionObserver` pauses the animation when off-screen. `prefers-reduced-motion` respected (renders one static frame). |
| **Vendor markdown XSS via accordion.** Markdown can contain HTML; some vendor pages have `<script>` patterns in code blocks. | DOMPurify with allow-list config; code blocks rendered as `<pre><code>` with escaped text (marked default); no `<script>` ever survives. |
| **Custom-domain binding fails on first deploy.** API token may lack Zone:Edit on outcomesdk.com. | Pre-flight check in `deploy:frontend` script: query Cloudflare API for zone before `wrangler deploy`. If unauthorized, abort with a clear message pointing to the runbook. |
| **Neon connection pool exhaustion at preview branches.** Each PR opens connections; under load the pooler caps out. | Hyperdrive (Cloudflare's connection pooling layer) sits between Worker and Neon — handles this natively. Cited at `vendor/cloudflare/developers.cloudflare.com/hyperdrive/...` (auto-crawled). |
| **Per-PR branch cleanup misses.** If the close webhook fails, abandoned branches accumulate (cost). | `.github/workflows/neon-branch-cleanup.yml` runs nightly: lists branches with `pr-*` prefix; deletes any whose PR is closed/merged in GitHub. Documented in the runbook. |
| **First-time Hyperdrive config requires dashboard action.** No MCP tool exposes Hyperdrive config creation. | Documented as one of the 6-runbook operator actions in `docs/pending.md`. The deploy gracefully degrades to Static-Assets-only when the binding is absent. |

## Updated issue-creation plan

1. **#46** — closed by PR A.
2. **New issue (likely #53):** "Phase 13.B-extended — OpenFeature + Cloudflare Flagship + color-code demo (O2-O6)" — closed by PR D.
3. **New issue (likely #54):** "outcomesdk.com frontend + Neon branching (O7-O8)". Body:
   - **Task 5 — Frontend (O7)** — 4 subtasks (pretext shell, ASCII art, sane accordion, vendor renderer), ~14 todos.
   - **Task 6 — Neon vendor_pages + per-PR branching (O8)** — 3 subtasks (schema + dual-write, CI lifecycle, Hyperdrive read path), ~10 todos.
   - Linked back to `vendor/anthropics/neon.com/guides/cloudflare-sandbox-neon-branching.md` and CONVENTIONS.md.

## Full file inventory delta (PRs E + F summarized)

### PR E
- `frontend/**` (new directory: package.json, wrangler.jsonc, src/, tests/, scripts/, vite.config.ts, tsconfig.json)
- Root `package.json` (modify — add deploy scripts)
- `.github/workflows/cloudflare-preview.yml` (modify — add frontend job)
- `seeds/citations/pretext.md` (new)
- `docs/operator-runbooks/outcomesdk-domain.md` (new; placeholder)
- `rubrics/phase-13.md` (modify — O7)

### PR F
- `migrations/0001_vendor_pages.sql` (new)
- `migrations/README.md` (new)
- `scripts/migrate-neon.ts` (new); `scripts/lib/neon-client.ts` + `.test.ts` (new)
- `scripts/crawl-vendors.ts` (modify — Neon UPSERT branch)
- `frontend/wrangler.jsonc` (modify — Hyperdrive binding); `frontend/src/worker.ts` (modify — read path)
- `infra/cloudflare/wrangler.jsonc` (modify — Hyperdrive binding)
- `.github/workflows/neon-branch-on-pr.yml` (new); `cloudflare-preview.yml` (modify)
- `docs/operator-runbooks/neon-hyperdrive-setup.md` (new)
- `docs/pending.md` (modify); `package.json` (modify — @neondatabase/serverless)
- `seeds/citations/neon-branching.md` (new); `rubrics/phase-13.md` (modify — O8)

## Reused infra (no need to recreate, for PR E + F)

- `scripts/lib/checksums.ts` (PR #52) — crawler already has content-hash output; PR F just pipes that hash into the `vendor_pages.content_hash` column.
- `infra/cloudflare/wrangler.jsonc` (existing) — provides the template for Secrets Store binding patterns; `frontend/wrangler.jsonc` mirrors the structure minus the agent-specific bindings.
- `.github/workflows/cloudflare-preview.yml` (existing) — existing scaffolding for Cloudflare deploys; PR E adds a parallel job, PR F adds Neon env wiring.
- `vendor/anthropics/neon.com/guides/cloudflare-sandbox-neon-branching.md` (existing) — authoritative citation for the entire branching pattern. Already in our mirror; no new crawl needed.
- `seeds/posture/session-start.xml` — confirms OAuth-only posture; frontend Worker inherits zero Claude secrets (mechanically enforced by separate wrangler config).

## Final end-of-session "done" state (PRs A–F)

- **6 PRs** opened with `automerge` label; all merge after CI gates pass (auto-merge handles the loop).
- Issue #46 closed by PR A; new issue (#53) closed by PR D; new issue (#54) closed by PR F.
- `npm run verify` green on each PR.
- `vendor/anthropic-engineering/`, `vendor/openfeature/`, `vendor/cloudflare/flagship/**` committed (PRs A + B).
- `npm run dev "..."` locally renders TodoTracker with cyan icons (PR D).
- **`outcomesdk.com` resolves** to the pretext frontend (PR E merge).
- **Per-PR Neon preview branches** spawn for any future PR; frontend preview deploys point at them (PR F merge).
- `rubrics/phase-13.md` shows O1-O8 all ✅.
- `docs/pending.md` Column 1 grows by 3 entries (Flagship app setup, outcomesdk-domain fallback if needed, Neon Hyperdrive setup).

## Why this is achievable in one session

- **PRs A–D are mechanical extensions of existing patterns** (vendor crawler + auto-merge loop). The chassis we built handles them.
- **PR E is bounded by the pretext library being already-built and framework-agnostic** — ~700 LOC of new frontend code, mostly the ASCII art + accordion + vite scaffolding. No backend, no auth, no DB.
- **PR F is the heaviest** but the Neon API is well-documented and the existing repo has `NEON_API_KEY` + `NEON_PROJECT_ID` already bound. The pattern is cited verbatim in our vendor mirror.
- Auto-merge after CI handles the human-bottleneck of merging 6 PRs sequentially.
- The orchestrator (this session) drives the issue creation, branch creation, commit composition, and PR open — and then yields control to CI gates + the auto-merge label.
