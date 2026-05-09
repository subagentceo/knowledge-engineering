/**
 * Outcome: Run the orchestrator with the four-lane bridge MCP server mounted
 * and four sub-agents whose tool surfaces are each restricted to one lane.
 *
 * Auth: OAuth only. Run-time fails closed if ANTHROPIC_API_KEY is set or no
 * OAuth token is available (see src/oauth/token.ts).
 *
 * Mirrors the patterns in `code.claude.com/docs/en/agent-sdk/subagents` and
 * `code.claude.com/docs/en/agent-sdk/mcp`, decomposed against the four
 * content bridges captured in docs/session-artifact.md.
 */
import { query } from "@anthropic-ai/claude-agent-sdk";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { requireOAuth } from "../oauth/token.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..", "..");

async function seed(name: string): Promise<string> {
  return readFile(resolve(root, "seeds/prompts", `${name}.md`), "utf8");
}

const auth = requireOAuth();

const [orchestrator, anthropicEngineering, claudeBlog, supportClaude, llmsTxt] = await Promise.all([
  seed("system-orchestrator"),
  seed("subagent-anthropic-engineering"),
  seed("subagent-claude-blog"),
  seed("subagent-support-claude"),
  seed("subagent-llms-txt"),
]);

const userPrompt =
  process.argv.slice(2).join(" ") ||
  "Across the four bridges, summarize what's been said about MCP in the last quarter and cite each source.";

const result = query({
  prompt: userPrompt,
  options: {
    systemPrompt: orchestrator,
    mcpServers: {
      "knowledge-bridge": {
        type: "stdio",
        command: "node",
        args: [resolve(root, "dist/mcp/bridge-server.js")],
      },
    },
    agents: {
      "anthropic-engineering": {
        description: "Sub-agent restricted to the anthropic.com/engineering bridge.",
        prompt: anthropicEngineering,
        tools: [
          "mcp__knowledge-bridge__engineering_index",
          "mcp__knowledge-bridge__engineering_fetch",
          "mcp__knowledge-bridge__engineering_search",
        ],
      },
      "claude-blog": {
        description: "Sub-agent restricted to the claude.com/blog bridge.",
        prompt: claudeBlog,
        tools: [
          "mcp__knowledge-bridge__blog_index",
          "mcp__knowledge-bridge__blog_fetch",
          "mcp__knowledge-bridge__blog_search",
        ],
      },
      "support-claude": {
        description: "Sub-agent restricted to the support.claude.com bridge.",
        prompt: supportClaude,
        tools: [
          "mcp__knowledge-bridge__support_collections",
          "mcp__knowledge-bridge__support_collection",
          "mcp__knowledge-bridge__support_article",
        ],
      },
      "llms-txt": {
        description: "Sub-agent restricted to the llms.txt namespace bridge.",
        prompt: llmsTxt,
        tools: [
          "mcp__knowledge-bridge__llms_namespaces",
          "mcp__knowledge-bridge__llms_fetch",
          "mcp__knowledge-bridge__llms_grep",
        ],
      },
    },
  },
});

process.stderr.write(`[oauth] using ${auth.source} token\n`);

for await (const msg of result) {
  if (msg.type === "assistant") {
    for (const block of msg.message.content) {
      if (block.type === "text") process.stdout.write(block.text);
    }
  }
}
process.stdout.write("\n");
