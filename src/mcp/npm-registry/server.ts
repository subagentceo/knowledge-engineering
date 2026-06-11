#!/usr/bin/env node
/**
 * @cite vendor/modelcontextprotocol/modelcontextprotocol.io/docs/develop/build-server.md
 */
/**
 * npm-registry MCP server.
 *
 * Exposes the npm public registry as four read-only tools, registered on a
 * single MCP SDK v2 `McpServer` instance:
 *
 *   - npm_org_packages       packages owned by an org
 *   - npm_package_metadata   versions/dist-tags/maintainers/latest manifest
 *   - npm_downloads          download counts over a period
 *   - npm_search             full-text registry search
 *
 * Transport: stdio (works with `claude mcp add` and the Agent SDK
 * `mcpServers` option).
 */
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerOrgPackages } from "./tools/org-packages.js";
import { registerPackageMetadata } from "./tools/package-metadata.js";
import { registerDownloads } from "./tools/downloads.js";
import { registerSearch } from "./tools/search.js";

export function createNpmRegistryServer(): McpServer {
  const server = new McpServer({ name: "npm-registry", version: "0.1.0" });
  registerOrgPackages(server);
  registerPackageMetadata(server);
  registerDownloads(server);
  registerSearch(server);
  return server;
}

const isMain = import.meta.url === `file://${process.argv[1]}`;
if (isMain) {
  const server = createNpmRegistryServer();
  await server.connect(new StdioServerTransport());
}
