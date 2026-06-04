# @anthropic-ai/dxt — Desktop Extension Format Investigation

Captured: 2026-06-04
Sources: npm registry API, anthropic.com/engineering/desktop-extensions, npmjs.com, github.com/anthropics/dxt, github.com/anthropics/mcpb, github.com/modelcontextprotocol/mcpb

## Status: DEPRECATED — Renamed to @anthropic-ai/mcpb

`@anthropic-ai/dxt` is deprecated. All versions (0.1.0–0.2.6) carry the npm deprecation message:

> "This package has been renamed to @anthropic-ai/mcpb"

The file extension changed from `.dxt` to `.mcpb` on September 11, 2025. Existing `.dxt` files continue to work (backwards compatible), but new development should use `@anthropic-ai/mcpb` and produce `.mcpb` files.

## What Is the Desktop Extension / MCP Bundle Format?

Desktop Extensions (originally `.dxt`, now `.mcpb`) are **zip archives** containing a local MCP server and a `manifest.json`. The format is spiritually similar to Chrome extensions (`.crx`) or VS Code extensions (`.vsix`).

**Problem solved:** Installing local MCP servers previously required terminal access, Node.js/Python, manual JSON config file editing, and dependency management — blocking non-technical users. The `.mcpb` format reduces this to a double-click.

**Introduced:** June 26, 2025 by Anthropic engineering blog post "Desktop Extensions: One-click MCP server installation for Claude Desktop."

## File Structure

### Minimal Bundle

A `manifest.json` is the only required file.

### Node.js Bundle

```
bundle.mcpb (ZIP file)
├── manifest.json       # Required: bundle metadata and MCP server config
├── server/
│   └── index.js        # Main entry point
├── node_modules/       # Bundled dependencies (npm install --production)
├── package.json
├── icon.png            # Optional: bundle icon (shown in Claude Desktop UI)
└── assets/
```

### Python Bundle

```
bundle.mcpb (ZIP file)
├── manifest.json
├── server/
│   ├── main.py
│   └── utils.py
├── lib/                # Bundled Python packages (set PYTHONPATH via mcp_config.env)
├── requirements.txt
└── icon.png
```

### Binary Bundle

```
bundle.mcpb (ZIP file)
├── manifest.json
├── server/
│   ├── my-server       # Unix executable
│   └── my-server.exe   # Windows executable
└── icon.png
```

## manifest.json Schema

The `manifest.json` is the only required file. Full schema in `MANIFEST.md` at the repo root.

Key fields:
- **`name`** — display name shown in Claude Desktop
- **`version`** — bundle version string
- **`server.type`** — one of: `"node"`, `"python"`, `"uv"`, `"binary"`
- **`server.entry_point`** — path to the server executable/script inside the bundle
- **`mcp_config`** — MCP server configuration (passed to Claude Desktop's MCP runtime)
- **`mcp_config.env`** — environment variables for the server process

## Runtime Support Matrix

| Server Type | Description |
|---|---|
| `node` | Node.js server; Node.js ships with Claude for macOS and Windows — works without user Node install |
| `python` | Python server; bundle all required packages in `server/lib/` or a venv |
| `uv` | Experimental (v0.4+); include `pyproject.toml`, host app manages Python + deps automatically |
| `binary` | Pre-compiled binary; static linking preferred for maximum portability |

## CLI Workflow

```bash
# Old (deprecated) — @anthropic-ai/dxt
npm install -g @anthropic-ai/dxt
dxt init        # creates manifest.json interactively
dxt pack        # produces <name>.dxt

# New — @anthropic-ai/mcpb
npm install -g @anthropic-ai/mcpb
mcpb init       # creates manifest.json interactively
mcpb pack       # produces <name>.mcpb
```

## GitHub Repositories

| Repo | Role |
|---|---|
| `github.com/anthropics/dxt` | Original DXT implementation (now frozen/deprecated) |
| `github.com/anthropics/mcpb` | Active development of MCPB CLI + spec |
| `github.com/modelcontextprotocol/mcpb` | MCP org mirror (1.9k stars) — Anthropic open-sourced the spec under the MCP umbrella |

The MCPB spec is intentionally published under the MCP org to encourage adoption by non-Claude desktop AI apps.

## Relation to Claude Desktop Connectors Catalog

Claude Desktop's connectors catalog (browse at claude.ai/connectors or via the Claude Desktop UI) surfaces `.mcpb` bundles as installable integrations. The format enables:

1. **Single-click installation** — Claude Desktop detects `.mcpb` files and shows an install dialog
2. **Automatic updates** — Claude Desktop checks for and applies bundle updates
3. **Curated directory** — Anthropic maintains a discovery catalog for vetted bundles
4. **User-friendly config** — The install dialog exposes the server's configurable variables (defined in `manifest.json`) without requiring users to edit JSON files

## NPM Package History

| Version | Published | Notes |
|---|---|---|
| 0.1.0 | 2025-06-26 | First release, coincides with engineering blog post |
| 0.2.0 | 2025-06-29 | |
| 0.2.1 | 2025-07-09 | Added `ignore` dep for .gitignore-style exclusions |
| 0.2.2 | 2025-07-11 | |
| 0.2.3 | 2025-07-11 | |
| 0.2.4 | 2025-07-11 | |
| 0.2.5 | 2025-07-14 | Added `galactus` + `pretty-bytes` deps |
| 0.2.6 | 2025-07-21 | Final release; all marked deprecated |

All versions marked deprecated with redirect to `@anthropic-ai/mcpb`. Last npm registry modification for `@anthropic-ai/dxt`: 2026-02-10.

## Key Dependencies (of the CLI tool itself)

- `zod` — manifest.json schema validation
- `fflate` — fast ZIP creation for the bundle archive
- `commander` — CLI argument parsing
- `node-forge` — cryptographic signing of bundles
- `@inquirer/prompts` — interactive `dxt init` / `mcpb init` prompts
- `ignore` (v0.2.1+) — respects `.gitignore` when packing
- `galactus` (v0.2.5+) — dependency pruning
