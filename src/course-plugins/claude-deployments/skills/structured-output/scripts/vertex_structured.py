# /// script
# requires-python = ">=3.10"
# dependencies = [
#   "anthropic>=0.40",
# ]
# ///
# Source: Course notes "Structured Data" / "Tools for Structured Data" (Vertex)
#         — projects/courses/vertex.
# Platform: Google Cloud Vertex AI — prefill + stop-sequence and tool-schema extraction.

import json

# --- Technique 1: prefill + stop sequence (prompt-based) --------------------
# Prefill the assistant message with the opening delimiter; set the stop
# sequence to the closing delimiter. Claude assumes it already wrote the
# opener, emits only the content, and halts at the closer.
messages.append({"role": "assistant", "content": "```json"})
# ... on the messages.create call:
#   stop_sequences=["```"]
# Then parse:
data = json.loads(text.strip())

# --- Technique 2: tool schema as extractor (tool-based) ---------------------
# Define a "fake" tool whose input parameters match your desired JSON structure,
# force Claude to call it, and read the structured data out of the tool-use
# arguments. End the conversation after extraction — do NOT send a tool result
# back.
#   Force the call with the named-tool form to guarantee the extractor fires:
tool_choice = {"type": "tool", "name": "toJSON"}
# Read the args from the tool-use block:
extracted = response.content[0].input
