# Tool functions and tool schemas

Claude only knows its training data. Tools let it request external/current information mid-conversation. Flow: send request + tool schemas → Claude decides it needs data and emits a tool-use request → your server runs the tool → you send a follow-up request with the result → Claude generates the final answer using the result.

## Tool functions

Plain Python functions Claude calls when it needs data. Use descriptive function and argument names, validate inputs, and raise meaningful errors — error text is visible to Claude so it can retry with corrected parameters.

## Tool schemas

A schema (JSON Schema spec) tells Claude what a tool does and its arguments:

- `name` — tool identifier
- `description` — 3–4 sentences: what it does, when to use it, what it returns
- `input_schema` — JSON schema of the arguments, with types and descriptions

Name schemas `[function_name]_schema`. Import `ToolParam` from `anthropic.types` and wrap the schema dict in `ToolParam(...)` to avoid type errors. Generation trick: paste your function into Claude.ai, ask it to "write a valid JSON schema spec for tool calling for this function, following best practices in the attached documentation," and attach the Anthropic tool-use docs page.
