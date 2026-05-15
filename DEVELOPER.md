# DEVELOPER.md — developer onboarding

> First-time setup + day-to-day workflows. Closes Phase 14.B per issue #49.

## One-time setup

```bash
# 1. Clone the repo
git clone https://github.com/subagentceo/knowledge-engineering.git
cd knowledge-engineering

# 2. Install Node 20+ (mise / nvm / asdf / whatever)
node --version  # >= 20

# 3. Install deps
npm install

# 4. Set up OAuth token (NOT an API key)
#    Either: copy from `claude setup-token` output
#    Or: run `claude setup-token` and paste here
export CLAUDE_CODE_OAUTH_TOKEN="..."

# 5. Hard rule: NEVER set ANTHROPIC_API_KEY
unset ANTHROPIC_API_KEY

# 6. Verify the chain
npm run verify
```

Expected `npm run verify` output: green across `verify:mcp`, `verify:tf`, `verify:citations`, `verify:gates`, `verify:libs`, `verify:freshness`, `verify:project`.

## Day-to-day workflows

### Add a new vendor

1. Create `vendor/<name>/crawl.json`:
   ```json
   {
     "name": "<name>",
     "homepage": "https://<host>",
     "llms_txt_candidates": ["https://<host>/llms.txt"],
     "transform": "append-md-and-accept",
     "allow_prefixes": ["https://<host>/"],
     "page_cap": 60
   }
   ```
2. Crawl: `npm run crawl:vendor -- <name>`
3. Inspect `vendor/<name>/{urls.md, <host>/...}` — commit if it looks right.
4. If the vendor is in the v2 catalog (`seeds/citations/vendor-graph-v2.xml`), great. Otherwise add to `src/lib/vendor-catalog.test.ts` `LEGACY_ALLOW`.
5. Open a PR per `docs/CONVENTIONS.md`.

See `docs/lanes/vendor/index.md` for the long version.

### Add a new MCP lane

A lane is a single `.ts` file under `src/mcp/lanes/`. Pattern:

```ts
export function registerMyLane(server: McpServer): void {
  server.tool("my_index", "...description...", {}, async () => { ... });
  server.tool("my_fetch", "...", { url: z.string() }, async ({ url }) => { ... });
  server.tool("my_search", "...", { q: z.string() }, async ({ q }) => { ... });
}
```

Wire it in `src/mcp/bridge-server.ts`. Update `scripts/verify.ts`'s `expected` tool count. Commit.

### Add a new skill

Skills live at `.claude/skills/<name>.md`. Frontmatter shape:

```markdown
---
name: <name>
description: >
  When-to-invoke; what-it-does.
disable-model-invocation: false
---
# Per-tick procedure
...
```

See `.claude/skills/heartbeat.md` for the canonical example.

### Write a test (with `@cite` header)

Every test file under `scripts/lib/`, `src/lib/`, or `infra/cloudflare/src/` MUST have an `@cite` header pointing at `vendor/`, `seeds/`, or `rubrics/`:

```ts
/**
 * @cite vendor/anthropics/platform.claude.com/docs/en/...md
 * @cite rubrics/phase-N.md
 */
```

`scripts/lib/citation-guard.ts` checks this. CI fails without it.

### Open a PR

The PR template (`.github/pull_request_template.md`) auto-loads. Fill in:

- **Outcomes** — `O1`, `O2`, etc.
- **Closes #N / Refs #N**
- **Test plan** checklist

Apply `automerge` label. The PR auto-merges when CI greens (Layer 1 enforcement). Layer 2 (branch protection) is operator-pending (issue #37).

### Run a heartbeat tick

The heartbeat skill at `.claude/skills/heartbeat.md` is the cross-session orchestration loop. Each tick:

1. Reads `seeds/memory/heartbeat/last-tick.md` + `next-actions.md`
2. Picks the top action
3. Verifies rubric gates green
4. Executes (commits per todo)
5. Opens PR with `automerge` label
6. Records decision in `decisions.md`; updates `last-tick.md`
7. Yields

In a Claude Code session, prompt: "run heartbeat tick" or "what's next?" The agent reads the discipline + executes.

## Repository layout

```
src/                — orchestrator + MCP servers + lib helpers
vendor/             — mirrored vendor docs (~80 MB; first-class)
scripts/            — crawler, verify chain, grader, install-plugins, ...
infra/              — Cloudflare Worker (Sandbox + Neon branching)
frontend/           — outcomesdk.com (pretext-driven SPA)
docs/               — architecture, governance, conventions, PROJECT, pending, plans, runbooks
seeds/              — prompts (operator seeds), posture XML, citation extracts, memory
rubrics/            — per-phase outcome rubrics (0..16)
.claude/            — skills, plugins, agents, settings.local
.github/            — workflows (verify, OSV, neon-branch, auto-merge, claude-review, ...)
migrations/         — Neon SQL migrations
servers/            — auto-generated MCP-tool wrapper tree (Phase 6.A)
```

## Verify chain details

| Step | What | Cost |
| :--- | :--- | :--- |
| `verify:mcp` | Builds + asserts tool count on each MCP server | seconds |
| `verify:tf` | `terraform validate` + `terraform plan` | seconds |
| `verify:citations` | Lints test files for `@cite` headers | seconds |
| `verify:gates` | Asserts `docs/phase-gates.md` matches `rubrics/phase-N.md` | seconds |
| `verify:libs` | Auto-runs every `*.test.ts` under `scripts/lib/`, `src/lib/`, `infra/cloudflare/src/` | seconds |
| `verify:freshness` | Warns on stale vendor mirrors (>14d) | seconds |
| `verify:project` | Asserts `docs/PROJECT.md` Cowork sections + `docs/pending.md` freshness | seconds |

Total: ~30-60 seconds on a clean repo. Slower if vendor mirrors need network fallback.

## Common issues

### "ANTHROPIC_API_KEY is set"

Unset it. The chassis is OAuth-only.

```bash
unset ANTHROPIC_API_KEY
```

### "verify:citations: missing @cite header"

Add an `@cite` line in your test file's docblock. Must point at `vendor/`, `seeds/`, or `rubrics/`.

### "convention test: subject doesn't match"

Your commit subject needs `(O<N>)` at the end. Amend with `git commit --amend`.

### Neon CI fails on a PR

If `Create Neon Branch` job fails: check the `::error::` annotation. The chain post-PR-#72 reliably surfaces the root cause.

### vendor/<name>/ crawl returns 0 pages

Check `crawl.json`:
- `allow_prefixes` — does the actual llms.txt content list URLs matching this prefix?
- `page_cap` — `0` was historically "no cap" but now treats as zero (PR #67 fix); always set explicitly.
- `html_index_sources` — does the page render content server-side? If JS-rendered, html-index returns 0.

## See also

- `RUNBOOK.md` — using Claude Opus 4.7 (1M context) as the web orchestrator
- `CONTRIBUTING.md` — PR discipline + chassis pattern
- `CLAUDE.md` — project-level Claude context (auto-loaded by sessions)
- `docs/CONVENTIONS.md` — Conventional Commits + outcome IDs
- `docs/PROJECT.md` — Cowork-style manifest
- `docs/architecture.md` — runtime topology
- `docs/governance.md` — branch ruleset + auto-merge state machine
- `docs/operator-runbooks/README.md` — operator-side runbooks
