---
title: R2
description: Connect a Cloudflare R2 bucket as a data source to index stored documents with AI Search.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-search/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# R2

You can connect a [Cloudflare R2](https://developers.cloudflare.com/r2/) bucket as a data source for your AI Search instance. AI Search indexes the files stored in your bucket automatically.

## Get started

You can connect an R2 bucket when creating a new instance through the [dashboard](https://developers.cloudflare.com/ai-search/get-started/dashboard/), the [REST API](https://developers.cloudflare.com/ai-search/get-started/api/), or [Wrangler](https://developers.cloudflare.com/ai-search/get-started/wrangler/). R2 is an optional data source that you can add alongside [built-in storage](https://developers.cloudflare.com/ai-search/configuration/data-source/built-in-storage/).

If you have never created an R2-backed instance before, we recommend using the dashboard or Wrangler CLI, which will create and register a [service API token](https://developers.cloudflare.com/ai-search/configuration/indexing/service-api-token/) for you automatically. If you are using the REST API or Workers binding, you will need to create a service API token and pass the `token_id` in the create request. Refer to [Service API token](https://developers.cloudflare.com/ai-search/configuration/indexing/service-api-token/) for setup instructions.

To get started, [configure an R2 bucket](https://developers.cloudflare.com/r2/get-started/) containing your data. Files that are unsupported or exceed the size limit will be skipped during indexing and logged as errors.

## Path filtering

You can control which files get indexed by defining include and exclude rules for object paths. Use this to limit indexing to specific folders or to exclude files you do not want searchable.

For example, to index only documentation while excluding drafts:

* **Include:** `/docs/**`
* **Exclude:** `/docs/drafts/**`

Refer to [Path filtering](https://developers.cloudflare.com/ai-search/configuration/indexing/path-filtering/) for pattern syntax, filtering behavior, and more examples.

For supported file types and size limits, refer to [Data source](https://developers.cloudflare.com/ai-search/configuration/data-source/#supported-file-types).

## Custom metadata

You can attach custom metadata to R2 objects for filtering search results. AI Search reads metadata from S3-compatible custom headers (`x-amz-meta-*`).

Before metadata can be extracted, you must [define a schema](https://developers.cloudflare.com/ai-search/configuration/indexing/metadata/#define-a-schema) in your AI Search configuration.

### Set metadata when uploading

* [ Workers R2 binding ](#tab-panel-6618)
* [ AWS SDK ](#tab-panel-6619)
* [ Wrangler CLI ](#tab-panel-6620)

Use the `customMetadata` option when uploading objects with the [R2 Workers binding](https://developers.cloudflare.com/r2/api/workers/workers-api-usage/):

JavaScript

```

await env.MY_BUCKET.put("docs/document.pdf", fileContent, {

  customMetadata: {

    category: "documentation",

    version: "2.5",

    is_public: "true",

  },

});


```

Use the `Metadata` option with the [AWS SDK for JavaScript](https://developers.cloudflare.com/r2/api/s3/api/):

JavaScript

```

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";


const client = new S3Client({

  region: "auto",

  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,

  credentials: {

    accessKeyId: R2_ACCESS_KEY_ID,

    secretAccessKey: R2_SECRET_ACCESS_KEY,

  },

});


await client.send(

  new PutObjectCommand({

    Bucket: "your-bucket",

    Key: "docs/document.pdf",

    Body: fileContent,

    Metadata: {

      category: "documentation",

      version: "2.5",

      is_public: "true",

    },

  }),

);


```

Use the `--header` flag with [Wrangler](https://developers.cloudflare.com/r2/reference/wrangler-commands/) to set `x-amz-meta-*` headers:

Terminal window

```

wrangler r2 object put your-bucket/docs/document.pdf \

  --file=./document.pdf \

  --header="x-amz-meta-category:documentation" \

  --header="x-amz-meta-version:2.5" \

  --header="x-amz-meta-is_public:true"


```

### How metadata extraction works

When a file is fetched from R2 during indexing:

1. All `x-amz-meta-*` headers are read from the object.
2. The `x-amz-meta-` prefix is stripped (for example, `x-amz-meta-category` becomes `category`).
3. Field names are matched against your schema (case-insensitive).
4. Values are cast to the configured data type.
5. Invalid values (for example, a non-numeric string for a `number` type) are silently ignored.

### Unicode support

Metadata values support Unicode characters through MIME-Word encoding (RFC 2047). Most S3-compatible tools handle this encoding automatically.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-search/configuration/data-source/r2/#page","headline":"R2 · Cloudflare AI Search docs","description":"Connect a Cloudflare R2 bucket as a data source to index stored documents with AI Search.","url":"https://developers.cloudflare.com/ai-search/configuration/data-source/r2/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-search/","name":"AI Search"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-search/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-search/configuration/data-source/","name":"Data source"}},{"@type":"ListItem","position":5,"item":{"@id":"/ai-search/configuration/data-source/r2/","name":"R2"}}]}
```
