/**
 * Phase 1.A unit tests for scripts/lib/url-to-path.ts.
 *
 * @cite seeds/posture/session-start.xml
 * @cite seeds/citations/connectors-building.md
 * @cite rubrics/phase-1.md
 */

import { urlToPath, pathToUrl } from "./url-to-path.js";

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

function eq<T>(a: T, b: T, msg = ""): void {
  const A = JSON.stringify(a);
  const B = JSON.stringify(b);
  if (A !== B) throw new Error(`${msg}\n      expected: ${B}\n      got:      ${A}`);
}

console.log("url-to-path:");

check("appends .md to extensionless trailing segment", () => {
  const r = urlToPath("https://docs.stripe.com/api/charges", { vendor: "stripe" });
  eq(r.relPath, "docs.stripe.com/api/charges.md");
});

check("trailing slash → index.md", () => {
  const r = urlToPath("https://docs.stripe.com/api/", { vendor: "stripe" });
  eq(r.relPath, "docs.stripe.com/api/index.md");
});

check("preserves existing extension", () => {
  const r = urlToPath("https://docs.turbopuffer.com/quickstart.md", { vendor: "turbopuffer" });
  eq(r.relPath, "docs.turbopuffer.com/quickstart.md");
});

check("strips query strings + hashes", () => {
  const r = urlToPath("https://example.com/foo?bar=1&baz=2#section", { vendor: "example" });
  eq(r.relPath, "example.com/foo.md");
});

check("root URL → index.md", () => {
  const r = urlToPath("https://example.com/", { vendor: "example" });
  eq(r.relPath, "example.com/index.md");
});

check("root URL with no path → index.md", () => {
  const r = urlToPath("https://example.com", { vendor: "example" });
  eq(r.relPath, "example.com/index.md");
});

check("nested deep paths preserved", () => {
  const r = urlToPath("https://platform.claude.com/docs/en/managed-agents/define-outcomes", {
    vendor: "anthropics",
  });
  eq(r.relPath, "platform.claude.com/docs/en/managed-agents/define-outcomes.md");
});

check("pathToUrl reverses appendMd path", () => {
  const r = pathToUrl(["docs.stripe.com", "api", "charges.md"]);
  eq(r, "https://docs.stripe.com/api/charges");
});

check("pathToUrl reverses index.md → trailing slash", () => {
  const r = pathToUrl(["docs.stripe.com", "api", "index.md"]);
  eq(r, "https://docs.stripe.com/api/");
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
