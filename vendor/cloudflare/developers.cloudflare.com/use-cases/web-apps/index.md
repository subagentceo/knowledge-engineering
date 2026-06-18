---
title: Web sites and web apps
description: Build and deploy full-stack web applications on Cloudflare with Workers, D1, KV, R2, Durable Objects, and Queues.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/use-cases/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Web sites and web apps

Build and deploy full-stack web applications globally with serverless compute, storage, and instant deployments. Cloudflare Workers runs your frontend and backend logic at the edge. D1 provides a serverless SQL database. KV stores key-value data globally. R2 provides S3-compatible object storage with zero egress fees. Durable Objects coordinates real-time state. Queues handles background processing.

* [ Deploy frontend applications ](https://developers.cloudflare.com/use-cases/web-apps/deploy-frontend/)
* [ Build serverless backends ](https://developers.cloudflare.com/use-cases/web-apps/serverless-backends/)
* [ Store application data ](https://developers.cloudflare.com/use-cases/web-apps/store-data/)
* [ Add real-time features ](https://developers.cloudflare.com/use-cases/web-apps/real-time/)
* [ Optimize performance ](https://developers.cloudflare.com/use-cases/web-apps/performance/)
* [ Secure your application ](https://developers.cloudflare.com/use-cases/web-apps/security/)

## Architecture patterns

### Full-stack application

Build a complete application with frontend and backend:

* **Workers** serves your frontend assets (React, Vue, Astro, and similar frameworks) and handles Application Programming Interface (API) routes
* **D1** stores application data
* **R2** stores user uploads and assets

### Real-time collaborative app

Build multiplayer or collaborative features:

* **Durable Objects** coordinates state and WebSocket connections
* **Workers** handles HTTP requests and routing
* **KV** caches frequently accessed data
* **Queues** processes background tasks

### Static site with dynamic features

Add interactivity to static content:

* **Workers** serves static HTML/CSS/JavaScript (JS) and handles form submissions and API calls
* **KV** stores form data and user preferences
* **R2** stores uploaded files

---

## Prerequisites

### Create a new application

* A [Cloudflare account ↗](https://dash.cloudflare.com/sign-up).
* [Node.js ↗](https://nodejs.org/) (version 16.17.0 or later) installed on your machine.
* [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/) installed. Wrangler is the CLI for creating, testing, and deploying Workers projects.

### Use an existing application

* A [Cloudflare account ↗](https://dash.cloudflare.com/sign-up).
* A domain [added to Cloudflare](https://developers.cloudflare.com/fundamentals/manage-domains/add-site/) with DNS records proxied through Cloudflare. This is required for security features (SSL/TLS, Application security), caching, and performance optimizations.
* [Node.js ↗](https://nodejs.org/) (version 16.17.0 or later) and [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/) if you plan to add Workers-based functionality to your existing application.

---

## Related resources

[Workers documentation](https://developers.cloudflare.com/workers/) 

Complete documentation for building and deploying applications on Cloudflare.

[Developer platform tutorials](https://developers.cloudflare.com/workers/tutorials/) 

Step-by-step guides for building on Cloudflare.

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/use-cases/web-apps/#page","headline":"Web sites and web apps · Use cases · Cloudflare use cases","description":"Build and deploy full-stack web applications on Cloudflare with Workers, D1, KV, R2, Durable Objects, and Queues.","url":"https://developers.cloudflare.com/use-cases/web-apps/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-24","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/use-cases/","name":"Use cases"}},{"@type":"ListItem","position":3,"item":{"@id":"/use-cases/web-apps/","name":"Web sites and web apps"}}]}
```
