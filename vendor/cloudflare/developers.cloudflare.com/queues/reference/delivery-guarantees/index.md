---
title: Delivery guarantees
description: Cloudflare Queues provides at-least-once message delivery by default.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/queues/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Delivery guarantees

Delivery guarantees define how strongly a messaging system enforces the delivery of messages it processes.

As you make stronger guarantees about message delivery, the system needs to perform more checks and acknowledgments to ensure that messages are delivered, or maintain state to ensure a message is only delivered the specified number of times. This increases the latency of the system and reduces the overall throughput of the system. Each message may require an additional internal acknowledgements, and an equivalent number of additional roundtrips, before it can be considered delivered.

* **Queues provides _at least once_ delivery by default** in order to optimize for reliability.
* This means that messages are guaranteed to be delivered at least once, and in rare occasions, may be delivered more than once.
* For the majority of applications, this is the right balance between not losing any messages and minimizing end-to-end latency, as exactly once delivery incurs additional overheads in any messaging system.

In cases where processing the same message more than once would introduce unintended behaviour, generating a unique ID when writing the message to the queue and using that as the primary key on database inserts and/or as an idempotency key to de-duplicate the message after processing. For example, using this idempotency key as the ID in an upstream email API or payment API will allow those services to reject the duplicate on your behalf, without you having to carry additional state in your application.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/queues/reference/delivery-guarantees/#page","headline":"Delivery guarantees · Cloudflare Queues docs","description":"Cloudflare Queues provides at-least-once message delivery by default.","url":"https://developers.cloudflare.com/queues/reference/delivery-guarantees/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/queues/","name":"Queues"}},{"@type":"ListItem","position":3,"item":{"@id":"/queues/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/queues/reference/delivery-guarantees/","name":"Delivery guarantees"}}]}
```
