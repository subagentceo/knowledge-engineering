/**
 * Phase 8 (issue #12) C2 — outbound allowlist tests.
 *
 * Per the issue's acceptance criterion:
 *   "Outbound allowlist enforced. evil.example blocked; api.anthropic.com succeeds."
 *
 * Citations:
 * @tdd green
 * @cite vendor/anthropics/code.claude.com/docs/en/claude-code-on-the-web.md
 * @cite rubrics/phase-8.md
 * @cite seeds/citations/vendor-graph-v2.xml
 */

import {
  OutboundDeniedError,
  baseAllowlist,
  hostMatchesPattern,
  isHostAllowed,
  isUrlAllowed,
} from "./outbound-allowlist.js";

let passed = 0;
let failed = 0;

function check(name: string, fn: () => void): void {
  try {
    fn();
    passed += 1;
    console.log(`  ✓ ${name}`);
  } catch (err) {
    failed += 1;
    console.error(`  ✗ ${name}`);
    console.error(`    ${(err as Error).message}`);
  }
}

// ───── hostMatchesPattern ──────────────────────────────────────────

check("hostMatchesPattern: exact match", () => {
  if (!hostMatchesPattern("api.anthropic.com", "api.anthropic.com")) {
    throw new Error("exact match failed");
  }
});

check("hostMatchesPattern: case-insensitive", () => {
  if (!hostMatchesPattern("API.Anthropic.COM", "api.anthropic.com")) {
    throw new Error("case-insensitive match failed");
  }
});

check("hostMatchesPattern: non-match", () => {
  if (hostMatchesPattern("evil.example", "api.anthropic.com")) {
    throw new Error("non-match incorrectly matched");
  }
});

check("hostMatchesPattern: wildcard subdomain match", () => {
  if (!hostMatchesPattern("foo.neon.tech", "*.neon.tech")) {
    throw new Error("*.neon.tech did not match foo.neon.tech");
  }
  if (!hostMatchesPattern("very.deep.foo.neon.tech", "*.neon.tech")) {
    throw new Error("*.neon.tech did not match deep subdomain");
  }
});

check("hostMatchesPattern: wildcard does not match bare apex", () => {
  if (hostMatchesPattern("neon.tech", "*.neon.tech")) {
    throw new Error("*.neon.tech should not match bare neon.tech");
  }
});

check("hostMatchesPattern: wildcard does not match unrelated host", () => {
  if (hostMatchesPattern("evil.example", "*.neon.tech")) {
    throw new Error("*.neon.tech should not match evil.example");
  }
});

// ───── isHostAllowed / isUrlAllowed — the acceptance-criterion checks

check("AC#1: api.anthropic.com is allowed", () => {
  if (!isHostAllowed("api.anthropic.com")) {
    throw new Error("api.anthropic.com should be on the allowlist");
  }
});

check("AC#1: evil.example is BLOCKED", () => {
  if (isHostAllowed("evil.example")) {
    throw new Error("evil.example must NOT be on the allowlist");
  }
});

check("isUrlAllowed: api.anthropic.com URL is allowed", () => {
  if (!isUrlAllowed("https://api.anthropic.com/v1/messages")) {
    throw new Error("API URL should be allowed");
  }
});

check("isUrlAllowed: evil.example URL is blocked", () => {
  if (isUrlAllowed("https://evil.example/payload")) {
    throw new Error("evil.example URL should be denied");
  }
});

check("isUrlAllowed: malformed URL is denied (fail-closed)", () => {
  if (isUrlAllowed("not a url")) {
    throw new Error("malformed URL must fail closed (deny)");
  }
});

// ───── Vendor docs hosts (sample) ─────────────────────────────────

check("vendor: docs.stripe.com allowed", () => {
  if (!isHostAllowed("docs.stripe.com")) throw new Error("stripe docs blocked");
});

check("vendor: docs.aws.amazon.com allowed", () => {
  if (!isHostAllowed("docs.aws.amazon.com")) throw new Error("aws docs blocked");
});

check("vendor: developers.cloudflare.com allowed", () => {
  if (!isHostAllowed("developers.cloudflare.com")) throw new Error("cf docs blocked");
});

check("vendor: turbopuffer.com allowed", () => {
  if (!isHostAllowed("turbopuffer.com")) throw new Error("turbopuffer blocked");
});

check("vendor: parallel.ai allowed", () => {
  if (!isHostAllowed("docs.parallel.ai")) throw new Error("parallel.ai docs blocked");
});

// ───── Neon (per-PR branch pooler) ────────────────────────────────

check("Neon: console.neon.tech allowed", () => {
  if (!isHostAllowed("console.neon.tech")) throw new Error("Neon console blocked");
});

check("Neon: per-branch pooler host (foo-pooler.region.neon.tech) allowed", () => {
  if (!isHostAllowed("ep-cool-dawn-12345-pooler.us-east-2.neon.tech")) {
    throw new Error("Neon per-branch host should match *.neon.tech");
  }
});

// ───── GitHub ────────────────────────────────────────────────────

check("GitHub: github.com allowed", () => {
  if (!isHostAllowed("github.com")) throw new Error("github.com blocked");
});

check("GitHub: api.github.com allowed", () => {
  if (!isHostAllowed("api.github.com")) throw new Error("api.github.com blocked");
});

check("GitHub: raw.githubusercontent.com allowed", () => {
  if (!isHostAllowed("raw.githubusercontent.com")) {
    throw new Error("raw.githubusercontent.com blocked");
  }
});

// ───── Extras (Worker var override) ───────────────────────────────

check("extras: comma-separated extras host is allowed", () => {
  if (!isHostAllowed("internal.example", "internal.example, other.example")) {
    throw new Error("extras host not honored");
  }
});

check("extras: extras don't override base allowlist", () => {
  if (!isHostAllowed("api.anthropic.com", "evil.example")) {
    throw new Error("base allowlist broken by extras");
  }
});

check("extras: extras don't allow other hosts", () => {
  if (isHostAllowed("attacker.tld", "internal.example")) {
    throw new Error("extras leaked allow to unrelated host");
  }
});

// ───── allowedFetch behavior (without making real network calls) ──

check("OutboundDeniedError name + message format", () => {
  const e = new OutboundDeniedError("https://evil.example/");
  if (e.name !== "OutboundDeniedError") {
    throw new Error(`wrong error name: ${e.name}`);
  }
  if (!e.message.includes("evil.example")) {
    throw new Error(`error message missing URL: ${e.message}`);
  }
});

// ───── Sanity ────────────────────────────────────────────────────

check("base allowlist is non-empty (sanity)", () => {
  if (baseAllowlist().length < 10) {
    throw new Error(`allowlist too small: ${baseAllowlist().length}`);
  }
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
