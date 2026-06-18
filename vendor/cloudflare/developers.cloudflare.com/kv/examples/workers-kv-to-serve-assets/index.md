---
title: Store and retrieve static assets
description: Example of how to use Workers KV to store static assets
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/kv/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Store and retrieve static assets

**Last reviewed:**  almost 2 years ago 

Store static assets in Workers KV and serve them from a Worker application with low-latency and high-throughput

By storing static assets in Workers KV, you can retrieve these assets globally with low-latency and high throughput. You can then serve these assets directly, or use them to dynamically generate responses. This can be useful when serving files such as custom scripts, small images that fit within [KV limits](https://developers.cloudflare.com/kv/platform/limits/), or when generating dynamic HTML responses from static assets such as translations.

Note

If you need to **host a front-end or full-stack web application**, **use [Cloudflare Workers static assets](https://developers.cloudflare.com/workers/static-assets/) or [Cloudflare Pages](https://developers.cloudflare.com/pages/)**, which provide a purpose-built deployment experience for web applications and their assets.

[Workers KV](https://developers.cloudflare.com/kv/) provides a more flexible API which allows you to access, edit, and store assets directly from your [Worker](https://developers.cloudflare.com/workers/) without requiring deployments. This can be helpful for serving custom assets that are not included in your deployment bundle, such as uploaded media assets or custom scripts and files generated at runtime.

## Write static assets to Workers KV using Wrangler

To store static assets in Workers KV, you can use the [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/) (commonly used during development), the [Workers KV binding](https://developers.cloudflare.com/kv/concepts/kv-bindings/) from a Workers application, or the [Workers KV REST API](https://developers.cloudflare.com/api/resources/kv/subresources/namespaces/methods/list/) (commonly used to access Workers KV from an external application). We will demonstrate how to use the Wrangler CLI.

For this scenario, we will store a sample HTML file within our Workers KV store.

Create a new file `index.html` with the following content:

index.html

```

Hello World!


```

We can then use the following Wrangler commands to create a KV pair for this file within our production and preview namespaces:

Terminal window

```

npx wrangler kv key put index.html --path index.html --namespace-id=<ENTER_NAMESPACE_ID_HERE>


```

This will create a KV pair with the filename as key and the file content as value, within the our production and preview namespaces specified by your binding in your Wrangler file.

## Serve static assets from KV from your Worker application

In this example, our Workers application will accept any key name as the path of the HTTP request and return the value stored in the KV store for that key.

* [ index.ts ](#tab-panel-8960)
* [ wrangler.jsonc ](#tab-panel-8961)

JavaScript

```

import mime from "mime";


interface Env {

assets: KVNamespace;

}


export default {

  async fetch(request, env, ctx): Promise<Response> {

    // Return error if not a get request

    if(request.method !== 'GET'){

      return new Response('Method Not Allowed', {

        status: 405,

      })

    }


      // Get the key from the url & return error if key missing

      const parsedUrl = new URL(request.url)

      const key = parsedUrl.pathname.replace(/^\/+/, '') // Strip any preceding /'s

      if(!key){

        return new Response('Missing path in URL', {

          status: 400

        })

      }


      // Get the mimetype from the key path

      const extension = key.split('.').pop();

      let mimeType = mime.getType(extension) || "text/plain";

      if (mimeType.startsWith("text") || mimeType === "application/javascript") {

        mimeType += "; charset=utf-8";

      }


      // Get the value from the Workers KV store and return it if found

      const value = await env.assets.get(key, 'arrayBuffer')

      if(!value){

        return new Response("Not found", {

          status: 404

        })

      }


      // Return the response from the Workers application with the value from the KV store

      return new Response(value, {

        status: 200,

        headers: new Headers({

          "Content-Type": mimeType

        })

      });

    },


} satisfies ExportedHandler<Env>;


```

```

{

  "$schema": "node_modules/wrangler/config-schema.json",

  "name": "<ENTER_WORKER_NAME>",

  "main": "src/index.ts",

  "compatibility_date": "2025-03-03",

  "observability": {

    "enabled": true

  },

  "kv_namespaces": [

    {

      "binding": "assets",

      "id": "<YOUR_BINDING_ID>"

    }

  ]

}


```

This code parses the key name for the key-value pair to fetch from the HTTP request. Then, it determines the proper MIME type for the response to inform the browser how to handle the response. To retrieve the value from the KV store, this code uses `arrayBuffer` to properly handle binary data such as images, documents, and video/audio files.

Given a sample key-value pair with key `index.html` with value containing some HTML content in our Workers KV namespace store, we can access our Workers application at `https://<YOUR-WORKER-HOSTNAME>/index.html` to see the contents of the `index.html` file.

Try it out with an image or a document and you will see that this Worker is also properly serving those assets from KV.

## Generate dynamic responses from your key-value pairs

In addition to serving static assets, we can also generate dynamic HTML or API responses based on the values stored in our KV store.

1. Start by creating this file in the root of your project:

hello-world.json

```

[

  {

    "language_code": "en",

    "message": "Hello World!"

  },

  {

    "language_code": "es",

    "message": "¡Hola Mundo!"

  },

  {

    "language_code": "fr",

    "message": "Bonjour le monde!"

  },

  {

    "language_code": "de",

    "message": "Hallo Welt!"

  },

  {

    "language_code": "zh",

    "message": "你好，世界！"

  },

  {

    "language_code": "ja",

    "message": "こんにちは、世界！"

  },

  {

    "language_code": "hi",

    "message": "नमस्ते दुनिया!"

  },

  {

    "language_code": "ar",

    "message": "مرحبا بالعالم!"

  }

]


```

1. Open a terminal and enter the following KV command to create a KV entry for the translations file:

Terminal window

```

npx wrangler kv key put hello-world.json --path hello-world.json --namespace-id=<ENTER_NAMESPACE_ID_HERE>


```

1. Update your Workers code to add logic to serve a translated HTML file based on the language of the Accept-Language header of the request:

* [ index.ts ](#tab-panel-8962)
* [ wrangler.jsonc ](#tab-panel-8963)

JavaScript

```

import mime from 'mime';

import parser from 'accept-language-parser'


interface Env {

assets: KVNamespace;

}


export default {

  async fetch(request, env, ctx): Promise<Response> {

    // Return error if not a get request

    if(request.method !== 'GET'){

      return new Response('Method Not Allowed', {

        status: 405,

      })

    }


    // Get the key from the url & return error if key missing

    const parsedUrl = new URL(request.url)

    const key = parsedUrl.pathname.replace(/^\/+/, '') // Strip any preceding /'s

    if(!key){

      return new Response('Missing path in URL', {

        status: 400

      })

    }


      // Add handler for translation path (with early return)

      if(key === 'hello-world'){

        // Retrieve the language header from the request and the translations from Workers KV

        const languageHeader = request.headers.get('Accept-Language') || 'en' // Default to English

        const translations : {

          "language_code": string,

          "message": string

        }[] = await env.assets.get('hello-world.json', 'json') || [];


        // Extract the requested language

        const supportedLanguageCodes = translations.map(item => item.language_code)

        const languageCode = parser.pick(supportedLanguageCodes, languageHeader, {

          loose: true

        })


        // Get the message for the selected language

        let selectedTranslation = translations.find(item => item.language_code === languageCode)

        if(!selectedTranslation) selectedTranslation = translations.find(item => item.language_code === "en")

        const helloWorldTranslated = selectedTranslation!['message'];


        // Generate and return the translated html

        const html = `<!DOCTYPE html>

        <html>

          <head>

            <title>Hello World translation</title>

          </head>

          <body>

            <h1>${helloWorldTranslated}</h1>

          </body>

        </html>

        `

        return new Response(html, {

          status: 200,

          headers: {

            'Content-Type': 'text/html; charset=utf-8'

          }

        })

      }


    // Get the mimetype from the key path

    const extension = key.split('.').pop();

    let mimeType = mime.getType(extension) || "text/plain";

    if (mimeType.startsWith("text") || mimeType === "application/javascript") {

      mimeType += "; charset=utf-8";

    }


    // Get the value from the Workers KV store and return it if found

    const value = await env.assets.get(key, 'arrayBuffer')

    if(!value){

      return new Response("Not found", {

        status: 404

      })

    }


    // Return the response from the Workers application with the value from the KV store

    return new Response(value, {

      status: 200,

      headers: new Headers({

        "Content-Type": mimeType

      })

    });


},

} satisfies ExportedHandler<Env>;


```

```

{

  "$schema": "node_modules/wrangler/config-schema.json",

  "name": "<ENTER_WORKER_NAME>",

  "main": "src/index.ts",

  "compatibility_date": "2025-03-03",

  "observability": {

    "enabled": true

  },

  "kv_namespaces": [

    {

      "binding": "assets",

      "id": "<YOUR_BINDING_ID>"

    }

  ]

}


```

This new code provides a specific endpoint, `/hello-world`, which will provide translated responses. When this URL is accessed, our Worker code will first retrieve the language that is requested by the client in the `Accept-Language` request header and the translations from our KV store for the `hello-world.json` key. It then gets the translated message and returns the generated HTML.

When accessing the Worker application at `https://<YOUR-WORKER-HOSTNAME>/hello-world`, we can notice that our application is now returning the properly translated "Hello World" message.

From your browser's developer console, change the locale language (on Chromium browsers, Run `Show Sensors` to get a dropdown selection for locales). You will see that the Worker is now returning the translated message based on the locale language.

## Related resources

* [Rust support in Workers](https://developers.cloudflare.com/workers/languages/rust/).
* [Using KV in Workers](https://developers.cloudflare.com/kv/get-started/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/kv/examples/workers-kv-to-serve-assets/#page","headline":"Store and retrieve static assets · Cloudflare Workers KV docs","description":"Example of how to use Workers KV to store static assets","url":"https://developers.cloudflare.com/kv/examples/workers-kv-to-serve-assets/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/kv/","name":"KV"}},{"@type":"ListItem","position":3,"item":{"@id":"/kv/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/kv/examples/workers-kv-to-serve-assets/","name":"Store and retrieve static assets"}}]}
```
