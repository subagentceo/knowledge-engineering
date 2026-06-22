#!/usr/bin/env bash
# status.sh — raw dump of mcpServers config for all 4 extensions
# Ultra-minimal: no dependencies beyond python3 (ships with macOS)
# Usage: bash status.sh

CONFIG="$HOME/Library/Application Support/Claude/claude_desktop_config.json"

[[ ! -f "$CONFIG" ]] && { echo "MISSING: $CONFIG"; exit 1; }

python3 - "$CONFIG" <<'PY'
import json, sys

cfg = json.load(open(sys.argv[1]))
servers = cfg.get("mcpServers", {})

targets = {
    "claude-in-chrome": ["claude-in-chrome", "Claude in Chrome", "claudeinchrome"],
    "control-chrome":   ["control-chrome", "Control Chrome", "controlchrome"],
    "filesystem":       ["filesystem", "Filesystem"],
    "macos":            ["macos", "Macos", "macos-mcp"],
}

found = {}
for canonical, aliases in targets.items():
    for key in servers:
        if key.lower() in [a.lower() for a in aliases] or \
           "filesystem" in " ".join(servers[key].get("args", [])).lower() and canonical == "filesystem":
            found[canonical] = key
            break

print(f"{'Extension':<22} {'Config Key':<28} {'Status'}")
print("-" * 65)
for canonical, aliases in targets.items():
    if canonical in found:
        key = found[canonical]
        cmd = servers[key].get("command", "")
        args = " ".join(servers[key].get("args", [])[:2])
        print(f"{canonical:<22} {key:<28} OK   ({cmd} {args})")
    else:
        print(f"{canonical:<22} {'—':<28} MISSING")

print()
print(f"Total mcpServers in config: {len(servers)}")
all_keys = list(servers.keys())
if all_keys:
    print("All keys:", ", ".join(all_keys))
PY
