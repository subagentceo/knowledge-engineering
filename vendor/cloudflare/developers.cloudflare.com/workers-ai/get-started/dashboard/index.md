---
title: Dashboard
description: Create and deploy a Workers AI application using the Cloudflare dashboard.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers-ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Dashboard

Follow this guide to create a Workers AI application using the Cloudflare dashboard.

## Prerequisites

Sign up for a [Cloudflare account ↗](https://dash.cloudflare.com/sign-up/workers-and-pages) if you have not already.

## Setup

To create a Workers AI application:

1. In the Cloudflare dashboard, go to the **Workers & Pages** page.  
[ Go to **Workers & Pages** ](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Select **Create application**.
3. Under **Select a template**, select **LLM Chat App**.
4. Select **Deploy**.
5. Name your Worker, then select **Create and deploy**.
6. Preview your Worker at its provided [workers.dev](https://developers.cloudflare.com/workers/configuration/routing/workers-dev/) subdomain.

## Development

### Dashboard

Editing in the dashboard is helpful for simpler use cases.

Once you have created your Worker script, you can edit and deploy your Worker using the Cloudflare dashboard:

1. In the Cloudflare dashboard, go to the **Workers & Pages** page.  
[ Go to **Workers & Pages** ](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Select your application.
3. Select **Edit Code**.
![Edit code directly within the Cloudflare dashboard](https://developers.cloudflare.com/_astro/workers-edit-code.CKxxvQSe_11id2b.webp) 

### Wrangler CLI

To develop more advanced applications or [implement tests](https://developers.cloudflare.com/workers/testing/), start working in the Wrangler CLI.

1. Install [npm ↗](https://docs.npmjs.com/getting-started).
2. Install [Node.js ↗](https://nodejs.org/en/).

Node.js version manager

Use a Node version manager like [Volta ↗](https://volta.sh/) or [nvm ↗](https://github.com/nvm-sh/nvm) to avoid permission issues and change Node.js versions. [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/), discussed later in this guide, requires a Node version of `16.17.0` or later.

1. Run the following command, replacing the value of `[<DIRECTORY>]` which the location you want to put your Worker Script.

 npm  yarn  pnpm 

```
npm create cloudflare@latest -- [<DIRECTORY>] --type=pre-existing
```

```
yarn create cloudflare [<DIRECTORY>] --type=pre-existing
```

```
pnpm create cloudflare@latest [<DIRECTORY>] --type=pre-existing
```

After you run this command - and work through the prompts - your local changes will not automatically sync with dashboard. So, once you download your script, continue using the CLI.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers-ai/get-started/dashboard/#page","headline":"Get started - Dashboard · Cloudflare Workers AI docs","description":"Create and deploy a Workers AI application using the Cloudflare dashboard.","url":"https://developers.cloudflare.com/workers-ai/get-started/dashboard/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-ai/","name":"Workers AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-ai/get-started/","name":"Getting started"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers-ai/get-started/dashboard/","name":"Dashboard"}}]}
```
