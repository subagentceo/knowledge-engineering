// scripts/lib/url-to-path.ts
//
// Phase 1.A. Pure URL → mirror-path resolver. Deterministic and reversible.
// Maps any allowlisted vendor URL to a stable file path under
//   vendor/<vendor-name>/<host>/<path-segments>.md
//
// Citations:
//   @cite seeds/posture/session-start.xml         (host .md-first hard rules)
//   @cite seeds/prompts/operator-2026-05-10.md    (working agreement)
//
// No I/O, no fetches, no side effects. The mirror-write side is
// scripts/crawl-vendors.ts; the runtime-read side is src/lib/vendor-mirror.ts
// (Phase 3). Both consume this module to keep path semantics unified.

export interface UrlToPathOptions {
  vendor: string;
}

export interface UrlToPathResult {
  /** Final path segments after the vendor root (e.g. ["docs.stripe.com", "api", "charges.md"]). */
  segments: string[];
  /** Joined relative path (e.g. "docs.stripe.com/api/charges.md"). */
  relPath: string;
}

const KNOWN_EXT_RE = /\.[a-z0-9]+$/i;

/**
 * Resolve a URL to its mirror path under a given vendor root.
 * Path semantics:
 *   - Host becomes the first segment.
 *   - Each non-empty path segment maps verbatim, except:
 *     - The trailing segment gets ".md" appended if it has no extension.
 *     - A trailing "/" becomes "/index.md".
 *   - Query strings are stripped (we mirror canonical content, not search results).
 *   - Hashes are stripped.
 *
 * The function never throws on valid http(s) URLs; it returns segments
 * the caller can `resolve(repoRoot, "vendor", vendor, ...segments)`.
 */
export function urlToPath(url: string, opts: UrlToPathOptions): UrlToPathResult {
  const u = new URL(url);
  const host = u.host;

  // Trailing-slash → index.md handling. Empty pathname ("") is treated
  // as "/" (root), which becomes "index.md".
  const rawPath = u.pathname === "" ? "/" : u.pathname;
  const trailingSlash = rawPath.endsWith("/");
  const inner = rawPath.replace(/^\/+/, "").replace(/\/+$/, "");
  const innerSegments = inner === "" ? [] : inner.split("/");

  let pathSegments: string[];
  if (trailingSlash) {
    pathSegments = [...innerSegments, "index.md"];
  } else if (innerSegments.length === 0) {
    pathSegments = ["index.md"];
  } else {
    const last = innerSegments[innerSegments.length - 1];
    pathSegments = innerSegments.slice();
    if (!KNOWN_EXT_RE.test(last)) {
      pathSegments[pathSegments.length - 1] = `${last}.md`;
    }
  }

  const segments = [host, ...pathSegments];
  return { segments, relPath: segments.join("/") };
}

/**
 * Reverse: given segments produced by urlToPath, reconstruct the canonical
 * URL (https://<host>/<path-without-trailing-.md>). The trailing-slash
 * vs file disambiguation is lost (both forms collapse to a clean URL),
 * so this is "best-effort canonical" not strict round-trip.
 */
export function pathToUrl(segments: string[]): string {
  if (segments.length === 0) throw new Error("pathToUrl: empty segments");
  const [host, ...rest] = segments;
  if (rest.length === 0) return `https://${host}/`;
  const last = rest[rest.length - 1];
  const trimmed =
    last === "index.md"
      ? rest.slice(0, -1).join("/") + "/"
      : rest.join("/").replace(/\.md$/, "");
  return `https://${host}/${trimmed}`;
}
