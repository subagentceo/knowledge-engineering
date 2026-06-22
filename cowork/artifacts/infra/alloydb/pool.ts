/**
 * infra/alloydb/pool.ts
 * pg Pool for AlloyDB Omni (PostgreSQL 18 wire protocol)
 * Separate from the Google Cloud admin client in client.ts
 */

import { Pool, type PoolConfig } from "pg";
import { ALLOYDB_OMNI_CONFIGS, type AlloyDBOmniConfig } from "./client.js";

function toPoolConfig(cfg: AlloyDBOmniConfig): PoolConfig {
  return {
    host: cfg.host,
    port: cfg.port,
    database: cfg.database,
    user: cfg.user,
    password: cfg.password,
    ssl: cfg.ssl ? { rejectUnauthorized: false } : false,
    max: Number(process.env.ALLOYDB_POOL_MAX ?? 10),
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 5_000,
  };
}

function makePool(): Pool {
  const env = process.env.NODE_ENV ?? "development";
  const cfg =
    env === "production"
      ? ALLOYDB_OMNI_CONFIGS.cloudManaged(process.env.ALLOYDB_HOST ?? "")
      : process.env.ALLOYDB_HOST === "alloydb-omni"
        ? ALLOYDB_OMNI_CONFIGS.dockerCompose()
        : ALLOYDB_OMNI_CONFIGS.localDocker();
  return new Pool(toPoolConfig(cfg));
}

export const pool = makePool();

pool.on("error", (err: Error) => {
  console.error("[alloydb-pool] idle client error:", err.message);
});
