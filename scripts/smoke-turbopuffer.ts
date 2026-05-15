#!/usr/bin/env tsx
// scripts/smoke-turbopuffer.ts
//
// Phase 14.B (#127) smoke test. Confirms the bootstrap WRITE key works
// end-to-end against the @turbopuffer/turbopuffer SDK (not just curl
// against the REST surface).
//
// Run:
//   npm run smoke:turbopuffer
//
// Behavior:
//   1. Read API key from ~/.config/ke-turbopuffer-write-key.tmp (mode 0o600).
//      The value never enters process args.
//   2. Build a client for region gcp-us-central1 (operator's account default).
//   3. Write 2 rows to namespace `ke-smoke-2026-05-15-sdk` with random
//      3-dim vectors.
//   4. The key is WRITE-only (verified 2026-05-15 via 403 on /query) so
//      we don't attempt a query — the write being accepted (rows_upserted:2)
//      is the smoke signal.
//   5. Report rows_affected. Exit 0 on success, non-zero on any error.
//
// Citations:
//   vendor/turbopuffer/turbopuffer.com/docs/quickstart.md (full quickstart code)
//   vendor/turbopuffer/turbopuffer.com/docs/write.md (upsert_rows shape)
//   docs/operator-runbooks/turbopuffer-api-key.md (the runbook this implements)

import { readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { makeTurbopufferClient, getNamespace } from "../src/lib/turbopuffer-client.ts";

function readKey(): string {
  const path = join(homedir(), ".config", "ke-turbopuffer-write-key.tmp");
  try {
    const raw = readFileSync(path, "utf8").trim();
    if (!raw) throw new Error("file empty");
    return raw;
  } catch (err) {
    console.error(
      `[smoke-turbopuffer] ERROR: cannot read key from ${path}\n` +
        `  Stage with: K='<key>' node /tmp/stage-tpuf-key.mjs (see runbook)\n` +
        `  Underlying: ${(err as Error).message}`,
    );
    process.exit(2);
  }
}

function randVec(dim: number): number[] {
  return Array.from({ length: dim }, () => Math.random());
}

async function main(): Promise<void> {
  const key = readKey();
  console.log(
    `[smoke-turbopuffer] key loaded (${key.length} bytes); value NOT printed.`,
  );

  const client = makeTurbopufferClient(key);
  const ns = getNamespace(client, "ke-smoke-2026-05-15-sdk");

  console.log("[smoke-turbopuffer] writing 2 rows to ke-smoke-2026-05-15-sdk ...");
  const result = await ns.write({
    upsert_rows: [
      {
        id: 1,
        vector: randVec(3),
        category: "smoke",
        text: "ke chassis smoke 2026-05-15 row 1",
      },
      {
        id: 2,
        vector: randVec(3),
        category: "smoke",
        text: "ke chassis smoke 2026-05-15 row 2",
      },
    ],
    distance_metric: "cosine_distance",
    schema: {
      text: { type: "string", full_text_search: true },
    },
  });

  console.log("[smoke-turbopuffer] write result:", {
    status: (result as { status?: unknown }).status,
    rows_affected: (result as { rows_affected?: unknown }).rows_affected,
    rows_upserted: (result as { rows_upserted?: unknown }).rows_upserted,
  });

  const upserted = (result as { rows_upserted?: number }).rows_upserted;
  if (upserted !== 2) {
    console.error(
      `[smoke-turbopuffer] FAIL: expected rows_upserted=2, got ${upserted}`,
    );
    process.exit(1);
  }
  console.log("[smoke-turbopuffer] OK ✅");
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((err) => {
    console.error("[smoke-turbopuffer] FAIL:", err);
    process.exit(1);
  });
}
