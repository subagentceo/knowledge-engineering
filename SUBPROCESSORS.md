# Subprocessors

> Inspired by <https://trust.anthropic.com/subprocessors>. A subprocessor
> is a third party we depend on to deliver this software. This page is the
> transparent inventory of every vendor the chassis touches, what data it
> sees, how it authenticates, and where to find the canonical docs.
>
> Per `PRODUCTRD.md` §N1, this is single-tenant by design — none of these
> subprocessors handle end-user data because there are no end-users.
> Once a forking founder adds an end-user surface, they MUST re-evaluate
> each row below for their own privacy posture.

## Posture

- **OAuth-only at the trust root.** Anthropic Claude is authenticated via
  `CLAUDE_CODE_OAUTH_TOKEN` — never `ANTHROPIC_API_KEY`. Per
  `seeds/prompts/operator-2026-05-10.md` + `src/oauth/token.ts`, the
  gate fails closed if `ANTHROPIC_API_KEY` is set anywhere.
- **Local mirror first.** Where a vendor publishes docs, we crawl them
  into `vendor/<name>/` so the bridge runs offline. The mirror is
  read-only; vendor data flows IN at crawl time only.
- **No customer data flows out.** The chassis itself ships no PII, no
  user content. Every outbound call is documented below.

## Tier 1: services with active outbound network calls

These are the subprocessors a `npm run dev` session actively reaches at runtime.

| Vendor | Role | Auth | Outbound data | Local mirror | Cited docs |
|---|---|---|---|---|---|
| **Anthropic** | Claude model + Messages/Batches API | `CLAUDE_CODE_OAUTH_TOKEN` (Bearer) | user prompts, tool outputs, seed prompts | n/a (it's the model) | `vendor/anthropics/{platform,code}.claude.com/...` (13 docs) |
| **GitHub** | repo + Actions runners + secrets store + Issues/PRs | GH MCP OAuth or workflow-scoped `GITHUB_TOKEN` | commit content, issue/PR bodies, audit-log events | n/a | `vendor/anthropics/claude.com/docs/connectors/building.md` (via Connector spec) |
| **Cloudflare** | Worker host + Sandbox + Secrets Store + R2 (Phase 8) | `secrets.CLOUDFLARE_API_TOKEN` (Bearer; minimum scopes: Workers Scripts Edit + Secrets Store Write) | Worker code, environment bindings, sandbox stdout | scaffolded; `infra/cloudflare/` not deployed | `vendor/anthropics/neon.com/guides/cloudflare-sandbox-neon-branching.md`; `docs/operator-runbooks/cf-api-token.md` |
| **AlloyDB Omni** | Postgres branching per PR (free replacement for Neon) | `ALLOYDB_DATABASE_URL` (local TCP; no external subprocessor) | DB schema migrations, query history | n/a | `src/lib/alloydb-branch.ts` |
| **npm registry** | package metadata + download counts | none (public read API) | npm package names in search/metadata queries | partial (only the registry response is mirrored per query) | (no llms.txt; queries via `src/mcp/npm-registry/`) |
| **Turbopuffer** | vector + BM25 search (Phase 11.C) | `secrets.TURBOPUFFER_API_KEY` (Bearer) — **not yet provisioned** | vector + content of `vendor/<name>/<host>/<path>.md` body chunks, plus the operator's query strings | yes — `vendor/turbopuffer/` (36 docs) | `seeds/citations/turbopuffer.md`; `vendor/turbopuffer/turbopuffer.com/docs/{architecture,fts,hybrid,security,auth}.md` |
| **Voyage AI** | embeddings (Phase 11.C optional) | `secrets.VOYAGE_API_KEY` (Bearer) — **not yet provisioned** | text chunks (each vendor doc, ~1KB) for embedding | partial (vendor body bodies are the only input) | `vendor/anthropics/platform.claude.com/docs/en/build-with-claude/embeddings.md`; `seeds/citations/embeddings.md` |

## Tier 2: vendors we crawl but don't call at runtime

Vendor docs we mirror into `vendor/<name>/`. The crawler reaches these at
recrawl time only (manual `npm run crawl:vendors` or weekly via the
`refresh-vendors` skill); the bridge's `vendor_fetch` reads the local
mirror, with HTTP fallback only on cache miss.

| Vendor | Why mirrored | Local mirror status | Cited docs |
|---|---|---|---|
| `anthropics` (code.claude.com + platform.claude.com + claude.com) | core doc surface | 71 docs (Phase 2.A) | `vendor/anthropics/...` (13 files; all cited in Phase 0c) |
| `cloudflare` (developers.cloudflare.com) | infrastructure docs | 60 federated child indices | `vendor/cloudflare/` |
| `modelcontextprotocol` | MCP spec + SDK docs | 60 docs | `vendor/anthropics/claude.com/docs/connectors/building.md` |
| `stripe` | payments docs (chassis-pattern example) | 60 docs | none (chassis-pattern example) |
| `turbopuffer` | vector store docs | 36 docs | `seeds/citations/turbopuffer.md` |
| `arkose-labs` | bot/CAPTCHA defense (chassis-pattern example) | probe-only (no usable bodies) | none |
| `brave-search` | search API (chassis-pattern example) | deferred to Phase 2.B (issue #39) | none |
| `intercom` | help-center docs (chassis-pattern example) | probe failed; deferred to Phase 2.B | none |
| `sentry` | observability docs (chassis-pattern example) | deferred to Phase 2.B | none |
| `sift` | fraud-detection docs (chassis-pattern example) | deferred to Phase 2.B | none |
| `twilio` | comms docs (chassis-pattern example) | deferred to Phase 2.B | none |

## Turbopuffer-specific disclosure

Because Turbopuffer is the only subprocessor with an active write path
to a hosted store, it gets a finer-grained disclosure:

| Field | Value |
|---|---|
| **Endpoint** | `https://{region}.turbopuffer.com/v2/namespaces/<namespace>` |
| **Region** | TBD; pick from `regions.md` — recommend `gcp-us-east4` or `aws-us-east-1` to be near the operator's Cloudflare PoP |
| **Namespace strategy** | One namespace per vendor (`anthropics`, `cloudflare`, `stripe`, etc.) — matches `vendor/<name>/` layout |
| **Document shape** | `{id: relPath, vector: [<1024-dim>], content: <body>, relPath, url, vendor}` |
| **Search modes** | Vector ANN + BM25 + hybrid (rank fusion per `vendor/turbopuffer/.../hybrid.md`) |
| **Encryption** | TLS 1.2+ in transit; AES-256 at rest (object storage + SSD cache); SOC 2 Type 2 audited |
| **Data residency** | Single-region; data stays in selected region per `security.md` |
| **Compliance** | GDPR + CCPA DPA available; relevant only when forking adds end-user data |
| **BYOC option** | Available (`vendor/turbopuffer/.../byoc.md`) — keeps data in operator's AWS/GCP/Azure VPC. Overkill for our public-docs use case. |
| **Recall** | >90-95% recall@10 for vector queries via SPFresh |
| **Latency** | Cold p50=343ms (1M docs); warm p50=8ms — `warm-cache` pre-flight available |

## Auth flow per subprocessor

```
                  ┌─── (one-time, operator) ────┐
                  │                              │
operator's        ▼                              │
GitHub account    Settings → Secrets             │
                       │                         │
                       ▼                         │
   ┌──── secrets.* (GitHub Actions) ────┐        │
   │   CLAUDE_CODE_OAUTH_TOKEN          │        │
   │   CLOUDFLARE_API_TOKEN             │────────┤
   │   VOYAGE_API_KEY      (optional)   │        │
   │   TURBOPUFFER_API_KEY (optional)   │        │
   │   GITHUB_TOKEN (auto)              │        │
   └────────────────────────────────────┘        │
                       │                         │
                       ▼                         │
  CI workflows  ──────► subprocessor APIs        │
                                                 │
operator's        ┌── ~/.claude (CLI session) ──┐│
local machine ────►   inherited OAuth token     ├┘
                  └──────────────────────────────┘
                       │
                       ▼
              `npm run dev` ─► Anthropic Messages API
```

## Forking founders: re-evaluate every row

Per `PRODUCTRD.md` §R2, lanes are hard-coded to Anthropic-owned surfaces.
A forking founder MUST:

1. **Replace Tier 2 vendors** with their own domain (Notion, Linear,
   Stripe, internal wiki, etc.). Update `vendor/<their-vendor>/crawl.json`.
2. **Re-evaluate Tier 1 subprocessors** for their privacy posture once
   end-user data is added. Turbopuffer's namespace-per-tenant +
   row-level filter pattern (`vendor/turbopuffer/.../permissions.md`)
   is a starting point.
3. **Update this file** for their own subprocessor surface — keep the
   transparency.

The pattern matters more than the specific vendors here.

## Audit

This page is the canonical inventory. CI guard (Phase 7.B follow-up):
re-run `scripts/discover-sources.ts --check` to detect drift between
this page and `.claude/plugins.json` + `vendor/<name>/crawl.json`.

Last reviewed: 2026-05-10.
