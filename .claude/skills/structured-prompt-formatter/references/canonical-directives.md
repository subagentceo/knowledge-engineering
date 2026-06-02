# Canonical xml directive vocabulary

Names that appear verbatim in `platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices`. Use these tag names exactly when the user's directive matches. If none fit, invent `<snake_case_descriptive>` — the docs are explicit that no tag set is canonical, only consistent reuse matters.

## tool-use posture

- `<default_to_action>` — implement rather than suggest; infer intent and proceed
- `<do_not_act_before_instructions>` — research-and-recommend only; never edit without explicit ask
- `<use_parallel_tool_calls>` — fire independent tool calls simultaneously; serialize only when one depends on another's output

## reasoning posture

- `<investigate_before_answering>` — read referenced files before claiming facts about them; anti-hallucination for code Q&A

## output posture

- `<avoid_excessive_markdown_and_bullet_points>` — flowing prose, paragraph breaks only, no bold/italic
- `<smoothly_flowing_prose_paragraphs>` — wrap section bodies that should not be lists
- `<output_contract>` — declares structured-output rules: shape, null behavior, field absence semantics

## design posture

- `<frontend_aesthetics>` — anti-AI-slop directive: distinctive fonts, cohesive themes, no purple-gradient-on-white

## thinking posture

- `<thinking>` / `<answer>` — manual CoT separation in few-shot examples
- `<scratchpad>` — informal working area before final answer

## long-context structure

- `<documents>` wrapping `<document index="n">` wrapping `<document_content>` + `<source>` — canonical multi-doc shape for long-context prompts

## extraction structure

- `<input>` — wraps the user-provided payload to extract from
- `<context>` — surrounding info the model needs but should not extract
- `<instructions>` — what to do with the input
- `<example>` (single) / `<examples>` (multiple) — few-shot block

## when to invent a new tag

Invent when none of the above match. Rules:

1. snake_case, lowercase
2. descriptive noun-or-verb-phrase, not abstract ("api_response_validation" not "validator")
3. reusable across prompts in the same product surface — if it's a one-off, it's probably a section header, not a tag

## what NEVER becomes a tag

- generic prose paragraphs ("explanation", "intro")
- formatting hints ("section1", "part_a")
- emphasis ("important", "critical")
