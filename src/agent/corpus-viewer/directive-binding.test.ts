// src/agent/corpus-viewer/directive-binding.test.ts
// @tdd green
//
// THE outcome-driven guarantee: every <directive schema="file#export"> in the
// corpus-viewer build XML must resolve to a real export. The XML states the
// WHY; the Zod type states the WHAT; this test proves they're bound. A
// directive that points at a missing schema is a build that lies about being
// machine-enforced — this test fails loudly when that drift happens.
//
// Citations:
//   @cite seeds/posture/corpus-viewer-build.xml
//   @cite seeds/posture/session-start.xml   (XML-posture precedent + its shape test)

import { strict as assert } from "node:assert";
import { test } from "node:test";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..", "..", "..");
const XML_PATH = resolve(REPO_ROOT, "seeds/posture/corpus-viewer-build.xml");

const xml = readFileSync(XML_PATH, "utf8");

/** Pull every schema="path#export" reference out of the directive XML. */
function schemaRefs(body: string): { file: string; exportName: string }[] {
  const re = /schema="([^"#]+)#([^"]+)"/g;
  const out: { file: string; exportName: string }[] = [];
  for (const m of body.matchAll(re)) out.push({ file: m[1]!, exportName: m[2]! });
  return out;
}

const refs = schemaRefs(xml);

test("the directive XML actually references schemas (not empty)", () => {
  assert.ok(refs.length >= 8, `expected ≥8 schema bindings, got ${refs.length}`);
});

test("every directive schema ref resolves to a real exported symbol", () => {
  const missing: string[] = [];
  for (const { file, exportName } of refs) {
    const abs = resolve(REPO_ROOT, file);
    let src: string;
    try {
      src = readFileSync(abs, "utf8");
    } catch {
      missing.push(`${file} (file not found)`);
      continue;
    }
    // Match `export const X`, `export function X`, `export class X`,
    // `export interface X`, `export type X`, or `export { ..., X, ... }`.
    const named = new RegExp(
      `export\\s+(?:async\\s+)?(?:const|function|class|interface|type|enum)\\s+${exportName}\\b`,
    );
    const reexport = new RegExp(`export\\s*\\{[^}]*\\b${exportName}\\b[^}]*\\}`);
    if (!named.test(src) && !reexport.test(src)) {
      missing.push(`${file}#${exportName}`);
    }
  }
  assert.deepEqual(missing, [], `unbound directive schema refs:\n${missing.join("\n")}`);
});

test("the build XML pins the model and forbids ANTHROPIC_API_KEY", () => {
  assert.match(xml, /model="claude-opus-4-8"/);
  assert.match(xml, /<forbid key="ANTHROPIC_API_KEY"\/>/);
});

test("the XML declares the load-bearing directive sections", () => {
  for (const section of ["boundaries", "budgets", "model-routing", "caching", "memory", "tdd"]) {
    assert.match(xml, new RegExp(`<${section}>`), `missing <${section}> section`);
  }
});
