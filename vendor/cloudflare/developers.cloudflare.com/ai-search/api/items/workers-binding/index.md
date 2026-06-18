---
title: Workers binding
description: Upload, list, and manage documents in AI Search instances using the Items Workers binding.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-search/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Workers binding

[Workers](https://developers.cloudflare.com/workers/) provides a serverless execution environment that allows you to create new applications or augment existing ones. Use a [Workers binding](https://developers.cloudflare.com/workers/runtime-apis/bindings/) to upload, list, and manage documents in your AI Search instances from a Cloudflare Worker. Access the Items API through the `items` property on an instance handle.

Note

The Items API uploads files to an instance's built-in storage. For more details, refer to [Built-in storage](https://developers.cloudflare.com/ai-search/configuration/data-source/built-in-storage/).

## Configure the binding

To use AI Search with Workers, you must create an AI Search binding. You create bindings by updating your [Wrangler configuration](https://developers.cloudflare.com/workers/wrangler/configuration/). AI Search provides two types of bindings:

* Namespace binding: `ai_search_namespaces`
* Instance binding: `ai_search`

### Namespace binding

Access all instances within a [namespace](https://developers.cloudflare.com/ai-search/concepts/namespaces/). You can get, create, list, and delete instances at runtime.

* [  wrangler.jsonc ](#tab-panel-6600)
* [  wrangler.toml ](#tab-panel-6601)

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

* [  wrangler.jsonc ](#tab-panel-6602)
* [  wrangler.toml ](#tab-panel-6603)

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

## Methods

The Items API methods are available on both the `ai_search_namespaces` and `ai_search` bindings. With the namespace binding, call methods on the handle returned by `get()`. With the instance binding, call methods directly on the binding (for example, `env.MY_SEARCH.items.upload()`).

The examples below use the namespace binding.

TypeScript

```

const instance = env.AI_SEARCH.get("my-instance");


```

### `items.upload()`

Uploads a document for indexing. Returns immediately. The document is queued for processing.

TypeScript

```

// Upload from a string

await instance.items.upload(

  "faq.md",

  "# FAQ\n\nQ: How do I reset my password?\nA: Go to Settings > Security...",

);


// Upload from an ArrayBuffer

const pdfResponse = await fetch("https://example.com/guide.pdf");

const pdfBuffer = await pdfResponse.arrayBuffer();

await instance.items.upload("guide.pdf", pdfBuffer);


// Upload from a ReadableStream

await instance.items.upload("doc.txt", request.body);


```

#### Upload with metadata

Attach [custom metadata](https://developers.cloudflare.com/ai-search/configuration/indexing/metadata/) to a document for filtering in search queries. Custom metadata fields must be defined on the instance first using the [update()](https://developers.cloudflare.com/ai-search/api/instances/workers-binding/#update) method or at creation time.

TypeScript

```

await instance.items.upload("guide.pdf", pdfBuffer, {

  metadata: {

    category: "onboarding",

    language: "en",

    version: "2.0",

  },

});


```

#### Parameters

| Parameter        | Type                                   | Required | Description                                                                                                                                                            |
| ---------------- | -------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name             | string                                 | Yes      | The filename for the uploaded document. Used as the item key.                                                                                                          |
| content          | ReadableStream, ArrayBuffer, or string | Yes      | The document content. Maximum file size is 4 MB. Pass a string for plain text or markdown, an ArrayBuffer for binary files, or a ReadableStream for streaming uploads. |
| options.metadata | Record<string, string>                 | No       | Custom metadata key-value pairs to attach to the item. Use for filtering in search queries. Maximum 5 fields per instance.                                             |

#### Response

| Field | Type   | Description                      |
| ----- | ------ | -------------------------------- |
| id    | string | The unique item identifier.      |
| key   | string | The filename or key of the item. |

### `items.uploadAndPoll()`

Uploads a document and polls until processing completes or the timeout is reached. Use this when you need to search the document immediately after upload.

TypeScript

```

// Wait for a specific document to finish indexing before searching

const item = await instance.items.uploadAndPoll(

  "handbook.txt",

  handbookContent,

);

console.log(`handbook.txt status: ${item.status}`); // "completed"


// Now search across all uploaded documents

const results = await instance.search({

  messages: [{ role: "user", content: "password reset policy" }],

});


```

#### Parameters

Same as [items.upload()](#parameters), with additional polling options:

| Parameter              | Type   | Required | Description                                                                          |
| ---------------------- | ------ | -------- | ------------------------------------------------------------------------------------ |
| options.pollIntervalMs | number | No       | How often to check the item status, in milliseconds. Defaults to 1000.               |
| options.timeoutMs      | number | No       | Maximum time to wait for processing to complete, in milliseconds. Defaults to 30000. |

#### Response

Returns the full item object after polling completes:

| Field          | Type   | Description                                                                  |
| -------------- | ------ | ---------------------------------------------------------------------------- |
| id             | string | The unique item identifier.                                                  |
| key            | string | The filename or key of the item.                                             |
| status         | string | The processing status: queued, running, completed, error, skipped, outdated. |
| chunks\_count  | number | Number of chunks created from the document.                                  |
| file\_size     | number | Size of the uploaded file in bytes.                                          |
| metadata       | object | Item metadata including filename, folder, and timestamp.                     |
| source\_id     | string | The source identifier (for example, builtin for uploaded files).             |
| created\_at    | string | Timestamp of when the item was created.                                      |
| last\_seen\_at | string | Timestamp of when the item was last seen during indexing.                    |

### `items.list()`

Returns a paginated list of items in the instance.

TypeScript

```

const { result, result_info } = await instance.items.list();


for (const item of result) {

  console.log(`${item.key} (${item.status})`);

}

// result_info.total_count contains the total number of items


```

#### Parameters

| Parameter | Type   | Required | Description                                                                           |
| --------- | ------ | -------- | ------------------------------------------------------------------------------------- |
| page      | number | No       | The page number to return. Defaults to 1.                                             |
| per\_page | number | No       | The number of items per page. Defaults to 20. Maximum 50.                             |
| status    | string | No       | Filter by processing status: queued, running, completed, error, skipped, or outdated. |
| sort\_by  | string | No       | Sort order for items: status (default) or modified\_at.                               |
| search    | string | No       | Search items by text content.                                                         |
| source    | string | No       | Filter by source identifier (for example, builtin for uploaded files).                |

#### Response

| Field                     | Type   | Description                                                                  |
| ------------------------- | ------ | ---------------------------------------------------------------------------- |
| result                    | array  | Array of item objects.                                                       |
| result\[\].id             | string | The unique item identifier.                                                  |
| result\[\].key            | string | The filename or key of the item.                                             |
| result\[\].status         | string | The processing status: queued, running, completed, error, skipped, outdated. |
| result\[\].chunks\_count  | number | Number of chunks created from the document.                                  |
| result\[\].file\_size     | number | Size of the uploaded file in bytes.                                          |
| result\[\].metadata       | object | Item metadata including filename, folder, and timestamp.                     |
| result\[\].source\_id     | string | The source identifier (for example, builtin for uploaded files).             |
| result\[\].created\_at    | string | Timestamp of when the item was created.                                      |
| result\[\].last\_seen\_at | string | Timestamp of when the item was last seen during indexing.                    |
| result\_info              | object | Pagination metadata.                                                         |
| result\_info.count        | number | Number of items in the current page.                                         |
| result\_info.total\_count | number | Total number of items in the instance.                                       |
| result\_info.page         | number | The current page number.                                                     |
| result\_info.per\_page    | number | Items per page.                                                              |

### `items.delete()`

Deletes an item and its indexed chunks.

TypeScript

```

await instance.items.delete("item-id-123");


```

#### Parameters

| Parameter | Type   | Required | Description                                  |
| --------- | ------ | -------- | -------------------------------------------- |
| itemId    | string | Yes      | The unique identifier of the item to delete. |

#### Response

Returns `void`. Throws an error if the item does not exist.

### `items.get()`

Returns a handle to a specific item for retrieving its status or downloading the original file.

#### `items.get().info()`

Returns the status and metadata of a specific item.

TypeScript

```

const itemInfo = await instance.items.get("item-id-123").info();


```

##### Parameters

| Parameter | Type   | Required | Description                        |
| --------- | ------ | -------- | ---------------------------------- |
| itemId    | string | Yes      | The unique identifier of the item. |

##### Response

| Field          | Type   | Description                                                                  |
| -------------- | ------ | ---------------------------------------------------------------------------- |
| id             | string | The unique item identifier.                                                  |
| key            | string | The filename or key of the item.                                             |
| status         | string | The processing status: queued, running, completed, error, skipped, outdated. |
| chunks\_count  | number | Number of chunks created from the document.                                  |
| file\_size     | number | Size of the uploaded file in bytes.                                          |
| metadata       | object | Item metadata including filename, folder, and timestamp.                     |
| source\_id     | string | The source identifier (for example, builtin for uploaded files).             |
| created\_at    | string | Timestamp of when the item was created.                                      |
| last\_seen\_at | string | Timestamp of when the item was last seen during indexing.                    |

#### `items.get().download()`

Downloads the original source file for an item.

TypeScript

```

const file = await instance.items.get("item-id-123").download();

// file.body is a ReadableStream


```

##### Parameters

| Parameter | Type   | Required | Description                        |
| --------- | ------ | -------- | ---------------------------------- |
| itemId    | string | Yes      | The unique identifier of the item. |

##### Response

| Field       | Type           | Description                                               |
| ----------- | -------------- | --------------------------------------------------------- |
| filename    | string         | The original filename.                                    |
| contentType | string         | The MIME type of the file (for example, application/pdf). |
| size        | number         | The file size in bytes.                                   |
| body        | ReadableStream | A readable stream of the file contents.                   |

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-search/api/items/workers-binding/#page","headline":"Workers binding · Cloudflare AI Search docs","description":"Upload, list, and manage documents in AI Search instances using the Items Workers binding.","url":"https://developers.cloudflare.com/ai-search/api/items/workers-binding/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-search/","name":"AI Search"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-search/api/","name":"API"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-search/api/items/","name":"Items"}},{"@type":"ListItem","position":5,"item":{"@id":"/ai-search/api/items/workers-binding/","name":"Workers binding"}}]}
```
