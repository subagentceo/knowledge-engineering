---
title: Event subscriptions
description: Subscribe to events from Cloudflare services to build custom workflows, integrations, and logic with Workers.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/queues/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Event subscriptions

Event subscriptions allow you to receive messages when events occur across your Cloudflare account. Cloudflare products (e.g., [KV](https://developers.cloudflare.com/kv/), [Workers AI](https://developers.cloudflare.com/workers-ai), [Workers](https://developers.cloudflare.com/workers)) can publish structured events to a queue, which you can then consume with Workers or [HTTP pull consumers](https://developers.cloudflare.com/queues/configuration/pull-consumers/) to build custom workflows, integrations, or logic.

![Event subscriptions architecture](https://developers.cloudflare.com/_astro/queues-event-subscriptions.3aVidnXJ_Z2p3fRA.webp) 

## What is an event?

An event is a structured record of something happening in your Cloudflare account – like a Workers AI batch request being queued, a Worker build completing, or an R2 bucket being created. When you subscribe to these events, your queue will automatically start receiving messages when the events occur.

## Learn more

[ Manage event subscriptions ](https://developers.cloudflare.com/queues/event-subscriptions/manage-event-subscriptions/) Learn how to create, configure, and manage event subscriptions for your queues. 

[ Events & schemas ](https://developers.cloudflare.com/queues/event-subscriptions/events-schemas/) Explore available event types and their corresponding data schemas. 

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/queues/event-subscriptions/#page","headline":"Event subscriptions overview · Cloudflare Queues docs","description":"Subscribe to events from Cloudflare services to build custom workflows, integrations, and logic with Workers.","url":"https://developers.cloudflare.com/queues/event-subscriptions/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/queues/","name":"Queues"}},{"@type":"ListItem","position":3,"item":{"@id":"/queues/event-subscriptions/","name":"Event subscriptions"}}]}
```
