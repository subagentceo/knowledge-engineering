---
title: KV namespaces
description: A KV namespace is a key-value database replicated across Cloudflare's global network.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/kv/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# KV namespaces

A KV namespace is a key-value database replicated to Cloudflare’s global network.

Bind your KV namespaces through Wrangler or via the Cloudflare dashboard.

Note

KV namespace IDs are public and bound to your account.

## Bind your KV namespace through Wrangler

To bind KV namespaces to your Worker, assign an array of the below object to the `kv_namespaces` key.

* `binding` ` string ` required  
   * The binding name used to refer to the KV namespace.
* `id` ` string ` required  
   * The ID of the KV namespace.
* `preview_id` ` string ` optional  
   * The ID of the KV namespace used during `wrangler dev`.

Example:

* [  wrangler.jsonc ](#tab-panel-8949)
* [  wrangler.toml ](#tab-panel-8950)

JSONC

```

{

  "kv_namespaces": [

    {

      "binding": "<TEST_NAMESPACE>",

      "id": "<TEST_ID>"

    }

  ]

}


```

TOML

```

[[kv_namespaces]]

binding = "<TEST_NAMESPACE>"

id = "<TEST_ID>"


```

## Bind your KV namespace via the dashboard

To bind the namespace to your Worker in the Cloudflare dashboard:

1. In the Cloudflare dashboard, go to the **Workers & Pages** page.  
[ Go to **Workers & Pages** ](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Select your **Worker**.
3. Select **Settings** \> **Bindings**.
4. Select **Add**.
5. Select **KV Namespace**.
6. Enter your desired variable name (the name of the binding).
7. Select the KV namespace you wish to bind the Worker to.
8. Select **Deploy**.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/kv/concepts/kv-namespaces/#page","headline":"KV namespaces · Cloudflare Workers KV docs","description":"A KV namespace is a key-value database replicated across Cloudflare's global network.","url":"https://developers.cloudflare.com/kv/concepts/kv-namespaces/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/kv/","name":"KV"}},{"@type":"ListItem","position":3,"item":{"@id":"/kv/concepts/","name":"Key concepts"}},{"@type":"ListItem","position":4,"item":{"@id":"/kv/concepts/kv-namespaces/","name":"KV namespaces"}}]}
```
