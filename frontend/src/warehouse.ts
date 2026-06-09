// frontend/src/warehouse.ts
//
// AlloyDB warehouse panel. Fetches /table-semantics.json (emitted by
// scripts/load-citation-warehouse.ts from data/models/alloydb/*.yaml)
// and highlights the Kimball architecture: one card per table with its
// kind badge, semver, grain/SCD/aggregation note, and typed columns.

export interface SemanticColumn {
  name: string;
  kind: "dimension" | "time_dimension" | "measure";
  sql_type: string;
  description: string;
  measure_type?: string;
  calculation?: { expression: string; inherits: string[]; result_type: string };
}

export interface SemanticTable {
  table_kind: "fact" | "dim" | "rpt";
  grain?: string;
  scd_type?: number;
  aggregates?: string;
  metadata: { name: string };
  spec: { version: string; description: string; columns: SemanticColumn[] };
}

export async function loadTableSemantics(fetchImpl: typeof fetch = fetch): Promise<SemanticTable[]> {
  const r = await fetchImpl("/table-semantics.json");
  if (!r.ok) throw new Error(`table-semantics.json: HTTP ${r.status}`);
  return (await r.json()) as SemanticTable[];
}

/** one-line topology note shown under the table name */
export function topologyNote(t: SemanticTable): string {
  if (t.table_kind === "fact") return `grain: ${t.grain ?? "unstated"}`;
  if (t.table_kind === "dim") return `SCD Type ${t.scd_type ?? "?"}`;
  return `aggregates ${t.aggregates ?? "?"}`;
}

/** column badge text: kind, plus measure_type for measures */
export function columnBadge(c: SemanticColumn): string {
  if (c.kind !== "measure") return c.kind;
  const calc = c.calculation !== undefined ? " · calculated" : "";
  return `measure · ${c.measure_type ?? "?"}${calc}`;
}

export function renderWarehouse(root: HTMLElement, tables: SemanticTable[]): void {
  root.replaceChildren();
  const heading = document.createElement("h2");
  heading.textContent = "alloydb citation warehouse — kimball topology";
  root.appendChild(heading);

  for (const t of tables) {
    const card = document.createElement("article");
    card.className = `dw-card dw-${t.table_kind}`;

    const title = document.createElement("h3");
    title.textContent = `${t.metadata.name} `;
    const version = document.createElement("span");
    version.className = "dw-version";
    version.textContent = `v${t.spec.version}`;
    title.appendChild(version);
    card.appendChild(title);

    const note = document.createElement("p");
    note.className = "dw-note";
    note.textContent = topologyNote(t);
    card.appendChild(note);

    const cols = document.createElement("ul");
    for (const c of t.spec.columns) {
      const li = document.createElement("li");
      const badge = document.createElement("span");
      badge.className = `dw-badge dw-badge-${c.kind}`;
      badge.textContent = columnBadge(c);
      li.appendChild(document.createTextNode(`${c.name} (${c.sql_type}) `));
      li.appendChild(badge);
      li.title = c.calculation !== undefined
        ? `${c.description} — ${c.calculation.expression} (inherits ${c.calculation.inherits.join(", ")})`
        : c.description;
      cols.appendChild(li);
    }
    card.appendChild(cols);
    root.appendChild(card);
  }
}
