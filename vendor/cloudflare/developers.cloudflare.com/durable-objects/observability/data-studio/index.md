---
title: Data Studio
description: View and edit SQLite-backed Durable Object storage data through the Cloudflare dashboard UI.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/durable-objects/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Data Studio

Each Durable Object can access private storage using [Storage API](https://developers.cloudflare.com/durable-objects/api/sqlite-storage-api/) available on `ctx.storage`. To view and write to an object's stored data, you can use Durable Objects Data Studio as a UI editor available on the Cloudflare dashboard.

Data Studio only supported for SQLite-backed objects

You can only use Data Studio to access data for [SQLite-backed Durable Objects](https://developers.cloudflare.com/durable-objects/best-practices/access-durable-objects-storage/#create-sqlite-backed-durable-object-class).

At the moment, you can only read/write data persisted using the [SQL API](https://developers.cloudflare.com/durable-objects/api/sqlite-storage-api/#sql-api). Key-value data persisted using the KV API will be made read-only in the future.

## View Data Studio

You need to have at least the `Workers Platform Admin` [role](https://developers.cloudflare.com/fundamentals/manage-members/roles/) to access Data Studio.

1. In the Cloudflare dashboard, go to the **Durable Objects** page.  
[ Go to **Durable Objects** ](https://dash.cloudflare.com/?to=/:account/workers/durable-objects)
2. Select an existing Durable Object namespace.
3. Select the **Data Studio** button.
4. Provide a Durable Object identifier, either a user-provided [unique name](https://developers.cloudflare.com/durable-objects/api/namespace/#getbyname) or a Cloudflare-generated [Durable Object ID](https://developers.cloudflare.com/durable-objects/api/id/).
* Queries executed by Data Studio send requests to your remote, deployed objects and incur [usage billing](https://developers.cloudflare.com/durable-objects/platform/pricing/) for requests, duration, rows read, and rows written. You should use Data Studio as you would handle your production, running objects.
* In the **Query** tab when running all statements, each SQL statement is sent as a separate Durable Object request.

## Audit logging

All queries issued by the Data Studio are logged with [audit logging v1](https://developers.cloudflare.com/fundamentals/account/account-security/review-audit-logs/) for your security and compliance needs.

* Each query emits two audit logs, a `query executed` action and a `query completed` action indicating query success or failure. `query_id` in the log event can be used to correlate the two events per query.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/durable-objects/observability/data-studio/#page","headline":"Data Studio · Cloudflare Durable Objects docs","description":"View and edit SQLite-backed Durable Object storage data through the Cloudflare dashboard UI.","url":"https://developers.cloudflare.com/durable-objects/observability/data-studio/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/durable-objects/","name":"Durable Objects"}},{"@type":"ListItem","position":3,"item":{"@id":"/durable-objects/observability/","name":"Observability"}},{"@type":"ListItem","position":4,"item":{"@id":"/durable-objects/observability/data-studio/","name":"Data Studio"}}]}
```
