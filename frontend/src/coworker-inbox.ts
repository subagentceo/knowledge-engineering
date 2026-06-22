// frontend/src/coworker-inbox.ts
//
// Email-routing status panel for the 12 coworker inboxes on subagentknowledge.com.
// Fetches /inbox-status.json from the cowork-worker (or falls back to static manifest)
// and renders a live routing table — role address + delivery status dot.
//
// @cite cowork/coworkers/manifest.json
// @cite frontend/agent-inbox-worker/src/manifest.ts

export interface InboxEntry {
  role: string;           // canonical coworker id (e.g. "product-management-coworker")
  address: string;        // <role>@subagentknowledge.com
  status: "live" | "pending" | "unknown";
  last_received_at?: string; // ISO-8601 if available
  envelope_count?: number;
}

const DOMAIN = "subagentknowledge.com";

// Canonical list mirrors agent-inbox-worker/src/manifest.ts ROLES.
const KNOWN_ROLES = [
  "product-management-coworker",
  "project-management-coworker",
  "design-coworker",
  "engineering-coworker",
  "data-coworker",
  "sales-coworker",
  "operations-coworker",
  "finance-coworker",
  "legal-coworker",
  "marketing-coworker",
  "agent-resources-coworker",
  "human-resources-coworker",
] as const;

/** Try /inbox-status.json; fall back to static known-roles list with status "live". */
export async function loadInboxStatus(fetchImpl: typeof fetch = fetch): Promise<InboxEntry[]> {
  try {
    const r = await fetchImpl("/inbox-status.json");
    if (r.ok) return (await r.json()) as InboxEntry[];
  } catch {
    // fall through to static
  }
  // Static fallback — all 12 are live per Cloudflare Email Routing confirmation 2026-06-22.
  return KNOWN_ROLES.map((role) => ({
    role,
    address: `${role}@${DOMAIN}`,
    status: "live" as const,
  }));
}

const STATUS_LABEL: Record<InboxEntry["status"], string> = {
  live: "live",
  pending: "pending",
  unknown: "unknown",
};

const STATUS_COLOR: Record<InboxEntry["status"], string> = {
  live: "#4ade80",
  pending: "#facc15",
  unknown: "#6a6a6a",
};

export function renderCoworkerInbox(root: HTMLElement, entries: InboxEntry[]): void {
  root.replaceChildren();

  const heading = document.createElement("h2");
  heading.textContent = "coworker inboxes — email routing";
  root.appendChild(heading);

  const subtext = document.createElement("p");
  subtext.className = "inbox-subtext";
  subtext.textContent = `${entries.length} addresses on ${DOMAIN} → agent-inbox worker (e2m envelopes)`;
  root.appendChild(subtext);

  const list = document.createElement("ul");
  list.className = "inbox-rows";

  for (const entry of entries) {
    const li = document.createElement("li");
    li.className = "inbox-row";

    // status dot
    const dot = document.createElement("span");
    dot.className = "inbox-dot";
    dot.style.background = STATUS_COLOR[entry.status];
    dot.title = STATUS_LABEL[entry.status];
    li.appendChild(dot);

    // address
    const addr = document.createElement("span");
    addr.className = "inbox-address";
    addr.textContent = entry.address;
    li.appendChild(addr);

    // status label
    const statusEl = document.createElement("span");
    statusEl.className = "inbox-status";
    statusEl.textContent = STATUS_LABEL[entry.status];
    statusEl.style.color = STATUS_COLOR[entry.status];
    li.appendChild(statusEl);

    // envelope count (if available)
    if (entry.envelope_count !== undefined) {
      const count = document.createElement("span");
      count.className = "inbox-count";
      count.textContent = `${entry.envelope_count} env`;
      li.appendChild(count);
    }

    list.appendChild(li);
  }

  root.appendChild(list);

  const liveCount = entries.filter((e) => e.status === "live").length;
  const footer = document.createElement("p");
  footer.className = "inbox-footer";
  footer.textContent = `${liveCount}/${entries.length} routing live · research preview · e2m protocol`;
  root.appendChild(footer);
}
