// scripts/lib/checksums.ts
//
// Phase 13.A. Per-vendor checksum store + RFC 7232 conditional GET helper.
//
// Citations:
//   @cite https://www.rfc-editor.org/rfc/rfc7232            (If-None-Match / If-Modified-Since / 304 Not Modified)
//   @cite vendor/turbopuffer/turbopuffer.com/docs/warm-cache.md  (related skip-on-unchanged pattern)
//   @cite seeds/posture/session-start.xml                   (.md-first hard rules; transforms preserved)
//
// Disk layout: vendor/<name>/.checksums.json (gitignore-exempt).

import { createHash } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

export interface ChecksumEntry {
  /** Strong/weak ETag value verbatim (`"abc"` or `W/"abc"`). */
  etag?: string;
  /** RFC 7232 IMF-fixdate string verbatim. */
  lastModified?: string;
  /** SHA-256 of the final-on-disk body (post-transform). */
  sha256: string;
  /** HTTP status of the most-recent fetch (200 or 304). */
  lastStatus: 200 | 304;
}

export type ChecksumMap = Record<string, ChecksumEntry>;

export function checksumsPath(vendorRoot: string, vendor: string): string {
  return resolve(vendorRoot, vendor, ".checksums.json");
}

export function loadChecksums(vendorRoot: string, vendor: string): ChecksumMap {
  const path = checksumsPath(vendorRoot, vendor);
  if (!existsSync(path)) return {};
  try {
    return JSON.parse(readFileSync(path, "utf8")) as ChecksumMap;
  } catch {
    return {};
  }
}

export function saveChecksums(vendorRoot: string, vendor: string, map: ChecksumMap): void {
  const path = checksumsPath(vendorRoot, vendor);
  // OBLOG.determinism D2: stable key + canonical field order. Strip any
  // legacy `fetchedAt` from prior pipeline runs so re-saving a loaded map
  // produces byte-identical output on unchanged sources.
  const sorted: ChecksumMap = {};
  for (const k of Object.keys(map).sort()) {
    const e = map[k] as ChecksumEntry & { fetchedAt?: string };
    const clean: ChecksumEntry = { sha256: e.sha256, lastStatus: e.lastStatus };
    if (e.etag !== undefined) clean.etag = e.etag;
    if (e.lastModified !== undefined) clean.lastModified = e.lastModified;
    sorted[k] = clean;
  }
  writeFileSync(path, JSON.stringify(sorted, null, 2) + "\n");
}

export function hashBody(body: string): string {
  return createHash("sha256").update(body, "utf8").digest("hex");
}

/**
 * Build the conditional-GET request headers for a URL given its prior
 * checksum entry. Returns an empty object when there's no prior entry.
 */
export function conditionalHeaders(entry: ChecksumEntry | undefined): Record<string, string> {
  if (!entry) return {};
  const h: Record<string, string> = {};
  if (entry.etag) h["If-None-Match"] = entry.etag;
  if (entry.lastModified) h["If-Modified-Since"] = entry.lastModified;
  return h;
}

export interface ConditionalFetchResult {
  /** 200 (new body), 304 (unchanged), or HTTP error. */
  status: number;
  body: string | null;
  etag: string | null;
  lastModified: string | null;
  contentType: string | null;
}

/**
 * Issue a GET with optional conditional headers. Returns the response
 * with body=null when the server replies 304 (zero-bandwidth case).
 *
 * Network errors are re-thrown — the caller decides how to record a
 * failure vs. retry.
 */
export async function conditionalFetch(
  url: string,
  prior: ChecksumEntry | undefined,
  extraHeaders: Record<string, string> = {},
): Promise<ConditionalFetchResult> {
  const headers: Record<string, string> = {
    ...extraHeaders,
    ...conditionalHeaders(prior),
  };
  const r = await fetch(url, { headers, redirect: "follow" });
  const contentType = r.headers.get("content-type");
  const etag = r.headers.get("etag");
  const lastModified = r.headers.get("last-modified");
  if (r.status === 304) {
    return { status: 304, body: null, etag, lastModified, contentType };
  }
  const body = await r.text();
  return { status: r.status, body, etag, lastModified, contentType };
}

/**
 * Decide whether a fresh 200 body is actually the same as last time.
 * Used as a fallback when the server doesn't emit ETag/Last-Modified —
 * we still avoid the disk write (preserves mtime).
 */
export function isUnchanged(prior: ChecksumEntry | undefined, newBody: string): boolean {
  if (!prior) return false;
  return prior.sha256 === hashBody(newBody);
}
