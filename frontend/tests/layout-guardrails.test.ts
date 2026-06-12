// Citations:
//   @cite rubrics/phase-13.md (O7)

import { strict as assert } from "node:assert";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "vitest";

const srcDir = join(dirname(fileURLToPath(import.meta.url)), "..", "src");
const css = readFileSync(join(srcDir, "styles.css"), "utf8");
const html = readFileSync(join(srcDir, "index.html"), "utf8");

function ruleBody(selector: string): string {
  const re = new RegExp(`${selector.replace("#", "\\#")}\\s*\\{([^}]*)\\}`, "g");
  const bodies = [...css.matchAll(re)].map((m) => m[1]);
  assert.ok(bodies.length > 0, `no CSS rule found for ${selector}`);
  return bodies.join("\n");
}

test("#app does not clip page scroll (no overflow: hidden)", () => {
  assert.ok(!/overflow\s*:\s*hidden/.test(ruleBody("#app")));
});

test("#app uses min-height, not a fixed height", () => {
  const body = ruleBody("#app");
  assert.match(body, /min-height\s*:/);
  assert.ok(!/(^|[^-])height\s*:\s*100svh/.test(body), "#app must not set a fixed height");
});

test("#ascii-pane is non-interactive and height-capped", () => {
  const body = ruleBody("#ascii-pane");
  assert.match(body, /pointer-events\s*:\s*none/);
  assert.match(body, /max-height\s*:/);
});

test("index.html contains all six pane/container ids", () => {
  for (const id of [
    "ascii-pane",
    "accordion-pane",
    "citations-pane",
    "warehouse-pane",
    "service-status-pane",
    "memory-pane",
  ]) {
    assert.match(html, new RegExp(`id="${id}"`), `missing #${id}`);
  }
});
