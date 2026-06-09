/**
 * @tdd green
 * @cite vendor/cloudflare/developers.cloudflare.com/email-service/llms.txt
 * @cite seeds/citations/define-outcomes.md
 */

import assert from "node:assert/strict";
import { mkdtempSync, existsSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { sendMail, receiveMail, readThread } from "../mcp/repo-mail.js";

const root = mkdtempSync(join(tmpdir(), "repo-mail-"));

// send → file lands in recipient inbox with delivered status
const m1 = sendMail(root, {
  from: "heartbeat-tick",
  to: "pr-healer",
  subject: "B4 unblocked",
  body: "full-corpus warehouse merged; pick up B6.",
  thread_id: "batch-b6",
});
assert.equal(m1.status, "delivered");
assert.ok(existsSync(join(root, "mail", "pr-healer", "inbox", `${m1.id}.json`)));

// broadcast mail
const b1 = sendMail(root, {
  from: "heartbeat-tick",
  to: "broadcast",
  subject: "queue updated",
  body: "see seeds/memory/heartbeat/batch-2026-06-09-citation-service.md",
});

// receive: own + broadcast, ordered; own mail moves inbox → read
const got = receiveMail(root, "pr-healer");
assert.deepEqual(got.map((m) => m.id).sort(), [m1.id, b1.id].sort());
assert.ok(!existsSync(join(root, "mail", "pr-healer", "inbox", `${m1.id}.json`)));
assert.ok(existsSync(join(root, "mail", "pr-healer", "read", `${m1.id}.json`)));
// broadcast never moves — every agent must see it
assert.ok(existsSync(join(root, "mail", "broadcast", "inbox", `${b1.id}.json`)));

// second receive: inbox empty, broadcast still visible
const again = receiveMail(root, "pr-healer");
assert.deepEqual(again.map((m) => m.id), [b1.id]);

// reply threads across inbox + read
sendMail(root, {
  from: "pr-healer",
  to: "heartbeat-tick",
  subject: "re: B4 unblocked",
  body: "ack — starting B6.",
  thread_id: "batch-b6",
  reply_to: m1.id,
});
const thread = readThread(root, "pr-healer", "batch-b6");
assert.deepEqual(thread.map((m) => m.subject), ["B4 unblocked"]);
const senderThread = readThread(root, "heartbeat-tick", "batch-b6");
assert.equal(senderThread[0]?.reply_to, m1.id);

// validation fails closed: empty subject never lands on disk
assert.throws(() => sendMail(root, { from: "a", to: "b", subject: "", body: "x" }));
assert.ok(!existsSync(join(root, "mail", "b")));

rmSync(root, { recursive: true, force: true });
console.log("repo-mail.test.ts OK");
