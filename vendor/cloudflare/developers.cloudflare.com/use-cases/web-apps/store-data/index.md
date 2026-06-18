---
title: Store application data
description: Persist data with serverless databases, key-value storage, and object storage.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/use-cases/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Store application data

Web applications need different storage types for different workloads — relational data, key-value lookups, file uploads, and real-time state. Cloudflare provides serverless storage options including D1 (SQL), KV (key-value), R2 (object storage), and Durable Objects (strongly consistent state).

## Solutions

### D1

Serverless SQL database built on SQLite, with global read replication. [Learn more about D1](https://developers.cloudflare.com/d1/).

* **SQL database** \- Full Structured Query Language (SQL) with global read replication built on SQLite

### KV

Globally distributed key-value storage for low-latency reads. [Learn more about KV](https://developers.cloudflare.com/kv/).

* **Key-value storage** \- Fast globally-distributed reads for configuration, sessions, and cached data

### R2

S3-compatible object storage with zero egress fees. [Learn more about R2](https://developers.cloudflare.com/r2/).

* **Object storage** \- Store user-uploaded files and assets with no egress fees

### Durable Objects

Stateful objects with strongly consistent storage and coordination. [Learn more about Durable Objects](https://developers.cloudflare.com/durable-objects/).

* **Real-time state** \- Strongly consistent coordination for collaborative features and live data

## Get started

1. [D1 get started](https://developers.cloudflare.com/d1/get-started/)
2. [KV get started](https://developers.cloudflare.com/kv/get-started/)
3. [R2 get started](https://developers.cloudflare.com/r2/get-started/)
4. [Durable Objects get started](https://developers.cloudflare.com/durable-objects/get-started/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/use-cases/web-apps/store-data/#page","headline":"Store application data · Cloudflare use cases","description":"Persist data with serverless databases, key-value storage, and object storage.","url":"https://developers.cloudflare.com/use-cases/web-apps/store-data/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-24","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/use-cases/","name":"Use cases"}},{"@type":"ListItem","position":3,"item":{"@id":"/use-cases/web-apps/","name":"Web sites and web apps"}},{"@type":"ListItem","position":4,"item":{"@id":"/use-cases/web-apps/store-data/","name":"Store application data"}}]}
```
