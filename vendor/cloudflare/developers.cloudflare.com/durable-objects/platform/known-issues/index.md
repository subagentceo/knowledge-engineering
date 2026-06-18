---
title: Known issues
description: Known issues with Durable Objects, including global uniqueness guarantees, code updates, and development tool limitations.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/durable-objects/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Known issues

Durable Objects is generally available. However, there are some known issues.

## Global uniqueness

Global uniqueness guarantees there is only a single instance of a Durable Object class with a given ID running at once, across the world.

Uniqueness is enforced upon starting a new event (such as receiving an HTTP request), and upon accessing storage.

After an event is received, if the event takes some time to execute and does not ever access its durable storage, then it is possible that the Durable Object may no longer be current, and some other instance of the same Durable Object ID will have been created elsewhere. If the event accesses storage at this point, it will receive an [exception](https://developers.cloudflare.com/durable-objects/observability/troubleshooting/). If the event completes without ever accessing storage, it may not ever realize that the Durable Object was no longer current.

A Durable Object may be replaced in the event of a network partition or a software update (including either an update of the Durable Object's class code, or of the Workers system itself). Enabling `wrangler tail` or [Cloudflare dashboard ↗](https://dash.cloudflare.com/) logs requires a software update.

## Code updates

Code changes for Workers and Durable Objects are released globally in an eventually consistent manner. Because each Durable Object is globally unique, the situation can arise that a request arrives to the latest version of your Worker (running in one part of the world), which then calls to a unique Durable Object running the previous version of your code for a short period of time (typically seconds to minutes). If you create a [gradual deployment](https://developers.cloudflare.com/workers/configuration/versions-and-deployments/gradual-deployments/), this period of time is determined by how long your live deployment is configured to use more than one version.

For this reason, it is best practice to ensure that API changes between your Workers and Durable Objects are forward and backward compatible across code updates.

## Development tools

[wrangler tail](https://developers.cloudflare.com/workers/wrangler/commands/general/#tail) logs from requests that are upgraded to WebSockets are delayed until the WebSocket is closed. `wrangler tail` should not be connected to a Worker that you expect will receive heavy volumes of traffic.

The Workers editor in the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) allows you to interactively edit and preview your Worker and Durable Objects. In the editor, Durable Objects can only be talked to by a preview request if the Worker being previewed both exports the Durable Object class and binds to it. Durable Objects exported by other Workers cannot be talked to in the editor preview.

[wrangler dev](https://developers.cloudflare.com/workers/wrangler/commands/general/#dev) has read access to Durable Object storage, but writes will be kept in memory and will not affect persistent data. However, if you specify the `script_name` explicitly in the [Durable Object binding](https://developers.cloudflare.com/workers/runtime-apis/bindings/), then writes will affect persistent data. Wrangler will emit a warning in that case.

## Alarms in local development

Currently, when developing locally (using `npx wrangler dev`), Durable Object [alarm methods](https://developers.cloudflare.com/durable-objects/api/alarms) may fail after a hot reload (if you edit the code while the code is running locally).

To avoid this issue, when using Durable Object alarms, close and restart your `wrangler dev` command after editing your code.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/durable-objects/platform/known-issues/#page","headline":"Known issues · Cloudflare Durable Objects docs","description":"Known issues with Durable Objects, including global uniqueness guarantees, code updates, and development tool limitations.","url":"https://developers.cloudflare.com/durable-objects/platform/known-issues/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/durable-objects/","name":"Durable Objects"}},{"@type":"ListItem","position":3,"item":{"@id":"/durable-objects/platform/","name":"Platform"}},{"@type":"ListItem","position":4,"item":{"@id":"/durable-objects/platform/known-issues/","name":"Known issues"}}]}
```
