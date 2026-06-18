---
title: Build per-tenant search
description: Isolate search results per tenant in AI Search using separate instances or metadata filtering.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-search/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Build per-tenant search

AI Search supports per-tenant search isolation. You can either create a separate instance for each tenant or use a shared instance with metadata filtering.

## Instance per tenant

Create isolated AI Search instances for each tenant at runtime using the [namespace binding](https://developers.cloudflare.com/ai-search/concepts/namespaces/). Each tenant gets its own instance with separate storage and a search index.

* [  wrangler.jsonc ](#tab-panel-6625)
* [  wrangler.toml ](#tab-panel-6626)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "ai_search_namespaces": [

    {

      "binding": "TENANTS",

      "namespace": "default"

    }

  ]

}


```

TOML

```

[[ai_search_namespaces]]

binding = "TENANTS"

namespace = "default"


```

* [  JavaScript ](#tab-panel-6629)
* [  TypeScript ](#tab-panel-6630)

JavaScript

```

export default {

  async fetch(request, env) {

    const url = new URL(request.url);


    // Identify the tenant from the request header

    const tenantId = request.headers.get("x-tenant-id");


    if (!tenantId) {

      return new Response("Missing x-tenant-id header", { status: 400 });

    }


    // Create a new instance for the tenant

    if (url.pathname === "/onboard" && request.method === "POST") {

      const instance = await env.TENANTS.create({

        id: `tenant-${tenantId}`,

      });

      return Response.json({ success: true, instance: await instance.info() });

    }


    // Upload a document to the tenant's instance

    if (url.pathname === "/upload" && request.method === "POST") {

      const formData = await request.formData();

      const file = formData.get("file");


      // Upload the file to the tenant's built-in storage

      const item = await env.TENANTS.get(`tenant-${tenantId}`).items.upload(

        file.name,

        await file.arrayBuffer(),

      );

      return Response.json({ success: true, item });

    }


    // Search the tenant's instance

    if (url.pathname === "/search") {

      const query = url.searchParams.get("q") || "";


      // Each tenant's search is isolated to their own instance

      const results = await env.TENANTS.get(`tenant-${tenantId}`).search({

        messages: [{ role: "user", content: query }],

      });

      return Response.json(results);

    }


    // Delete the tenant's instance and all its data

    if (url.pathname === "/offboard" && request.method === "DELETE") {

      await env.TENANTS.delete(`tenant-${tenantId}`);

      return Response.json({ success: true });

    }


    return new Response("Not found", { status: 404 });

  },

};


```

TypeScript

```

export type Env = {

  TENANTS: AiSearchNamespace;

};


export default {

  async fetch(request, env): Promise<Response> {

    const url = new URL(request.url);


    // Identify the tenant from the request header

    const tenantId = request.headers.get("x-tenant-id");


    if (!tenantId) {

      return new Response("Missing x-tenant-id header", { status: 400 });

    }


    // Create a new instance for the tenant

    if (url.pathname === "/onboard" && request.method === "POST") {

      const instance = await env.TENANTS.create({

        id: `tenant-${tenantId}`,

      });

      return Response.json({ success: true, instance: await instance.info() });

    }


    // Upload a document to the tenant's instance

    if (url.pathname === "/upload" && request.method === "POST") {

      const formData = await request.formData();

      const file = formData.get("file") as File;


      // Upload the file to the tenant's built-in storage

      const item = await env.TENANTS.get(`tenant-${tenantId}`).items.upload(

        file.name,

        await file.arrayBuffer(),

      );

      return Response.json({ success: true, item });

    }


    // Search the tenant's instance

    if (url.pathname === "/search") {

      const query = url.searchParams.get("q") || "";


      // Each tenant's search is isolated to their own instance

      const results = await env.TENANTS.get(`tenant-${tenantId}`).search({

        messages: [{ role: "user", content: query }],

      });

      return Response.json(results);

    }


    // Delete the tenant's instance and all its data

    if (url.pathname === "/offboard" && request.method === "DELETE") {

      await env.TENANTS.delete(`tenant-${tenantId}`);

      return Response.json({ success: true });

    }


    return new Response("Not found", { status: 404 });

  },

} satisfies ExportedHandler<Env>;


```

## Shared instance with metadata filtering

Use a single AI Search instance and organize content by tenant using folder paths. This approach works with both [R2 buckets](https://developers.cloudflare.com/ai-search/configuration/data-source/r2/) and [built-in storage](https://developers.cloudflare.com/ai-search/configuration/data-source/built-in-storage/). Apply [metadata filters](https://developers.cloudflare.com/ai-search/configuration/retrieval/filtering/) at query time to ensure each tenant only retrieves their own documents.

* [  wrangler.jsonc ](#tab-panel-6627)
* [  wrangler.toml ](#tab-panel-6628)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "ai_search": [

    {

      "binding": "SHARED_INSTANCE",

      "instance_name": "shared-instance"

    }

  ]

}


```

TOML

```

[[ai_search]]

binding = "SHARED_INSTANCE"

instance_name = "shared-instance"


```

Organize your content by tenant using unique folder paths:

* Directorycustomer-a  
   * Directorylogs/  
         * …  
   * Directorycontracts/  
         * …
* Directorycustomer-b  
   * Directorycontracts/  
         * …

When searching, filter by the tenant's folder to restrict results:

TypeScript

```

// Filter results to only return documents from this tenant's folder

const results = await env.SHARED_INSTANCE.search({

  messages: [{ role: "user", content: "When did I sign my agreement?" }],

  ai_search_options: {

    retrieval: {

      filters: {

        folder: { $gte: "customer-a/", $lt: "customer-a0" },

      },

    },

  },

});


```

This example uses a ["starts with" filter](https://developers.cloudflare.com/ai-search/configuration/retrieval/filtering/#starts-with-filter-for-folders) to match all files under `customer-a/` including subfolders.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-search/how-to/per-tenant-search/#page","headline":"Build per-tenant search · Cloudflare AI Search docs","description":"Isolate search results per tenant in AI Search using separate instances or metadata filtering.","url":"https://developers.cloudflare.com/ai-search/how-to/per-tenant-search/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-search/","name":"AI Search"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-search/how-to/","name":"How to"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-search/how-to/per-tenant-search/","name":"Build per-tenant search"}}]}
```
