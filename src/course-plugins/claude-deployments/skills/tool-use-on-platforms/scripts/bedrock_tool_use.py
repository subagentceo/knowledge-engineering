# /// script
# requires-python = ">=3.10"
# dependencies = [
#   "boto3>=1.34",
# ]
# ///
# Source: Course notes "Handling/Running/Sending Tool Use" (Bedrock) —
#         projects/courses/bedrock.
# Platform: Amazon Bedrock — converse stop_reason / toolUse parts / toolResult.
#
# Tool schemas are JSON Schema (name + description + input parameters), same as
# Vertex; generate them the same way.

import json

# --- Reading the tool-use request -------------------------------------------
# response["stopReason"] == "tool_use" signals a tool call.
# Assistant `content` is a list of parts; filter for parts containing a `toolUse` key.
# Each part gives toolUseId, name, input (arg dict). Splat with **input into your function.
if response["stopReason"] == "tool_use":
    for part in response["output"]["message"]["content"]:
        if "toolUse" in part:
            tool_use = part["toolUse"]
            tool_use_id = tool_use["toolUseId"]
            name = tool_use["name"]
            input = tool_use["input"]
            output = run_function(name, **input)

# --- Sending the tool result back -------------------------------------------
# toolResult part with a `status`. Goes back as a USER message.
# Wrap execution in try/except; on failure set status: "error" and put the
# message in `content` so Claude can read it and retry.
tool_result = {
    "toolResult": {
        "toolUseId": tool_use_id,
        "content": [{"text": json.dumps(output)}],
        "status": "success",          # or "error"
    }
}
