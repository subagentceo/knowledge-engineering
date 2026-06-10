// frontend/src/memory-browser.ts
//
// B12 — agent memory browser. Renders dim_memory's current rows from the
// loader-emitted /memories.json: path, curation source (ingest vs dreams),
// SCD II version count, and effective-from. Read-only window into what
// the agent fleet's memory store holds and how dreams curation reshapes
// it over time.

export interface MemoryRow {
  memory_path: string;
  curation_source: "ingest" | "dreams";
  csl_id: string | null;
  effective_from: string;
  versions: number;
}

export async function loadMemories(fetchImpl: typeof fetch = fetch): Promise<MemoryRow[]> {
  const r = await fetchImpl("/memories.json");
  if (!r.ok) throw new Error(`memories.json: HTTP ${r.status}`);
  return (await r.json()) as MemoryRow[];
}

export interface MemoryStats {
  total: number;
  dreamed: number;
  multiVersion: number;
}

export function memoryStats(rows: MemoryRow[]): MemoryStats {
  return {
    total: rows.length,
    dreamed: rows.filter((r) => r.curation_source === "dreams").length,
    multiVersion: rows.filter((r) => r.versions > 1).length,
  };
}

export function filterMemories(rows: MemoryRow[], query: string): MemoryRow[] {
  const q = query.trim().toLowerCase();
  if (q === "") return rows;
  if (q === "source:dreams" || q === "source:ingest") {
    return rows.filter((r) => r.curation_source === q.slice(7));
  }
  return rows.filter(
    (r) => r.memory_path.toLowerCase().includes(q) || (r.csl_id ?? "").toLowerCase().includes(q),
  );
}

export function renderMemoryBrowser(root: HTMLElement, rows: MemoryRow[]): void {
  root.replaceChildren();
  const heading = document.createElement("h2");
  heading.textContent = "agent memory store — dim_memory (SCD II)";
  root.appendChild(heading);

  const stats = memoryStats(rows);
  const totals = document.createElement("p");
  totals.className = "memory-totals";
  totals.textContent = `${stats.total} memories · ${stats.dreamed} dreams-curated · ${stats.multiVersion} with history`;
  root.appendChild(totals);

  const input = document.createElement("input");
  input.type = "search";
  input.placeholder = "filter by path, csl id, or source:dreams";
  root.appendChild(input);

  const list = document.createElement("ul");
  list.className = "memory-list";
  const draw = (query: string): void => {
    list.replaceChildren();
    for (const row of filterMemories(rows, query).slice(0, 100)) {
      const li = document.createElement("li");
      const badge = document.createElement("span");
      badge.className = `memory-badge memory-${row.curation_source}`;
      badge.textContent = row.curation_source;
      li.appendChild(badge);
      li.appendChild(
        document.createTextNode(
          ` ${row.memory_path} · v${row.versions} · since ${row.effective_from.slice(0, 10)}`,
        ),
      );
      list.appendChild(li);
    }
  };
  input.addEventListener("input", () => draw(input.value));
  draw("");
  root.appendChild(list);
}
