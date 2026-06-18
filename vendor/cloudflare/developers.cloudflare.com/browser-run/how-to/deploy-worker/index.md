---
title: Deploy a Browser Run Worker
description: Create and deploy a Cloudflare Worker that uses Browser Run to take screenshots from web pages.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/browser-run/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Deploy a Browser Run Worker

By following this guide, you will create a Worker that uses the Browser Run API to take screenshots from web pages. This is a common use case for browser automation.

1. Sign up for a [Cloudflare account ↗](https://dash.cloudflare.com/sign-up/workers-and-pages).
2. Install [Node.js ↗](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

Node.js version manager

Use a Node version manager like [Volta ↗](https://volta.sh/) or [nvm ↗](https://github.com/nvm-sh/nvm) to avoid permission issues and change Node.js versions. [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/), discussed later in this guide, requires a Node version of `16.17.0` or later.

#### 1\. Create a Worker project

[Cloudflare Workers](https://developers.cloudflare.com/workers/) provides a serverless execution environment that allows you to create new applications or augment existing ones without configuring or maintaining infrastructure. Your Worker application is a container to interact with a headless browser to do actions, such as taking screenshots.

Create a new Worker project named `browser-worker` by running:

 npm  yarn  pnpm 

```
npm create cloudflare@latest -- browser-worker
```

```
yarn create cloudflare browser-worker
```

```
pnpm create cloudflare@latest browser-worker
```

For setup, select the following options:

* For _What would you like to start with?_, choose `Hello World example`.
* For _Which template would you like to use?_, choose `Worker only`.
* For _Which language do you want to use?_, choose `JavaScript / TypeScript`.
* For _Do you want to use git for version control?_, choose `Yes`.
* For _Do you want to deploy your application?_, choose `No` (we will be making some changes before deploying).

#### 2\. Install Puppeteer

In your `browser-worker` directory, install Cloudflare’s [fork of Puppeteer](https://developers.cloudflare.com/browser-run/puppeteer/):

 npm  yarn  pnpm  bun 

```
npm i -D @cloudflare/puppeteer
```

```
yarn add -D @cloudflare/puppeteer
```

```
pnpm add -D @cloudflare/puppeteer
```

```
bun add -d @cloudflare/puppeteer
```

#### 3\. Create a KV namespace

Browser Run can be used with other developer products. You might need a [relational database](https://developers.cloudflare.com/d1/), an [R2 bucket](https://developers.cloudflare.com/r2/) to archive your crawled pages and assets, a [Durable Object](https://developers.cloudflare.com/durable-objects/) to keep your browser instance alive and share it with multiple requests, or [Queues](https://developers.cloudflare.com/queues/) to handle your jobs asynchronously.

For the purpose of this example, we will use a [KV store](https://developers.cloudflare.com/kv/concepts/kv-namespaces/) to cache your screenshots.

Create two namespaces, one for production and one for development.

Terminal window

```

npx wrangler kv namespace create BROWSER_KV_DEMO

npx wrangler kv namespace create BROWSER_KV_DEMO --preview


```

Take note of the IDs for the next step.

#### 4\. Configure the Wrangler configuration file

Configure your `browser-worker` project's [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/) by adding a browser [binding](https://developers.cloudflare.com/workers/runtime-apis/bindings/) and a [Node.js compatibility flag](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#nodejs-compatibility-flag). Bindings allow your Workers to interact with resources on the Cloudflare developer platform. Your browser `binding` name is set by you, this guide uses the name `MYBROWSER`. Browser bindings allow for communication between a Worker and a headless browser which allows you to do actions such as taking a screenshot, generating a PDF, and more.

Update your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/) with the Browser Run API binding and the KV namespaces you created:

* [  wrangler.jsonc ](#tab-panel-6882)
* [  wrangler.toml ](#tab-panel-6883)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "name": "browser-worker",

  "main": "src/index.js",

  // Set this to today's date

  "compatibility_date": "2026-06-18",

  "compatibility_flags": ["nodejs_compat"],

  "browser": {

    "binding": "MYBROWSER"

  },

  "kv_namespaces": [

    {

      "binding": "BROWSER_KV_DEMO",

      "id": "22cf855786094a88a6906f8edac425cd",

      "preview_id": "e1f8b68b68d24381b57071445f96e623"

    }

  ]

}


```

TOML

```

"$schema" = "./node_modules/wrangler/config-schema.json"

name = "browser-worker"

main = "src/index.js"

# Set this to today's date

compatibility_date = "2026-06-18"

compatibility_flags = [ "nodejs_compat" ]


[browser]

binding = "MYBROWSER"


[[kv_namespaces]]

binding = "BROWSER_KV_DEMO"

id = "22cf855786094a88a6906f8edac425cd"

preview_id = "e1f8b68b68d24381b57071445f96e623"


```

#### 5\. Code

* [  JavaScript ](#tab-panel-6880)
* [  TypeScript ](#tab-panel-6881)

Update `src/index.js` with your Worker code:

JavaScript

```

import puppeteer from "@cloudflare/puppeteer";


export default {

  async fetch(request, env) {

    const { searchParams } = new URL(request.url);

    let url = searchParams.get("url");

    let img;

    if (url) {

      url = new URL(url).toString(); // normalize

      img = await env.BROWSER_KV_DEMO.get(url, { type: "arrayBuffer" });

      if (img === null) {

        const browser = await puppeteer.launch(env.MYBROWSER);

        const page = await browser.newPage();

        await page.goto(url);

        img = await page.screenshot();

        await env.BROWSER_KV_DEMO.put(url, img, {

          expirationTtl: 60 * 60 * 24,

        });

        await browser.close();

      }

      return new Response(img, {

        headers: {

          "content-type": "image/jpeg",

        },

      });

    } else {

      return new Response("Please add an ?url=https://example.com/ parameter");

    }

  },

};


```

Update `src/index.ts` with your Worker code:

TypeScript

```

import puppeteer from "@cloudflare/puppeteer";


interface Env {

  MYBROWSER: Fetcher;

  BROWSER_KV_DEMO: KVNamespace;

}


export default {

  async fetch(request, env): Promise<Response> {

    const { searchParams } = new URL(request.url);

    let url = searchParams.get("url");

    let img: Buffer;

    if (url) {

      url = new URL(url).toString(); // normalize

      img = await env.BROWSER_KV_DEMO.get(url, { type: "arrayBuffer" });

      if (img === null) {

        const browser = await puppeteer.launch(env.MYBROWSER);

        const page = await browser.newPage();

        await page.goto(url);

        img = (await page.screenshot()) as Buffer;

        await env.BROWSER_KV_DEMO.put(url, img, {

          expirationTtl: 60 * 60 * 24,

        });

        await browser.close();

      }

      return new Response(img, {

        headers: {

          "content-type": "image/jpeg",

        },

      });

    } else {

      return new Response("Please add an ?url=https://example.com/ parameter");

    }

  },

} satisfies ExportedHandler<Env>;


```

This Worker instantiates a browser using Puppeteer, opens a new page, navigates to the location of the 'url' parameter, takes a screenshot of the page, stores the screenshot in KV, closes the browser, and responds with the JPEG image of the screenshot.

If your Worker is running in production, it will store the screenshot to the production KV namespace. If you are running `wrangler dev`, it will store the screenshot to the dev KV namespace.

If the same `url` is requested again, it will use the cached version in KV instead, unless it expired.

#### 6\. Test

Run `npx wrangler dev` to test your Worker locally.

Use real headless browser during local development

To interact with a real headless browser during local development, set `"remote" : true` in the Browser binding configuration. Learn more in our [remote bindings documentation](https://developers.cloudflare.com/workers/development-testing/#remote-bindings).

To test taking your first screenshot, go to the following URL:

`<LOCAL_HOST_URL>/?url=https://example.com`

#### 7\. Deploy

Run `npx wrangler deploy` to deploy your Worker to the Cloudflare global network.

To take your first screenshot, go to the following URL:

```

<YOUR_WORKER>.<YOUR_SUBDOMAIN>.workers.dev/?url=https://example.com


```

## Related resources

* Other [Puppeteer examples ↗](https://github.com/cloudflare/puppeteer/tree/main/examples)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/browser-run/how-to/deploy-worker/#page","headline":"Deploy a Browser Run Worker · Cloudflare Browser Run docs","description":"Create and deploy a Cloudflare Worker that uses Browser Run to take screenshots from web pages.","url":"https://developers.cloudflare.com/browser-run/how-to/deploy-worker/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/browser-run/","name":"Browser Run"}},{"@type":"ListItem","position":3,"item":{"@id":"/browser-run/how-to/","name":"Tutorials"}},{"@type":"ListItem","position":4,"item":{"@id":"/browser-run/how-to/deploy-worker/","name":"Deploy a Browser Run Worker"}}]}
```
