---
title: JavaScript APIs
description: Produce and consume Cloudflare Queues messages using the Workers JavaScript API.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/queues/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# JavaScript APIs

Cloudflare Queues is integrated with [Cloudflare Workers](https://developers.cloudflare.com/workers). To send and receive messages, you must use a Worker.

A Worker that can send messages to a Queue is a producer Worker, while a Worker that can receive messages from a Queue is a consumer Worker. It is possible for the same Worker to be a producer and consumer, if desired.

In the future, we expect to support other APIs, such as HTTP endpoints to send or receive messages. To report bugs or request features, go to the [Cloudflare Community Forums ↗](https://community.cloudflare.com/c/developers/workers/40). To give feedback, go to the [#queues ↗](https://discord.cloudflare.com) Discord channel.

## Producer

These APIs allow a producer Worker to send messages to a Queue.

An example of writing a single message to a Queue:

* [  JavaScript ](#tab-panel-9601)
* [  TypeScript ](#tab-panel-9602)
* [  Python ](#tab-panel-9603)

index.js

```

export default {

  async fetch(req, env, ctx) {

    await env.MY_QUEUE.send({

      url: req.url,

      method: req.method,

      headers: Object.fromEntries(req.headers),

    });

    return new Response("Sent!");

  },

};


```

index.ts

```

interface Env {

  readonly MY_QUEUE: Queue;

}


export default {

  async fetch(req, env, ctx): Promise<Response> {

    await env.MY_QUEUE.send({

      url: req.url,

      method: req.method,

      headers: Object.fromEntries(req.headers),

    });

    return new Response("Sent!");

  },

} satisfies ExportedHandler<Env>;


```

Python

```

from pyodide.ffi import to_js

from workers import Response, WorkerEntrypoint


class Default(WorkerEntrypoint):

    async def fetch(self, request):

        await self.env.MY_QUEUE.send(to_js({

            "url": request.url,

            "method": request.method,

            "headers": dict(request.headers),

        }))

        return Response("Sent!")


```

The Queues API also supports writing multiple messages at once:

* [  JavaScript ](#tab-panel-9598)
* [  TypeScript ](#tab-panel-9599)
* [  Python ](#tab-panel-9600)

index.js

```

const sendResultsToQueue = async (results, env) => {

  const batch = results.map((value) => ({

    body: value,

  }));

  await env.MY_QUEUE.sendBatch(batch);

};


```

index.ts

```

const sendResultsToQueue = async (results: Array<unknown>, env: Env) => {

  const batch: MessageSendRequest[] = results.map((value) => ({

    body: value,

  }));

  await env.MY_QUEUE.sendBatch(batch);

};


```

Python

```

from pyodide.ffi import to_js


async def send_results_to_queue(results, env):

    batch = [

        {"body": value}

        for value in results

    ]

    await env.MY_QUEUE.sendBatch(to_js(batch))


```

### `Queue`

A binding that allows a producer to send messages to a Queue.

TypeScript

```

interface Queue<Body = unknown> {

  send(body: Body, options?: QueueSendOptions): Promise<QueueSendResult>;

  sendBatch(messages: Iterable<MessageSendRequest<Body>>, options?: QueueSendBatchOptions): Promise<QueueSendResult>;

  metrics(): Promise<QueueMetrics>;

}


```

* `send(body: unknown, options?: {contentType?: QueuesContentType })` ` Promise<QueueSendResult> `  
   * Sends a message to the Queue. The body can be any type supported by the [structured clone algorithm ↗](https://developer.mozilla.org/en-US/docs/Web/API/Web%5FWorkers%5FAPI/Structured%5Fclone%5Falgorithm#supported%5Ftypes), as long as its size is less than 128 KB.  
   * When the promise resolves, the message is confirmed to be written to disk.  
   * Returns a [QueueSendResult](#queuesendresult) containing realtime metrics about the queue.
* `sendBatch(messages: Iterable<MessageSendRequest<unknown>>, options?: QueueSendBatchOptions)` ` Promise<QueueSendBatchResult> `  
   * Sends a batch of messages to the Queue. Each item in the provided [Iterable ↗](https://www.typescriptlang.org/docs/handbook/iterators-and-generators.html) must be supported by the [structured clone algorithm ↗](https://developer.mozilla.org/en-US/docs/Web/API/Web%5FWorkers%5FAPI/Structured%5Fclone%5Falgorithm#supported%5Ftypes). A batch can contain up to 100 messages, though items are limited to 128 KB each, and the total size of the array cannot exceed 256 KB.  
   * The optional `options` parameter can be used to apply settings (such as `delaySeconds`) to all messages in the batch. See [QueueSendBatchOptions](#queuesendbatchoptions).  
   * When the promise resolves, the messages are confirmed to be written to disk.
* `metrics()` ` Promise<QueueMetrics> `  
   * Returns realtime [QueueMetrics](#queuemetrics) for the queue.

### `MessageSendRequest`

A wrapper type used for sending message batches.

TypeScript

```

interface MessageSendRequest<Body = unknown> {

  body: Body;

  contentType?: QueueContentType;

  delaySeconds?: number;

}


```

* `body` ` unknown `  
   * The body of the message.  
   * The body can be any type supported by the [structured clone algorithm ↗](https://developer.mozilla.org/en-US/docs/Web/API/Web%5FWorkers%5FAPI/Structured%5Fclone%5Falgorithm#supported%5Ftypes), as long as its size is less than 128 KB.
* `contentType` ` QueueContentType `  
   * The explicit content type of a message so it can be previewed correctly with the [List messages from the dashboard](https://developers.cloudflare.com/queues/examples/list-messages-from-dash/) feature. Optional argument.  
   * See [QueuesContentType](#queuescontenttype) for possible values.
* `delaySeconds` ` number `  
   * The number of seconds to [delay a message](https://developers.cloudflare.com/queues/configuration/batching-retries/) for within the queue, before it can be delivered to a consumer.  
   * Must be an integer between 0 and 86400 (24 hours).

### `QueueSendOptions`

Optional configuration that applies when sending a message to a queue.

* `contentType` ` QueuesContentType `  
   * The explicit content type of a message so it can be previewed correctly with the [List messages from the dashboard](https://developers.cloudflare.com/queues/examples/list-messages-from-dash/) feature. Optional argument.  
   * As of now, this option is for internal use. In the future, `contentType` will be used by alternative consumer types to explicitly mark messages as serialized so they can be consumed in the desired type.  
   * See [QueuesContentType](#queuescontenttype) for possible values.
* `delaySeconds` ` number `  
   * The number of seconds to [delay a message](https://developers.cloudflare.com/queues/configuration/batching-retries/) for within the queue, before it can be delivered to a consumer.  
   * Must be an integer between 0 and 86400 (24 hours). Setting this value to zero will explicitly prevent the message from being delayed, even if there is a global (default) delay at the queue level.

### `QueueSendBatchOptions`

Optional configuration that applies when sending a batch of messages to a queue.

* `delaySeconds` ` number `  
   * The number of seconds to [delay messages](https://developers.cloudflare.com/queues/configuration/batching-retries/) for within the queue, before it can be delivered to a consumer.  
   * Must be a positive integer.

### `QueuesContentType`

A union type containing valid message content types.

TypeScript

```

// Default: json

type QueuesContentType = "text" | "bytes" | "json" | "v8";


```

* Use `"json"` to send a JavaScript object that can be JSON-serialized. This content type can be previewed from the [Cloudflare dashboard ↗](https://dash.cloudflare.com). The `json` content type is the default.
* Use `"text"` to send a `String`. This content type can be previewed with the [List messages from the dashboard](https://developers.cloudflare.com/queues/examples/list-messages-from-dash/) feature.
* Use `"bytes"` to send an `ArrayBuffer`. This content type cannot be previewed from the [Cloudflare dashboard ↗](https://dash.cloudflare.com) and will display as Base64-encoded.
* Use `"v8"` to send a JavaScript object that cannot be JSON-serialized but is supported by [structured clone ↗](https://developer.mozilla.org/en-US/docs/Web/API/Web%5FWorkers%5FAPI/Structured%5Fclone%5Falgorithm#supported%5Ftypes) (for example `Date` and `Map`). This content type cannot be previewed from the [Cloudflare dashboard ↗](https://dash.cloudflare.com) and will display as Base64-encoded.

Note

The default content type for Queues changed to `json` (from `v8`) to improve compatibility with pull-based consumers for any Workers with a [compatibility date](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#queues-send-messages-in-json-format) after `2024-03-18`.

If you specify an invalid content type, or if your specified content type does not match the message content's type, the send operation will fail with an error.

### `QueueSendResult`

The result of a successful send operation.

TypeScript

```

interface QueueSendResult {

  metadata: {

    metrics: QueueMetrics;

  };

}


```

* `metadata` ` object `  
   * Contains metadata about the queue after the send operation.
* `metadata.metrics` ` QueueMetrics `  
   * Realtime metrics for the queue. See [QueueMetrics](#queuemetrics).

### `QueueMetrics`

Realtime metrics for a queue.

TypeScript

```

interface QueueMetrics {

  backlogCount: number;

  backlogBytes: number;

  oldestMessageTimestamp: number;

}


```

* `backlogCount` ` number `  
   * The number of messages currently in the queue.
* `backlogBytes` ` number `  
   * The total size of messages in the queue, in bytes.
* `oldestMessageTimestamp` ` number `  
   * The timestamp (in milliseconds since epoch) of the oldest message in the queue.

## Consumer

These APIs allow a consumer Worker to consume messages from a Queue.

To define a consumer Worker, add a `queue()` function to the default export of the Worker. This will allow it to receive messages from the Queue.

By default, all messages in the batch will be acknowledged as soon as all of the following conditions are met:

1. The `queue()` function has returned.
2. If the `queue()` function returned a promise, the promise has resolved.
3. Any promises passed to `waitUntil()` have resolved.

If the `queue()` function throws, or the promise returned by it or any of the promises passed to `waitUntil()` were rejected, then the entire batch will be considered a failure and will be retried according to the consumer's retry settings.

Note

`waitUntil()` is the only supported method to run tasks (such as logging or metrics calls) that resolve after a queue handler has completed. Promises that have not resolved by the time the queue handler returns may not complete and will not block completion of execution.

* [  JavaScript ](#tab-panel-9604)
* [  TypeScript ](#tab-panel-9605)
* [  Python ](#tab-panel-9606)

index.js

```

export default {

  async queue(batch, env, ctx) {

    for (const message of batch.messages) {

      console.log("Received", message.body);

    }

  },

};


```

index.ts

```

interface Env {

  // Add your bindings here

}


export default {

  async queue(batch, env, ctx): Promise<void> {

    for (const message of batch.messages) {

      console.log("Received", message.body);

    }

  },

} satisfies ExportedHandler<Env>;


```

Python

```

from workers import WorkerEntrypoint


class Default(WorkerEntrypoint):

    async def queue(self, batch):

        for message in batch.messages:

            print("Received", message)


```

The `env` and `ctx` fields are as [documented in the Workers documentation](https://developers.cloudflare.com/workers/reference/migrate-to-module-workers/).

### TypeScript message types

You can type queue messages with `Queue<T>` on the producer and `ExportedHandler<Env, T>` on the consumer.

TypeScript

```

type MyMessage = {

  id: string;

};


interface Env {

  MY_QUEUE: Queue<MyMessage>;

}


export default {

  async queue(batch) {

    for (const message of batch.messages) {

      console.log(message.body.id);

    }

  },

} satisfies ExportedHandler<Env, MyMessage>;


```

For primitive messages, use `Queue<number>` or `satisfies ExportedHandler<Env, number>`. If you do not specify a type, `message.body` is `unknown`.

Or alternatively, a queue consumer can be written using the (deprecated) service worker syntax:

JavaScript

```

addEventListener('queue', (event) => {

  event.waitUntil(handleMessages(event));

});


```

In service worker syntax, `event` provides the same fields and methods as `MessageBatch`, as defined below, in addition to [waitUntil() ↗](https://developer.mozilla.org/en-US/docs/Web/API/ExtendableEvent/waitUntil).

Note

When performing asynchronous tasks in your queue handler that iterates through messages, use an asynchronous version of iterating through your messages. For example, `for (const m of batch.messages)`or `await Promise.all(batch.messages.map(work))` allow for waiting for the results of asynchronous calls. `batch.messages.forEach()` does not.

### `MessageBatch`

A batch of messages that are sent to a consumer Worker.

TypeScript

```

interface MessageBatch<Body = unknown> {

  readonly queue: string;

  readonly messages: readonly Message<Body>[];

  ackAll(): void;

  retryAll(options?: QueueRetryOptions): void;

}


```

* `queue` ` string `  
   * The name of the Queue that belongs to this batch.
* `messages` ` Message[] `  
   * An array of messages in the batch. Ordering of messages is best effort -- not guaranteed to be exactly the same as the order in which they were published.
* `ackAll()` ` void `  
   * Marks every message as successfully delivered, regardless of whether your `queue()` consumer handler returns successfully or not.
* `retryAll(options?: QueueRetryOptions)` ` void `  
   * Marks every message to be retried in the next batch.  
   * Supports an optional `options` object.

### `Message`

A message that is sent to a consumer Worker.

TypeScript

```

interface Message<Body = unknown> {

  readonly id: string;

  readonly timestamp: Date;

  readonly body: Body;

  readonly attempts: number;

  ack(): void;

  retry(options?: QueueRetryOptions): void;

}


```

* `id` ` string `  
   * A unique, system-generated ID for the message.
* `timestamp` ` Date `  
   * A timestamp when the message was sent.
* `body` ` unknown `  
   * The body of the message.  
   * The body can be any type supported by the [structured clone algorithm ↗](https://developer.mozilla.org/en-US/docs/Web/API/Web%5FWorkers%5FAPI/Structured%5Fclone%5Falgorithm#supported%5Ftypes), as long as its size is less than 128 KB.
* `attempts` ` number `  
   * The number of times the consumer has attempted to process this message. Starts at 1.
* `ack()` ` void `  
   * Marks a message as successfully delivered, regardless of whether your `queue()` consumer handler returns successfully or not.
* `retry(options?: QueueRetryOptions)` ` void `  
   * Marks a message to be retried in the next batch.  
   * Supports an optional `options` object.

### `QueueRetryOptions`

Optional configuration when marking a message or a batch of messages for retry.

TypeScript

```

interface QueueRetryOptions {

  delaySeconds?: number;

}


```

* `delaySeconds` ` number `  
   * The number of seconds to [delay a message](https://developers.cloudflare.com/queues/configuration/batching-retries/) for within the queue, before it can be delivered to a consumer.  
   * Must be a positive integer.
* When the promise resolves, the messages are written to disk.  
   * Returns a [QueueSendResult](#queuesendresult) containing realtime metrics about the queue.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/queues/configuration/javascript-apis/#page","headline":"Cloudflare Queues - JavaScript APIs · Cloudflare Queues docs","description":"Produce and consume Cloudflare Queues messages using the Workers JavaScript API.","url":"https://developers.cloudflare.com/queues/configuration/javascript-apis/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-05-07","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/queues/","name":"Queues"}},{"@type":"ListItem","position":3,"item":{"@id":"/queues/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/queues/configuration/javascript-apis/","name":"JavaScript APIs"}}]}
```
