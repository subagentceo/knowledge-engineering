/**
 * agent-inbox.app.ts — MCP server surface for the e2m agent inbox.
 *
 * Follows the McpAgent-on-Workers pattern from cloudflare/mcp-server-cloudflare.
 * Uses the public SDK (agents/mcp + @modelcontextprotocol/sdk + zod),
 * NOT @repo/mcp-common (internal to the CF monorepo).
 *
 * Routes:
 *   POST /mcp  — streamable-HTTP MCP (stateless per request)
 *   GET  /sse  — SSE MCP (long-lived connection)
 *   *          — JSON status (existing behaviour from worker.ts)
 *
 * Email handler from worker.ts is re-exported here so a single
 * wrangler entry-point can serve both MCP and email.
 */
import { McpAgent } from "agents/mcp";
import { type EmailSendBinding } from "agents";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

// Re-export the email Durable Object and email handler from the original worker.
export { ManagerInbox } from "./worker";
import workerDefault from "./worker";

// ---------------------------------------------------------------------------
// Env — must include every binding this worker touches.
// ---------------------------------------------------------------------------
interface Env {
  /** KV namespace for the inbox queue (binding name INBOX). */
  INBOX: KVNamespace;
  /** Durable Object namespace for stateful per-role ManagerInbox agents. */
  ManagerInbox: DurableObjectNamespace;
  /** Durable Object namespace for the MCP agent (this class). */
  AgentInboxMcp: DurableObjectNamespace;
  /** Outbound email binding. */
  EMAIL: EmailSendBinding;
}

// ---------------------------------------------------------------------------
// McpAgent — the MCP server surface.
// ---------------------------------------------------------------------------
export class AgentInboxMcp extends McpAgent<Env> {
  server = new McpServer({ name: "agent-inbox", version: "0.1.0" });

  async init(): Promise<void> {
    // ------------------------------------------------------------------
    // list_inbox — list envelopes in KV under prefix mail:<role>:
    // ------------------------------------------------------------------
    this.server.tool(
      "list_inbox",
      "List e2m envelopes in the inbox KV, optionally filtered by role.",
      { role: z.string().optional() },
      async ({ role }) => {
        const prefix = role ? `mail:${role}:` : "mail:";
        const listed = await this.env.INBOX.list({ prefix });
        const keys = listed.keys.map((k) => k.name);
        return {
          content: [{ type: "text" as const, text: JSON.stringify({ keys }) }],
        };
      }
    );

    // ------------------------------------------------------------------
    // read_envelope — fetch one KV value by full key.
    // ------------------------------------------------------------------
    this.server.tool(
      "read_envelope",
      "Read a single e2m envelope from the inbox KV by its full key.",
      { key: z.string() },
      async ({ key }) => {
        const value = await this.env.INBOX.get(key);
        if (value === null) {
          return {
            content: [
              {
                type: "text" as const,
                text: JSON.stringify({ error: "not_found", key }),
              },
            ],
          };
        }
        return {
          content: [{ type: "text" as const, text: JSON.stringify({ key, value }) }],
        };
      }
    );

    // ------------------------------------------------------------------
    // send_envelope — validate an e2m envelope shape and KV-put it.
    // ------------------------------------------------------------------
    this.server.tool(
      "send_envelope",
      "Validate and store an e2m envelope in the inbox KV under mail:<to>:<id>.",
      { envelope: z.record(z.string(), z.unknown()) },
      async ({ envelope }) => {
        // Shape validation: must have _type, from, to, subject.
        const { _type, from, to, subject } = envelope as Record<string, unknown>;
        if (_type !== "envelope" || !from || !to || subject === undefined) {
          return {
            content: [
              {
                type: "text" as const,
                text: JSON.stringify({
                  error: "invalid_envelope",
                  required: ["_type:envelope", "from", "to", "subject"],
                }),
              },
            ],
          };
        }
        const id = (envelope.id as string | undefined) ?? crypto.randomUUID();
        const key = `mail:${String(to)}:${id}`;
        const body = JSON.stringify({ ...envelope, id });
        await this.env.INBOX.put(key, body);
        return {
          content: [{ type: "text" as const, text: JSON.stringify({ stored: true, key }) }],
        };
      }
    );
  }
}

// ---------------------------------------------------------------------------
// Default export — unified fetch handler.
// ---------------------------------------------------------------------------
export default {
  async fetch(req: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(req.url);

    // GET /inbox — read all envelopes from all coworker DO instances
    if (url.pathname === "/inbox") {
      const ROLES = ["product-management-coworker","project-management-coworker","design-coworker","engineering-coworker","data-coworker","sales-coworker","operations-coworker","finance-coworker","legal-coworker","marketing-coworker","agent-resources-coworker","human-resources-coworker"];
      const inboxes: Record<string, unknown[]> = {};
      for (const role of ROLES) {
        try {
          const id = env.ManagerInbox.idFromName(role);
          const stub = env.ManagerInbox.get(id);
          const resp = await stub.fetch(new Request("https://do-internal/state"));
          if (resp.ok) {
            const state = await resp.json() as { envelopes?: unknown[] };
            if (state.envelopes?.length) inboxes[role] = state.envelopes;
          }
        } catch { /* empty DO */ }
      }
      return Response.json({ inboxes, checked: ROLES.length, at: new Date().toISOString() });
    }

    // POST /send-internal — send coworker-to-coworker emails via ManagerInbox DO callable.
    // Uses @callable sendCoworkerEmail → this.sendEmail() SDK pattern (not new EmailMessage directly).
    // @cite https://developers.cloudflare.com/agents/communication-channels/email/
    if (url.pathname === "/send-internal" && req.method === "POST") {
      const SEND_DOMAIN = "subagentknowledge.com";
      const PAIRS = [
        {
          from: `product-management-coworker@${SEND_DOMAIN}`,
          to: `engineering-coworker@${SEND_DOMAIN}`,
          subject: "[e2m dogfood] Task: implement /inbox-status.json endpoint",
          text: `Hi engineering-coworker,\n\nLive coworker-to-coworker email via agent-inbox worker.\n\nTask: add GET /inbox-status.json returning KV envelope counts per role.\nPriority: 2 | ke_fit_score: 4\nThread: email-routing-research-preview-2026-06-22\n\n-- product-management-coworker@${SEND_DOMAIN}`,
        },
        {
          from: `project-management-coworker@${SEND_DOMAIN}`,
          to: `design-coworker@${SEND_DOMAIN}`,
          subject: "[e2m dogfood] Notify: email routing dogfood sprint kicked off",
          text: `Hi design-coworker,\n\nAll 12 coworker addresses confirmed routing to agent-inbox worker.\nThread: email-routing-research-preview-2026-06-22\n\n-- project-management-coworker@${SEND_DOMAIN}`,
        },
        {
          from: `data-coworker@${SEND_DOMAIN}`,
          to: `product-management-coworker@${SEND_DOMAIN}`,
          subject: "[e2m dogfood] Result: 185 envelopes validated, 0 violations",
          text: `Hi product-management-coworker,\n\n185 records scanned | 0 violations | all envelopes canonical.\nThread: email-routing-research-preview-2026-06-22\n\n-- data-coworker@${SEND_DOMAIN}`,
        },
      ];
      const results = [];
      for (const pair of PAIRS) {
        try {
          const senderRole = pair.from.split("@")[0] ?? pair.from;
          const id = env.ManagerInbox.idFromName(senderRole);
          const stub = env.ManagerInbox.get(id) as DurableObjectStub & {
            sendCoworkerEmail: (params: { to: string; from: string; subject: string; text: string }) => Promise<{ messageId: string }>;
          };
          const { messageId } = await stub.sendCoworkerEmail({
            to: pair.to, from: pair.from, subject: pair.subject, text: pair.text,
          });
          results.push({ from: pair.from, to: pair.to, status: "sent", messageId });
        } catch (err) {
          results.push({ from: pair.from, to: pair.to, status: "error", error: String(err) });
        }
      }
      return Response.json({ results, sent_at: new Date().toISOString() });
    }

    if (url.pathname === "/sse") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- SDK typing mismatch
      return (AgentInboxMcp.serveSSE("/sse") as any).fetch(req, env, ctx);
    }
    if (url.pathname === "/mcp") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (AgentInboxMcp.serve("/mcp") as any).fetch(req, env, ctx);
    }

    return workerDefault.fetch!(req);
  },

  async email(
    message: ForwardableEmailMessage,
    env: Env,
  ) {
    return workerDefault.email!(message, env);
  },
} satisfies ExportedHandler<Env>;
