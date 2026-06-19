FROM node:22-alpine

WORKDIR /app

# Copy TypeScript source
COPY server.ts .

# Secrets injected by Docker MCP toolkit at runtime:
#   TAILSCALE_API_KEY  — Tailscale API key
#   TAILSCALE_TAILNET  — tailnet name (default: "-" for key's default tailnet)
ENV TAILSCALE_TAILNET="-"

LABEL mcp.server.name="tailscale"
LABEL mcp.server.description="Tailscale network tools — device list, routing, ACL"
LABEL mcp.server.version="1.0.0"

# Node 22 supports TypeScript natively via --experimental-strip-types (no tsx needed)
CMD ["node", "--experimental-strip-types", "server.ts"]
