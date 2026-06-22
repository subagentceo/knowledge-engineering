# cowork/mcpb — extension verification scripts

Two scripts to verify the 4 Cowork `.mcpb` extensions on Claude for Mac.

## Scripts

| Script | Purpose | Speed |
|---|---|---|
| `verify.sh` | Colored OK / MISSING / DEGRADED per extension + recommendation | ~0.3s |
| `status.sh` | Raw config key dump, shows actual command args | ~0.1s |

## Usage

```bash
bash cowork/mcpb/verify.sh    # recommended first run
bash cowork/mcpb/status.sh    # follow-up: see exact config
```

## Extensions checked

| Extension | MCP namespace | Config key |
|---|---|---|
| Claude in Chrome | `mcp__Claude_in_Chrome__*` | `claude-in-chrome` |
| Control Chrome | `mcp__Control_Chrome__*` | `control-chrome` |
| Filesystem | `mcp__5f7bfa4d-...__*` | `filesystem` |
| Macos | `mcp__Macos__*` | `macos` |

## Recommendations

- **OK** → no action needed
- **MISSING** → open Claude for Mac → Settings → Extensions → **Install** the `.mcpb`
- **DEGRADED** → process running but not wired to config → run the extension's built-in **Doctor** tool from Cowork
