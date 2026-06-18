---
title: tls
description: Use the Node.js tls module in Cloudflare Workers to create secure TLS connections to external services.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# tls

Note

To enable built-in Node.js APIs and polyfills, add the nodejs\_compat compatibility flag to your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/). This also enables nodejs\_compat\_v2 as long as your compatibility date is 2024-09-23 or later. [Learn more about the Node.js compatibility flag and v2](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#nodejs-compatibility-flag).

You can use [node:tls ↗](https://nodejs.org/api/tls.html) to create secure connections to external services using [TLS ↗](https://developer.mozilla.org/en-US/docs/Web/Security/Transport%5FLayer%5FSecurity) (Transport Layer Security).

JavaScript

```

import { connect } from "node:tls";


// ... in a request handler ...

const connectionOptions = { key: env.KEY, cert: env.CERT };

const socket = connect(url, connectionOptions, () => {

  if (socket.authorized) {

    console.log("Connection authorized");

  }

});


socket.on("data", (data) => {

  console.log(data);

});


socket.on("end", () => {

  console.log("server ends connection");

});


```

The following APIs are available:

* [connect ↗](https://nodejs.org/api/tls.html#tlsconnectoptions-callback)
* [TLSSocket ↗](https://nodejs.org/api/tls.html#class-tlstlssocket)
* [checkServerIdentity ↗](https://nodejs.org/api/tls.html#tlscheckserveridentityhostname-cert)
* [createSecureContext ↗](https://nodejs.org/api/tls.html#tlscreatesecurecontextoptions)

All other APIs, including [tls.Server ↗](https://nodejs.org/api/tls.html#class-tlsserver) and [tls.createServer ↗](https://nodejs.org/api/tls.html#tlscreateserveroptions-secureconnectionlistener), are not supported and will throw a `Not implemented` error when called.

The full `node:tls` API is documented in the [Node.js documentation for node:tls ↗](https://nodejs.org/api/tls.html).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/runtime-apis/nodejs/tls/#page","headline":"tls · Cloudflare Workers docs","description":"Use the Node.js tls module in Cloudflare Workers to create secure TLS connections to external services.","url":"https://developers.cloudflare.com/workers/runtime-apis/nodejs/tls/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/runtime-apis/","name":"Runtime APIs"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/runtime-apis/nodejs/","name":"Node.js compatibility"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/runtime-apis/nodejs/tls/","name":"tls"}}]}
```
