/**
 * @tdd green
 * @cite seeds/ecosystem/artifacts.json
 * @cite seeds/citations/define-outcomes.md
 *
 * The EcosystemCatalog Redis object (src/cache/ecosystem-catalog.ts) +
 * its projection to dw.dim_ecosystem_artifact.
 */

import assert from "node:assert/strict";
import { test } from "node:test";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  EcosystemCatalog,
  EcosystemArtifactSchema,
  ecosystemCacheKey,
} from "../cache/ecosystem-catalog.js";

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
const SEED = resolve(REPO_ROOT, "seeds", "ecosystem", "artifacts.json");

test("the shipped seed parses and every artifact validates", () => {
  const seed = JSON.parse(readFileSync(SEED, "utf8")) as { artifacts: unknown[] };
  const catalog = EcosystemCatalog.fromSeed(seed);
  assert.ok(catalog.artifacts.length >= 30);
  for (const a of catalog.artifacts) EcosystemArtifactSchema.parse(a);
});

test("all four orgs + npm scopes are represented", () => {
  const catalog = EcosystemCatalog.fromSeed(
    JSON.parse(readFileSync(SEED, "utf8")) as { artifacts: unknown[] },
  );
  const orgs = new Set(catalog.byOrg().keys());
  for (const o of ["anthropics", "modelcontextprotocol", "safety-research", "redis", "anthropic-ai"]) {
    assert.ok(orgs.has(o), `missing org ${o}`);
  }
});

test("cache key is deterministic ke:ecosystem:<org>/<name>", () => {
  assert.equal(
    ecosystemCacheKey({ org: "redis", name: "go-redis" }),
    "ke:ecosystem:redis/go-redis",
  );
});

test("constructor dedupes on (org, name, kind), last write wins", () => {
  const base = {
    org: "redis", name: "redis", kind: "repo", lang: "C", license: "Other",
    description: "old", url: "https://github.com/redis/redis",
    source_page: "https://github.com/orgs/redis/repositories",
  };
  const catalog = new EcosystemCatalog([base, { ...base, description: "new" }]);
  assert.equal(catalog.artifacts.length, 1);
  assert.equal(catalog.artifacts[0]?.description, "new");
});

test("toDimColumns returns aligned positional arrays", () => {
  const catalog = EcosystemCatalog.fromSeed(
    JSON.parse(readFileSync(SEED, "utf8")) as { artifacts: unknown[] },
  );
  const c = catalog.toDimColumns();
  const n = catalog.artifacts.length;
  for (const col of [c.org, c.name, c.kind, c.lang, c.license, c.description, c.url, c.stars, c.source_page]) {
    assert.equal(col.length, n);
  }
  // npm rows carry a null lang; repo rows carry a string.
  const redisRedis = catalog.artifacts.findIndex((a) => a.org === "redis" && a.name === "redis");
  assert.equal(c.kind[redisRedis], "repo");
});

test("invalid artifact (bad url / bad kind) is rejected", () => {
  assert.throws(() => new EcosystemCatalog([
    { org: "x", name: "y", kind: "repo", lang: null, license: null, description: null, url: "not-a-url", source_page: "https://example.com" },
  ]));
  assert.throws(() => new EcosystemCatalog([
    { org: "x", name: "y", kind: "wat", lang: null, license: null, description: null, url: "https://example.com", source_page: "https://example.com" },
  ]));
});
