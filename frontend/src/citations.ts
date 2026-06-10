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
  // year:<YYYY> filters by issued year (the year strip emits this form)
  const yearMatch = q.match(/^year:(\d{4}|—)$/);
  if (yearMatch !== null) {
    return rows.filter((row) => issuedYear(row) === yearMatch[1]);
  }
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

// ── human citation formats (B11) ─────────────────────────────────────────────

function bibtexKey(row: CitationRow): string {
  const year = issuedYear(row);
  return `${row.id.split(":").pop() ?? "item"}${year === "—" ? "" : year}`.replace(/[^a-zA-Z0-9-]/g, "");
}

export function toBibtex(row: CitationRow): string {
  const year = issuedYear(row);
  const fields = [
    `  title = {${row.title}}`,
    `  author = {{Anthropic}}`,
    year !== "—" ? `  year = {${year}}` : undefined,
    row.URL !== undefined ? `  url = {${row.URL}}` : undefined,
    `  note = {${row.id}}`,
  ].filter((f) => f !== undefined);
  const entryType = row.type === "article" ? "article" : "misc";
  return `@${entryType}{${bibtexKey(row)},\n${fields.join(",\n")}\n}`;
}

export function toApa(row: CitationRow): string {
  const year = issuedYear(row);
  const parts = [
    `Anthropic. (${year === "—" ? "n.d." : year}).`,
    `${row.title}.`,
    ...(row.URL !== undefined ? [row.URL] : []),
  ];
  return parts.join(" ");
}

/** stable deep link: #cite/<csl-id> */
export function citeHash(row: CitationRow): string {
  return `#cite/${encodeURIComponent(row.id)}`;
}

export function rowFromHash(rows: CitationRow[], hash: string): CitationRow | undefined {
  const m = hash.match(/^#cite\/(.+)$/);
  if (m?.[1] === undefined) return undefined;
  const id = decodeURIComponent(m[1]);
  return rows.find((r) => r.id === id);
}

export class CitationsTable {
  private rows: CitationRow[] = [];

  constructor(private readonly root: HTMLElement) {}

  setRows(rows: CitationRow[]): void {
    this.rows = rows;
    window.addEventListener("hashchange", () => this.route());
    this.route();
  }

  /** #cite/<id> renders the detail view; anything else renders the table. */
  private route(): void {
    const detail = rowFromHash(this.rows, window.location.hash);
    if (detail !== undefined) this.renderDetail(detail);
    else this.render("");
  }

  renderDetail(row: CitationRow): void {
    this.root.replaceChildren();
    const back = document.createElement("a");
    back.href = "#";
    back.textContent = "← all citations";
    back.className = "cite-back";
    this.root.appendChild(back);

    const card = document.createElement("article");
    card.className = "cite-detail";
    const h = document.createElement("h2");
    h.textContent = row.title;
    card.appendChild(h);

    const meta = document.createElement("p");
    meta.className = "cite-meta";
    meta.textContent = [issuedYear(row), row.type, row.id].join(" · ");
    card.appendChild(meta);

    if (row.abstract !== undefined) {
      const abs = document.createElement("p");
      abs.textContent = row.abstract;
      card.appendChild(abs);
    }
    if (row.URL !== undefined) {
      const a = document.createElement("a");
      a.href = row.URL;
      a.textContent = row.URL;
      a.target = "_blank";
      a.rel = "noopener";
      card.appendChild(a);
    }

    const actions = document.createElement("div");
    actions.className = "cite-actions";
    const copies: Array<[string, () => string]> = [
      ["copy csl-json", () => JSON.stringify(row, null, 2)],
      ["copy bibtex", () => toBibtex(row)],
      ["copy apa", () => toApa(row)],
      ["copy link", () => `${window.location.origin}/${citeHash(row)}`],
    ];
    for (const [label, produce] of copies) {
      const btn = document.createElement("button");
      btn.textContent = label;
      btn.addEventListener("click", () => {
        void navigator.clipboard.writeText(produce());
        btn.textContent = `${label} ✓`;
      });
      actions.appendChild(btn);
    }
    card.appendChild(actions);
    this.root.appendChild(card);
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
      seg.title = `${year}: ${count} — click to filter`;
      seg.addEventListener("click", () => this.render(query === `year:${year}` ? "" : `year:${year}`));

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
      const detailLink = document.createElement("a");
      detailLink.href = citeHash(row);
      detailLink.textContent = row.title;
      titleCell.appendChild(detailLink);

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
