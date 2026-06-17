# anduril-crawl-plugin

Deterministic, content-addressed (sha256) **incremental crawler** for vendor doc
surfaces, packaged as Claude Code skills. Mirrors a site to CommonMark, detects
new and changed pages against a manifest, and PRs only the delta.

Built from this repo's worked example: mirroring **Anduril** —
`developer.anduril.com` (markdown-native) and `www.anduril.com` (a WebGL/Hydrax SPA
with no prose DOM) — then generalized to any vendor (e.g. `code.claude.com`).

## Skills

| Skill                         | Use when                                                                                                            |
| :---------------------------- | :------------------------------------------------------------------------------------------------------------------ |
| `incremental-crawl`           | Mirror/refresh a docs surface; sha256 manifest so re-runs only rewrite changed pages. The engine.                   |
| `structured-metadata-extract` | The target is a JS/WebGL SPA: no `.md`, no prose DOM, blank JS render. Extract title + meta + Open Graph + JSON-LD. |
| `pr-changed-content`          | "PR the new and changed content" — ship exactly the delta a crawl produced.                                         |

## Tools (grounding)

- `scripts/incremental-crawl.ts` — config-driven engine (`--target`, `--changed-only`, `--page-cap`, `--list`)
- `scripts/crawl-targets.json` — target registry (anduril-www, anduril-dev, code-claude)
- `scripts/crawl-anduril-www.ts` — the original structured-metadata implementation

## Quick start

```bash
tsx scripts/incremental-crawl.ts --list
tsx scripts/incremental-crawl.ts --target code-claude --changed-only
```

## Contracts

- **Deterministic**: unchanged upstream → byte-identical output (no wall-clock in
  tracked files; dates sourced from each page).
- **Incremental**: adds new URLs, rewrites only changed pages, leaves the rest
  untouched, preserves captures on transient failure.
- **CommonMark**: output normalized through prettier; `prettier --check` clean.

See each skill's `SKILL.md` for the full procedure.
