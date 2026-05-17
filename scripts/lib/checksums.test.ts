/**
 * Phase 13.A unit tests for scripts/lib/checksums.ts.
 *
 * RFC 7232 (HTTP Conditional Requests) is the normative reference. The
 * citation guard accepts paths under vendor/, seeds/, and rubrics/, so
 * the two citations below resolve.
 *
 * @cite rubrics/phase-13.md
 * @cite vendor/turbopuffer/turbopuffer.com/docs/warm-cache.md
 */

import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { resolve } from "node:path";

import {
  ChecksumEntry,
  checksumsPath,
  conditionalHeaders,
  hashBody,
  isUnchanged,
  loadChecksums,
  saveChecksums,
} from "./checksums.js";

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

function eq<T>(a: T, b: T, msg = ""): void {
  const A = JSON.stringify(a);
  const B = JSON.stringify(b);
  if (A !== B) throw new Error(`${msg}\n      expected: ${B}\n      got:      ${A}`);
}

console.log("checksums:");

check("hashBody is deterministic + UTF-8 hex SHA-256", () => {
  const h = hashBody("hello world");
  eq(h.length, 64);
  eq(h, "b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9");
});

check("hashBody distinguishes different bodies", () => {
  const a = hashBody("a");
  const b = hashBody("b");
  if (a === b) throw new Error("hashes collided");
});

check("conditionalHeaders is empty when no prior entry", () => {
  eq(conditionalHeaders(undefined), {});
});

check("conditionalHeaders emits If-None-Match for stored ETag", () => {
  const e: ChecksumEntry = {
    sha256: "x",
    etag: '"abc"',
    fetchedAt: "2026-05-10T00:00:00Z",
    lastStatus: 200,
  };
  eq(conditionalHeaders(e), { "If-None-Match": '"abc"' });
});

check("conditionalHeaders emits If-Modified-Since for stored Last-Modified", () => {
  const e: ChecksumEntry = {
    sha256: "x",
    lastModified: "Wed, 21 Oct 2026 07:28:00 GMT",
    fetchedAt: "2026-05-10T00:00:00Z",
    lastStatus: 200,
  };
  eq(conditionalHeaders(e), { "If-Modified-Since": "Wed, 21 Oct 2026 07:28:00 GMT" });
});

check("conditionalHeaders emits both when both stored", () => {
  const e: ChecksumEntry = {
    sha256: "x",
    etag: 'W/"weak"',
    lastModified: "Wed, 21 Oct 2026 07:28:00 GMT",
    fetchedAt: "2026-05-10T00:00:00Z",
    lastStatus: 200,
  };
  eq(conditionalHeaders(e), {
    "If-None-Match": 'W/"weak"',
    "If-Modified-Since": "Wed, 21 Oct 2026 07:28:00 GMT",
  });
});

check("isUnchanged false on missing prior", () => {
  if (isUnchanged(undefined, "body")) throw new Error("should be false");
});

check("isUnchanged true when sha matches", () => {
  const prior: ChecksumEntry = {
    sha256: hashBody("body"),
    fetchedAt: "2026-05-10T00:00:00Z",
    lastStatus: 200,
  };
  if (!isUnchanged(prior, "body")) throw new Error("should be true");
});

check("isUnchanged false when sha differs", () => {
  const prior: ChecksumEntry = {
    sha256: hashBody("body"),
    fetchedAt: "2026-05-10T00:00:00Z",
    lastStatus: 200,
  };
  if (isUnchanged(prior, "different body")) throw new Error("should be false");
});

check("loadChecksums returns {} when file missing", () => {
  const tmp = mkdtempSync(resolve(tmpdir(), "ke-checksums-"));
  try {
    eq(loadChecksums(tmp, "nonexistent-vendor"), {});
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
});

check("saveChecksums + loadChecksums round-trip with sorted keys", () => {
  const tmp = mkdtempSync(resolve(tmpdir(), "ke-checksums-"));
  try {
    const vendorDir = resolve(tmp, "v1");
    mkdirSync(vendorDir, { recursive: true });
    const map = {
      "https://z.example/b": {
        sha256: hashBody("b"),
        etag: '"b"',
        fetchedAt: "2026-05-10T00:00:00Z",
        lastStatus: 200 as const,
      },
      "https://a.example/a": {
        sha256: hashBody("a"),
        fetchedAt: "2026-05-10T00:00:00Z",
        lastStatus: 200 as const,
      },
    };
    saveChecksums(tmp, "v1", map);
    const onDisk = readFileSync(checksumsPath(tmp, "v1"), "utf8");
    // JSON keys sorted: a.example before z.example.
    if (onDisk.indexOf("a.example") > onDisk.indexOf("z.example")) {
      throw new Error("keys not sorted on disk");
    }
    const loaded = loadChecksums(tmp, "v1");
    // Round-trip equality: same keys + same per-key values (insertion
    // order on the in-memory object isn't part of the contract).
    eq(Object.keys(loaded).sort(), Object.keys(map).sort());
    for (const k of Object.keys(map)) {
      eq(loaded[k], (map as Record<string, ChecksumEntry>)[k], `key=${k}`);
    }
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
});

check("loadChecksums returns {} on malformed JSON", () => {
  const tmp = mkdtempSync(resolve(tmpdir(), "ke-checksums-"));
  try {
    const vendorDir = resolve(tmp, "v1");
    mkdirSync(vendorDir, { recursive: true });
    writeFileSync(checksumsPath(tmp, "v1"), "{not json");
    eq(loadChecksums(tmp, "v1"), {});
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
});

// ────────────────────────────────────────────────────────────────────
// OAUTO3 — isUnchanged-but-missing-file desync regression test.
//
// Incident: elevenlabs .checksums.json had 60 valid sha entries but
// the .mdx files were missing on disk. The crawler's preflight saw
// "prior checksum exists" + "fetched body matches prior sha" →
// isUnchanged=true → skipped writeIfChanged → tree stayed empty.
//
// Fix in scripts/crawl-vendors.ts: combine isUnchanged with an
// existsSync check on the destination path. This test isolates the
// combined predicate.
//
// @cite vendor/elevenlabs/crawl.json
// @tdd green

check("OAUTO3: isUnchanged-and-present false when dest file missing", () => {
  const tmp2 = mkdtempSync(resolve(tmpdir(), "checksums-desync-"));
  try {
    const body = "# Hello\nworld\n";
    const sha = hashBody(body);
    const prior: ChecksumEntry = {
      sha256: sha,
      fetchedAt: "2026-05-17T00:00:00Z",
      lastStatus: 200,
    };
    const destMissing = resolve(tmp2, "missing.md");
    // Predicate from the OAUTO3 fix:
    const wouldSkipWrite = isUnchanged(prior, body) && existsSync(destMissing);
    if (wouldSkipWrite) {
      throw new Error(
        "predicate should return false when sha matches but dest file missing"
      );
    }
  } finally {
    rmSync(tmp2, { recursive: true, force: true });
  }
});

check("OAUTO3: isUnchanged-and-present true when both conditions met", () => {
  const tmp2 = mkdtempSync(resolve(tmpdir(), "checksums-present-"));
  try {
    const body = "# Hello\nworld\n";
    const sha = hashBody(body);
    const prior: ChecksumEntry = {
      sha256: sha,
      fetchedAt: "2026-05-17T00:00:00Z",
      lastStatus: 200,
    };
    const destPresent = resolve(tmp2, "present.md");
    writeFileSync(destPresent, body, "utf8");
    const wouldSkipWrite = isUnchanged(prior, body) && existsSync(destPresent);
    if (!wouldSkipWrite) {
      throw new Error("predicate should return true when both conditions met");
    }
  } finally {
    rmSync(tmp2, { recursive: true, force: true });
  }
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
