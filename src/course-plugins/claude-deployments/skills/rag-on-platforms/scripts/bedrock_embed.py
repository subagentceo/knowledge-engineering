# /// script
# requires-python = ">=3.10"
# dependencies = [
#   "boto3>=1.34",
# ]
# ///
# Source: Course note "Text Embeddings" (Bedrock) — projects/courses/bedrock.
# Platform: Amazon Bedrock — Amazon Titan Embed Text V2 via the AWS SDK.
#
# Notes:
# - Output: ~1024-element float vector, values -1..+1.
# - Store the original text alongside each embedding — raw vectors are
#   meaningless to retrieve by themselves.
# - Everything downstream of the vector (index storage, cosine distance, RRF
#   merge) is provider-neutral Python, identical to the Vertex course.

import json

# AWS SDK bedrock-runtime client (region per auth-and-setup).
TITAN_MODEL_ID = "amazon.titan-embed-text-v2:0"

def embed(text):
    response = client.invoke_model(
        modelId=TITAN_MODEL_ID,
        body=json.dumps({"inputText": text}),
    )
    body = json.loads(response["body"].read())
    return body["embedding"]   # ~1024-element float vector, -1..+1
