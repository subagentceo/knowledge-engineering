---
title: Choose a data or storage product
description: Storage and database options available on Cloudflare's developer platform.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Choose a data or storage product

This guide describes the storage & database products available as part of Cloudflare Workers, including recommended use-cases and best practices.

## Choose a storage product

The following table maps our storage & database products to common industry terms as well as recommended use-cases:

| Use-case                                  | Product                                                                           | Ideal for                                                                                                                                                     |
| ----------------------------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Key-value storage                         | [Workers KV](https://developers.cloudflare.com/kv/)                               | Configuration data, service routing metadata, personalization (A/B testing)                                                                                   |
| Object storage / blob storage             | [R2](https://developers.cloudflare.com/r2/)                                       | User-facing web assets, images, machine learning and training datasets, analytics datasets, log and event data.                                               |
| Accelerate a Postgres or MySQL database   | [Hyperdrive](https://developers.cloudflare.com/hyperdrive/)                       | Connecting to an existing database in a cloud or on-premise using your existing database drivers & ORMs.                                                      |
| Global coordination & stateful serverless | [Durable Objects](https://developers.cloudflare.com/durable-objects/)             | Building collaborative applications; global coordination across clients; real-time WebSocket applications; strongly consistent, transactional storage.        |
| Lightweight SQL database                  | [D1](https://developers.cloudflare.com/d1/)                                       | Relational data, including user profiles, product listings and orders, and/or customer data.                                                                  |
| Task processing, batching and messaging   | [Queues](https://developers.cloudflare.com/queues/)                               | Background job processing (emails, notifications, APIs), message queuing, and deferred tasks.                                                                 |
| Vector search & embeddings queries        | [Vectorize](https://developers.cloudflare.com/vectorize/)                         | Storing [embeddings](https://developers.cloudflare.com/workers-ai/models/?tasks=Text+Embeddings) from AI models for semantic search and classification tasks. |
| Streaming ingestion                       | [Pipelines](https://developers.cloudflare.com/pipelines/)                         | Streaming data ingestion and processing, including clickstream analytics, telemetry/log data, and structured data for querying                                |
| Time-series metrics                       | [Analytics Engine](https://developers.cloudflare.com/analytics/analytics-engine/) | Write and query high-cardinality time-series data, usage metrics, and service-level telemetry using Workers and/or SQL.                                       |

Applications can build on multiple storage & database products: for example, using Workers KV for session data; R2 for large file storage, media assets and user-uploaded files; and Hyperdrive to connect to a hosted Postgres or MySQL database.

Pages Functions

Storage options can also be used by your front-end application built with Cloudflare Pages. For more information on available storage options for Pages applications, refer to the [Pages Functions bindings documentation](https://developers.cloudflare.com/pages/functions/bindings/).

## SQL database options

There are three options for SQL-based databases available when building applications with Workers.

* **Hyperdrive** if you have an existing Postgres or MySQL database, require large (1TB, 100TB or more) single databases, and/or want to use your existing database tools. You can also connect Hyperdrive to database platforms like [PlanetScale ↗](https://planetscale.com/) or [Neon ↗](https://neon.tech/).
* **D1** for lightweight, serverless applications that are read-heavy, have global users that benefit from D1's [read replication](https://developers.cloudflare.com/d1/best-practices/read-replication/), and do not require you to manage and maintain a traditional RDBMS.
* **Durable Objects** for stateful serverless workloads, per-user or per-customer SQL state, and building distributed systems (D1 and Queues are built on Durable Objects) where Durable Object's [strict serializability ↗](https://blog.cloudflare.com/durable-objects-easy-fast-correct-choose-three/) enables global ordering of requests and storage operations.

### Session storage

We recommend using [Workers KV](https://developers.cloudflare.com/kv/) for storing session data, credentials (API keys), and/or configuration data. These are typically read at high rates (thousands of RPS or more), are not typically modified (within KV's 1 write RPS per unique key limit), and do not need to be immediately consistent.

Frequently read keys benefit from KV's [internal cache](https://developers.cloudflare.com/kv/concepts/how-kv-works/), and repeated reads to these "hot" keys will typically see latencies in the 500µs to 10ms range.

Authentication frameworks like [OpenAuth ↗](https://openauth.js.org/docs/storage/cloudflare/) use Workers KV as session storage when deployed to Cloudflare, and [Cloudflare Access](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) uses KV to securely store and distribute user credentials so that they can be validated as close to the user as possible and reduce overall latency.

## Product overviews

### Workers KV

Workers KV is an eventually consistent key-value data store that caches on the Cloudflare global network.

It is ideal for projects that require:

* High volumes of reads and/or repeated reads to the same keys.
* Low-latency global reads (typically within 10ms for hot keys)
* Per-object time-to-live (TTL).
* Distributed configuration and/or session storage.

To get started with KV:

* Read how [KV works](https://developers.cloudflare.com/kv/concepts/how-kv-works/).
* Create a [KV namespace](https://developers.cloudflare.com/kv/concepts/kv-namespaces/).
* Review the [KV Runtime API](https://developers.cloudflare.com/kv/api/).
* Learn about KV [Limits](https://developers.cloudflare.com/kv/platform/limits/).

### R2

R2 is S3-compatible blob storage that allows developers to store large amounts of unstructured data without egress fees associated with typical cloud storage services.

It is ideal for projects that require:

* Storage for files which are infrequently accessed.
* Large object storage (for example, gigabytes or more per object).
* Strong consistency per object.
* Asset storage for websites (refer to [caching guide](https://developers.cloudflare.com/r2/buckets/public-buckets/#caching))

To get started with R2:

* Read the [Get started guide](https://developers.cloudflare.com/r2/get-started/).
* Learn about R2 [Limits](https://developers.cloudflare.com/r2/platform/limits/).
* Review the [R2 Workers API](https://developers.cloudflare.com/r2/api/workers/workers-api-reference/).

### Durable Objects

Durable Objects provide low-latency coordination and consistent storage for the Workers platform through global uniqueness and a transactional storage API.

* Global Uniqueness guarantees that there will be a single instance of a Durable Object class with a given ID running at once, across the world. Requests for a Durable Object ID are routed by the Workers runtime to the Cloudflare data center that owns the Durable Object.
* The transactional storage API provides strongly consistent key-value storage to the Durable Object. Each Object can only read and modify keys associated with that Object. Execution of a Durable Object is single-threaded, but multiple request events may still be processed out-of-order from how they arrived at the Object.

It is ideal for projects that require:

* Real-time collaboration (such as a chat application or a game server).
* Consistent storage.
* Data locality.

To get started with Durable Objects:

* Read the [introductory blog post ↗](https://blog.cloudflare.com/introducing-workers-durable-objects/).
* Review the [Durable Objects documentation](https://developers.cloudflare.com/durable-objects/).
* Get started with [Durable Objects](https://developers.cloudflare.com/durable-objects/get-started/).
* Learn about Durable Objects [Limits](https://developers.cloudflare.com/durable-objects/platform/limits/).

### D1

[D1](https://developers.cloudflare.com/d1/) is Cloudflare’s native serverless database. With D1, you can create a database by importing data or defining your tables and writing your queries within a Worker or through the API.

D1 is ideal for:

* Persistent, relational storage for user data, account data, and other structured datasets.
* Use-cases that require querying across your data ad-hoc (using SQL).
* Workloads with a high ratio of reads to writes (most web applications).

To get started with D1:

* Read [the documentation](https://developers.cloudflare.com/d1)
* Follow the [Get started guide](https://developers.cloudflare.com/d1/get-started/) to provision your first D1 database.
* Review the [D1 Workers Binding API](https://developers.cloudflare.com/d1/worker-api/).

Note

If your working data size exceeds 10 GB (the maximum size for a D1 database), consider splitting the database into multiple, smaller D1 databases.

### Queues

Cloudflare Queues allows developers to send and receive messages with guaranteed delivery. It integrates with [Cloudflare Workers](https://developers.cloudflare.com/workers) and offers at-least once delivery, message batching, and does not charge for egress bandwidth.

Queues is ideal for:

* Offloading work from a request to schedule later.
* Send data from Worker to Worker (inter-Service communication).
* Buffering or batching data before writing to upstream systems, including third-party APIs or [Cloudflare R2](https://developers.cloudflare.com/queues/examples/send-errors-to-r2/).

To get started with Queues:

* [Set up your first queue](https://developers.cloudflare.com/queues/get-started/).
* Learn more [about how Queues works](https://developers.cloudflare.com/queues/reference/how-queues-works/).

### Hyperdrive

Hyperdrive is a service that accelerates queries you make to MySQL and Postgres databases, making it faster to access your data from across the globe, irrespective of your users’ location.

Hyperdrive allows you to:

* Connect to an existing database from Workers without connection overhead.
* Cache frequent queries across Cloudflare's global network to reduce response times on highly trafficked content.
* Reduce load on your origin database with connection pooling.

To get started with Hyperdrive:

* [Connect Hyperdrive](https://developers.cloudflare.com/hyperdrive/get-started/) to your existing database.
* Learn more [about how Hyperdrive speeds up your database queries](https://developers.cloudflare.com/hyperdrive/concepts/how-hyperdrive-works/).

## Pipelines

Pipelines is a streaming ingestion service that allows you to ingest high volumes of real time data, without managing any infrastructure.

Pipelines allows you to:

* Ingest data at extremely high throughput (tens of thousands of records per second or more)
* Batch and write data directly to object storage, ready for querying
* (Future) Transform and aggregate data during ingestion

To get started with Pipelines:

* [Create a Pipeline](https://developers.cloudflare.com/pipelines/getting-started/) that can batch and write records to R2.

### Analytics Engine

Analytics Engine is Cloudflare's time-series and metrics database that allows you to write unlimited-cardinality analytics at scale using a built-in API to write data points from Workers and query that data using SQL directly.

Analytics Engine allows you to:

* Expose custom analytics to your own customers
* Build usage-based billing systems
* Understand the health of your service on a per-customer or per-user basis
* Add instrumentation to frequently called code paths, without impacting performance or overwhelming external analytics systems with events

Cloudflare uses Analytics Engine internally to store and product per-product metrics for products like D1 and R2 at scale.

To get started with Analytics Engine:

* Learn how to [get started with Analytics Engine](https://developers.cloudflare.com/analytics/analytics-engine/get-started/)
* See [an example of writing time-series data to Analytics Engine](https://developers.cloudflare.com/analytics/analytics-engine/recipes/usage-based-billing-for-your-saas-product/)
* Understand the [SQL API](https://developers.cloudflare.com/analytics/analytics-engine/sql-api/) for reading data from your Analytics Engine datasets

### Vectorize

Vectorize is a globally distributed vector database that enables you to build full-stack, AI-powered applications with Cloudflare Workers and [Workers AI](https://developers.cloudflare.com/workers-ai/).

Vectorize allows you to:

* Store embeddings from any vector embeddings model (Bring Your Own embeddings) for semantic search and classification tasks.
* Add context to Large Language Model (LLM) queries by using vector search as part of a [Retrieval Augmented Generation](https://developers.cloudflare.com/workers-ai/guides/tutorials/build-a-retrieval-augmented-generation-ai/) (RAG) workflow.
* [Filter on vector metadata](https://developers.cloudflare.com/vectorize/reference/metadata-filtering/) to reduce the search space and return more relevant results.

To get started with Vectorize:

* [Create your first vector database](https://developers.cloudflare.com/vectorize/get-started/intro/).
* Combine [Workers AI and Vectorize](https://developers.cloudflare.com/vectorize/get-started/embeddings/) to generate, store and query text embeddings.
* Learn more about [how vector databases work](https://developers.cloudflare.com/vectorize/reference/what-is-a-vector-database/).

## SQL in Durable Objects vs D1

Cloudflare Workers offers a SQLite-backed serverless database product - [D1](https://developers.cloudflare.com/d1/). How should you compare [SQLite in Durable Objects](https://developers.cloudflare.com/durable-objects/best-practices/access-durable-objects-storage/) and D1?

**D1 is a managed database product.**

D1 fits into a familiar architecture for developers, where application servers communicate with a database over the network. Application servers are typically Workers; however, D1 also supports external, non-Worker access via an [HTTP API ↗](https://developers.cloudflare.com/api/resources/d1/subresources/database/methods/query/), which helps unlock [third-party tooling](https://developers.cloudflare.com/d1/reference/community-projects/#%5Ftop) support for D1.

D1 aims for a "batteries included" feature set, including the above HTTP API, [database schema management](https://developers.cloudflare.com/d1/reference/migrations/#%5Ftop), [data import/export](https://developers.cloudflare.com/d1/best-practices/import-export-data/), and [database query insights](https://developers.cloudflare.com/d1/observability/metrics-analytics/#query-insights).

With D1, your application code and SQL database queries are not colocated which can impact application performance. If performance is a concern with D1, Workers has [Smart Placement](https://developers.cloudflare.com/workers/configuration/placement/#%5Ftop) to dynamically run your Worker in the best location to reduce total Worker request latency, considering everything your Worker talks to, including D1.

**SQLite in Durable Objects is a lower-level compute with storage building block for distributed systems.**

By design, Durable Objects are accessed with Workers-only.

Durable Objects require a bit more effort, but in return, give you more flexibility and control. With Durable Objects, you must implement two pieces of code that run in different places: a front-end Worker which routes incoming requests from the Internet to a unique Durable Object, and the Durable Object itself, which runs on the same machine as the SQLite database. You get to choose what runs where, and it may be that your application benefits from running some application business logic right next to the database.

With SQLite in Durable Objects, you may also need to build some of your own database tooling that comes out-of-the-box with D1.

SQL query pricing and limits are intended to be identical between D1 ([pricing](https://developers.cloudflare.com/d1/platform/pricing/), [limits](https://developers.cloudflare.com/d1/platform/limits/)) and SQLite in Durable Objects ([pricing](https://developers.cloudflare.com/durable-objects/platform/pricing/#sqlite-storage-backend), [limits](https://developers.cloudflare.com/durable-objects/platform/limits/)).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/platform/storage-options/#page","headline":"Choosing a data or storage product. · Cloudflare Workers docs","description":"Storage and database options available on Cloudflare's developer platform.","url":"https://developers.cloudflare.com/workers/platform/storage-options/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/platform/","name":"Platform"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/platform/storage-options/","name":"Choose a data or storage product"}}]}
```
