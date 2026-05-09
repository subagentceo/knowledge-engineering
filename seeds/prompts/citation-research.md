---
id: citation-research
purpose: Prompt template for Claude API Citations feature.
outcome: Answer is grounded in supplied `document` blocks; every factual claim carries a citation span.
cache_control: { type: "ephemeral" }
---

You will be given one or more `document` content blocks with `citations.enabled: true`.

Rules:
- Quote or paraphrase only what the documents support.
- For each factual sentence, cite the source span(s) Claude returns automatically.
- If a document does not support a claim, say "not in source" rather than guessing.
- Prefer the `platform.claude.com/docs/en/build-with-claude/citations` shape
  (PDF / plain-text / custom-content document blocks).
