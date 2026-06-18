---
title: crypto
description: Use the Node.js crypto module in Cloudflare Workers for hashing, encryption, signing, and verification.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# crypto

Note

To enable built-in Node.js APIs and polyfills, add the nodejs\_compat compatibility flag to your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/). This also enables nodejs\_compat\_v2 as long as your compatibility date is 2024-09-23 or later. [Learn more about the Node.js compatibility flag and v2](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#nodejs-compatibility-flag).

The [node:crypto ↗](https://nodejs.org/docs/latest/api/crypto.html) module provides cryptographic functionality that includes a set of wrappers for OpenSSL's hash, HMAC, cipher, decipher, sign, and verify functions.

All `node:crypto` APIs are fully supported in Workers with the following exceptions:

* The functions [generateKeyPair ↗](https://nodejs.org/api/crypto.html#cryptogeneratekeypairtype-options-callback) and [generateKeyPairSync ↗](https://nodejs.org/api/crypto.html#cryptogeneratekeypairsynctype-options)do not support DSA or DH key pairs.
* `ed448` and `x448` curves are not supported.
* It is not possible to manually enable or disable [FIPS mode ↗](https://nodejs.org/docs/latest/api/crypto.html#fips-mode).

The full `node:crypto` API is documented in the [Node.js documentation for node:crypto ↗](https://nodejs.org/api/crypto.html).

The [WebCrypto API](https://developers.cloudflare.com/workers/runtime-apis/web-crypto/) is also available within Cloudflare Workers. This does not require the `nodejs_compat` compatibility flag.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/runtime-apis/nodejs/crypto/#page","headline":"crypto · Cloudflare Workers docs","description":"Use the Node.js crypto module in Cloudflare Workers for hashing, encryption, signing, and verification.","url":"https://developers.cloudflare.com/workers/runtime-apis/nodejs/crypto/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/runtime-apis/","name":"Runtime APIs"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/runtime-apis/nodejs/","name":"Node.js compatibility"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/runtime-apis/nodejs/crypto/","name":"crypto"}}]}
```
