# ERD visualization for Fivetran schemas — research summary (2026-07-06)

## Fivetran ↔ Claude fact-check (before trusting the rest of this doc)

**Correction to my previous message:** you were right and I was wrong — there *is* a real, separate "Claude
Compliance" connector with its own ERD. I'd only found the "Claude Platform" connector on the first pass and
incorrectly concluded the Compliance surface wasn't connector-ized. Re-pulled both docs directly from the two
URLs you gave (their Next.js SSG payload, `props.pageProps.article.content` / `pageDefinition`, since the
rendered HTML is client-hydrated and a plain fetch shows only nav chrome) to get ground truth:

- **Claude Platform connector** (`https://fivetran.com/docs/connectors/applications/claude-platform`,
  connector id `anthropic_claude`, GA/Beta) — broader than I first said. Tables:
  `CLAUDE_CODE_USAGE_REPORT`, `COST_REPORT`, `MESSAGE_USAGE_REPORT`, `API_KEY`, `FILE_METADATA`, `FILE`,
  `INVITE`, `MESSAGE_BATCH`, `MESSAGE_BATCH_RESULT`, `MODEL`, `ORGANIZATION`, `SKILL`, `SKILL_VERSION`,
  `USERS`, `WORKSPACE`, `WORKSPACE_MEMBER` — i.e. Admin API (usage/cost reports, org, users, workspaces,
  API keys, invites, models) **plus** Files API and Skills API, not just the latter two.
  Interactive ERD: **https://fivetran.com/connector-erd/anthropic_claude**
- **Claude Compliance connector** (`https://fivetran.com/docs/connectors/applications/claude-compliance`,
  connector id `claude_compliance`, **Private Preview**) — this is the one you pointed me at. It syncs
  Anthropic's Compliance API. Incrementally synced: `ACTIVITY`, `CHAT`, `CHAT_MESSAGE`, `PROJECT`.
  Re-imported every sync: `COMPLIANCE_ROLE`, `COMPLIANCE_ROLE_PERMISSION`, `GROUP`, `GROUP_MEMBER`,
  `ORGANIZATION`, `ORGANIZATION_USER` — a direct table-for-entity mapping of the Compliance API's Activity
  Feed + directory objects (@cite `vendor/anthropics/platform.claude.com/docs/en/manage-claude/compliance-api.md`).
  Supports capture-deletes and column-level data blocking/hashing; SaaS + Hybrid deployment.
  Interactive ERD: **https://fivetran.com/connector-erd/claude_compliance**

Both ERD pages are client-side-rendered widgets (empty on a plain HTML fetch, populated after JS runs) — I
extracted the underlying table lists from the page's SSG JSON rather than screenshotting the diagram, so treat
the table names above as the authoritative source of truth for anyone comparing rendering packages against it.
(Headless-browser screenshotting was attempted via the pre-installed Chromium/Playwright but hit a proxy
networking issue in this sandbox unrelated to the two connectors — the JSON extraction above is unaffected and
more precise for this purpose than an image would be anyway.)

Also still real, unchanged from before:
- **Fivetran Connector SDK Claude Code plugin** — shipped 2026-04-24, adds a `fivetran` CLI + `fivetran ai bootstrap`
  command that configures Claude Code with the plugin/skills for building custom connectors.
  (@cite https://www.claudepluginhub.com/plugins/fivetran-fivetran-connector-sdk-coding-agents-claude-code)
- **Official `fivetran/fivetran-mcp`** — a Model Context Protocol server, installable via
  `uvx --from git+https://github.com/fivetran/fivetran-mcp fivetran-mcp`. Read-only by default;
  `FIVETRAN_ALLOW_WRITES=true` unlocks POST/PATCH/DELETE and the server confirms before executing a write.
  (@cite https://github.com/fivetran/fivetran-mcp)

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

- **typescript** (5 candidates) — Best overall bench depth. React Flow for an interactive wireframe app;
  Mermaid/`quick-erd` if you want plain-text CRUD instead.
- **javascript** (5 candidates) — Mermaid (no build step), JointJS/Cytoscape.js/GoJS for canvas/SVG widgets, plus
  `@antv/g6`/`x6` (actively released 2026-05-08, GPU/Rust-accelerated layouts, X6 explicitly targets ER diagrams).
  GoJS is powerful but commercial-licensed — a real cost to weigh before committing.
- **html** (5 candidates) — Mermaid and D2 drop into a static page with zero build tooling; Kroki goes further —
  one `<img>` tag, zero client-side JS at all, and it unifies Mermaid/D2/PlantUML/DBML/Graphviz behind one API.
  Best pick if you want the lowest-friction embed.
- **python** (5 candidates) — eralchemy2 > erdantic > paracelsus > PyDBML for this use case, all
  Graphviz/Mermaid/DBML-backed. Best match to a data-engineering background; PyDBML is the pick if you want the
  DBML ecosystem (dbdiagram.io-compatible) instead of Graphviz's.
- **nodejs** (5 candidates) — `mermaid-cli` is the standout: the only entry that scores 5 on every dimension
  except aesthetic, and it's the piece that makes "headless, CI-driven rendering" possible for every other
  language too (several other languages' best option is literally "shell out to mermaid-cli"). `@dbml/core` +
  `dbml-renderer` is the close second if you want direct DB-schema introspection into the mix.
- **java** (5 candidates) — Weakest first-party story of the mainstream languages. SchemaSpy/PlantUML are
  read-only/generator-pattern tools with dated default aesthetics; SchemaCrawler (actively maintained, updated
  2026-05-10) is the best native option since it targets DBML/PlantUML output directly instead of just
  Graphviz — still, the realistic ceiling is shelling out to `mermaid-cli` from the JVM.
- **rust** (5 candidates) — No purpose-built ERD package exists. `sea-orm`/`diesel` generate code, not diagrams;
  `dot-writer` is a nice type-safe DOT-text emitter but still just DOT, not ERD-aware. Realistic path is
  emitting Mermaid/D2/DBML text from Rust structs and invoking a CLI as a subprocess. Rank this language last if
  "package quality for this specific job" is a deciding factor.

## What I did *not* do

Per your last line ("trying to get a sense... before committing to a language and package"), I did not install,
clone, or add any of the above as a dependency — this is comparison research only. Say the word for a language
and I'll wire up the real thing (Fivetran MCP server config, a Mermaid/D2 render step, etc.).
