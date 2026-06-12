// frontend/src/vendor-loader.ts
//
// Phase 13.B+ (O7). Fetch vendor markdown from /vendor/<vendor>/<path>.md
// (served by Workers Static Assets) and render to safe HTML via marked +
// DOMPurify. The page manifest at /vendor-manifest.json (built at build
// time by scripts/build-vendor-manifest.ts) lists available pages.

import createDOMPurify from "dompurify";
import { marked } from "marked";

// DOMPurify ships as a factory in Node and a singleton in browsers.
// In the browser the global `window` exists; tests inject a jsdom
// window via `setPurifierWindow()` (see tests/setup-jsdom.ts) so
// production bundles never need to know about jsdom.
let purifier: ReturnType<typeof createDOMPurify> | null = null;

export function setPurifierWindow(win: unknown): void {
  purifier = createDOMPurify(win as Parameters<typeof createDOMPurify>[0]);
}

function getPurifier(): ReturnType<typeof createDOMPurify> {
  if (purifier !== null) return purifier;
  if (typeof window !== "undefined") {
    purifier = createDOMPurify(window as unknown as Parameters<typeof createDOMPurify>[0]);
    return purifier;
  }
  throw new Error("vendor-loader: no DOM available — call setPurifierWindow() before renderMarkdown()");
}

export interface VendorManifestEntry {
  vendor: string;
  path: string;
  title: string;
}

export interface VendorManifest {
  generated_at: string;
  pages: VendorManifestEntry[];
}

export async function loadManifest(): Promise<VendorManifest> {
  const r = await fetch("/vendor-manifest.json", { headers: { Accept: "application/json" } });
  if (!r.ok) throw new Error(`vendor-manifest.json HTTP ${r.status}`);
  return (await r.json()) as VendorManifest;
}

export async function loadVendorPage(vendor: string, path: string): Promise<string> {
  const r = await fetch(`/vendor/${vendor}/${path}`, {
    headers: { Accept: "text/markdown, text/plain" },
  });
  if (!r.ok) throw new Error(`vendor page ${vendor}/${path} HTTP ${r.status}`);
  const md = await r.text();
  return renderMarkdown(md); // sync once getPurifier is bound
}

export function renderMarkdown(md: string): string {
  marked.setOptions({ async: false, breaks: false, gfm: true });
  const html = marked.parse(md) as string;
  const dom = getPurifier();
  return dom.sanitize(html, {
    USE_PROFILES: { html: true },
    FORBID_TAGS: ["script", "iframe", "object", "embed"],
    FORBID_ATTR: ["onerror", "onload", "onclick"],
  });
}
