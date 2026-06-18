---
title: Build a web crawler with Queues and Browser Run
description: Example of how to use Queues and Browser Run to power a web crawler.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/queues/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Build a web crawler with Queues and Browser Run

**Last reviewed:**  almost 2 years ago 

Example of how to use Queues and Browser Run to power a web crawler.

This tutorial explains how to build and deploy a web crawler with Queues, [Browser Run](https://developers.cloudflare.com/browser-run/), and [Puppeteer](https://developers.cloudflare.com/browser-run/puppeteer/).

Puppeteer is a high-level library used to automate interactions with Chrome/Chromium browsers. On each submitted page, the crawler will find the number of links to `cloudflare.com` and take a screenshot of the site, saving results to [Workers KV](https://developers.cloudflare.com/kv/).

You can use Puppeteer to request all images on a page, save the colors used on a site, and more.

## Prerequisites

1. Sign up for a [Cloudflare account ↗](https://dash.cloudflare.com/sign-up/workers-and-pages).
2. Install [Node.js ↗](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

Node.js version manager

Use a Node version manager like [Volta ↗](https://volta.sh/) or [nvm ↗](https://github.com/nvm-sh/nvm) to avoid permission issues and change Node.js versions. [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/), discussed later in this guide, requires a Node version of `16.17.0` or later.

## 1\. Create new Workers application

To get started, create a Worker application using the [create-cloudflare CLI ↗](https://github.com/cloudflare/workers-sdk/tree/main/packages/create-cloudflare). Open a terminal window and run the following command:

 npm  yarn  pnpm 

```
npm create cloudflare@latest -- queues-web-crawler
```

```
yarn create cloudflare queues-web-crawler
```

```
pnpm create cloudflare@latest queues-web-crawler
```

For setup, select the following options:

* For _What would you like to start with?_, choose `Hello World example`.
* For _Which template would you like to use?_, choose `Worker only`.
* For _Which language do you want to use?_, choose `TypeScript`.
* For _Do you want to use git for version control?_, choose `Yes`.
* For _Do you want to deploy your application?_, choose `No` (we will be making some changes before deploying).

Then, move into your newly created directory:

Terminal window

```

cd queues-web-crawler


```

## 2\. Create KV namespace

We need to create a KV store. This can be done through the Cloudflare dashboard or the Wrangler CLI. For this tutorial, we will use the Wrangler CLI.

 npm  yarn  pnpm 

```
npx wrangler kv namespace create crawler_links
```

```
yarn wrangler kv namespace create crawler_links
```

```
pnpm wrangler kv namespace create crawler_links
```

 npm  yarn  pnpm 

```
npx wrangler kv namespace create crawler_screenshots
```

```
yarn wrangler kv namespace create crawler_screenshots
```

```
pnpm wrangler kv namespace create crawler_screenshots
```

```

🌀 Creating namespace with title "web-crawler-crawler-links"

✨ Success!

Add the following to your configuration file in your kv_namespaces array:

[[kv_namespaces]]

binding = "crawler_links"

id = "<GENERATED_NAMESPACE_ID>"


🌀 Creating namespace with title "web-crawler-crawler-screenshots"

✨ Success!

Add the following to your configuration file in your kv_namespaces array:

[[kv_namespaces]]

binding = "crawler_screenshots"

id = "<GENERATED_NAMESPACE_ID>"


```

### Add KV bindings to the [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/)

Then, in your Wrangler file, add the following with the values generated in the terminal:

* [  wrangler.jsonc ](#tab-panel-9699)
* [  wrangler.toml ](#tab-panel-9700)

JSONC

```

{

  "kv_namespaces": [

    {

      "binding": "CRAWLER_SCREENSHOTS_KV",

      "id": "<GENERATED_NAMESPACE_ID>",

    },

    {

      "binding": "CRAWLER_LINKS_KV",

      "id": "<GENERATED_NAMESPACE_ID>",

    },

  ],

}


```

TOML

```

[[kv_namespaces]]

binding = "CRAWLER_SCREENSHOTS_KV"

id = "<GENERATED_NAMESPACE_ID>"


[[kv_namespaces]]

binding = "CRAWLER_LINKS_KV"

id = "<GENERATED_NAMESPACE_ID>"


```

## 3\. Set up Browser Run

Now, you need to set up your Worker for Browser Run.

In your current directory, install Cloudflare's [fork of Puppeteer](https://developers.cloudflare.com/browser-run/puppeteer/) and also [robots-parser ↗](https://www.npmjs.com/package/robots-parser):

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

 npm  yarn  pnpm  bun 

```
npm i robots-parser
```

```
yarn add robots-parser
```

```
pnpm add robots-parser
```

```
bun add robots-parser
```

Then, add a Browser Run binding. Adding a Browser Run binding gives the Worker access to a headless Chromium instance you will control with Puppeteer.

* [  wrangler.jsonc ](#tab-panel-9697)
* [  wrangler.toml ](#tab-panel-9698)

JSONC

```

{

  "browser": {

    "binding": "CRAWLER_BROWSER",

  },

}


```

TOML

```

[browser]

binding = "CRAWLER_BROWSER"


```

## 4\. Set up a Queue

Now, we need to set up the Queue.

 npm  yarn  pnpm 

```
npx wrangler queues create queues-web-crawler
```

```
yarn wrangler queues create queues-web-crawler
```

```
pnpm wrangler queues create queues-web-crawler
```

Output

```

Creating queue queues-web-crawler.

Created queue queues-web-crawler.


```

### Add Queue bindings to Wrangler configuration

Then, in your Wrangler file, add the following:

* [  wrangler.jsonc ](#tab-panel-9701)
* [  wrangler.toml ](#tab-panel-9702)

JSONC

```

{

  "queues": {

    "consumers": [

      {

        "queue": "queues-web-crawler",

        "max_batch_timeout": 60,

      },

    ],

    "producers": [

      {

        "queue": "queues-web-crawler",

        "binding": "CRAWLER_QUEUE",

      },

    ],

  },

}


```

TOML

```

[[queues.consumers]]

queue = "queues-web-crawler"

max_batch_timeout = 60


[[queues.producers]]

queue = "queues-web-crawler"

binding = "CRAWLER_QUEUE"


```

Adding the `max_batch_timeout` of 60 seconds to the consumer queue is important because it allows the Queue to collect messages into a batch over a longer period. This helps manage Browser Run [rate limits](https://developers.cloudflare.com/browser-run/limits/) and can improve efficiency by processing multiple URLs in a single batch with one browser instance.

Your final Wrangler file should look similar to the one below.

* [  wrangler.jsonc ](#tab-panel-9703)
* [  wrangler.toml ](#tab-panel-9704)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "name": "web-crawler",

  "main": "src/index.ts",

  // Set this to today's date

  "compatibility_date": "2026-06-18",

  "compatibility_flags": ["nodejs_compat"],

  "kv_namespaces": [

    {

      "binding": "CRAWLER_SCREENSHOTS_KV",

      "id": "<GENERATED_NAMESPACE_ID>",

    },

    {

      "binding": "CRAWLER_LINKS_KV",

      "id": "<GENERATED_NAMESPACE_ID>",

    },

  ],

  "browser": {

    "binding": "CRAWLER_BROWSER",

  },

  "queues": {

    "consumers": [

      {

        "queue": "queues-web-crawler",

        "max_batch_timeout": 60,

      },

    ],

    "producers": [

      {

        "queue": "queues-web-crawler",

        "binding": "CRAWLER_QUEUE",

      },

    ],

  },

}


```

TOML

```

"$schema" = "./node_modules/wrangler/config-schema.json"

name = "web-crawler"

main = "src/index.ts"

# Set this to today's date

compatibility_date = "2026-06-18"

compatibility_flags = [ "nodejs_compat" ]


[[kv_namespaces]]

binding = "CRAWLER_SCREENSHOTS_KV"

id = "<GENERATED_NAMESPACE_ID>"


[[kv_namespaces]]

binding = "CRAWLER_LINKS_KV"

id = "<GENERATED_NAMESPACE_ID>"


[browser]

binding = "CRAWLER_BROWSER"


[[queues.consumers]]

queue = "queues-web-crawler"

max_batch_timeout = 60


[[queues.producers]]

queue = "queues-web-crawler"

binding = "CRAWLER_QUEUE"


```

## 5\. Add bindings to environment

Add the bindings to the environment interface in `src/index.ts`, so TypeScript correctly types the bindings. The queue is typed as `Queue<Message>`, where `Message` is defined in the following step.

TypeScript

```

import type { BrowserWorker } from "@cloudflare/puppeteer";


export interface Env {

  CRAWLER_QUEUE: Queue<Message>;

  CRAWLER_SCREENSHOTS_KV: KVNamespace;

  CRAWLER_LINKS_KV: KVNamespace;

  CRAWLER_BROWSER: BrowserWorker;

}


```

## 6\. Submit links to crawl

Add a `fetch()` handler to the Worker to submit links to crawl.

TypeScript

```

type Message = {

  url: string;

};


export interface Env {

  CRAWLER_QUEUE: Queue<Message>;

  // ... etc.

}


export default {

  async fetch(req, env, ctx): Promise<Response> {

    await env.CRAWLER_QUEUE.send({ url: await req.text() });

    return new Response("Success!");

  },

} satisfies ExportedHandler<Env>;


```

This will accept requests to any subpath and forwards the request's body to be crawled. It expects that the request body only contains a URL. In production, you should check that the request was a `POST` request and contains a well-formed URL in its body. This has been omitted for simplicity.

## 7\. Crawl with Puppeteer

Add a `queue()` handler to the Worker to process the links you send.

TypeScript

```

import puppeteer from "@cloudflare/puppeteer";

import robotsParser from "robots-parser";


async queue(batch, env, ctx): Promise<void> {

  let browser: puppeteer.Browser | null = null;

  try {

    browser = await puppeteer.launch(env.CRAWLER_BROWSER);

  } catch {

    batch.retryAll();

  return;

  }


  for (const message of batch.messages) {

    const { url } = message.body;


    let isAllowed = true;

    try {

      const robotsTextPath = new URL(url).origin + "/robots.txt";

      const response = await fetch(robotsTextPath);


      const robots = robotsParser(robotsTextPath, await response.text());

      isAllowed = robots.isAllowed(url) ?? true; // respect robots.txt!

    } catch {}


    if (!isAllowed) {

      message.ack();

      continue;

    }


  // TODO: crawl!

    message.ack();

  }


  await browser.close();

},


```

This is a skeleton for the crawler. It launches the Puppeteer browser and iterates through the Queue's received messages. It fetches the site's `robots.txt` and uses `robots-parser` to check that this site allows crawling. If crawling is not allowed, the message is `ack`'ed, removing it from the Queue. If crawling is allowed, you can continue to crawl the site.

The `puppeteer.launch()` is wrapped in a `try...catch` to allow the whole batch to be retried if the browser launch fails. The browser launch may fail due to going over the limit for number of browsers per account.

TypeScript

```

type Result = {

  numCloudflareLinks: number;

  screenshot: ArrayBuffer;

};


const crawlPage = async (url: string): Promise<Result> => {

  const page = await (browser as puppeteer.Browser).newPage();


  await page.goto(url, {

    waitUntil: "load",

  });


  const numCloudflareLinks = await page.$$eval("a", (links) => {

    links = links.filter((link) => {

      try {

        return new URL(link.href).hostname.includes("cloudflare.com");

      } catch {

        return false;

      }

    });

    return links.length;

  });


  await page.setViewport({

    width: 1920,

    height: 1080,

    deviceScaleFactor: 1,

  });


  return {

    numCloudflareLinks,

    screenshot: ((await page.screenshot({ fullPage: true })) as Buffer).buffer,

  };

};


```

This helper function opens a new page in Puppeteer and navigates to the provided URL. `numCloudflareLinks` uses Puppeteer's `$$eval` (equivalent to `document.querySelectorAll`) to find the number of links to a `cloudflare.com` page. Checking if the link's `href` is to a `cloudflare.com` page is wrapped in a `try...catch` to handle cases where `href`s may not be URLs.

Then, the function sets the browser viewport size and takes a screenshot of the full page. The screenshot is returned as a `Buffer` so it can be converted to an `ArrayBuffer` and written to KV.

To enable recursively crawling links, add a snippet after checking the number of Cloudflare links to send messages recursively from the queue consumer to the queue itself. Recursing too deep, as is possible with crawling, will cause a Durable Object `Subrequest depth limit exceeded.` error. If one occurs, it is caught, but the links are not retried.

TypeScript

```

// const numCloudflareLinks = await page.$$eval("a", (links) => { ...


await page.$$eval("a", async (links) => {

  const urls: MessageSendRequest<Message>[] = links.map((link) => {

    return {

      body: {

        url: link.href,

      },

    };

  });

  try {

    await env.CRAWLER_QUEUE.sendBatch(urls);

  } catch {} // do nothing, likely hit subrequest limit

});


// await page.setViewport({ ...


```

Then, in the `queue` handler, call `crawlPage` on the URL.

TypeScript

```

// in the `queue` handler:

// ...

if (!isAllowed) {

  message.ack();

  continue;

}


try {

  const { numCloudflareLinks, screenshot } = await crawlPage(url);

  const timestamp = new Date().getTime();

  const resultKey = `${encodeURIComponent(url)}-${timestamp}`;

  await env.CRAWLER_LINKS_KV.put(resultKey, numCloudflareLinks.toString(), {

    metadata: { date: timestamp },

  });

  await env.CRAWLER_SCREENSHOTS_KV.put(resultKey, screenshot, {

    metadata: { date: timestamp },

  });

  message.ack();

} catch {

  message.retry();

}


// ...


```

This snippet saves the results from `crawlPage` into the appropriate KV namespaces. If an unexpected error occurred, the URL will be retried and resent to the queue again.

Saving the timestamp of the crawl in KV helps you avoid crawling too frequently.

Add a snippet before checking `robots.txt` to check KV for a crawl within the last hour. This lists all KV keys beginning with the same URL (crawls of the same page), and check if any crawls have been done within the last hour. If any crawls have been done within the last hour, the message is `ack`'ed and not retried.

TypeScript

```

type KeyMetadata = {

  date: number;

};


// in the `queue` handler:

// ...

for (const message of batch.messages) {

  const sameUrlCrawls = await env.CRAWLER_LINKS_KV.list({

    prefix: `${encodeURIComponent(url)}`,

  });


  let shouldSkip = false;

  for (const key of sameUrlCrawls.keys) {

    if (timestamp - (key.metadata as KeyMetadata)?.date < 60 * 60 * 1000) {

      // if crawled in last hour, skip

      message.ack();

      shouldSkip = true;

      break;

    }

  }

  if (shouldSkip) {

    continue;

  }


  let isAllowed = true;

  // ...


```

The final script is included below.

TypeScript

```

import puppeteer, { BrowserWorker } from "@cloudflare/puppeteer";

import robotsParser from "robots-parser";


type Message = {

  url: string;

};


export interface Env {

  CRAWLER_QUEUE: Queue<Message>;

  CRAWLER_SCREENSHOTS_KV: KVNamespace;

  CRAWLER_LINKS_KV: KVNamespace;

  CRAWLER_BROWSER: BrowserWorker;

}


type Result = {

  numCloudflareLinks: number;

  screenshot: ArrayBuffer;

};


type KeyMetadata = {

  date: number;

};


export default {

  async fetch(req, env, ctx): Promise<Response> {

    // util endpoint for testing purposes

    await env.CRAWLER_QUEUE.send({ url: await req.text() });

    return new Response("Success!");

  },

  async queue(batch, env, ctx): Promise<void> {

    const crawlPage = async (url: string): Promise<Result> => {

      const page = await (browser as puppeteer.Browser).newPage();


      await page.goto(url, {

        waitUntil: "load",

      });


      const numCloudflareLinks = await page.$$eval("a", (links) => {

        links = links.filter((link) => {

          try {

            return new URL(link.href).hostname.includes("cloudflare.com");

          } catch {

            return false;

          }

        });

        return links.length;

      });


      // to crawl recursively - uncomment this!

      /*await page.$$eval("a", async (links) => {

        const urls: MessageSendRequest<Message>[] = links.map((link) => {

          return {

            body: {

              url: link.href,

            },

          };

        });

        try {

          await env.CRAWLER_QUEUE.sendBatch(urls);

        } catch {} // do nothing, might've hit subrequest limit

      });*/


      await page.setViewport({

        width: 1920,

        height: 1080,

        deviceScaleFactor: 1,

      });


      return {

        numCloudflareLinks,

        screenshot: ((await page.screenshot({ fullPage: true })) as Buffer)

          .buffer,

      };

    };


    let browser: puppeteer.Browser | null = null;

    try {

      browser = await puppeteer.launch(env.CRAWLER_BROWSER);

    } catch {

      batch.retryAll();

      return;

    }


    for (const message of batch.messages) {

      const { url } = message.body;

      const timestamp = new Date().getTime();

      const resultKey = `${encodeURIComponent(url)}-${timestamp}`;


      const sameUrlCrawls = await env.CRAWLER_LINKS_KV.list({

        prefix: `${encodeURIComponent(url)}`,

      });


      let shouldSkip = false;

      for (const key of sameUrlCrawls.keys) {

        if (timestamp - (key.metadata as KeyMetadata)?.date < 60 * 60 * 1000) {

          // if crawled in last hour, skip

          message.ack();

          shouldSkip = true;

          break;

        }

      }

      if (shouldSkip) {

        continue;

      }


      let isAllowed = true;

      try {

        const robotsTextPath = new URL(url).origin + "/robots.txt";

        const response = await fetch(robotsTextPath);


        const robots = robotsParser(robotsTextPath, await response.text());

        isAllowed = robots.isAllowed(url) ?? true; // respect robots.txt!

      } catch {}


      if (!isAllowed) {

        message.ack();

        continue;

      }


      try {

        const { numCloudflareLinks, screenshot } = await crawlPage(url);

        await env.CRAWLER_LINKS_KV.put(

          resultKey,

          numCloudflareLinks.toString(),

          { metadata: { date: timestamp } },

        );

        await env.CRAWLER_SCREENSHOTS_KV.put(resultKey, screenshot, {

          metadata: { date: timestamp },

        });

        message.ack();

      } catch {

        message.retry();

      }

    }


    await browser.close();

  },

} satisfies ExportedHandler<Env, Message>;


```

## 8\. Deploy your Worker

To deploy your Worker, run the following command:

 npm  yarn  pnpm 

```
npx wrangler deploy
```

```
yarn wrangler deploy
```

```
pnpm wrangler deploy
```

You have successfully created a Worker which can submit URLs to a queue for crawling and save results to Workers KV.

To test your Worker, you could use the following cURL request to take a screenshot of this documentation page.

Test with a cURL request

```

curl <YOUR_WORKER_URL> \

  -H "Content-Type: application/json" \

  -d 'https://developers.cloudflare.com/queues/tutorials/web-crawler-with-browser-run/'


```

Refer to the [GitHub repository for the complete tutorial ↗](https://github.com/cloudflare/queues-web-crawler), including a front end deployed with Pages to submit URLs and view crawler results.

## Related resources

* [How Queues works](https://developers.cloudflare.com/queues/reference/how-queues-works/)
* [Queues Batching and Retries](https://developers.cloudflare.com/queues/configuration/batching-retries/)
* [Browser Run](https://developers.cloudflare.com/browser-run/)
* [Puppeteer Examples ↗](https://github.com/puppeteer/puppeteer/tree/main/examples)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/queues/tutorials/web-crawler-with-browser-run/#page","headline":"Cloudflare Queues - Queues & Browser Run · Cloudflare Queues docs","description":"Example of how to use Queues and Browser Run to power a web crawler.","url":"https://developers.cloudflare.com/queues/tutorials/web-crawler-with-browser-run/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-15","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["TypeScript"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/queues/","name":"Queues"}},{"@type":"ListItem","position":3,"item":{"@id":"/queues/tutorials/","name":"Tutorials"}},{"@type":"ListItem","position":4,"item":{"@id":"/queues/tutorials/web-crawler-with-browser-run/","name":"Build a web crawler with Queues and Browser Run"}}]}
```
