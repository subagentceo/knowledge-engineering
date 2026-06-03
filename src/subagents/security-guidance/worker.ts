/**
 * ke-subagent-security-guidance worker implementation
 * Scans new dependencies via OSV, flags CVEs, and proposes remediations
 * as PR comments before merge.
 *
 * @cite docs/orchestration/coworker-registry.ts
 * @cite src/subagents/security-guidance/index.ts
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
    return Response.json({ status: "ok", subagent: "security-guidance", version: "0.4.0" });
  }
  // TODO: implement security-guidance subagent logic in future loop tick
  void env;
  return Response.json(
    { error: "not implemented", subagent: "security-guidance" },
    { status: 501 },
  );
}
