// src/lib/turbopuffer-client.ts
//
// Phase 14.B (#127) — thin Turbopuffer client for the chassis. Uses the
// operator's premium account (alex@jadecli.com, $64/mo) per the runbook
// in docs/operator-runbooks/turbopuffer-api-key.md.
//
// Auth shape per:
//   vendor/turbopuffer/turbopuffer.com/docs/quickstart.md:17
//   (Authorization: Bearer $TURBOPUFFER_API_KEY)
//
// Region per the operator's stated default in the quickstart code they
// provided 2026-05-15: gcp-us-central1.
//
// Why this is a NEW file rather than a modification of
// src/lib/embeddings.ts:
//   The existing embeddings.ts uses @xenova/transformers (Xenova/all-MiniLM-L6-v2,
//   384-dim) and is hot-path for the chassis crawl pipeline. The turbopuffer
//   client is additive — it provides a remote vector store, not a replacement
//   for the local embedder. A future PR (#132) decides whether to swap
//   embeddings.ts to push results into turbopuffer.
//
// Key handling:
//   Reads TURBOPUFFER_API_KEY_WRITE from env. The smoke test in
//   scripts/smoke-turbopuffer.ts sources it from
//   ~/.config/ke-turbopuffer-write-key.tmp via Node's readFileSync, so the
//   value never appears in process args.

import { Turbopuffer } from "@turbopuffer/turbopuffer";

/**
 * The region of the operator's brand-new account. Verified empirically
 * 2026-05-15: a POST to https://gcp-us-central1.turbopuffer.com/v2/...
 * with the bootstrap WRITE key returned HTTP 200 with rows_upserted:1.
 *
 * Cited from operator's quickstart snippet 2026-05-15 (which itself
 * mirrors vendor/turbopuffer/turbopuffer.com/docs/quickstart.md and
 * vendor/turbopuffer/turbopuffer.com/docs/regions.md).
 */
export const TURBOPUFFER_REGION = "gcp-us-central1" as const;

/**
 * Build a Turbopuffer client. The API key MUST be supplied — we do not
 * fall back to a hardcoded default and we do not read env directly here
 * (callers are responsible for sourcing from a leak-safe path).
 *
 * @param apiKey - Bearer token; in this session, the bootstrap WRITE key.
 *                 In production this is replaced by a long-lived
 *                 read+write key per #132's follow-up.
 */
export function makeTurbopufferClient(apiKey: string): Turbopuffer {
  if (!apiKey) {
    throw new Error(
      "TURBOPUFFER_API_KEY_WRITE not set. See " +
        "docs/operator-runbooks/turbopuffer-api-key.md for provisioning.",
    );
  }
  return new Turbopuffer({
    apiKey,
    region: TURBOPUFFER_REGION,
  });
}

/**
 * Convenience: get a namespace handle from a configured client.
 * Namespaces are implicit per vendor/turbopuffer/.../namespaces.md:60 —
 * the first write to a name creates it.
 */
export function getNamespace(client: Turbopuffer, name: string) {
  return client.namespace(name);
}
