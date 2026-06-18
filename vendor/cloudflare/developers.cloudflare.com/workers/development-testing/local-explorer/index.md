---
title: Local Explorer
description: Browse and edit local binding data from your browser during development.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Local Explorer

Local Explorer is a browser-based interface for viewing and editing the data in your local [bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/) during development. It is available at `/cdn-cgi/explorer` on your local development server.

Instead of running CLI commands or writing throwaway code to inspect local state, you can open Local Explorer in your browser and work with your data directly. This is useful when you want to seed test data, verify what your Worker wrote, debug a workflow run, or run ad-hoc SQL queries against a local [D1](https://developers.cloudflare.com/d1/) database.

Local Explorer works with both [Wrangler](https://developers.cloudflare.com/workers/wrangler/) and the [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/).

## Prerequisites

* Wrangler 4.82.1 or later, or the latest [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/) (1.32.0+)

## Open Local Explorer

1. Start a local development session:

 npm  yarn  pnpm 

```
npx wrangler dev
```

```
yarn wrangler dev
```

```
pnpm wrangler dev
```

1. Press `e` in your terminal to open Local Explorer in your browser. You can also navigate directly to `/cdn-cgi/explorer` on your Worker's route and port.

Local Explorer is available by default and detects the bindings defined in your [Wrangler configuration](https://developers.cloudflare.com/workers/wrangler/configuration/) automatically.

## Supported bindings

Local Explorer supports the following binding types:

| Binding                                                                                | View                                           | Edit                                        |
| -------------------------------------------------------------------------------------- | ---------------------------------------------- | ------------------------------------------- |
| [KV](https://developers.cloudflare.com/kv/)                                            | Browse keys, view values and metadata          | Create, update, and delete key-value pairs  |
| [R2](https://developers.cloudflare.com/r2/)                                            | List objects, view metadata                    | Upload and delete objects                   |
| [D1](https://developers.cloudflare.com/d1/)                                            | Browse tables and rows, run SQL queries        | Insert, update, and delete rows through SQL |
| [Durable Objects](https://developers.cloudflare.com/durable-objects/) (SQLite storage) | Browse SQLite tables and rows, run SQL queries | Insert, update, and delete rows through SQL |
| [Workflows](https://developers.cloudflare.com/workflows/)                              | List instances, view status and step history   | Trigger new runs, retry failed instances    |

### D1 and Durable Objects SQL studio

For [D1](https://developers.cloudflare.com/d1/) databases and [Durable Objects](https://developers.cloudflare.com/durable-objects/) that use the [SQLite storage API](https://developers.cloudflare.com/durable-objects/api/sqlite-storage-api/), Local Explorer includes a SQL studio. This is the same experience available in the Cloudflare dashboard for deployed D1 databases. It provides both a visual table browser with inline editing and a SQL query editor where you can run arbitrary queries.

## API

Local Explorer exposes an API at `/cdn-cgi/explorer/api` that provides programmatic access to the same operations available in the browser interface. The API serves an [OpenAPI specification ↗](https://www.openapis.org/) that describes all available endpoints, parameters, and response formats.

To retrieve the OpenAPI spec:

Terminal window

```

curl http://localhost:8787/cdn-cgi/explorer/api


```

### Use with AI coding agents

The OpenAPI spec at `/cdn-cgi/explorer/api` allows AI coding agents and other tools to discover and interact with your local bindings programmatically. An agent can fetch the spec, understand what resources are available, and make API calls to read or modify local data without requiring manual setup.

This can be useful as an alternative to the CLI when you want an agent to:

* Populate test data in your local [KV](https://developers.cloudflare.com/kv/) namespaces or [D1](https://developers.cloudflare.com/d1/) databases
* Inspect the state of a [Durable Object](https://developers.cloudflare.com/durable-objects/) during debugging
* Trigger or retry a [Workflow](https://developers.cloudflare.com/workflows/) run with different input data
* Upload test files to a local [R2](https://developers.cloudflare.com/r2/) bucket

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/development-testing/local-explorer/#page","headline":"Local Explorer · Cloudflare Workers docs","description":"Browse and edit local binding data from your browser during development.","url":"https://developers.cloudflare.com/workers/development-testing/local-explorer/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/development-testing/","name":"Development & testing"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/development-testing/local-explorer/","name":"Local Explorer"}}]}
```
