---
title: Websocket to Container
description: Forwarding a Websocket request to a Container
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/containers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Websocket to Container

**Last reviewed:**  12 months ago 

Forwarding a Websocket request to a Container

WebSocket requests are automatically forwarded to a container using the default `fetch`method on the `Container` class:

JavaScript

```

import { Container, getContainer } from "@cloudflare/containers";


export class MyContainer extends Container {

  defaultPort = 8080;

  sleepAfter = "2m";

}


export default {

  async fetch(request, env) {

    // gets default instance and forwards websocket from outside Worker

    return getContainer(env.MY_CONTAINER).fetch(request);

  },

};


```

View a full example in the [Container class repository ↗](https://github.com/cloudflare/containers/tree/main/examples/websocket).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/containers/examples/websocket/#page","headline":"Websocket to Container · Cloudflare Containers docs","description":"Forwarding a Websocket request to a Container","url":"https://developers.cloudflare.com/containers/examples/websocket/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/containers/","name":"Containers"}},{"@type":"ListItem","position":3,"item":{"@id":"/containers/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/containers/examples/websocket/","name":"Websocket to Container"}}]}
```
