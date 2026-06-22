/**
 * agent-inbox-worker — email for the e2m manager roles, on Cloudflare Email Service.
 *
 * The real implementation, grounded on:
 *   - https://developers.cloudflare.com/agents/communication-channels/email/
 *   - https://github.com/cloudflare/agentic-inbox  (reference app)
 *   - https://blog.cloudflare.com/email-for-agents/
 *
 * Inbound:  Email Routing rule (per role address) -> this Worker's `email()` handler
 *           -> address-based resolver routes <role>@subagentknowledge.com to that role's Agent instance.
 * Outbound: `send_email` binding (env.EMAIL) -> replyToEmail()/sendEmail(); SPF/DKIM/DMARC auto-configured.
 * Identity: each manager role is one Agent (Durable Object) instance; the inbox is the agent's memory.
 * Security: replies are routed back via HMAC-SHA256-signed headers (createAddressBasedEmailResolver).
 *
 * The live deploy (dist/worker.js) is the dependency-free inbound half (parse + KV queue). Running
 * `wrangler deploy` promotes to this build: stateful agents + outbound replies.
 */
import { Agent, routeAgentEmail } from "agents";
import { createAddressBasedEmailResolver, type AgentEmail } from "agents/email";
import PostalMime from "postal-mime";
import { parse as parseE2M, type Envelope } from "@coworkers/e2m-ts";
import { DOMAIN, ROLES, localPart, type Role } from "./manifest.js";

export { DOMAIN, FUNCTIONS, TIERS, ROLES, roleEmail, localPart, type Role, type AgentFunction, type AgentTier } from "./manifest.js";

interface Env {
  EMAIL: { send: (msg: unknown) => Promise<unknown> };
  ManagerInbox: DurableObjectNamespace;
}

/** One inbox agent per manager role. Inbound email becomes an e2m envelope in agent state. */
export class ManagerInbox extends Agent<Env, { envelopes: Envelope[] }> {
  initialState = { envelopes: [] as Envelope[] };

  async onEmail(email: AgentEmail): Promise<void> {
    const raw = await email.getRaw();
    const parsed = await PostalMime.parse(raw);
    const role = localPart(email.to) as Role;

    // Build + validate the e2m envelope against the canonical contract (drift-free).
    const envelope: Envelope = parseE2M({
      _type: "envelope",
      id: crypto.randomUUID(),
      envelope_type: "task",
      from: email.from,
      to: role,
      subject: parsed.subject ?? "",
      at: new Date().toISOString(),
      state: "pending",
      thread_id: parsed.messageId,
      payload: { channel: "email", rcpt: email.to, text: parsed.text ?? "" },
    }) as Envelope;

    this.setState({ envelopes: [...this.state.envelopes, envelope] });

    // Acknowledge receipt; substantive replies are sent later (async) once the role agent acts.
    await this.replyToEmail(email, {
      fromName: `${role} (coworkers)`,
      body: `Received — queued as e2m envelope ${envelope.id}. ${role} will follow up.`,
    });
  }
}

export default {
  async email(message, env: Env) {
    // Address-based resolver: <role>@DOMAIN -> the ManagerInbox instance named <role>.
    await routeAgentEmail(message, env, {
      resolver: createAddressBasedEmailResolver("ManagerInbox"),
    });
  },
  async fetch(req: Request): Promise<Response> {
    return Response.json({
      name: "agent-inbox",
      domain: DOMAIN,
      channel: "cloudflare-email-service",
      roles: ROLES,
      addresses: ROLES.map((r) => `${r}@${DOMAIN}`),
    });
  },
} satisfies ExportedHandler<Env>;
