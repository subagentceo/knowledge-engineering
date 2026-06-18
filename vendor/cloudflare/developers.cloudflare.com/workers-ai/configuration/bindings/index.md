---
title: Workers Bindings
description: Create an AI binding to connect your Cloudflare Worker to Workers AI.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers-ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Workers Bindings

## Workers

[Workers](https://developers.cloudflare.com/workers/) provides a serverless execution environment that allows you to create new applications or augment existing ones.

To use Workers AI with Workers, you must create a Workers AI [binding](https://developers.cloudflare.com/workers/runtime-apis/bindings/). Bindings allow your Workers to interact with resources, like Workers AI, on the Cloudflare Developer Platform. You create bindings on the Cloudflare dashboard or by updating your [Wrangler file](https://developers.cloudflare.com/workers/wrangler/configuration/).

To bind Workers AI to your Worker, add the following to the end of your Wrangler file:

* [  wrangler.jsonc ](#tab-panel-11293)
* [  wrangler.toml ](#tab-panel-11294)

JSONC

```

{

  "ai": {

    "binding": "AI" // i.e. available in your Worker on env.AI

  }

}


```

TOML

```

[ai]

binding = "AI"


```

## Pages Functions

[Pages Functions](https://developers.cloudflare.com/pages/functions/) allow you to build full-stack applications with Cloudflare Pages by executing code on the Cloudflare network. Functions are Workers under the hood.

To configure a Workers AI binding in your Pages Function, you must use the Cloudflare dashboard. Refer to [Workers AI bindings](https://developers.cloudflare.com/pages/functions/bindings/#workers-ai) for instructions.

## Methods

### async env.AI.run()

`async env.AI.run()` runs a model. Takes a model as the first parameter, and an object as the second parameter.

JavaScript

```

const answer = await env.AI.run('@cf/meta/llama-3.1-8b-instruct', {

    prompt: "What is the origin of the phrase 'Hello, World'"

});


```

**Parameters**

* `model` ` string ` required  
   * The model to run.  
**Supported options**  
   * `stream` ` boolean ` optional  
         * Returns a stream of results as they are available.

JavaScript

```

const answer = await env.AI.run('@cf/meta/llama-3.1-8b-instruct', {

    prompt: "What is the origin of the phrase 'Hello, World'",

    stream: true

});


return new Response(answer, {

    headers: { "content-type": "text/event-stream" }

});


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers-ai/configuration/bindings/#page","headline":"Workers Bindings · Cloudflare Workers AI docs","description":"Create an AI binding to connect your Cloudflare Worker to Workers AI.","url":"https://developers.cloudflare.com/workers-ai/configuration/bindings/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-ai/","name":"Workers AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-ai/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers-ai/configuration/bindings/","name":"Workers Bindings"}}]}
```
