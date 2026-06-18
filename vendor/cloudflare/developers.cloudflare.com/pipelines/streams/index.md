---
title: Streams
description: Durable, buffered queues that receive and store events for processing in Cloudflare Pipelines.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/pipelines/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Streams

Streams are durable, buffered queues that receive and store events for processing in [Cloudflare Pipelines](https://developers.cloudflare.com/pipelines/). They provide reliable data ingestion via HTTP endpoints and Worker bindings, ensuring no data loss even during downstream processing delays or failures.

A single stream can be read by multiple pipelines, allowing you to route the same data to different destinations or apply different transformations. For example, you might send user events to both a real-time analytics pipeline and a data warehouse pipeline.

Streams currently accept events in JSON format and support both structured events with defined schemas and unstructured JSON. When a schema is provided, streams will validate and enforce it for incoming events.

## Learn more

[ Manage streams ](https://developers.cloudflare.com/pipelines/streams/manage-streams/) Create, configure, and delete streams using Wrangler or the API. 

[ Writing to streams ](https://developers.cloudflare.com/pipelines/streams/writing-to-streams/) Send events to streams via HTTP endpoints or Worker bindings. 

[ Logpush as a source ](https://developers.cloudflare.com/pipelines/streams/logpush/) Use Cloudflare Logpush to send logs from Cloudflare products to a Pipelines stream. 

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/pipelines/streams/#page","headline":"Streams · Cloudflare Pipelines Docs","description":"Durable, buffered queues that receive and store events for processing in Cloudflare Pipelines.","url":"https://developers.cloudflare.com/pipelines/streams/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/pipelines/","name":"Pipelines"}},{"@type":"ListItem","position":3,"item":{"@id":"/pipelines/streams/","name":"Streams"}}]}
```
