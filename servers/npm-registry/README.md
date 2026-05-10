# servers/npm-registry/

AUTO-GENERATED catalog. Re-run `npm run gen:servers` after any tool surface change.

| Tool | Description |
|---|---|
| `npm_org_packages` | List all packages owned by an npm organization. Returns name + role per package. Source: https://www.npmjs.com/org/{org} |
| `npm_package_metadata` | Fetch a package document from the npm registry: versions, dist-tags, maintainers, latest manifest. Source: https://regis |
| `npm_downloads` | Download counts for a package over a window (last-day | last-week | last-month). Source: https://api.npmjs.org/downloads |
| `npm_search` | Full-text search the npm registry. Returns up to `size` results with name, description, and score. Source: https://regis |

Each entry is a thin wrapper around `callMCPTool("npm-registry__<tool>", input)`. The actual MCP server lives at the corresponding `src/mcp/` path; this tree is the **filesystem-tree tool API** the codemode runtime imports from.
