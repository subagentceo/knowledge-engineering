---
title: Binding API
description: Evaluate Flagship feature flags directly in Cloudflare Workers using the native binding with type-safe methods and automatic fallback.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/flagship/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Binding API

Workers access Flagship through a binding that you add to your Wrangler configuration file. The `binding` field sets the variable name you use in your Worker code.

* [  wrangler.jsonc ](#tab-panel-6244)
* [  wrangler.toml ](#tab-panel-6245)

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

Replace `<APP_ID>` with the app ID from your Flagship app. If you have not created an app yet, refer to the [Get started guide](https://developers.cloudflare.com/flagship/get-started/#create-an-app-and-a-flag). With this configuration, the binding is available as `env.FLAGS`. Refer to [Configuration](https://developers.cloudflare.com/flagship/configuration/) for additional options such as binding to multiple apps.

The binding provides type-safe methods for evaluating feature flags. If an evaluation fails or a flag is not found, the method returns the default value you provide.

* [  JavaScript ](#tab-panel-6246)
* [  TypeScript ](#tab-panel-6247)

JavaScript

```

export default {

  async fetch(request, env) {

    const enabled = await env.FLAGS.getBooleanValue("new-feature", false, {

      userId: "user-42",

    });

    return new Response(enabled ? "Feature on" : "Feature off");

  },

};


```

TypeScript

```

export default {

  async fetch(request: Request, env: Env): Promise<Response> {

    const enabled = await env.FLAGS.getBooleanValue("new-feature", false, {

      userId: "user-42",

    });

    return new Response(enabled ? "Feature on" : "Feature off");

  },

};


```

The binding has the type `Flagship` from the `@cloudflare/workers-types` package.

* [ Types ](https://developers.cloudflare.com/flagship/binding/types/)
* [ Methods ](https://developers.cloudflare.com/flagship/binding/methods/)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/flagship/","name":"Flagship"}},{"@type":"ListItem","position":3,"item":{"@id":"/flagship/binding/","name":"Binding API"}}]}
```
