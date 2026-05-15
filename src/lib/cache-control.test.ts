/**
 * Tests for src/lib/cache-control.ts — Anthropic Messages API
 * cache-control shape helpers.
 *
 * Phase G item O-G8: coverage backfill. The file landed without a
 * sibling test and sat on the pre-existing-baseline exemption list
 * (4 files at 0% under the 70% gate). This test removes it from
 * that list.
 *
 * @tdd green
 * @cite vendor/anthropics/platform.claude.com/docs/en/build-with-claude/prompt-caching.md
 * @cite rubrics/phase-13.md
 */
import { cachedText, ephemeral, withCacheBreakpoint } from "./cache-control.js";

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

console.log("cache-control:");

check("ephemeral constant has the expected shape", () => {
  if (ephemeral.type !== "ephemeral") throw new Error(`type=${ephemeral.type}`);
});

check("cachedText returns a text block carrying cache_control: ephemeral", () => {
  const block = cachedText("hello");
  if (block.type !== "text") throw new Error(`type=${block.type}`);
  if (block.text !== "hello") throw new Error(`text=${block.text}`);
  const cc = block.cache_control as { type: string } | undefined;
  if (!cc || cc.type !== "ephemeral") {
    throw new Error(`cache_control=${JSON.stringify(block.cache_control)}`);
  }
});

check("cachedText preserves the literal text including newlines + whitespace", () => {
  const text = "  multi\nline   ";
  const block = cachedText(text);
  if (block.text !== text) throw new Error(`text drift: ${JSON.stringify(block.text)}`);
});

check("withCacheBreakpoint adds cache_control to a generic block", () => {
  const input = { type: "tool_use" as const, name: "x", input: { a: 1 } };
  const out = withCacheBreakpoint(input);
  if ((out as { type: string }).type !== "tool_use") throw new Error("type changed");
  if ((out as { name: string }).name !== "x") throw new Error("name dropped");
  const cc = (out as { cache_control?: { type: string } }).cache_control;
  if (!cc || cc.type !== "ephemeral") throw new Error("cache_control missing");
});

check("withCacheBreakpoint does not mutate the input block", () => {
  const input: { type: string; cache_control?: unknown } = { type: "text" };
  const out = withCacheBreakpoint(input);
  if (input.cache_control !== undefined) throw new Error("input was mutated");
  if (out === input) throw new Error("output should be a fresh object");
});

check("withCacheBreakpoint overrides any prior cache_control on the block", () => {
  const input = { type: "text" as const, cache_control: { type: "stale" } };
  const out = withCacheBreakpoint(input);
  const cc = out.cache_control as { type: string };
  if (cc.type !== "ephemeral") throw new Error(`type=${cc.type}`);
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
