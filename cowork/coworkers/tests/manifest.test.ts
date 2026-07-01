/**
 * @cite cowork/coworkers/manifest.json
 * @cite cowork/schemas/envelope.ts
 */
import { strict as assert } from "node:assert";
import { describe, test } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(import.meta.dirname ?? __dirname, "..", "..");
const manifest = JSON.parse(
  readFileSync(join(ROOT, "coworkers", "manifest.json"), "utf8"),
);
const coworkers: Array<Record<string, unknown>> = manifest.coworkers;

const VALID_PROTOCOLS = new Set(["a2a", "e2m-mcp", "mcp", "acp"]);
const VALID_MODELS = new Set([
  "claude-sonnet-5",
  "claude-haiku-4-5-20251001",
  "claude-opus-4-6",
  "claude-opus-4-7",
  "claude-opus-4-8",
]);

describe("manifest.json structure", () => {
  test("has version", () => {
    assert.ok(manifest.version);
  });

  test("has protocols section", () => {
    assert.ok(manifest.protocols);
    assert.ok(manifest.protocols.a2a);
    assert.ok(manifest.protocols["e2m-mcp"]);
    assert.ok(manifest.protocols.mcp);
    assert.ok(manifest.protocols.acp);
  });

  test("has continuity section", () => {
    assert.ok(manifest.continuity);
    assert.ok(manifest.continuity.queue_dir);
    assert.ok(manifest.continuity.mailbox_dir);
  });
});

describe("coworkers", () => {
  test("has at least 7 coworkers", () => {
    assert.ok(coworkers.length >= 7, `expected >= 7, got ${coworkers.length}`);
  });

  test("ids are unique", () => {
    const ids = coworkers.map(c => c.id as string);
    assert.equal(new Set(ids).size, ids.length, "duplicate ids found");
  });

  test("domains are unique", () => {
    const domains = coworkers.map(c => c.domain as string);
    assert.equal(new Set(domains).size, domains.length, "duplicate domains");
  });

  test("every coworker has required fields", () => {
    const required = ["id", "display_name", "domain", "queue", "mailbox", "skill", "model", "trigger_phrase", "protocols", "description"];
    for (const cw of coworkers) {
      for (const field of required) {
        assert.ok(cw[field] !== undefined, `${cw.id} missing ${field}`);
      }
    }
  });

  test("ids follow kebab-case-coworker pattern", () => {
    for (const cw of coworkers) {
      const id = cw.id as string;
      assert.ok(id.endsWith("-coworker"), `${id} should end with -coworker`);
      assert.ok(/^[a-z-]+$/.test(id), `${id} should be lowercase kebab-case`);
    }
  });

  test("trigger phrases match /id pattern", () => {
    for (const cw of coworkers) {
      assert.equal(cw.trigger_phrase, `/${cw.id}`, `${cw.id} trigger mismatch`);
    }
  });

  test("models are valid Claude model IDs", () => {
    for (const cw of coworkers) {
      assert.ok(VALID_MODELS.has(cw.model as string), `${cw.id} has unknown model: ${cw.model}`);
    }
  });

  test("protocols are from known set", () => {
    for (const cw of coworkers) {
      for (const p of cw.protocols as string[]) {
        assert.ok(VALID_PROTOCOLS.has(p), `${cw.id} has unknown protocol: ${p}`);
      }
    }
  });

  test("peer references are valid coworker ids", () => {
    const validIds = new Set(coworkers.map(c => c.id as string));
    for (const cw of coworkers) {
      if (!cw.peers) continue;
      for (const peer of cw.peers as string[]) {
        assert.ok(validIds.has(peer), `${cw.id} references unknown peer: ${peer}`);
      }
    }
  });

  test("no coworker lists itself as a peer", () => {
    for (const cw of coworkers) {
      if (!cw.peers) continue;
      assert.ok(
        !(cw.peers as string[]).includes(cw.id as string),
        `${cw.id} lists itself as peer`,
      );
    }
  });

  test("queue paths follow convention", () => {
    for (const cw of coworkers) {
      const queue = cw.queue as string;
      if (queue.includes("/")) {
        assert.ok(queue.startsWith("cowork/data/queues/"), `${cw.id} queue path: ${queue}`);
        assert.ok(queue.endsWith(".jsonl"), `${cw.id} queue should be .jsonl: ${queue}`);
      }
    }
  });

  test("mailbox paths follow convention", () => {
    for (const cw of coworkers) {
      const mb = cw.mailbox as string;
      assert.ok(mb.startsWith("cowork/data/mailbox/"), `${cw.id} mailbox path: ${mb}`);
      assert.ok(mb.endsWith(".jsonl"), `${cw.id} mailbox should be .jsonl: ${mb}`);
    }
  });

  test("no ANTHROPIC_API_KEY anywhere", () => {
    const json = JSON.stringify(manifest);
    assert.ok(!json.includes("ANTHROPIC_API_KEY"), "OAuth-only invariant violation");
  });
});
