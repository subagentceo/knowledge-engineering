<!--
@cite vendor/anthropic-ai-npm/dxt.md
@cite seeds/citations/define-outcomes.md
-->

# @anthropic-ai/dxt — Desktop Extension Format Reference

Captured: 2026-06-05
Sources: npmjs.com/@anthropic-ai/dxt, anthropic.com/engineering/desktop-extensions, github.com/anthropics/dxt, github.com/modelcontextprotocol/mcpb, libraries.io/npm/@anthropic-ai%2Fdxt

## Status: DEPRECATED — Renamed to @anthropic-ai/mcpb

`@anthropic-ai/dxt` (versions 0.1.0–0.2.6) carries the npm deprecation notice:

> "This package has been renamed to @anthropic-ai/mcpb"

The file extension changed from `.dxt` to `.mcpb` on 2025-09-11. Existing `.dxt` files remain backwards-compatible. New development uses `@anthropic-ai/mcpb` and produces `.mcpb` files.

The spec moved under the MCP org (`github.com/modelcontextprotocol/mcpb`) to signal that the bundle format is not Claude-exclusive — any desktop AI app can adopt it.

## What DXT / MCP Bundle Format Is

Desktop Extensions (originally `.dxt`, now `.mcpb`) are **ZIP archives** containing a local MCP server and a `manifest.json` that describes everything Claude Desktop needs to load and configure the server. The format is analogous to Chrome extensions (`.crx`) or VS Code extensions (`.vsix`).

**Problem solved:** Before `.dxt`, installing local MCP servers required terminal access, manual `claude_desktop_config.json` editing, Node.js/Python, and manual dependency management. Non-technical users were blocked entirely. `.mcpb` reduces this to a double-click.

**Introduced:** 2025-06-26, Anthropic engineering blog "Desktop Extensions: One-click MCP server installation for Claude Desktop."

## npm Package

| Field | Value |
|---|---|
| Package name | `@anthropic-ai/dxt` |
| npm URL | https://www.npmjs.com/package/@anthropic-ai/dxt |
| Successor package | `@anthropic-ai/mcpb` |
| First release | 0.1.0 on 2025-06-26 |
| Final release | 0.2.6 on 2025-07-21 |
| Deprecation | All versions — redirects to `@anthropic-ai/mcpb` |

### Version history

| Version | Published | Notable change |
|---|---|---|
| 0.1.0 | 2025-06-26 | Initial release |
| 0.2.0 | 2025-06-29 | |
| 0.2.1 | 2025-07-09 | Added `ignore` dep (.gitignore-style exclusions in `dxt pack`) |
| 0.2.2–0.2.4 | 2025-07-11 | Patch releases |
| 0.2.5 | 2025-07-14 | Added `galactus` + `pretty-bytes` deps |
| 0.2.6 | 2025-07-21 | Final release |

### Key dependencies of the CLI tool

- `zod` — manifest.json schema validation
- `fflate` — fast ZIP creation
- `commander` — CLI argument parsing
- `node-forge` — cryptographic bundle signing
- `@inquirer/prompts` — interactive `dxt init` prompts
- `ignore` (v0.2.1+) — respects `.gitignore` during `dxt pack`
- `galactus` (v0.2.5+) — dependency pruning / tree-shaking for node_modules

## File Structure

### Minimal bundle

Only `manifest.json` is required.

### Node.js bundle (recommended)

```
bundle.dxt  (ZIP)
├── manifest.json       # Required
├── server/
│   └── index.js        # Main entry point
├── node_modules/       # Bundled deps (npm install --production)
├── package.json
├── icon.png            # Optional — shown in Claude Desktop UI
└── assets/
```

Node.js is the preferred runtime because Claude for macOS and Windows ships its own Node.js runtime, so users need no additional install.

### Python bundle

```
bundle.dxt  (ZIP)
├── manifest.json
├── server/
│   ├── main.py
│   └── utils.py
├── lib/                # Bundled packages — set PYTHONPATH via mcp_config.env
├── requirements.txt
└── icon.png
```

### Binary bundle

```
bundle.dxt  (ZIP)
├── manifest.json
├── server/
│   ├── my-server       # Unix executable
│   └── my-server.exe   # Windows executable
└── icon.png
```

## manifest.json Schema

`manifest.json` is the only required file in the bundle. Full spec in `MANIFEST.md` at the repo root (current manifest_version: `"0.3"`).

### Required fields

| Field | Type | Description |
|---|---|---|
| `manifest_version` | string | Spec version, e.g. `"0.3"` |
| `name` | string | Machine-readable identifier |
| `version` | string | SemVer |
| `description` | string | Short description (localizable) |
| `author` | object | `{ name, email?, url? }` |
| `server` | object | Server config (see below) |

### Server config (`server` object)

| Field | Type | Description |
|---|---|---|
| `server.type` | string | `"node"` \| `"python"` \| `"uv"` \| `"binary"` |
| `server.entry_point` | string | Path to entry point inside bundle |
| `server.mcp_config.command` | string | Executable (`node`, `python`, etc.) |
| `server.mcp_config.args` | array | Arguments; `${__dirname}` expands to bundle dir |
| `server.mcp_config.env` | object | Env vars; `${user_config.KEY}` substituted at install |

### Variable substitution in `mcp_config`

- `${__dirname}` — absolute path to the extracted bundle directory
- `${HOME}`, `${DESKTOP}`, `${DOCUMENTS}`, `${DOWNLOADS}` — user directories
- `${user_config.KEY}` — value provided by user at install time
- `${pathSeparator}` / `${/}` — platform path separator

### User configuration (`user_config` object)

Defines form fields shown in the Claude Desktop install dialog. Each key maps to a field descriptor:

```json
{
  "user_config": {
    "api_key": {
      "type": "string",
      "title": "API Key",
      "description": "Your authentication key",
      "sensitive": true,
      "required": true
    },
    "allowed_dirs": {
      "type": "directory",
      "title": "Allowed Directories",
      "multiple": true,
      "default": ["${HOME}/Documents"]
    }
  }
}
```

Field types: `string`, `number`, `boolean`, `directory`, `file`.
`sensitive: true` stores the value in the OS keychain (macOS Keychain / Windows Credential Manager) rather than plaintext config.

### Optional metadata fields

`display_name`, `long_description`, `icon`, `icons`, `screenshots`, `keywords`, `license`, `repository`, `homepage`, `documentation`, `support`, `privacy_policies`, `tools`, `tools_generated`, `prompts`, `prompts_generated`, `compatibility`, `localization`, `_meta`.

The `compatibility` object supports semver ranges for `claude_desktop`, `platforms` (`darwin` / `win32` / `linux`), and `runtimes` (`node`, `python`).

## CLI Workflow

```bash
# Deprecated package (dxt → .dxt)
npm install -g @anthropic-ai/dxt
dxt init       # interactive manifest.json creation
dxt validate   # validate manifest.json against schema
dxt pack       # produces <name>.dxt

# Current package (mcpb → .mcpb)
npm install -g @anthropic-ai/mcpb
mcpb init
mcpb validate
mcpb pack
```

`dxt pack` / `mcpb pack` respects `.gitignore` and `.dxtignore` / `.mcpbignore` exclusion files. It uses `galactus` to prune unused dependencies before bundling.

## How Claude Desktop Discovers and Installs Bundles

1. **File association** — `.dxt` / `.mcpb` files are associated with Claude Desktop at install time. Double-clicking opens an install dialog.
2. **Curated directory** — Claude Desktop's connectors catalog (accessible at `claude.ai/connectors` or inside the app) surfaces vetted `.mcpb` bundles.
3. **Install dialog** — Shows bundle metadata, lists required permissions/tools, and renders the `user_config` form. Sensitive values go to the OS keychain.
4. **Runtime extraction** — Claude Desktop extracts the bundle to a sandboxed directory, resolves `${__dirname}` references, and launches the MCP server process using the `mcp_config` parameters.
5. **Automatic updates** — Claude Desktop polls for and applies updates from the bundle's declared `repository` or update feed.

## Security Model

| Control | Mechanism |
|---|---|
| Sensitive secrets | OS keychain (macOS Keychain / Windows Credential Manager) |
| Cryptographic signing | `node-forge`-based signature in CLI — `dxt pack` embeds a signature; Claude Desktop verifies it |
| Enterprise policy | Group Policy (Windows) + MDM profiles (macOS) can enforce extension allowlists/blocklists |
| Private directories | Enterprise deployments can configure private extension directories |

Note: Sandboxing at the process level is not documented in the public spec — extensions run as child processes with the permissions of the Claude Desktop process. The `user_config` `directory`-type fields provide a user-consent mechanism for filesystem access scope, but enforcement is at the application level.

## Relation to MCP and TypeScript Types

`@anthropic-ai/dxt` / `@anthropic-ai/mcpb` is the **packaging and CLI layer** on top of MCP. The runtime TypeScript types it exports (`src/index.ts`) are used by Claude Desktop to load, verify, and configure bundles. They include:

- `ManifestSchema` (Zod schema) — full manifest.json type with validation
- `UserConfigField`, `ServerConfig`, `McpConfig` — typed sub-schemas
- Bundle verification utilities (signature checking, version compatibility)

These types are not intended for MCP server authors — MCP server code uses `@modelcontextprotocol/sdk`. The `@anthropic-ai/dxt` / `@anthropic-ai/mcpb` types are for host-application integrators building their own DXT-compatible desktop clients.

## GitHub Repositories

| Repo | Role |
|---|---|
| `github.com/anthropics/dxt` | Original DXT implementation — frozen after rename |
| `github.com/anthropics/mcpb` | Active MCPB CLI + spec development |
| `github.com/modelcontextprotocol/mcpb` | MCP org mirror (open-ecosystem home, 1.9k+ stars) |

## Minimal manifest.json Example

```json
{
  "manifest_version": "0.3",
  "name": "my-extension",
  "version": "1.0.0",
  "description": "A simple MCP extension",
  "author": { "name": "Example Author" },
  "server": {
    "type": "node",
    "entry_point": "server/index.js",
    "mcp_config": {
      "command": "node",
      "args": ["${__dirname}/server/index.js"]
    }
  }
}
```

## References

- Anthropic engineering blog: https://www.anthropic.com/engineering/desktop-extensions
- npm (deprecated): https://www.npmjs.com/package/@anthropic-ai/dxt
- npm (current): https://www.npmjs.com/package/@anthropic-ai/mcpb
- GitHub spec repo: https://github.com/modelcontextprotocol/mcpb
- MANIFEST.md full schema: https://github.com/modelcontextprotocol/mcpb/blob/main/MANIFEST.md
- CLI.md: https://github.com/modelcontextprotocol/mcpb/blob/main/CLI.md
