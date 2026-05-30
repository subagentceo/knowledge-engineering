# Pinecone

Integrate Pinecone vector database directly into your Claude Code workflow. This plugin provides a complete toolkit for managing vector indexes, querying data with natural language, and rapidly prototyping semantic search applications—all without leaving your editor.

The MCP server gives you access to seven powerful tools: list-indexes, describe-index, describe-index-stats, search-records, create-index-for-model, upsert-records, and rerank-documents. Build RAG applications, recommendation systems, and semantic search features with full control over your vector data.

**How to use:** Run `/pinecone:quickstart` to generate AGENTS.md files and walk through a Python tutorial. Use `/pinecone:query` to search your indexes interactively—specify an index name, namespace, and optional reranker. Run `/pinecone:help` for setup guidance and troubleshooting. You can also ask Claude directly to "list my Pinecone indexes" or "create a new index for my embeddings model."

Requires a Pinecone API key set as `PINECONE_API_KEY` environment variable before starting Claude Code. Sign up for a free account at pinecone.io to get started.
