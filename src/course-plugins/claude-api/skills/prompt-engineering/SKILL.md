---
name: prompt-engineering
description: Improve a prompt to get more reliable, higher-quality output from Claude. Trigger when a prompt underperforms, when writing the first line / task instruction, when adding guidelines or reasoning steps, when wrapping interpolated content in XML tags, or when adding one-shot/multi-shot examples to handle corner cases or enforce output format.
---

# Prompt Engineering

> Distilled from the *Building with the Claude API* course.

## Overview

Four stackable techniques to improve a prompt, applied step by step and re-evaluated after each (see the `prompt-evaluation` skill): be clear and direct, be specific (attributes + steps), structure interpolated content with XML tags, and provide one-shot/multi-shot examples. Expect poor baseline scores (the course's meal-plan prompt started at 2.32 on a weak model) and watch them climb as techniques stack.

## Quick start

Order of attack, with the score gains the course observed:

1. **Clear & direct** first line — action verb + clear task + output specs (2.32 → 3.92).
2. **Be specific** — add guidelines: attributes (output qualities) and/or steps (reasoning) (3.92 → 7.86).
3. **XML tags** — wrap each interpolated section in descriptive tags (`<sales_records>`, not `<data>`).
4. **Examples** — one-/multi-shot, placed *after* the instructions, reusing your best eval cases.

## References

- [references/clear-and-specific.md](references/clear-and-specific.md) — the clear-and-direct first line and the two guideline types (attributes vs steps), with score deltas.
- [references/xml-tags-and-examples.md](references/xml-tags-and-examples.md) — XML-tag structuring and one-shot/multi-shot example best practices.

## Source
Course notes: "Prompt Engineering", "Being Clear and Direct", "Being Specific", "Structure with XML Tags", "Providing Examples" — projects/courses/building-with-the-claude-api__1p.txt
