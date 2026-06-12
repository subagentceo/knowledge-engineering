# Introduction

**100B Vector Search**
- p50: 46ms
- p90: 61ms
- p99: 185ms

**Vector Query** (768 dimensions, f16, 10M docs, ~15GB. Strongly consistent.)
- warm (10M docs): p50=14ms, p90=17ms, p99=27ms
- cold (10M docs): p50=874ms, p90=1214ms, p99=1686ms

**Full-Text Search** (BM25, 1M docs, ~300MB. Strongly consistent.)
- warm (1M docs): p50=13ms, p90=18ms, p99=29ms
- cold (1M docs): p50=316ms, p90=381ms, p99=559ms

**Upsert** (Time for the batch to be durably acknowledged by object storage. Documents are immediately available to consistent reads after this.)
- Upsert latency (512kb docs): p50=165ms, p90=248ms, p99=850ms

```
                        ╔═ turbopuffer ════════════════════════════╗
╔════════════╗          ║                                          ║░
║            ║░         ║  ┏━━━━━━━━━━━━━━━┓     ┏━━━━━━━━━━━━━━┓  ║░
║   client   ║░───API──▶║  ┃    Memory/    ┃────▶┃    Object    ┃  ║░
║            ║░         ║  ┃   SSD Cache   ┃     ┃ Storage (S3) ┃  ║░
╚════════════╝░         ║  ┗━━━━━━━━━━━━━━━┛     ┗━━━━━━━━━━━━━━┛  ║░
 ░░░░░░░░░░░░░░         ║                                          ║░
                        ╚══════════════════════════════════════════╝░
                         ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
```

turbopuffer is a fast, object-storage native search engine. We service  documents, , and .

Using only object storage for state and NVMe SSD with memory cache for compute,
turbopuffer scales low-latency queries to petabyte scale. This makes turbopuffer
as fast as in-memory search engines when cached, but far cheaper to run.

turbopuffer has many features you'd expect from a database optimized for search, including:

* [Filters](/docs/query#param-filters), against an inverted index
* [Text search](/docs/query#param-rank_by), ranking and boosting
* [Vector search](/docs/query#param-rank_by), >90% recall, combined with any filters, dense & sparse
* [Regex search](/docs/query#param-Regex), with fast trigram regex indexes
* [Branching](/docs/branching), copy-on-write namespaces
* [Encryption](/docs/encryption), your key or your customer's
* Multi-tenant (default), single-tenant, or BYOC deployments

turbopuffer's [tradeoffs](/docs/tradeoffs) for its excellent economics and
scalability are higher write latency (p90=248ms
for 512KB upserts) from writing directly to object storage, and occasional cold
queries for uncached or [unpinned](/docs/pinning) data (p90=1214ms
on 1M documents). These are excellent tradeoffs for search.

Using object storage as the sole source of truth enables operations like
[branching](/docs/branching) — a copy-on-write clone of any namespace, created
in constant time regardless of size, with fully independent reads and writes
afterward.

turbopuffer is currently focused on first-stage retrieval to efficiently narrow
millions of documents (trillions of tokens) down to tens or hundreds documents
(thousands of tokens). While it may have fewer features than traditional search
engines, this streamlined approach enables higher quality, more maintainable
search applications that you can customize in your preferred programming
language. See [Hybrid Search](/docs/hybrid-search) to get started.

To get started with turbopuffer, see the [quickstart guide](/docs/quickstart).


---

This page: [/docs/index.md](https://turbopuffer.com/docs/index.md)

All documentation pages: [/llms.txt](https://turbopuffer.com/llms.txt)

All documentation in one file: [/llms-full.txt](https://turbopuffer.com/llms-full.txt)
