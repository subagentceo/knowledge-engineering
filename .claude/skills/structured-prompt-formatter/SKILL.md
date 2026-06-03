---
name: structured-prompt-formatter
description: "Reformat an unstructured user dump (pasted GitHub issue lists, scraped doc pages, brain-dumped questions, mixed URLs+prose+screenshots) into Max's house structured-prompt format — terse lowercase, YAML refs block up top, xml-tagged load-bearing directives in the middle, and a type-safe zod/pydantic shape at the bottom. Trigger AGGRESSIVELY whenever the user pastes a long unstructured block (multiple URLs in a row, a copy-pasted GitHub issue list, a bulk-paste of a docs page, a meeting brain-dump) and asks Claude to 'structure this', 'format this', 'make this a prompt', 'turn this into yaml', 'give me the structured version', or 'reshape this'. Also trigger when the user names an artifact type from the house style (refs block, xml directive wrapper, eval tail, zod schema, pydantic model) and wants existing prose reshaped into it. Use this even if the user does not say the word 'skill' or 'format' — the signal is unstructured-input plus restructure-intent."
license: Proprietary
compatibility: "claude.ai web/mobile chat. Reads inputs as text; emits markdown with embedded yaml + xml + code fences. No subagents required, no network required."
metadata:
  author: max
  version: "0.2.0"
  surface: claude.ai
  style_target: max-house-terse-yaml-xml
  audited_by: structured-prompt-evaluator-0.1.0
  prior_score: 72/100 (ship_with_diff)
---

# Structured Prompt Formatter

Transforms unstructured user input into Max's house structured-prompt format. This is a **rewrite skill**, not a research skill — do not go fetch new content unless the source URLs in the input are referenced by the user as the actual subject of the work.

## Success criteria (measurable)

Output is correct iff ALL of these hold:

```yaml
success:
  - every URL in input appears in refs: block, keyed by 2-4 char alias
  - output yaml parses cleanly (round-trips through any yaml parser)
  - every id/label/count from input appears verbatim in output (no paraphrase)
  - zero invented fields — unknown → null, never guessed
  - section order matches the 5-block house format
  - prose is lowercase except for proper nouns and code identifiers
```

If any check fails, the output is wrong regardless of how it reads.

<missing_data>
For every field absent from the input, emit `null`. Never infer, guess, or default. If unknown why a field is null, append a one-line `# note: ...` comment after the yaml key.
</missing_data>

<external_knowledge_fence>
Use ONLY content present in the user's input. Do not infer issue counts, label sets, ids, timestamps, or URL contents from outside knowledge. Do not fetch URLs in the input — they go in `refs:` as-is.
</external_knowledge_fence>

## When this skill fires

The trigger surface is "user pasted a mess, wants the house format applied." Common shapes:

- bulk-paste of GitHub issue list with labels and counts (the `[Wave 1 · TDD]` / `[Wave 2 · Impl]` shape)
- copy of a docs page with admonitions, code blocks, and nav chrome
- a stream-of-thought prompt mixing 3+ technical concerns
- multiple URLs concatenated with prose between them
- screenshot OCR'd into a wall of text

If the input is one clean question or one short paragraph, do NOT use this skill — answer normally.

## The house format (target shape)

Every output produced by this skill has these sections, in this order:

```
1. yaml `refs:` block         (source URLs, keyed by short alias)
2. one-line frame sentence    (lowercase, what the artifact does)
3. sectioned body             (## headers, terse prose + yaml + xml + code)
4. optional zod/pydantic      (only when input has shape/data to schematize)
5. tl;dr footer               (3-5 lines)
```

### Tone rules (load-bearing)

- **lowercase by default** in prose; capitalize only for proper nouns and code identifiers
- **terse** — no warm-ups, no "great question", no "let me explain"
- **inline refs** — every nontrivial claim that came from a source gets `(refs: alias)` at end of clause
- **xml for directives, yaml for data, prose for everything else** — never use markdown bullets to hold what should be yaml keys
- **no emoji**, no bold for emphasis (reserved for actual section titles only)

### The `refs:` block

```yaml
refs:
  bp:  https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices
  xml: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/use-xml-tags
  so:  https://platform.claude.com/docs/en/build-with-claude/structured-outputs
```

Aliases are 2-4 lowercase chars. URLs are bare, not markdown links. Order is "most-cited first."

### xml directive wrappers

When the input contains a policy or constraint the model should follow, wrap it in a named tag:

```
<investigate_before_answering>
Never speculate about code you have not opened.
</investigate_before_answering>
```

Tag names from the canonical set (refs: `references/canonical-directives.md` — load only if you need to look one up):

- `<default_to_action>` — proactive tool use
- `<do_not_act_before_instructions>` — conservative tool use
- `<use_parallel_tool_calls>` — parallelism
- `<investigate_before_answering>` — anti-hallucination
- `<avoid_excessive_markdown_and_bullet_points>` — formatting discipline
- `<frontend_aesthetics>` — anti-AI-slop design
- `<output_contract>` — structured-output rules

If the input's directive doesn't match a canonical name, invent a `<snake_case_descriptive>` tag — Anthropic docs are explicit that no tag vocabulary is canonical (refs: xml).

### The zod/pydantic block

Include only if the input describes data with a stable shape (issues, tickets, records, API responses). Default to **both** Python (pydantic) and TypeScript (zod) side-by-side when uncertain which language the user wants.

## Procedure

Walk these steps in order. Don't skip even if you think you can guess.

### Step 1 — read the whole input first

Read every line. Identify:

1. **the artifact type the user wants** — prompt? doc? checklist? schema?
2. **the structural units** — is this N issues? N URLs? N concepts? N code blocks?
3. **what's load-bearing vs filler** — nav chrome, "Status: Open", repeated labels are filler; titles, ids, timestamps, counts are load-bearing
4. **what would become refs** — every URL goes in `refs:`, indexed by short alias

### Step 2 — pick the right shape

Decision table:

| Input shape | Output shape |
|---|---|
| N github issues with labels | `refs:` + yaml issue list + pydantic/zod issue model |
| docs page bulk paste | `refs:` + section-by-section terse summary + xml directives extracted |
| concept brain dump | `refs:` (if URLs present) + numbered sections + tl;dr |
| mixed (typical) | `refs:` + per-source section + extracted directives + optional schema |

### Step 3 — build the `refs:` block

- extract every URL from the input
- assign 2-4 char lowercase alias (prefer initials of the meaningful host+path noun)
- align with 2-space indent and colon-padded values
- keep order: most-referenced first, then by appearance

### Step 4 — write the frame sentence

One lowercase line right after the `refs:` block. States what the artifact is, not what it does. Example: `# managed-coworkers wave 1+2 issue backlog, structured`.

### Step 5 — section the body

`## numbered headers`, one per logical unit. Inside each section, terse prose with `(refs: alias)` tail-citations. Code goes in fenced blocks with explicit language. YAML for any list of typed key-value records.

### Step 6 — add directives if applicable

Heuristic: every always/never/MUST/should-not sentence in the input becomes one snake_case xml tag. Imperative mood + scope-bearing modal = directive candidate. Examples from real inputs:

- input: "Never close a wave-1 issue without verifying TDD passes" → `<wave_one_gating>`
- input: "Always tag cross-repo dependencies in both issue bodies" → `<cross_repo_gating>`
- input: "Don't merge without a green CI" → `<ci_gate>`

Place all extracted directives in their own `## directives` section, in order of first appearance in input.

### Step 7 — schema block (conditional)

If the input has N items with a stable shape, emit both pydantic and zod. Use snake_case in pydantic, camelCase in zod. Use `Optional[T] = None` in pydantic and `T.optional()` in zod.

### Step 8 — tl;dr footer

3-5 sentences, lowercase, no formatting. States: (a) what was condensed, (b) the key invariant, (c) what to do with the artifact next.

## Worked example — the test case

**Input (abbreviated):** two GitHub issue lists pasted from the github.com UI. Repo 1 `managedcoworkers/managed-coworkers` has 8 open issues, Repo 2 `managedcoworkers/claude-ai-types` has 7 open issues. Issues are grouped by labels `wave-1-tdd`, `wave-2-impl`, `memory-graph`, `alloydb`, `kv-cache`, `dreams`, `session-bootstrap`, `graph-views`, `pydantic`, `ops`. Each issue has a title, an id (#N), an opened-at timestamp, and a comment count.

**Output (what this skill produces):**

````markdown
```yaml
refs:
  mc:   https://github.com/managedcoworkers/managed-coworkers/issues
  cat:  https://github.com/managedcoworkers/claude-ai-types/issues
```

# managed-coworkers wave 1+2 backlog — two-repo issue inventory, structured

## 1. inventory by repo

```yaml
repos:
  managed-coworkers:
    ref: mc
    open: 8
    closed: 1
    waves: [wave-1-tdd, wave-2-impl, ops]
    domains: [memory-graph, alloydb, kv-cache, dreams, session-bootstrap]
  claude-ai-types:
    ref: cat
    open: 7
    closed: 32
    waves: [wave-1-tdd, wave-2-impl]
    domains: [memory-graph, pydantic, graph-views, session-bootstrap]
```

## 2. open issues — managed-coworkers (refs: mc)

```yaml
- id: 14
  title: dream consolidation pipeline
  labels: [dreams, memory-graph, wave-2-impl]
  wave: 2
  domain: dreams
- id: 13
  title: session bootstrap — vault rehydration via SessionStart hook
  labels: [memory-graph, session-bootstrap, wave-2-impl]
  wave: 2
  domain: session-bootstrap
- id: 12
  title: KV hot-cache for scope snapshots
  labels: [kv-cache, memory-graph, wave-2-impl]
  wave: 2
  domain: kv-cache
- id: 11
  title: AlloyDB memory tables + SQLAlchemy models
  labels: [alloydb, memory-graph, wave-2-impl]
  wave: 2
  domain: alloydb
- id: 10
  title: dream consolidation pipeline tests
  labels: [dreams, memory-graph, wave-1-tdd]
  wave: 1
  domain: dreams
- id: 9
  title: KV hot-cache scope snapshot tests
  labels: [kv-cache, memory-graph, wave-1-tdd]
  wave: 1
  domain: kv-cache
- id: 8
  title: AlloyDB memory schema tests
  labels: [alloydb, memory-graph, wave-1-tdd]
  wave: 1
  domain: alloydb
- id: 2
  title: install 6 Claude Code plugins from claude-plugins-official
  labels: [ops]
  wave: null
  domain: ops
```

## 3. open issues — claude-ai-types (refs: cat)

```yaml
- id: 47
  title: graph views A/B — workspaceView + projectView
  labels: [graph-views, memory-graph, wave-2-impl]
  wave: 2
  domain: graph-views
- id: 46
  title: pydantic mirror — memory_graph.py
  labels: [memory-graph, pydantic, wave-2-impl]
  wave: 2
  domain: pydantic
- id: 45
  title: graph views A/B tests (workspace-primary + project-primary)
  labels: [graph-views, memory-graph, wave-1-tdd]
  wave: 1
  domain: graph-views
- id: 44
  title: session bootstrap vault rehydration tests
  labels: [memory-graph, session-bootstrap, wave-1-tdd]
  wave: 1
  domain: session-bootstrap
- id: 43
  title: pydantic mirror parity tests
  labels: [memory-graph, pydantic, wave-1-tdd]
  wave: 1
  domain: pydantic
```

## 4. wave dependency graph

```yaml
# wave 1 (tdd) gates wave 2 (impl), 1:1 by domain
gates:
  managed-coworkers:
    - {tdd: 8,  blocks_impl: 11, domain: alloydb}
    - {tdd: 9,  blocks_impl: 12, domain: kv-cache}
    - {tdd: 10, blocks_impl: 14, domain: dreams}
  claude-ai-types:
    - {tdd: 43, blocks_impl: 46, domain: pydantic}
    - {tdd: 44, blocks_impl: 13, domain: session-bootstrap, note: "cross-repo: tdd in cat, impl in mc"}
    - {tdd: 45, blocks_impl: 47, domain: graph-views}
```

## 5. schema — type-safe issue record

```python
from typing import Optional
from pydantic import BaseModel

class Issue(BaseModel):
    id: int
    title: str
    labels: list[str]
    wave: Optional[int] = None
    domain: str
    repo: str  # "managed-coworkers" | "claude-ai-types"
```

```typescript
import { z } from "zod";

export const Issue = z.object({
  id: z.number().int(),
  title: z.string(),
  labels: z.array(z.string()),
  wave: z.number().int().nullable(),
  domain: z.string(),
  repo: z.enum(["managed-coworkers", "claude-ai-types"]),
});
export type Issue = z.infer<typeof Issue>;
```

## directives

<wave_ordering>
Always close all wave-1-tdd issues in a domain before opening the matching wave-2-impl issue. TDD gates impl 1:1 by domain.
</wave_ordering>

<cross_repo_gating>
Issue cat#44 (tdd, session-bootstrap) gates mc#13 (impl, session-bootstrap). Surface this in the impl issue's body so the gate is visible without traversing repos.
</cross_repo_gating>

## tl;dr

15 open issues across two repos, organized as wave-1-tdd → wave-2-impl gates per domain. The memory-graph axis spans both repos; pydantic mirror and graph-views live in claude-ai-types, alloydb/kv-cache/dreams live in managed-coworkers, session-bootstrap crosses the boundary. Use the schema block to ingest the issue lists into a tracking script.
````

That's the test-case output. Use this as the calibration target — when you produce output for new inputs, this is the shape and density you're aiming for.

## What this skill always does

Stated positively so the model has a target rather than a fence (per `tell_not_dont` rubric criterion):

<always_do>
- preserve every id, label, count, and timestamp from input verbatim
- emit `null` for any field not present in input
- keep technical specifics in issue titles unchanged (no summarization)
- list URLs once in `refs:`, then reference by alias inline
- use yaml lists with typed keys when carrying tabular data
- write `(refs: alias)` at end of any clause that came from a source
- reserve markdown bullets for genuinely heterogeneous prose items
- stop after the tl;dr — no offers to expand, no "let me know if..."
</always_do>

## See also

- `references/canonical-directives.md` — the xml tag vocabulary from platform.claude.com docs, with one-line descriptions of when each fires
- `references/style-rules.md` — the full tone-and-shape rule list with bad/good pairs
