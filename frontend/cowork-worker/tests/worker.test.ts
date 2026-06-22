/**
 * @cite frontend/cowork-worker/src/manifest.ts
 * @cite frontend/cowork-worker/src/worker.ts
 */
import { strict as assert } from "node:assert";
import { describe, test } from "vitest";
import {
  COWORKERS,
  DOMAINS,
  HSTS,
  KNOWN_PROTOCOLS,
  findCoworker,
  secure,
  type CoworkerEntry,
} from "../src/manifest.js";

describe("COWORKERS manifest", () => {
  test("has exactly 7 coworkers", () => {
    assert.equal(COWORKERS.length, 7);
  });

  test("every coworker has required fields", () => {
    for (const cw of COWORKERS) {
      assert.ok(cw.id, `missing id`);
      assert.ok(cw.domain, `missing domain for ${cw.id}`);
      assert.ok(cw.model, `missing model for ${cw.id}`);
      assert.ok(Array.isArray(cw.protocols), `protocols must be array for ${cw.id}`);
      assert.ok(cw.protocols.length > 0, `protocols empty for ${cw.id}`);
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

  test("ids follow kebab-case-coworker pattern", () => {
    for (const cw of COWORKERS) {
      assert.ok(cw.id.endsWith("-coworker"), `${cw.id} should end with -coworker`);
      assert.ok(/^[a-z-]+$/.test(cw.id), `${cw.id} should be lowercase kebab-case`);
    }
  });

  test("models are valid Claude model IDs", () => {
    const valid = new Set([
      "claude-sonnet-4-6",
      "claude-haiku-4-5-20251001",
      "claude-opus-4-8",
      "claude-opus-4-7",
    ]);
    for (const cw of COWORKERS) {
      assert.ok(valid.has(cw.model), `${cw.id} has unknown model: ${cw.model}`);
    }
  });

  test("protocols are from known set", () => {
    const known = new Set(KNOWN_PROTOCOLS);
    for (const cw of COWORKERS) {
      for (const p of cw.protocols as string[]) {
        assert.ok(known.has(p as typeof KNOWN_PROTOCOLS[number]), `${cw.id} has unknown protocol: ${p}`);
      }
    }
  });
});

describe("DOMAINS", () => {
  test("derived from COWORKERS", () => {
    assert.deepEqual(DOMAINS, COWORKERS.map(c => c.domain));
  });

  test("no ANTHROPIC_API_KEY in any field", () => {
    const json = JSON.stringify(COWORKERS);
    assert.ok(!json.includes("ANTHROPIC_API_KEY"), "OAuth-only invariant violation");
  });
});

describe("findCoworker", () => {
  test("finds by exact id", () => {
    const cw = findCoworker("engineering-coworker");
    assert.ok(cw !== undefined);
    assert.equal(cw?.domain, "engineering");
  });

  test("returns undefined for unknown id", () => {
    assert.equal(findCoworker("nope"), undefined);
  });
});

describe("secure()", () => {
  test("adds HSTS header", () => {
    const r = secure(new Response("ok"));
    assert.equal(r.headers.get("strict-transport-security"), HSTS);
  });

  test("adds x-site header", () => {
    const r = secure(new Response("ok"));
    assert.equal(r.headers.get("x-site"), "cowork.subagentknowledge.com");
  });

  test("preserves body", async () => {
    const r = secure(new Response("hello"));
    assert.equal(await r.text(), "hello");
  });

  test("preserves status code", () => {
    const r = secure(new Response("not found", { status: 404 }));
    assert.equal(r.status, 404);
  });
});
