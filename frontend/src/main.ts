// frontend/src/main.ts
//
// Phase 13.B+ (O7). Bootstraps the outcomesdk.com page:
//   1. Start the ASCII art animation in the top half.
//   2. Load /vendor-manifest.json, hydrate the accordion in the bottom half.

import { startAsciiArt } from "./ascii-art.js";
import { Accordion } from "./accordion.js";
import { loadManifest, loadVendorPage } from "./vendor-loader.js";

async function main(): Promise<void> {
  const asciiEl = document.getElementById("ascii") as HTMLPreElement | null;
  if (asciiEl) startAsciiArt(asciiEl);

  const accordionRoot = document.getElementById("accordion") as HTMLDivElement | null;
  const loadingEl = document.getElementById("accordion-loading") as HTMLDivElement | null;
  if (!accordionRoot) return;

  const accordion = new Accordion(accordionRoot);

  try {
    const manifest = await loadManifest();
    // Take the first page per vendor — keeps the initial accordion
    // small. Users can deep-link via the URL hash later (out of scope
    // for the first cut).
    const seen = new Set<string>();
    for (const entry of manifest.pages) {
      if (seen.has(entry.vendor)) continue;
      seen.add(entry.vendor);
      const html = await loadVendorPage(entry.vendor, entry.path);
      accordion.addSection(entry.title, html, entry.vendor);
    }
    accordion.measure(Math.max(280, accordionRoot.clientWidth - 16));
    accordion.render();
    if (loadingEl) loadingEl.remove();
    accordionRoot.hidden = false;
  } catch (err) {
    if (loadingEl) {
      loadingEl.textContent = `failed to load vendor manifest: ${(err as Error).message}`;
    }
  }
}

void main();
