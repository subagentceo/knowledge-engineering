---
title: Server provider
description: Set up the FlagshipServerProvider to evaluate feature flags from Workers, Node.js, or other server-side JavaScript runtimes using OpenFeature.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/flagship/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Server provider

The `FlagshipServerProvider` implements the OpenFeature server provider interface. The provider works in [Cloudflare Workers](https://developers.cloudflare.com/workers/), Node.js, and any server-side JavaScript runtime that supports the Fetch API.

Inside a Cloudflare Worker, you can pass the Flagship [binding](https://developers.cloudflare.com/flagship/binding/) directly to the provider. This avoids HTTP overhead and is the recommended approach. Outside of Workers, initialize the provider with an app ID and account ID — each evaluation call makes an HTTP request to the Flagship evaluation endpoint.

## Setup

* [ With binding ](#tab-panel-8392)
* [ With app ID ](#tab-panel-8393)

Pass the Flagship binding directly to the provider. This is the recommended approach inside a Worker.

* [  JavaScript ](#tab-panel-8390)
* [  TypeScript ](#tab-panel-8391)

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

      { targetingKey: "user-42", plan: "enterprise" },

    );


    if (showNewCheckout) {

      return new Response("New checkout enabled!");

    }


    return new Response("Standard checkout.");

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

      { targetingKey: "user-42", plan: "enterprise" },

    );


    if (showNewCheckout) {

      return new Response("New checkout enabled!");

    }


    return new Response("Standard checkout.");

  },

};


```

Use an app ID, account ID, and an API token when running outside of a Worker (for example, in Node.js). The provider makes HTTP requests to the Flagship evaluation endpoint. Generate an [API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) from your Cloudflare account with Flagship read permissions.

* [  JavaScript ](#tab-panel-8386)
* [  TypeScript ](#tab-panel-8387)

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

  plan: "enterprise",

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

  plan: "enterprise",

});


```

## Configuration options

| Option    | Type     | Required | Description                                                                                                                                                               |
| --------- | -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| binding   | Flagship | No       | The Flagship binding from env.FLAGS. Use this inside a Worker for best performance. Authentication is handled automatically through the binding.                          |
| appId     | string   | No       | The Flagship app ID from the Cloudflare dashboard. Required when not using a binding.                                                                                     |
| accountId | string   | No       | Your Cloudflare account ID. Required when not using a binding.                                                                                                            |
| authToken | string   | No       | A Cloudflare [API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) with Flagship read permissions. Required when not using a binding. |

Provide either `binding` or `appId`, `accountId`, and `authToken`.

## Evaluation context

OpenFeature uses an evaluation context to pass user attributes to the flag provider. The `targetingKey` field is the primary user identifier.

Pass additional attributes alongside `targetingKey` to match [targeting rules](https://developers.cloudflare.com/flagship/targeting/). For example, you can include `plan`, `country`, or any custom attribute your rules reference.

* [  JavaScript ](#tab-panel-8382)
* [  TypeScript ](#tab-panel-8383)

JavaScript

```

const value = await client.getBooleanValue("new-checkout", false, {

  targetingKey: "user-42",

  plan: "enterprise",

  country: "US",

});


```

TypeScript

```

const value = await client.getBooleanValue("new-checkout", false, {

  targetingKey: "user-42",

  plan: "enterprise",

  country: "US",

});


```

## Available hooks

The SDK ships with two hooks that you can attach to the OpenFeature client.

* **LoggingHook** — Logs structured information for every evaluation.
* **TelemetryHook** — Captures timing and event data for observability.

* [  JavaScript ](#tab-panel-8384)
* [  TypeScript ](#tab-panel-8385)

JavaScript

```

import { LoggingHook, TelemetryHook } from "@cloudflare/flagship";


OpenFeature.addHooks(new LoggingHook(), new TelemetryHook());


```

TypeScript

```

import { LoggingHook, TelemetryHook } from "@cloudflare/flagship";


OpenFeature.addHooks(new LoggingHook(), new TelemetryHook());


```

## Migrate from another provider

If you use another OpenFeature-compatible provider (for example, LaunchDarkly or Flagsmith), switch to Flagship by replacing the provider initialization. No changes are needed at evaluation call sites.

* [  JavaScript ](#tab-panel-8388)
* [  TypeScript ](#tab-panel-8389)

JavaScript

```

// Before

await OpenFeature.setProviderAndWait(

  new LaunchDarklyProvider({ sdkKey: "..." }),

);


// After

await OpenFeature.setProviderAndWait(

  new FlagshipServerProvider({

    appId: "<APP_ID>",

    accountId: "<ACCOUNT_ID>",

    authToken: "<API_TOKEN>",

  }),

);


```

TypeScript

```

// Before

await OpenFeature.setProviderAndWait(

  new LaunchDarklyProvider({ sdkKey: "..." }),

);


// After

await OpenFeature.setProviderAndWait(

  new FlagshipServerProvider({

    appId: "<APP_ID>",

    accountId: "<ACCOUNT_ID>",

    authToken: "<API_TOKEN>",

  }),

);


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/flagship/","name":"Flagship"}},{"@type":"ListItem","position":3,"item":{"@id":"/flagship/sdk/","name":"OpenFeature SDK"}},{"@type":"ListItem","position":4,"item":{"@id":"/flagship/sdk/server-provider/","name":"Server provider"}}]}
```
