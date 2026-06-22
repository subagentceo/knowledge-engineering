/**
 * mail-worker/src/manifest.ts — pure data + helpers, no Worker runtime deps.
 *
 * @cite cowork/mcp/e2m-mcp/server.ts (envelope schema)
 */

export const MAILBOX_DIR = "cowork/data/mailbox";

export const ENVELOPE_TYPES = ["task", "ack", "result", "escalate", "notify", "summary", "operator"] as const;
export type EnvelopeType = typeof ENVELOPE_TYPES[number];

export const ACTIONS = ["list_emails", "get_thread", "draft_email", "send_email"] as const;

export const HSTS = "max-age=31536000; includeSubDomains";

export function secure(r: Response): Response {
  const out = new Response(r.body, r);
  out.headers.set("strict-transport-security", HSTS);
  out.headers.set("x-site", "mail.subagentknowledge.com");
  return out;
}

export function mailboxPath(agent: string): string {
  return `${MAILBOX_DIR}/${agent}.jsonl`;
}
