---
title: Store and isolate customer data
description: Isolate customer data in a multi-tenant SaaS platform using per-tenant databases, object storage, and key-value stores.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/use-cases/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Store and isolate customer data

Multi-tenant platforms need to store customer data with appropriate isolation — per-tenant databases, separate object storage, or row-level separation. Cloudflare provides serverless storage options that support tenant isolation at the database, bucket, or key-prefix level.

## Solutions

### D1

Serverless SQL database built on SQLite, with global read replication. [Learn more about D1](https://developers.cloudflare.com/d1/).

* **Database per tenant** \- Create isolated D1 databases per customer for complete data separation, or use row-level isolation in a shared database

### R2

S3-compatible object storage with zero egress fees. [Learn more about R2](https://developers.cloudflare.com/r2/).

* **Object storage** \- Store customer files and assets per tenant using prefix or bucket-level isolation, with no egress fees

### Durable Objects

Stateful objects with strongly consistent storage and coordination. [Learn more about Durable Objects](https://developers.cloudflare.com/durable-objects/).

* **Real-time coordination** \- Manage stateful workflows and provide strong consistency for multi-tenant operations

### KV

Globally distributed key-value storage for low-latency reads. [Learn more about KV](https://developers.cloudflare.com/kv/).

* **Edge configuration** \- Store per-tenant settings, feature flags, and session data at the edge for low-latency reads

## Get started

1. [D1 get started](https://developers.cloudflare.com/d1/get-started/)
2. [R2 get started](https://developers.cloudflare.com/r2/get-started/)
3. [Durable Objects get started](https://developers.cloudflare.com/durable-objects/get-started/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/use-cases/saas/data-isolation/#page","headline":"Store and isolate customer data · Cloudflare use cases","description":"Isolate customer data in a multi-tenant SaaS platform using per-tenant databases, object storage, and key-value stores.","url":"https://developers.cloudflare.com/use-cases/saas/data-isolation/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-24","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/use-cases/","name":"Use cases"}},{"@type":"ListItem","position":3,"item":{"@id":"/use-cases/saas/","name":"SaaS platforms"}},{"@type":"ListItem","position":4,"item":{"@id":"/use-cases/saas/data-isolation/","name":"Store and isolate customer data"}}]}
```
