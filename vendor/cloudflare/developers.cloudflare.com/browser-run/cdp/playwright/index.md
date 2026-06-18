---
title: Using with Playwright (CDP)
description: Connect Playwright to Browser Run sessions from any Node.js environment to automate browser tasks using the Chrome DevTools Protocol.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/browser-run/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Using with Playwright (CDP)

You can use [Playwright ↗](https://playwright.dev/) to connect to Browser Run sessions from any Node.js environment and automate browser tasks programmatically via CDP. This is useful for scripts running on your local machine, CI/CD pipelines, or external servers.

Before you begin, [create a custom API Token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) with `Browser Rendering - Edit` permission.

## Prerequisites

* Node.js installed on your machine
* A Cloudflare account with Browser Run enabled
* A Browser Run API token with `Browser Rendering - Edit` permissions

## Install Playwright

Install the `playwright-core` package (the version without bundled browsers):

 npm  yarn  pnpm  bun 

```
npm i playwright-core
```

```
yarn add playwright-core
```

```
pnpm add playwright-core
```

```
bun add playwright-core
```

## Connect to Browser Run

The following script demonstrates how to connect to a Browser Run session, navigate to a page, extract the title, and take a screenshot.

Create a file named `script.js`:

JavaScript

```

const { chromium } = require("playwright-core");


const ACCOUNT_ID = process.env.CF_ACCOUNT_ID || "<ACCOUNT_ID>";

const API_TOKEN = process.env.CF_API_TOKEN || "<API_TOKEN>";


const browserWSEndpoint = `wss://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/browser-rendering/devtools/browser?keep_alive=600000`;


async function main() {

  const browser = await chromium.connectOverCDP(browserWSEndpoint, {

    headers: {

      Authorization: `Bearer ${API_TOKEN}`,

    },

  });


  const context = browser.contexts()[0];

  const page = context.pages()[0] || (await context.newPage());

  await page.goto("https://developers.cloudflare.com");


  const title = await page.title();

  console.log(`Page title: ${title}`);


  await page.screenshot({ path: "screenshot.png" });


  await browser.close();

}


main().catch(console.error);


```

Replace `ACCOUNT_ID` with your Cloudflare account ID and `API_TOKEN` with your Browser Run API token, or set them as environment variables:

Terminal window

```

export CF_ACCOUNT_ID="<ACCOUNT_ID>"

export CF_API_TOKEN="<API_TOKEN>"


```

## Run the script

Terminal window

```

node script.js


```

You should see the page title printed to the console and a screenshot saved as `screenshot.png`.

## How it works

The script connects directly to Browser Run via WebSocket using the CDP protocol:

1. **WebSocket endpoint** \- The `browserWSEndpoint` URL acquires a new browser session and connects to it via WebSocket
2. **Authentication** \- The `Authorization` header with your API token authenticates the request
3. **Keep-alive** \- The `keep_alive` parameter (in milliseconds) specifies how long the session stays active
4. **Playwright API** \- Once connected, you use the standard Playwright API to control the browser

## Troubleshooting

If you have questions or encounter an error, see the [Browser Run FAQ and troubleshooting guide](https://developers.cloudflare.com/browser-run/faq/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/browser-run/cdp/playwright/#page","headline":"Using with Playwright (CDP) · Cloudflare Browser Run docs","description":"Connect Playwright to Browser Run sessions from any Node.js environment to automate browser tasks using the Chrome DevTools Protocol.","url":"https://developers.cloudflare.com/browser-run/cdp/playwright/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-05-28","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/browser-run/","name":"Browser Run"}},{"@type":"ListItem","position":3,"item":{"@id":"/browser-run/cdp/","name":"Chrome DevTools Protocol (CDP)"}},{"@type":"ListItem","position":4,"item":{"@id":"/browser-run/cdp/playwright/","name":"Using with Playwright (CDP)"}}]}
```
