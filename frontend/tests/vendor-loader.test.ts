// Citations:
//   @cite rubrics/phase-13.md (O7)

import { strict as assert } from "node:assert";
import { test } from "node:test";

import { renderMarkdown } from "../src/vendor-loader.js";

import { JSDOM } from "jsdom";
import { setPurifierWindow } from "../src/vendor-loader.js";
setPurifierWindow(new JSDOM("").window);

test("renderMarkdown converts headings to <h1>", () => {
  const html = renderMarkdown("# Hello");
  assert.match(html, /<h1[^>]*>Hello<\/h1>/);
});

test("renderMarkdown sanitizes <script> tags", () => {
  const html = renderMarkdown("ok\n\n<script>alert(1)</script>");
  assert.equal(html.includes("<script"), false);
  assert.equal(html.includes("alert(1)"), false);
});

test("renderMarkdown sanitizes inline event handlers", () => {
  const html = renderMarkdown('[click](javascript:void(0)) <img src=x onerror=alert(1) />');
  assert.equal(html.includes("onerror"), false);
});

test("renderMarkdown preserves code fences", () => {
  const html = renderMarkdown("```ts\nlet x = 1;\n```");
  assert.match(html, /<pre>/);
  assert.match(html, /<code/);
});

test("renderMarkdown handles empty input", () => {
  assert.equal(renderMarkdown(""), "");
});
