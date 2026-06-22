/**
 * mail-worker/src/mail.app.ts
 *
 * McpAgent surface for mail.subagentknowledge.com.
 * e2m protocol: email=Envelope, reply=Transition, draft=pending Envelope.
 *
 * Tools: list_emails · get_thread · draft_email · send_email
 *
 * Routes:
 *   /sse  → MailMcp.serveSSE("/sse")   (SSE transport)
 *   /mcp  → MailMcp.serve("/mcp")      (streamable-HTTP transport)
 *   else  → status / manifest (delegated back to worker.ts default)
 *
 * @cite vendor/cloudflare/workers-sdk/packages/agents/src/mcp.ts   (McpAgent pattern)
 * @cite vendor/anthropics/platform.claude.com/docs/en/managed-agents (McpAgent SDK)
 */

import { McpAgent } from "agents/mcp";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export interface Env {
  MCP_OBJECT: DurableObjectNamespace;
  COWORKERS_HOST: string;
  SITE_NAME: string;
}

const MAILBOX_DIR = "cowork/data/mailbox";

export class MailMcp extends McpAgent<Env> {
  server = new McpServer(
    { name: "mail", version: "0.1.0" },
    {
      instructions:
        "mail.subagentknowledge.com — agent-native mail over e2m. " +
        "email=envelope, reply=transition. Drafts are queue-first; operator reviews before send.",
    },
  );

  async init() {
    this.server.registerTool(
      "list_emails",
      {
        description:
          "List emails (e2m envelopes) for a role's mailbox. Returns the JSONL pointer; " +
          "read live via e2m-mcp mailbox_recv.",
        inputSchema: {
          role: z.string().optional().describe("Mailbox owner role, e.g. product-manager"),
        },
        annotations: { readOnlyHint: true },
      },
      async ({ role }) => ({
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                mailbox: role ? `${MAILBOX_DIR}/${role}.jsonl` : `${MAILBOX_DIR}/<role>.jsonl`,
                filter: "all",
                read_via:
                  "e2m-mcp mailbox_recv (agent_id, type?) — latest-line-wins per id",
              },
              null,
              2,
            ),
          },
        ],
      }),
    );

    this.server.registerTool(
      "get_thread",
      {
        description:
          "Get a mail thread — all envelopes + transitions sharing a thread_id.",
        inputSchema: {
          thread_id: z.string().describe("Thread identifier shared across envelopes"),
        },
        annotations: { readOnlyHint: true },
      },
      async ({ thread_id }) => ({
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                thread_id,
                read_via:
                  "e2m-mcp mailbox_recv then filter thread_id; " +
                  "transitions are appended reply rows in the same JSONL",
              },
              null,
              2,
            ),
          },
        ],
      }),
    );

    this.server.registerTool(
      "draft_email",
      {
        description:
          "Draft an email — a PENDING envelope queued for operator review (never auto-sent).",
        inputSchema: {
          to: z.string().describe("Recipient agent id or address"),
          subject: z.string().describe("Subject line (max 120 chars)").max(120),
          text: z.string().describe("Plain-text body of the draft"),
        },
        annotations: { readOnlyHint: false },
      },
      async ({ to, subject, text }) => ({
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                _type: "envelope",
                id: crypto.randomUUID(),
                envelope_type: "notify",
                to,
                subject,
                at: new Date().toISOString(),
                state: "pending",
                payload: { draft: true, body: text },
                note: "Draft only. Operator reviews, then send_email writes it via e2m-mcp envelope_write.",
              },
              null,
              2,
            ),
          },
        ],
      }),
    );

    this.server.registerTool(
      "send_email",
      {
        description:
          "Send an operator-confirmed email — appends a sent Envelope to the recipient mailbox.",
        inputSchema: {
          to: z.string().describe("Recipient agent id or address"),
          subject: z.string().describe("Subject line (max 120 chars)").max(120),
          text: z.string().describe("Plain-text body to send"),
        },
        annotations: { readOnlyHint: false },
      },
      async ({ to, subject, text }) => ({
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                _type: "envelope",
                id: crypto.randomUUID(),
                envelope_type: "notify",
                to,
                subject,
                at: new Date().toISOString(),
                state: "sent",
                payload: { body: text },
                write_via: `e2m-mcp envelope_write → ${MAILBOX_DIR}/${to}.jsonl`,
              },
              null,
              2,
            ),
          },
        ],
      }),
    );
  }
}

const ACTIONS = ["list_emails", "get_thread", "draft_email", "send_email"];
const HSTS = "max-age=31536000; includeSubDomains";

function secure(r: Response): Response {
  const out = new Response(r.body, r);
  out.headers.set("strict-transport-security", HSTS);
  out.headers.set("x-site", "mail.subagentknowledge.com");
  return out;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    if (url.protocol !== "https:") {
      url.protocol = "https:";
      return Response.redirect(url.toString(), 301);
    }
    if (url.pathname === "/sse" || url.pathname.startsWith("/sse/")) {
      return MailMcp.serveSSE("/sse").fetch(request, env, ctx);
    }
    if (url.pathname === "/mcp" || url.pathname.startsWith("/mcp/")) {
      return MailMcp.serve("/mcp").fetch(request, env, ctx);
    }
    if (url.pathname === "/api/manifest") {
      return secure(
        Response.json({
          app: "mail",
          template: "agent-native/mail",
          protocol: "e2m",
          actions: ACTIONS,
          mcp: "https://mail.subagentknowledge.com/mcp",
          sse: "https://mail.subagentknowledge.com/sse",
          version: "0.1.0",
        }),
      );
    }
    return secure(new Response("Not found", { status: 404 }));
  },
} satisfies ExportedHandler<Env>;
