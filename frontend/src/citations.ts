// frontend/src/citations.ts
//
// Researcher-facing citations table. Fetches /citations.json (built by
// scripts/ingest-citations.ts from the vendor research mirror, same rows
// as the csl_items postgres table) and renders a filterable table with
// one-click copy of the CSL-JSON item.

export interface CitationRow {
  id: string;
  type: string;
  title: string;
  abstract?: string;
  URL?: string;
  issued?: { "date-parts": number[][] };
  source?: string;
}

export async function loadCitations(fetchImpl: typeof fetch = fetch): Promise<CitationRow[]> {
  const r = await fetchImpl("/citations.json");
  if (!r.ok) throw new Error(`citations.json: HTTP ${r.status}`);
  return (await r.json()) as CitationRow[];
}

export function filterCitations(rows: CitationRow[], query: string): CitationRow[] {
  const q = query.trim().toLowerCase();
  if (q === "") return rows;
  return rows.filter(
    (row) =>
      row.title.toLowerCase().includes(q) ||
      (row.abstract ?? "").toLowerCase().includes(q) ||
      row.id.toLowerCase().includes(q),
  );
}

export function issuedYear(row: CitationRow): string {
  return row.issued?.["date-parts"]?.[0]?.[0]?.toString() ?? "—";
}

export interface YearCount {
  year: string;
  count: number;
}

export function citationsByYear(rows: CitationRow[]): YearCount[] {
  const counts = new Map<string, number>();
  for (const row of rows) {
    const year = issuedYear(row);
    counts.set(year, (counts.get(year) ?? 0) + 1);
  }
  // "—" (undated) sorts last; years ascending.
  return [...counts.entries()]
    .map(([year, count]) => ({ year, count }))
    .sort((a, b) => (a.year === "—" ? 1 : b.year === "—" ? -1 : a.year.localeCompare(b.year)));
}

export class CitationsTable {
  private rows: CitationRow[] = [];

  constructor(private readonly root: HTMLElement) {}

  setRows(rows: CitationRow[]): void {
    this.rows = rows;
    this.render("");
  }

  render(query: string): void {
    const visible = filterCitations(this.rows, query);
    this.root.replaceChildren();

    const input = document.createElement("input");
    input.type = "search";
    input.placeholder = `filter ${this.rows.length} citations…`;
    input.value = query;
    input.addEventListener("input", () => this.render(input.value));
    this.root.appendChild(input);

    const strip = document.createElement("div");
    strip.className = "citations-year-strip";
    const buckets = citationsByYear(visible);
    const max = Math.max(1, ...buckets.map((b) => b.count));
    for (const { year, count } of buckets) {
      const seg = document.createElement("span");
      seg.className = "year-seg";
      seg.title = `${year}: ${count}`;

      const label = document.createElement("span");
      label.className = "year-label";
      label.textContent = year;

      const bar = document.createElement("span");
      bar.className = "year-bar";
      bar.style.width = `${Math.round((count / max) * 48)}px`;

      const n = document.createElement("span");
      n.className = "year-count";
      n.textContent = String(count);

      seg.appendChild(label);
      seg.appendChild(bar);
      seg.appendChild(n);
      strip.appendChild(seg);
    }
    this.root.appendChild(strip);

    const table = document.createElement("table");
    table.className = "citations-table";
    const head = table.createTHead().insertRow();
    for (const label of ["year", "title", "copy"]) {
      const th = document.createElement("th");
      th.textContent = label;
      head.appendChild(th);
    }

    const body = table.createTBody();
    for (const row of visible.slice(0, 200)) {
      const tr = body.insertRow();
      tr.insertCell().textContent = issuedYear(row);

      const titleCell = tr.insertCell();
      if (row.URL) {
        const a = document.createElement("a");
        a.href = row.URL;
        a.textContent = row.title;
        a.target = "_blank";
        a.rel = "noopener";
        titleCell.appendChild(a);
      } else {
        titleCell.textContent = row.title;
      }

      const btn = document.createElement("button");
      btn.textContent = "csl";
      btn.title = "copy CSL-JSON item";
      btn.addEventListener("click", () => {
        void navigator.clipboard.writeText(JSON.stringify(row, null, 2));
      });
      tr.insertCell().appendChild(btn);
    }

    this.root.appendChild(table);
    if (query !== "") input.focus();
    input.setSelectionRange(query.length, query.length);
  }
}
