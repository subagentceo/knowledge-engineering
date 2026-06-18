---
title: Vectorize API
description: Vectorize Workers binding API for inserting, upserting, querying, and managing vectors.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/vectorize/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Vectorize API

This page covers the Vectorize API available within [Cloudflare Workers](https://developers.cloudflare.com/workers/), including usage examples.

## Operations

### Insert vectors

TypeScript

```

let vectorsToInsert = [

  { id: "123", values: [32.4, 6.5, 11.2, 10.3, 87.9] },

  { id: "456", values: [2.5, 7.8, 9.1, 76.9, 8.5] },

];

let inserted = await env.YOUR_INDEX.insert(vectorsToInsert);


```

Inserts vectors into the index. Vectorize inserts are asynchronous and the insert operation returns a mutation identifier unique for that operation. It typically takes a few seconds for inserted vectors to be available for querying in a Vectorize index.

If vectors with the same vector ID already exist in the index, only the vectors with new IDs will be inserted.

If you need to update existing vectors, use the [upsert](#upsert-vectors) operation.

### Upsert vectors

TypeScript

```

let vectorsToUpsert = [

  { id: "123", values: [32.4, 6.5, 11.2, 10.3, 87.9] },

  { id: "456", values: [2.5, 7.8, 9.1, 76.9, 8.5] },

  { id: "768", values: [29.1, 5.7, 12.9, 15.4, 1.1] },

];

let upserted = await env.YOUR_INDEX.upsert(vectorsToUpsert);


```

Upserts vectors into an index. Vectorize upserts are asynchronous and the upsert operation returns a mutation identifier unique for that operation. It typically takes a few seconds for upserted vectors to be available for querying in a Vectorize index.

An upsert operation will insert vectors into the index if vectors with the same ID do not exist, and overwrite vectors with the same ID.

Upserting does not merge or combine the values or metadata of an existing vector with the upserted vector: the upserted vector replaces the existing vector in full.

### Query vectors

TypeScript

```

let queryVector = [32.4, 6.55, 11.2, 10.3, 87.9];

let matches = await env.YOUR_INDEX.query(queryVector);


```

Query an index with the provided vector, returning the score(s) of the closest vectors based on the configured distance metric.

* Configure the number of returned matches by setting `topK` (default: 5)
* Return vector values by setting `returnValues: true` (default: false)
* Return vector metadata by setting `returnMetadata: 'indexed'` or `returnMetadata: 'all'` (default: 'none')

TypeScript

```

let matches = await env.YOUR_INDEX.query(queryVector, {

  topK: 5,

  returnValues: true,

  returnMetadata: "all",

});


```

#### topK

The `topK` can be configured to specify the number of matches returned by the query operation. Vectorize now supports an upper limit of `100` for the `topK` value. However, for a query operation with `returnValues` set to `true` or `returnMetadata` set to `all`, `topK` is limited to a maximum value of `50`.

#### returnMetadata

The `returnMetadata` field provides three ways to fetch vector metadata while querying:

1. `none`: Do not fetch metadata.
2. `indexed`: Fetched metadata only for the indexed metadata fields. There is no latency overhead with this option, but long text fields may be truncated.
3. `all`: Fetch all metadata associated with a vector. Queries may run slower with this option, and `topK` is limited to 50.

`topK` and `returnMetadata` for legacy Vectorize indexes

For legacy Vectorize (V1) indexes, `topK` is limited to 20, and the `returnMetadata` is a boolean field.

### Query vectors by ID

TypeScript

```

let matches = await env.YOUR_INDEX.queryById("some-vector-id");


```

Query an index using a vector that is already present in the index.

Query options remain the same as the query operation described above.

TypeScript

```

let matches = await env.YOUR_INDEX.queryById("some-vector-id", {

  topK: 5,

  returnValues: true,

  returnMetadata: "all",

});


```

### Get vectors by ID

TypeScript

```

let ids = ["11", "22", "33", "44"];

const vectors = await env.YOUR_INDEX.getByIds(ids);


```

Retrieves the specified vectors by their ID, including values and metadata.

### Delete vectors by ID

TypeScript

```

let idsToDelete = ["11", "22", "33", "44"];

const deleted = await env.YOUR_INDEX.deleteByIds(idsToDelete);


```

Deletes the vector IDs provided from the current index. Vectorize deletes are asynchronous and the delete operation returns a mutation identifier unique for that operation. It typically takes a few seconds for vectors to be removed from the Vectorize index.

### Retrieve index details

TypeScript

```

const details = await env.YOUR_INDEX.describe();


```

Retrieves the configuration of a given index directly, including its configured `dimensions` and distance `metric`.

### List Vectors

Python SDK availability

The `client.vectorize.indexes.list_vectors()` method is not yet available in the current release of the [Cloudflare Python SDK ↗](https://pypi.org/project/cloudflare/). While the method appears in the [API reference](https://developers.cloudflare.com/api/python/resources/vectorize/subresources/indexes/methods/list%5Fvectors/), it has not been included in a published SDK version as of v4.3.1\. In the meantime, you can use the [REST API](https://developers.cloudflare.com/api/resources/vectorize/subresources/indexes/methods/list%5Fvectors/) or the Wrangler CLI to list vectors.

List all vector identifiers in an index using paginated requests, returning up to 1000 vector identifiers per page.

Terminal window

```

wrangler vectorize list-vectors <index-name> [--count=<number>] [--cursor=<cursor-string>]


```

**Parameters:**

* `<index-name>` \- The name of your Vectorize index
* `--count` (optional) - Number of vector IDs to return per page. Must be between 1 and 1000 (default: 100)
* `--cursor` (optional) - Pagination cursor from the previous response to continue listing from that position

For detailed guidance on pagination behavior and best practices, refer to [List vectors best practices](https://developers.cloudflare.com/vectorize/best-practices/list-vectors/).

### Create Metadata Index

Enable metadata filtering on the specified property. Limited to 10 properties.

Wrangler version 3.71.0 required

Vectorize V2 requires [wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/) version `3.71.0` or later. Ensure you have the latest version of `wrangler` installed, or use `npx wrangler@latest vectorize` to always use the latest version.

Run the following `wrangler vectorize` command:

Terminal window

```

wrangler vectorize create-metadata-index <index-name> --property-name='some-prop' --type='string'


```

### Delete Metadata Index

Allow Vectorize to delete the specified metadata index.

Wrangler version 3.71.0 required

Vectorize V2 requires [wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/) version `3.71.0` or later. Ensure you have the latest version of `wrangler` installed, or use `npx wrangler@latest vectorize` to always use the latest version.

Run the following `wrangler vectorize` command:

Terminal window

```

wrangler vectorize delete-metadata-index <index-name> --property-name='some-prop'


```

### List Metadata Indexes

List metadata properties on which metadata filtering is enabled.

Wrangler version 3.71.0 required

Vectorize V2 requires [wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/) version `3.71.0` or later. Ensure you have the latest version of `wrangler` installed, or use `npx wrangler@latest vectorize` to always use the latest version.

Run the following `wrangler vectorize` command:

Terminal window

```

wrangler vectorize list-metadata-index <index-name>


```

### Get Index Info

Get additional details about the index.

Wrangler version 3.71.0 required

Vectorize V2 requires [wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/) version `3.71.0` or later. Ensure you have the latest version of `wrangler` installed, or use `npx wrangler@latest vectorize` to always use the latest version.

Run the following `wrangler vectorize` command:

Terminal window

```

wrangler vectorize info <index-name>


```

## Vectors

A vector represents the vector embedding output from a machine learning model.

* `id` \- a unique `string` identifying the vector in the index. This should map back to the ID of the document, object or database identifier that the vector values were generated from.
* `namespace` \- an optional partition key within a index. Operations are performed per-namespace, so this can be used to create isolated segments within a larger index.
* `values` \- an array of `number`, `Float32Array`, or `Float64Array` as the vector embedding itself. This must be a dense array, and the length of this array must match the `dimensions` configured on the index.
* `metadata` \- an optional set of key-value pairs that can be used to store additional metadata alongside a vector.

TypeScript

```

let vectorExample = {

  id: "12345",

  values: [32.4, 6.55, 11.2, 10.3, 87.9],

  metadata: {

    key: "value",

    hello: "world",

    url: "r2://bucket/some/object.json",

  },

};


```

## Binding to a Worker

[Bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/) allow you to attach resources, including Vectorize indexes or R2 buckets, to your Worker.

Bindings are defined in either the [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/) associated with your Workers project, or via the Cloudflare dashboard for your project.

Vectorize indexes are bound by name. A binding for an index named `production-doc-search` would resemble the below:

* [  wrangler.jsonc ](#tab-panel-11103)
* [  wrangler.toml ](#tab-panel-11104)

JSONC

```

{

  "vectorize": [

    {

      "binding": "PROD_SEARCH", // the index will be available as env.PROD_SEARCH in your Worker

      "index_name": "production-doc-search",

    },

  ],

}


```

TOML

```

[[vectorize]]

binding = "PROD_SEARCH"

index_name = "production-doc-search"


```

Refer to the [bindings documentation](https://developers.cloudflare.com/workers/wrangler/configuration/#vectorize-indexes) for more details.

## TypeScript Types

If you're using TypeScript, run [wrangler types](https://developers.cloudflare.com/workers/wrangler/commands/general/#types) whenever you modify your Wrangler configuration file. This generates types for the `env` object based on your bindings, as well as [runtime types](https://developers.cloudflare.com/workers/languages/typescript/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/vectorize/reference/client-api/#page","headline":"Vectorize API · Cloudflare Vectorize docs","description":"Vectorize Workers binding API for inserting, upserting, querying, and managing vectors.","url":"https://developers.cloudflare.com/vectorize/reference/client-api/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/vectorize/","name":"Vectorize"}},{"@type":"ListItem","position":3,"item":{"@id":"/vectorize/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/vectorize/reference/client-api/","name":"Vectorize API"}}]}
```
