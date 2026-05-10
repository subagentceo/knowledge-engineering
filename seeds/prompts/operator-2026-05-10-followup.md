---
kind: operator-prompt-seed-addendum
date: 2026-05-10
verbatim: false
note: |
  Addendum to operator-2026-05-10.md. Captures the operator's follow-up
  directive that adds the Neon × Cloudflare Sandbox guide as the 11th cited
  URL and expands Phase 0 to include the Full-Stack Cloud Agent runner
  scaffolding under infra/cloudflare/.
status: load-bearing
parent: operator-2026-05-10.md
---

# Operator follow-up — 2026-05-10 (Full-Stack Cloud Agents)

The operator's follow-up directive after the initial plan was approved.
Treat as part of the Phase 0 working agreement.

## Directive (paraphrased)

After committing the plan edits, **expand Phase 0 to include
Full-Stack Cloud Agent runner scaffolding** based on the Neon × Cloudflare
Sandbox guide:

- Cited URL: `https://neon.com/guides/cloudflare-sandbox-neon-branching.md`
- Local path: `vendor/anthropics/neon.com/guides/cloudflare-sandbox-neon-branching.md`
- Self-set up OAuth and Cloudflare via Neon's Claude / GitHub integration
  on `subagentceo/knowledge-engineering`.
- Use **pre-built connectors** for the services where they exist; fall back
  to direct MCP only when no connector covers the service. Once connectors
  are loaded, code-mode programmatic tool calling (Phase 6) is the default
  path.
- Follow the publicly-documented **Boris Cherny subagent loop and
  routines** pattern.

## Operator account ledger

The operator runs two GitHub accounts on the `subagentceo` org with admin
on the following services. Connectors for these services should be
registered first; `@cloudflare/codemode` writes against their generated
`servers/<connector>/<tool>.ts` rather than direct tool calls.

| Account                | GitHub org access     |
| ---------------------- | --------------------- |
| `admin@jadecli.com`    | admin on `subagentceo` |
| `alex@jadecli.com`     | admin on `subagentceo` |

| Service                     | Connector role                                                         | In the 12-vendor list? |
| --------------------------- | ---------------------------------------------------------------------- | ---------------------- |
| `parallel.ai`               | (TBD — connector availability check)                                   | No (new)               |
| `dash.cloudflare.com`       | sandbox host + edge runtime; `@cloudflare/codemode`; CF MCP connector  | Yes (cloudflare)       |
| `neon.com`                  | ephemeral DB branches + Neon SDK                                       | Yes (neon)             |
| `turbopuffer.com`           | vector store (future use for embeddings/grep)                          | Yes (turbopuffer)      |
| `nimbleway.com`             | (TBD — connector availability check)                                   | No (new)               |
| `ollama.com`                | local-model fallback for offline crawl/grade tasks                     | No (new)               |
| `sentry.com`                | error monitoring for the runner Worker                                 | Yes (sentry)           |

The three new services (parallel.ai, nimbleway.com, ollama.com) are added
to the discovery target list in Phase 7 (GH GraphQL discovery extends to
their orgs once we know their canonical GitHub presence). They are **not**
added to the 12-vendor crawl list in this PR; that decision is deferred
until their llms.txt availability is confirmed.

## Conflict with the OAuth-only posture

The cited Neon guide sets `ANTHROPIC_API_KEY` inside the sandbox via
`sandbox.setEnvVars({ ANTHROPIC_API_KEY: env.ANTHROPIC_API_KEY, ... })`.
**This conflicts with the operator-2026-05-10.md posture's hard rule that
`ANTHROPIC_API_KEY` is never set.**

When two operator directives conflict, the more restrictive auth posture
wins. Resolution:

- **Substitute `CLAUDE_CODE_OAUTH_TOKEN` for `ANTHROPIC_API_KEY` in
  `sandbox.setEnvVars()`.**
- The Claude Code CLI (`@anthropic-ai/claude-code`, installed in the
  sandbox per the guide's Dockerfile) honors `CLAUDE_CODE_OAUTH_TOKEN` for
  auth (existing pattern in `src/oauth/token.ts`).
- A Worker-side env-sanitizer rejects any attempt to forward
  `ANTHROPIC_API_KEY` into a sandbox before the call lands.
- The conflict is documented verbatim in `docs/architecture.md#cloud-agents`
  and in this PR's body.

## Connectors-first development

> "Connectors pre-built enable more simple development by using code mode for
> their MCP's once connectors are used. Follow Boris Cherny subagent loop and
> routines based system design."

Before any custom MCP server work, register the available pre-built connectors
and let `gen:servers` (Phase 6) emit `servers/<connector>/<tool>.ts` for each.
Then code-mode programmatic tool calling (Phase 6) is the default path; raw
MCP tool calls are reserved for connectors that don't exist yet.

In Phase 0, this means: per-doc ingestion uses the Cloudflare MCP connector
and the GitHub MCP connector (already loaded in this session) for fetches.
Only when neither connector covers a URL do we fall back to `curl`.

## Self-setup steps (operator action, documented for reproducibility)

The agent cannot drive a browser-based OAuth flow; the operator performs
these steps once:

1. In the Neon Console (`neon.com`, account `admin@jadecli.com` or
   `alex@jadecli.com`) → install the Claude integration on the `subagentceo`
   GitHub org → grant access to `knowledge-engineering`.
2. The integration provisions a project-scoped Neon API key, captures the
   project ID, and uploads both as Cloudflare Worker secrets via Cloudflare's
   API (operator must authorize the Cloudflare side).
3. Result: `wrangler secret list` on the Worker shows `NEON_API_KEY`,
   `NEON_PROJECT_ID`, `GITHUB_TOKEN`, `CLAUDE_CODE_OAUTH_TOKEN` — **no**
   `ANTHROPIC_API_KEY`.
4. The Phase 0 rubric for the runner includes a `setup-check` script that
   asserts the four expected secrets exist and `ANTHROPIC_API_KEY` does not.

## Updated Phase 0 deliverables

Phase 0 now includes:

- **0g.** `infra/cloudflare/` runner scaffolding per the cited Neon guide
  (with the OAuth substitution above).
- **0h.** `docs/architecture.md` — adds the operator account ledger and the
  cloud-agents section documenting the OAuth substitution.

The runner is **scaffolded but not deployed in this PR.** Deployment
requires the operator-side self-setup steps above.
