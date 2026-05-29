# Reranking and contextual retrieval (Bedrock-course-only depth)

> Distilled from the *Claude with Amazon Bedrock* and *Claude with Google Cloud Vertex AI* courses.

The Bedrock course extends the pipeline with two post/pre-processing steps the Vertex course does
not cover at the same depth:

- **Reranking** — after hybrid retrieval, pass the candidate chunks to Claude with temporary IDs
  and ask it to return the N most relevant IDs in order (XML-formatted docs in, JSON IDs out via
  prefill + stop sequence). Adds an LLM call (latency) but materially improves ordering.
- **Contextual retrieval** — *before* indexing, send each chunk + its source document to Claude and
  ask it to situate the chunk ("this is section X of report Y, following methodology Z, before the
  financial section"); prepend that context to the chunk, then index the contextualized chunk. For
  oversized source docs, include only the document's opening chunks + the chunks just before the
  target. Improves retrieval for documents with interconnected sections.

> Vertex's course *does* mention contextual retrieval and reranking conceptually, but the worked
> Bedrock notes treat them as first-class pipeline stages. Reranking and contextual retrieval are
> model-side techniques (just more Claude calls) — they work on either platform; only the embedding
> model is genuinely platform-bound.
