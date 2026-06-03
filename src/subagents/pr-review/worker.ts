/**
 * ke-subagent-pr-review worker implementation
 * Reviews open PRs via claude-code-review integration, posts inline comments,
 * and approves or requests changes.
 *
 * @cite docs/orchestration/coworker-registry.ts
 * @cite src/subagents/pr-review/index.ts
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
    return Response.json({ status: "ok", subagent: "pr-review", version: "0.4.0" });
  }
  // TODO: implement pr-review subagent logic in future loop tick
  void env;
  return Response.json(
    { error: "not implemented", subagent: "pr-review" },
    { status: 501 },
  );
}
