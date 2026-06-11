/**
 * @cite vendor/anthropic-ai-npm/packages.json
 */
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { downloadsShape, fetchJson, jsonResult, API } from "../schemas.js";

export function registerDownloads(server: McpServer): void {
  server.tool(
    "npm_downloads",
    "Download counts for a package over a window (last-day | last-week | last-month). Source: https://api.npmjs.org/downloads/point/{period}/{package}.",
    downloadsShape,
    async ({ package: pkg, period }) => {
      const url = `${API}/downloads/point/${period}/${pkg}`;
      const data = await fetchJson(url);
      return jsonResult(url, data);
    }
  );
}
