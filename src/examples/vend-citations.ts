/**
 * @cite vendor/anthropics/platform.claude.com/docs/en/build-with-claude/citations.md
 */
/**
 * Example: vend corpus citations to a research agent (B10).
 *
 * Outcome: citations_search-equivalent corpus lookup → vendCitations()
 * document blocks (citations.enabled on every block, per the all-or-none
 * rule) → one Messages call whose answer carries span-level citations
 * with CSL provenance in each document's context.
 *
 * Source: vendor/anthropics/platform.claude.com/docs/en/build-with-claude/citations.md
 *
 * Run: npm run example:vend-citations -- "economic index"
 */
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { corpus, searchCitations } from "../mcp/lanes/citations.js";
import { vendCitations } from "../lib/citations-vending.js";
import { client, MODEL } from "./_client.js";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
const query = process.argv[2] ?? "economic research";

const hits = searchCitations(corpus(root), query, 3);
if (hits.length === 0) {
  console.error(`no corpus citations match "${query}"`);
  process.exit(1);
}

const resp = await client().messages.create({
  model: MODEL,
  max_tokens: 512,
  messages: [
    {
      role: "user",
      content: [
        ...vendCitations(hits),
        {
          type: "text",
          text: `Summarize what these sources say about "${query}". Cite every claim.`,
        },
      ],
    },
  ],
});

for (const blockOut of resp.content) {
  if (blockOut.type === "text") console.log(blockOut.text);
}
