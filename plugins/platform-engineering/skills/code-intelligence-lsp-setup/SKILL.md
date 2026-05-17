---
name: code-intelligence-lsp-setup
description: >
  Wire `.lsp.json` for a Claude Code plugin so the agent gets symbol
  navigation, hover info, and diagnostics from a real Language Server
  Protocol server (typescript-language-server, pyright, gopls,
  rust-analyzer, …). Use when adding a new language to a plugin, when
  Claude is missing definition/refs/hover for a project, or when
  debugging an LSP that fails to start. References the Claude Code
  plugin spec's LSP section and the canonical LSP-servers taxonomy.
license: Apache-2.0
compatibility: Designed for Claude Code v2.x plugins shipping a `.lsp.json` next to `.claude-plugin/plugin.json`. Language-agnostic — the structure is identical regardless of which LSP server you wire.
metadata:
  author: alex-jadecli
  version: "0.1.0"
---

# When to invoke

- Adding LSP support to a plugin for a new language
- The agent is missing go-to-definition / find-references / hover info
- An LSP server fails to start (binary missing from PATH, init options wrong)
- Migrating from inline LSP config to plugin-scoped `.lsp.json`

# Shape of `.lsp.json`

Per `vendor/anthropics/code.claude.com/docs/en/plugins-reference.md`
(LSP §), a plugin's `.lsp.json` lives at the plugin root next to
`.claude-plugin/plugin.json`. It maps language IDs to LSP server
specs:

```json
{
  "servers": {
    "typescript": {
      "command": "typescript-language-server",
      "args": ["--stdio"],
      "rootMarkers": ["package.json", "tsconfig.json"],
      "fileTypes": ["typescript", "typescriptreact", "javascript"]
    },
    "python": {
      "command": "pyright-langserver",
      "args": ["--stdio"],
      "rootMarkers": ["pyproject.toml", "setup.py"],
      "fileTypes": ["python"]
    }
  }
}
```

# Picking a server

The canonical list lives at
`https://github.com/microsoft/language-server-protocol/blob/main/_implementors/servers.md`.
Operator's prior probe surfaced these high-quality choices:

| Language       | Server                          | Install hint                       |
|----------------|---------------------------------|------------------------------------|
| TypeScript/JS  | `typescript-language-server`    | `npm i -g typescript-language-server` |
| Python         | `pyright-langserver`            | `npm i -g pyright`                 |
| Go             | `gopls`                         | `go install golang.org/x/tools/gopls@latest` |
| Rust           | `rust-analyzer`                 | rustup component                   |
| Bash           | `bash-language-server`          | `npm i -g bash-language-server`    |

# Failure modes

- **Binary not on PATH**: the LSP silently doesn't start. Check `which <command>` before adding to `.lsp.json`.
- **Wrong `rootMarkers`**: the LSP starts but reports "no project" — confirm the marker file exists at the workspace root.
- **`fileTypes` mismatch**: editor language ID and the spec's `fileTypes` must match exactly. `typescript` ≠ `tsx`.

# Citations

- `vendor/anthropics/code.claude.com/docs/en/plugins-reference.md` (LSP §)
- `vendor/agentskills/agentskills.io/specification.md` (SKILL shape)
- https://github.com/microsoft/language-server-protocol/blob/main/_implementors/servers.md
