// frontend/src/service-status.ts
//
// Citation-service status panel. Fetches /vendor-stats.json (emitted by
// the B4 warehouse load — rpt_ rollup of fact_vendor_crawl) and renders
// the top vendors by doc_count as horizontal bars in the .year-bar
// visual language, plus a totals line.

export interface VendorStat {
  vendor: string;
  host: string;
  doc_count: number;
  dated_count: number;
  dated_share: number;
}

export interface VendorTotals {
  vendors: number;
  docs: number;
}

export async function loadVendorStats(fetchImpl: typeof fetch = fetch): Promise<VendorStat[]> {
  const r = await fetchImpl("/vendor-stats.json");
  if (!r.ok) throw new Error(`vendor-stats.json: HTTP ${r.status}`);
  return (await r.json()) as VendorStat[];
}

/** top n vendors by doc_count, descending — input order is not trusted */
export function topVendors(stats: VendorStat[], n: number): VendorStat[] {
  return [...stats].sort((a, b) => b.doc_count - a.doc_count).slice(0, Math.max(0, n));
}

export function totals(stats: VendorStat[]): VendorTotals {
  return {
    vendors: stats.length,
    docs: stats.reduce((sum, s) => sum + s.doc_count, 0),
  };
}

export function datedSharePct(s: VendorStat): string {
  return `${(s.dated_share * 100).toFixed(1)}% dated`;
}

/** bar width in px, scaled against the largest doc_count in view */
export function barWidth(docCount: number, maxDocCount: number, maxPx = 220): number {
  if (maxDocCount <= 0) return 2;
  return Math.max(2, Math.round((docCount / maxDocCount) * maxPx));
}

export function renderServiceStatus(root: HTMLElement, stats: VendorStat[], n = 10): void {
  root.replaceChildren();
  const heading = document.createElement("h2");
  heading.textContent = "citation service status — top vendors by doc count";
  root.appendChild(heading);

  const top = topVendors(stats, n);
  const maxDocs = top[0]?.doc_count ?? 0;

  const list = document.createElement("ul");
  list.className = "status-rows";
  for (const s of top) {
    const li = document.createElement("li");
    li.className = "status-row";
    li.title = s.host;

    const label = document.createElement("span");
    label.className = "status-vendor";
    label.textContent = s.vendor;
    li.appendChild(label);

    const bar = document.createElement("span");
    bar.className = "year-bar";
    bar.style.width = `${barWidth(s.doc_count, maxDocs)}px`;
    li.appendChild(bar);

    const count = document.createElement("span");
    count.className = "year-count";
    count.textContent = String(s.doc_count);
    li.appendChild(count);

    const share = document.createElement("span");
    share.className = "status-share";
    share.textContent = datedSharePct(s);
    li.appendChild(share);

    list.appendChild(li);
  }
  root.appendChild(list);

  const t = totals(stats);
  const totalsLine = document.createElement("p");
  totalsLine.className = "status-totals";
  totalsLine.textContent = `${t.docs} docs across ${t.vendors} vendors`;
  root.appendChild(totalsLine);
}
