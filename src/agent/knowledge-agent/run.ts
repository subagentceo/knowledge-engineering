// src/agent/knowledge-agent/run.ts
//
// CLI entrypoint for the claude-knowledge-agent. Wires the real Agent SDK
// query() + the OAuth-only gate + the two stdio MCP servers, then runs one
// knowledge-answerer task and prints the Zod-validated structured result.
//
// Usage:
//   tsx src/agent/knowledge-agent/run.ts "<question>"
//
// OAuth only: requireOAuth() fails closed if ANTHROPIC_API_KEY is set.
//
// Citations:
//   @cite vendor/anthropics/code.claude.com/docs/en/agent-sdk/structured-outputs.md
//   @cite src/agent/run.ts  (query() + MCP wiring this mirrors)
//   @cite src/oauth/token.ts

import { query } from "@anthropic-ai/claude-agent-sdk";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { requireOAuth } from "../../oauth/token.js";
import { runKnowledgeTask, type QueryFn } from "./agent.js";
import { KNOWLEDGE_ANSWERER } from "./fleet.js";
import { KnowledgeAnswer } from "./schemas.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..", "..", "..");

async function seed(name: string): Promise<string> {
  // Reuse the verifier-style seed if present; fall back to an inline directive.
  try {
    return await readFile(resolve(root, "seeds/prompts", `${name}.md`), "utf8");
  } catch {
    return [
      "You are knowledge-answerer. Answer the question using ONLY the vendor/ corpus",
      "and the knowledge-bridge MCP tools. Every load-bearing claim MUST carry a",
      "Citation (source path/URL + last_fetched). If the sources do not support an",
      "answer, say so in openQuestions rather than guessing. Return a KnowledgeAnswer.",
    ].join("\n");
  }
}

const auth = requireOAuth();
process.stderr.write(`[knowledge-agent] using ${auth.source} token\n`);

const prompt = await seed("subagent-knowledge-answerer");
const task =
  process.argv.slice(2).join(" ") ||
  "What does the Agent SDK's structured-outputs surface guarantee, and how does outputFormat relate to result.structured_output?";

const mcpServers = {
  "knowledge-bridge": {
    type: "stdio" as const,
    command: "node",
    args: [resolve(root, "dist/mcp/bridge-server.js")],
  },
  "npm-registry": {
    type: "stdio" as const,
    command: "node",
    args: [resolve(root, "dist/mcp/npm-registry/server.js")],
  },
};

const { result, usage } = await runKnowledgeTask({
  runQuery: query as unknown as QueryFn,
  spec: KNOWLEDGE_ANSWERER,
  schema: KnowledgeAnswer,
  prompt,
  task,
  mcpServers,
});

process.stdout.write(JSON.stringify({ result, usage }, null, 2) + "\n");
process.stderr.write(
  `[knowledge-agent] confidence=${result.confidence} claims=${result.claims.length} cost=$${usage.costUsd.toFixed(4)}\n`,
);
