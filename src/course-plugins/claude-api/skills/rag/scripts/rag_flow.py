# /// script
# requires-python = ">=3.10"
# dependencies = [
#   "voyageai>=0.3",
#   "numpy>=1.26",
# ]
# ///
# The full RAG flow: chunk -> embed (Voyage AI) -> store -> search.
# Source: "Implementing the Rag Flow", "Text Embeddings", "The Full RAG Flow"
#   — projects/courses/building-with-the-claude-api__1p.txt
#
# The course uses Voyage AI for embeddings (Anthropic's recommendation) — separate account/API key.
# Embedding APIs normalize vectors to magnitude 1.0 automatically. Store the original text so
# retrieval is meaningful.

import voyageai

vo = voyageai.Client()  # reads VOYAGE_API_KEY from the environment


def chunk_by_section(markdown_text):
    # Structure-based chunking: split on markdown ## headers.
    sections = markdown_text.split("\n## ")
    return [s if s.startswith("## ") else "## " + s for s in sections if s.strip()]


def generate_embedding(text, input_type="document"):
    # generate_embedding accepts a string or a list.
    texts = [text] if isinstance(text, str) else text
    result = vo.embed(texts, model="voyage-3", input_type=input_type)
    return result.embeddings[0] if isinstance(text, str) else result.embeddings


if __name__ == "__main__":
    with open("report.md") as f:
        chunks = chunk_by_section(f.read())

    store = VectorIndex()  # see vector_index.py
    # Loop chunk/embedding pairs with zip() and store the original text alongside the vector.
    embeddings = generate_embedding(chunks)
    for chunk, embedding in zip(chunks, embeddings):
        store.add_vector(embedding, {"content": chunk})

    # Real-time: embed the user query with the same model, then similarity search.
    user_embedding = generate_embedding("What were the Q3 results?", input_type="query")
    results = store.search(user_embedding, 2)  # top-2 chunks with cosine distances
    print(results)
