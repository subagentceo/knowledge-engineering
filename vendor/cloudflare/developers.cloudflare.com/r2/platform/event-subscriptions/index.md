---
title: Event subscriptions
description: Subscribe to R2 bucket events and Super Slurper events using Cloudflare Queues.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/r2/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Event subscriptions

[Event subscriptions](https://developers.cloudflare.com/queues/event-subscriptions/) allow you to receive messages when events occur across your Cloudflare account. Cloudflare products (e.g., [KV](https://developers.cloudflare.com/kv/), [Workers AI](https://developers.cloudflare.com/workers-ai/), [Workers](https://developers.cloudflare.com/workers/)) can publish structured events to a [queue](https://developers.cloudflare.com/queues/), which you can then consume with Workers or [HTTP pull consumers](https://developers.cloudflare.com/queues/configuration/pull-consumers/) to build custom workflows, integrations, or logic.

For more information on [Event Subscriptions](https://developers.cloudflare.com/queues/event-subscriptions/), refer to the [management guide](https://developers.cloudflare.com/queues/event-subscriptions/manage-event-subscriptions/).

## Available R2 events

#### `bucket.created`

Triggered when a bucket is created.

**Example:**

```

{

  "type": "cf.r2.bucket.created",

  "source": {

    "type": "r2"

  },

  "payload": {

    "name": "my-bucket",

    "jurisdiction": "default",

    "location": "WNAM",

    "storageClass": "Standard"

  },

  "metadata": {

    "accountId": "f9f79265f388666de8122cfb508d7776",

    "eventSubscriptionId": "1830c4bb612e43c3af7f4cada31fbf3f",

    "eventSchemaVersion": 1,

    "eventTimestamp": "2025-05-01T02:48:57.132Z"

  }

}


```

#### `bucket.deleted`

Triggered when a bucket is deleted.

**Example:**

```

{

  "type": "cf.r2.bucket.deleted",

  "source": {

    "type": "r2"

  },

  "payload": {

    "name": "my-bucket",

    "jurisdiction": "default"

  },

  "metadata": {

    "accountId": "f9f79265f388666de8122cfb508d7776",

    "eventSubscriptionId": "1830c4bb612e43c3af7f4cada31fbf3f",

    "eventSchemaVersion": 1,

    "eventTimestamp": "2025-05-01T02:48:57.132Z"

  }

}


```

## Available Super Slurper events

#### `job.started`

Triggered when a migration job starts.

**Example:**

```

{

  "type": "cf.superSlurper.job.started",

  "source": {

    "type": "superSlurper"

  },

  "payload": {

    "id": "job-12345678-90ab-cdef-1234-567890abcdef",

    "createdAt": "2025-05-01T02:48:57.132Z",

    "overwrite": true,

    "pathPrefix": "migrations/",

    "source": {

      "provider": "s3",

      "bucket": "source-bucket",

      "region": "us-east-1",

      "endpoint": "s3.amazonaws.com"

    },

    "destination": {

      "provider": "r2",

      "bucket": "destination-bucket",

      "jurisdiction": "default"

    }

  },

  "metadata": {

    "accountId": "f9f79265f388666de8122cfb508d7776",

    "eventSubscriptionId": "1830c4bb612e43c3af7f4cada31fbf3f",

    "eventSchemaVersion": 1,

    "eventTimestamp": "2025-05-01T02:48:57.132Z"

  }

}


```

#### `job.paused`

Triggered when a migration job pauses.

**Example:**

```

{

  "type": "cf.superSlurper.job.paused",

  "source": {

    "type": "superSlurper"

  },

  "payload": {

    "id": "job-12345678-90ab-cdef-1234-567890abcdef"

  },

  "metadata": {

    "accountId": "f9f79265f388666de8122cfb508d7776",

    "eventSubscriptionId": "1830c4bb612e43c3af7f4cada31fbf3f",

    "eventSchemaVersion": 1,

    "eventTimestamp": "2025-05-01T02:48:57.132Z"

  }

}


```

#### `job.resumed`

Triggered when a migration job resumes.

**Example:**

```

{

  "type": "cf.superSlurper.job.resumed",

  "source": {

    "type": "superSlurper"

  },

  "payload": {

    "id": "job-12345678-90ab-cdef-1234-567890abcdef"

  },

  "metadata": {

    "accountId": "f9f79265f388666de8122cfb508d7776",

    "eventSubscriptionId": "1830c4bb612e43c3af7f4cada31fbf3f",

    "eventSchemaVersion": 1,

    "eventTimestamp": "2025-05-01T02:48:57.132Z"

  }

}


```

#### `job.completed`

Triggered when a migration job finishes.

**Example:**

```

{

  "type": "cf.superSlurper.job.completed",

  "source": {

    "type": "superSlurper"

  },

  "payload": {

    "id": "job-12345678-90ab-cdef-1234-567890abcdef",

    "totalObjectsCount": 1000,

    "skippedObjectsCount": 10,

    "migratedObjectsCount": 980,

    "failedObjectsCount": 10

  },

  "metadata": {

    "accountId": "f9f79265f388666de8122cfb508d7776",

    "eventSubscriptionId": "1830c4bb612e43c3af7f4cada31fbf3f",

    "eventSchemaVersion": 1,

    "eventTimestamp": "2025-05-01T02:48:57.132Z"

  }

}


```

#### `job.aborted`

Triggered when a migration job is manually aborted.

**Example:**

```

{

  "type": "cf.superSlurper.job.aborted",

  "source": {

    "type": "superSlurper"

  },

  "payload": {

    "id": "job-12345678-90ab-cdef-1234-567890abcdef",

    "totalObjectsCount": 1000,

    "skippedObjectsCount": 100,

    "migratedObjectsCount": 500,

    "failedObjectsCount": 50

  },

  "metadata": {

    "accountId": "f9f79265f388666de8122cfb508d7776",

    "eventSubscriptionId": "1830c4bb612e43c3af7f4cada31fbf3f",

    "eventSchemaVersion": 1,

    "eventTimestamp": "2025-05-01T02:48:57.132Z"

  }

}


```

#### `job.object.migrated`

Triggered when an object is migrated.

**Example:**

```

{

  "type": "cf.superSlurper.job.object.migrated",

  "source": {

    "type": "superSlurper.job",

    "jobId": "job-12345678-90ab-cdef-1234-567890abcdef"

  },

  "payload": {

    "key": "migrations/file.txt"

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
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/r2/platform/event-subscriptions/#page","headline":"Event subscriptions · Cloudflare R2 docs","description":"Subscribe to R2 bucket events and Super Slurper events using Cloudflare Queues.","url":"https://developers.cloudflare.com/r2/platform/event-subscriptions/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/r2/","name":"R2"}},{"@type":"ListItem","position":3,"item":{"@id":"/r2/platform/","name":"Platform"}},{"@type":"ListItem","position":4,"item":{"@id":"/r2/platform/event-subscriptions/","name":"Event subscriptions"}}]}
```
