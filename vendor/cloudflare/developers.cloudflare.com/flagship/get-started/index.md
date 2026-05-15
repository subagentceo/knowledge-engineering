---
title: Get started
description: Create your first Flagship feature flag and evaluate it inside a Cloudflare Worker using the binding API.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/flagship/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Get started

In this guide, you will create a feature flag in Flagship and evaluate it inside a Cloudflare Worker.

## Create an app and a flag

In this example, you will create a boolean flag called `new-checkout` that controls whether users see a new checkout experience.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) and select your account.
2. Go to **Compute** \> **Flagship**.
3. Select **Create app**. Give the app a name that matches your project or service (for example, `checkout-service`).
4. Inside the app, select **Create flag**.
5. Create a boolean flag with the key `new-checkout`. Optionally, add [targeting rules](https://developers.cloudflare.com/flagship/targeting/) to control who sees the flag.
6. Turn on the flag and select **Save**.

## Add the Flagship binding to your Worker

Add the Flagship binding in your Wrangler configuration file so your Worker can evaluate flags through a binding.

* [  wrangler.jsonc ](#tab-panel-6398)
* [  wrangler.toml ](#tab-panel-6399)

JSONC

```

{

  "flagship": [

    {

      "binding": "FLAGS",

      "app_id": "<APP_ID>",

    },

  ],

}


```

TOML

```

[[flagship]]

binding = "FLAGS"

app_id = "<APP_ID>"


```

Replace `<APP_ID>` with the app ID shown in the [Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/flagship). The `binding` field sets the name you use to access Flagship in your Worker code. In this example, the binding is available as `env.FLAGS`.

After updating the Wrangler configuration, run `npx wrangler types` to generate TypeScript types for the binding.

## Evaluate the flag in your Worker

Use the `env.FLAGS` binding to evaluate the flag. The binding provides type-safe methods that return the flag value and fall back to the default you provide if evaluation fails.

* [  JavaScript ](#tab-panel-6400)
* [  TypeScript ](#tab-panel-6401)

JavaScript

```

export default {

  async fetch(request, env) {

    const url = new URL(request.url);

    const userId = url.searchParams.get("userId") ?? "anonymous";


    const showNewCheckout = await env.FLAGS.getBooleanValue(

      "new-checkout",

      false,

      { userId },

    );


    if (showNewCheckout) {

      return new Response("Welcome to the new checkout experience!");

    }


    return new Response("Standard checkout.");

  },

};


```

TypeScript

```

export default {

  async fetch(request: Request, env: Env): Promise<Response> {

    const url = new URL(request.url);

    const userId = url.searchParams.get("userId") ?? "anonymous";


    const showNewCheckout = await env.FLAGS.getBooleanValue(

      "new-checkout",

      false,

      { userId },

    );


    if (showNewCheckout) {

      return new Response("Welcome to the new checkout experience!");

    }


    return new Response("Standard checkout.");

  },

};


```

The third argument to `getBooleanValue` is the [evaluation context](https://developers.cloudflare.com/flagship/concepts/#evaluation-context). Flagship uses the context attributes to match targeting rules. In this example, the `userId` attribute is passed so that percentage rollouts and user-specific targeting work correctly.

## Deploy and test

Deploy your Worker:

Terminal window

```

npx wrangler deploy


```

Test flag evaluation by sending a request:

Terminal window

```

curl "https://<YOUR_WORKER>.<YOUR_SUBDOMAIN>.workers.dev/?userId=user-42"


```

Change the flag value or targeting rules in the dashboard and observe the updated response. Flag changes propagate globally within seconds.

## (Optional) Use the OpenFeature SDK

If you prefer the [OpenFeature ↗](https://openfeature.dev/) standard interface, or if you are running outside of a Cloudflare Worker, you can use the [@cloudflare/flagship ↗](https://www.npmjs.com/package/@cloudflare/flagship) SDK instead of the binding.

Install the SDK:

 npm  yarn  pnpm  bun 

```
npm i @cloudflare/flagship @openfeature/server-sdk
```

```
yarn add @cloudflare/flagship @openfeature/server-sdk
```

```
pnpm add @cloudflare/flagship @openfeature/server-sdk
```

```
bun add @cloudflare/flagship @openfeature/server-sdk
```

Evaluate flags using the OpenFeature client:

* [ With binding ](#tab-panel-6406)
* [ With app ID ](#tab-panel-6407)

Pass the Flagship binding directly to the provider. This avoids additional HTTP requests and is the recommended approach inside a Worker. Authentication is handled automatically through the binding.

* [  JavaScript ](#tab-panel-6404)
* [  TypeScript ](#tab-panel-6405)

JavaScript

```

import { OpenFeature } from "@openfeature/server-sdk";

import { FlagshipServerProvider } from "@cloudflare/flagship";


export default {

  async fetch(request, env) {

    await OpenFeature.setProviderAndWait(

      new FlagshipServerProvider({ binding: env.FLAGS }),

    );


    const client = OpenFeature.getClient();


    const showNewCheckout = await client.getBooleanValue(

      "new-checkout",

      false,

      { targetingKey: "user-42" },

    );


    return new Response(

      showNewCheckout ? "New checkout!" : "Standard checkout.",

    );

  },

};


```

TypeScript

```

import { OpenFeature } from "@openfeature/server-sdk";

import { FlagshipServerProvider } from "@cloudflare/flagship";


export default {

  async fetch(request: Request, env: Env): Promise<Response> {

    await OpenFeature.setProviderAndWait(

      new FlagshipServerProvider({ binding: env.FLAGS }),

    );


    const client = OpenFeature.getClient();


    const showNewCheckout = await client.getBooleanValue(

      "new-checkout",

      false,

      { targetingKey: "user-42" },

    );


    return new Response(

      showNewCheckout ? "New checkout!" : "Standard checkout.",

    );

  },

};


```

Use an app ID, account ID, and an API token when running outside of a Worker (for example, in Node.js). The provider makes HTTP requests to the Flagship evaluation endpoint. Generate an [API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) from your Cloudflare account with Flagship Evaluate permission.

* [  JavaScript ](#tab-panel-6402)
* [  TypeScript ](#tab-panel-6403)

JavaScript

```

import { OpenFeature } from "@openfeature/server-sdk";

import { FlagshipServerProvider } from "@cloudflare/flagship";


await OpenFeature.setProviderAndWait(

  new FlagshipServerProvider({

    appId: "<APP_ID>",

    accountId: "<ACCOUNT_ID>",

    authToken: "<API_TOKEN>",

  }),

);


const client = OpenFeature.getClient();


const showNewCheckout = await client.getBooleanValue("new-checkout", false, {

  targetingKey: "user-42",

});


```

TypeScript

```

import { OpenFeature } from "@openfeature/server-sdk";

import { FlagshipServerProvider } from "@cloudflare/flagship";


await OpenFeature.setProviderAndWait(

  new FlagshipServerProvider({

    appId: "<APP_ID>",

    accountId: "<ACCOUNT_ID>",

    authToken: "<API_TOKEN>",

  }),

);


const client = OpenFeature.getClient();


const showNewCheckout = await client.getBooleanValue("new-checkout", false, {

  targetingKey: "user-42",

});


```

Refer to the [SDK documentation](https://developers.cloudflare.com/flagship/sdk/) for detailed setup instructions.

## Next steps

* Learn about [targeting rules](https://developers.cloudflare.com/flagship/targeting/) to serve different values based on user attributes.
* Explore the full [binding API reference](https://developers.cloudflare.com/flagship/binding/) for all evaluation methods.
* Read about [percentage rollouts](https://developers.cloudflare.com/flagship/targeting/percentage-rollouts/) for gradual feature releases.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/flagship/","name":"Flagship"}},{"@type":"ListItem","position":3,"item":{"@id":"/flagship/get-started/","name":"Get started"}}]}
```
