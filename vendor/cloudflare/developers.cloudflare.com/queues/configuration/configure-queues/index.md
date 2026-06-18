---
title: Configure Queues
description: Set up Cloudflare Queues bindings, producers, and consumers using Wrangler.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/queues/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Configure Queues

Cloudflare Queues can be configured using [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/), the command-line interface for Cloudflare's Developer Platform, which includes [Workers](https://developers.cloudflare.com/workers/), [R2](https://developers.cloudflare.com/r2/), and other developer products.

Each Producer and Consumer Worker has a [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/) that specifies environment variables, triggers, and resources, such as a queue. To enable Worker-to-resource communication, you must set up a [binding](https://developers.cloudflare.com/workers/runtime-apis/bindings/) in your Worker project's Wrangler file.

Use the options below to configure your queue.

Note

Below are options for queues, refer to the Wrangler documentation for a full reference of the [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/).

## Queue configuration

The following queue level settings can be configured using Wrangler:

Terminal window

```

npx wrangler queues update <QUEUE-NAME> --delivery-delay-secs 60 --message-retention-period-secs 3000


```

* `--delivery-delay-secs` ` number ` ` optional `  
   * How long a published message is delayed for, before it is delivered to consumers.  
   * Must be between 0 and 86400 (24 hours).  
   * Defaults to 0.
* `--message-retention-period-secs` ` number ` ` optional `  
   * How long messages are retained on the Queue.  
   * Defaults to 345600 (4 days).  
   * Must be between 60 and 1209600 (14 days)

## Producer Worker configuration

A producer is a [Cloudflare Worker](https://developers.cloudflare.com/workers/) that writes to one or more queues. A producer can accept messages over HTTP, asynchronously write messages when handling requests, and/or write to a queue from within a [Durable Object](https://developers.cloudflare.com/durable-objects/). Any Worker can write to a queue.

To produce to a queue, set up a binding in your Wrangler file. These options should be used when a Worker wants to send messages to a queue.

* [  wrangler.jsonc ](#tab-panel-9590)
* [  wrangler.toml ](#tab-panel-9591)

JSONC

```

{

  "queues": {

    "producers": [

      {

        "queue": "my-queue",

        "binding": "MY_QUEUE"

      }

    ]

  }

}


```

TOML

```

[[queues.producers]]

queue = "my-queue"

binding = "MY_QUEUE"


```

* `queue` ` string `  
   * The name of the queue.
* `binding` ` string `  
   * The name of the binding, which is a JavaScript variable.

## Consumer Worker Configuration

To consume messages from one or more queues, set up a binding in your Wrangler file. These options should be used when a Worker wants to receive messages from a queue.

* [  wrangler.jsonc ](#tab-panel-9592)
* [  wrangler.toml ](#tab-panel-9593)

JSONC

```

{

  "queues": {

    "consumers": [

      {

        "queue": "my-queue",

        "max_batch_size": 10,

        "max_batch_timeout": 30,

        "max_retries": 10,

        "dead_letter_queue": "my-queue-dlq"

      }

    ]

  }

}


```

TOML

```

[[queues.consumers]]

queue = "my-queue"

max_batch_size = 10

max_batch_timeout = 30

max_retries = 10

dead_letter_queue = "my-queue-dlq"


```

Refer to [Limits](https://developers.cloudflare.com/queues/platform/limits) to review the maximum values for each of these options.

* `queue` ` string `  
   * The name of the queue.
* `max_batch_size` ` number ` ` optional `  
   * The maximum number of messages allowed in each batch.  
   * Defaults to `10` messages.
* `max_batch_timeout` ` number ` ` optional `  
   * The maximum number of seconds to wait until a batch is full.  
   * Defaults to `5` seconds.
* `max_retries` ` number ` ` optional `  
   * The maximum number of retries for a message, if it fails or [retryAll()](https://developers.cloudflare.com/queues/configuration/javascript-apis/#messagebatch) is invoked.  
   * Defaults to `3` retries.
* `dead_letter_queue` ` string ` ` optional `  
   * The name of another queue to send a message if it fails processing at least `max_retries` times.  
   * If a `dead_letter_queue` is not defined, messages that repeatedly fail processing will eventually be discarded.  
   * If there is no queue with the specified name, it will be created automatically.
* `max_concurrency` ` number ` ` optional `  
   * The maximum number of concurrent consumers allowed to run at once. Leaving this unset will mean that the number of invocations will scale to the [currently supported maximum](https://developers.cloudflare.com/queues/platform/limits/).  
   * Refer to [Consumer concurrency](https://developers.cloudflare.com/queues/configuration/consumer-concurrency/) for more information on how consumers autoscale, particularly when messages are retried.

## Pull-based

A queue can have a HTTP-based consumer that pulls from the queue. This consumer can be any HTTP-speaking service that can communicate over the Internet. Review [Pull consumers](https://developers.cloudflare.com/queues/configuration/pull-consumers/) to learn how to configure a pull-based consumer.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/queues/configuration/configure-queues/#page","headline":"Cloudflare Queues - Configuration · Cloudflare Queues docs","description":"Set up Cloudflare Queues bindings, producers, and consumers using Wrangler.","url":"https://developers.cloudflare.com/queues/configuration/configure-queues/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/queues/","name":"Queues"}},{"@type":"ListItem","position":3,"item":{"@id":"/queues/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/queues/configuration/configure-queues/","name":"Configure Queues"}}]}
```
