---
title: APIs
description: Integrate Cloudflare Workers with third-party APIs using the Fetch API.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# APIs

To integrate with third party APIs from Cloudflare Workers, use the [fetch API](https://developers.cloudflare.com/workers/runtime-apis/fetch/) to make HTTP requests to the API endpoint. Then use the response data to modify or manipulate your content as needed.

For example, if you want to integrate with a weather API, make a fetch request to the API endpoint and retrieve the current weather data. Then use this data to display the current weather conditions on your website.

To make the `fetch()` request, add the following code to your project's `src/index.js` file:

JavaScript

```

async function handleRequest(request) {

  // Make the fetch request to the third party API endpoint

  const response = await fetch("https://weather-api.com/endpoint", {

    method: "GET",

    headers: {

      "Content-Type": "application/json",

    },

  });


  // Retrieve the data from the response

  const data = await response.json();


  // Use the data to modify or manipulate your content as needed

  return new Response(data);

}


```

## Authentication

If your API requires authentication, use Wrangler secrets to securely store your credentials. To do this, create a secret in your Cloudflare Workers project using the following [wrangler secret](https://developers.cloudflare.com/workers/wrangler/commands/general/#secret) command:

Terminal window

```

wrangler secret put SECRET_NAME


```

Then, retrieve the secret value in your code using the following code snippet:

JavaScript

```

const secretValue = env.SECRET_NAME;


```

Then use the secret value to authenticate with the external service. For example, if the external service requires an API key for authentication, include it in your request headers.

For services that require mTLS authentication, use [mTLS certificates](https://developers.cloudflare.com/workers/runtime-apis/bindings/mtls) to present a client certificate.

## Tips

* Use the [Cache API](https://developers.cloudflare.com/workers/runtime-apis/cache/) to cache data from the third party API. This allows you to optimize cacheable requests made to the API. Integrating with third party APIs from Cloudflare Workers adds additional functionality and features to your application.
* Use [Custom Domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/) when communicating with external APIs, which treat your Worker as your core application.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/configuration/integrations/apis/#page","headline":"APIs · Cloudflare Workers docs","description":"Integrate Cloudflare Workers with third-party APIs using the Fetch API.","url":"https://developers.cloudflare.com/workers/configuration/integrations/apis/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/configuration/integrations/","name":"Integrations"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/configuration/integrations/apis/","name":"APIs"}}]}
```
