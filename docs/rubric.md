# Verifier Rubric (v1)

The `verifier` subagent runs after `npm-research` (and after any docs-lane
todo) to check outputs against this rubric. A todo is only marked
`completed` when every applicable item passes.

## R1. Source provenance
- [ ] Every citation references a `.md` URL on `code.claude.com`,
      `claude.com`, or `platform.claude.com`.
- [ ] No raw HTML page URLs are used as primary sources.
- [ ] `last_fetched` ISO-8601 timestamp present for every cited doc.

## R2. Lane discipline (four-lane bridge)
- [ ] Each docs page lives under `docs/lanes/{engineering,blog,support,llms}/`.
- [ ] Page front-matter declares its lane and at least one `source_url`.
- [ ] Lane assignment matches the source host:
      - `anthropic.com/engineering` → engineering
      - `claude.com/blog`           → blog
      - `support.claude.com`        → support
      - `*/llms.txt` derived pages  → llms

## R3. Planning discipline
- [ ] Plan was emitted via `TodoWrite` (headless) **or** `TaskCreate`
      (interactive) — never both in the same run.
- [ ] At most one step is `in_progress` at any time.
- [ ] Every step has a non-empty `activeForm` distinct from `content`.
- [ ] No step is silently dropped; status transitions go
      `pending → in_progress → completed`.

## R4. Loop / schedule first-class
- [ ] Long-running watches use a `kind: "loop"` step that maps to
      `/loop [interval] [prompt]`, with `.claude/loop.md` as the
      promptless fallback.
- [ ] Recurring or cloud-managed work uses a `kind: "schedule"` step
      that maps to `/schedule [description]`.
- [ ] Loop and schedule steps are not used to substitute for normal
      `task` steps inside a single session.

## R5. OAuth-only billing
- [ ] No reference to `ANTHROPIC_API_KEY` anywhere in code, docs,
      examples, scripts, or CI.
- [ ] Startup guard (`assertOAuthOnly()`) is invoked in every entry
      point: `src/agent/run.ts`, `scripts/verify.ts`,
      `scripts/verify-planner.ts`, every `src/examples/*.ts`.

## R6. MCP SDK v2 + Zod
- [ ] All MCP tools register Zod input schemas.
- [ ] `verify:mcp` exercises each tool via `@modelcontextprotocol/inspector`.

## R7. Cloudflare IaC opt-in
- [ ] `infra/terraform/` validates and plans cleanly; never `apply`.
- [ ] Provider version pinned via `CLOUDFLARE_TERRAFORM_PROVIDER_VERSION`.
- [ ] README documents `${CLOUDFLARE_MCP_URL}` as opt-in.

## Scoring
- Any unchecked R1, R3, or R5 item ⇒ verifier returns `fail` and the
  parent todo stays `in_progress`.
- Unchecked items in R2/R4/R6/R7 ⇒ verifier returns `warn` with a list;
  parent decides whether to proceed.
