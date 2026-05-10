#!/usr/bin/env node
/**
 * Outcome: A single MCP SDK v2 server that exposes the four-lane knowledge
 * bridge to any MCP client (Claude Code, Claude Desktop, claude-agent-sdk).
 *
 * Lanes:
 *   1. anthropic.com/engineering   - engineering_*
 *   2. claude.com/blog             - blog_*
 *   3. support.claude.com          - support_*
 *   4. llms.txt namespaces         - llms_*
 *
 * Transport: stdio (works with `claude mcp add` and the Agent SDK
 * `mcpServers` option).
 */
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerAnthropicEngineering } from "./lanes/anthropic-engineering.js";
import { registerClaudeBlog } from "./lanes/claude-blog.js";
import { registerSupportClaude } from "./lanes/support-claude.js";
import { registerLlmsTxt } from "./lanes/llms-txt.js";
import { registerVendor } from "./lanes/vendor.js";
import { registerSearchTools } from "./lanes/search-tools.js";

const server = new McpServer({
  name: "knowledge-bridge",
  version: "0.1.0",
});

registerAnthropicEngineering(server);
registerClaudeBlog(server);
registerSupportClaude(server);
registerLlmsTxt(server);
registerVendor(server);
registerSearchTools(server);

await server.connect(new StdioServerTransport());
