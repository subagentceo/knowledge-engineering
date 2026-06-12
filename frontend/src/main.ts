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
import { loadMemories, renderMemoryBrowser } from "./memory-browser.js";
import { loadCacheStats, renderCacheStatus } from "./cache-status.js";

async function hydrateCacheStatus(): Promise<void> {
  const root = document.getElementById("cache-status") as HTMLDivElement | null;
  if (!root) return;
  try {
    renderCacheStatus(root, await loadCacheStats());
  } catch (err) {
    root.textContent = `failed to load cache stats: ${(err as Error).message}`;
  }
}

async function hydrateMemoryBrowser(): Promise<void> {
  const root = document.getElementById("memory-browser") as HTMLDivElement | null;
  if (!root) return;
  try {
    renderMemoryBrowser(root, await loadMemories());
  } catch (err) {
    root.textContent = `failed to load memories: ${(err as Error).message}`;
  }
}

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
  void hydrateCacheStatus();
  void hydrateMemoryBrowser();

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
    const firstPages = manifest.pages.filter((entry) => {
      if (seen.has(entry.vendor)) return false;
      seen.add(entry.vendor);
      return true;
    });
    // Fetch all vendor pages in parallel — serial awaits made the
    // accordion the slowest pane on the page (25 round-trips).
    const bodies = await Promise.all(
      firstPages.map((entry) => loadVendorPage(entry.vendor, entry.path)),
    );
    firstPages.forEach((entry, i) => {
      accordion.addSection(entry.title, bodies[i] ?? "", entry.vendor);
    });
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
