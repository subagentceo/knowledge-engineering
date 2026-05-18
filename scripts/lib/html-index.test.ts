// scripts/lib/html-index.test.ts
// @tdd green
//
// Citations:
//   @cite rubrics/phase-13.md                                    (O1 — html-index discovery)

import { strict as assert } from "node:assert";
import { test } from "node:test";

import { extractIndexUrls } from "./html-index.js";

const BASE = "https://www.anthropic.com/engineering";
const ENG_RE = /<a[^>]+href="(\/engineering\/[a-z0-9-]+)"[^>]*>/gi;

test("extracts and absolutizes engineering post paths", () => {
  const html = `
    <a href="/engineering/post-one" class="card">One</a>
    <a class="card" href="/engineering/post-two">Two</a>
    <a href="/about">not-engineering</a>
  `;
  const urls = extractIndexUrls(html, ENG_RE, BASE);
  assert.deepEqual(urls, [
    "https://www.anthropic.com/engineering/post-one",
    "https://www.anthropic.com/engineering/post-two",
  ]);
});

test("dedupes repeated hrefs preserving first-encounter order", () => {
  const html = `
    <a href="/engineering/alpha">a</a>
    <a href="/engineering/beta">b</a>
    <a href="/engineering/alpha">a-dup</a>
  `;
  const urls = extractIndexUrls(html, ENG_RE, BASE);
  assert.deepEqual(urls, [
    "https://www.anthropic.com/engineering/alpha",
    "https://www.anthropic.com/engineering/beta",
  ]);
});

test("handles regex without /g flag", () => {
  const noG = /<a[^>]+href="(\/engineering\/[a-z0-9-]+)"[^>]*>/i;
  const html = `<a href="/engineering/x">x</a><a href="/engineering/y">y</a>`;
  const urls = extractIndexUrls(html, noG, BASE);
  assert.deepEqual(urls, [
    "https://www.anthropic.com/engineering/x",
    "https://www.anthropic.com/engineering/y",
  ]);
});

test("absolute URLs in capture group pass through unchanged", () => {
  const re = /<a[^>]+href="(https:\/\/[^"]+)"[^>]*>/gi;
  const html = `<a href="https://example.com/a">a</a><a href="https://example.com/b">b</a>`;
  const urls = extractIndexUrls(html, re, BASE);
  assert.deepEqual(urls, ["https://example.com/a", "https://example.com/b"]);
});

test("relative paths resolve against the WHATWG URL parser semantics", () => {
  // BASE has no trailing slash, so the parser treats `engineering` as a
  // file segment; relative refs replace it. Absolute paths (leading /)
  // resolve from the host root. Spaces are percent-encoded, not rejected.
  const re = /<a[^>]+href="([^"]+)"[^>]*>/gi;
  const html = `<a href="not a url at all with spaces">x</a><a href="/engineering/ok">y</a>`;
  const urls = extractIndexUrls(html, re, BASE);
  assert.deepEqual(urls, [
    "https://www.anthropic.com/not%20a%20url%20at%20all%20with%20spaces",
    "https://www.anthropic.com/engineering/ok",
  ]);
});

test("empty html yields empty result", () => {
  assert.deepEqual(extractIndexUrls("", ENG_RE, BASE), []);
});
