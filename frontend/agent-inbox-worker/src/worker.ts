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
import { Agent, callable, routeAgentEmail, type EmailSendBinding } from "agents";
import { createAddressBasedEmailResolver, type AgentEmail } from "agents/email";
import PostalMime from "postal-mime";
import { parse as parseE2M, type Envelope } from "@coworkers/e2m-ts";
import { DOMAIN, ROLES, localPart, isKnownRole, type Role } from "./manifest.js";

export { DOMAIN, ROLES, roleEmail, localPart, isKnownRole, type Role } from "./manifest.js";

interface Env {
  EMAIL: EmailSendBinding;
  ManagerInbox: DurableObjectNamespace;
}

/** One inbox agent per manager role. Inbound email becomes an e2m envelope in agent state. */
export class ManagerInbox extends Agent<Env, { envelopes: Envelope[] }> {
  initialState = { envelopes: [] as Envelope[] };

  /**
   * Proactive outbound: send email from one coworker role to another.
   * Uses the SDK pattern (this.sendEmail) not the low-level EmailMessage constructor.
   * @cite https://developers.cloudflare.com/agents/communication-channels/email/
   */
  @callable()
  async sendCoworkerEmail(params: {
    to: string;
    from: string;
    subject: string;
    text: string;
  }): Promise<{ messageId: string }> {
    const messageId = crypto.randomUUID();
    await this.sendEmail({
      binding: this.env.EMAIL,
      to: params.to,
      from: params.from,
      subject: params.subject,
      text: params.text,
    });
    return { messageId };
  }

  async onEmail(email: AgentEmail): Promise<void> {
    const raw = await email.getRaw();
    const parsed = await PostalMime.parse(raw);

    // Auto-verify Cloudflare Email Routing destination address verification emails.
    // CF sends these when a destination address is added; they contain a verification link.
    const body = parsed.text ?? parsed.html ?? "";
    if (email.from.includes("cloudflare") && body.includes("Verify email address")) {
      const urlMatch = body.match(/https:\/\/[^\s"<>]+verify[^\s"<>]*/i);
      if (urlMatch) {
        try { await fetch(urlMatch[0], { redirect: "follow" }); } catch { /* best effort */ }
      }
    }

    const lp = localPart(email.to);

    // Guard: reject email to unknown coworker addresses (misconfigured routing).
    if (!isKnownRole(lp)) {
      await this.replyToEmail(email, {
        fromName: "agent-inbox (coworkers)",
        body: `No coworker found for address ${email.to}. Valid addresses: ${ROLES.map((r) => `${r}@${DOMAIN}`).join(", ")}`,
      });
      return;
    }
    const role: Role = lp;

    // Build + validate the e2m envelope against the canonical contract (drift-free).
    // `from` is the external sender email; `to` is the canonical coworker ID.
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
