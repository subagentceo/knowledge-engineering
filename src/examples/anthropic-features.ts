/**
 * Outcomes (one per Anthropic feature exercised here):
 *
 * 1. Prompt caching — system prompt + seed instructions are cached with
 *    `cache_control: { type: "ephemeral" }`, so subsequent turns hit the cache.
 * 2. Tool caching — the tool array's last element carries cache_control so the
 *    full tool schema set is cached as one prefix.
 * 3. Citations — a `document` content block with `citations.enabled: true`
 *    forces grounded answers with source spans.
 * 4. Programmatic tool use — the loop reads `tool_use` blocks, dispatches them
 *    to local handlers, and feeds back `tool_result` until `stop_reason !== "tool_use"`.
 * 5. Deep-links — final answer includes `claude://` deep-links built per
 *    `code.claude.com/docs/en/deep-links`, and a Claude.ai chat deep-link.
 *
 * Run: ANTHROPIC_API_KEY=... npm run example:anthropic
 */
import Anthropic from "@anthropic-ai/sdk";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..", "..");

const client = new Anthropic();
const MODEL = "claude-opus-4-7";

// --- local tool handlers (programmatic tool calling) ---------------------
const handlers: Record<string, (input: any) => Promise<unknown>> = {
  npm_search: async ({ text, size = 5 }) => {
    const res = await fetch(
      `https://registry.npmjs.org/-/v1/search?text=${encodeURIComponent(text)}&size=${size}`
    );
    return res.json();
  },
  npm_package_metadata: async ({ package: pkg }) => {
    const res = await fetch(`https://registry.npmjs.org/${pkg}`);
    return res.json();
  },
  build_deep_link: async ({ kind, payload }) => {
    // kind: "claude-code" | "claude-chat"
    if (kind === "claude-code") {
      // claude://command/<name>?args=<urlencoded>
      const args = encodeURIComponent(payload.args ?? "");
      return { url: `claude://command/${payload.command}?args=${args}` };
    }
    return { url: `https://claude.ai/new?q=${encodeURIComponent(payload.q)}` };
  },
};

const tools: Anthropic.Messages.Tool[] = [
  {
    name: "npm_search",
    description: "Search the npm registry.",
    input_schema: {
      type: "object",
      properties: { text: { type: "string" }, size: { type: "number" } },
      required: ["text"],
    },
  },
  {
    name: "npm_package_metadata",
    description: "Fetch a package's registry document.",
    input_schema: {
      type: "object",
      properties: { package: { type: "string" } },
      required: ["package"],
    },
  },
  {
    name: "build_deep_link",
    description:
      "Build a deep link. kind='claude-code' returns claude:// URI; kind='claude-chat' returns a https://claude.ai/new?q= URL.",
    input_schema: {
      type: "object",
      properties: {
        kind: { type: "string", enum: ["claude-code", "claude-chat"] },
        payload: { type: "object" },
      },
      required: ["kind", "payload"],
      // Mark the last tool's schema as the cache breakpoint — caches the full
      // tools array as a single prefix.
      cache_control: { type: "ephemeral" },
    } as any,
  },
];

const systemPromptText = await readFile(
  resolve(root, "seeds/prompts/system-orchestrator.md"),
  "utf8"
);
const citationPromptText = await readFile(
  resolve(root, "seeds/prompts/citation-research.md"),
  "utf8"
);

const system: Anthropic.Messages.TextBlockParam[] = [
  {
    type: "text",
    text: systemPromptText,
    cache_control: { type: "ephemeral" }, // (1) prompt caching
  },
  {
    type: "text",
    text: citationPromptText,
    cache_control: { type: "ephemeral" },
  },
];

const messages: Anthropic.Messages.MessageParam[] = [
  {
    role: "user",
    content: [
      // (3) Citations — supply a document block.
      {
        type: "document",
        source: {
          type: "text",
          media_type: "text/plain",
          data: "The @modelcontextprotocol/sdk package is the official Model Context Protocol SDK published by Anthropic. It implements the stdio and SSE transports.",
        },
        title: "MCP SDK fact sheet",
        citations: { enabled: true },
      } as any,
      {
        type: "text",
        text: "Search npm for 'modelcontextprotocol', cite the fact sheet where relevant, and produce a deep-link that re-opens this query in Claude.ai.",
      },
    ],
  },
];

// (4) Programmatic tool-use loop
let stop = "";
while (stop !== "end_turn" && stop !== "stop_sequence") {
  const resp = await client.messages.create({
    model: MODEL,
    max_tokens: 1024,
    system,
    tools,
    messages,
  });
  stop = resp.stop_reason ?? "end_turn";
  messages.push({ role: "assistant", content: resp.content });

  if (stop !== "tool_use") break;

  const toolResults: Anthropic.Messages.ToolResultBlockParam[] = [];
  for (const block of resp.content) {
    if (block.type === "tool_use") {
      const handler = handlers[block.name];
      const out = handler
        ? await handler(block.input as any)
        : { error: `no handler for ${block.name}` };
      toolResults.push({
        type: "tool_result",
        tool_use_id: block.id,
        content: JSON.stringify(out).slice(0, 8000),
      });
    }
  }
  messages.push({ role: "user", content: toolResults });
}

// (5) Final assistant turn already includes deep-link output from the model.
const last = messages[messages.length - 1];
console.log(JSON.stringify(last, null, 2));
