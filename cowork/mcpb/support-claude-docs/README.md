# support-claude-docs — Claude Desktop Extension (.mcpb)

A local stdio MCP server, packaged as an `.mcpb` (MCP Bundle / Desktop Extension), that serves the
`vendor/support-claude-sitemap/` mirror to Claude Desktop. **Read-only, local filesystem only, no
network** — Claude gets one-click access to the support help-center docs as coworker-optimized `.md`.

> @cite cowork/plugins/mcp-server-dev/skills/build-mcpb/SKILL.md
> @cite https://support.claude.com/en/articles/12922929-building-desktop-extensions-with-mcpb

## Tools

| tool | input | returns |
| :-- | :-- | :-- |
| `list_collections` | — | the 16 `id-slug` collections + titles |
| `list_articles` | `collection` | article `.md` filenames in that collection |
| `read_article` | `collection`, `article` | the article markdown |

All paths are validated against `^[A-Za-z0-9._-]+$` and resolved under the configured mirror root
(no `..` traversal). The manifest exposes no sandbox — the guards in `server/index.mjs` are the
security boundary (per the build-mcpb skill's `local-security` guidance).

## Build & pack (run on macOS/Windows with the toolchain)

```bash
cd cowork/mcpb/support-claude-docs
npm install                                  # fetch @modelcontextprotocol/sdk + zod
npx @anthropic-ai/mcpb validate              # check manifest.json against the v0.4 schema
npx @anthropic-ai/mcpb pack                  # → support-claude-docs.mcpb (zips dir + bundled deps)
# optional: npx @anthropic-ai/mcpb sign support-claude-docs.mcpb
```

`node_modules/` must be present at pack time (the bundle ships its own deps — Claude Desktop's
built-in Node runs it without a global install). To slim the bundle you can instead
`npx esbuild server/index.mjs --bundle --platform=node --outfile=server/index.mjs` before packing.

## Install

1. `npx @anthropic-ai/mcpb pack` (above) → `support-claude-docs.mcpb`.
2. Claude for Mac → **Settings → Extensions** → drag the `.mcpb` in → **Install**.
3. When prompted, set **Support mirror directory** to your local
   `…/knowledge-engineering/vendor/support-claude-sitemap`.

## Test locally (stdio)

```bash
MIRROR_DIR=../../../vendor/support-claude-sitemap \
  npx @modelcontextprotocol/inspector node server/index.mjs
```

## Notes

- Populate the mirror first: run the crawl + organize from `cowork/runbooks/support-claude-sitemap.md`.
  Before the first crawl, `list_collections` returns the 16 collections and `read_article` returns
  each collection's generated `_collection.md` index.
- This is a *local* server because it reads local files. A server that only hit a cloud API should be
  a remote MCP server, not an `.mcpb` (build-mcpb skill).
