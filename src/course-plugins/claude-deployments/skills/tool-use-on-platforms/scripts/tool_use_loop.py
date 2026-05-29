# /// script
# requires-python = ">=3.10"
# dependencies = []
# ///
# Source: Course notes "Running Tool Use" / "Implementing Multiple Turns"
#         (Bedrock + Vertex) — projects/courses/{bedrock,vertex}.
# Platform: BOTH — the tool-use loop is identical across Bedrock and Vertex.
#
# Notes:
# - Both APIs are stateless, so the tool schemas must be RESENT on every
#   follow-up call or Claude loses the tool definitions.
# - tool_choice ("auto" / "any" / a specific tool) exists on both.
# - The block shapes / field names for reading the request and sending the
#   result differ per platform — see bedrock_tool_use.py / vertex_tool_use.py.

while True:
    result = chat(messages, tools)
    # add assistant message (result content) to messages
    if stop_reason != "tool_use":
        break                                    # final answer
    tool_results = run_tools(result)             # execute each requested tool
    # add user message (tool_results) to messages  # send results back
