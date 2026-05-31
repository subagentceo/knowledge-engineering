/**
 * AlloyDB-local per-PR database isolation — the data-plane replacement for
 * the Neon copy-on-write branch-per-PR flow (SCRUM-34).
 *
 * AlloyDB Omni has no Neon-style branch API. We get equivalent per-PR
 * isolation with Postgres `CREATE DATABASE <name> TEMPLATE <base>`: the
 * template clone is a physical file copy of the base catalog, fast enough
 * on an 8-CPU host to run many parallel test databases cheaply.
 *
 * Public shape mirrors the Neon branch-per-PR equivalent so callers swap
 * by config (DATA_PLANE) rather than code:
 *   - createPrBranch(prNumber) -> { dbName, connectionString }
 *   - dropPrBranch(prNumber)
 *
 * Pure SQL-builders + a thin pg exec gated on ALLOYDB_DATABASE_URL.
 */

const DB_NAME_PREFIX = "keng_pr_";

// WHY: db names are interpolated into DDL that cannot be parameterized
// (CREATE/DROP DATABASE take identifiers, not bind params). Forcing
// prNumber through an integer parse closes the injection vector at the edge.
function assertInteger(prNumber: number): number {
  if (!Number.isInteger(prNumber) || prNumber <= 0) {
    throw new Error(`prNumber must be a positive integer, got: ${String(prNumber)}`);
  }
  return prNumber;
}

export function prBranchDbName(prNumber: number): string {
  return `${DB_NAME_PREFIX}${assertInteger(prNumber)}`;
}

export function createPrBranchSql(prNumber: number, templateDb: string): string {
  const dbName = prBranchDbName(prNumber);
  return `CREATE DATABASE ${dbName} TEMPLATE ${templateDb}`;
}

export function dropPrBranchSql(prNumber: number): string {
  const dbName = prBranchDbName(prNumber);
  // WITH (FORCE) terminates lingering sessions so cleanup never hangs on
  // a held connection from a crashed test run.
  return `DROP DATABASE IF EXISTS ${dbName} WITH (FORCE)`;
}

export function isEnabled(env: NodeJS.ProcessEnv = process.env): boolean {
  return typeof env.ALLOYDB_DATABASE_URL === "string" && env.ALLOYDB_DATABASE_URL.length > 0;
}

function templateDbName(env: NodeJS.ProcessEnv): string {
  return env.ALLOYDB_TEMPLATE_DB ?? "template0";
}

function connectionStringFor(dbName: string, baseUrl: string): string {
  const url = new URL(baseUrl);
  url.pathname = `/${dbName}`;
  return url.toString();
}

export interface PgClientLike {
  connect(): Promise<void>;
  query(sql: string): Promise<unknown>;
  end(): Promise<void>;
}

export type PgClientFactory = (connectionString: string) => PgClientLike;

const defaultClientFactory: PgClientFactory = (connectionString) => {
  // Lazy so `pg` is only required when the AlloyDB data plane is active.
  // Synchronous-shaped wrapper that defers the dynamic import to connect().
  let inner: PgClientLike | undefined;
  return {
    async connect() {
      const { Client } = await import("pg");
      inner = new Client({ connectionString }) as unknown as PgClientLike;
      await inner.connect();
    },
    async query(sql: string) {
      if (!inner) throw new Error("connect() must be called before query()");
      return inner.query(sql);
    },
    async end() {
      if (inner) await inner.end();
    },
  };
};

async function withAdminClient<T>(
  baseUrl: string,
  factory: PgClientFactory,
  fn: (client: PgClientLike) => Promise<T>
): Promise<T> {
  const client = factory(baseUrl);
  await client.connect();
  try {
    return await fn(client);
  } finally {
    await client.end();
  }
}

export interface PrBranch {
  dbName: string;
  connectionString: string;
}

function requireBaseUrl(env: NodeJS.ProcessEnv): string {
  const baseUrl = env.ALLOYDB_DATABASE_URL;
  if (!baseUrl) {
    throw new Error("ALLOYDB_DATABASE_URL is not set — AlloyDB data plane is disabled");
  }
  return baseUrl;
}

export async function createPrBranch(
  prNumber: number,
  env: NodeJS.ProcessEnv = process.env,
  factory: PgClientFactory = defaultClientFactory
): Promise<PrBranch> {
  const baseUrl = requireBaseUrl(env);
  const dbName = prBranchDbName(prNumber);
  const sql = createPrBranchSql(prNumber, templateDbName(env));
  await withAdminClient(baseUrl, factory, (client) => client.query(sql));
  return { dbName, connectionString: connectionStringFor(dbName, baseUrl) };
}

export async function dropPrBranch(
  prNumber: number,
  env: NodeJS.ProcessEnv = process.env,
  factory: PgClientFactory = defaultClientFactory
): Promise<void> {
  const baseUrl = requireBaseUrl(env);
  const sql = dropPrBranchSql(prNumber);
  await withAdminClient(baseUrl, factory, (client) => client.query(sql));
}
