---
title: Cloudflare Durable Objects
description: Build stateful serverless applications with Durable Objects, including AI agents, real-time chat, and collaborative apps.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/durable-objects/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Cloudflare Durable Objects

Create AI agents, collaborative applications, real-time interactions like chat, and more without needing to coordinate state, have separate storage, or manage infrastructure.

 Available on Free and Paid plans 

Durable Objects provide a building block for stateful applications and distributed systems.

Use Durable Objects to build applications that need coordination among multiple clients, like collaborative editing tools, interactive chat, multiplayer games, live notifications, and deep distributed systems, without requiring you to build serialization and coordination primitives on your own.

[ Get started ](https://developers.cloudflare.com/durable-objects/get-started/) 

Note

SQLite-backed Durable Objects are now available on the Workers Free plan with these [limits](https://developers.cloudflare.com/durable-objects/platform/pricing/).

[SQLite storage](https://developers.cloudflare.com/durable-objects/best-practices/access-durable-objects-storage/) and corresponding [Storage API](https://developers.cloudflare.com/durable-objects/api/sqlite-storage-api/) methods like `sql.exec` have moved from beta to general availability. New Durable Object classes should use wrangler configuration for [SQLite storage](https://developers.cloudflare.com/durable-objects/reference/durable-objects-migrations/#create-migration).

### What are Durable Objects?

A Durable Object is a special kind of [Cloudflare Worker](https://developers.cloudflare.com/workers/) which uniquely combines compute with storage. Like a Worker, a Durable Object is automatically provisioned geographically close to where it is first requested, starts up quickly when needed, and shuts down when idle. You can have millions of them around the world. However, unlike regular Workers:

* Each Durable Object has a **globally-unique name**, which allows you to send requests to a specific object from anywhere in the world. Thus, a Durable Object can be used to coordinate between multiple clients who need to work together.
* Each Durable Object has some **durable storage** attached. Since this storage lives together with the object, it is strongly consistent yet fast to access.

Therefore, Durable Objects enable **stateful** serverless applications.

For more information, refer to the full [What are Durable Objects?](https://developers.cloudflare.com/durable-objects/concepts/what-are-durable-objects/) page.

---

## Features

###  In-memory State 

Learn how Durable Objects coordinate connections among multiple clients or events.

[ Use In-memory State ](https://developers.cloudflare.com/durable-objects/reference/in-memory-state/) 

###  Storage API 

Learn how Durable Objects provide transactional, strongly consistent, and serializable storage.

[ Use Storage API ](https://developers.cloudflare.com/durable-objects/api/sqlite-storage-api/) 

###  WebSocket Hibernation 

Learn how WebSocket Hibernation allows you to manage the connections of multiple clients at scale.

[ Use WebSocket Hibernation ](https://developers.cloudflare.com/durable-objects/best-practices/websockets/#durable-objects-hibernation-websocket-api) 

###  Durable Objects Alarms 

Learn how to use alarms to trigger a Durable Object and perform compute in the future at customizable intervals.

[ Use Durable Objects Alarms ](https://developers.cloudflare.com/durable-objects/api/alarms/) 

---

## Related products

**[Workers](https://developers.cloudflare.com/workers/)** 

Cloudflare Workers provides a serverless execution environment that allows you to create new applications or augment existing ones without configuring or maintaining infrastructure.

**[D1](https://developers.cloudflare.com/d1/)** 

D1 is Cloudflare's SQL-based native serverless database. Create a database by importing data or defining your tables and writing your queries within a Worker or through the API.

**[R2](https://developers.cloudflare.com/r2/)** 

Cloudflare R2 Storage allows developers to store large amounts of unstructured data without the costly egress bandwidth fees associated with typical cloud storage services.

---

## More resources

[Limits](https://developers.cloudflare.com/durable-objects/platform/limits/) 

Learn about Durable Objects limits.

[Pricing](https://developers.cloudflare.com/durable-objects/platform/pricing/) 

Learn about Durable Objects pricing.

[Storage options](https://developers.cloudflare.com/workers/platform/storage-options/) 

Learn more about storage and database options you can build with Workers.

[Developer Discord](https://discord.cloudflare.com) 

Connect with the Workers community on Discord to ask questions, show what you are building, and discuss the platform with other developers.

[@CloudflareDev](https://x.com/cloudflaredev) 

Follow @CloudflareDev on Twitter to learn about product announcements, and what is new in Cloudflare Developer Platform.

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/durable-objects/#page","headline":"Overview · Cloudflare Durable Objects docs","description":"Build stateful serverless applications with Durable Objects, including AI agents, real-time chat, and collaborative apps.","url":"https://developers.cloudflare.com/durable-objects/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/durable-objects/","name":"Durable Objects"}}]}
```
