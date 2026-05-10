/**
 * Phase 1.A unit tests for scripts/lib/llms-txt.ts.
 *
 * @cite seeds/posture/session-start.xml
 * @cite vendor/anthropics/code.claude.com/docs/en/commands.md
 * @cite rubrics/phase-1.md
 */

import { parseLlmsTxt } from "./llms-txt.js";

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

console.log("llms-txt:");

check("parses a simple valid llms.txt with sections", () => {
  const body = [
    "# Stripe Docs",
    "> Payments + billing.",
    "## API",
    "- [Charges](https://docs.stripe.com/api/charges): create + manage",
    "- [Customers](https://docs.stripe.com/api/customers)",
    "## Guides",
    "- [Webhooks](https://docs.stripe.com/webhooks)",
  ].join("\n");
  const r = parseLlmsTxt(body);
  if (r === null) throw new Error("expected a result, got null");
  if (r.title !== "Stripe Docs") throw new Error(`title: ${r.title}`);
  if (r.blurb !== "Payments + billing.") throw new Error(`blurb: ${r.blurb}`);
  if (r.sections.length !== 2) throw new Error(`sections: ${r.sections.length}`);
  if (r.sections[0].links.length !== 2) throw new Error("section[0] links");
  if (r.sections[0].links[0].blurb !== "create + manage") throw new Error("link blurb");
});

check("returns null when no title", () => {
  const body = "- [foo](https://x/foo)\n- [bar](https://x/bar)\n- [baz](https://x/baz)";
  const r = parseLlmsTxt(body);
  if (r !== null) throw new Error("expected null (no title)");
});

check("returns null when fewer than 3 links", () => {
  const body = "# Title\n- [a](https://x/a)\n- [b](https://x/b)";
  const r = parseLlmsTxt(body);
  if (r !== null) throw new Error("expected null (only 2 links)");
});

check("preamble links land in unnamed section", () => {
  const body = [
    "# Foo",
    "- [a](https://x/a)",
    "- [b](https://x/b)",
    "- [c](https://x/c)",
    "## Bar",
    "- [d](https://x/d)",
  ].join("\n");
  const r = parseLlmsTxt(body);
  if (r === null) throw new Error("expected a result");
  if (r.sections.length !== 2) throw new Error(`sections: ${r.sections.length}`);
  if (r.sections[0].heading !== "") throw new Error("preamble section heading");
  if (r.sections[0].links.length !== 3) throw new Error("preamble link count");
});

check("ignores unknown lines", () => {
  const body = [
    "# Foo",
    "<!-- a comment -->",
    "Just a paragraph.",
    "- [a](https://x/a)",
    "- [b](https://x/b)",
    "- [c](https://x/c)",
  ].join("\n");
  const r = parseLlmsTxt(body);
  if (r === null) throw new Error("expected a result");
  if (r.sections[0].links.length !== 3) throw new Error("link count");
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
