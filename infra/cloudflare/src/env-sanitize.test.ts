/**
 * Phase 0g env-sanitizer test. Asserts that the OAuth substitution applied
 * over the cited Neon guide is enforced at the Worker boundary.
 *
 * @cite vendor/anthropics/neon.com/guides/cloudflare-sandbox-neon-branching.md
 * @cite seeds/posture/session-start.xml
 * @cite rubrics/phase-0.md
 *
 * Hand-rolled assert (no test framework yet). Exit 0 on pass, 1 on fail.
 * Run with `tsx infra/cloudflare/src/env-sanitize.test.ts`.
 */

import { sanitizeEnv } from "./worker.js";

let passed = 0;
let failed = 0;

function expect(name: string, fn: () => void) {
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

console.log("env-sanitize:");

expect("rejects ANTHROPIC_API_KEY", () => {
  let threw = false;
  try {
    sanitizeEnv({ ANTHROPIC_API_KEY: "sk-ant-test" });
  } catch (err) {
    threw = true;
    if ((err as Error).name !== "ApiKeyForbiddenError") {
      throw new Error(`expected ApiKeyForbiddenError, got ${(err as Error).name}`);
    }
  }
  if (!threw) throw new Error("sanitizeEnv accepted ANTHROPIC_API_KEY without throwing");
});

expect("forwards CLAUDE_CODE_OAUTH_TOKEN unchanged", () => {
  const out = sanitizeEnv({ CLAUDE_CODE_OAUTH_TOKEN: "ot-test", DATABASE_URL: "postgres://x" });
  if (out.CLAUDE_CODE_OAUTH_TOKEN !== "ot-test") {
    throw new Error("CLAUDE_CODE_OAUTH_TOKEN was mangled");
  }
  if (out.DATABASE_URL !== "postgres://x") {
    throw new Error("DATABASE_URL was mangled");
  }
});

expect("rejects ANTHROPIC_API_KEY even when other valid keys are present", () => {
  let threw = false;
  try {
    sanitizeEnv({
      ANTHROPIC_API_KEY: "smuggled",
      CLAUDE_CODE_OAUTH_TOKEN: "ok",
      DATABASE_URL: "postgres://x",
    });
  } catch {
    threw = true;
  }
  if (!threw) throw new Error("sanitizeEnv accepted a smuggled ANTHROPIC_API_KEY");
});

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed === 0 ? 0 : 1);
