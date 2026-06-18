---
title: Local Development
description: Develop and test Cloudflare Queues locally using Wrangler.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/queues/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Local Development

Queues support local development workflows using [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/), the command-line interface for Workers. Wrangler runs the same version of Queues as Cloudflare runs globally.

## Prerequisites

To develop locally with Queues, you will need:

* [Wrangler v3.1.0 ↗](https://blog.cloudflare.com/wrangler3/) or later.
* Node.js version of `18.0.0` or later. Consider using a Node version manager like [Volta ↗](https://volta.sh/) or [nvm ↗](https://github.com/nvm-sh/nvm) to avoid permission issues and change Node versions.
* If you are new to Queues and/or Cloudflare Workers, refer to the [Queues tutorial](https://developers.cloudflare.com/queues/get-started/) to install `wrangler` and deploy their first Queue.

## Start a local development session

Open your terminal and run the following commands to start a local development session:

Terminal window

```

npx wrangler@latest dev


```

```

------------------

Your Worker and resources are simulated locally via Miniflare. For more information, see: https://developers.cloudflare.com/workers/testing/local-development.


Your worker has access to the following bindings:

- Queues: <QUEUE-NAME>


```

Local development sessions create a standalone, local-only environment that mirrors the production environment Queues runs in so you can test your Workers _before_ you deploy to production.

Refer to the [wrangler dev documentation](https://developers.cloudflare.com/workers/wrangler/commands/general/#dev) to learn more about how to configure a local development session.

## Separating producer & consumer Workers

Wrangler supports running multiple Workers simultaneously with a single command. If your architecture separates the producer and consumer into distinct Workers, you can use this functionality to test the entire message flow locally.

Warning

Support for running multiple Workers at once with one Wrangler command is experimental, and subject to change as we work on the experience. If you run into bugs or have any feedback, [open an issue on the workers-sdk repository ↗](https://github.com/cloudflare/workers-sdk/issues/new)

For example, if your project has the following directory structure:

```

producer-worker/

├── wrangler.jsonc

├── index.ts

└── consumer-worker/

    ├── wrangler.jsonc

    └── index.ts


```

You can start development servers for both workers with the following command:

Terminal window

```

npx wrangler@latest dev -c wrangler.jsonc -c consumer-worker/wrangler.jsonc --persist-to .wrangler/state


```

When the producer Worker sends messages to the queue, the consumer Worker will automatically be invoked to handle them.

Note

[Consumer concurrency](https://developers.cloudflare.com/queues/configuration/consumer-concurrency/) is not supported while running locally.

## Known Issues

* Queues does not support Wrangler remote mode (`wrangler dev --remote`).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/queues/configuration/local-development/#page","headline":"Local Development · Cloudflare Queues docs","description":"Develop and test Cloudflare Queues locally using Wrangler.","url":"https://developers.cloudflare.com/queues/configuration/local-development/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/queues/","name":"Queues"}},{"@type":"ListItem","position":3,"item":{"@id":"/queues/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/queues/configuration/local-development/","name":"Local Development"}}]}
```
