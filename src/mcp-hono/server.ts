/**
 * Hono HTTP transport wrapper for the MCP bridge server.
 * Designed for Cloudflare Workers deployment — no Node.js built-ins.
 *
 * @cite vendor/modelcontextprotocol/modelcontextprotocol.io/docs/develop/build-server.md
 * @cite vendor/cloudflare/developers.cloudflare.com/flagship/index.md
 */
import { Hono } from "hono";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";

const VERSION = "0.5.0";

export function createMcpHonoApp(server?: Server): Hono {
  const app = new Hono();
  const transport = server ? new InMemoryTransport(server) : null;

  app.get("/health", (c) => c.json({ ok: true, version: VERSION }));

  app.post("/message", async (c) => {
    if (!transport) {
      return c.json({ jsonrpc: "2.0", error: { code: -32000, message: "No MCP server attached" }, id: null }, 500);
    }
    const body = await c.req.json();
    const response = await transport.handleMessage(body);
    return c.json(response);
  });

  return app;
}

interface StreamableTransport {
  handleMessage(message: unknown): Promise<unknown>;
}

class InMemoryTransport implements StreamableTransport {
  private _server: Server;

  constructor(server: Server) {
    this._server = server;
  }

  async handleMessage(message: unknown): Promise<unknown> {
    return new Promise((resolve) => {
      const msg = message as { id?: string | number | null; method?: string; params?: unknown };
      if (!msg.method) {
        resolve({ jsonrpc: "2.0", error: { code: -32600, message: "Invalid Request" }, id: msg.id ?? null });
        return;
      }
      // Dispatch into the MCP server's request handler surface.
      // The Server class from @modelcontextprotocol/sdk handles routing
      // internally; we emit the message and capture the reply via a
      // one-shot response collector.
      const id = msg.id ?? null;
      (this._server as unknown as { _handleRequest(req: unknown, extra: unknown): Promise<unknown> })
        ._handleRequest(msg, {})
        .then((result: unknown) => resolve({ jsonrpc: "2.0", result, id }))
        .catch((err: unknown) => {
          const message = err instanceof Error ? err.message : String(err);
          resolve({ jsonrpc: "2.0", error: { code: -32000, message }, id });
        });
    });
  }
}

export class McpHonoServer {
  // WHY: kept private to avoid leaking unstable MCP internals; access via app()
  private readonly _server: Server;
  private readonly _transport: InMemoryTransport;
  private readonly _app: Hono;

  constructor(server: Server) {
    this._server = server;
    this._transport = new InMemoryTransport(server);

    const app = new Hono();

    app.get("/health", (c) => c.json({ ok: true, version: VERSION }));

    app.post("/message", async (c) => {
      const body = await c.req.json();
      const response = await this._transport.handleMessage(body);
      return c.json(response);
    });

    this._app = app;
  }

  app(): Hono {
    return this._app;
  }
}
