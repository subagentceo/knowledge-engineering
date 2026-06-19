/**
 * infra/mcp-servers/tailscale/server.ts
 * MCP server for Tailscale network tools via the Tailscale REST API.
 *
 * Env vars:
 *   TAILSCALE_API_KEY  — from https://login.tailscale.com/admin/settings/keys
 *   TAILSCALE_TAILNET  — your tailnet (e.g. "alex-osa@" or "opencoworkers.github")
 *
 * Tools:
 *   tailscale_devices  — list all devices with IPs and online status
 *   tailscale_ping     — ping a device by name or IP (uses Tailscale API device lookup)
 *   tailscale_routes   — show subnet routes advertised on the tailnet
 *   tailscale_acl      — fetch the current ACL policy JSON
 */

import process from "node:process";

const API_BASE = "https://api.tailscale.com/api/v2";
const API_KEY  = process.env.TAILSCALE_API_KEY ?? "";
const TAILNET  = process.env.TAILSCALE_TAILNET  ?? "-";  // "-" = default tailnet for the key

if (!API_KEY) {
  process.stderr.write("[tailscale-mcp] TAILSCALE_API_KEY is not set\n");
}

async function tsGet(path: string): Promise<unknown> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`Tailscale API ${path} → HTTP ${res.status}: ${await res.text()}`);
  return res.json();
}

// ── MCP protocol ──────────────────────────────────────────────────────────────

interface JsonRpcRequest {
  jsonrpc: "2.0";
  id: number | string;
  method: string;
  params?: Record<string, unknown>;
}

interface JsonRpcResponse {
  jsonrpc: "2.0";
  id: number | string;
  result?: unknown;
  error?: { code: number; message: string };
}

const TOOLS = [
  {
    name: "tailscale_devices",
    description: "List all devices in the Tailscale network with their hostnames, IPs, OS, and last-seen time.",
    inputSchema: { type: "object", properties: {}, required: [] },
  },
  {
    name: "tailscale_ping",
    description: "Look up a Tailscale device by hostname fragment and return its full record (IPs, OS, last seen). Does not send ICMP — uses API lookup.",
    inputSchema: {
      type: "object",
      properties: {
        hostname: { type: "string", description: "Partial or full hostname to search for (e.g. 'desktop-ufngrm3')" },
      },
      required: ["hostname"],
    },
  },
  {
    name: "tailscale_routes",
    description: "List subnet routes advertised on this tailnet, including their enabled/advertised state.",
    inputSchema: { type: "object", properties: {}, required: [] },
  },
  {
    name: "tailscale_acl",
    description: "Fetch the current ACL policy for the tailnet. Returns the Tailscale HuJSON ACL document.",
    inputSchema: { type: "object", properties: {}, required: [] },
  },
];

interface TailscaleDevice {
  name: string;
  hostname: string;
  addresses: string[];
  os: string;
  lastSeen: string;
  authorized: boolean;
  id: string;
  user: string;
  clientVersion: string;
}

async function handleTool(name: string, input: Record<string, unknown>): Promise<string> {
  switch (name) {
    case "tailscale_devices": {
      const data = await tsGet(`/tailnet/${TAILNET}/devices`) as { devices: TailscaleDevice[] };
      const devices = data.devices.map((d) => ({
        hostname: d.hostname,
        name: d.name,
        ips: d.addresses,
        os: d.os,
        lastSeen: d.lastSeen,
        authorized: d.authorized,
      }));
      return JSON.stringify(devices, null, 2);
    }

    case "tailscale_ping": {
      const query = String(input.hostname ?? "").toLowerCase();
      if (!query) throw new Error("hostname is required");
      const data = await tsGet(`/tailnet/${TAILNET}/devices`) as { devices: TailscaleDevice[] };
      const matches = data.devices.filter(
        (d) => d.hostname.toLowerCase().includes(query) || d.name.toLowerCase().includes(query),
      );
      if (matches.length === 0) return `No device found matching "${query}"`;
      return JSON.stringify(matches.map((d) => ({
        hostname: d.hostname, ips: d.addresses, os: d.os, lastSeen: d.lastSeen,
      })), null, 2);
    }

    case "tailscale_routes": {
      const data = await tsGet(`/tailnet/${TAILNET}/devices`) as { devices: TailscaleDevice[] };
      // Routes are per-device
      const routes: Array<Record<string, unknown>> = [];
      for (const d of data.devices) {
        const detail = await tsGet(`/device/${d.id}/routes`) as { advertisedRoutes: string[]; enabledRoutes: string[] };
        if (detail.advertisedRoutes?.length) {
          routes.push({
            hostname: d.hostname,
            advertised: detail.advertisedRoutes,
            enabled: detail.enabledRoutes,
          });
        }
      }
      return routes.length ? JSON.stringify(routes, null, 2) : "No subnet routes advertised.";
    }

    case "tailscale_acl": {
      const data = await tsGet(`/tailnet/${TAILNET}/acl`);
      return typeof data === "string" ? data : JSON.stringify(data, null, 2);
    }

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

function respond(id: number | string, result?: unknown, error?: { code: number; message: string }) {
  const msg: JsonRpcResponse = { jsonrpc: "2.0", id, ...(error ? { error } : { result }) };
  process.stdout.write(JSON.stringify(msg) + "\n");
}

// ── Main loop ─────────────────────────────────────────────────────────────────

let buffer = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk: string) => {
  buffer += chunk;
  const lines = buffer.split("\n");
  buffer = lines.pop() ?? "";
  for (const line of lines) {
    if (!line.trim()) continue;
    let req: JsonRpcRequest;
    try { req = JSON.parse(line) as JsonRpcRequest; } catch { continue; }

    const { id, method, params = {} } = req;

    if (method === "initialize") {
      respond(id, {
        protocolVersion: "2024-11-05",
        serverInfo: { name: "tailscale-mcp", version: "1.0.0" },
        capabilities: { tools: {} },
      });
    } else if (method === "notifications/initialized") {
      // No response needed for notifications
    } else if (method === "ping") {
      respond(id, {});
    } else if (method === "tools/list") {
      respond(id, { tools: TOOLS });
    } else if (method === "tools/call") {
      const toolName = String((params as Record<string, unknown>).name ?? "");
      const toolInput = ((params as Record<string, unknown>).arguments ?? {}) as Record<string, unknown>;
      handleTool(toolName, toolInput)
        .then((text) => respond(id, { content: [{ type: "text", text }] }))
        .catch((err: Error) => respond(id, undefined, { code: -32603, message: err.message }));
    } else {
      respond(id, undefined, { code: -32601, message: `Method not found: ${method}` });
    }
  }
});
