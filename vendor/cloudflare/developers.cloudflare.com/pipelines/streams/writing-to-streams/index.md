---
title: Writing to streams
description: Send data to streams via Worker bindings or HTTP endpoints
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/pipelines/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Writing to streams

Send events to streams using [Worker bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/) or HTTP endpoints for client-side applications and external systems.

## Send via Workers

Worker bindings provide a secure way to send data to streams from [Workers](https://developers.cloudflare.com/workers/) without managing API tokens or credentials.

### Configure pipeline binding

Add a pipeline binding to your Wrangler file that points to your stream:

* [  wrangler.jsonc ](#tab-panel-9493)
* [  wrangler.toml ](#tab-panel-9494)

JSONC

```

{

  "pipelines": [

    {

      "binding": "STREAM",

      "stream": "<STREAM_ID>"

    }

  ]

}


```

TOML

```

[[pipelines]]

binding = "STREAM"

stream = "<STREAM_ID>"


```

Note

The `pipeline` field in the `pipelines` binding configuration has been renamed to `stream`. Existing configurations that use `pipeline` will continue to work, but Wrangler will display a deprecation warning. Update your configuration to use `stream` instead.

### Workers API

The pipeline binding exposes a method for sending data to your stream:

#### `send(records)`

Sends an array of JSON-serializable records to the stream. Returns a Promise that resolves when records are confirmed as ingested.

* [  JavaScript ](#tab-panel-9495)
* [  TypeScript ](#tab-panel-9496)

JavaScript

```

export default {

  async fetch(request, env, ctx) {

    const events = await request.json();


    await env.STREAM.send(events);


    return new Response("Events sent");

  },

};


```

TypeScript

```

export default {

  async fetch(request, env, ctx): Promise<Response> {

    const events = await request.json<Record<string, unknown>[]>();


    await env.STREAM.send(events);


    return new Response("Events sent");

  },

} satisfies ExportedHandler<Env>;


```

### Typed pipeline bindings

When a stream has a defined schema, running `wrangler types` generates schema-specific TypeScript types for your pipeline bindings. Instead of the generic `Pipeline<PipelineRecord>`, your bindings get a named record type with full autocomplete and compile-time type checking. Refer to the [wrangler types documentation](https://developers.cloudflare.com/workers/wrangler/commands/general/#types) to learn more.

#### Generated types

After running `wrangler types`, the generated `worker-configuration.d.ts` file contains a named record type inside the `Cloudflare` namespace. The type name is derived from the stream name (not the binding name), converted to PascalCase with a `Record` suffix.

Below is an example of what generated types look like in `worker-configuration.d.ts` for a stream named `ecommerce_stream`:

TypeScript

```

declare namespace Cloudflare {

  type EcommerceStreamRecord = {

    user_id: string;

    event_type: string;

    product_id?: string;

    amount?: number;

  };

  interface Env {

    STREAM: import("cloudflare:pipelines").Pipeline<Cloudflare.EcommerceStreamRecord>;

  }

}


```

#### Fallback behavior

`wrangler types` falls back to the generic `Pipeline<PipelineRecord>` type in the following scenarios:

* **Not authenticated**: Run `wrangler login` to enable typed pipeline bindings.
* **Stream not found**: The stream ID in your Wrangler configuration does not match an existing stream.
* **Unstructured stream**: The stream was created without a schema.

## Send via HTTP

Each stream provides an optional HTTP endpoint for ingesting data from external applications, browsers, or any system that can make HTTP requests.

### Endpoint format

HTTP endpoints follow this format:

```

https://{stream-id}.ingest.cloudflare.com


```

Find your stream's endpoint URL in the Cloudflare dashboard under **Pipelines** \> **Streams** or using the Wrangler CLI with either the stream ID or stream name:

Terminal window

```

npx wrangler pipelines streams get <STREAM_NAME_OR_ID>


```

### Making requests

Send events as JSON arrays via POST requests:

Terminal window

```

curl -X POST https://{stream-id}.ingest.cloudflare.com \

  -H "Content-Type: application/json" \

  -d '[

    {

      "user_id": "12345",

      "event_type": "purchase",

      "product_id": "widget-001",

      "amount": 29.99

    }

  ]'


```

### Authentication

When authentication is enabled for your stream, include the API token in the `Authorization` header:

Terminal window

```

curl -X POST https://{stream-id}.ingest.cloudflare.com \

  -H "Content-Type: application/json" \

  -H "Authorization: Bearer YOUR_API_TOKEN" \

  -d '[{"event": "test"}]'


```

The API token must have **Workers Pipeline Send** permission. To learn more, refer to the [Create API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) documentation.

## Schema validation

Streams handle validation differently based on their configuration:

* **Structured streams**: Events must match the defined schema fields and types.
* **Unstructured streams**: Accept any valid JSON structure. Data is stored in a single `value` column.

For structured streams, ensure your events match the schema definition. Invalid events will be accepted but dropped, so validate your data before sending to avoid dropped events. When using Worker bindings, run `wrangler types` to generate [typed pipeline bindings](#typed-pipeline-bindings) that catch schema violations at compile time. You can also query the [user error metrics](https://developers.cloudflare.com/pipelines/observability/metrics/#user-error-metrics) to monitor dropped events and diagnose schema validation issues.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pipelines/streams/writing-to-streams/#page","headline":"Writing to streams · Cloudflare Pipelines Docs","description":"Send data to streams via Worker bindings or HTTP endpoints","url":"https://developers.cloudflare.com/pipelines/streams/writing-to-streams/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-08","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/pipelines/","name":"Pipelines"}},{"@type":"ListItem","position":3,"item":{"@id":"/pipelines/streams/","name":"Streams"}},{"@type":"ListItem","position":4,"item":{"@id":"/pipelines/streams/writing-to-streams/","name":"Writing to streams"}}]}
```
