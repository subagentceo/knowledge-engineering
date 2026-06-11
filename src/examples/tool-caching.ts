/**
 * @cite vendor/anthropics/platform.claude.com/docs/en/build-with-claude/prompt-caching.md
 */
/**
 * Example: Tool caching.
 *
 * Outcome: The full `tools` array is cached as a single prefix by attaching
 * `cache_control: { type: "ephemeral" }` to the *last* tool. Every later
 * request that sends the same tools array reads from the cache.
 *
 * Source: https://docs.claude.com/en/docs/build-with-claude/prompt-caching#caching-tool-definitions
 *
 * Run: npm run example:tool-caching
 */
import { withCacheBreakpoint } from "../lib/cache-control.js";
import { client, MODEL } from "./_client.js";
import type Anthropic from "@anthropic-ai/sdk";

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
  withCacheBreakpoint({
    name: "build_deep_link",
    description: "Build a claude:// or claude.ai/new?q= deep link.",
    input_schema: {
      type: "object",
      properties: {
        kind: { type: "string", enum: ["claude-code", "claude-chat"] },
        payload: { type: "object" },
      },
      required: ["kind", "payload"],
    },
  } as Anthropic.Messages.Tool),
];

const resp = await client().messages.create({
  model: MODEL,
  max_tokens: 256,
  tools,
  messages: [
    {
      role: "user",
      content:
        "List the tool names you have available. Do not call any of them.",
    },
  ],
});

process.stdout.write(JSON.stringify(resp.usage, null, 2) + "\n");
for (const block of resp.content) {
  if (block.type === "text") process.stdout.write(block.text + "\n");
}
