/**
 * @cite frontend/coworkers-worker/src/manifest.ts
 * @cite frontend/coworkers-worker/src/worker.ts
 * @cite frontend/coworkers-worker/src/coworkers.app.ts
 * @cite frontend/coworkers-worker/wrangler.jsonc
 */
import { strict as assert } from "node:assert";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, test } from "vitest";
import {
  COWORKERS,
  PROTOCOLS,
  findCoworker,
  protocolMatrix,
  secure,
  HSTS,
  type Coworker,
} from "../src/manifest.js";

const workerSrc = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "../src/worker.ts"), "utf8");

describe("COWORKERS directory", () => {
  test("has exactly 12 coworkers", () => {
    assert.equal(COWORKERS.length, 12);
  });

  test("every coworker has all required fields", () => {
    for (const cw of COWORKERS) {
      assert.ok(cw.id, `missing id`);
      assert.ok(cw.display_name, `missing display_name for ${cw.id}`);
      assert.ok(cw.domain, `missing domain for ${cw.id}`);
      assert.ok(cw.trigger_phrase, `missing trigger_phrase for ${cw.id}`);
      assert.ok(Array.isArray(cw.protocols) && cw.protocols.length > 0, `protocols empty for ${cw.id}`);
      assert.ok(Array.isArray(cw.peers), `peers must be array for ${cw.id}`);
      assert.ok(cw.description, `missing description for ${cw.id}`);
      assert.ok(cw.model, `missing model for ${cw.id}`);
    }
  });

  test("ids are unique", () => {
    const ids = COWORKERS.map(c => c.id);
    assert.equal(new Set(ids).size, ids.length);
  });

  test("domains are unique", () => {
    const domains = COWORKERS.map(c => c.domain);
    assert.equal(new Set(domains).size, domains.length);
  });

  test("trigger phrases follow /<id> pattern", () => {
    for (const cw of COWORKERS) {
      assert.equal(cw.trigger_phrase, `/${cw.id}`, `trigger_phrase mismatch for ${cw.id}`);
    }
  });

  test("all peer references are valid coworker ids", () => {
    const validIds = new Set(COWORKERS.map(c => c.id));
    for (const cw of COWORKERS) {
      for (const peer of cw.peers) {
        assert.ok(validIds.has(peer), `${cw.id} references unknown peer: ${peer}`);
      }
    }
  });

  test("no coworker lists itself as a peer", () => {
    for (const cw of COWORKERS) {
      assert.ok(!cw.peers.includes(cw.id), `${cw.id} lists itself as a peer`);
    }
  });

  test("no ANTHROPIC_API_KEY in any field", () => {
    const json = JSON.stringify(COWORKERS);
    assert.ok(!json.includes("ANTHROPIC_API_KEY"), "OAuth-only invariant violation");
  });
});

describe("findCoworker", () => {
  test("finds by id", () => {
    const cw = findCoworker("engineering-coworker");
    assert.ok(cw !== undefined);
    assert.equal(cw?.domain, "engineering");
  });

  test("finds by trigger phrase", () => {
    const cw = findCoworker("/finance-coworker");
    assert.ok(cw !== undefined);
    assert.equal(cw?.domain, "finance");
  });

  test("returns undefined for unknown", () => {
    assert.equal(findCoworker("nope"), undefined);
  });
});

describe("protocolMatrix", () => {
  test("returns one row per coworker", () => {
    const matrix = protocolMatrix();
    assert.equal(matrix.length, COWORKERS.length);
  });

  test("operations-coworker has acp=true", () => {
    const matrix = protocolMatrix();
    const ops = matrix.find(r => r.id === "operations-coworker");
    assert.ok(ops !== undefined);
    assert.equal(ops?.acp, true);
  });

  test("data-coworker has mcp=false", () => {
    const matrix = protocolMatrix();
    const data = matrix.find(r => r.id === "data-coworker");
    assert.ok(data !== undefined);
    assert.equal(data?.mcp, false);
  });
});

describe("/mcp and /sse routing (McpAgent binding)", () => {
  // McpAgent.serve()/.serveSSE() default `binding` to "MCP_OBJECT" regardless
  // of which class they're called on — the returned fetch closure reads
  // env[binding], not `this`. wrangler.jsonc binds MCP_OBJECT to CoworkersMcp,
  // not CoworkersMcpApp, so calling CoworkersMcpApp.serve(path) without an
  // explicit binding silently serves the wrong DO (CoworkersMcp's directory
  // tools instead of CoworkersMcpApp's e2m mailbox tools).
  test("/mcp route passes the COWORKERS_MCP_APP binding explicitly", () => {
    const mcpCall = workerSrc.match(/CoworkersMcpApp\.serve\(\s*"\/mcp"\s*,\s*\{[^}]*\}\s*\)/);
    assert.ok(mcpCall, "CoworkersMcpApp.serve(\"/mcp\", ...) call not found in worker.ts");
    assert.match(mcpCall![0], /binding:\s*["']COWORKERS_MCP_APP["']/);
  });

  test("/sse route passes the COWORKERS_MCP_APP binding explicitly", () => {
    const sseCall = workerSrc.match(/CoworkersMcpApp\.serveSSE\(\s*"\/sse"\s*,\s*\{[^}]*\}\s*\)/);
    assert.ok(sseCall, "CoworkersMcpApp.serveSSE(\"/sse\", ...) call not found in worker.ts");
    assert.match(sseCall![0], /binding:\s*["']COWORKERS_MCP_APP["']/);
  });

  test("worker.ts never calls .serve()/.serveSSE() without an explicit binding", () => {
    const bareCalls = workerSrc.match(/\.serve(?:SSE)?\(\s*"\/(?:mcp|sse)"\s*\)/g);
    assert.equal(bareCalls, null, `found .serve()/.serveSSE() call(s) missing explicit binding: ${bareCalls}`);
  });
});

describe("secure()", () => {
  test("adds HSTS header", () => {
    const r = secure(new Response("ok"));
    assert.equal(r.headers.get("strict-transport-security"), HSTS);
  });

  test("adds x-site header for coworkers domain", () => {
    const r = secure(new Response("ok"));
    assert.equal(r.headers.get("x-site"), "coworkers.subagentknowledge.com");
  });

  test("preserves status and body", async () => {
    const r = secure(new Response("test", { status: 201 }));
    assert.equal(r.status, 201);
    assert.equal(await r.text(), "test");
  });
});
