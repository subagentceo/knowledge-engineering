#!/usr/bin/env node
/**
 * @cite vendor/modelcontextprotocol/modelcontextprotocol.io/docs/develop/build-server.md
 */
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
import { registerProject } from "./lanes/project.js";
import { registerSearchTools } from "./lanes/search-tools.js";
import { registerTelemetry } from "./lanes/telemetry.js";
import { registerMailbox } from "./lanes/mailbox.js";
import { registerKnowledgeGraph } from "./lanes/knowledge-graph.js";
import { registerComms } from "./lanes/comms.js";
import { registerGraphQL } from "./lanes/graphql-lane.js";
import { registerCodeMode } from "./lanes/code-mode-lane.js";
import { registerCitations } from "./lanes/citations.js";
import { registerRepoMail } from "./lanes/mailbox.js";
import { registerCacheStats } from "./lanes/cache-stats-lane.js";
import { registerUsageTelemetry } from "./lanes/usage-telemetry.js";

const server = new McpServer({
  name: "knowledge-bridge",
  version: "0.1.0",
});

registerAnthropicEngineering(server);
registerClaudeBlog(server);
registerSupportClaude(server);
registerLlmsTxt(server);
registerVendor(server);
registerProject(server);
registerSearchTools(server);
registerTelemetry(server);
registerMailbox(server);
registerKnowledgeGraph(server);
registerComms(server);
registerGraphQL(server);
registerCodeMode(server);
registerCitations(server);
registerRepoMail(server);
registerCacheStats(server);
registerUsageTelemetry(server);

await server.connect(new StdioServerTransport());
