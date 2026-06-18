---
title: Custom limits
description: Limit resource usage of Dynamic Workers.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/dynamic-workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Custom limits

By default, each Dynamic Worker invocation uses your Workers plan [limits](https://developers.cloudflare.com/workers/platform/limits/#account-plan-limits) for CPU time and subrequests. Custom limits allow you to programmatically enforce limits on the Dynamic Worker's resource usage.

You can set limits for the maximum CPU time and number of subrequests per invocation. If a Dynamic Worker hits either of these limits, it will immediately throw an exception.

## Set custom limits

Custom limits can be specified as part of the worker code:

JavaScript

```

const worker = env.LOADER.get("my-worker", async () => {

  return {

    compatibilityDate: "$today",

    mainModule: "index.js",

    modules: { "index.js": code },

    limits: { cpuMs: 10, subRequests: 5 },

  };

});


```

They can also be specified as part of the `getEntrypoint()` call:

JavaScript

```

// get the worker's default entrypoint with custom limits

// if limits were already specified as part of the worker code, the lower of the two limits is used

const entrypoint = worker.getEntrypoint(null, { limits: { cpuMs: 10, subRequests: 5 } });

await entrypoint.fetch(...);


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dynamic-workers/usage/limits/#page","headline":"Custom limits · Cloudflare Dynamic Workers docs","description":"Limit resource usage of Dynamic Workers.","url":"https://developers.cloudflare.com/dynamic-workers/usage/limits/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dynamic-workers/","name":"Dynamic Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/dynamic-workers/usage/","name":"Usage"}},{"@type":"ListItem","position":4,"item":{"@id":"/dynamic-workers/usage/limits/","name":"Custom limits"}}]}
```
