/**
 * ke-subagent-swift-lsp worker implementation
 * Provides Swift language-server protocol support and macOS SDK intelligence
 * for the subagent dashboard build loop.
 *
 * @cite docs/orchestration/coworker-registry.ts
 * @cite src/subagents/swift-lsp/index.ts
 */
import type { Env } from "./index.js";

export async function handleRequest(
  request: Request,
  env: Env,
): Promise<Response> {
  if (
    request.method === "GET" &&
    new URL(request.url).pathname === "/health"
  ) {
    return Response.json({ status: "ok", subagent: "swift-lsp", version: "0.4.0" });
  }
  // TODO: implement swift-lsp subagent logic in future loop tick
  void env;
  return Response.json(
    { error: "not implemented", subagent: "swift-lsp" },
    { status: 501 },
  );
}
