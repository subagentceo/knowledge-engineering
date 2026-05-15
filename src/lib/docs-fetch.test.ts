/**
 * Tests for src/lib/docs-fetch.ts — host-allowlist + URL normalization
 * for Anthropic docs surfaces.
 *
 * Covers the pure logic (toMarkdownUrl + DocsFetchError + FetchedDoc
 * schema). fetchDoc itself hits the network and is exercised only via
 * an injected mock — kept narrow so the test stays hermetic.
 *
 * Phase G item O-G8: coverage backfill. This file's sibling source
 * sat on the pre-existing-baseline exemption list (4 files at 0% under
 * the 70% gate). This test moves it off.
 *
 * @tdd green
 * @cite vendor/anthropics/code.claude.com/docs/en/agent-sdk/typescript.md
 * @cite vendor/anthropics/platform.claude.com/docs/en/build-with-claude/prompt-caching.md
 * @cite rubrics/phase-13.md
 */
import { DocsFetchError, FetchedDoc, fetchDoc, toMarkdownUrl } from "./docs-fetch.js";

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

console.log("docs-fetch:");

check("toMarkdownUrl: code.claude.com path gets .md appended", () => {
  const u = toMarkdownUrl("https://code.claude.com/docs/en/commands");
  if (!u.endsWith("/commands.md")) throw new Error(`url=${u}`);
});

check("toMarkdownUrl: platform.claude.com path gets .md appended", () => {
  const u = toMarkdownUrl("https://platform.claude.com/docs/en/managed-agents/define-outcomes");
  if (!u.endsWith("/define-outcomes.md")) throw new Error(`url=${u}`);
});

check("toMarkdownUrl: claude.com path gets .md appended", () => {
  const u = toMarkdownUrl("https://claude.com/docs/connectors/building");
  if (!u.endsWith("/building.md")) throw new Error(`url=${u}`);
});

check("toMarkdownUrl: trailing slash is stripped before .md is appended", () => {
  const u = toMarkdownUrl("https://claude.com/docs/connectors/");
  if (!u.endsWith("/connectors.md")) throw new Error(`url=${u}`);
});

check("toMarkdownUrl: hash fragment is stripped", () => {
  const u = toMarkdownUrl("https://platform.claude.com/docs/en/x#section");
  if (u.includes("#")) throw new Error(`hash leaked: ${u}`);
});

check("toMarkdownUrl: already-.md URL passes through unchanged", () => {
  const u = toMarkdownUrl("https://platform.claude.com/docs/en/x.md");
  if (u !== "https://platform.claude.com/docs/en/x.md") throw new Error(`url=${u}`);
});

check("toMarkdownUrl: /llms.txt suffix passes through unchanged", () => {
  const u = toMarkdownUrl("https://platform.claude.com/llms.txt");
  if (u !== "https://platform.claude.com/llms.txt") throw new Error(`url=${u}`);
});

check("toMarkdownUrl: untrusted host throws DocsFetchError", () => {
  try {
    toMarkdownUrl("https://evil.example.com/docs/anything");
  } catch (err) {
    if (!(err instanceof DocsFetchError)) throw new Error(`wrong error type: ${(err as Error).name}`);
    return;
  }
  throw new Error("untrusted host was accepted");
});

check("DocsFetchError is an Error subclass and carries the message", () => {
  const e = new DocsFetchError("boom");
  if (!(e instanceof Error)) throw new Error("not an Error");
  if (e.message !== "boom") throw new Error(`message=${e.message}`);
});

check("FetchedDoc schema accepts a well-formed object", () => {
  const ok = FetchedDoc.safeParse({
    url: "https://platform.claude.com/docs/en/x.md",
    source_url: "https://platform.claude.com/docs/en/x",
    body: "# Title\nhello",
    last_fetched: new Date().toISOString(),
    etag: "W/\"deadbeef\"",
  });
  if (!ok.success) throw new Error(`parse fail: ${ok.error.message}`);
});

check("FetchedDoc schema rejects an empty body", () => {
  const r = FetchedDoc.safeParse({
    url: "https://platform.claude.com/docs/en/x.md",
    source_url: "https://platform.claude.com/docs/en/x",
    body: "",
    last_fetched: new Date().toISOString(),
  });
  if (r.success) throw new Error("empty body was accepted");
});

check("FetchedDoc schema rejects a non-URL string in url field", () => {
  const r = FetchedDoc.safeParse({
    url: "not-a-url",
    source_url: "https://platform.claude.com/docs/en/x",
    body: "hi",
    last_fetched: new Date().toISOString(),
  });
  if (r.success) throw new Error("non-URL was accepted");
});

// fetchDoc tests with mocked global fetch. The aim is coverage of the
// HTTP path, not integration — each mock is shaped to drive one branch.

type FetchInput = Parameters<typeof globalThis.fetch>;
type FetchResp = { ok: boolean; status: number; headers: Headers; text(): Promise<string> };

function installFetchMock(resp: FetchResp, capture?: (args: FetchInput) => void): () => void {
  const original = globalThis.fetch;
  globalThis.fetch = (async (...args: FetchInput) => {
    capture?.(args);
    return resp as unknown as Response;
  }) as typeof globalThis.fetch;
  return () => {
    globalThis.fetch = original;
  };
}

async function asyncCheck(name: string, fn: () => Promise<void>): Promise<void> {
  try {
    await fn();
    passed += 1;
    console.log(`  ✓ ${name}`);
  } catch (err) {
    failed += 1;
    console.error(`  ✗ ${name}`);
    console.error(`    ${(err as Error).message}`);
  }
}

await asyncCheck("fetchDoc: happy path returns parsed FetchedDoc", async () => {
  let capturedHeaders: Record<string, string> | undefined;
  const restore = installFetchMock(
    {
      ok: true,
      status: 200,
      headers: new Headers({ "content-type": "text/markdown", etag: 'W/"abc"' }),
      text: async () => "# hello",
    },
    ([_url, init]) => {
      capturedHeaders = (init as { headers: Record<string, string> })?.headers;
    }
  );
  try {
    const doc = await fetchDoc("https://platform.claude.com/docs/en/x");
    if (!doc.url.endsWith("/x.md")) throw new Error(`url=${doc.url}`);
    if (doc.body !== "# hello") throw new Error(`body=${doc.body}`);
    if (doc.etag !== 'W/"abc"') throw new Error(`etag=${doc.etag}`);
    if (capturedHeaders?.Accept !== "text/markdown, text/plain") {
      throw new Error(`accept=${capturedHeaders?.Accept}`);
    }
  } finally {
    restore();
  }
});

await asyncCheck("fetchDoc: text/html response is rejected", async () => {
  const restore = installFetchMock({
    ok: true,
    status: 200,
    headers: new Headers({ "content-type": "text/html" }),
    text: async () => "<html>",
  });
  try {
    await fetchDoc("https://claude.com/docs/foo");
    throw new Error("html was accepted");
  } catch (err) {
    if (!(err instanceof DocsFetchError)) throw new Error(`wrong error: ${(err as Error).message}`);
  } finally {
    restore();
  }
});

await asyncCheck("fetchDoc: non-ok response throws DocsFetchError", async () => {
  const restore = installFetchMock({
    ok: false,
    status: 500,
    headers: new Headers(),
    text: async () => "",
  });
  try {
    await fetchDoc("https://claude.com/docs/foo");
    throw new Error("500 was accepted");
  } catch (err) {
    if (!(err instanceof DocsFetchError)) throw new Error(`wrong error: ${(err as Error).message}`);
    if (!/500/.test((err as Error).message)) throw new Error(`error msg=${(err as Error).message}`);
  } finally {
    restore();
  }
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
