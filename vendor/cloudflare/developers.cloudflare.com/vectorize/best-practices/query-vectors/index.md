---
title: Query vectors
description: Search a Vectorize index for similar vectors using queries, metadata filters, and namespaces.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/vectorize/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Query vectors

Querying an index, or vector search, enables you to search an index by providing an input vector and returning the nearest vectors based on the [configured distance metric](https://developers.cloudflare.com/vectorize/best-practices/create-indexes/#distance-metrics).

Optionally, you can apply [metadata filters](https://developers.cloudflare.com/vectorize/reference/metadata-filtering/) or a [namespace](https://developers.cloudflare.com/vectorize/best-practices/insert-vectors/#namespaces) to narrow the vector search space.

## Example query

To pass a vector as a query to an index, use the `query()` method on the index itself.

A query vector is either an array of JavaScript numbers, 32-bit floating point or 64-bit floating point numbers: `number[]`, `Float32Array`, or `Float64Array`. Unlike when [inserting vectors](https://developers.cloudflare.com/vectorize/best-practices/insert-vectors/), a query vector does not need an ID or metadata.

TypeScript

```

// query vector dimensions must match the Vectorize index dimension being queried

let queryVector = [54.8, 5.5, 3.1, ...];

let matches = await env.YOUR_INDEX.query(queryVector);


```

This would return a set of matches resembling the following, based on the distance metric configured for the Vectorize index. Example response with `cosine` distance metric:

```

{

  "count": 5,

  "matches": [

    { "score": 0.999909486, "id": "5" },

    { "score": 0.789848214, "id": "4" },

    { "score": 0.720476967, "id": "4444" },

    { "score": 0.463884663, "id": "6" },

    { "score": 0.378282232, "id": "1" }

  ]

}


```

You can optionally change the number of results returned and/or whether results should include metadata and values:

TypeScript

```

// query vector dimensions must match the Vectorize index dimension being queried

let queryVector = [54.8, 5.5, 3.1, ...];

// topK defaults to 5; returnValues defaults to false; returnMetadata defaults to "none"

let matches = await env.YOUR_INDEX.query(queryVector, {

  topK: 1,

  returnValues: true,

  returnMetadata: "all",

});


```

This would return a set of matches resembling the following, based on the distance metric configured for the Vectorize index. Example response with `cosine` distance metric:

```

{

  "count": 1,

  "matches": [

    {

      "score": 0.999909486,

      "id": "5",

      "values": [58.79999923706055, 6.699999809265137, 3.4000000953674316, ...],

      "metadata": { "url": "/products/sku/55519183" }

    }

  ]

}


```

Refer to [Vectorize API](https://developers.cloudflare.com/vectorize/reference/client-api/) for additional examples.

## Query by vector identifier

Vectorize now offers the ability to search for vectors similar to a vector that is already present in the index using the `queryById()` operation. This can be considered as a single operation that combines the `getById()` and the `query()` operation.

TypeScript

```

// the query operation would yield results if a vector with id `some-vector-id` is already present in the index.

let matches = await env.YOUR_INDEX.queryById("some-vector-id");


```

## Control over scoring precision and query accuracy

When querying vectors, you can specify to either use high-precision scoring, thereby increasing the precision of the query matches scores as well as the accuracy of the query results, or use approximate scoring for faster response times. Using approximate scoring, returned scores will be an approximation of the real distance/similarity between your query and the returned vectors; this is the query's default as it's a nice trade-off between accuracy and latency.

High-precision scoring is enabled by setting `returnValues: true` on your query. This setting tells Vectorize to use the original vector values for your matches, allowing the computation of exact match scores and increasing the accuracy of the results. Because it processes more data, though, high-precision scoring will increase the latency of queries.

## Workers AI

If you are generating embeddings from a [Workers AI](https://developers.cloudflare.com/workers-ai/models/?tasks=Text+Embeddings) text embedding model, the response type from `env.AI.run()` is an object that includes both the `shape` of the response vector - e.g. `[1,768]` \- and the vector `data` as an array of vectors:

TypeScript

```

interface EmbeddingResponse {

  shape: number[];

  data: number[][];

}


let userQuery = "a query from a user or service";

const queryVector: EmbeddingResponse = await env.AI.run(

  "@cf/baai/bge-base-en-v1.5",

  {

    text: [userQuery],

  },

);


```

When passing the vector to the `query()` method of a Vectorize index, pass only the vector embedding itself on the `.data` sub-object, and not the top-level response.

For example:

TypeScript

```

let matches = await env.TEXT_EMBEDDINGS.query(queryVector.data[0], { topK: 1 });


```

Passing `queryVector` or `queryVector.data` will cause `query()` to return an error.

## OpenAI

When using OpenAI's [JavaScript client API ↗](https://github.com/openai/openai-node) and [Embeddings API ↗](https://platform.openai.com/docs/guides/embeddings/what-are-embeddings), the response type from `embeddings.create` is an object that includes the model, usage information and the requested vector embedding.

TypeScript

```

const openai = new OpenAI({ apiKey: env.YOUR_OPENAPI_KEY });


let userQuery = "a query from a user or service";


let embeddingResponse = await openai.embeddings.create({

  input: userQuery,

  model: "text-embedding-ada-002",

});


```

Similar to Workers AI, you will need to provide the vector embedding itself (`.embedding[0]`) and not the `EmbeddingResponse` wrapper when querying a Vectorize index:

TypeScript

```

let matches = await env.TEXT_EMBEDDINGS.query(embeddingResponse.embedding[0], {

  topK: 1,

});


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/vectorize/best-practices/query-vectors/#page","headline":"Query vectors · Cloudflare Vectorize docs","description":"Search a Vectorize index for similar vectors using queries, metadata filters, and namespaces.","url":"https://developers.cloudflare.com/vectorize/best-practices/query-vectors/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/vectorize/","name":"Vectorize"}},{"@type":"ListItem","position":3,"item":{"@id":"/vectorize/best-practices/","name":"Best practices"}},{"@type":"ListItem","position":4,"item":{"@id":"/vectorize/best-practices/query-vectors/","name":"Query vectors"}}]}
```
