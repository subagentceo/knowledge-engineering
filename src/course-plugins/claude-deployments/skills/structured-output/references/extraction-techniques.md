# Structured output: the two extraction techniques and how to choose

> Distilled from the *Claude with Amazon Bedrock* and *Claude with Google Cloud Vertex AI* courses.

Both courses teach the **same two extraction techniques** with the same trade-offs — this is mostly
"they agree; here's the per-platform wiring." For the conceptual depth, see `claude-api`.

## Technique 1 — prefill + stop sequence (prompt-based)

Claude naturally wraps structured data in headers/footers/explanation. To get only the raw content:

1. Prefill the assistant message with the **opening delimiter** (e.g. `` ```json ``).
2. Set the **stop sequence** to the closing delimiter (e.g. `` ``` ``).
3. Claude assumes it already wrote the opener, emits only the content, and halts at the closer.

Works for any format (JSON, Python, regex). The wiring is the same delta as everywhere else:

| | Bedrock | Vertex |
|---|---|---|
| Prefill | append `{"role":"assistant","content":[{"text":"```json"}]}` | append `{"role":"assistant","content":"```json"}` |
| Stop sequence | `inferenceConfig={"stopSequences":["```"]}` | `stop_sequences=["```"]` |

Then `json.loads(text.strip())` to parse. This is the technique the eval-pipeline notes use to make
Claude generate test datasets and to enforce code-only outputs for code/JSON/regex grading. See
[`scripts/bedrock_structured.py`](../scripts/bedrock_structured.py) /
[`scripts/vertex_structured.py`](../scripts/vertex_structured.py).

## Technique 2 — tool schema as extractor (tool-based)

Define a "fake" tool whose **input parameters match your desired JSON structure**, force Claude to
call it, and read the structured data straight out of the tool-use arguments. More reliable, more
setup. End the conversation after extraction — do **not** send a tool result back.

- Force the call with `tool_choice`:
  - both platforms support `auto` / `any` / a named tool; use the **named-tool** form to guarantee
    the extractor fires (Vertex: `tool_choice={"type":"tool","name":"toJSON"}`).
- Read the args from the tool-use block (per the field names in `tool-use-on-platforms`):
  - Bedrock: the `toolUse` part's `input`.
  - Vertex: `response.content[0].input`.
- **Flexible variant** (both): one `toJSON` tool with a single free-form object parameter; specify
  the exact properties in the prompt text instead of a rigid schema. Easier to iterate, slightly
  lower quality than a dedicated schema — use dedicated schemas for critical extractions.

## Choosing

- Prompt-based (prefill+stop): lighter setup, great for code/JSON/regex and ad-hoc extraction.
- Tool-based: more reliable structured parsing for important data; costs a schema definition.

Both are platform-neutral techniques — only the parameter names differ.
