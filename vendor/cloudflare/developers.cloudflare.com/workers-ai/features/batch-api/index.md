---
title: Asynchronous Batch API
description: Queue large inference workloads for asynchronous processing with the Workers AI Batch API.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers-ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Asynchronous Batch API

Asynchronous batch processing lets you send a collection (batch) of inference requests in a single call. Instead of expecting immediate responses for every request, the system queues them for processing and returns the results later.

Batch processing is useful for large workloads such as summarization or embeddings when there is no human interaction. Using the batch API will guarantee that your requests are fulfilled eventually, rather than erroring out if Cloudflare does not have enough capacity at a given time.

When you send a batch request, the API immediately acknowledges receipt with a status like `queued` and provides a unique `request_id`. This ID is later used to poll for the final responses once the processing is complete.

You can use the Batch API by either creating and deploying a Cloudflare Worker that leverages the [Batch API with the AI binding](https://developers.cloudflare.com/workers-ai/features/batch-api/workers-binding/), using the [REST API](https://developers.cloudflare.com/workers-ai/features/batch-api/rest-api/) directly or by starting from a [template ↗](https://github.com/craigsdennis/batch-please-workers-ai).

Note

Ensure that the total payload is under 10 MB.

## Demo application

If you want to get started quickly, click the button below:

[![Deploy to Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/craigsdennis/batch-please-workers-ai)

This will create a repository in your GitHub account and deploy a ready-to-use Worker that demonstrates how to use Cloudflare's Asynchronous Batch API. The template includes preconfigured AI bindings, and examples for sending and retrieving batch requests with and without external references. Once deployed, you can visit the live Worker and start experimenting with the Batch API immediately.

## Supported Models

Refer to our [model catalog](https://developers.cloudflare.com/workers-ai/models/?capabilities=Batch) for supported models.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers-ai/features/batch-api/#page","headline":"Asynchronous Batch API · Cloudflare Workers AI docs","description":"Queue large inference workloads for asynchronous processing with the Workers AI Batch API.","url":"https://developers.cloudflare.com/workers-ai/features/batch-api/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-ai/","name":"Workers AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-ai/features/","name":"Features"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers-ai/features/batch-api/","name":"Asynchronous Batch API"}}]}
```
