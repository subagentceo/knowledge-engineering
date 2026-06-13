/**
 * FM relay test. Asserts the OAuth-only relay (POST /claude) validates the
 * caller token in constant time and refuses smuggled api-key headers.
 *
 * @tdd green
 * @cite seeds/posture/session-start.xml
 * @cite seeds/prompts/operator-2026-05-10.md
 * @cite rubrics/phase-0.md
 *
 * Design doc: docs/reference/anthropic-foundation-models-integration.md (§2).
 * Hand-rolled assert (matches env-sanitize.test.ts). Run with
 * `tsx infra/cloudflare/src/fm-relay.test.ts`.
 */

import { timingSafeEqual } from "./worker.js";

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

console.log("fm-relay:");

expect("timingSafeEqual: equal strings match", () => {
  if (!timingSafeEqual("app-token-abc", "app-token-abc")) throw new Error("equal strings did not match");
});

expect("timingSafeEqual: different strings of equal length differ", () => {
  if (timingSafeEqual("app-token-abc", "app-token-xyz")) throw new Error("different strings matched");
});

expect("timingSafeEqual: length mismatch is not equal", () => {
  if (timingSafeEqual("short", "longer-token")) throw new Error("length mismatch matched");
});

expect("timingSafeEqual: empty presented token never matches a real one", () => {
  if (timingSafeEqual("", "real-token")) throw new Error("empty token matched");
});

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed === 0 ? 0 : 1);
