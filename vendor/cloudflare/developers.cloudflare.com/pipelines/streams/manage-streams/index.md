---
title: Manage streams
description: Create, configure, and manage streams for data ingestion
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/pipelines/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Manage streams

Learn how to:

* Create and configure streams for data ingestion
* View and update stream settings
* Delete streams when no longer needed

## Create a stream

Streams are made available to pipelines as SQL tables using the stream name (for example, `SELECT * FROM my_stream`).

### Dashboard

1. In the Cloudflare dashboard, go to the **Pipelines** page.  
[ Go to **Pipelines** ](https://dash.cloudflare.com/?to=/:account/pipelines/overview)
2. Select **Create Pipeline** to launch the pipeline creation wizard.
3. Complete the wizard to create your stream along with the associated sink and pipeline.

### Wrangler CLI

To create a stream, run the [pipelines streams create](https://developers.cloudflare.com/workers/wrangler/commands/pipelines/#pipelines-streams-create) command:

Terminal window

```

npx wrangler pipelines streams create <STREAM_NAME>


```

Alternatively, to use the interactive setup wizard that helps you configure a stream, sink, and pipeline, run the [pipelines setup](https://developers.cloudflare.com/workers/wrangler/commands/pipelines/#pipelines-setup) command:

Terminal window

```

npx wrangler pipelines setup


```

### Schema configuration

Streams support two approaches for handling data:

* **Structured streams**: Define a schema with specific fields and data types. Events are validated against the schema.
* **Unstructured streams**: Accept any valid JSON without validation. These streams have a single `value` column containing the JSON data.

To create a structured stream, provide a schema file:

Terminal window

```

npx wrangler pipelines streams create my-stream --schema-file schema.json


```

Example schema file:

```

{

  "fields": [

    {

      "name": "user_id",

      "type": "string",

      "required": true

    },

    {

      "name": "amount",

      "type": "float64",

      "required": false

    },

    {

      "name": "tags",

      "type": "list",

      "required": false,

      "items": {

        "type": "string"

      }

    },

    {

      "name": "metadata",

      "type": "struct",

      "required": false,

      "fields": [

        {

          "name": "source",

          "type": "string",

          "required": false

        },

        {

          "name": "priority",

          "type": "int32",

          "required": false

        }

      ]

    }

  ]

}


```

**Supported data types:**

* `string` \- Text values
* `int32`, `int64` \- Integer numbers
* `float32`, `float64` \- Floating-point numbers
* `bool` \- Boolean true/false
* `timestamp` \- RFC 3339 timestamps, or numeric values parsed as Unix seconds, milliseconds, or microseconds (depending on unit)
* `json` \- JSON objects
* `binary` \- Binary data (base64-encoded)
* `list` \- Arrays of values
* `struct` \- Nested objects with defined fields

Note

Events that do not match the defined schema are accepted during ingestion but will be dropped during processing. To monitor dropped events and understand why they were dropped, query the [user error metrics](https://developers.cloudflare.com/pipelines/observability/metrics/#user-error-metrics) via GraphQL. Schema modifications are not supported after stream creation.

## View stream configuration

### Dashboard

1. In the Cloudflare dashboard, go to **Pipelines** \> **Streams**.
2. Select a stream to view its associated configuration.

### Wrangler CLI

To view a specific stream, run the [pipelines streams get](https://developers.cloudflare.com/workers/wrangler/commands/pipelines/#pipelines-streams-get) command with either the stream ID or stream name:

Terminal window

```

npx wrangler pipelines streams get <STREAM_NAME_OR_ID>


```

To list all streams in your account, run the [pipelines streams list](https://developers.cloudflare.com/workers/wrangler/commands/pipelines/#pipelines-streams-list) command:

Terminal window

```

npx wrangler pipelines streams list


```

## Update HTTP ingest settings

You can update certain HTTP ingest settings after stream creation. Schema modifications are not supported once a stream is created.

### Dashboard

1. In the Cloudflare dashboard, go to **Pipelines** \> **Streams**.
2. Select the stream you want to update.
3. In the **Settings** tab, go to **HTTP Ingest**.
4. To turn on or turn off HTTP ingestion, select **Enable** or **Disable**.
5. To update authentication and CORS settings, select **Edit** and modify.
6. Save your changes.

Note

For details on configuring authentication tokens and making authenticated requests, refer to [Writing to streams](https://developers.cloudflare.com/pipelines/streams/writing-to-streams/).

## Delete a stream

### Dashboard

1. In the Cloudflare dashboard, go to **Pipelines** \> **Streams**.
2. Select the stream you want to delete.
3. In the **Settings** tab, go to **General**, and select **Delete**.

### Wrangler CLI

To delete a stream, run the [pipelines streams delete](https://developers.cloudflare.com/workers/wrangler/commands/pipelines/#pipelines-streams-delete) command:

Terminal window

```

npx wrangler pipelines streams delete <STREAM_ID>


```

Warning

Deleting a stream will permanently remove all buffered events that have not been processed and will delete any dependent pipelines. Ensure all data has been delivered to your sink before deletion.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pipelines/streams/manage-streams/#page","headline":"Manage streams · Cloudflare Pipelines Docs","description":"Create, configure, and manage streams for data ingestion","url":"https://developers.cloudflare.com/pipelines/streams/manage-streams/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-08","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/pipelines/","name":"Pipelines"}},{"@type":"ListItem","position":3,"item":{"@id":"/pipelines/streams/","name":"Streams"}},{"@type":"ListItem","position":4,"item":{"@id":"/pipelines/streams/manage-streams/","name":"Manage streams"}}]}
```
