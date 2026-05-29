# Provenance — course-plugins knowledge layer

Every skill in this marketplace is distilled from an Anthropic course transcript and (where the
topic is a Claude Code feature) grounded by citing the real implementation in this workspace's
vendored `src/`. Truth is the transcript + the installed code — never hand-recalled.

## Structure pattern

Lifted verbatim from [`anthropics/knowledge-work-plugins`](https://github.com/anthropics/knowledge-work-plugins)
(also checked against `anthropics/financial-services` and `anthropics/claude-for-legal`):
`.claude-plugin/marketplace.json` → one dir per plugin → `<plugin>/.claude-plugin/plugin.json`
+ `<plugin>/skills/<skill>/SKILL.md` (YAML frontmatter: `name`, `description`).

## Source transcripts (sha256, first 16 hex)

| sha256:16 | transcript | plugin(s) |
|---|---|---|
| `07d591a36ad76770` | claude-code-in-action__claudecode.txt | claude-code |
| `3389aab809250f44` | building-with-the-claude-api__1p.txt | claude-api |
| `fdd119ca526da3a1` | claude-with-amazon-bedrock__bedrock.txt | claude-deployments |
| `56319c50acad24c5` | claude-with-google-cloud-s-vertex-ai__vertex.txt | claude-deployments |
| `869bf0e013b8edbb` | introduction-to-model-context-protocol__mcp_intro.txt | model-context-protocol |
| `938f9f6046da4234` | model-context-protocol-advanced-topics__mcp_advanced.txt | model-context-protocol |
| `5958d461d896d7d7` | introduction-to-claude-cowork__cowork.txt | claude-cowork |
| `8a1185226ab75997` | ai-fluency-for-educators__aif4ed.txt | ai-fluency |
| `f242d808e62c46fe` | ai-fluency-for-students__aif4students.txt | ai-fluency |
| `0ebe264d93200891` | teaching-ai-fluency__taif.txt | ai-fluency |

> `claude-api-course-notes.txt` is byte-identical to `building-with-the-claude-api__1p.txt`
> (same sha) and was treated as a single source.

All transcripts live under `projects/courses/`.

## Anti-hallucination contract (topology-memory style)

- **6 plugins, 55 skills**, decomposed into **55 SKILL.md + 103 references + 45 scripts**. Each
  `SKILL.md` is a thin orchestrator carrying a `## Source` line naming the exact course note(s) it
  was distilled from; deep detail lives in `references/*.md` and runnable code in `scripts/*`, each
  linked from its SKILL.md by a relative markdown link (no orphans).
- **51 distinct `src/` paths** are cited across the grounded plugins. Every one was verified to
  exist at author time. Re-verify with the gate below.
- Plugins that ground into `src/`: `claude-code` (commands, tools, hooks, skills, subagents, MCP
  client), `model-context-protocol` (client-side plumbing only — Claude Code is an MCP *client*,
  not a FastMCP server, so server-authoring skills correctly omit grounding).
- Plugins that do NOT ground into `src/` (API / product / pedagogy surfaces): `claude-api`,
  `claude-deployments`, `claude-cowork`, `ai-fluency`.
- Known wording corrections applied during distillation (transcript → installed reality):
  `$arguments` → `$ARGUMENTS` (matches `src/commands/`); the literal `src/hooks/` dir is React
  hooks, so the `hooks` skill cites the real tool-hook impl under `src/utils/hooks/`,
  `src/types/hooks.ts`, `src/services/tools/toolHooks.ts`.

## Script runtimes (programmatic tool calling)

The 41 Python scripts are made self-contained per the [agentskills.io scripts guide](https://agentskills.io):
each carries a PEP 723 (`# /// script … # ///`) block declaring `requires-python = ">=3.10"` plus
exactly the third-party packages it imports. Run with `uv run <script>` — deps resolve into
`~/.cache/uv`, never globally (honors the workspace "no global package-manager churn" rule).

Host runtimes (probed 2026-05-29, all already present — nothing installed): `uv`/`uvx` 0.11.8,
`python3` 3.14.4, `node` 24.13, `npx` 11.13, `bun` 1.3.11, `deno` 2.7.14, `ruby` 2.6.10, `go`.

Dependency map (import → pinned PyPI dep):

| import | PyPI dep | scripts |
|---|---|---|
| `anthropic` (incl. `AnthropicVertex`) | `anthropic>=0.40` | ~19 |
| `dotenv` | `python-dotenv>=1.0` | ~15 |
| `mcp` (incl. `mcp.server.fastmcp`) | `mcp>=1.0` | 7 |
| `pydantic` | `pydantic>=2.0` | 2 |
| `boto3` (Bedrock) | `boto3>=1.34` | 4 |
| `voyageai` | `voyageai>=0.3` + `numpy>=1.26` | 1 |
| Vertex embedding SDK | `google-genai>=0.3` | 1 |

- `voyageai` needs `numpy` at runtime on Python 3.14 but doesn't declare it — added explicitly
  (verified: `uv run` of `rag/scripts/rag_flow.py` resolves both and reaches the API-key check, not
  an import error).
- Stdlib-only and local-sibling imports (`tool_functions`, `graders`, `tool_use_loop`) add no dep;
  those scripts still carry `# dependencies = []` so every script uniformly declares its contract.
- Library-style fragments (e.g. `bedrock_embed.py` defines `embed()` against an injected `client`)
  declare the SDK their prose names, so the file is self-contained when wired up.
- The 3 `claude-code` hook scripts are Node (`#!/usr/bin/env node`), built-ins only — run with `node`.

## Drift gate

```sh
# every Python script is self-contained (has a PEP 723 block) and parses:
for f in $(find src/course-plugins -name '*.py' -path '*/scripts/*'); do
  head -1 "$f" | grep -q '^# /// script' || echo "NO PEP723: $f"
  python3 -c "import ast; ast.parse(open('$f').read())" || echo "SYNTAX: $f"
done

# every cited src/ path still exists:
grep -rhoE '`src/[A-Za-z0-9_./-]+`' src/course-plugins --include=SKILL.md \
  | tr -d '`' | sed -E 's/\.$//' | sort -u \
  | while read -r p; do [ -e "$p" ] || echo "MISSING: $p"; done

# every transcript sha still matches this table:
( cd projects/courses && shasum -a 256 *.txt | cut -c1-16 )

# every references/scripts file is still linked from its SKILL.md (no orphans):
cd src/course-plugins && for f in $(find . -path '*/references/*.md' -o -path '*/scripts/*' -type f); do
  d=$(dirname "$(dirname "$f")")
  grep -qF "$(basename "$f")" "$d/SKILL.md" || echo "ORPHAN: $f"
done

# every SKILL.md relative link still resolves:
for s in $(find . -name SKILL.md); do d=$(dirname "$s")
  grep -oE '\]\((references|scripts)/[^)]+\)' "$s" | sed -E 's/^\]\(//;s/\)$//' \
    | while read -r t; do [ -e "$d/$t" ] || echo "BROKEN: $s -> $t"; done
done
```
A `MISSING:` line or a changed sha means the vendored `src/` snapshot or a transcript moved out
from under the skills — re-distill the affected plugin.
