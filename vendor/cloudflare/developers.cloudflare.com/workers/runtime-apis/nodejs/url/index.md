---
title: url
description: Use the Node.js url module in Workers for domain-to-ASCII and domain-to-Unicode conversions.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# url

Note

To enable built-in Node.js APIs and polyfills, add the nodejs\_compat compatibility flag to your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/). This also enables nodejs\_compat\_v2 as long as your compatibility date is 2024-09-23 or later. [Learn more about the Node.js compatibility flag and v2](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#nodejs-compatibility-flag).

## domainToASCII

Returns the Punycode ASCII serialization of the domain. If domain is an invalid domain, the empty string is returned.

JavaScript

```

import { domainToASCII } from "node:url";


console.log(domainToASCII("español.com"));

// Prints xn--espaol-zwa.com

console.log(domainToASCII("中文.com"));

// Prints xn--fiq228c.com

console.log(domainToASCII("xn--iñvalid.com"));

// Prints an empty string


```

## domainToUnicode

Returns the Unicode serialization of the domain. If domain is an invalid domain, the empty string is returned.

It performs the inverse operation to `domainToASCII()`.

JavaScript

```

import { domainToUnicode } from "node:url";


console.log(domainToUnicode("xn--espaol-zwa.com"));

// Prints español.com

console.log(domainToUnicode("xn--fiq228c.com"));

// Prints 中文.com

console.log(domainToUnicode("xn--iñvalid.com"));

// Prints an empty string


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/runtime-apis/nodejs/url/#page","headline":"url · Cloudflare Workers docs","description":"Use the Node.js url module in Workers for domain-to-ASCII and domain-to-Unicode conversions.","url":"https://developers.cloudflare.com/workers/runtime-apis/nodejs/url/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/runtime-apis/","name":"Runtime APIs"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/runtime-apis/nodejs/","name":"Node.js compatibility"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/runtime-apis/nodejs/url/","name":"url"}}]}
```
