/**
 * ke-subagent-feature-dev worker implementation
 * Implements feature-branch changes end-to-end: reads the pending queue,
 * writes code, opens a PR, and emits an outcome record.
 *
 * @cite docs/orchestration/coworker-registry.ts
 * @cite src/subagents/feature-dev/index.ts
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
    return Response.json({ status: "ok", subagent: "feature-dev", version: "0.4.0" });
  }
  // TODO: implement feature-dev subagent logic in future loop tick
  void env;
  return Response.json(
    { error: "not implemented", subagent: "feature-dev" },
    { status: 501 },
  );
}
