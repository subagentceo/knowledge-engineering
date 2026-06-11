/**
 * @cite vendor/anthropics/platform.claude.com/docs/en/build-with-claude/prompt-caching.md
 */
/**
 * Example: Prompt caching.
 *
 * Outcome: System prompt + citation seed are sent with
 * `cache_control: { type: "ephemeral" }`, so subsequent identical-prefix
 * turns hit the cache. The two cache breakpoints — one per system block —
 * cap the system prefix at the second `cachedText`.
 *
 * Source: https://docs.claude.com/en/docs/build-with-claude/prompt-caching
 *
 * Run: npm run example:prompt-caching
 */
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { cachedText } from "../lib/cache-control.js";
import { client, MODEL } from "./_client.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..", "..");

const systemPrompt = await readFile(
  resolve(root, "seeds/prompts/system-orchestrator.md"),
  "utf8"
);
const citationSeed = await readFile(
  resolve(root, "seeds/prompts/citation-research.md"),
  "utf8"
);

const resp = await client().messages.create({
  model: MODEL,
  max_tokens: 256,
  system: [cachedText(systemPrompt), cachedText(citationSeed)],
  messages: [
    {
      role: "user",
      content: "In one sentence, what does this stack do?",
    },
  ],
});

process.stdout.write(JSON.stringify(resp.usage, null, 2) + "\n");
for (const block of resp.content) {
  if (block.type === "text") process.stdout.write(block.text + "\n");
}
