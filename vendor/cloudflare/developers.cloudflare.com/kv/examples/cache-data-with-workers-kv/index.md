---
title: Cache data with Workers KV
description: Example of how to use Workers KV to build a distributed application configuration store.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/kv/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Cache data with Workers KV

**Last reviewed:**  about 1 year ago 

Cache data or API responses in Workers KV to improve application performance

Workers KV can be used as a persistent, single, global cache accessible from Cloudflare Workers to speed up your application. Data cached in Workers KV is accessible from all other Cloudflare locations as well, and persists until expiry or deletion.

After fetching data from external resources in your Workers application, you can write the data to Workers KV. On subsequent Worker requests (in the same region or in other regions), you can read the cached data from Workers KV instead of calling the external API. This improves your Worker application's performance and resilience while reducing load on external resources.

This example shows how you can cache data in Workers KV and read cached data from Workers KV in a Worker application.

Note

You can also cache data in Workers with the [Cache API](https://developers.cloudflare.com/workers/runtime-apis/cache/). With the Cache API, the contents of the cache do not replicate outside of the originating data center and the cache is ephemeral (can be evicted).

With Workers KV, the data is persisted by default to [central stores](https://developers.cloudflare.com/kv/concepts/how-kv-works/) (or can be set to [expire](https://developers.cloudflare.com/kv/api/write-key-value-pairs/#expiring-keys), and can be accessed from other Cloudflare locations.

## Cache data in Workers KV from your Worker application

In the following `index.ts` file, the Worker fetches data from an external server and caches the response in Workers KV. If the data is already cached in Workers KV, the Worker reads the cached data from Workers KV instead of calling the external API.

* [ index.ts ](#tab-panel-8951)
* [ wrangler.jsonc ](#tab-panel-8952)

index.ts

```

interface Env {

  CACHE_KV: KVNamespace;

}


export default {

  async fetch(request, env, ctx): Promise<Response> {


     const EXPIRATION_TTL = 30; // Cache expiration in seconds

    const url = 'https://example.com';

    const cacheKey = "cache-json-example";


    // Try to get data from KV cache first

    let data = await env.CACHE_KV.get(cacheKey, { type: 'json' });

    let fromCache = true;


    // If data is not in cache, fetch it from example.com

    if (!data) {

      console.log('Cache miss. Fetching fresh data from example.com');

      fromCache = false;


        // In this example, we are fetching HTML content but it can also be API responses or any other data

      const response = await fetch(url);

        const htmlData = await response.text();


        // In this example, we are converting HTML to JSON to demonstrate caching JSON data with Workers KV

        // You could cache any type of data, or even cache the HTML data directly

        data = helperConvertToJSON(htmlData);

        // The expirationTtl option is used to set the expiration time for the cache entry (in seconds), otherwise it will be stored indefinitely

        await env.CACHE_KV.put(cacheKey, JSON.stringify(data), { expirationTtl: EXPIRATION_TTL });

    }


    // Return the appropriate response format

      return new Response(JSON.stringify({

        data,

        fromCache

      }), {

        headers: { 'Content-Type': 'application/json' }

      });


}

} satisfies ExportedHandler<Env>;

31 collapsed lines


// Helper function to convert HTML to JSON

function helperConvertToJSON(html: string) {

// Parse HTML and extract relevant data

const title = helperExtractTitle(html);

const content = helperExtractContent(html);

const lastUpdated = new Date().toISOString();


    return { title, content, lastUpdated };


}


// Helper function to extract title from HTML

function helperExtractTitle(html: string) {

const titleMatch = html.match(/<title>(.\*?)<\/title>/i);

return titleMatch ? titleMatch[1] : 'No title found';

}


// Helper function to extract content from HTML

function helperExtractContent(html: string) {

const bodyMatch = html.match(/<body>(.\*?)<\/body>/is);

if (!bodyMatch) return 'No content found';


    // Strip HTML tags for a simple text representation

    const textContent = bodyMatch[1].replace(/<[^>]*>/g, ' ')

      .replace(/\s+/g, ' ')

      .trim();


    return textContent;


}


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

      "binding": "CACHE_KV",

      "id": "<YOUR_BINDING_ID>"

    }

  ]

}


```

This code snippet demonstrates how to read and update cached data in Workers KV from your Worker. If the data is not in the Workers KV cache, the Worker fetches the data from an external server and caches it in Workers KV.

In this example, we convert HTML to JSON to demonstrate how to cache JSON data with Workers KV, but any type of data can be cached in Workers KV. For instance, you could cache API responses, HTML content, or any other data that you want to persist across requests.

## Related resources

* [Rust support in Workers](https://developers.cloudflare.com/workers/languages/rust/).
* [Using KV in Workers](https://developers.cloudflare.com/kv/get-started/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/kv/examples/cache-data-with-workers-kv/#page","headline":"Cache data with Workers KV · Cloudflare Workers KV docs","description":"Example of how to use Workers KV to build a distributed application configuration store.","url":"https://developers.cloudflare.com/kv/examples/cache-data-with-workers-kv/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/kv/","name":"KV"}},{"@type":"ListItem","position":3,"item":{"@id":"/kv/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/kv/examples/cache-data-with-workers-kv/","name":"Cache data with Workers KV"}}]}
```
