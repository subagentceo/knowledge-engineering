/**
 * mailbox-telemetry-bridge.ts — wires telemetry_record_cost → mailbox_outcome.
 * Call postCostToMailbox after recordSessionCost() in agent loops.
 *
 * @cite src/mcp/lanes/mailbox.ts
 * @cite src/mcp/lanes/telemetry.ts
 * @cite src/sdk/cost-types.ts
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { randomUUID } from "node:crypto";

import type { AgentSessionCost } from "../../sdk/cost-types.js";
import { CostRecordPayload } from "../mailbox-types.js";

const MAILBOX_DIR = process.env.MAILBOX_DIR
  ?? path.join(process.cwd(), ".claude", "mailbox");

function ensureDir(): void {
  fs.mkdirSync(MAILBOX_DIR, { recursive: true });
}

function destPath(to: string): string {
  ensureDir();
  const safe = to.replace(/[^a-zA-Z0-9_-]/g, "_");
  return path.join(MAILBOX_DIR, to === "broadcast" ? "_broadcast.jsonl" : `${safe}.jsonl`);
}

/**
 * Append a CostRecordPayload mailbox message after recording session cost.
 * Direct JSONL append — no HTTP, no MCP round-trip.
 */
export async function postCostToMailbox(
  cost: AgentSessionCost,
  opts: { from: string; to?: string; thread_id?: string },
): Promise<{ message_id: string }> {
  const to = opts.to ?? "broadcast";
  const id = `msg_cost_${randomUUID().replace(/-/g, "")}`;

  const payload = CostRecordPayload.parse({
    session_id: cost.session_id,
    model: cost.model,
    workspace_id: cost.workspace_id,
    service_tier: cost.service_tier,
    context_window: cost.context_window,
    uncached_input_tokens: cost.uncached_input_tokens,
    output_tokens: cost.output_tokens,
    cache_read_input_tokens: cost.cache_read_input_tokens,
    cache_creation_input_tokens:
      cost.cache_creation_5m_input_tokens + cost.cache_creation_1h_input_tokens,
    cost_usd: cost.cost_usd,
    pr_number: cost.pr_number,
    branch: cost.branch,
  });

  const message = {
    id,
    from: opts.from,
    to,
    thread_id: opts.thread_id,
    timestamp: new Date().toISOString(),
    type: "cost_record",
    payload,
    ack_required: false,
    status: "pending",
  };

  fs.appendFileSync(destPath(to), JSON.stringify(message) + "\n", "utf-8");
  return { message_id: id };
}
