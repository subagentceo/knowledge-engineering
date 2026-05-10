/**
 * Example: Programmatic tool-use loop.
 *
 * Outcome: Drive the Anthropic Messages API in a loop, dispatching every
 * `tool_use` block to a local handler and feeding back `tool_result` until
 * `stop_reason !== "tool_use"`.
 *
 * Source: https://docs.claude.com/en/docs/agents-and-tools/tool-use/overview
 *
 * Run: npm run example:programmatic-tool-loop
 */
import { client, MODEL } from "./_client.js";
import type Anthropic from "@anthropic-ai/sdk";

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
];

const messages: Anthropic.Messages.MessageParam[] = [
  {
    role: "user",
    content:
      "Search npm for 'modelcontextprotocol' and report the top result's latest version.",
  },
];

const c = client();
let stop = "";
while (stop !== "end_turn" && stop !== "stop_sequence") {
  const resp = await c.messages.create({
    model: MODEL,
    max_tokens: 1024,
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

process.stdout.write(JSON.stringify(messages.at(-1), null, 2) + "\n");
