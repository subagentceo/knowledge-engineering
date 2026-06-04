// scripts/lib/alloydb-client.test.ts
//
// @cite src/lib/alloydb-branch.ts
// @cite rubrics/phase-13.md (O8)
// @tdd green
//
// Unit coverage for the alloydb-client wrapper. The DB driver (`pg`)
// is injected via __setPoolFactoryForTests so this runs without a live
// AlloyDB Omni server — we assert the UPSERT builds the right SQL +
// params, alloydbEnabled() reads the env var, and the Pool is cached
// per ALLOYDB_DATABASE_URL. An optional integration test round-trips a
// row against localhost:5433 when it is reachable; otherwise it skips.

import { test, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import net from "node:net";

import {
  alloydbEnabled,
  upsertVendorPage,
  exec,
  close,
  __setPoolFactoryForTests,
} from "./alloydb-client.ts";

let queryCalls: Array<{ sql: string; params: unknown[] }> = [];
let poolConstructions = 0;
let poolEnds = 0;

class StubPool {
  constructor(_config: unknown) {
    poolConstructions++;
  }
  async query(sql: string, params?: unknown[]) {
    queryCalls.push({ sql, params: params ?? [] });
    return { rowCount: 1, rows: [{ vendor: "x" }] };
  }
  async end() {
    poolEnds++;
  }
}

function installStub() {
  queryCalls = [];
  poolConstructions = 0;
  poolEnds = 0;
  __setPoolFactoryForTests((config) => new StubPool(config) as never);
}

beforeEach(async () => {
  await close();
});

afterEach(() => {
  __setPoolFactoryForTests(null);
  delete process.env.ALLOYDB_DATABASE_URL;
});

test("alloydbEnabled reflects ALLOYDB_DATABASE_URL", () => {
  delete process.env.ALLOYDB_DATABASE_URL;
  assert.equal(alloydbEnabled(), false);
  process.env.ALLOYDB_DATABASE_URL = "postgresql://postgres:postgres@localhost:5433/postgres";
  assert.equal(alloydbEnabled(), true);
});

test("upsertVendorPage builds ON CONFLICT SQL with 6 params", async () => {
  installStub();
  process.env.ALLOYDB_DATABASE_URL = "postgresql://postgres:postgres@localhost:5433/postgres";
  const wrote = await upsertVendorPage({
    vendor: "alloydb",
    path: "/docs/x",
    content: "body",
    content_hash: "h1",
  });
  assert.equal(wrote, true);
  assert.equal(queryCalls.length, 1);
  assert.match(queryCalls[0]!.sql, /ON CONFLICT \(vendor, path\)/);
  assert.match(queryCalls[0]!.sql, /IS DISTINCT FROM/);
  assert.equal(queryCalls[0]!.params.length, 6);
  assert.deepEqual(queryCalls[0]!.params, ["alloydb", "/docs/x", "body", "h1", null, null]);
});

test("upsertVendorPage returns false when rowCount is 0", async () => {
  queryCalls = [];
  poolConstructions = 0;
  poolEnds = 0;
  __setPoolFactoryForTests(
    () =>
      ({
        async query() {
          return { rowCount: 0, rows: [] };
        },
        async end() {},
      }) as never,
  );
  process.env.ALLOYDB_DATABASE_URL = "postgresql://postgres:postgres@localhost:5433/postgres";
  const wrote = await upsertVendorPage({ vendor: "v", path: "/p", content: "c", content_hash: "h" });
  assert.equal(wrote, false);
});

test("upsertVendorPage forwards etag and last_modified", async () => {
  installStub();
  process.env.ALLOYDB_DATABASE_URL = "postgresql://postgres:postgres@localhost:5433/postgres";
  await upsertVendorPage({
    vendor: "v",
    path: "/p",
    content: "c",
    content_hash: "h",
    etag: 'W/"abc"',
    last_modified: "Wed, 21 Oct 2026 07:28:00 GMT",
  });
  assert.deepEqual(queryCalls[0]!.params, ["v", "/p", "c", "h", 'W/"abc"', "Wed, 21 Oct 2026 07:28:00 GMT"]);
});

test("exec passes the raw SQL through", async () => {
  installStub();
  process.env.ALLOYDB_DATABASE_URL = "postgresql://postgres:postgres@localhost:5433/postgres";
  await exec("CREATE TABLE t (id int)");
  assert.equal(queryCalls.length, 1);
  assert.equal(queryCalls[0]!.sql, "CREATE TABLE t (id int)");
});

test("pool is cached across calls", async () => {
  installStub();
  process.env.ALLOYDB_DATABASE_URL = "postgresql://postgres:postgres@localhost:5433/postgres";
  await upsertVendorPage({ vendor: "v", path: "/p", content: "c", content_hash: "h" });
  await upsertVendorPage({ vendor: "v", path: "/p2", content: "c2", content_hash: "h2" });
  assert.equal(poolConstructions, 1);
  assert.equal(queryCalls.length, 2);
});

test("pool re-keys when ALLOYDB_DATABASE_URL changes", async () => {
  installStub();
  process.env.ALLOYDB_DATABASE_URL = "postgresql://postgres:postgres@localhost:5433/a";
  await upsertVendorPage({ vendor: "v", path: "/p", content: "c", content_hash: "h" });
  process.env.ALLOYDB_DATABASE_URL = "postgresql://postgres:postgres@localhost:5433/b";
  await upsertVendorPage({ vendor: "v", path: "/p", content: "c", content_hash: "h" });
  assert.equal(poolConstructions, 2);
  assert.equal(poolEnds, 1);
});

test("close ends and clears the pool", async () => {
  installStub();
  process.env.ALLOYDB_DATABASE_URL = "postgresql://postgres:postgres@localhost:5433/postgres";
  await upsertVendorPage({ vendor: "v", path: "/p", content: "c", content_hash: "h" });
  await close();
  await upsertVendorPage({ vendor: "v", path: "/p", content: "c", content_hash: "h" });
  assert.equal(poolConstructions, 2);
  assert.equal(poolEnds, 1);
});

test("missing ALLOYDB_DATABASE_URL throws on query", async () => {
  installStub();
  delete process.env.ALLOYDB_DATABASE_URL;
  await assert.rejects(
    () => upsertVendorPage({ vendor: "v", path: "/p", content: "c", content_hash: "h" }),
    /ALLOYDB_DATABASE_URL is not set/,
  );
});

function canReach(host: string, port: number, timeoutMs = 500): Promise<boolean> {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    const done = (ok: boolean) => {
      socket.destroy();
      resolve(ok);
    };
    socket.setTimeout(timeoutMs);
    socket.once("connect", () => done(true));
    socket.once("timeout", () => done(false));
    socket.once("error", () => done(false));
    socket.connect(port, host);
  });
}

test("integration: round-trip a VendorPageRow against localhost:5433", async (t) => {
  __setPoolFactoryForTests(null);
  const url =
    process.env.ALLOYDB_DATABASE_URL ??
    `postgresql://postgres:${process.env.ALLOYDB_OMNI_PASSWORD ?? "alloydb"}@localhost:5433/postgres`;
  const u = new URL(url);
  const reachable = await canReach(u.hostname, Number(u.port || 5432));
  if (!reachable) {
    t.skip(`AlloyDB Omni not reachable at ${u.hostname}:${u.port}; skipping integration round-trip`);
    return;
  }

  process.env.ALLOYDB_DATABASE_URL = url;
  try {
    // Connect-probe first: a listening socket with mismatched auth/db
    // setup (different POSTGRES_PASSWORD than this env expects) is a
    // skip, not a failure — CI (no container) and mis-credentialed
    // local runs both stay green. Mocked unit tests above are the gate.
    await exec("SELECT 1");

    await exec(`
      CREATE TABLE IF NOT EXISTS vendor_pages (
        vendor text NOT NULL,
        path text NOT NULL,
        content text NOT NULL,
        content_hash text NOT NULL,
        etag text,
        last_modified text,
        updated_at timestamptz NOT NULL DEFAULT now(),
        PRIMARY KEY (vendor, path)
      );
    `);
    const row = {
      vendor: "alloydb-it",
      path: "/it/roundtrip",
      content: "hello",
      content_hash: "rt-" + Date.now(),
    };
    const first = await upsertVendorPage(row);
    assert.equal(first, true);
    const second = await upsertVendorPage(row);
    assert.equal(second, false);
  } catch (err) {
    const e = err as { code?: string; message?: string };
    const connErr =
      e.code === "28P01" || e.code === "ECONNREFUSED" || e.code === "3D000" || /auth|connect|ECONN|password/i.test(e.message ?? "");
    if (!connErr) throw err;
    t.skip(`AlloyDB Omni at ${u.hostname}:${u.port} not usable (${e.message}); skipping round-trip`);
  } finally {
    await close().catch(() => {});
  }
});
