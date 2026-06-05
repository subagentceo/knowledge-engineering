/**
 * Tests for src/mcp-hono/server.ts — Hono HTTP transport wrapper for MCP.
 *
 * @cite vendor/modelcontextprotocol/modelcontextprotocol.io/docs/develop/build-server.md
 * @cite vendor/cloudflare/developers.cloudflare.com/flagship/index.md
 */
import assert from "node:assert/strict";
import { createMcpHonoApp, McpHonoServer } from "./server.js";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";

let passed = 0;
let failed = 0;

function check(name: string, fn: () => void | Promise<void>): void {
  const result = (() => {
    try {
      const r = fn();
      if (r instanceof Promise) {
        r.then(() => {
          passed += 1;
          console.log(`  ✓ ${name}`);
        }).catch((err) => {
          failed += 1;
          console.error(`  ✗ ${name}`);
          console.error(`    ${(err as Error).message}`);
        });
        return;
      }
      passed += 1;
      console.log(`  ✓ ${name}`);
    } catch (err) {
      failed += 1;
      console.error(`  ✗ ${name}`);
      console.error(`    ${(err as Error).message}`);
    }
  })();
  void result;
}

async function checkAsync(name: string, fn: () => Promise<void>): Promise<void> {
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

console.log("mcp-hono:");

check("createMcpHonoApp returns a Hono instance with fetch method", () => {
  const app = createMcpHonoApp();
  assert.ok(app, "app is defined");
  assert.equal(typeof app.fetch, "function", "app.fetch is a function");
});

await checkAsync("GET /health returns ok:true and version 0.5.0", async () => {
  const app = createMcpHonoApp();
  const req = new Request("http://localhost/health");
  const res = await app.fetch(req);
  assert.equal(res.status, 200);
  const body = (await res.json()) as { ok: boolean; version: string };
  assert.equal(body.ok, true);
  assert.equal(body.version, "0.5.0");
});

await checkAsync("POST /message without server returns 500 with JSON-RPC error", async () => {
  const app = createMcpHonoApp();
  const req = new Request("http://localhost/message", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", method: "tools/list", id: 1 }),
  });
  const res = await app.fetch(req);
  assert.equal(res.status, 500);
  const body = (await res.json()) as { error?: { message: string } };
  assert.ok(body.error, "error field present");
});

check("McpHonoServer constructor accepts an MCP Server instance", () => {
  const server = new Server({ name: "test-server", version: "0.1.0" });
  const honoServer = new McpHonoServer(server);
  assert.ok(honoServer, "McpHonoServer constructed");
  const app = honoServer.app();
  assert.equal(typeof app.fetch, "function", "app() returns a Hono instance");
});

await checkAsync("McpHonoServer GET /health returns ok:true", async () => {
  const server = new Server({ name: "test-server", version: "0.1.0" });
  const honoServer = new McpHonoServer(server);
  const app = honoServer.app();
  const req = new Request("http://localhost/health");
  const res = await app.fetch(req);
  assert.equal(res.status, 200);
  const body = (await res.json()) as { ok: boolean; version: string };
  assert.equal(body.ok, true);
  assert.equal(body.version, "0.5.0");
});

if (failed > 0) {
  console.error(`\nmcp-hono: ${failed} failed, ${passed} passed`);
  process.exit(1);
}
console.log(`\nmcp-hono: ${passed} passed`);
