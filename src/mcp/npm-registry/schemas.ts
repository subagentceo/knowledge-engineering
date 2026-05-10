/**
 * Zod input schemas for the npm-registry MCP server.
 *
 * The high-level `McpServer.tool(name, description, inputShape, handler)` API
 * in MCP SDK v2 wires `inputShape` (a Zod raw shape) directly into the tool's
 * advertised JSON schema, so we keep the raw shapes — not z.object(...) — at
 * the boundary and parse them inside the handler when stricter typing helps.
 */
import { z } from "zod";

export const orgPackagesShape = {
  org: z
    .string()
    .min(1)
    .describe("npm org slug, e.g. 'anthropic-ai'"),
} as const;

export const packageMetadataShape = {
  package: z
    .string()
    .min(1)
    .describe("Package name, e.g. '@modelcontextprotocol/sdk'"),
  version: z
    .string()
    .optional()
    .describe("Optional specific version or dist-tag (e.g. 'latest')"),
} as const;

export const downloadsShape = {
  package: z.string().min(1).describe("Package name"),
  period: z
    .enum(["last-day", "last-week", "last-month"])
    .default("last-week")
    .describe("Download window"),
} as const;

export const searchShape = {
  text: z.string().min(1).describe("Full-text query"),
  size: z
    .number()
    .int()
    .positive()
    .max(50)
    .default(10)
    .describe("Result count, max 50"),
} as const;

export type OrgPackagesInput = z.infer<z.ZodObject<typeof orgPackagesShape>>;
export type PackageMetadataInput = z.infer<z.ZodObject<typeof packageMetadataShape>>;
export type DownloadsInput = z.infer<z.ZodObject<typeof downloadsShape>>;
export type SearchInput = z.infer<z.ZodObject<typeof searchShape>>;

export const REGISTRY = "https://registry.npmjs.org";
export const API = "https://api.npmjs.org";
export const WEB = "https://www.npmjs.com";

export async function fetchJson(url: string): Promise<unknown> {
  const res = await fetch(url, { headers: { accept: "application/json" } });
  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText} for ${url}`);
  }
  return res.json();
}

export function jsonResult(source: string, data: unknown) {
  return {
    content: [
      {
        type: "text" as const,
        text: JSON.stringify({ source, data }, null, 2),
      },
    ],
  };
}
