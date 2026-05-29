# /// script
# requires-python = ">=3.10"
# dependencies = [
#   "boto3>=1.34",
# ]
# ///
# Source: Course note "Making a Request" (Bedrock) — projects/courses/bedrock.
# Platform: Amazon Bedrock — AWS SDK, `converse`.
#
# Notes:
# - Content is a LIST of dicts — {"text": ...} — because a message can hold
#   multiple parts (text + images).
# - Response text is buried: response["output"]["message"]["content"][0]["text"].
# - Use a cross-region INFERENCE PROFILE id, not a raw model id (see auth-and-setup).
# - A Bedrock client is NOT the Anthropic API — different service, SDK, and docs.

import boto3

client = boto3.client("bedrock-runtime", region_name="us-west-2")

MODEL_ID = "us.anthropic.claude-3-5-sonnet-20241022-v2:0"  # example profile id

user_message = {"role": "user", "content": [{"text": "Hello, Claude"}]}

response = client.converse(modelId=MODEL_ID, messages=[user_message])
text = response["output"]["message"]["content"][0]["text"]
