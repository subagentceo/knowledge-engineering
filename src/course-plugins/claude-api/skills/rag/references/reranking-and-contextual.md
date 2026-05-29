# Reranking and contextual retrieval

## Reranking

After hybrid retrieval, an LLM reorders candidates by relevance. Pass the user query + candidate documents (use document **IDs**, not full text, for efficiency) and instruct Claude to return the most relevant IDs in decreasing order; use assistant prefill + stop sequence for structured JSON. Adds latency (extra LLM call) but catches nuanced intent (e.g. "ENG team" → "engineering team") that hybrid search ranked lower.

## Contextual retrieval

Chunks lose document context when split, hurting retrieval. Before embedding, add situating context to each chunk: send chunk + source document to Claude, have it generate a brief context note, and concatenate ("contextualized chunk") before indexing into the vector/BM25 stores. For documents too large for one prompt, use a selective strategy: include 1–3 starter chunks (summary/abstract) + the chunks immediately before the target (local context), skip the less-relevant middle. Implemented as `add_context(chunk, source_text)`.
