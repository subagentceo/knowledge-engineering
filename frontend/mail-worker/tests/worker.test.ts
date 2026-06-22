/**
 * @cite frontend/mail-worker/src/manifest.ts
 * @cite frontend/mail-worker/src/worker.ts
 */
import { strict as assert } from "node:assert";
import { describe, test } from "vitest";
import {
  MAILBOX_DIR,
  ENVELOPE_TYPES,
  ACTIONS,
  HSTS,
  secure,
  mailboxPath,
} from "../src/manifest.js";

describe("constants", () => {
  test("MAILBOX_DIR points to cowork/data/mailbox", () => {
    assert.equal(MAILBOX_DIR, "cowork/data/mailbox");
  });

  test("ENVELOPE_TYPES has 7 types", () => {
    assert.equal(ENVELOPE_TYPES.length, 7);
    assert.ok(ENVELOPE_TYPES.includes("task"));
    assert.ok(ENVELOPE_TYPES.includes("escalate"));
    assert.ok(ENVELOPE_TYPES.includes("operator"));
  });

  test("ACTIONS has 4 mail actions", () => {
    assert.equal(ACTIONS.length, 4);
    assert.deepEqual([...ACTIONS], ["list_emails", "get_thread", "draft_email", "send_email"]);
  });
});

describe("mailboxPath", () => {
  test("builds path from agent id", () => {
    assert.equal(mailboxPath("product-manager"), "cowork/data/mailbox/product-manager.jsonl");
  });

  test("handles hyphenated names", () => {
    assert.equal(mailboxPath("finance-coworker"), "cowork/data/mailbox/finance-coworker.jsonl");
  });
});

describe("secure()", () => {
  test("adds HSTS header", () => {
    const r = secure(new Response("ok"));
    assert.equal(r.headers.get("strict-transport-security"), HSTS);
  });

  test("adds x-site for mail domain", () => {
    const r = secure(new Response("ok"));
    assert.equal(r.headers.get("x-site"), "mail.subagentknowledge.com");
  });

  test("preserves body and status", async () => {
    const r = secure(new Response("body", { status: 200 }));
    assert.equal(r.status, 200);
    assert.equal(await r.text(), "body");
  });
});
