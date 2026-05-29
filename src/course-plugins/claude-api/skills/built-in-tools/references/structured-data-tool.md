# Tools for structured data

A more reliable (but more setup) alternative to prefill+stop-sequence extraction: define a tool whose `input_schema` is the data structure you want. Send prompt + schema, and **force** the call with `tool_choice = {"type": "tool", "name": "your_tool_name"}` so Claude always invokes it. Read the result straight from the tool-use block — `response.content[0].input` — no tool-result round-trip needed. Use prompt-based extraction for quick/simple cases, tools when reliability matters.
