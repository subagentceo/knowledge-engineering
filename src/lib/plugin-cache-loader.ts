/**
 * @cite vendor/anthropics/code.claude.com/docs/en/plugins-reference.md
 * @cite src/lib/cache-control.ts
 *
 * Loads dist/plugin-cache.json as a prompt-cached content block. Inject as the
 * first element of the system prompt array so the Anthropic API caches the full
 * plugin + skill manifest across turns — zero marginal token cost after the
 * first cache miss.
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { cachedText } from "./cache-control.js";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PluginCache = any;

const __dirname = dirname(fileURLToPath(import.meta.url));
const cacheFile = join(resolve(__dirname, "../.."), "dist/plugin-cache.json");

function loadRaw(): string {
  if (!existsSync(cacheFile)) {
    return JSON.stringify({ v: 1, plugins: [], session_skills: [], coding_tools: {} } satisfies PluginCache);
  }
  return readFileSync(cacheFile, "utf8");
}

export const pluginCacheBlock = cachedText(loadRaw());

export function getPluginCacheStats(): { plugins: number; sessionSkills: number; sizeKB: number } {
  const raw = loadRaw();
  const cache = JSON.parse(raw) as PluginCache;
  return {
    plugins: cache.plugins.length,
    sessionSkills: cache.session_skills.length,
    sizeKB: raw.length / 1024,
  };
}
