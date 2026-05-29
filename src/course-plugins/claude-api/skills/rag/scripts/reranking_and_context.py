# /// script
# requires-python = ">=3.10"
# dependencies = [
#   "anthropic>=0.40",
#   "python-dotenv>=1.0",
# ]
# ///
# Reranking with an LLM and contextual retrieval.
# Source: "Reranking Results", "Contextual Retrieval"
#   — projects/courses/building-with-the-claude-api__1p.txt
#
# Reranking: pass query + candidate document IDs (not full text, for efficiency); instruct Claude
# to return the most relevant IDs in decreasing order; use prefill + stop for structured JSON.
# Contextual retrieval: before embedding, send chunk + source document to Claude and have it
# generate a brief context note, then concatenate ("contextualized chunk") before indexing.

import json
from dotenv import load_dotenv
from anthropic import Anthropic

load_dotenv()

client = Anthropic()
model = "claude-sonnet-4-5"


def rerank(query, candidates):
    # candidates: list of {"id": ..., "content": ...}
    listing = "\n".join(f'{c["id"]}: {c["content"]}' for c in candidates)
    message = client.messages.create(
        model=model,
        max_tokens=500,
        messages=[
            {
                "role": "user",
                "content": (
                    f"Query: {query}\n\nDocuments:\n{listing}\n\n"
                    "Return the document IDs most relevant to the query, in decreasing order."
                ),
            },
            {"role": "assistant", "content": "```json"},  # structured JSON via prefill + stop
        ],
        stop_sequences=["```"],
    )
    return json.loads(message.content[0].text)  # list of IDs, most relevant first


def add_context(chunk, source_text):
    # For documents too large for one prompt, use a selective strategy: include 1-3 starter
    # chunks (summary/abstract) + the chunks immediately before the target, skip the middle.
    message = client.messages.create(
        model=model,
        max_tokens=200,
        messages=[
            {
                "role": "user",
                "content": (
                    f"<document>{source_text}</document>\n\n"
                    f"<chunk>{chunk}</chunk>\n\n"
                    "Give a short context note situating this chunk within the document."
                ),
            }
        ],
    )
    context = message.content[0].text
    return f"{context}\n\n{chunk}"  # contextualized chunk, indexed into vector/BM25 stores
