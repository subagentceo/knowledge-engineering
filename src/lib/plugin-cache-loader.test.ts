/**
 * Tests for src/lib/plugin-cache-loader.ts — the prompt-cached plugin
 * manifest block injected into the orchestrator system prompt.
 *
 * @tdd green
 * @cite vendor/anthropics/platform.claude.com/docs/en/build-with-claude/prompt-caching.md
 * @cite vendor/anthropics/code.claude.com/docs/en/plugins-reference.md
 */
import { pluginCacheBlock, getPluginCacheStats } from "./plugin-cache-loader.js";

let passed = 0;
let failed = 0;

function check(name: string, fn: () => void): void {
  try {
    fn();
    passed += 1;
    console.log(`  ✓ ${name}`);
  } catch (err) {
    failed += 1;
    console.error(`  ✗ ${name}`);
    console.error(`    ${(err as Error).message}`);
  }
}

console.log("plugin-cache-loader:");

check("pluginCacheBlock is a text block carrying cache_control: ephemeral", () => {
  if (pluginCacheBlock.type !== "text") throw new Error(`type=${pluginCacheBlock.type}`);
  const cc = pluginCacheBlock.cache_control as { type: string } | undefined;
  if (!cc || cc.type !== "ephemeral") {
    throw new Error(`cache_control=${JSON.stringify(pluginCacheBlock.cache_control)}`);
  }
});

check("pluginCacheBlock.text is valid JSON with the cache schema keys", () => {
  const parsed = JSON.parse(pluginCacheBlock.text) as Record<string, unknown>;
  if (parsed.v !== 1) throw new Error(`v=${String(parsed.v)}`);
  if (!Array.isArray(parsed.plugins)) throw new Error("plugins not an array");
  if (!Array.isArray(parsed.session_skills)) throw new Error("session_skills not an array");
  if (typeof parsed.coding_tools !== "object") throw new Error("coding_tools missing");
});

check("getPluginCacheStats returns numeric counts and size", () => {
  const stats = getPluginCacheStats();
  if (typeof stats.plugins !== "number") throw new Error(`plugins=${typeof stats.plugins}`);
  if (typeof stats.sessionSkills !== "number") throw new Error(`sessionSkills=${typeof stats.sessionSkills}`);
  if (typeof stats.sizeKB !== "number") throw new Error(`sizeKB=${typeof stats.sizeKB}`);
  if (stats.plugins < 0 || stats.sessionSkills < 0) throw new Error("negative counts");
  if (stats.sizeKB <= 0) throw new Error(`sizeKB must be positive: ${stats.sizeKB}`);
});

check("getPluginCacheStats counts agree with pluginCacheBlock contents", () => {
  const stats = getPluginCacheStats();
  const parsed = JSON.parse(pluginCacheBlock.text) as {
    plugins: unknown[];
    session_skills: unknown[];
  };
  if (stats.plugins !== parsed.plugins.length) {
    throw new Error(`plugins ${stats.plugins} != ${parsed.plugins.length}`);
  }
  if (stats.sessionSkills !== parsed.session_skills.length) {
    throw new Error(`sessionSkills ${stats.sessionSkills} != ${parsed.session_skills.length}`);
  }
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
