---
title: Stagehand
description: Deploy a Stagehand server that uses Browser Run to provide browser automation capabilities to your agents.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/browser-run/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Stagehand

[Stagehand ↗](https://www.stagehand.dev/) is an open-source, AI-powered browser automation library. Stagehand lets you combine code with natural-language instructions powered by AI, eliminating the need to dictate exact steps or specify selectors. With Stagehand, your agents are more resilient to website changes and easier to maintain, helping you build more reliably and flexibly.

This guide shows you how to deploy a [Worker](https://developers.cloudflare.com/workers/) that uses Stagehand, Browser Run, and [Workers AI](https://developers.cloudflare.com/workers-ai/) to automate a web task.

Note

Browser Run currently supports `@browserbasehq/stagehand` `v2.5.x` only. Stagehand `v3` and later are not supported because they are not Playwright-based.

## Use Stagehand in a Worker with Workers AI

In this example, you will use Stagehand to search for a movie on this [example movie directory ↗](https://demo.playwright.dev/movies), extract its details (title, year, rating, duration, and genre), and return the information along with a screenshot of the webpage.

See a video of this example

![Stagehand video](https://developers.cloudflare.com/images/browser-run/speedystagehand.gif)

Output:

![Stagehand example result](https://developers.cloudflare.com/_astro/stagehand-example.CsX-7-FC_ZvBkPq.webp)

If instead you want to skip the steps and get started right away, select **Deploy to Cloudflare** below.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/playwright/tree/main/packages/playwright-cloudflare/examples/stagehand)

After you deploy, you can interact with the Worker using this URL pattern:

```

https://<your-worker>.workers.dev


```

### 1\. Set up your project

Install the necessary dependencies:

Terminal window

```

npm ci


```

### 2\. Configure your Worker

Update your Wrangler configuration file to include the bindings for Browser Run and [Workers AI](https://developers.cloudflare.com/workers-ai/):

Note

Your Worker configuration must include the `nodejs_compat` compatibility flag and a `compatibility_date` of 2025-09-15 or later.

* [  wrangler.jsonc ](#tab-panel-6941)
* [  wrangler.toml ](#tab-panel-6942)

JSONC

```

{

  "name": "stagehand-example",

  "main": "src/index.ts",

  "compatibility_flags": ["nodejs_compat"],

  // Set this to today's date

  "compatibility_date": "2026-06-18",

  "observability": {

    "enabled": true

  },

  "browser": {

    "binding": "BROWSER"

  },

  "ai": {

    "binding": "AI"

  }

}


```

TOML

```

name = "stagehand-example"

main = "src/index.ts"

compatibility_flags = [ "nodejs_compat" ]

# Set this to today's date

compatibility_date = "2026-06-18"


[observability]

enabled = true


[browser]

binding = "BROWSER"


[ai]

binding = "AI"


```

If you are using the [Cloudflare Vite plugin ↗](https://developers.cloudflare.com/workers/vite-plugin/), you need to include the following [alias ↗](https://vite.dev/config/shared-options.html#resolve-alias) in `vite.config.ts`:

TypeScript

```

export default defineConfig({

  // ...

  resolve: {

    alias: {

      playwright: "@cloudflare/playwright",

    },

  },

});


```

If you are not using the Cloudflare Vite plugin, you need to include the following [module alias ↗](https://developers.cloudflare.com/workers/wrangler/configuration/#module-aliasing) to the wrangler configuration:

JSONC

```

{

  // ...

  "alias": {

    "playwright": "@cloudflare/playwright",

  },

}


```

### 3\. Write the Worker code

Copy [workersAIClient.ts ↗](https://github.com/cloudflare/playwright/blob/main/packages/playwright-cloudflare/examples/stagehand/src/worker/workersAIClient.ts) to your project.

Then, in your Worker code, import the `workersAIClient.ts` file and use it to configure a new `Stagehand` instance:

src/index.ts

```

import { Stagehand } from "@browserbasehq/stagehand";

import { z } from "zod";

import { endpointURLString } from "@cloudflare/playwright";

import { WorkersAIClient } from "./workersAIClient";


export default {

  async fetch(request: Request, env: Env) {

    if (new URL(request.url).pathname !== "/")

      return new Response("Not found", { status: 404 });


    const stagehand = new Stagehand({

      env: "LOCAL",

      localBrowserLaunchOptions: { cdpUrl: endpointURLString(env.BROWSER) },

      llmClient: new WorkersAIClient(env.AI),

      verbose: 1,

    });


    await stagehand.init();

    const page = stagehand.page;


    await page.goto("https://demo.playwright.dev/movies");


    // if search is a multi-step action, stagehand will return an array of actions it needs to act on

    const actions = await page.observe('Search for "Furiosa"');

    for (const action of actions) await page.act(action);


    await page.act("Click the search result");


    // normal playwright functions work as expected

    await page.waitForSelector(".info-wrapper .cast");


    let movieInfo = await page.extract({

      instruction: "Extract movie information",

      schema: z.object({

        title: z.string(),

        year: z.number(),

        rating: z.number(),

        genres: z.array(z.string()),

        duration: z.number().describe("Duration in minutes"),

      }),

    });


    await stagehand.close();


    return Response.json(movieInfo);

  },

};


```

Note

The snippet above requires [Zod v3 ↗](https://v3.zod.dev/) and is currently not compatible with Zod v4.

Ensure your `package.json` has the following dependencies:

```

{

  // ...

  "dependencies": {

    "@browserbasehq/stagehand": "2.5.x",

    "@cloudflare/playwright": "^1.0.0",

    "zod": "^3.25.76",

    "zod-to-json-schema": "^3.24.6"

    // ...

  }

}


```

### 4\. Build the project

Terminal window

```

npm run build


```

### 5\. Deploy to Cloudflare Workers

After you deploy, you can interact with the Worker using this URL pattern:

```

https://<your-worker>.workers.dev


```

Terminal window

```

npm run deploy


```

## Use Cloudflare AI Gateway with Workers AI

[AI Gateway](https://developers.cloudflare.com/ai-gateway/) is a service that adds observability to your AI applications. By routing your requests through AI Gateway, you can monitor and debug your AI applications.

To use AI Gateway with a third-party model, first create a gateway in the **AI Gateway** page of the Cloudflare dashboard.

[ Go to **AI Gateway** ](https://dash.cloudflare.com/?to=/:account/ai/ai-gateway) 

In this example, we've named the gateway `stagehand-example-gateway`.

TypeScript

```

const stagehand = new Stagehand({

  env: "LOCAL",

  localBrowserLaunchOptions: { cdpUrl },

  llmClient: new WorkersAIClient(env.AI, {

    gateway: {

      id: "stagehand-example-gateway",

    },

  }),

});


```

## Use a third-party model

If you want to use a model outside of Workers AI, you can configure Stagehand to use models from supported [third-party providers ↗](https://docs.stagehand.dev/configuration/models#supported-providers), including OpenAI and Anthropic, by providing your own credentials.

In this example, you will configure Stagehand to use [OpenAI ↗](https://openai.com/). You will need an OpenAI API key. Cloudflare recommends storing your API key as a [secret](https://developers.cloudflare.com/workers/configuration/secrets/).

Terminal window

```

npx wrangler secret put OPENAI_API_KEY


```

Then, configure Stagehand with your provider, model, and API key.

TypeScript

```

const stagehand = new Stagehand({

  env: "LOCAL",

  localBrowserLaunchOptions: { cdpUrl: endpointURLString(env.BROWSER) },

  modelName: "openai/gpt-4.1",

  modelClientOptions: {

    apiKey: env.OPENAI_API_KEY,

  },

});


```

## Use Cloudflare AI Gateway with a third-party model

[AI Gateway](https://developers.cloudflare.com/ai-gateway/) is a service that adds observability to your AI applications. By routing your requests through AI Gateway, you can monitor and debug your AI applications.

To use AI Gateway with a third-party model, first create a gateway in the **AI Gateway** page of the Cloudflare dashboard.

[ Go to **AI Gateway** ](https://dash.cloudflare.com/?to=/:account/ai/ai-gateway) 

In this example, we are using [OpenAI with AI Gateway](https://developers.cloudflare.com/ai-gateway/usage/providers/openai/). Make sure to add the `baseURL` as shown below, with your own Account ID and Gateway ID.

You must specify the `apiKey` in the `modelClientOptions`:

TypeScript

```

const stagehand = new Stagehand({

  env: "LOCAL",

  localBrowserLaunchOptions: { cdpUrl: endpointURLString(env.BROWSER) },

  modelName: "openai/gpt-4.1",

  modelClientOptions: {

    apiKey: env.OPENAI_API_KEY,

    baseURL: `https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/openai`,

  },

});


```

If you are using an authenticated AI Gateway, follow the instructions in [AI Gateway authentication](https://developers.cloudflare.com/ai-gateway/configuration/authentication/) and include `cf-aig-authorization` as a header.

## Stagehand API

For the full list of Stagehand methods and capabilities, refer to the official [Stagehand API documentation ↗](https://docs.stagehand.dev/first-steps/introduction).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/browser-run/stagehand/#page","headline":"Stagehand · Cloudflare Browser Run docs","description":"Deploy a Stagehand server that uses Browser Run to provide browser automation capabilities to your agents.","url":"https://developers.cloudflare.com/browser-run/stagehand/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/browser-run/","name":"Browser Run"}},{"@type":"ListItem","position":3,"item":{"@id":"/browser-run/stagehand/","name":"Stagehand"}}]}
```
