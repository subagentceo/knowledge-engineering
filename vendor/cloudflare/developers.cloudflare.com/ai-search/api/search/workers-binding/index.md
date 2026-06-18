---
title: Workers binding
description: Search and chat with AI Search instances from a Cloudflare Worker using the Workers binding.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-search/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Workers binding

[Workers](https://developers.cloudflare.com/workers/) provides a serverless execution environment that allows you to create new applications or augment existing ones. Use a [Workers binding](https://developers.cloudflare.com/workers/runtime-apis/bindings/) to search and chat with your AI Search instances from a Cloudflare Worker.

Note

The previous `env.AI.autorag()` binding is no longer recommended for use. Refer to [Workers binding migration](https://developers.cloudflare.com/ai-search/api/migration/workers-binding/) for details.

## Configure the binding

To use AI Search with Workers, you must create an AI Search binding. You create bindings by updating your [Wrangler configuration](https://developers.cloudflare.com/workers/wrangler/configuration/). AI Search provides two types of bindings:

* Namespace binding: `ai_search_namespaces`
* Instance binding: `ai_search`

### Namespace binding

Access all instances within a [namespace](https://developers.cloudflare.com/ai-search/concepts/namespaces/). You can get, create, list, and delete instances at runtime.

* [  wrangler.jsonc ](#tab-panel-6608)
* [  wrangler.toml ](#tab-panel-6609)

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

* [  wrangler.jsonc ](#tab-panel-6610)
* [  wrangler.toml ](#tab-panel-6611)

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

## Instance methods

The following methods are available on both the `ai_search_namespaces` and `ai_search` bindings. With the namespace binding, call methods on the handle returned by `get()`. With the instance binding, call methods directly on the binding (for example, `env.MY_SEARCH.search()`).

The examples below use the namespace binding.

### `search()`

Search for relevant content chunks from your indexed data source. Returns scored chunks with source references.

TypeScript

```

const instance = env.AI_SEARCH.get("my-instance");


const results = await instance.search({

  messages: [{ role: "user", content: "What is Cloudflare?" }],

});


```

#### Parameters

`messages` ` array ` required

An array of message objects representing the conversation. Each message has a `role` and `content` field.

* `role` ` string ` required  
   * The role of the message sender. Valid values: `system`, `developer`, `user`, `assistant`, `tool`.
* `content` ` string ` required  
   * The content of the message.

---

`query` ` string ` optional

A simple text query string. Alternative to `messages`. Provide either `query` or `messages`, not both.

---

`ai_search_options` ` object ` optional

Configuration options for the search operation.

* `retrieval` ` object ` optional  
   * `retrieval_type` ` string ` optional  
         * The type of retrieval to perform. Valid values: `vector`, `keyword`, `hybrid`. Defaults to `hybrid`.  
   * `match_threshold` ` number ` optional  
         * The minimum match score required for a result to be considered a match. Must be between `0` and `1`. Defaults to `0.4`.  
   * `max_num_results` ` integer ` optional  
         * The maximum number of results to return. Must be between `1` and `50`. Defaults to `10`.  
   * `filters` ` object ` optional  
         * Filter search results based on metadata. Supports comparison filters (`eq`, `ne`, `gt`, `gte`, `lt`, `lte`) and compound filters (`and`, `or`). For more details, refer to [Metadata filtering](https://developers.cloudflare.com/ai-search/configuration/retrieval/filtering/).  
   * `context_expansion` ` integer ` optional  
         * The number of surrounding chunks to include for additional context. Must be between `0` and `3`. Defaults to `0`.  
   * `fusion_method` ` string ` optional  
         * Controls how vector and keyword scores are combined when using hybrid retrieval. Valid values: `rrf` (Reciprocal Rank Fusion), `max` (takes the maximum score). Defaults to the instance-level setting.  
   * `keyword_match_mode` ` string ` optional  
         * Controls how keyword (BM25) matching selects candidate documents. `and` requires all terms to match. `or` requires any term to match. Defaults to `and`.  
   * `boost_by` ` array ` optional  
         * Boost results by metadata fields. Maximum 3 items. Each item has:  
                  * `field` ` string ` required \- The metadata field name to boost by (for example, `timestamp`). Maximum 64 characters.  
                  * `direction` ` string ` optional \- The boost direction. Valid values: `asc`, `desc`, `exists`, `not_exists`. Defaults to `asc` for numeric fields and `exists` for text fields.  
   * `metadata_only` ` boolean ` optional  
         * Return only metadata for each chunk without the text content.  
   * `return_on_failure` ` boolean ` optional  
         * Whether to return partial results if some processing steps fail. Defaults to `true`.
* `query_rewrite` ` object ` optional  
   * `enabled` ` boolean ` optional  
         * Rewrites the query to improve retrieval accuracy. Defaults to `false`.  
   * `model` ` string ` optional  
         * The model to use for query rewriting.  
   * `rewrite_prompt` ` string ` optional  
         * A custom prompt to guide query rewriting.
* `reranking` ` object ` optional  
   * `enabled` ` boolean ` optional  
         * Reorders retrieved results based on semantic relevance using a reranking model. Defaults to `false`.  
   * `model` ` string ` optional  
         * The reranking model to use. Valid value: `@cf/baai/bge-reranker-base`.  
   * `match_threshold` ` number ` optional  
         * The minimum score for reranked results. Must be between `0` and `1`. Defaults to `0.4`.
* `cache` ` object ` optional  
   * `enabled` ` boolean ` optional  
         * Override the instance-level cache setting for this request.  
   * `cache_threshold` ` string ` optional  
         * The similarity threshold for cache hits. Valid values: `super_strict_match`, `close_enough`, `flexible_friend`, `anything_goes`.

#### Response

The response contains the following fields:

| Field                                        | Type   | Description                                                                          |
| -------------------------------------------- | ------ | ------------------------------------------------------------------------------------ |
| search\_query                                | string | The query used for the search, which may be rewritten if query rewriting is enabled. |
| chunks                                       | array  | An array of matching content chunks.                                                 |
| chunks\[\].id                                | string | The unique identifier for the chunk.                                                 |
| chunks\[\].type                              | string | The type of content, typically text.                                                 |
| chunks\[\].score                             | number | The overall match score between 0 and 1.                                             |
| chunks\[\].text                              | string | The text content of the chunk.                                                       |
| chunks\[\].item                              | object | Information about the source item.                                                   |
| chunks\[\].item.key                          | string | The file path or URL of the source document.                                         |
| chunks\[\].item.timestamp                    | number | Unix timestamp of when the item was last modified.                                   |
| chunks\[\].item.metadata                     | object | Custom metadata associated with the source item.                                     |
| chunks\[\].scoring\_details                  | object | Breakdown of how the chunk was scored.                                               |
| chunks\[\].scoring\_details.vector\_score    | number | The semantic similarity score (0 to 1).                                              |
| chunks\[\].scoring\_details.keyword\_score   | number | The keyword (BM25) match score. Present when using hybrid or keyword retrieval.      |
| chunks\[\].scoring\_details.keyword\_rank    | number | The keyword rank position.                                                           |
| chunks\[\].scoring\_details.vector\_rank     | number | The vector rank position.                                                            |
| chunks\[\].scoring\_details.reranking\_score | number | The reranking score (0 to 1). Present when reranking is enabled.                     |
| chunks\[\].scoring\_details.fusion\_method   | string | The fusion method used (rrf or max). Present when using hybrid retrieval.            |

### `chatCompletions()`

Generate chat completions using your AI Search instance as context. This method retrieves relevant content and uses it to generate a response.

TypeScript

```

const instance = env.AI_SEARCH.get("my-instance");


const response = await instance.chatCompletions({

  messages: [

    { role: "system", content: "You are a helpful documentation assistant." },

    { role: "user", content: "What is Cloudflare?" },

  ],

  model: "@cf/meta/llama-3.3-70b-instruct-fp8-fast",

  ai_search_options: {

    retrieval: {

      max_num_results: 5,

    },

    query_rewrite: {

      enabled: true,

    },

  },

});


```

#### Stream responses

Set `stream: true` to receive responses as Server-Sent Events (SSE) as they are generated:

TypeScript

```

const instance = env.AI_SEARCH.get("my-instance");


const stream = await instance.chatCompletions({

  messages: [{ role: "user", content: "What is Cloudflare?" }],

  stream: true,

});


return new Response(stream, {

  headers: {

    "content-type": "text/event-stream",

    "cache-control": "no-cache",

  },

});


```

When `stream` is enabled, the method returns a `ReadableStream` of SSE events. Each event contains a JSON object with `choices[0].delta.content` for incremental text. The stream ends with a `data: [DONE]` event.

#### Parameters

`messages` ` array ` required

An array of message objects representing the conversation. Each message has a `role` and `content` field.

* `role` ` string ` required  
   * The role of the message sender. Valid values: `system`, `developer`, `user`, `assistant`, `tool`.
* `content` ` string ` required  
   * The content of the message.

---

`model` ` string ` optional

The text-generation model used to generate responses. Defaults to the generation model configured in the AI Search instance settings. For a list of supported models, refer to [Supported models](https://developers.cloudflare.com/ai-search/configuration/models/supported-models/).

---

`stream` ` boolean ` optional

Returns a stream of results as they are generated. When enabled, returns a `Response` object with a readable stream. Defaults to `false`.

---

`ai_search_options` ` object ` optional

Configuration options for the search and generation operation.

* `retrieval` ` object ` optional  
   * `retrieval_type` ` string ` optional  
         * The type of retrieval to perform. Valid values: `vector`, `keyword`, `hybrid`. Defaults to `hybrid`.  
   * `match_threshold` ` number ` optional  
         * The minimum match score required for a result to be considered a match. Must be between `0` and `1`. Defaults to `0.4`.  
   * `max_num_results` ` integer ` optional  
         * The maximum number of results to return. Must be between `1` and `50`. Defaults to `10`.  
   * `filters` ` object ` optional  
         * Filter search results based on metadata. Supports comparison filters (`eq`, `ne`, `gt`, `gte`, `lt`, `lte`) and compound filters (`and`, `or`). For more details, refer to [Metadata filtering](https://developers.cloudflare.com/ai-search/configuration/retrieval/filtering/).  
   * `context_expansion` ` integer ` optional  
         * The number of surrounding chunks to include for additional context. Must be between `0` and `3`. Defaults to `0`.  
   * `fusion_method` ` string ` optional  
         * Controls how vector and keyword scores are combined when using hybrid retrieval. Valid values: `rrf` (Reciprocal Rank Fusion), `max` (takes the maximum score). Defaults to the instance-level setting.  
   * `keyword_match_mode` ` string ` optional  
         * Controls how keyword (BM25) matching selects candidate documents. `and` requires all terms to match. `or` requires any term to match. Defaults to `and`.  
   * `boost_by` ` array ` optional  
         * Boost results by metadata fields. Maximum 3 items. Each item has:  
                  * `field` ` string ` required \- The metadata field name to boost by (for example, `timestamp`). Maximum 64 characters.  
                  * `direction` ` string ` optional \- The boost direction. Valid values: `asc`, `desc`, `exists`, `not_exists`. Defaults to `asc` for numeric fields and `exists` for text fields.  
   * `metadata_only` ` boolean ` optional  
         * Return only metadata for each chunk without the text content.  
   * `return_on_failure` ` boolean ` optional  
         * Whether to return partial results if some processing steps fail. Defaults to `true`.
* `query_rewrite` ` object ` optional  
   * `enabled` ` boolean ` optional  
         * Rewrites the query to improve retrieval accuracy. Defaults to `false`.  
   * `model` ` string ` optional  
         * The model to use for query rewriting.  
   * `rewrite_prompt` ` string ` optional  
         * A custom prompt to guide query rewriting.
* `reranking` ` object ` optional  
   * `enabled` ` boolean ` optional  
         * Reorders retrieved results based on semantic relevance using a reranking model. Defaults to `false`.  
   * `model` ` string ` optional  
         * The reranking model to use. Valid value: `@cf/baai/bge-reranker-base`.  
   * `match_threshold` ` number ` optional  
         * The minimum score for reranked results. Must be between `0` and `1`. Defaults to `0.4`.
* `cache` ` object ` optional  
   * `enabled` ` boolean ` optional  
         * Override the instance-level cache setting for this request.  
   * `cache_threshold` ` string ` optional  
         * The similarity threshold for cache hits. Valid values: `super_strict_match`, `close_enough`, `flexible_friend`, `anything_goes`.

#### Response (non-streaming)

| Field                       | Type   | Description                                                                         |
| --------------------------- | ------ | ----------------------------------------------------------------------------------- |
| id                          | string | Unique identifier for the completion.                                               |
| object                      | string | Always chat.completion.                                                             |
| created                     | number | Unix timestamp of when the completion was created.                                  |
| model                       | string | The model used to generate the response.                                            |
| choices                     | array  | Array of completion choices.                                                        |
| choices\[\].message.role    | string | Always assistant.                                                                   |
| choices\[\].message.content | string | The generated response text.                                                        |
| choices\[\].finish\_reason  | string | Why the model stopped generating. Typically stop.                                   |
| usage.prompt\_tokens        | number | Number of tokens in the prompt.                                                     |
| usage.completion\_tokens    | number | Number of tokens in the generated response.                                         |
| usage.total\_tokens         | number | Total tokens used.                                                                  |
| chunks                      | array  | The source chunks used as context. Same format as the [search response](#response). |

#### Response (streaming)

When `stream: true`, the method returns a `ReadableStream` of Server-Sent Events. The retrieved chunks are sent first as a `chunks` event, followed by the streamed response.

```

event: chunks

data: [{"id":"chunk-001","type":"text","score":0.85,"text":"...","item":{"key":"about-cloudflare.md","timestamp":1775925540000},"scoring_details":{"vector_score":0.85}}]


data: {"id":"id-1776072781845","created":1776072781,"model":"@cf/meta/llama-3.3-70b-instruct-fp8-fast","object":"chat.completion.chunk","choices":[{"index":0,"delta":{"content":" document"}}]}


data: {"id":"id-1776072781845","created":1776072781,"model":"@cf/meta/llama-3.3-70b-instruct-fp8-fast","object":"chat.completion.chunk","choices":[{"index":0,"delta":{"content":" you provided doesn"}}]}


data: {"id":"id-1776072781845","created":1776072781,"model":"@cf/meta/llama-3.3-70b-instruct-fp8-fast","object":"chat.completion.chunk","choices":[{"index":0,"delta":{"content":"'t contain"}}]}


data: {"id":"id-1776072781845","created":1776072781,"model":"@cf/meta/llama-3.3-70b-instruct-fp8-fast","object":"chat.completion.chunk","choices":[{"index":0,"delta":{"content":" information"}}]}


data: [DONE]


```

## Namespace methods

The following methods are only available when using the `ai_search_namespaces` binding. Search and chat across multiple instances in a single call using the namespace handle directly (`env.AI_SEARCH`).

### `search()`

Pass `instance_ids` in `ai_search_options` to specify which instances to query. Results are merged and ranked, and each chunk includes an `instance_id` field identifying which instance it came from.

TypeScript

```

const results = await env.AI_SEARCH.search({

  messages: [{ role: "user", content: "What is Cloudflare?" }],

  ai_search_options: {

    instance_ids: ["product-docs", "customer-abc123"],

  },

});


```

#### Parameters

Same as [instance-level search](#parameters), with one additional required field:

| Parameter                         | Type   | Required | Description                                           |
| --------------------------------- | ------ | -------- | ----------------------------------------------------- |
| ai\_search\_options               | object | Yes      | Required for namespace-level search.                  |
| ai\_search\_options.instance\_ids | array  | Yes      | Instance IDs to search across. Minimum 1, maximum 10. |

#### Response

Same as [instance-level search](#response), with additional fields:

| Field                   | Type   | Description                                                                            |
| ----------------------- | ------ | -------------------------------------------------------------------------------------- |
| chunks\[\].instance\_id | string | The instance this chunk came from.                                                     |
| errors                  | array  | Per-instance errors if any instances failed. Each object has instance\_id and message. |

### `chatCompletions()`

Generate chat completions using context retrieved from multiple instances.

TypeScript

```

const response = await env.AI_SEARCH.chatCompletions({

  messages: [{ role: "user", content: "What is Cloudflare?" }],

  ai_search_options: {

    instance_ids: ["product-docs", "customer-abc123"],

  },

});


```

Streaming is supported with `stream: true`.

#### Parameters

Same as [instance-level chat completions](#parameters-1), with one additional required field:

| Parameter                         | Type   | Required | Description                                           |
| --------------------------------- | ------ | -------- | ----------------------------------------------------- |
| ai\_search\_options               | object | Yes      | Required for namespace-level chat completions.        |
| ai\_search\_options.instance\_ids | array  | Yes      | Instance IDs to search across. Minimum 1, maximum 10. |

#### Response

Same as [instance-level chat completions](#response-non-streaming), with additional fields on each chunk:

| Field                   | Type   | Description                                                                            |
| ----------------------- | ------ | -------------------------------------------------------------------------------------- |
| chunks\[\].instance\_id | string | The instance this chunk came from.                                                     |
| errors                  | array  | Per-instance errors if any instances failed. Each object has instance\_id and message. |

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
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-search/api/search/workers-binding/#page","headline":"Workers binding · Cloudflare AI Search docs","description":"Search and chat with AI Search instances from a Cloudflare Worker using the Workers binding.","url":"https://developers.cloudflare.com/ai-search/api/search/workers-binding/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-search/","name":"AI Search"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-search/api/","name":"API"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-search/api/search/","name":"Search"}},{"@type":"ListItem","position":5,"item":{"@id":"/ai-search/api/search/workers-binding/","name":"Workers binding"}}]}
```
