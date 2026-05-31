/**
 * SCRUM-34 — AlloyDB-local per-PR branching, the data-plane replacement
 * for the Neon copy-on-write branch-per-PR flow.
 *
 * Asserts:
 *   - CREATE/DROP DDL is built correctly (TEMPLATE clone + DROP ... WITH (FORCE)).
 *   - db-name derivation from PR number is deterministic and injection-safe
 *     (non-integer prNumber is rejected before reaching SQL).
 *   - the ALLOYDB_DATABASE_URL enabled-gate (isEnabled + create/drop throw
 *     when unset) — mirrors the neon-client no-op-when-unset posture.
 *   - the pg client is mocked: connect → query(sql) → end is invoked in order.
 *
 * @tdd green
 * @cite seeds/citations/neon-branching.md
 * @cite rubrics/phase-13.md
 */
import {
  prBranchDbName,
  createPrBranchSql,
  dropPrBranchSql,
  isEnabled,
  createPrBranch,
  dropPrBranch,
  type PgClientLike,
  type PgClientFactory,
} from "./alloydb-branch.js";

let passed = 0;
let failed = 0;

function check(name: string, fn: () => void | Promise<void>): Promise<void> {
  return Promise.resolve()
    .then(fn)
    .then(() => {
      passed += 1;
      console.log(`  ✓ ${name}`);
    })
    .catch((err) => {
      failed += 1;
      console.error(`  ✗ ${name}`);
      console.error(`    ${(err as Error).message}`);
    });
}

function assertEqual(actual: unknown, expected: unknown, msg?: string): void {
  if (actual !== expected) {
    throw new Error(msg ?? `expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }
}

function assertThrows(fn: () => unknown, re: RegExp): void {
  try {
    fn();
  } catch (err) {
    if (!re.test((err as Error).message)) {
      throw new Error(`error message ${JSON.stringify((err as Error).message)} did not match ${re}`);
    }
    return;
  }
  throw new Error(`expected throw matching ${re}, but no error was raised`);
}

async function assertRejects(p: Promise<unknown>, re: RegExp): Promise<void> {
  try {
    await p;
  } catch (err) {
    if (!re.test((err as Error).message)) {
      throw new Error(`rejection ${JSON.stringify((err as Error).message)} did not match ${re}`);
    }
    return;
  }
  throw new Error(`expected rejection matching ${re}, but promise resolved`);
}

interface MockClient extends PgClientLike {
  calls: string[];
  events: string[];
}

function mockFactory(): { factory: PgClientFactory; client: MockClient } {
  const client: MockClient = {
    calls: [],
    events: [],
    async connect() {
      this.events.push("connect");
    },
    async query(sql: string) {
      this.calls.push(sql);
      this.events.push("query");
      return { rowCount: 1 };
    },
    async end() {
      this.events.push("end");
    },
  };
  return { factory: () => client, client };
}

console.log("lib/alloydb-branch.ts:");

await check("db-name is deterministic for a given PR number", () => {
  assertEqual(prBranchDbName(42), "keng_pr_42");
  assertEqual(prBranchDbName(42), prBranchDbName(42));
});

await check("db-name rejects non-integer / injection-shaped PR numbers", () => {
  assertThrows(() => prBranchDbName(1.5), /positive integer/);
  assertThrows(() => prBranchDbName(0), /positive integer/);
  assertThrows(() => prBranchDbName(-3), /positive integer/);
  assertThrows(() => prBranchDbName(NaN), /positive integer/);
  assertThrows(() => prBranchDbName("7; DROP DATABASE x" as unknown as number), /positive integer/);
});

await check("createPrBranchSql builds a TEMPLATE clone", () => {
  assertEqual(createPrBranchSql(7, "template0"), "CREATE DATABASE keng_pr_7 TEMPLATE template0");
  assertEqual(createPrBranchSql(7, "keng_base"), "CREATE DATABASE keng_pr_7 TEMPLATE keng_base");
});

await check("dropPrBranchSql is idempotent + force-terminates sessions", () => {
  assertEqual(dropPrBranchSql(7), "DROP DATABASE IF EXISTS keng_pr_7 WITH (FORCE)");
});

await check("isEnabled reflects ALLOYDB_DATABASE_URL presence", () => {
  assertEqual(isEnabled({}), false);
  assertEqual(isEnabled({ ALLOYDB_DATABASE_URL: "" }), false);
  assertEqual(isEnabled({ ALLOYDB_DATABASE_URL: "postgres://h:5433/postgres" }), true);
});

await check("createPrBranch runs CREATE on the mocked client and returns a scoped connection string", async () => {
  const { factory, client } = mockFactory();
  const env = { ALLOYDB_DATABASE_URL: "postgres://admin:pw@localhost:5433/postgres" };
  const branch = await createPrBranch(101, env, factory);
  assertEqual(branch.dbName, "keng_pr_101");
  assertEqual(branch.connectionString, "postgres://admin:pw@localhost:5433/keng_pr_101");
  assertEqual(client.calls[0], "CREATE DATABASE keng_pr_101 TEMPLATE template0");
  assertEqual(client.events.join(","), "connect,query,end");
});

await check("createPrBranch honours ALLOYDB_TEMPLATE_DB override", async () => {
  const { factory, client } = mockFactory();
  const env = {
    ALLOYDB_DATABASE_URL: "postgres://localhost:5433/postgres",
    ALLOYDB_TEMPLATE_DB: "keng_seed",
  };
  await createPrBranch(5, env, factory);
  assertEqual(client.calls[0], "CREATE DATABASE keng_pr_5 TEMPLATE keng_seed");
});

await check("dropPrBranch runs DROP on the mocked client", async () => {
  const { factory, client } = mockFactory();
  const env = { ALLOYDB_DATABASE_URL: "postgres://localhost:5433/postgres" };
  await dropPrBranch(101, env, factory);
  assertEqual(client.calls[0], "DROP DATABASE IF EXISTS keng_pr_101 WITH (FORCE)");
  assertEqual(client.events.join(","), "connect,query,end");
});

await check("create/drop fail closed when ALLOYDB_DATABASE_URL is unset", async () => {
  const { factory } = mockFactory();
  await assertRejects(createPrBranch(1, {}, factory), /ALLOYDB_DATABASE_URL is not set/);
  await assertRejects(dropPrBranch(1, {}, factory), /ALLOYDB_DATABASE_URL is not set/);
});

await check("client is always ended even when query rejects", async () => {
  const events: string[] = [];
  const factory: PgClientFactory = () => ({
    async connect() {
      events.push("connect");
    },
    async query() {
      events.push("query");
      throw new Error("boom");
    },
    async end() {
      events.push("end");
    },
  });
  await assertRejects(
    createPrBranch(9, { ALLOYDB_DATABASE_URL: "postgres://localhost:5433/postgres" }, factory),
    /boom/
  );
  assertEqual(events.join(","), "connect,query,end");
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
