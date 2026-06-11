/**
 * @cite vendor/anthropic-ai-npm/packages.json
 */
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import {
  packageMetadataShape,
  fetchJson,
  jsonResult,
  REGISTRY,
} from "../schemas.js";

export function registerPackageMetadata(server: McpServer): void {
  server.tool(
    "npm_package_metadata",
    "Fetch a package document from the npm registry: versions, dist-tags, maintainers, latest manifest. Source: https://registry.npmjs.org/{package}.",
    packageMetadataShape,
    async ({ package: pkg, version }) => {
      const url = version
        ? `${REGISTRY}/${pkg}/${encodeURIComponent(version)}`
        : `${REGISTRY}/${pkg}`;
      const data = await fetchJson(url);
      return jsonResult(url, data);
    }
  );
}
