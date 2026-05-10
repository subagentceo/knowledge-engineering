/**
 * vendor-mirror — runtime URL → local-mirror file resolver.
 *
 * Companion to vendor-manifests.ts. Returns the file body for an
 * allowlisted URL if the body exists on disk; null otherwise (callers
 * fall back to live HTTP via bridge-utils.ts).
 *
 * Citations:
 *   @cite seeds/posture/session-start.xml
 *   @cite seeds/citations/connectors-building.md
 */
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

import { loadVendorManifests, vendorRoot } from "./vendor-manifests.js";

export interface MirrorHit {
  vendor: string;
  url: string;
  relPath: string;
  body: string;
  source: "mirror";
}

/**
 * Look up a URL in any vendor manifest. Returns a MirrorHit on disk,
 * or null if the URL isn't in any allowlist OR the body file doesn't
 * exist locally.
 */
export function vendorMirror(url: string): MirrorHit | null {
  for (const [vendor, manifest] of loadVendorManifests()) {
    const relPath = manifest.byUrl.get(url);
    if (!relPath) continue;
    const path = resolve(vendorRoot(), vendor, relPath);
    if (!existsSync(path)) return null;
    const body = readFileSync(path, "utf8");
    return { vendor, url, relPath, body, source: "mirror" };
  }
  return null;
}

/**
 * Reverse lookup — given a vendor + relPath, reconstruct the URL.
 * Used by vendor_grep to surface hit locations as URLs.
 */
export function urlFor(vendor: string, relPath: string): string | undefined {
  const manifest = loadVendorManifests().get(vendor);
  if (!manifest) return undefined;
  for (const [u, p] of manifest.byUrl) {
    if (p === relPath) return u;
  }
  return undefined;
}
