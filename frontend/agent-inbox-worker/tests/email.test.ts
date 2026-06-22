/**
 * @cite https://developers.cloudflare.com/agents/communication-channels/email/
 * @cite https://developers.cloudflare.com/email-service/configuration/domains/
 */
import * as fs from "node:fs";
import { strict as assert } from "node:assert";
import { describe, test } from "vitest";

describe("send_email binding shape", () => {
  test("wrangler.jsonc send_email binding has remote: true", () => {
    // Strip single-line // comments before parsing (JSONC).
    const raw = fs.readFileSync(
      new URL("../wrangler.jsonc", import.meta.url),
      "utf8"
    ).replace(/\/\/[^\n]*/g, "");
    const config = JSON.parse(raw);
    const binding = config.send_email?.[0];
    assert.ok(binding, "send_email binding must exist");
    assert.strictEqual(
      binding.remote,
      true,
      "send_email binding must have remote: true — see https://developers.cloudflare.com/agents/communication-channels/email/"
    );
  });
});

describe("ManagerInbox @callable sendCoworkerEmail", () => {
  test("src/worker.ts imports callable from agents", () => {
    const src = fs.readFileSync(
      new URL("../src/worker.ts", import.meta.url),
      "utf8"
    );
    assert.ok(
      src.includes("callable"),
      "ManagerInbox must import callable from agents for proactive outbound"
    );
  });

  test("src/worker.ts uses this.sendEmail() not new EmailMessage directly", () => {
    const src = fs.readFileSync(
      new URL("../src/worker.ts", import.meta.url),
      "utf8"
    );
    assert.ok(
      src.includes("this.sendEmail("),
      "ManagerInbox must call this.sendEmail() (SDK pattern) not new EmailMessage()"
    );
    assert.ok(
      !src.includes("new EmailMessage("),
      "ManagerInbox must NOT use new EmailMessage() directly — use this.sendEmail()"
    );
  });

  test("src/agent-inbox.app.ts does not use new EmailMessage() directly", () => {
    const src = fs.readFileSync(
      new URL("../src/agent-inbox.app.ts", import.meta.url),
      "utf8"
    );
    assert.ok(
      !src.includes("new EmailMessage("),
      "/send-internal must route through DO callable, not new EmailMessage() directly"
    );
  });
});

describe("POST /send-internal integration", () => {
  test(
    "all pairs return status:sent (requires Email Service enabled for subagentknowledge.com)",
    async () => {
      const res = await fetch(
        "https://agent-inbox.alex-e62.workers.dev/send-internal",
        { method: "POST" }
      );
      assert.strictEqual(res.status, 200);
      const body = (await res.json()) as {
        results: Array<{ from: string; to: string; status: string; error?: string }>;
      };
      for (const r of body.results) {
        assert.strictEqual(
          r.status,
          "sent",
          `${r.from} -> ${r.to}: ${r.error ?? "unknown error"}`
        );
      }
    }
  );
});
