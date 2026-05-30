// scripts/lib/pdf-mirror.test.ts
//
// Unit tests for the PDF mirror lane helpers + idempotency path.
// The full fetch+pdf-parse round trip is integration-tested by the
// actual crawl output (vendor/claude-sitemap/_pdfs/*.md). Here we cover
// the pure functions plus the no-fetch branches of mirrorPdfs.
//
// @tdd green
//
// Citations:
//   @cite vendor/claude-sitemap/crawl.json     (pdf_allow_prefixes consumer)
//   @cite seeds/posture/session-start.xml      (.md-first hard rule)

import { strict as assert } from "node:assert";
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, existsSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import { test } from "node:test";

import { mirrorPdfs, scanPdfUrls, scanPdfUrlsFromHtml, slugForPdf } from "./pdf-mirror.js";

// ────────────────────────────────────────────────────────────────────
// scanPdfUrls

test("scanPdfUrls returns empty array when allowPrefixes is empty", () => {
  const md = "[doc](https://cdn.example.com/file.pdf)";
  assert.deepEqual(scanPdfUrls(md, []), []);
});

test("scanPdfUrls extracts a single plain PDF URL", () => {
  const md = "Read the [docs](https://cdn.example.com/foo.pdf) now.";
  assert.deepEqual(
    scanPdfUrls(md, ["https://cdn.example.com/"]),
    ["https://cdn.example.com/foo.pdf"],
  );
});

test("scanPdfUrls handles turndown-escaped parens inside the URL", () => {
  // This is the founders-playbook regression: the PDF URL has
  // `%20\(1\).pdf` which the prior regex (without paren-escape support)
  // truncated at the first backslash.
  const md =
    "Check it out, [here](https://cdn.prod.website-files.com/abc/def_The-Founders-Playbook-05062026_v3%20\\(1\\).pdf).";
  const out = scanPdfUrls(md, ["https://cdn.prod.website-files.com/"]);
  assert.equal(out.length, 1);
  assert.ok(out[0].includes("(1).pdf"), `expected unescaped parens; got ${out[0]}`);
  assert.ok(!out[0].includes("\\"), "captured URL should not retain backslashes");
});

test("scanPdfUrls accepts query-string suffix", () => {
  const md = "[a](https://cdn.example.com/x.pdf?v=2&hash=abc)";
  assert.deepEqual(
    scanPdfUrls(md, ["https://cdn.example.com/"]),
    ["https://cdn.example.com/x.pdf?v=2&hash=abc"],
  );
});

test("scanPdfUrls applies the allowlist prefix filter", () => {
  const md =
    "[ok](https://cdn.allowed.com/x.pdf) and [no](https://untrusted.example/y.pdf)";
  assert.deepEqual(
    scanPdfUrls(md, ["https://cdn.allowed.com/"]),
    ["https://cdn.allowed.com/x.pdf"],
  );
});

test("scanPdfUrls dedupes repeated URLs preserving first-encounter order", () => {
  const md =
    "[a](https://cdn.example.com/foo.pdf) ... [b](https://cdn.example.com/foo.pdf) ... [c](https://cdn.example.com/bar.pdf)";
  assert.deepEqual(scanPdfUrls(md, ["https://cdn.example.com/"]), [
    "https://cdn.example.com/foo.pdf",
    "https://cdn.example.com/bar.pdf",
  ]);
});

test("scanPdfUrls ignores http(s) links that don't end in .pdf", () => {
  const md = "[a](https://cdn.example.com/foo.html) [b](https://cdn.example.com/bar.pdf)";
  assert.deepEqual(
    scanPdfUrls(md, ["https://cdn.example.com/"]),
    ["https://cdn.example.com/bar.pdf"],
  );
});

test("scanPdfUrls returns empty when no link matches", () => {
  const md = "Just prose, no links.";
  assert.deepEqual(scanPdfUrls(md, ["https://cdn.example.com/"]), []);
});

// ────────────────────────────────────────────────────────────────────
// scanPdfUrlsFromHtml — recovers PDFs behind <a> hrefs that the html-extract
// F3 link-flattening strips from the markdown (the labor-market-impacts /
// "Read in PDF" regression: pdf-mirror fetched=0 despite a linked PDF).

test("scanPdfUrlsFromHtml returns empty when allowPrefixes is empty", () => {
  const html = '<a href="https://cdn.example.com/x.pdf">x</a>';
  assert.deepEqual(scanPdfUrlsFromHtml(html, []), []);
});

test("scanPdfUrlsFromHtml extracts a PDF behind an anchor href (double quotes)", () => {
  const html = '<a href="https://cdn.example.com/foo.pdf">Read in PDF</a>';
  assert.deepEqual(
    scanPdfUrlsFromHtml(html, ["https://cdn.example.com/"]),
    ["https://cdn.example.com/foo.pdf"],
  );
});

test("scanPdfUrlsFromHtml handles single-quoted hrefs and extra attributes", () => {
  const html = "<a href='https://cdn.example.com/a.pdf' target='_blank' rel='noopener'>Appendix</a>";
  assert.deepEqual(
    scanPdfUrlsFromHtml(html, ["https://cdn.example.com/"]),
    ["https://cdn.example.com/a.pdf"],
  );
});

test("scanPdfUrlsFromHtml recovers PDFs across two allowlisted CDN hosts", () => {
  // The real economic-research case: PDFs split between cdn.sanity.io and
  // www-cdn.anthropic.com.
  const html = `
    <a href="https://cdn.sanity.io/files/4zrzovbb/website/aaa.pdf">Read in PDF</a>
    <a href="https://www-cdn.anthropic.com/bbb.pdf" target="_blank">Appendix</a>`;
  assert.deepEqual(
    scanPdfUrlsFromHtml(html, [
      "https://cdn.sanity.io/files/4zrzovbb/",
      "https://www-cdn.anthropic.com/",
    ]),
    [
      "https://cdn.sanity.io/files/4zrzovbb/website/aaa.pdf",
      "https://www-cdn.anthropic.com/bbb.pdf",
    ],
  );
});

test("scanPdfUrlsFromHtml applies the allowlist prefix filter", () => {
  const html = '<a href="https://evil.example.com/x.pdf">x</a>';
  assert.deepEqual(scanPdfUrlsFromHtml(html, ["https://cdn.example.com/"]), []);
});

test("scanPdfUrlsFromHtml dedupes a PDF linked more than once", () => {
  const html =
    '<a href="https://cdn.example.com/d.pdf">main</a> ... <a href="https://cdn.example.com/d.pdf">here</a>';
  assert.deepEqual(
    scanPdfUrlsFromHtml(html, ["https://cdn.example.com/"]),
    ["https://cdn.example.com/d.pdf"],
  );
});

test("scanPdfUrlsFromHtml ignores non-pdf anchor hrefs", () => {
  const html = '<a href="https://cdn.example.com/page.html">x</a> <a href="/research/foo">y</a>';
  assert.deepEqual(scanPdfUrlsFromHtml(html, ["https://cdn.example.com/"]), []);
});

test("scanPdfUrlsFromHtml captures a query-string suffix", () => {
  const html = '<a href="https://cdn.example.com/r.pdf?dl=1">x</a>';
  assert.deepEqual(
    scanPdfUrlsFromHtml(html, ["https://cdn.example.com/"]),
    ["https://cdn.example.com/r.pdf?dl=1"],
  );
});

// ────────────────────────────────────────────────────────────────────
// slugForPdf

test("slugForPdf strips Webflow CDN hash prefix", () => {
  const slug = slugForPdf(
    "https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/69fe2a55b93bb0732b1fe33c_The-Founders-Playbook-05062026_v3%20(1).pdf",
  );
  assert.equal(slug, "the-founders-playbook-05062026-v3-1");
});

test("slugForPdf URL-decodes percent escapes", () => {
  const slug = slugForPdf("https://example.com/My%20Report%20Q4.pdf");
  assert.equal(slug, "my-report-q4");
});

test("slugForPdf lowercases and replaces non-alphanumerics with hyphens", () => {
  const slug = slugForPdf("https://example.com/CamelCase_With.Special!Chars.pdf");
  assert.equal(slug, "camelcase-with-special-chars");
});

test("slugForPdf trims leading/trailing hyphens", () => {
  const slug = slugForPdf("https://example.com/--leading-trailing--.pdf");
  assert.equal(slug, "leading-trailing");
});

test("slugForPdf caps length at 120 chars", () => {
  const long = "a".repeat(200);
  const slug = slugForPdf(`https://example.com/${long}.pdf`);
  assert.equal(slug.length, 120);
});

test("slugForPdf preserves hash prefix that is too short to be a content hash", () => {
  // Only ≥16-char hex prefixes are stripped (Webflow CDN convention);
  // short prefixes are kept verbatim.
  const slug = slugForPdf("https://example.com/abc_doc.pdf");
  assert.equal(slug, "abc-doc");
});

// ────────────────────────────────────────────────────────────────────
// mirrorPdfs — no-fetch branches (lane disabled / idempotency hit)

function makeTmpVendorRoot(): string {
  return mkdtempSync(resolve(tmpdir(), "pdf-mirror-test-"));
}

test("mirrorPdfs is a no-op when pdfAllowPrefixes is missing", async () => {
  const vendorRoot = makeTmpVendorRoot();
  try {
    const res = await mirrorPdfs({
      vendorRoot,
      vendor: "test-vendor",
      markdown: "[a](https://cdn.example.com/foo.pdf)",
      sourceUrl: "https://example.com/post-1",
    });
    assert.deepEqual(res, { fetched: [], skipped: [], failed: [] });
  } finally {
    rmSync(vendorRoot, { recursive: true, force: true });
  }
});

test("mirrorPdfs is a no-op when pdfAllowPrefixes is empty", async () => {
  const vendorRoot = makeTmpVendorRoot();
  try {
    const res = await mirrorPdfs({
      vendorRoot,
      vendor: "test-vendor",
      markdown: "[a](https://cdn.example.com/foo.pdf)",
      sourceUrl: "https://example.com/post-1",
      pdfAllowPrefixes: [],
    });
    assert.deepEqual(res, { fetched: [], skipped: [], failed: [] });
  } finally {
    rmSync(vendorRoot, { recursive: true, force: true });
  }
});

test("mirrorPdfs skips a URL whose mirror sidecar already exists with matching source_url", async () => {
  const vendorRoot = makeTmpVendorRoot();
  try {
    const url = "https://cdn.example.com/already-fetched.pdf";
    const slug = slugForPdf(url);
    const target = resolve(vendorRoot, "test-vendor", "_pdfs", `${slug}.md`);
    mkdirSync(resolve(vendorRoot, "test-vendor", "_pdfs"), { recursive: true });
    writeFileSync(
      target,
      `---\nsource_url: ${url}\nreferrer: https://example.com/old\npages: 5\nfetched_at: 2026-01-01T00:00:00Z\nkind: pdf-mirror\n---\n\nold body\n`,
    );
    const before = readFileSync(target, "utf8");

    const res = await mirrorPdfs({
      vendorRoot,
      vendor: "test-vendor",
      markdown: `[doc](${url})`,
      sourceUrl: "https://example.com/post-1",
      pdfAllowPrefixes: ["https://cdn.example.com/"],
    });

    assert.deepEqual(res.skipped, [url]);
    assert.deepEqual(res.fetched, []);
    assert.deepEqual(res.failed, []);
    // Idempotency: existing sidecar is untouched.
    assert.equal(readFileSync(target, "utf8"), before);
  } finally {
    rmSync(vendorRoot, { recursive: true, force: true });
  }
});

test("mirrorPdfs records HTTP failure without writing a sidecar", async () => {
  const vendorRoot = makeTmpVendorRoot();
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async () =>
    new Response("not found", { status: 404, statusText: "Not Found" })) as typeof fetch;
  try {
    const url = "https://cdn.example.com/missing.pdf";
    const res = await mirrorPdfs({
      vendorRoot,
      vendor: "test-vendor",
      markdown: `[doc](${url})`,
      sourceUrl: "https://example.com/post-1",
      pdfAllowPrefixes: ["https://cdn.example.com/"],
    });
    assert.deepEqual(res.fetched, []);
    assert.deepEqual(res.skipped, []);
    assert.equal(res.failed.length, 1);
    assert.equal(res.failed[0].url, url);
    assert.ok(res.failed[0].reason.includes("404"), `reason was: ${res.failed[0].reason}`);
    const slug = slugForPdf(url);
    assert.ok(!existsSync(resolve(vendorRoot, "test-vendor", "_pdfs", `${slug}.md`)));
  } finally {
    globalThis.fetch = originalFetch;
    rmSync(vendorRoot, { recursive: true, force: true });
  }
});

test("mirrorPdfs records pdf-parse failure without writing a sidecar", async () => {
  const vendorRoot = makeTmpVendorRoot();
  const originalFetch = globalThis.fetch;
  // Return 200 with bytes that aren't a valid PDF — PDFParse will throw.
  globalThis.fetch = (async () =>
    new Response("not a pdf", { status: 200 })) as typeof fetch;
  try {
    const url = "https://cdn.example.com/corrupt.pdf";
    const res = await mirrorPdfs({
      vendorRoot,
      vendor: "test-vendor",
      markdown: `[doc](${url})`,
      sourceUrl: "https://example.com/post-1",
      pdfAllowPrefixes: ["https://cdn.example.com/"],
    });
    assert.deepEqual(res.fetched, []);
    assert.equal(res.failed.length, 1);
    assert.equal(res.failed[0].url, url);
    const slug = slugForPdf(url);
    assert.ok(!existsSync(resolve(vendorRoot, "test-vendor", "_pdfs", `${slug}.md`)));
  } finally {
    globalThis.fetch = originalFetch;
    rmSync(vendorRoot, { recursive: true, force: true });
  }
});
