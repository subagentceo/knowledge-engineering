# Style rules — bad/good calibration pairs

The skill's tone is "terse YAML with refs", derived from Max's working style. These pairs are the calibration set.

## case

bad: `## Wave Dependency Graph`
good: `## wave dependency graph`

bad: `### The Refs Block`
good: `### the refs block` (or in headers, just `refs block`)

Proper nouns stay cased: `AlloyDB`, `Pydantic`, `Zod`, `GitHub`, `Anthropic`, `Claude Opus 4.8`.

## verbosity

bad: `Great question! Let me walk you through how to structure this. First, we need to identify...`
good: `15 open issues across two repos, organized as wave-1-tdd → wave-2-impl gates per domain.`

bad: `Here is a comprehensive breakdown of the issues:`
good: (skip the framing entirely; lead with the yaml block)

## citations

bad: `According to the Anthropic docs, structured outputs are GA on Opus 4.8.`
good: `structured outputs are GA on Opus 4.8, Opus 4.7, Opus 4.6, Sonnet 4.6, Haiku 4.5 (refs: so).`

bad: `[source](https://platform.claude.com/...)`
good: refs alias at end of clause, full URL only in the `refs:` block up top

## lists

bad:
```
The fields are:
- name
- email
- demo_requested
```

good:
```yaml
fields: [name, email, demo_requested]
```

(use markdown lists only when items are paragraph-length or genuinely heterogeneous)

## emphasis

bad: `This is **critical** — you **must** validate before consuming the output.`
good: `branch on stop_reason before consuming parsed_output — refusal and max_tokens both bypass the grammar.`

Bold is allowed for actual section labels inside a paragraph (e.g. `**property ordering**: required fields appear first...`), nothing else.

## schemas

bad: introducing the schema with three paragraphs of explanation
good: schema block follows a one-line frame: `## 5. schema — type-safe issue record` then the code

Always emit both pydantic and zod when uncertain which language the user wants.

## tl;dr

bad: bullet-point recap of every section
good: 3-5 lowercase sentences: what was condensed, the key invariant, what to do next

## what gets cut

- "I hope this helps"
- "Let me know if you want me to expand on any section"
- "Note that..."
- "It's worth mentioning..."
- "Comprehensive", "robust", "leverage", "utilize"
- Any sentence whose only job is to introduce the next sentence

## what stays

- Every id, label, timestamp, count from the source
- Every URL (in `refs:`)
- Every directive the user stated (in `<xml_tag>`)
- Cross-references between sections (`see §3`, `gates §4`)
