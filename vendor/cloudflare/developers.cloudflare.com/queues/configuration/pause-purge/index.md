---
title: Pause and Purge
description: Pause message delivery or purge all messages from a Cloudflare Queue.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/queues/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Pause and Purge

## Pause Delivery

You can pause delivery of messages from your queue to any connected consumers. Pausing a queue is useful when managing downtime (for example, if your consumer Worker is unhealthy) without losing any messages.

Queues continue to receive and store messages even while delivery is paused. Messages in a paused queue are still subject to expiry, if the messages become older than the queue message retention period.

Pausing affects both [push-based consumer Workers](https://developers.cloudflare.com/queues/reference/how-queues-works#consumers) and [pull based consumers](https://developers.cloudflare.com/queues/configuration/pull-consumers).

### Pause and resume delivery using Wrangler

The following command will pause message delivery from your queue:

Terminal window

```

$ npx wrangler queues pause-delivery <QUEUE-NAME>


```

* `queue-name` ` string ` required  
   * The name of the queue for which delivery should be paused.

The following command will resume message delivery:

Terminal window

```

$ npx wrangler queues resume-delivery <QUEUE-NAME>


```

* `queue-name` ` string ` required  
   * The name of the queue for which delivery should be resumed.

### What happens to HTTP Pull consumers with a paused queue?

When a queue is paused, messages cannot be pulled by an [HTTP pull based consumer](https://developers.cloudflare.com/queues/configuration/pull-consumers). Requests to pull messages will receive a `409` response, along with an error message stating `queue_delivery_paused`.

## Purge queue

Purging a queue permanently deletes any messages currently stored in the Queue. Purging is useful while developing a new application, especially to clear out any test data. It can also be useful in production to handle scenarios when a batch of bad messages have been sent to a Queue.

Note that any in flight messages, which are currently being processed by consumers, might still be processed. Messages sent to a queue during a purge operation might not be purged. Any delayed messages will also be deleted from the queue.

Warning

Purging a queue is an irreversible operation. Make sure to use this operation carefully.

### Purge queue using Wrangler

The following command will purge messages from your queue. You will be prompted to enter the queue name to confirm the operation.

Terminal window

```

$ npx wrangler queues purge <QUEUE-NAME>


This operation will permanently delete all the messages in Queue <QUEUE-NAME>. Type <QUEUE-NAME> to proceed.


```

### Does purging a Queue affect my bill?

Purging a queue counts as a single billable operation, regardless of how many messages are deleted. For example, if you purge a queue which has 100 messages, all 100 messages will be permanently deleted, and you will be billed for 1 billable operation. Refer to the [pricing](https://developers.cloudflare.com/queues/platform/pricing) page for more information about how Queues is billed.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/queues/configuration/pause-purge/#page","headline":"Pause and Purge · Cloudflare Queues docs","description":"Pause message delivery or purge all messages from a Cloudflare Queue.","url":"https://developers.cloudflare.com/queues/configuration/pause-purge/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/queues/","name":"Queues"}},{"@type":"ListItem","position":3,"item":{"@id":"/queues/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/queues/configuration/pause-purge/","name":"Pause and Purge"}}]}
```
