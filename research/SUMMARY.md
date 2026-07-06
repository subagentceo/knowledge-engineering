# ERD visualization for Fivetran schemas — research summary (2026-07-06)

## Fivetran ↔ Claude fact-check (before trusting the rest of this doc)

Verified as real, as of 2026-07-06:
- **Fivetran Connector SDK Claude Code plugin** — shipped 2026-04-24, adds a `fivetran` CLI + `fivetran ai bootstrap`
  command that configures Claude Code with the plugin/skills for building custom connectors.
  (@cite https://www.claudepluginhub.com/plugins/fivetran-fivetran-connector-sdk-coding-agents-claude-code)
- **Official `fivetran/fivetran-mcp`** — a Model Context Protocol server, installable via
  `uvx --from git+https://github.com/fivetran/fivetran-mcp fivetran-mcp`. Read-only by default;
  `FIVETRAN_ALLOW_WRITES=true` unlocks POST/PATCH/DELETE (create/modify/delete connections, trigger
  syncs, edit schema/column config) and the server confirms before executing a write.
  (@cite https://github.com/fivetran/fivetran-mcp)
- **Fivetran "Claude Platform" data connector** — a pre-built Fivetran connector (not a Claude-side tool) that
  syncs Anthropic's **Files API** and **Skills API** into your warehouse, using an Admin API key (org-level) and
  a Workspace API key (workspace-scoped data). Currently Beta. It has a documented, clickable ERD in the
  Fivetran dashboard for that schema.
  (@cite https://fivetran.com/docs/connectors/applications/claude-platform)

**Correction to your framing — please read before deciding anything downstream:**
There is **no "Claude compliance API ERD" from Fivetran**. The Fivetran Claude Platform connector's schema/ERD
covers **Files API + Skills API only**. Anthropic's separate **Compliance API**
(`/v1/compliance/*` — Activity Feed, Organizations/Users/Roles/Groups, Chats/Files/Projects for claude.ai orgs;
@cite `vendor/anthropics/platform.claude.com/docs/en/manage-claude/compliance-api.md`) is a real, distinct
Anthropic surface, but Fivetran does not currently connector-ize or ERD it. If you need that data warehoused,
today's path is: pull it yourself via the Compliance API (rate-limited to 600 req/min/org) and land it with a
custom Fivetran Connector SDK connector (the same SDK the Claude Code plugin builds), or a plain script — there
is no pre-built ERD to inherit for that specific surface yet.

I did not fabricate an ERD for it; flagging this now so it doesn't get treated as an existing artifact later in
this project.

## Top 5 packages overall (cross-language shortlist)

Ranked for: agent-driven CRUD without a GUI, clean version-over-time diffing, and human-facing polish —
in that priority order, since the ask is "Claude manages this," not "a human draws this."

| # | Package | Language | crud | version | aesthetic | agent-op | Why it's here |
|---|---|---|---|---|---|---|---|
| 1 | **mermaid.js** (+ `mermaid-cli`/`mmdc`) | JS/TS/Node/HTML | 5 | 5 | 4 | 5 | Plain-text `erDiagram` syntax = an agent edits a string to CRUD entities/relationships; git-diffs line-by-line; renders natively in GitHub/GitLab and headlessly via CLI. The safest default across every one of the seven languages. |
| 2 | **D2 (d2lang)** | CLI, embeddable anywhere incl. HTML | 5 | 5 | 5 | 4 | Same diagram-as-code ergonomics as Mermaid with a nicer default theme/layout engine; has an explicit ER-diagram construct. Cross-language via CLI + static SVG output. |
| 3 | **React Flow (`@xyflow/react`)** | TypeScript | 5 | 3 | 5 | 3 | If the goal is an actual interactive "wireframe" surface humans click around in (not just a rendered image), this is the strongest node/edge canvas — JSON graph state an agent can CRUD directly, best-in-class interactivity and visual polish. Weaker on built-in versioning (you snapshot the JSON yourself) and needs a browser/React runtime. |
| 4 | **eralchemy2** | Python | 4 | 4 | 4 | 5 | Best fit if you're already living in a data-engineering/Python stack: point it at the Fivetran destination DB or SQLAlchemy models and regenerate the ERD on a schedule — CRUD happens one level down (the DB/models), which matches "let Fivetran/the warehouse be the source of truth." |
| 5 | **JointJS (+Rappid)** | JavaScript | 4 | 3 | 5 | 3 | SVG-based (CSS-stylable, accessible, testable — unlike Canvas-based GoJS), open-core licensing, and a strong middle ground between Mermaid's plainness and React Flow's build complexity if you want an embeddable widget rather than a full app. |

## Per-language verdict (where the full breakdown lives in `research/<lang>/research.jsonl`)

- **typescript** — Best overall bench depth. React Flow for an interactive wireframe app; Mermaid/`quick-erd`
  if you want plain-text CRUD instead.
- **javascript** — Same Mermaid option (no build step) plus JointJS/Cytoscape.js/GoJS for canvas/SVG widgets.
  GoJS is powerful but commercial-licensed — a real cost to weigh before committing.
- **html** — Mermaid and D2 both drop into a static page with zero build tooling; best pick if you want the
  lowest-friction embed.
- **python** — eralchemy2 > erdantic > paracelsus for this use case, in that order, all Graphviz/Mermaid-backed.
  Best match to a data-engineering background.
- **nodejs** — `mermaid-cli` is the standout: the only entry that scores 5 on every dimension except aesthetic,
  and it's the piece that makes "headless, CI-driven rendering" possible for every other language too (several
  other languages' best option is literally "shell out to mermaid-cli").
- **java** — Weakest first-party story. SchemaSpy/PlantUML are read-only/generator-pattern tools with dated
  default aesthetics; the realistic best option is shelling out to `mermaid-cli` from the JVM.
- **rust** — No purpose-built ERD package exists. `sea-orm`/`diesel` generate code, not diagrams. Realistic
  path is emitting Mermaid/D2 text from Rust structs and invoking the CLI as a subprocess. Rank this language
  last if "package quality for this specific job" is a deciding factor.

## What I did *not* do

Per your last line ("trying to get a sense... before committing to a language and package"), I did not install,
clone, or add any of the above as a dependency — this is comparison research only. Say the word for a language
and I'll wire up the real thing (Fivetran MCP server config, a Mermaid/D2 render step, etc.).
