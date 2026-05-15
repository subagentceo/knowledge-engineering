# servers/knowledge-bridge/

AUTO-GENERATED catalog. Re-run `npm run gen:servers` after any tool surface change.

| Tool | Description |
|---|---|
| `engineering_index` | List posts on https://www.anthropic.com/engineering. Returns title + url for each post discovered on the index page. |
| `engineering_fetch` | Fetch a specific engineering post. Accepts either a full https://www.anthropic.com/engineering/<slug> URL or the slug al |
| `engineering_search` | Text-match the engineering index titles. Case-insensitive substring search; returns the matching entries. |
| `blog_index` | List posts on https://www.claude.com/blog. Returns title + url for each post discovered on the index page. |
| `blog_fetch` | Fetch a specific Claude blog post. Accepts a full https://www.claude.com/blog/<slug> URL or the slug alone. Mirror-first |
| `blog_search` | Text-match the Claude blog index titles. Case-insensitive substring search. |
| `support_collections` | List the curated set of support.claude.com collection slugs we recognize. Each entry is the slug used by the bridge tool |
| `support_collection` | Fetch a collection page and return the article links it lists. `slug` is e.g. '14445694-claude-code'. |
| `support_article` | Fetch a specific support article. Accepts a full https://support.claude.com/en/articles/<id-slug> URL or the bare '<id>- |
| `support_search` | Text-match support.claude.com article titles against the local mirror manifest. Returns URL + slug-derived title for eac |
| `llms_namespaces` | List the curated set of llms.txt namespaces this bridge knows about. |
| `llms_fetch` | Fetch one llms.txt namespace and return its raw text. `id` is one of the values returned by `llms_namespaces` (e.g. 'cod |
| `llms_grep` | Case-insensitive line-grep across every known llms.txt namespace. Mirror-first per namespace (no HTTP if the body is in  |
| `vendor_list` | List the vendors mirrored under vendor/. Each entry includes the discovered llms.txt URL, last crawl timestamp, and the  |
| `vendor_fetch` | Fetch a vendor doc by URL. Returns local mirror body when available (source:'mirror'); otherwise falls back to live HTTP |
| `vendor_grep` | Case-insensitive line-grep across the local vendor mirror. Optionally restrict to one vendor. Returns each hit with the  |
| `project_git_status` | Report git working-tree status as structured JSON. Replaces Bash(`git status --porcelain`) at roughly half the token cos |
| `search_tools` | Progressive-disclosure tool discovery for the codemode runtime. Searches across servers/<name>/README.md catalogs and re |

Each entry is a thin wrapper around `callMCPTool("knowledge-bridge__<tool>", input)`. The actual MCP server lives at the corresponding `src/mcp/` path; this tree is the **filesystem-tree tool API** the codemode runtime imports from.
