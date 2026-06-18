---
title: A/B testing with middleware
description: Set up an A/B test by controlling what page is served based on cookies. This version supports passing the request through to test and control on the origin.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/pages/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# A/B testing with middleware

Set up an A/B test by controlling what page is served based on cookies. This version supports passing the request through to test and control on the origin.

JavaScript

```

const cookieName = "ab-test-cookie";

const newHomepagePathName = "/test";


const abTest = async (context) => {

  const url = new URL(context.request.url);

  // if homepage

  if (url.pathname === "/") {

    // if cookie ab-test-cookie=new then change the request to go to /test

    // if no cookie set, pass x% of traffic and set a cookie value to "current" or "new"


    let cookie = request.headers.get("cookie");

    // is cookie set?

    if (cookie && cookie.includes(`${cookieName}=new`)) {

      // pass the request to /test

      url.pathname = newHomepagePathName;

      return context.env.ASSETS.fetch(url);

    } else {

      const percentage = Math.floor(Math.random() * 100);

      let version = "current"; // default version

      // change pathname and version name for 50% of traffic

      if (percentage < 50) {

        url.pathname = newHomepagePathName;

        version = "new";

      }

      // get the static file from ASSETS, and attach a cookie

      const asset = await context.env.ASSETS.fetch(url);

      let response = new Response(asset.body, asset);

      response.headers.append("Set-Cookie", `${cookieName}=${version}; path=/`);

      return response;

    }

  }

  return context.next();

};


export const onRequest = [abTest];


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pages/functions/examples/ab-testing/#page","headline":"A/B testing with middleware · Cloudflare Pages docs","description":"Set up an A/B test by controlling what page is served based on cookies. This version supports passing the request through to test and control on the origin.","url":"https://developers.cloudflare.com/pages/functions/examples/ab-testing/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/pages/","name":"Pages"}},{"@type":"ListItem","position":3,"item":{"@id":"/pages/functions/","name":"Functions"}},{"@type":"ListItem","position":4,"item":{"@id":"/pages/functions/examples/","name":"Examples"}},{"@type":"ListItem","position":5,"item":{"@id":"/pages/functions/examples/ab-testing/","name":"A/B testing with middleware"}}]}
```
