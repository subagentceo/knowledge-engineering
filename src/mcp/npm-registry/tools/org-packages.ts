import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { orgPackagesShape, fetchJson, jsonResult, WEB } from "../schemas.js";

export function registerOrgPackages(server: McpServer): void {
  server.tool(
    "npm_org_packages",
    "List all packages owned by an npm organization. Returns name + role per package. Source: https://www.npmjs.com/org/{org}/package.",
    orgPackagesShape,
    async ({ org }) => {
      const url = `${WEB}/org/${encodeURIComponent(org)}/package`;
      const data = await fetchJson(url);
      return jsonResult(url, data);
    }
  );
}
