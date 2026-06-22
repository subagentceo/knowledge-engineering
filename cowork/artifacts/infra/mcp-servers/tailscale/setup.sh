#!/usr/bin/env bash
# infra/mcp-servers/tailscale/setup.sh
# One-time setup for the Tailscale MCP server.
#
# Usage:
#   sh infra/mcp-servers/tailscale/setup.sh
#
# Prerequisites:
#   1. Get a Tailscale API key from https://login.tailscale.com/admin/settings/keys
#      - Scope: "Read devices" is sufficient for tailscale_devices and tailscale_ping
#      - Scope: "Read policy" needed for tailscale_acl
#   2. Set your tailnet name (visible in https://login.tailscale.com/admin/machines)
#      e.g. "alex-osa@" or "opencoworkers.github"

set -e

echo "=== Tailscale MCP Server Setup ==="
echo ""

# Prompt for API key
read -rsp "Tailscale API key (from https://login.tailscale.com/admin/settings/keys): " TS_KEY
echo ""

if [ -z "$TS_KEY" ]; then
  echo "Error: API key is required."
  exit 1
fi

# Store secret in Docker MCP keychain
echo "$TS_KEY" | docker mcp secret set tailscale.tailscale_api_key
echo "✓ TAILSCALE_API_KEY secret stored"

# Prompt for tailnet (optional — "-" is the default tailnet for the key)
read -rp "Tailnet name (press Enter to use default '-'): " TS_TAILNET
TS_TAILNET="${TS_TAILNET:--}"
echo "$TS_TAILNET" | docker mcp secret set tailscale.tailscale_tailnet
echo "✓ TAILSCALE_TAILNET set to: $TS_TAILNET"

echo ""
echo "=== Done ==="
echo "Restart Claude Desktop and Claude Code to activate the tailscale MCP tools."
echo ""
echo "Available tools:"
echo "  tailscale_devices  — list all network devices"
echo "  tailscale_ping     — look up a device by hostname"
echo "  tailscale_routes   — show subnet routes"
echo "  tailscale_acl      — fetch ACL policy"
