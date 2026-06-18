---
title: Delay action
description: Use a Worker to add configurable delays to requests with low bot scores.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/bots/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Delay action

Customers with a Bot Management and a [Workers](https://developers.cloudflare.com/workers/) subscription can use the template below to introduce a delay to requests that are likely from bots.

The template sets a minimum and maximum delay, and delays requests where the bot score is less than 30 and the URI path starts with `/exampleURI`.

* [  JavaScript ](#tab-panel-6854)
* [  TypeScript ](#tab-panel-6855)

JavaScript

```

// Configurable Variables

const PATH_START = "/exampleURI";

const DELAY_FROM = 5; // in seconds

const DELAY_TO = 10; // in seconds


export default {

  async fetch(request, env, ctx) {

    const url = new URL(request.url);

    const botScore = request.cf.botManagement.score;


    if (url.pathname.startsWith(PATH_START) && botScore < 30) {

      // Random delay between DELAY_FROM and DELAY_TO seconds

      const delay =

        Math.floor(Math.random() * (DELAY_TO - DELAY_FROM + 1)) + DELAY_FROM;

      await new Promise((resolve) => setTimeout(resolve, delay * 1000));


      // Fetch the original request

      return fetch(request);

    }


    // Fetch the original request without delay

    return fetch(request);

  },

};


```

TypeScript

```

// Configurable Variables

const PATH_START = '/exampleURI';

const DELAY_FROM = 5; // in seconds

const DELAY_TO = 10; // in seconds


export default {

  async fetch(request, env, ctx): Promise<Response> {

    const url = new URL(request.url);

    const botScore = request.cf.botManagement.score


    if (url.pathname.startsWith(PATH_START) && botScore < 30) {

      // Random delay between DELAY_FROM and DELAY_TO seconds

      const delay = Math.floor(Math.random() * (DELAY_TO - DELAY_FROM + 1)) + DELAY_FROM;

      await new Promise(resolve => setTimeout(resolve, delay * 1000));


      // Fetch the original request

      return fetch(request);

    }


    // Fetch the original request without delay

    return fetch(request);

  },

} satisfies ExportedHandler<Env>;


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/bots/workers-templates/delay-action/#page","headline":"Delay action · Cloudflare bot solutions docs","description":"Use a Worker to add configurable delays to requests with low bot scores.","url":"https://developers.cloudflare.com/bots/workers-templates/delay-action/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["TypeScript","JavaScript"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/bots/","name":"Bots"}},{"@type":"ListItem","position":3,"item":{"@id":"/bots/workers-templates/","name":"Workers templates"}},{"@type":"ListItem","position":4,"item":{"@id":"/bots/workers-templates/delay-action/","name":"Delay action"}}]}
```
