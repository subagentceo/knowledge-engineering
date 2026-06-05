<!--
@cite vendor/modelcontextprotocol/modelcontextprotocol.io/examples.md
@cite vendor/anthropic-ai-npm/packages.json
-->

# MCP Reference Server Catalog

Source: github.com/modelcontextprotocol/servers (official reference implementations)

## Quick Reference Table

| ID | Transport | Auth Required | npm Package | Runtime |
|----|-----------|---------------|-------------|---------|
| everything | stdio | None | `@modelcontextprotocol/server-everything` | Node.js |
| fetch | stdio | None | `@modelcontextprotocol/server-fetch` | Node.js |
| filesystem | stdio | None (path-scoped) | `@modelcontextprotocol/server-filesystem` | Node.js |
| git | stdio | None | — | Python (uvx) |
| memory | stdio | None | `@modelcontextprotocol/server-memory` | Node.js |
| sequential-thinking | stdio | None | `@modelcontextprotocol/server-sequential-thinking` | Node.js |
| time | stdio | None | `@modelcontextprotocol/server-time` | Python (uvx) |

> Archived (no longer actively maintained — see servers-archived repo): brave-search, github, gitlab, google-drive, google-maps, postgres, puppeteer, sentry, slack, sqlite

---

## Current Reference Servers

### everything

- **Purpose:** Reference / test server demonstrating prompts, resources, and tools
- **Transport:** stdio
- **Auth:** None
- **Key tools:** Test harness for all MCP primitive types (tools, resources, prompts, sampling)
- **npm:** `npx -y @modelcontextprotocol/server-everything`

### fetch

- **Purpose:** Web content fetching and conversion for efficient LLM usage
- **Transport:** stdio
- **Auth:** None
- **Key tools:**
  - `fetch` — retrieves URL content, converts HTML to markdown
- **npm:** `npx -y @modelcontextprotocol/server-fetch`

### filesystem

- **Purpose:** Secure file operations with configurable access controls
- **Transport:** stdio
- **Auth:** None (access controlled by allowed-paths argument)
- **Key tools:**
  - `read_file` — read file contents
  - `write_file` — write/create files
  - `list_directory` — list directory entries
  - `create_directory` — create directories
  - `move_file` — move/rename files
  - `search_files` — search by name pattern
  - `get_file_info` — stat a file
- **npm:** `npx -y @modelcontextprotocol/server-filesystem /path/to/allowed/files`

### git

- **Purpose:** Tools to read, search, and manipulate Git repositories
- **Transport:** stdio
- **Auth:** None (operates on local repo paths)
- **Key tools:**
  - `git_status` — working tree status
  - `git_diff` — staged/unstaged diffs
  - `git_log` — commit history
  - `git_show` — show commit objects
  - `git_branch` — list/create branches
  - `git_checkout` — switch branches
  - `git_commit` — create commits
  - `git_search_code` — search repository content
- **Runtime:** Python — `uvx mcp-server-git` or `pip install mcp-server-git`

### memory

- **Purpose:** Knowledge graph-based persistent memory system
- **Transport:** stdio
- **Auth:** None
- **Key tools:**
  - `create_entities` — add nodes to graph
  - `create_relations` — add edges between entities
  - `add_observations` — attach facts to entities
  - `delete_entities` / `delete_relations` / `delete_observations`
  - `search_nodes` — semantic search over graph
  - `open_nodes` — retrieve entities by name
- **npm:** `npx -y @modelcontextprotocol/server-memory`

### sequential-thinking

- **Purpose:** Dynamic and reflective problem-solving through thought sequences
- **Transport:** stdio
- **Auth:** None
- **Key tools:**
  - `sequentialthinking` — structured multi-step reasoning with branch/revision support
- **npm:** `npx -y @modelcontextprotocol/server-sequential-thinking`

### time

- **Purpose:** Time and timezone conversion capabilities
- **Transport:** stdio
- **Auth:** None
- **Key tools:**
  - `get_current_time` — current time in any IANA timezone
  - `convert_time` — convert between timezones
- **Runtime:** Python — `uvx mcp-server-time`

---

## Archived Reference Servers

The following servers moved to [servers-archived](https://github.com/modelcontextprotocol/servers-archived). Provided for historical reference; no longer actively maintained.

| ID | Description | Auth | Notes |
|----|-------------|------|-------|
| brave-search | Web and local search via Brave Search API | API key (`BRAVE_API_KEY`) | Cross-reference: `vendor/brave-search/` |
| github | GitHub repos, issues, PRs, code search | PAT (`GITHUB_PERSONAL_ACCESS_TOKEN`) | `npx @modelcontextprotocol/server-github` |
| gitlab | GitLab projects, issues, MRs | PAT + optional instance URL | See also `vendor/claude-sitemap/connectors/gitlab.md` |
| google-drive | Browse, search, read Drive files | OAuth 2.0 (service account or user) | See `vendor/connectors/google-drive.yaml` |
| google-maps | Places, directions, geocoding | API key (`GOOGLE_MAPS_API_KEY`) | |
| postgres | Read-only SQL query execution | Connection string | |
| puppeteer | Browser automation, screenshots | None | |
| sentry | Issues, events, stack traces from Sentry | Auth token | Cross-reference: `vendor/sentry/` |
| slack | Messages, channels, users | Bot token (`SLACK_BOT_TOKEN`) | |
| sqlite | SQLite read/write via SQL | None (file path arg) | |

---

## Transport-Specific Framework Packages

These packages implement MCP server transports for different Node.js HTTP frameworks.
Source: `vendor/anthropic-ai-npm/packages.json` → `mcp_framework_packages`

| Package | Transport | Use Case |
|---------|-----------|----------|
| `@modelcontextprotocol/hono` | HTTP/SSE | Deploy as Cloudflare Worker or Hono app |
| `@modelcontextprotocol/express` | HTTP/SSE | Express.js server |
| `@modelcontextprotocol/fastify` | HTTP/SSE | Fastify server |

---

## Tooling Packages

| Package | Purpose |
|---------|---------|
| `@modelcontextprotocol/inspector` | Visual MCP server debugger — inspect tools, resources, prompts |
| `@modelcontextprotocol/conformance` | Protocol conformance test suite |
| `@modelcontextprotocol/create-server` | Scaffolding CLI — `npx @modelcontextprotocol/create-server my-server` |

---

## Claude Desktop Configuration Pattern

```json
{
  "mcpServers": {
    "memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"]
    },
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/allowed/files"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "<YOUR_TOKEN>"
      }
    }
  }
}
```

---

## Cross-References

- Connector catalog entries: `vendor/connectors/catalog.json`
- Google Drive extended spec: `vendor/connectors/google-drive.yaml`
- Brave Search vendor docs: `vendor/brave-search/`
- Sentry vendor docs: `vendor/sentry/`
- MCP framework packages: `vendor/anthropic-ai-npm/packages.json`
- Protocol spec: `vendor/modelcontextprotocol/modelcontextprotocol.io/`
