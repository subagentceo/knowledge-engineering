# Embeddings and the full RAG flow

## Embeddings

An embedding model takes text and outputs a long list of numbers (each in −1..+1) representing the text's meaning; individual dimensions score unknown features. **Semantic search** uses embeddings to match a user query to relevant chunks (similarity matching, not keyword matching). The course uses **Voyage AI** for embeddings (Anthropic's recommendation) — separate account/API key, free to start, SDK integration.

## The full RAG flow (7 steps)

Pre-processing: (1) chunk documents → (2) generate embeddings → (3) normalize vectors to magnitude 1.0 (embedding APIs do this automatically) → (4) store embeddings in a vector database. Real-time: (5) embed the user query with the same model → (6) similarity search → (7) assemble query + retrieved chunks into the prompt and send to Claude.

Math: **cosine similarity** = cosine of the angle between vectors, −1..1, closer to 1 = more similar; **cosine distance** = 1 − similarity, closer to 0 = more similar.

Implementation sketch: `chunk_by_section(report.md)` → `generate_embedding(chunk)` (accepts a string or list) → create a vector index, loop chunk/embedding pairs with `zip()` and `store.add_vector(embedding, {content: chunk})` (store the original text so retrieval is meaningful) → embed the query → `store.search(user_embedding, 2)` returns the top-2 chunks with cosine distances.
