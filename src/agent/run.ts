/**
 * Outcome: Run the orchestrator agent with one MCP server (npm-registry) and a
 * sub-agent ("npm-research") whose tool surface is restricted to that MCP.
 *
 * Mirrors `code.claude.com/docs/en/agent-sdk/subagents` and
 * `code.claude.com/docs/en/agent-sdk/mcp`.
 */
import { query } from "@anthropic-ai/claude-agent-sdk";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..", "..");

const orchestratorPrompt = await readFile(
  resolve(root, "seeds/prompts/system-orchestrator.md"),
  "utf8"
);
const npmSubagentPrompt = await readFile(
  resolve(root, "seeds/prompts/subagent-npm-research.md"),
  "utf8"
);

const userPrompt = process.argv.slice(2).join(" ") ||
  "List the most-downloaded packages in the @modelcontextprotocol org this past week.";

const result = query({
  prompt: userPrompt,
  options: {
    systemPrompt: orchestratorPrompt,
    mcpServers: {
      "npm-registry": {
        type: "stdio",
        command: "node",
        args: [resolve(root, "dist/mcp/npm-registry-server.js")],
      },
    },
    agents: {
      "npm-research": {
        description: "Research sub-agent that calls the npm-registry MCP tools.",
        prompt: npmSubagentPrompt,
        tools: [
          "mcp__npm-registry__npm_org_packages",
          "mcp__npm-registry__npm_package_metadata",
          "mcp__npm-registry__npm_downloads",
          "mcp__npm-registry__npm_search",
        ],
      },
    },
  },
});

for await (const msg of result) {
  if (msg.type === "assistant") {
    for (const block of msg.message.content) {
      if (block.type === "text") process.stdout.write(block.text);
    }
  }
}
process.stdout.write("\n");
