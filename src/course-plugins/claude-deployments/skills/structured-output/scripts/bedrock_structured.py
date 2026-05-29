# /// script
# requires-python = ">=3.10"
# dependencies = [
#   "boto3>=1.34",
# ]
# ///
# Source: Course notes "Structured Data" / "Structured Data with Tools" (Bedrock)
#         — projects/courses/bedrock.
# Platform: Amazon Bedrock — prefill + stop-sequence and tool-schema extraction.

import json

# --- Technique 1: prefill + stop sequence (prompt-based) --------------------
# Prefill the assistant message with the opening delimiter; set the stop
# sequence to the closing delimiter. Claude assumes it already wrote the
# opener, emits only the content, and halts at the closer.
messages.append({"role": "assistant", "content": [{"text": "```json"}]})
# ... on the converse call:
#   inferenceConfig={"stopSequences": ["```"]}
# Then parse:
data = json.loads(text.strip())

# --- Technique 2: tool schema as extractor (tool-based) ---------------------
# Define a "fake" tool whose input parameters match your desired JSON structure,
# force Claude to call it, and read the structured data out of the tool-use
# arguments. End the conversation after extraction — do NOT send a tool result
# back. Read the args from the toolUse part's `input`.
#   tool_choice supports auto / any / a named tool; use the named-tool form to
#   guarantee the extractor fires.
extracted = tool_use["input"]   # the toolUse part's input
