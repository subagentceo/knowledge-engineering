# Chunking strategies

To answer questions over large documents (100–1000+ pages), don't dump the whole text into the prompt (token limits, lower effectiveness on long prompts, higher cost, slower). Instead: chunk the document, and at query time retrieve only the most relevant chunks into the prompt. Trades simplicity for scalability and efficiency.

Chunking quality drives RAG quality (bad chunks → a medical "bug" chunk retrieved for a software-bug query). Three strategies:

1. **Size-based** — equal-length strings. Easiest, most common in production; risks cut-off words and lost context. Mitigate with **overlap** (include characters from neighboring chunks) — duplicates some text but preserves meaning.
2. **Structure-based** — split on document structure (markdown `##` headers, paragraphs, sections). Best for structured docs; requires guaranteed formatting.
3. **Semantic-based** — group related sentences by semantic similarity via NLP. Most advanced, most complex.

Fallback ranking: by character (most reliable, any doc) → by sentence (good middle ground) → by section (best results, needs structured input). No universal best — depends on your document guarantees.
