/**
 * ke-subagent-pr-review — CF Worker entry point
 * Managed subagent: PR Review Agent
 * Category: review
 * Target: v0.4.0
 *
 * @cite docs/orchestration/coworker-registry.ts
 * @cite vendor/anthropics/code.claude.com/docs/en/sub-agents.md
 */
import { handleRequest } from "./worker.js";

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    return handleRequest(request, env);
  },
};

export interface Env {
  // OAuth token — never ANTHROPIC_API_KEY
  CLAUDE_CODE_OAUTH_TOKEN: string;
  // Mailbox KV namespace for agent-to-agent messaging
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  MAILBOX: any;
}
