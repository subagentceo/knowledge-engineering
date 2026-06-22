/**
 * Agent registry for the 2026 operational plan — the single tie between CODE and EMAIL.
 * 6 functions x 3 tiers = 18 agents. Each agent's id, email, mailbox, and queue are derived
 * deterministically, so a manager/coworker/subagent always has a matching inbox address.
 *
 * `design` is the sixth function: its derived queue `cowork/data/queues/design.jsonl`
 * aligns with the e2m server's DOMAINS enum ("design"), so design DurableTasks validate.
 *
 * @cite coworkers/organizations/cloudflare/POLICY.md  (emails are e2m-tf-managed)
 * @cite cowork/standards/agent-hierarchy.md           (managers -> coworkers -> subagents)
 */
export type AgentTier = "manager" | "coworker" | "subagent";
export type AgentFunction = "operator" | "product" | "project" | "finance" | "legal" | "design";

export interface Agent {
  id: string;       // `${fn}-${tier}`
  fn: AgentFunction;
  tier: AgentTier;
  email: string;    // `${id}@subagentknowledge.com`
  mailbox: string;  // append-only JSONL inbox
  queue: string;    // append-only JSONL work queue (per function)
}

const FUNCTIONS: AgentFunction[] = ["operator", "product", "project", "finance", "legal", "design"];
const TIERS: AgentTier[] = ["manager", "coworker", "subagent"];
const DOMAIN = "subagentknowledge.com";

export const AGENTS: Agent[] = FUNCTIONS.flatMap((fn) =>
  TIERS.map((tier) => {
    const id = `${fn}-${tier}`;
    return {
      id, fn, tier,
      email: `${id}@${DOMAIN}`,
      mailbox: `cowork/data/mailbox/${id}.jsonl`,
      queue: `cowork/data/queues/${fn}.jsonl`,
    };
  })
);

export const AGENT_BY_EMAIL: Record<string, Agent> = Object.fromEntries(
  AGENTS.map((a) => [a.email, a])
);
