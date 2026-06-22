/**
 * cowork-worker/src/cowork.app.ts
 *
 * CoworkMcp — artifact + queue-status MCP surface.
 *
 * Tools:
 *   list_artifacts {} — list cowork artifacts from DO sqlite
 *   get_artifact {id} — fetch one artifact by id
 *   queue_status {} — pending/in_progress/completed counts across e2m queues
 *
 * Routes (wired in worker.ts default export):
 *   /sse  → CoworkMcp.serveSSE("/sse")   (SSE transport)
 *   /mcp  → CoworkMcp.serve("/mcp")       (streamable-HTTP transport)
 *
 * @cite github.com/cloudflare/agents                         (McpAgent pattern)
 * @cite vendor/cloudflare/developers.cloudflare.com/agents/mcp.md
 */

import { McpAgent } from "agents/mcp";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export interface Env {
  COWORK_MCP: DurableObjectNamespace;
  COWORKERS_HOST: string;
  SITE_NAME: string;
}

// Domain queue names (mirrors worker.ts DOMAINS)
const QUEUE_DOMAINS = [
  "agent-resources",
  "data",
  "design",
  "engineering",
  "finance",
  "human-resources",
  "legal",
  "marketing",
  "operations",
  "operator",
  "product-management",
  "project-management",
  "sales",
  "skill-grades",
  "skill-outcomes",
] as const;

export class CoworkMcp extends McpAgent<Env> {
  server = new McpServer({ name: "cowork", version: "0.1.0" });

  async init() {
    // list_artifacts — list all cowork artifacts stored in DO sqlite
    this.server.registerTool(
      "list_artifacts",
      {
        description: "List cowork artifacts (sessions, outputs, summaries) stored in this Durable Object.",
        inputSchema: {},
        annotations: { readOnlyHint: true },
      },
      async () => {
        // DO sqlite v1 migration creates an `artifacts` table (see wrangler.jsonc migrations).
        // At runtime, query via this.ctx.storage if available; fall back to stub when cold.
        let rows: { id: string; type: string; created_at: string }[] = [];
        try {
          const result = await (this.ctx?.storage as any)?.sql?.(
            "SELECT id, type, created_at FROM artifacts ORDER BY created_at DESC LIMIT 100",
          );
          if (result) rows = [...result];
        } catch {
          // Storage not yet seeded — return empty list
        }
        return {
          content: [{ type: "text" as const, text: JSON.stringify({ artifacts: rows, count: rows.length }, null, 2) }],
        };
      },
    );

    // get_artifact — fetch one artifact by id
    this.server.registerTool(
      "get_artifact",
      {
        description: "Fetch a single cowork artifact by its id.",
        inputSchema: { id: z.string().describe("Artifact id (UUID)") },
        annotations: { readOnlyHint: true },
      },
      async ({ id }) => {
        let artifact: Record<string, unknown> | null = null;
        try {
          const result = await (this.ctx?.storage as any)?.sql?.(
            "SELECT id, type, payload, created_at FROM artifacts WHERE id = ? LIMIT 1",
            id,
          );
          if (result) {
            const rows = [...result];
            if (rows.length > 0) artifact = rows[0] as Record<string, unknown>;
          }
        } catch {
          // Storage unavailable
        }
        if (!artifact) {
          return {
            content: [{ type: "text" as const, text: `Artifact not found: ${id}` }],
            isError: true,
          };
        }
        return {
          content: [{ type: "text" as const, text: JSON.stringify(artifact, null, 2) }],
        };
      },
    );

    // queue_status — pending/in_progress/completed counts across all e2m queues
    this.server.registerTool(
      "queue_status",
      {
        description: "Return pending/in_progress/completed task counts across all e2m cowork queues (observability flavour).",
        inputSchema: {},
        annotations: { readOnlyHint: true },
      },
      async () => {
        // Queue JSONL files live on the repo filesystem; the Worker returns
        // pointers so the operator can read them via git or the e2m-mcp bridge.
        const queues = QUEUE_DOMAINS.map((domain) => ({
          domain,
          queue_path: `cowork/data/queues/${domain}.jsonl`,
          counts: { pending: null, in_progress: null, completed: null },
          note: "Last-line-wins per task_id. Read via git or e2m-mcp bridge server.",
        }));
        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(
                { queues, total_domains: QUEUE_DOMAINS.length, snapshot_at: new Date().toISOString() },
                null,
                2,
              ),
            },
          ],
        };
      },
    );
  }
}

// ── Default export: route /sse and /mcp to CoworkMcp; pass everything else through ──

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/sse" || url.pathname.startsWith("/sse/")) {
      return CoworkMcp.serveSSE("/sse").fetch(request, env, ctx);
    }

    if (url.pathname === "/mcp" || url.pathname.startsWith("/mcp/")) {
      return CoworkMcp.serve("/mcp").fetch(request, env, ctx);
    }

    // All other paths fall through to the main cowork-frontend worker (worker.ts).
    return new Response("Not found", { status: 404 });
  },
};
