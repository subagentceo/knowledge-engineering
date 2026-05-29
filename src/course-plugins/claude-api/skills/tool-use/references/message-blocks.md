# Message blocks, history, and tool results

## Message blocks and history

Pass schemas via the `tools` keyword arg alongside the user message. Responses now contain **multiple content blocks**: a text block (user-facing explanation) plus tool-use block(s) (function name + arguments). Because the API is stateless, append the **entire** `response.content` (all blocks) to your messages list — update `add_user_message` / `add_assistant_message` to handle multiple blocks, not just text.

## Sending tool results

Execute the requested tool, build a tool-result block, and send a follow-up request with full history.

```python
{
  "type": "tool_result",
  "tool_use_id": original_id,        # must match the tool_use block's id
  "content": json.dumps(output),     # output as a string
  "is_error": False                  # True on failure, with error message as content
}
```

The `tool_use_id` pairs each result with the right request when Claude calls several tools at once. The tool-result block goes in a **user** message. Always resend the original tool schemas even if not calling tools again.
