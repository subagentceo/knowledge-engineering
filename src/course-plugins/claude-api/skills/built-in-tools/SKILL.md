---
name: built-in-tools
description: Use Claude's built-in / server-side tools and capabilities. Trigger when forcing parallel tool execution with a batch tool, using the text editor tool to read/edit files, the web search tool for current info, code execution with the Files API, extracting structured data via a forced tool call, or enabling extended thinking, image/PDF input, or citations.
---

# Built-in & Server-Side Tools

> Distilled from the *Building with the Claude API* course.

## Overview

Claude ships capabilities beyond custom tool functions: a **batch tool** to force parallel calls, the **text editor** and **web search** server-side tools, **code execution + Files API**, **forced tool calls** for reliable structured data, **extended thinking**, **image/PDF input**, and **citations**. Some (web search, code execution) run entirely on Anthropic's side; others (batch, text editor) need your implementation behind a stub schema.

## Quick start

Web search runs with no custom code:

```python
{ "type": "web_search_20250305", "name": "web_search",
  "max_uses": 5,                        # caps total searches, default 5
  "allowed_domains": ["nih.gov"] }      # optional: restrict to specific domains
```

Scripts: [scripts/web_search.py](scripts/web_search.py), [scripts/batch_tool.py](scripts/batch_tool.py) (`run_batch`), [scripts/structured_data_tool.py](scripts/structured_data_tool.py) (forced `tool_choice`), [scripts/extended_thinking.py](scripts/extended_thinking.py) (`thinking_budget`), [scripts/image_pdf_input.py](scripts/image_pdf_input.py) (image/PDF blocks + citations).

## References

- [references/batch-tool.md](references/batch-tool.md) — force parallel tool calls via an `invocations` list.
- [references/text-editor-tool.md](references/text-editor-tool.md) — the built-in-schema stub and why you still implement file ops.
- [references/web-search-tool.md](references/web-search-tool.md) — schema, response block types, domain restriction.
- [references/code-execution-files-api.md](references/code-execution-files-api.md) — Files API IDs, the no-network container, and the combined flow.
- [references/structured-data-tool.md](references/structured-data-tool.md) — forced `tool_choice` extraction vs prefill+stop.
- [references/extended-thinking.md](references/extended-thinking.md) — `thinking_budget`, the signature, redacted blocks, when to enable.
- [references/image-pdf-input.md](references/image-pdf-input.md) — image/document blocks, the 100-image cap, prompting for accuracy.
- [references/citations.md](references/citations.md) — enabling citations and the page/char-location arrays.

## Source
Course notes: "The Batch Tool", "The Text Edit Tool", "The Web Search Tool", "Code Execution and the Files API", "Tools for Structured Data", "Extended Thinking", "Image Support", "PDF Support", "Citations" — projects/courses/building-with-the-claude-api__1p.txt
