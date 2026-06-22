/**
 * queue-draft — cowork/apps/mail action
 *
 * Validates a draft and appends it to queued_drafts.jsonl.
 * Does NOT send. Operator reviews at cowork/apps/mail/ and explicitly triggers send.
 *
 * Usage (CLI):
 *   npx tsx cowork/apps/mail/actions/queue-draft.ts \
 *     --to="customer@example.com" \
 *     --subject="..." \
 *     --body="..." \
 *     --requested-by="product-management-coworker"
 *
 * Also callable as e2m-mcp envelope: write envelope to sales queue with
 * subject starting "Draft outreach:" and sales-agent picks it up.
 *
 * @cite cowork/apps/mail/AGENTS.md         (never send without operator approval)
 * @cite cowork/mcp/e2m-mcp/server.ts       (mailbox_send type=outcome)
 * @cite https://www.agent-native.com/docs/template-mail#queued-draft-review
 */

import * as fs   from "node:fs";
import * as path from "node:path";
import { randomUUID } from "node:crypto";
import { z }     from "zod";

const DraftInput = z.object({
  to:           z.string().email(),
  cc:           z.array(z.string().email()).default([]),
  subject:      z.string().min(1).max(200),
  body_md:      z.string().min(1),
  requested_by: z.string().default("operator"),
  thread_id:    z.string().optional(),
});
type DraftInput = z.infer<typeof DraftInput>;

const Draft = DraftInput.extend({
  id:         z.string().uuid().default(() => randomUUID()),
  status:     z.literal("queued").default("queued"),
  queued_at:  z.string().default(() => new Date().toISOString()),
});
type Draft = z.infer<typeof Draft>;

const DRAFTS_FILE = path.join(process.cwd(), "cowork", "apps", "mail", "queued_drafts.jsonl");

function ensureDir(filePath: string): void {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

export function queueDraft(input: DraftInput): Draft {
  const draft = Draft.parse(input);
  ensureDir(DRAFTS_FILE);
  fs.appendFileSync(DRAFTS_FILE, JSON.stringify(draft) + "\n", "utf8");
  return draft;
}

export function listQueuedDrafts(): Draft[] {
  if (!fs.existsSync(DRAFTS_FILE)) return [];
  return fs.readFileSync(DRAFTS_FILE, "utf8")
    .split("\n").filter(Boolean)
    .map(l => JSON.parse(l) as Draft)
    .filter(d => d.status === "queued");
}

// ── CLI ───────────────────────────────────────────────────────────────────────

if (import.meta.url === `file://${process.argv[1]}`) {
  const args = Object.fromEntries(
    process.argv.slice(2)
      .filter(a => a.startsWith("--"))
      .map(a => {
        const [k, ...v] = a.slice(2).split("=");
        return [k, v.join("=")];
      })
  );

  if (args.list) {
    const drafts = listQueuedDrafts();
    console.log(JSON.stringify({ queued: drafts.length, drafts }, null, 2));
  } else {
    const draft = queueDraft({
      to:           args.to ?? "",
      subject:      args.subject ?? "",
      body_md:      args.body ?? "",
      requested_by: args["requested-by"] ?? "operator",
      thread_id:    args["thread-id"],
    });
    console.log(JSON.stringify({ ok: true, draft_id: draft.id, status: draft.status }));
  }
}
