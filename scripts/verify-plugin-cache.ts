/**
 * @cite vendor/anthropics/code.claude.com/docs/en/plugins-reference.md
 *
 * Validates dist/plugin-cache.json: schema, size guard (≤14 KB), minimum
 * plugin and skill counts. Runs after build:plugin-cache in the verify chain.
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PluginCache = any;

const __dirname = dirname(fileURLToPath(import.meta.url));
const cacheFile = join(resolve(__dirname, ".."), "dist/plugin-cache.json");

function fail(msg: string): never {
  process.stderr.write(`[verify:plugin-cache] FAIL — ${msg}\n`);
  process.exit(1);
}

if (!existsSync(cacheFile)) {
  fail("dist/plugin-cache.json not found — run: npm run build:plugin-cache");
}

const raw = readFileSync(cacheFile, "utf8");
const sizeKB = raw.length / 1024;

if (sizeKB > 14) fail(`${sizeKB.toFixed(1)} KB exceeds 14 KB limit`);

const cache = JSON.parse(raw) as PluginCache;

if (cache.v !== 1) fail(`cache.v expected 1, got ${cache.v}`);
if (!Array.isArray(cache.plugins) || cache.plugins.length < 6) {
  fail(`expected ≥6 plugins, got ${cache.plugins?.length ?? 0}`);
}
if (!Array.isArray(cache.session_skills) || cache.session_skills.length < 4) {
  fail(`expected ≥4 session_skills, got ${cache.session_skills?.length ?? 0}`);
}
if (!cache.coding_tools?.gh_cli?.length) fail("missing coding_tools.gh_cli");
if (!cache.coding_tools?.git?.length) fail("missing coding_tools.git");
if (!cache.coding_tools?.graphql?.length) fail("missing coding_tools.graphql");

for (const p of cache.plugins) {
  if (!p.id || !p.name) fail(`plugin missing id or name: ${JSON.stringify(p)}`);
}

process.stdout.write(
  `[verify:plugin-cache] OK — ${cache.plugins.length} plugins, ${cache.session_skills.length} session skills, ${sizeKB.toFixed(1)} KB\n`,
);
