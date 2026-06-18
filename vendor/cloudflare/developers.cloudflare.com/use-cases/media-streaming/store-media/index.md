---
title: Store media at scale
description: Store media files with zero egress fees using R2.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/use-cases/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Store media at scale

Media files are large, and egress fees from traditional cloud storage can be significant at scale. Cloudflare R2 provides S3-compatible object storage with zero egress fees, and Workers lets you build custom processing pipelines for validation, transformation, and routing.

## Solutions

### R2

S3-compatible object storage with zero egress fees. [Learn more about R2](https://developers.cloudflare.com/r2/).

* **Zero egress fees** \- No charges for data transferred out, regardless of volume
* **S3 compatibility** \- Use any S3-compatible tool, SDK, or library without code changes
* **Direct uploads** \- Issue presigned URLs so clients upload directly to R2 without routing through your servers

### Workers

Build and deploy serverless applications on Cloudflare's global network. [Learn more about Workers](https://developers.cloudflare.com/workers/).

* **Custom processing pipelines** \- Build media transformation, validation, and routing logic that runs at the edge

## Get started

1. [R2 get started](https://developers.cloudflare.com/r2/get-started/)
2. [Generate presigned URLs](https://developers.cloudflare.com/r2/api/s3/presigned-urls/)
3. [Workers get started](https://developers.cloudflare.com/workers/get-started/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/use-cases/media-streaming/store-media/#page","headline":"Store media at scale · Cloudflare use cases","description":"Store media files with zero egress fees using R2.","url":"https://developers.cloudflare.com/use-cases/media-streaming/store-media/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-24","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/use-cases/","name":"Use cases"}},{"@type":"ListItem","position":3,"item":{"@id":"/use-cases/media-streaming/","name":"Media and streaming"}},{"@type":"ListItem","position":4,"item":{"@id":"/use-cases/media-streaming/store-media/","name":"Store media at scale"}}]}
```
