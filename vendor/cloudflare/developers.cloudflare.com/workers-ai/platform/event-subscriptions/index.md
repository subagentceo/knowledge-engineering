---
title: Event subscriptions
description: Subscribe to Workers AI events using Cloudflare Queues for asynchronous processing.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers-ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Event subscriptions

[Event subscriptions](https://developers.cloudflare.com/queues/event-subscriptions/) allow you to receive messages when events occur across your Cloudflare account. Cloudflare products (e.g., [KV](https://developers.cloudflare.com/kv/), [Workers AI](https://developers.cloudflare.com/workers-ai/), [Workers](https://developers.cloudflare.com/workers/)) can publish structured events to a [queue](https://developers.cloudflare.com/queues/), which you can then consume with Workers or [HTTP pull consumers](https://developers.cloudflare.com/queues/configuration/pull-consumers/) to build custom workflows, integrations, or logic.

For more information on [Event Subscriptions](https://developers.cloudflare.com/queues/event-subscriptions/), refer to the [management guide](https://developers.cloudflare.com/queues/event-subscriptions/manage-event-subscriptions/).

## Available Workers AI events

#### `batch.queued`

Triggered when a batch request is queued.

**Example:**

```

{

  "type": "cf.workersAi.model.batch.queued",

  "source": {

    "type": "workersAi.model",

    "modelName": "@cf/baai/bge-base-en-v1.5"

  },

  "payload": {

    "requestId": "req-12345678-90ab-cdef-1234-567890abcdef"

  },

  "metadata": {

    "accountId": "f9f79265f388666de8122cfb508d7776",

    "eventSubscriptionId": "1830c4bb612e43c3af7f4cada31fbf3f",

    "eventSchemaVersion": 1,

    "eventTimestamp": "2025-05-01T02:48:57.132Z"

  }

}


```

#### `batch.succeeded`

Triggered when a batch request has completed.

**Example:**

```

{

  "type": "cf.workersAi.model.batch.succeeded",

  "source": {

    "type": "workersAi.model",

    "modelName": "@cf/baai/bge-base-en-v1.5"

  },

  "payload": {

    "requestId": "req-12345678-90ab-cdef-1234-567890abcdef"

  },

  "metadata": {

    "accountId": "f9f79265f388666de8122cfb508d7776",

    "eventSubscriptionId": "1830c4bb612e43c3af7f4cada31fbf3f",

    "eventSchemaVersion": 1,

    "eventTimestamp": "2025-05-01T02:48:57.132Z"

  }

}


```

#### `batch.failed`

Triggered when a batch request has failed.

**Example:**

```

{

  "type": "cf.workersAi.model.batch.failed",

  "source": {

    "type": "workersAi.model",

    "modelName": "@cf/baai/bge-base-en-v1.5"

  },

  "payload": {

    "requestId": "req-12345678-90ab-cdef-1234-567890abcdef",

    "message": "Model execution failed",

    "internalCode": 5001,

    "httpCode": 500

  },

  "metadata": {

    "accountId": "f9f79265f388666de8122cfb508d7776",

    "eventSubscriptionId": "1830c4bb612e43c3af7f4cada31fbf3f",

    "eventSchemaVersion": 1,

    "eventTimestamp": "2025-05-01T02:48:57.132Z"

  }

}


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers-ai/platform/event-subscriptions/#page","headline":"Event subscriptions · Cloudflare Workers AI docs","description":"Subscribe to Workers AI events using Cloudflare Queues for asynchronous processing.","url":"https://developers.cloudflare.com/workers-ai/platform/event-subscriptions/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-ai/","name":"Workers AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-ai/platform/","name":"Platform"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers-ai/platform/event-subscriptions/","name":"Event subscriptions"}}]}
```
