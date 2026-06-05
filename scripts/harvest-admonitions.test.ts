/**
 * @cite vendor/modelcontextprotocol/modelcontextprotocol.io/registry/quickstart.md
 * @cite vendor/modelcontextprotocol/modelcontextprotocol.io/extensions/overview.md
 */
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { harvestAdmonitions } from "./harvest-admonitions.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const REPO_ROOT = resolve(__dirname, "..");
const QUICKSTART = resolve(
  REPO_ROOT,
  "vendor/modelcontextprotocol/modelcontextprotocol.io/registry/quickstart.md",
);

let passed = 0;
let failed = 0;

function check(name: string, fn: () => void | Promise<void>): Promise<void> {
  return Promise.resolve()
    .then(() => fn())
    .then(() => {
      passed++;
      console.log(`  ✓ ${name}`);
    })
    .catch((err: unknown) => {
      failed++;
      console.error(`  ✗ ${name}`);
      console.error(`    ${(err as Error).message}`);
    });
}

console.log("harvest-admonitions:");

const records = await harvestAdmonitions(QUICKSTART);

await check("returns array for a file with a Note", () => {
  if (!Array.isArray(records)) throw new Error("expected array");
  if (records.length === 0) throw new Error("expected at least one admonition");
});

await check("type field matches tag name exactly", () => {
  const valid = new Set(["Note", "Warning", "Tip", "Callout", "Caution", "Info"]);
  for (const r of records) {
    if (!valid.has(r.type)) throw new Error(`unexpected type: ${r.type}`);
  }
});

await check("lineStart is a positive integer", () => {
  for (const r of records) {
    if (!Number.isInteger(r.lineStart) || r.lineStart < 1) {
      throw new Error(`lineStart=${r.lineStart} must be a positive integer`);
    }
  }
});

await check("text content is trimmed and non-empty", () => {
  for (const r of records) {
    if (r.text.length === 0) throw new Error("text is empty");
    if (r.text !== r.text.trim()) throw new Error("text is not trimmed");
  }
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
