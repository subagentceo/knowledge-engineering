---
title: Create custom headers for Cloudflare Access-protected origins with Workers
description: This tutorial covers how to use a Cloudflare Worker to add custom headers to traffic. The headers will be sent to origin services protected by Cloudflare Access.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Create custom headers for Cloudflare Access-protected origins with Workers

**Last reviewed:**  over 2 years ago 

This tutorial covers how to use a [Cloudflare Worker](https://developers.cloudflare.com/workers/) to add custom HTTP headers to traffic, and how to send those custom headers to your origin services protected by [Cloudflare Access](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/).

Some applications and networking implementations require specific custom headers to be passed to the origin, which can be difficult to implement for traffic moving through a Zero Trust proxy. You can configure a Worker to send the [user authorization headers](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/) required by Access.

---

## Before you begin

* Secure your origin server with Cloudflare Access

## Before you begin

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to the **Workers & Pages** page.  
[ Go to **Workers & Pages** ](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. If this is your first Worker, select **Create Worker**. Otherwise, select **Create application**, then select **Create Worker**.
3. Enter an identifiable name for the Worker, then select **Deploy**.
4. Select **Edit code**.
5. Input the following Worker:

* [  JavaScript ](#tab-panel-7711)
* [  TypeScript ](#tab-panel-7712)

JavaScript

```

export default {

  async fetch(request, env, ctx) {

    const { headers } = request;

    const cfaccessemail = headers.get("cf-access-authenticated-user-email");


    const requestWithID = new Request(request);

    requestWithID.headers.set("company-user-id", cfaccessemail);


    return fetch(requestWithID);

  },

};


```

TypeScript

```

export default {

  async fetch(request, env, ctx): Promise<Response> {

    const { headers } = request;

    const cfaccessemail = headers.get("cf-access-authenticated-user-email");


    const requestWithID = new Request(request);

    requestWithID.headers.set("company-user-id", cfaccessemail);


    return fetch(requestWithID);

  },

} satisfies ExportedHandler<Env>;


```

1. Select **Save and deploy**.

Your Worker is now ready to send custom headers to your Access-protected origin services.

## Apply the Worker to your hostname

1. Select the Worker you created, then go to **Triggers**.
2. In **Routes**, select **Add route**.
3. Enter the hostname and zone for your origin, then select **Add route**.

The Worker will now insert a custom header into requests that match the defined route. For example:

Example custom header

```

"Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",

    "Accept-Encoding": "gzip",

    "Accept-Language": "en-US,en;q=0.9",

    "Cf-Access-Authenticated-User-Email": "user@example.com",

    "Company-User-Id": "user@example.com",

    "Connection": "keep-alive"


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/tutorials/access-workers/#page","headline":"Create custom headers for Cloudflare Access-protected origins with Workers · Cloudflare One docs","description":"This tutorial covers how to use a Cloudflare Worker to add custom headers to traffic. The headers will be sent to origin services protected by Cloudflare Access.","url":"https://developers.cloudflare.com/cloudflare-one/tutorials/access-workers/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-01-28","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["JavaScript"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/tutorials/","name":"Tutorials"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/tutorials/access-workers/","name":"Create custom headers for Cloudflare Access-protected origins with Workers"}}]}
```
