// frontend/src/cache-status.ts
//
// Tiered-cache status panel (KAN-11). Fetches /cache-stats.json
// (emitted by dw:load from dw.fact_cache_hits × dw.dim_cache_key) and
// renders L1/L2/L3 hit-ratio bars plus the hottest keys list, in the
// service-status visual language.

export interface TierStat {
  tier: string;
  hits: number;
  misses: number;
  promotions: number;
  hit_ratio: number;
}

export interface HotKeyStat {
  cache_key: string;
  lane: string | null;
  hits: number;
}

export interface CacheStatsFeed {
  generated_at: string;
  tiers: TierStat[];
  hottest_keys: HotKeyStat[];
}

export async function loadCacheStats(fetchImpl: typeof fetch = fetch): Promise<CacheStatsFeed> {
  const r = await fetchImpl("/cache-stats.json");
  if (!r.ok) throw new Error(`cache-stats.json: HTTP ${r.status}`);
  return (await r.json()) as CacheStatsFeed;
}

export function hitRatioPct(t: TierStat): string {
  return `${(t.hit_ratio * 100).toFixed(1)}%`;
}

/** bar width in px from the hit ratio (0..1) */
export function ratioBarWidth(ratio: number, maxPx = 220): number {
  return Math.max(2, Math.round(Math.min(1, Math.max(0, ratio)) * maxPx));
}

export const TIER_LABELS: Record<string, string> = {
  L1: "L1 in-process lru",
  L2: "L2 redis",
  L3: "L3 postgres",
};

export function renderCacheStatus(root: HTMLElement, feed: CacheStatsFeed): void {
  root.replaceChildren();
  const heading = document.createElement("h2");
  heading.textContent = "semantic cache — tier hit ratios";
  root.appendChild(heading);

  const list = document.createElement("ul");
  list.className = "status-rows";
  for (const t of feed.tiers) {
    const li = document.createElement("li");
    li.className = "status-row";
    li.title = `${t.hits} hits / ${t.misses} misses / ${t.promotions} promotions`;

    const label = document.createElement("span");
    label.className = "status-vendor";
    label.textContent = TIER_LABELS[t.tier] ?? t.tier;
    li.appendChild(label);

    const bar = document.createElement("span");
    bar.className = "year-bar";
    bar.style.width = `${ratioBarWidth(t.hit_ratio)}px`;
    li.appendChild(bar);

    const pct = document.createElement("span");
    pct.className = "year-count";
    pct.textContent = hitRatioPct(t);
    li.appendChild(pct);

    list.appendChild(li);
  }
  root.appendChild(list);

  if (feed.hottest_keys.length > 0) {
    const hotHeading = document.createElement("h2");
    hotHeading.textContent = "hottest keys";
    root.appendChild(hotHeading);
    const hotList = document.createElement("ul");
    hotList.className = "memory-list";
    for (const k of feed.hottest_keys) {
      const li = document.createElement("li");
      const badge = document.createElement("span");
      badge.className = "memory-badge memory-agent";
      badge.textContent = k.lane ?? "—";
      li.appendChild(badge);
      li.appendChild(document.createTextNode(` ${k.cache_key} (${k.hits})`));
      hotList.appendChild(li);
    }
    root.appendChild(hotList);
  }

  const stamp = document.createElement("p");
  stamp.className = "status-totals";
  stamp.textContent = `generated ${feed.generated_at}`;
  root.appendChild(stamp);
}
