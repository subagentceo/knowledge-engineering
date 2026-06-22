# Raw admonitions — extracted from platform.claude.com docs

Verbatim or paraphrased ≤15 words from the source page. Each ties to one or more rubric criteria.

## bp — claude-prompting-best-practices

- **golden rule** (load-bearing tip): show your prompt to a colleague with minimal context; if they'd be confused, Claude will be too. → `colleague_test`
- **long context** (note): queries at the end can improve response quality by up to 30%. → `long_input_at_top`
- **xml structure** (best practice): use consistent tag names, nest hierarchically (documents > document index=n). → `xml_load_bearing`
- **examples** (best practice): include 3-5 examples wrapped in `<example>` / `<examples>` tags. → `examples_present`
- **prefill migration** (notice): prefilled responses on the last assistant turn are not supported starting with Claude 4.6 models. → `no_prefill`
- **tell-not-don't** (best practice): "Tell Claude what to do instead of what not to do." → `tell_not_dont`
- **role** (best practice): set a role in the system prompt, even one sentence. (informs colleague_test)
- **adaptive thinking warning**: steering Claude to think less often may reduce quality on tasks that benefit from reasoning. (informs latency_aware)

## xml — use-xml-tags

- **clarity**: clearly separate different parts of your prompt. → `xml_load_bearing`
- **parseability**: tags in output make post-processing easier. → `xml_load_bearing`
- **no canonical vocabulary**: there are no "best" xml tags Claude has been trained on. → consistency matters more than naming.
- **power user tip**: combine xml with multishot (`<examples>`) and CoT (`<thinking>`, `<answer>`). → `xml_load_bearing` + `examples_present`

## pt — prompting-tools

- **variables**: in the Console, placeholders are denoted `{{double brackets}}`. → `eval-tool` admonition cross-reference
- **claude.ai limitation**: does not support prompt templates or variables. (informational, not a rubric input)

## dev — develop-tests

- **SMART**: specific, measurable, achievable, relevant. → `smart_criteria`
- **eval design principles**: be task-specific, automate when possible, prioritize volume over quality. (meta — informs how the evaluator itself is built)
- **grading hierarchy**: code > LLM > human, in that order of preference.
- **llm-grader tips**: detailed rubric, empirical/quantized output, reasoning-then-discard. (used in our 0/1/3/5 banding decision)

## ev — eval-tool

- **variable requirement** (notice): ensure your prompt includes at least 1-2 dynamic variables using `{{variable}}` — required for eval test sets. → testability-of-prompt informs `colleague_test` and `smart_criteria`
- **5-point quality grade**: console grades on a 5-point scale. (informed our 0-5 scoring, though we use 0/1/3/5 bands)

## lat — reduce-latency

- **correctness-first** (load-bearing opening): "first engineer a prompt that works well without model or prompt constraints, and then try latency reduction strategies afterward." → `latency_aware`
- **max_tokens warning** (formal `> Note:` admonition): "When the response reaches max_tokens tokens, the response will be cut off, perhaps midsentence or mid-word, so this is a blunt technique that may require post-processing and is usually most appropriate for multiple choice or short answer responses where the answer comes right at the beginning." → `max_tokens_safe`
- **streaming**: TTFT-perceived, not baseline. (informs `latency_aware`)

## hal — reduce-hallucinations

- **basic**: allow "I don't know"; use direct quotes for grounding; verify with citations. → `idk_permission`, `ground_in_quotes`
- **advanced**: external knowledge restriction. → `external_knowledge_fence`
- **closing warning**: "while these techniques significantly reduce hallucinations, they don't eliminate them entirely. Always validate critical information, especially for high-stakes decisions." (meta — informs band thresholds)

## con — increase-consistency

- **info admonition (user-provided)**: "If you need Claude to always output valid JSON that conforms to a specific schema, use Structured Outputs instead of the prompt engineering techniques below. Structured outputs provide guaranteed schema compliance and are specifically designed for this use case. The techniques below are useful for general output consistency or when you need flexibility beyond strict JSON schemas." → `structured_output_for_json`
- **prefill notice (inline)**: "Prefilling is not supported on Claude Opus 4.8, Claude Mythos Preview, Claude Opus 4.7, Claude Opus 4.6, and Claude Sonnet 4.6. Use structured outputs or system prompt instructions instead." → `no_prefill`

## jb — mitigate-jailbreaks

- **harmlessness screens**: use Haiku 4.5 pre-screen with structured outputs to constrain classification. (out of rubric v0.1.0)

## leak — reduce-prompt-leak

- **before-you-try warning** (functions as `<Warning>` admonition): "Consider using leak-resistant prompt engineering strategies only when absolutely necessary. Attempts to leak-proof your prompt can add complexity that may degrade performance in other parts of the task." (out of rubric v0.1.0 — would be v0.2.0 `dont_premature_optimize` criterion)
- **balance**: "Overly complex leak-prevention can degrade results. Balance is key." (same)

## so — structured-outputs (referenced from con)

- **migration**: `output_format` → `output_config.format`; beta header dropped. → `structured_output_for_json`
- **invalid outputs**: branch on `stop_reason` (refusal | max_tokens). → informs `max_tokens_safe`
- **property ordering**: required fields first; mark all required if order matters. (depth detail — not a rubric criterion)
