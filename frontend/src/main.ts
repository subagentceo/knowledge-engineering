// frontend/src/main.ts
//
// Phase 13.B+ (O7). Bootstraps the outcomesdk.com page:
//   1. Start the ASCII art animation in the top half.
//   2. Load /vendor-manifest.json, hydrate the accordion in the bottom half.

import { startAsciiArt } from "./ascii-art.js";
import { Accordion } from "./accordion.js";
import { loadManifest, loadVendorPage } from "./vendor-loader.js";
import { CitationsTable, loadCitations } from "./citations.js";
import { loadTableSemantics, renderWarehouse } from "./warehouse.js";
import { loadVendorStats, renderServiceStatus } from "./service-status.js";

async function hydrateServiceStatus(): Promise<void> {
  const root = document.getElementById("service-status") as HTMLDivElement | null;
  if (!root) return;
  try {
    renderServiceStatus(root, await loadVendorStats());
  } catch (err) {
    root.textContent = `failed to load vendor stats: ${(err as Error).message}`;
  }
}

async function hydrateWarehouse(): Promise<void> {
  const root = document.getElementById("warehouse") as HTMLDivElement | null;
  if (!root) return;
  try {
    renderWarehouse(root, await loadTableSemantics());
  } catch (err) {
    root.textContent = `failed to load table semantics: ${(err as Error).message}`;
  }
}

async function hydrateCitations(): Promise<void> {
  const root = document.getElementById("citations") as HTMLDivElement | null;
  if (!root) return;
  try {
    const table = new CitationsTable(root);
    table.setRows(await loadCitations());
  } catch (err) {
    root.textContent = `failed to load citations: ${(err as Error).message}`;
  }
}

async function main(): Promise<void> {
  const asciiEl = document.getElementById("ascii") as HTMLPreElement | null;
  if (asciiEl) startAsciiArt(asciiEl);

  void hydrateCitations();
  void hydrateWarehouse();
  void hydrateServiceStatus();

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
