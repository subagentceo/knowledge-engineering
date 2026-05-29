# Tool use across platforms: the loop, reading requests, and sending results

> Distilled from the *Claude with Amazon Bedrock* and *Claude with Google Cloud Vertex AI* courses.

The tool-use **concept and loop are identical** to `claude-api`: send tools → Claude returns a
tool-use request → you run the function → you send the result back → repeat until Claude stops
asking. The **block shapes and field names** for the request/result plumbing differ between
platforms. Tool schemas themselves are JSON Schema on both (name + description + input parameters);
generate them the same way.

## The loop (same on both)

See [`scripts/tool_use_loop.py`](../scripts/tool_use_loop.py).

Both APIs are stateless, so the **tool schemas must be resent on every follow-up call** or Claude
loses the tool definitions. `tool_choice` ("auto" / "any" / a specific tool) exists on both.

## Reading the tool-use request

### Bedrock (converse) — see [`scripts/bedrock_tool_use.py`](../scripts/bedrock_tool_use.py)
- `response["stopReason"] == "tool_use"` signals a tool call.
- Assistant `content` is a list of parts; filter for parts containing a **`toolUse`** key.
- Each part gives `toolUseId`, `name`, `input` (arg dict). Splat with `**input` into your function.

### Vertex (Anthropic SDK) — see [`scripts/vertex_tool_use.py`](../scripts/vertex_tool_use.py)
- `message.stop_reason == "tool_use"`.
- `message.content` is a list of blocks; filter for blocks of **type `tool_use`**.
- Each block gives `id`, `name`, `input`. Append the **entire** `response.content` list back into
  history (`messages.append({"role": "assistant", "content": response.content})`) so all blocks
  (text + tool_use) are preserved.

## Sending the tool result back (this is where they diverge most)

### Bedrock — `toolResult` part with a `status`
See [`scripts/bedrock_tool_use.py`](../scripts/bedrock_tool_use.py). Wrap execution in try/except;
on failure set `status: "error"` and put the message in `content` so Claude can read it and retry.

### Vertex — `tool_result` block with `is_error`
See [`scripts/vertex_tool_use.py`](../scripts/vertex_tool_use.py).

Both go back as a **user** message; JSON-serialize tool outputs to strings; the `*_id` links each
result to its request when multiple tools run in parallel.
