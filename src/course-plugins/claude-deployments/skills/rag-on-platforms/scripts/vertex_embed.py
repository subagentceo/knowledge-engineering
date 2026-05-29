# /// script
# requires-python = ">=3.10"
# dependencies = [
#   "google-genai>=0.3",
# ]
# ///
# Source: Course note "Text Embeddings" (Vertex) — projects/courses/vertex.
# Platform: Google Cloud Vertex AI — Google text-embedding-005 via the Google GenAI SDK.
#
# Notes:
# - Output: float vector, values -1..+1.
# - Store the original text alongside each embedding — raw vectors are
#   meaningless to retrieve by themselves.
# - Everything downstream of the vector (index storage, cosine distance, RRF
#   merge) is provider-neutral Python, identical to the Bedrock course.

# Google GenAI SDK (application-default credentials per auth-and-setup).
EMBED_MODEL = "text-embedding-005"

def embed(text):
    response = genai_client.models.embed_content(
        model=EMBED_MODEL,
        contents=text,
    )
    return response.embeddings[0].values   # float vector, -1..+1
