/**
 * @cite vendor/anthropic-ai-npm/packages.json
 */
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { searchShape, fetchJson, jsonResult, REGISTRY } from "../schemas.js";

export function registerSearch(server: McpServer): void {
  server.tool(
    "npm_search",
    "Full-text search the npm registry. Returns up to `size` results with name, description, and score. Source: https://registry.npmjs.org/-/v1/search.",
    searchShape,
    async ({ text, size }) => {
      const url = `${REGISTRY}/-/v1/search?text=${encodeURIComponent(text)}&size=${size}`;
      const data = await fetchJson(url);
      return jsonResult(url, data);
    }
  );
}
