# Prefilling and stop sequences

Two techniques control the response without touching the core prompt: **assistant prefilling** and **stop sequences**. Combine them for clean structured data.

## Prefilling assistant messages

Append a partial assistant message at the end of the `messages` list. Claude treats it as text it already authored and continues from its exact endpoint (not from a clean sentence boundary). Stitch the prefill + the generated continuation together yourself.

Example: prefill `"Coffee is better because"` → Claude continues with justification for coffee.

## Stop sequences

Pass a stop-sequence string; when Claude generates that exact string, generation halts immediately and the stop text is **not** included in the output.

- Prompt "count 1 to 10" + stop `"five"` → stops at "four, ".
- Refine to stop `", five"` → clean output "one, two, three, four".

## Structured data extraction (prefill + stop)

To get raw JSON/code/lists without Claude's automatic markdown headers, commentary, or footers:

1. **User message** = the request for structured data.
2. **Assistant prefill** = the opening delimiter, e.g. ` ```json `.
3. **Stop sequence** = the closing delimiter, e.g. ` ``` `.

Claude sees the prefill, assumes the response is underway, emits only the requested content, and stops at the closing delimiter. The result is raw, parseable output you can copy/use directly. Works for any structured type — JSON, Python, regex, lists.

(For higher reliability at the cost of more setup, see the structured-data *tool* approach in the `built-in-tools` skill.)
