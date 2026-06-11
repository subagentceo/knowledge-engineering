/**
 * @cite vendor/anthropics/platform.claude.com/docs/en/build-with-claude/citations.md
 */
/**
 * Example: Citations.
 *
 * Outcome: A `document` content block with `citations.enabled: true` forces
 * the model to attach `citations[]` to text blocks, pointing at spans of
 * the supplied document. The citation seed in the system prefix reinforces
 * the rule.
 *
 * Source: https://docs.claude.com/en/docs/build-with-claude/citations
 *
 * Run: npm run example:citations
 */
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { cachedText } from "../lib/cache-control.js";
import { client, MODEL } from "./_client.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..", "..");

const citationSeed = await readFile(
  resolve(root, "seeds/prompts/citation-research.md"),
  "utf8"
);

const resp = await client().messages.create({
  model: MODEL,
  max_tokens: 512,
  system: [cachedText(citationSeed)],
  messages: [
    {
      role: "user",
      content: [
        {
          type: "document",
          source: {
            type: "text",
            media_type: "text/plain",
            data: "The @modelcontextprotocol/sdk package is the official Model Context Protocol SDK published by Anthropic. v2 introduced the high-level McpServer.tool API.",
          },
          title: "MCP SDK fact sheet",
          citations: { enabled: true },
        },
        {
          type: "text",
          text: "What is @modelcontextprotocol/sdk and what changed in v2? Cite the fact sheet.",
        },
      ],
    },
  ],
});

process.stdout.write(JSON.stringify(resp.content, null, 2) + "\n");
