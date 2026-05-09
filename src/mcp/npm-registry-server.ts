#!/usr/bin/env node
/**
 * Outcome: Expose the npm public registry to any MCP client (Claude Code,
 * Claude Agent SDK sub-agents, Claude Desktop) as four read-only tools:
 *   - npm_org_packages    list packages in an org
 *   - npm_package_metadata  versions/maintainers/dist-tags for a package
 *   - npm_downloads       download counts over a period
 *   - npm_search          full-text search across the registry
 *
 * Transport: stdio (so it works with claude-agent-sdk's mcpServers config
 * and `claude mcp add`).
 */
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";

const REGISTRY = "https://registry.npmjs.org";
const API = "https://api.npmjs.org";
const WEB = "https://www.npmjs.com";

const tools = [
  {
    name: "npm_org_packages",
    description:
      "List all packages owned by an npm organization. Returns name + role per package. Source: npm web API /org/{org}/package.",
    inputSchema: {
      type: "object",
      properties: { org: { type: "string", description: "Org slug, e.g. 'anthropic-ai'" } },
      required: ["org"],
    },
  },
  {
    name: "npm_package_metadata",
    description:
      "Fetch a package document from the npm registry: versions, dist-tags, maintainers, latest manifest. Source: registry.npmjs.org/{pkg}.",
    inputSchema: {
      type: "object",
      properties: {
        package: { type: "string", description: "Package name, e.g. '@modelcontextprotocol/sdk'" },
        version: { type: "string", description: "Optional specific version or dist-tag" },
      },
      required: ["package"],
    },
  },
  {
    name: "npm_downloads",
    description:
      "Download counts for a package over a period (last-day, last-week, last-month). Source: api.npmjs.org/downloads/point/{period}/{pkg}.",
    inputSchema: {
      type: "object",
      properties: {
        package: { type: "string" },
        period: { type: "string", enum: ["last-day", "last-week", "last-month"], default: "last-week" },
      },
      required: ["package"],
    },
  },
  {
    name: "npm_search",
    description:
      "Full-text search the npm registry. Returns up to `size` results with name, description, and score. Source: registry.npmjs.org/-/v1/search.",
    inputSchema: {
      type: "object",
      properties: {
        text: { type: "string" },
        size: { type: "number", default: 10, maximum: 50 },
      },
      required: ["text"],
    },
  },
] as const;

const orgSchema = z.object({ org: z.string().min(1) });
const pkgSchema = z.object({ package: z.string().min(1), version: z.string().optional() });
const dlSchema = z.object({
  package: z.string().min(1),
  period: z.enum(["last-day", "last-week", "last-month"]).default("last-week"),
});
const searchSchema = z.object({ text: z.string().min(1), size: z.number().int().positive().max(50).default(10) });

async function fetchJson(url: string): Promise<unknown> {
  const res = await fetch(url, { headers: { accept: "application/json" } });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
  return res.json();
}

const server = new Server(
  { name: "npm-registry", version: "0.1.0" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools }));

server.setRequestHandler(CallToolRequestSchema, async (req) => {
  const { name, arguments: args } = req.params;
  try {
    if (name === "npm_org_packages") {
      const { org } = orgSchema.parse(args);
      const url = `${WEB}/org/${encodeURIComponent(org)}/package`;
      const data = await fetchJson(url);
      return { content: [{ type: "text", text: JSON.stringify({ source: url, data }, null, 2) }] };
    }
    if (name === "npm_package_metadata") {
      const { package: pkg, version } = pkgSchema.parse(args);
      const url = version
        ? `${REGISTRY}/${pkg}/${encodeURIComponent(version)}`
        : `${REGISTRY}/${pkg}`;
      const data = await fetchJson(url);
      return { content: [{ type: "text", text: JSON.stringify({ source: url, data }, null, 2) }] };
    }
    if (name === "npm_downloads") {
      const { package: pkg, period } = dlSchema.parse(args);
      const url = `${API}/downloads/point/${period}/${pkg}`;
      const data = await fetchJson(url);
      return { content: [{ type: "text", text: JSON.stringify({ source: url, data }, null, 2) }] };
    }
    if (name === "npm_search") {
      const { text, size } = searchSchema.parse(args);
      const url = `${REGISTRY}/-/v1/search?text=${encodeURIComponent(text)}&size=${size}`;
      const data = await fetchJson(url);
      return { content: [{ type: "text", text: JSON.stringify({ source: url, data }, null, 2) }] };
    }
    throw new Error(`Unknown tool: ${name}`);
  } catch (err) {
    return {
      isError: true,
      content: [{ type: "text", text: `Error: ${(err as Error).message}` }],
    };
  }
});

await server.connect(new StdioServerTransport());
