# /// script
# requires-python = ">=3.10"
# dependencies = [
#   "boto3>=1.34",
# ]
# ///
# Source: Course note "Streaming" (Bedrock) — projects/courses/bedrock.
# Platform: Amazon Bedrock — `converse_stream`, iterate response["stream"].
#
# Notes:
# - First call returns immediately (acknowledgment, no text).
# - Event types in order: message start -> content block delta ->
#   content block stop -> message stop -> metadata (last).
# - Only CONTENT-BLOCK-DELTA events carry text; ignore the rest for display.

response = client.converse_stream(modelId=MODEL_ID, messages=messages)
total = ""
for event in response["stream"]:
    if "contentBlockDelta" in event:
        chunk = event["contentBlockDelta"]["delta"]["text"]
        total += chunk          # send chunk to the UI
