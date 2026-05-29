# /// script
# requires-python = ">=3.10"
# dependencies = [
#   "anthropic>=0.40",
# ]
# ///
# Source: Course notes "Handling Message Blocks" / "Sending Tool Results"
#         (Vertex) — projects/courses/vertex.
# Platform: Google Cloud Vertex AI — Anthropic SDK stop_reason / tool_use blocks /
#           tool_result with tool_use_id and is_error.
#
# Tool schemas are JSON Schema (name + description + input parameters), same as
# Bedrock; generate them the same way.

import json

# --- Reading the tool-use request -------------------------------------------
# message.stop_reason == "tool_use".
# message.content is a list of blocks; filter for blocks of type tool_use.
# Each block gives id, name, input.
# Append the ENTIRE response.content list back into history so all blocks
# (text + tool_use) are preserved.
if message.stop_reason == "tool_use":
    messages.append({"role": "assistant", "content": response.content})
    for block in message.content:
        if block.type == "tool_use":
            tool_use_id = block.id
            name = block.name
            input = block.input
            output = run_function(name, **input)

# --- Sending the tool result back -------------------------------------------
# tool_result block with `is_error`. Goes back as a USER message.
tool_result = {
    "type": "tool_result",
    "tool_use_id": tool_use_id,
    "content": json.dumps(output),
    "is_error": False,             # set True on failure
}
