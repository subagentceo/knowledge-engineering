// src/lib/docs-fetch.ts
//
// Normalize any code.claude.com / claude.com / platform.claude.com docs URL
// to its raw-markdown twin (.md) before fetching. Reject HTML responses.
// Stamp every result with last_fetched so callers can cite it.

import { z } from "zod";

const DOC_HOSTS = new Set([
  "code.claude.com",
  "claude.com",
  "platform.claude.com",
]);

export class DocsFetchError extends Error {}

export const FetchedDoc = z.object({
  url: z.string().url(),         // the .md URL actually fetched
  source_url: z.string().url(),  // the original (possibly HTML) URL the user asked for
  body: z.string().min(1),
  last_fetched: z.string().datetime(),
  etag: z.string().optional(),
});
export type FetchedDoc = z.infer<typeof FetchedDoc>;

/** Convert a docs URL to its `.md` form. Throws on hosts we don't trust. */
export function toMarkdownUrl(input: string): string {
  const u = new URL(input);
  if (!DOC_HOSTS.has(u.hostname)) {
    throw new DocsFetchError(
      `[docs-fetch] refusing non-docs host: ${u.hostname}. ` +
        `Allowed: ${[...DOC_HOSTS].join(", ")}`
    );
  }
  // llms.txt is already raw; pass through
  if (u.pathname.endsWith("/llms.txt")) return u.toString();
  if (u.pathname.endsWith(".md")) return u.toString();
  // strip trailing slash, append .md
  u.pathname = u.pathname.replace(/\/$/, "") + ".md";
  u.hash = "";
  return u.toString();
}

const cache = new Map<string, FetchedDoc>();

export async function fetchDoc(input: string): Promise<FetchedDoc> {
  const mdUrl = toMarkdownUrl(input);
  const cached = cache.get(mdUrl);
  const headers: Record<string, string> = { Accept: "text/markdown, text/plain" };
  if (cached?.etag) headers["If-None-Match"] = cached.etag;

  const res = await fetch(mdUrl, { headers });
  if (res.status === 304 && cached) return cached;
  if (!res.ok) {
    throw new DocsFetchError(`[docs-fetch] ${res.status} fetching ${mdUrl}`);
  }
  const ct = res.headers.get("content-type") ?? "";
  if (ct.includes("text/html")) {
    throw new DocsFetchError(
      `[docs-fetch] ${mdUrl} returned text/html. Refusing to ingest rendered HTML.`
    );
  }
  const body = await res.text();
  const doc: FetchedDoc = FetchedDoc.parse({
    url: mdUrl,
    source_url: input,
    body,
    last_fetched: new Date().toISOString(),
    etag: res.headers.get("etag") ?? undefined,
  });
  cache.set(mdUrl, doc);
  return doc;
}
