---
title: dns
description: Use the Node.js dns module in Cloudflare Workers for DNS name resolution via DNS over HTTPS.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# dns

Note

To enable built-in Node.js APIs and polyfills, add the nodejs\_compat compatibility flag to your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/). This also enables nodejs\_compat\_v2 as long as your compatibility date is 2024-09-23 or later. [Learn more about the Node.js compatibility flag and v2](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#nodejs-compatibility-flag).

You can use [node:dns ↗](https://nodejs.org/api/dns.html) for name resolution via [DNS over HTTPS](https://developers.cloudflare.com/1.1.1.1/encryption/dns-over-https/) using[Cloudflare DNS ↗](https://www.cloudflare.com/application-services/products/dns/) at 1.1.1.1.

* [  JavaScript ](#tab-panel-12007)
* [  TypeScript ](#tab-panel-12008)

index.js

```

import dns from "node:dns";


let response = await dns.promises.resolve4("cloudflare.com", "NS");


```

index.ts

```

import dns from 'node:dns';


let response = await dns.promises.resolve4('cloudflare.com', 'NS');


```

All `node:dns` functions are available, except `lookup`, `lookupService`, and `resolve` which throw "Not implemented" errors when called.

Note

DNS requests will execute a subrequest, counts for your [Worker's subrequest limit](https://developers.cloudflare.com/workers/platform/limits/#subrequests).

The full `node:dns` API is documented in the [Node.js documentation for node:dns ↗](https://nodejs.org/api/dns.html).

```

```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/runtime-apis/nodejs/dns/#page","headline":"dns · Cloudflare Workers docs","description":"Use the Node.js dns module in Cloudflare Workers for DNS name resolution via DNS over HTTPS.","url":"https://developers.cloudflare.com/workers/runtime-apis/nodejs/dns/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/runtime-apis/","name":"Runtime APIs"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/runtime-apis/nodejs/","name":"Node.js compatibility"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/runtime-apis/nodejs/dns/","name":"dns"}}]}
```
