# Installations — 2026-05-15-stable

> Frozen npm install state at the snapshot moment. Captured via
> `npm ls --depth=0` across the three workspaces + the globally
> installed `@anthropic-ai/claude-code` binary.

## Claude Code CLI (global)

```
+-- @anthropic-ai/claude-code@2.1.142
```

Bumped during this session from `2.1.42` (npm-global) → `2.1.142`. The
runtime binary at `/opt/claude-code/bin/claude` was already on
`2.1.142` (separate system-managed install symlinked from
`/opt/node22/bin/claude`).

Reference: https://www.npmjs.com/package/@anthropic-ai/claude-code/v/2.1.142

## Root workspace — `@subagentceo/knowledge-engineering@0.1.0`

Path: `/home/user/knowledge-engineering/package.json`

```
+-- @anthropic-ai/claude-agent-sdk@0.2.138       ← chassis declares ^0.2.0; npm latest is 0.3.142 ⚠
+-- @anthropic-ai/sdk@0.95.1 (overridden)
+-- @crawlee/cheerio@3.16.0
+-- @modelcontextprotocol/inspector@0.21.2
+-- @modelcontextprotocol/sdk@1.29.0
+-- @neondatabase/serverless@1.1.0               ← added by PR #58 (O8)
+-- @openfeature/server-sdk@1.21.0               ← added by PR #55 (O5)
+-- @types/node@22.19.18
+-- @types/turndown@5.0.6
+-- tsx@4.21.0
+-- turndown@7.2.4
+-- typescript@5.9.3
`-- zod@4.4.3
```

### Agent SDK version drift ⚠

The operator flagged a minor-version bump landed on npm yesterday
(2026-05-14): https://www.npmjs.com/package/@anthropic-ai/claude-agent-sdk

- Currently installed: **`0.2.138`**
- npm `latest`: **`0.3.142`** (also `next`)
- Trajectory observed: `0.2.141` → `0.3.142` (minor bump within ~24h)

A `0.2.x → 0.3.x` bump signals breaking changes by semver convention.
Not bumped in this snapshot. Tracked for the `next` snapshot — needs a
dedicated PR with a breaking-change audit against `src/agent/run.ts`,
`src/agent/planning.ts`, `src/agent/todo-tracker.ts`.

Reference: https://www.npmjs.com/package/@anthropic-ai/claude-agent-sdk/v/0.3.142

## `frontend/` workspace — `@subagentceo/outcomesdk-frontend@0.1.0`

Path: `/home/user/knowledge-engineering/frontend/package.json`

```
+-- @chenglou/pretext@0.0.7                      ← canvas-based text measurement (PR #57)
+-- @cloudflare/workers-types@4.20260510.1
+-- @types/dompurify@3.2.0
+-- @types/jsdom@28.0.1
+-- @types/node@22.19.18
+-- dompurify@3.4.2
+-- jsdom@29.1.1                                 ← test-only; kept out of browser bundle
+-- marked@15.0.12
+-- tsx@4.21.0
+-- typescript@5.9.3
+-- vite@6.4.2
`-- wrangler@4.90.0
```

Workspace introduced by PR #57. Build output:

- Bundle: 109 KiB (37 KiB gzipped)
- Worker upload: 19 KiB (4.86 KiB gzipped)
- Vendor manifest: 1,680 pages copied into `public/vendor/` at build time

## `infra/cloudflare/` workspace — `@subagentceo/ke-cloud-agent@0.0.1`

Path: `/home/user/knowledge-engineering/infra/cloudflare/package.json`

```
+-- UNMET DEPENDENCY @cloudflare/sandbox@^0.5.0           ⚠
+-- UNMET DEPENDENCY @cloudflare/workers-types@^4.20260101.0  ⚠
+-- UNMET DEPENDENCY @neondatabase/api-client@^2.1.0       ⚠
+-- UNMET DEPENDENCY @openfeature/server-sdk@^1.21.0       ⚠
+-- UNMET DEPENDENCY typescript@^5.6.0                     ⚠
`-- UNMET DEPENDENCY wrangler@^4.0.0                       ⚠
```

`npm install` has never been run inside this workspace. The
`wrangler.jsonc` config + `src/worker.ts` typecheck against the root
workspace's `tsconfig.json`. To deploy:

```sh
cd infra/cloudflare && npm install && npx wrangler deploy --dry-run
```

This is flagged but not blocking — the Worker is gated on 5 operator
runbooks (issues #33, #34, etc.) for Secrets Store provisioning before
a real deploy makes sense.

## Web sandbox runtime (Anthropic-managed VM)

Pre-installed tools per
https://code.claude.com/docs/en/claude-code-on-the-web.md#installed-tools.
The chassis uses:

- **Node.js**: 20 (via nvm) — confirmed `/opt/node22/bin/` path
- **TypeScript / tsx**: pinned per workspace
- **Git**: pre-installed
- **PostgreSQL**: pre-installed (`service postgresql start`) — relevant for `migrations/` work
- **Docker**: pre-installed (not currently used)

No `setup-script` configured for the cloud environment (the chassis
runs out-of-the-box from a fresh clone). If one is added in the
future, capture it here.

## Notes on captured `claude-code` runtime

Environment at capture:

| Variable | Value |
|---|---|
| `AI_AGENT` | `claude-code_2-1-142_agent` |
| `CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST` | `1` |
| `CLAUDE_CODE_REMOTE_ENVIRONMENT_TYPE` | `cloud_default` |
| `CLAUDE_CODE_PROXY_RESOLVES_HOSTS` | `true` |
| `ANT_IMAGE_REPOSITORY` | `sandbox-ccr-default` |
| `IS_SANDBOX` | `yes` |
| `CLAUDE_EFFORT` | `max` |
| `CLAUDE_AUTO_BACKGROUND_TASKS` | `true` |
| `NODE_OPTIONS` | `--max-old-space-size=8192` |
