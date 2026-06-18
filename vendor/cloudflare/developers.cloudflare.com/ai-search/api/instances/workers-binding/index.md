---
title: Workers binding
description: Manage AI Search instances from a Cloudflare Worker using the Instances Workers binding.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-search/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Workers binding

[Workers](https://developers.cloudflare.com/workers/) provides a serverless execution environment that allows you to create new applications or augment existing ones. Use a [Workers binding](https://developers.cloudflare.com/workers/runtime-apis/bindings/) to create, list, update, and delete AI Search instances from a Cloudflare Worker. You can also check instance configuration and monitor indexing progress.

## Configure the binding

To use AI Search with Workers, you must create an AI Search binding. You create bindings by updating your [Wrangler configuration](https://developers.cloudflare.com/workers/wrangler/configuration/). AI Search provides two types of bindings:

* Namespace binding: `ai_search_namespaces`
* Instance binding: `ai_search`

### Namespace binding

Access all instances within a [namespace](https://developers.cloudflare.com/ai-search/concepts/namespaces/). You can get, create, list, and delete instances at runtime.

* [  wrangler.jsonc ](#tab-panel-6596)
* [  wrangler.toml ](#tab-panel-6597)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "compatibility_date": "2026-03-27",

  "ai_search_namespaces": [

    {

      "binding": "AI_SEARCH",

      "namespace": "my-namespace"

    }

  ]

}


```

TOML

```

compatibility_date = "2026-03-27"


[[ai_search_namespaces]]

binding = "AI_SEARCH"

namespace = "my-namespace"


```

| Field     | Type    | Required | Description                                                                                                                                                                                                                   |
| --------- | ------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| binding   | string  | Yes      | The variable name available on env. For example, "AI\_SEARCH" makes it accessible as env.AI\_SEARCH.                                                                                                                          |
| namespace | string  | Yes      | The [namespace](https://developers.cloudflare.com/ai-search/concepts/namespaces/) to bind to. A default namespace is created automatically for every account. If the namespace does not exist, Wrangler creates it on deploy. |
| remote    | boolean | No       | Set to true for local development with wrangler dev.                                                                                                                                                                          |

### Instance binding

Bind directly to a single instance in the `default` namespace. Use this when you know which instance you need at deploy time.

* [  wrangler.jsonc ](#tab-panel-6598)
* [  wrangler.toml ](#tab-panel-6599)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "compatibility_date": "2026-03-27",

  "ai_search": [

    {

      "binding": "MY_SEARCH",

      "instance_name": "my-instance"

    }

  ]

}


```

TOML

```

compatibility_date = "2026-03-27"


[[ai_search]]

binding = "MY_SEARCH"

instance_name = "my-instance"


```

| Field          | Type    | Required | Description                                                                                          |
| -------------- | ------- | -------- | ---------------------------------------------------------------------------------------------------- |
| binding        | string  | Yes      | The variable name available on env. For example, "MY\_SEARCH" makes it accessible as env.MY\_SEARCH. |
| instance\_name | string  | Yes      | The name of the AI Search instance. Must exist in the default namespace at deploy time.              |
| remote         | boolean | No       | Set to true for local development with wrangler dev.                                                 |

## Namespace methods

The following methods are only available when using the `ai_search_namespaces` binding. The namespace handle (`env.AI_SEARCH`) exposes methods for working with instances within a [namespace](https://developers.cloudflare.com/ai-search/concepts/namespaces/).

### `get()`

Returns a handle to a specific instance. This is **synchronous** and does not make a network call. The instance is resolved lazily when you call methods like `search()` or `info()`.

TypeScript

```

const instance = env.AI_SEARCH.get("my-instance");

const results = await instance.search({

  messages: [{ role: "user", content: "What is Cloudflare?" }],

});


```

#### Parameters

| Parameter | Type   | Required | Description                                  |
| --------- | ------ | -------- | -------------------------------------------- |
| name      | string | Yes      | The name of the instance to get a handle to. |

### `list()`

Returns all instances within the namespace.

TypeScript

```

const { result, result_info } = await env.AI_SEARCH.list();


for (const instance of result) {

  console.log(`${instance.id} (${instance.type}) - ${instance.status}`);

}

// result_info.total_count contains the total number of instances


```

#### Parameters

| Parameter            | Type   | Required | Description                                                     |
| -------------------- | ------ | -------- | --------------------------------------------------------------- |
| page                 | number | No       | The page number to return. Defaults to 1.                       |
| per\_page            | number | No       | The number of instances per page. Defaults to 20. Maximum 100.  |
| search               | string | No       | Search instances by ID.                                         |
| order\_by            | string | No       | Sort column. Valid value: created\_at. Defaults to created\_at. |
| order\_by\_direction | string | No       | Sort direction. Valid values: asc, desc. Defaults to desc.      |

#### Response

| Field                     | Type    | Description                                                          |
| ------------------------- | ------- | -------------------------------------------------------------------- |
| result                    | array   | Array of instance objects.                                           |
| result\[\].id             | string  | The instance identifier.                                             |
| result\[\].type           | string  | The data source type (r2, web-crawler, or null for empty instances). |
| result\[\].source         | string  | The data source location.                                            |
| result\[\].status         | string  | The instance status (active, waiting, indexing).                     |
| result\[\].enable         | boolean | Whether the instance is enabled.                                     |
| result\[\].namespace      | string  | The namespace the instance belongs to.                               |
| result\[\].created\_at    | string  | ISO 8601 timestamp of when the instance was created.                 |
| result\[\].modified\_at   | string  | ISO 8601 timestamp of the last modification.                         |
| result\_info              | object  | Pagination metadata.                                                 |
| result\_info.total\_count | number  | Total number of instances in the namespace.                          |

### `create()`

Creates a new instance and returns a handle to it. You can create instances backed by a data source or create empty instances for use with the [Items API](https://developers.cloudflare.com/ai-search/api/items/workers-binding/).

**Create an empty instance for file uploads:**

AI Search instances come with [built-in storage](https://developers.cloudflare.com/ai-search/configuration/data-source/built-in-storage/) where you can upload documents directly.

TypeScript

```

const instance = await env.AI_SEARCH.create({

  id: "knowledge-base",

});


// Upload documents using the Items API

await instance.items.upload("guide.pdf", pdfArrayBuffer);


```

**Create a web-crawler instance:**

Automatically crawl and index a website that you own. For more configuration options, refer to [Website data source](https://developers.cloudflare.com/ai-search/configuration/data-source/website/).

TypeScript

```

const instance = await env.AI_SEARCH.create({

  id: "my-docs",

  type: "web-crawler",

  source: "developers.cloudflare.com",

});


```

**Create an R2-backed instance:**

Index documents stored in an [R2](https://developers.cloudflare.com/r2/) bucket. For more configuration options, refer to [R2 data source](https://developers.cloudflare.com/ai-search/configuration/data-source/r2/).

TypeScript

```

const instance = await env.AI_SEARCH.create({

  id: "internal-docs",

  type: "r2",

  source: "my-docs-bucket",

});


```

#### Parameters

`id` ` string ` required

The unique identifier for the AI Search instance. Must be 1-64 characters and match the pattern `^[a-z0-9_]+(?:-[a-z0-9_]+)*$`.

---

`type` ` string ` optional

The type of data source. Valid values: `r2`, `web-crawler`. Required when creating an instance with a data source. Omit when creating an empty instance for use with the [Items API](https://developers.cloudflare.com/ai-search/api/items/workers-binding/).

---

`source` ` string ` optional

The data source location. For `r2` type, this is the R2 bucket name. For `web-crawler` type, this is the website domain. Required when `type` is specified.

---

`source_params` ` object ` optional

Additional parameters for the data source.

* `prefix` ` string ` optional  
   * For R2 sources, limits indexing to objects with this key prefix.
* `r2_jurisdiction` ` string ` optional  
   * The jurisdiction for the R2 bucket, for example `eu`.
* `include_items` ` array ` optional  
   * Glob patterns for paths to include in indexing. For example: `["/blog/**", "/docs/**/*.html"]`.
* `exclude_items` ` array ` optional  
   * Glob patterns for paths to exclude from indexing. For example: `["/admin/**", "/private/**"]`.
* `web_crawler` ` object ` optional  
   * Configuration for web crawler sources.  
   * `parse_type` ` string ` optional  
         * The parsing method. Valid value: `sitemap`.  
   * `parse_options` ` object ` optional  
         * `include_headers` ` object ` optional  
                  * Custom HTTP headers to include when crawling.  
         * `include_images` ` boolean ` optional  
                  * Whether to include images in the index.  
         * `specific_sitemaps` ` array ` optional  
                  * Specific sitemap URLs to crawl. For example: `["https://example.com/sitemap.xml"]`.  
         * `use_browser_rendering` ` boolean ` optional  
                  * Use Browser Run (formerly Browser Rendering) to crawl JavaScript-rendered pages.  
   * `store_options` ` object ` optional  
         * `storage_type` ` string ` optional  
                  * The storage type. Valid value: `r2`.  
         * `storage_id` ` string ` optional  
                  * The storage bucket ID.  
         * `r2_jurisdiction` ` string ` optional  
                  * The jurisdiction for the storage bucket.

---

`index_method` ` object ` optional

Configures which indexing methods are enabled for the instance. Determines whether vector (semantic) search, keyword search, or both are available. At least one must be `true`.

* `vector` ` boolean ` optional  
   * Enable vector-based semantic search. Defaults to `true`.
* `keyword` ` boolean ` optional  
   * Enable keyword-based search. Defaults to `false`.

Set both to `true` for hybrid search.

---

`fusion_method` ` string ` optional

Controls how vector and keyword scores are combined when using hybrid search. Valid values: `rrf` (Reciprocal Rank Fusion), `max` (takes the maximum score). Defaults to `rrf`.

---

`indexing_options` ` object ` optional

Configuration for how content is indexed.

* `keyword_tokenizer` ` string ` optional  
   * The tokenizer used for keyword search indexing. Valid values: `porter` (stemming-based), `trigram` (character n-gram). Defaults to `porter`.

---

`retrieval_options` ` object ` optional

Default retrieval configuration for the instance. These defaults can be overridden per-request using `ai_search_options`.

* `keyword_match_mode` ` string ` optional  
   * Controls how keyword (BM25) matching selects candidate documents. `and` requires all terms to match. `or` requires any term to match. Defaults to `and`.
* `boost_by` ` array ` optional  
   * Default boost fields applied to all search queries. Maximum 3 items. Each item has:  
         * `field` ` string ` required \- The metadata field name to boost by. Maximum 64 characters.  
         * `direction` ` string ` optional \- The boost direction. Valid values: `asc`, `desc`, `exists`, `not_exists`.

---

`sync_interval` ` number ` optional

Seconds between automatic data source syncs. Valid values: `3600`, `7200`, `14400`, `21600`, `43200`, `86400`. Defaults to `21600` (6 hours).

---

`token_id` ` string ` optional

The UUID of the [service API token](https://developers.cloudflare.com/ai-search/configuration/indexing/service-api-token/) to use for this instance. Only required if you have never created an AI Search instance before. Refer to the [API get started guide](https://developers.cloudflare.com/ai-search/get-started/api/) for how to create and register a service token.

---

`ai_gateway_id` ` string ` optional

The AI Gateway ID to route requests through for logging and analytics.

---

`embedding_model` ` string ` optional

The embedding model to use for vectorizing content.

---

`ai_search_model` ` string ` optional

The text-generation model to use for generating responses.

---

`rewrite_query` ` boolean ` optional

Enable query rewriting to improve retrieval accuracy. Defaults to `false`.

---

`rewrite_model` ` string ` optional

The model to use for query rewriting.

---

`reranking` ` boolean ` optional

Enable reranking to reorder retrieved results by semantic relevance. Defaults to `false`.

---

`reranking_model` ` string ` optional

The reranking model to use. Valid value: `@cf/baai/bge-reranker-base`.

---

`chunk_size` ` number ` optional

The size of chunks when splitting documents. Minimum value: `64`.

---

`chunk_overlap` ` number ` optional

The overlap between chunks. Minimum value: `0`.

---

`max_num_results` ` number ` optional

The default maximum number of results to return. Minimum value: `1`.

---

`score_threshold` ` number ` optional

The default minimum score threshold for results. Minimum value: `0`.

---

`cache` ` boolean ` optional

Enable response caching. Defaults to `true`.

---

`cache_threshold` ` string ` optional

The cache matching threshold. Valid values: `super_strict_match`, `close_enough`, `flexible_friend`, `anything_goes`. Defaults to `close_enough`.

---

`custom_metadata` ` array ` optional

Custom metadata fields to extract and index from documents.

* `field_name` ` string ` required  
   * The name of the metadata field.
* `data_type` ` string ` required  
   * The data type of the field. Valid values: `text`, `number`, `boolean`, `datetime`.

---

`enable` ` boolean ` optional

Whether the instance is enabled. Defaults to `true`.

#### Response

Returns an `AiSearchInstance` handle that is immediately usable for calling methods like `search()`, `info()`, `stats()`, and `items.upload()`. Call `info()` on the handle to get the instance configuration.

### `delete()`

Permanently deletes an instance and all its indexed content. This action cannot be undone.

TypeScript

```

await env.AI_SEARCH.delete("old-docs");


```

#### Parameters

| Parameter | Type   | Required | Description                         |
| --------- | ------ | -------- | ----------------------------------- |
| name      | string | Yes      | The name of the instance to delete. |

#### Response

Returns `void`. Throws an error if the instance does not exist.

Warning

Deleting an instance permanently removes all indexed data, including embeddings, chunks, and source files.

## Instance methods

The following methods are available on both the `ai_search_namespaces` and `ai_search` bindings. With the namespace binding, call methods on the handle returned by `get()`. With the instance binding, call methods directly on the binding (for example, `env.MY_SEARCH.info()`).

The examples below use the namespace binding.

### `update()`

Partially updates the instance configuration. Only the fields you pass are modified.

TypeScript

```

const updated = await env.AI_SEARCH.get("my-instance").update({

  ai_search_model: "@cf/meta/llama-3.3-70b-instruct-fp8-fast",

  reranking: true,

});


```

#### Parameters

Accepts a partial version of the [create parameters](#parameters). Only the fields you include are updated.

| Field              | Type    | Description                                                           |
| ------------------ | ------- | --------------------------------------------------------------------- |
| ai\_search\_model  | string  | The text-generation model.                                            |
| embedding\_model   | string  | The embedding model.                                                  |
| index\_method      | object  | Indexing methods: \\{ vector: boolean, keyword: boolean \\}.          |
| fusion\_method     | string  | How vector and keyword scores are combined (rrf or max).              |
| indexing\_options  | object  | Indexing configuration including keyword\_tokenizer.                  |
| retrieval\_options | object  | Retrieval configuration including keyword\_match\_mode and boost\_by. |
| reranking          | boolean | Turn on or off reranking.                                             |
| reranking\_model   | string  | The reranking model.                                                  |
| rewrite\_query     | boolean | Turn on or off query rewriting.                                       |
| rewrite\_model     | string  | The query rewriting model.                                            |
| source             | string  | Update the data source location.                                      |
| cache              | boolean | Turn on or off response caching.                                      |
| chunk\_size        | number  | Token size of each chunk.                                             |
| chunk\_overlap     | number  | Token overlap between chunks.                                         |
| score\_threshold   | number  | Minimum score threshold for results.                                  |
| max\_num\_results  | number  | Maximum number of results per query.                                  |
| custom\_metadata   | array   | Custom metadata field definitions.                                    |
| sync\_interval     | number  | Seconds between automatic data source syncs.                          |

#### Response

Returns the updated instance configuration. Same shape as [info()](#response-2).

### `info()`

Returns the current configuration and metadata for the instance.

TypeScript

```

const info = await env.AI_SEARCH.get("my-instance").info();


```

#### Response

| Field              | Type    | Description                                                           |
| ------------------ | ------- | --------------------------------------------------------------------- |
| id                 | string  | The instance identifier.                                              |
| type               | string  | The data source type (r2, web-crawler, or null).                      |
| source             | string  | The data source location.                                             |
| namespace          | string  | The namespace the instance belongs to.                                |
| status             | string  | The instance status (active, waiting, indexing).                      |
| enable             | boolean | Whether the instance is enabled.                                      |
| created\_at        | string  | Timestamp of when the instance was created.                           |
| modified\_at       | string  | Timestamp of the last modification.                                   |
| ai\_search\_model  | string  | The text-generation model.                                            |
| embedding\_model   | string  | The embedding model.                                                  |
| reranking          | boolean | Whether reranking is enabled.                                         |
| reranking\_model   | string  | The reranking model.                                                  |
| rewrite\_query     | boolean | Whether query rewriting is enabled.                                   |
| rewrite\_model     | string  | The query rewriting model.                                            |
| cache              | boolean | Whether response caching is enabled.                                  |
| cache\_threshold   | string  | The similarity threshold for cache hits.                              |
| index\_method      | object  | Which indexing methods are enabled (vector, keyword).                 |
| fusion\_method     | string  | How vector and keyword scores are combined (rrf or max).              |
| indexing\_options  | object  | Indexing configuration including keyword\_tokenizer.                  |
| retrieval\_options | object  | Retrieval configuration including keyword\_match\_mode and boost\_by. |
| chunk\_size        | number  | Token size of each chunk.                                             |
| chunk\_overlap     | number  | Token overlap between chunks.                                         |
| score\_threshold   | number  | Minimum score threshold for results.                                  |
| max\_num\_results  | number  | Maximum number of results per query.                                  |
| sync\_interval     | number  | Seconds between automatic data source syncs.                          |
| custom\_metadata   | array   | Custom metadata field definitions.                                    |
| last\_activity     | string  | Timestamp of the last indexing activity.                              |

### `stats()`

Returns the current indexing progress for the instance. Use this to poll for completion after creating an instance or uploading files.

TypeScript

```

const stats = await env.AI_SEARCH.get("my-instance").stats();


```

#### Response

| Field                         | Type   | Description                                       |
| ----------------------------- | ------ | ------------------------------------------------- |
| queued                        | number | Items waiting to be processed.                    |
| running                       | number | Items currently being processed.                  |
| completed                     | number | Items successfully indexed.                       |
| error                         | number | Items that failed to index.                       |
| skipped                       | number | Items skipped during indexing.                    |
| outdated                      | number | Items that need re-indexing.                      |
| last\_activity                | string | ISO 8601 timestamp of the last indexing activity. |
| file\_embed\_errors           | object | Map of file IDs to embedding error details.       |
| engine.vectorize.vectorsCount | number | Total number of vectors stored.                   |
| engine.vectorize.dimensions   | number | Dimensions of the vector embeddings.              |
| engine.r2.payloadSizeBytes    | number | Total size of stored payloads in bytes.           |
| engine.r2.metadataSizeBytes   | number | Total size of stored metadata in bytes.           |
| engine.r2.objectCount         | number | Total number of objects in storage.               |

## Local development

Local development is supported by proxying requests to your deployed AI Search instance. Add `remote: true` to your binding configuration to enable local development with `wrangler dev`.

JSONC

```

// wrangler.jsonc

{

  "ai_search": [

    {

      "binding": "MY_SEARCH",

      "instance_name": "my-instance",

      "remote": true,

    },

  ],

}


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-search/api/instances/workers-binding/#page","headline":"Workers binding · Cloudflare AI Search docs","description":"Manage AI Search instances from a Cloudflare Worker using the Instances Workers binding.","url":"https://developers.cloudflare.com/ai-search/api/instances/workers-binding/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-search/","name":"AI Search"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-search/api/","name":"API"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-search/api/instances/","name":"Instances"}},{"@type":"ListItem","position":5,"item":{"@id":"/ai-search/api/instances/workers-binding/","name":"Workers binding"}}]}
```
