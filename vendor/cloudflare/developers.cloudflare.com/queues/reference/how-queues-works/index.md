---
title: How Queues Works
description: Learn about Queues architecture including producers, consumers, and message lifecycle.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/queues/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# How Queues Works

Cloudflare Queues is a flexible messaging queue that allows you to queue messages for asynchronous processing. Message queues are great at decoupling components of applications, like the checkout and order fulfillment services for an e-commerce site. Decoupled services are easier to reason about, deploy, and implement, allowing you to ship features that delight your customers without worrying about synchronizing complex deployments. Queues also allow you to batch and buffer calls to downstream services and APIs.

There are four major concepts to understand with Queues:

1. [Queues](#what-is-a-queue)
2. [Producers](#producers)
3. [Consumers](#consumers)
4. [Messages](#messages)

## What is a queue

A queue is a buffer or list that automatically scales as messages are written to it, and allows a consumer Worker to pull messages from that same queue.

Queues are designed to be reliable, and messages written to a queue should never be lost once the write succeeds. Similarly, messages are not deleted from a queue until the [consumer](#consumers) has successfully consumed the message.

Queues does not guarantee that messages will be delivered to a consumer in the same order in which they are published.

Developers can create multiple queues. Creating multiple queues can be useful to:

* Separate different use-cases and processing requirements: for example, a logging queue vs. a password reset queue.
* Horizontally scale your overall throughput (messages per second) by using multiple queues to scale out.
* Configure different batching strategies for each consumer connected to a queue.

For most applications, a single producer Worker per queue, with a single consumer Worker consuming messages from that queue allows you to logically separate the processing for each of your queues.

## Producers

A producer is the term for a client that is publishing or producing messages on to a queue. A producer is configured by [binding](https://developers.cloudflare.com/workers/runtime-apis/bindings/) a queue to a Worker and writing messages to the queue by calling that binding.

For example, if we bound a queue named `my-first-queue` to a binding of `MY_FIRST_QUEUE`, messages can be written to the queue by calling `send()` on the binding:

TypeScript

```

interface Env {

  readonly MY_FIRST_QUEUE: Queue;

}


export default {

  async fetch(req, env, ctx): Promise<Response> {

    const message = {

      url: req.url,

      method: req.method,

      headers: Object.fromEntries(req.headers),

    };


    await env.MY_FIRST_QUEUE.send(message); // This will throw an exception if the send fails for any reason

    return new Response("Sent!");

  },

} satisfies ExportedHandler<Env>;


```

Note

You can also use [context.waitUntil()](https://developers.cloudflare.com/workers/runtime-apis/context/#waituntil) to send the message without blocking the response.

Note that because `waitUntil()` is non-blocking, any errors raised from the `send()` or `sendBatch()` methods on a queue will be implicitly ignored.

A queue can have multiple producer Workers. For example, you may have multiple producer Workers writing events or logs to a shared queue based on incoming HTTP requests from users. There is no limit to the total number of producer Workers that can write to a single queue.

Additionally, multiple queues can be bound to a single Worker. That single Worker can decide which queue to write to (or write to multiple) based on any logic you define in your code.

### Content types

Messages published to a queue can be published in different formats, depending on what interoperability is needed with your consumer. The default content type is `json`, which means that any object that can be passed to `JSON.stringify()` will be accepted.

To explicitly set the content type or specify an alternative content type, pass the `contentType` option to the `send()` method of your queue:

TypeScript

```

interface Env {

  readonly MY_FIRST_QUEUE: Queue;

}


export default {

  async fetch(req, env, ctx): Promise<Response> {

    const message = {

      url: req.url,

      method: req.method,

      headers: Object.fromEntries(req.headers),

    };

    try {

      await env.MY_FIRST_QUEUE.send(message, { contentType: "json" }); // "json" is the default

      return new Response("Sent!");

    } catch (e) {

      // Catch cases where send fails, including due to a mismatched content type

      const msg = e instanceof Error ? e.message : "Unknown error";

      return Response.json({ error: msg }, { status: 500 });

    }

  },

} satisfies ExportedHandler<Env>;


```

To only accept simple strings when writing to a queue, set `{ contentType: "text" }` instead:

TypeScript

```

interface Env {

  readonly MY_FIRST_QUEUE: Queue;

}


export default {

  async fetch(req, env, ctx): Promise<Response> {

    try {

      // This will throw an exception (error) if you pass a non-string to the queue,

      // such as a native JavaScript object or ArrayBuffer.

      await env.MY_FIRST_QUEUE.send("hello there", { contentType: "text" }); // explicitly set 'text'

      return new Response("Sent!");

    } catch (e) {

      const msg = e instanceof Error ? e.message : "Unknown error";

      return Response.json({ error: msg }, { status: 500 });

    }

  },

} satisfies ExportedHandler<Env>;


```

The [QueuesContentType](https://developers.cloudflare.com/queues/configuration/javascript-apis/#queuescontenttype) API documentation describes how each format is serialized to a queue.

## Consumers

Queues supports two types of consumer:

1. A [consumer Worker](https://developers.cloudflare.com/queues/configuration/configure-queues/), which is push-based: the Worker is invoked when the queue has messages to deliver.
2. A [HTTP pull consumer](https://developers.cloudflare.com/queues/configuration/pull-consumers/), which is pull-based: the consumer calls the queue endpoint over HTTP to receive and then acknowledge messages.

A queue can only have one type of consumer configured.

### Create a consumer Worker

A consumer is the term for a client that is subscribing to or _consuming_ messages from a queue. In its most basic form, a consumer is defined by creating a `queue` handler in a Worker:

TypeScript

```

interface Env {

  // Add your bindings here, e.g. KV namespaces, R2 buckets, D1 databases

}


export default {

  async queue(batch, env, ctx): Promise<void> {

    // Do something with messages in the batch

    // i.e. write to R2 storage, D1 database, or POST to an external API

    for (const msg of batch.messages) {

      // Process each message

      console.log(msg.body);

    }

  },

} satisfies ExportedHandler<Env>;


```

You then connect that consumer to a queue with `wrangler queues consumer <queue-name> <worker-script-name>` or by defining a `[[queues.consumers]]` configuration in your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/) manually:

* [  wrangler.jsonc ](#tab-panel-9625)
* [  wrangler.toml ](#tab-panel-9626)

JSONC

```

{

  "queues": {

    "consumers": [

      {

        "queue": "<your-queue-name>",

        "max_batch_size": 100, // optional

        "max_batch_timeout": 30 // optional

      }

    ]

  }

}


```

TOML

```

[[queues.consumers]]

queue = "<your-queue-name>"

max_batch_size = 100

max_batch_timeout = 30


```

Importantly, each queue can only have one active consumer. This allows Cloudflare Queues to achieve at least once delivery and minimize the risk of duplicate messages beyond that.

Best practice

Configure a single consumer per queue. This both logically separates your queues, and ensures that errors (failures) in processing messages from one queue do not impact your other queues.

Notably, you can use the same consumer with multiple queues. The queue handler that defines your consumer Worker will be invoked by the queues it is connected to.

* The `MessageBatch` that is passed to your `queue` handler includes a `queue` property with the name of the queue the batch was read from.
* This can reduce the amount of code you need to write, and allow you to process messages based on the name of your queues.

For example, a consumer configured to consume messages from multiple queues would resemble the following:

TypeScript

```

interface Env {

  // Add your bindings here

}


export default {

  async queue(batch, env, ctx): Promise<void> {

    // MessageBatch has a `queue` property we can switch on

    switch (batch.queue) {

      case "log-queue":

        // Write the batch to R2

        break;

      case "debug-queue":

        // Write the message to the console or to another queue

        break;

      case "email-reset":

        // Trigger a password reset email via an external API

        break;

      default:

        // Handle messages we haven't mentioned explicitly (write a log, push to a DLQ)

        break;

    }

  },

} satisfies ExportedHandler<Env>;


```

### Remove a consumer

To remove a queue from your project, run `wrangler queues consumer remove <queue-name> <script-name>` and then remove the desired queue below the `[[queues.consumers]]` in Wrangler file.

### Pull consumers

A queue can have a HTTP-based consumer that pulls from the queue, instead of messages being pushed to a Worker.

This consumer can be any HTTP-speaking service that can communicate over the Internet. Review the [pull consumer guide](https://developers.cloudflare.com/queues/configuration/pull-consumers/) to learn how to configure a pull-based consumer for a queue.

## Messages

A message is the object you are producing to and consuming from a queue.

Any JSON serializable object can be published to a queue. For most developers, this means either simple strings or JSON objects. You can explicitly [set the content type](#content-types) when sending a message.

Messages themselves can be [batched when delivered to a consumer](https://developers.cloudflare.com/queues/configuration/batching-retries/). By default, messages within a batch are treated as all or nothing when determining retries. If the last message in a batch fails to be processed, the entire batch will be retried. You can also choose to [explicitly acknowledge](https://developers.cloudflare.com/queues/configuration/batching-retries/) messages as they are successfully processed, and/or mark individual messages to be retried.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/queues/reference/how-queues-works/#page","headline":"How Queues Works · Cloudflare Queues docs","description":"Learn about Queues architecture including producers, consumers, and message lifecycle.","url":"https://developers.cloudflare.com/queues/reference/how-queues-works/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/queues/","name":"Queues"}},{"@type":"ListItem","position":3,"item":{"@id":"/queues/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/queues/reference/how-queues-works/","name":"How Queues Works"}}]}
```
