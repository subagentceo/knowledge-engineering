# Multi-turn tool chains and adding multiple tools

## Multi-turn tool chains

You can't predict how many tools a query needs, so loop until Claude stops requesting tools. Check `stop_reason` — `"tool_use"` means Claude wants a tool; anything else ends the loop.

- `run_conversation` — calls Claude with messages + tools, appends the response, checks `stop_reason`; if `tool_use`, runs the tools, adds results as a user message, repeats.
- `run_tools` — filters `message.content` for `type == "tool_use"` blocks, runs each via `run_tool`, returns a list of tool-result blocks (with `is_error`).
- `run_tool` — dispatcher: matches `tool_name` to the function with if-statements; scalable as you add tools.
- `text_from_message` — extracts all text blocks from a multi-block message.

## Adding multiple tools

Once the framework exists, each new tool is a simple pattern: (1) add its schema to the `tools` list, (2) add a case in `run_tool`, (3) implement the function. Claude can then chain them (e.g. compute a date, then set a reminder with that date) within one conversation.
