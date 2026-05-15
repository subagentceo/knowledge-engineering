// infra/cloudflare/src/outbound-allowlist.ts
//
// Phase 8 (issue #12) C2 — outbound allowlist enforcement.
//
// Citations:
//   @cite vendor/anthropics/code.claude.com/docs/en/claude-code-on-the-web.md#default-allowed-domains
//   @cite vendor/anthropics/neon.com/guides/cloudflare-sandbox-neon-branching.md
//   @cite seeds/citations/vendor-graph-v2.xml
//   @cite rubrics/phase-8.md
//
// Purpose: deny outbound network calls from the Worker / sandbox to
// hosts not on the allowlist. Models the same posture as Claude Code
// on the Web's "Trusted" network-access tier (cited above) — only
// pre-approved hosts can be reached.
//
// Usage:
//   import { isHostAllowed, allowedFetch } from "./outbound-allowlist.js";
//
//   const r = await allowedFetch("https://api.anthropic.com/...");  // OK
//   const r = await allowedFetch("https://evil.example/");          // throws
//
// The allowlist is conservative by default; the Worker can extend it
// via Worker var `OUTBOUND_ALLOWLIST_EXTRA` (comma-separated hosts)
// if a deploy needs additional vendors. The base list covers:
//
//   - The Anthropic platform (api/inference + console)
//   - Neon API + the per-PR branch pooler endpoints (Neon hosts)
//   - GitHub + raw.githubusercontent for repo clone
//   - The 21 vendor docs hosts we mirror (sourced from vendor catalog)
//

/**
 * Base allowlist. Hosts are exact-match by default; `*.example.com`
 * matches any subdomain via {@link hostMatchesPattern}.
 */
const BASE_ALLOWLIST: ReadonlyArray<string> = [
  // Anthropic platform
  "api.anthropic.com",
  "platform.claude.com",
  "code.claude.com",
  "claude.ai",
  "claude.com",

  // Neon (per-PR branches, API, pooler)
  "console.neon.tech",
  "*.neon.tech",
  "*.neon.build",

  // GitHub (clone + API)
  "github.com",
  "api.github.com",
  "raw.githubusercontent.com",
  "codeload.github.com",
  "objects.githubusercontent.com",

  // 21 vendor docs hosts (per seeds/citations/vendor-graph-v2.xml)
  "docs.aws.amazon.com",
  "cloud.google.com",
  "learn.microsoft.com",
  "developers.cloudflare.com",
  "docs.stripe.com",
  "workos.com",
  "developers.intercom.com",
  "www.intercom.com",
  "www.twilio.com",
  "docs.twilio.com",
  "iterable.com",
  "support.iterable.com",
  "docs.sentry.io",
  "developers.sift.com",
  "sift.com",
  "developer.arkoselabs.com",
  "brave.com",
  "api-dashboard.search.brave.com",
  "elevenlabs.io",
  "turbopuffer.com",
  "opentelemetry.io",
  "openfeature.dev",
  "confidence.spotify.com",
  "modelcontextprotocol.io",
  "neon.com",
  "docs.parallel.ai",
  "parallel.ai",
  // parallel.ai API host. Auth shape: `Authorization: Bearer YOUR_API_KEY`.
  // Cited from vendor/parallel-web/docs.parallel.ai/getting-started/overview.md
  // Operator has $70 premium tier on alex@jadecli.com.
  "api.parallel.ai",
  "docs.nimbleway.com",
  // nimbleway API + hosted MCP server. Auth: `Authorization: Bearer YOUR_API_KEY`.
  // Cited from vendor/nimble/docs.nimbleway.com/api-reference/introduction.md
  // (base URL https://sdk.nimbleway.com/v1) and
  // vendor/nimble/docs.nimbleway.com/integrations/mcp-server/mcp-server.md
  // (hosted MCP at https://mcp.nimbleway.com/mcp).
  "sdk.nimbleway.com",
  "mcp.nimbleway.com",
  "www.anthropic.com",
  "support.claude.com",
  "anthropic.com",

  // Ollama Cloud. Auth: `Authorization: Bearer YOUR_API_KEY`.
  // Operator has $20 paid tier on alex@jadecli.com. Citation gap in vendor/:
  // ollama.com has no vendor/ mirror yet — to be filled by adding an `ollama`
  // entry to scripts/crawl-vendors.ts in a follow-up PR.
  "ollama.com",
  "api.ollama.com",
];

/**
 * Returns true if `host` matches `pattern` exactly OR matches the
 * `*.example.com` wildcard form (subdomains only; not the bare apex).
 */
export function hostMatchesPattern(host: string, pattern: string): boolean {
  const h = host.toLowerCase();
  const p = pattern.toLowerCase();
  if (p === h) return true;
  if (p.startsWith("*.")) {
    const suffix = p.slice(1); // ".example.com"
    return h.endsWith(suffix) && h !== suffix.slice(1);
  }
  return false;
}

/**
 * Returns true if the host is on the allowlist (base + optional extras).
 * Pass `extras` as comma-separated hostnames from the Worker var
 * `OUTBOUND_ALLOWLIST_EXTRA` (e.g. `env.OUTBOUND_ALLOWLIST_EXTRA`).
 */
export function isHostAllowed(host: string, extras = ""): boolean {
  const extraHosts = extras
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  const all = [...BASE_ALLOWLIST, ...extraHosts];
  return all.some((p) => hostMatchesPattern(host, p));
}

/**
 * Returns true if the URL's host is on the allowlist.
 */
export function isUrlAllowed(url: string, extras = ""): boolean {
  try {
    const u = new URL(url);
    return isHostAllowed(u.host, extras);
  } catch {
    return false;
  }
}

/**
 * Thrown when an outbound request is rejected by the allowlist.
 */
export class OutboundDeniedError extends Error {
  constructor(url: string) {
    super(`outbound denied: ${url} (host not on allowlist)`);
    this.name = "OutboundDeniedError";
  }
}

/**
 * Wrapper around the Workers runtime `fetch` that throws if the URL's
 * host isn't on the allowlist. Use in Worker code paths that handle
 * agent-issued network calls.
 */
export async function allowedFetch(
  url: string,
  init?: RequestInit,
  extras = "",
): Promise<Response> {
  if (!isUrlAllowed(url, extras)) {
    throw new OutboundDeniedError(url);
  }
  return fetch(url, init);
}

/**
 * Read-only access to the base allowlist for tests.
 */
export function baseAllowlist(): ReadonlyArray<string> {
  return BASE_ALLOWLIST;
}
