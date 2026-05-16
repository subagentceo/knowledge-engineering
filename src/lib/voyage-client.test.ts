/**
 * Tests for src/lib/voyage-client.ts — minimal Voyage AI client used
 * by src/lib/turbopuffer-alloydb-bridge.ts.
 *
 * Outcome OPE3 per issue #175: Voyage chosen per Anthropic's public
 * recommendation. Test stubs globalThis.fetch — no network calls.
 *
 * @tdd red
 * @cite vendor/anthropics/platform.claude.com/docs/en/build-with-claude/embeddings.md
 * @cite vendor/turbopuffer/turbopuffer.com/docs/performance.md
 */
import { createVoyageClient } from "./voyage-client.js";

let passed = 0;
let failed = 0;
function check(name: string, fn: () => Promise<void> | void): Promise<void> {
  return Promise.resolve()
    .then(() => fn())
    .then(() => {
      passed++;
      console.log(`  ✓ ${name}`);
    })
    .catch((err) => {
      failed++;
      console.error(`  ✗ ${name}`);
      console.error(`    ${(err as Error).message}`);
    });
}

interface FetchInit {
  method?: string;
  headers?: Record<string, string>;
  body?: string;
}

function stubFetch(handler: (url: string, init: FetchInit) => Response) {
  const original = globalThis.fetch;
  globalThis.fetch = ((url: string, init: FetchInit) =>
    Promise.resolve(handler(url, init))) as unknown as typeof globalThis.fetch;
  return () => {
    globalThis.fetch = original;
  };
}

console.log("voyage-client:");

await check("default model is voyage-3.5-lite", () => {
  const client = createVoyageClient({ apiKey: "vk-test" });
  if (client.defaultModel !== "voyage-3.5-lite")
    throw new Error(`got ${client.defaultModel}`);
});

await check("embed posts to /v1/embeddings with Bearer auth header", async () => {
  let capturedUrl = "";
  let capturedAuth = "";
  let capturedBody: { input: string[]; model: string } | undefined;
  const restore = stubFetch((url, init) => {
    capturedUrl = url;
    capturedAuth = init.headers?.Authorization ?? "";
    capturedBody = JSON.parse(init.body ?? "{}");
    return new Response(
      JSON.stringify({
        data: [{ embedding: [0.1, 0.2, 0.3] }],
        model: "voyage-3.5-lite",
        usage: { total_tokens: 4 },
      }),
      { status: 200 },
    );
  });
  try {
    const client = createVoyageClient({ apiKey: "vk-test" });
    const result = await client.embed(["hello world"]);
    if (capturedUrl !== "https://api.voyageai.com/v1/embeddings")
      throw new Error(`bad url: ${capturedUrl}`);
    if (capturedAuth !== "Bearer vk-test")
      throw new Error(`bad auth: ${capturedAuth}`);
    if (capturedBody?.model !== "voyage-3.5-lite")
      throw new Error(`bad model: ${capturedBody?.model}`);
    if (capturedBody?.input?.[0] !== "hello world")
      throw new Error(`bad input`);
    if (result.embeddings.length !== 1) throw new Error("bad result shape");
    if (result.embeddings[0]!.length !== 3) throw new Error("bad dim");
  } finally {
    restore();
  }
});

await check("embed honors explicit model override", async () => {
  let capturedModel = "";
  const restore = stubFetch((_url, init) => {
    capturedModel = JSON.parse(init.body ?? "{}").model;
    return new Response(
      JSON.stringify({
        data: [{ embedding: [0] }],
        model: "voyage-code-3",
        usage: { total_tokens: 1 },
      }),
      { status: 200 },
    );
  });
  try {
    const client = createVoyageClient({ apiKey: "vk-test" });
    await client.embed(["snippet"], { model: "voyage-code-3" });
    if (capturedModel !== "voyage-code-3")
      throw new Error(`got ${capturedModel}`);
  } finally {
    restore();
  }
});

await check("embed throws on non-2xx response", async () => {
  const restore = stubFetch(
    () => new Response("rate limited", { status: 429 }),
  );
  try {
    const client = createVoyageClient({ apiKey: "vk-test" });
    let threw = false;
    try {
      await client.embed(["x"]);
    } catch {
      threw = true;
    }
    if (!threw) throw new Error("expected throw on 429");
  } finally {
    restore();
  }
});

await check("constructor rejects empty apiKey", () => {
  let threw = false;
  try {
    createVoyageClient({ apiKey: "" });
  } catch {
    threw = true;
  }
  if (!threw) throw new Error("expected throw on empty apiKey");
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
