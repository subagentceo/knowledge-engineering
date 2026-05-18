/**
 * @tdd green
 * Shape assertions for src/lib/turbopuffer-client.ts. No live API calls —
 * we only verify the module exposes its public surface (makeTurbopufferClient,
 * getNamespace, TURBOPUFFER_REGION) and that makeTurbopufferClient enforces
 * the non-empty key invariant.
 *
 * @cite vendor/turbopuffer/turbopuffer.com/docs/quickstart.md
 * @cite vendor/turbopuffer/turbopuffer.com/docs/auth.md
 * @cite seeds/citations/define-outcomes.md
 */

import {
  makeTurbopufferClient,
  getNamespace,
  TURBOPUFFER_REGION,
} from "./turbopuffer-client.js";

function check(label: string, fn: () => void): void {
  try {
    fn();
    console.log(`ok  - ${label}`);
  } catch (err) {
    console.error(`FAIL - ${label}: ${(err as Error).message}`);
    process.exitCode = 1;
  }
}

check("TURBOPUFFER_REGION is gcp-us-central1", () => {
  if (TURBOPUFFER_REGION !== "gcp-us-central1") {
    throw new Error(`unexpected region: ${TURBOPUFFER_REGION}`);
  }
});

check("makeTurbopufferClient throws on empty key", () => {
  let threw = false;
  try {
    makeTurbopufferClient("");
  } catch {
    threw = true;
  }
  if (!threw) throw new Error("expected throw on empty key");
});

check("makeTurbopufferClient returns an object with namespace()", () => {
  const client = makeTurbopufferClient("tpuf_test_dummy_key");
  if (typeof client.namespace !== "function") {
    throw new Error("client.namespace is not a function");
  }
});

check("getNamespace returns a namespace handle", () => {
  const client = makeTurbopufferClient("tpuf_test_dummy_key");
  const ns = getNamespace(client, "ke-test-shape");
  if (!ns) throw new Error("namespace was falsy");
});

console.log("turbopuffer-client shape tests complete");
