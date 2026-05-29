---
name: tool-use
description: Give Claude tools so it can fetch live data or take actions beyond its training data. Trigger when defining tool functions, writing tool JSON schemas, handling multi-block assistant responses (text + tool_use), sending tool_result blocks back, building a loop that runs arbitrary multi-turn tool chains, or wiring up multiple tools and a dispatcher.
---

# Tool Use

> Distilled from the *Building with the Claude API* course.

## Overview

Tools let Claude request external/current information mid-conversation. Flow: send request + tool schemas → Claude emits a tool-use request → your server runs the tool → you send a follow-up request with the result → Claude generates the final answer. Each tool is a plain Python function plus a JSON schema; responses become multi-block (text + tool_use); you loop on `stop_reason == "tool_use"` until Claude stops asking for tools.

## Quick start

```python
{
  "type": "tool_result",
  "tool_use_id": original_id,        # must match the tool_use block's id
  "content": json.dumps(output),     # output as a string
  "is_error": False                  # True on failure, with error message as content
}
```

Scripts: [scripts/tool_functions.py](scripts/tool_functions.py) (a tool function + its `ToolParam` schema), [scripts/tool_loop.py](scripts/tool_loop.py) (`run_conversation` / `run_tools` / `run_tool` dispatcher / `text_from_message`).

## References

- [references/tool-schemas.md](references/tool-schemas.md) — tool functions, the `name`/`description`/`input_schema` shape, `ToolParam`, and the schema-generation trick.
- [references/message-blocks.md](references/message-blocks.md) — multi-block responses, appending full `response.content`, and the tool_result block.
- [references/multi-turn.md](references/multi-turn.md) — the `stop_reason` loop and adding multiple tools (schema + dispatcher case + function).

## Source
Course notes: "Introducing Tool Use", "Project Overview", "Tool Functions", "Tool Schemas", "Handling Message Blocks", "Sending Tool Results", "Multi-Turn Conversations with Tools", "Implementing Multiple Turns", "Using Multiple Tools" — projects/courses/building-with-the-claude-api__1p.txt
