---
title: Rewrite links
description: Rewrite URL links in HTML using the HTMLRewriter. This is useful for JAMstack websites.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Rewrite links

**Last reviewed:**  over 4 years ago 

Rewrite URL links in HTML using the HTMLRewriter. This is useful for JAMstack websites.

If you want to get started quickly, click on the button below.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/docs-examples/tree/main/workers/rewrite-links)

This creates a repository in your GitHub account and deploys the application to Cloudflare Workers.

* [  JavaScript ](#tab-panel-11746)
* [  TypeScript ](#tab-panel-11747)
* [  Python ](#tab-panel-11748)
* [  Hono ](#tab-panel-11749)

JavaScript

```

export default {

  async fetch(request) {

    const OLD_URL = "developer.mozilla.org";

    const NEW_URL = "mynewdomain.com";


    class AttributeRewriter {

      constructor(attributeName) {

        this.attributeName = attributeName;

      }

      element(element) {

        const attribute = element.getAttribute(this.attributeName);

        if (attribute) {

          element.setAttribute(

            this.attributeName,

            attribute.replace(OLD_URL, NEW_URL),

          );

        }

      }

    }


    const rewriter = new HTMLRewriter()

      .on("a", new AttributeRewriter("href"))

      .on("img", new AttributeRewriter("src"));


    const res = await fetch(request);

    const contentType = res.headers.get("Content-Type");


    // If the response is HTML, it can be transformed with

    // HTMLRewriter -- otherwise, it should pass through

    if (contentType.startsWith("text/html")) {

      return rewriter.transform(res);

    } else {

      return res;

    }

  },

};


```

TypeScript

```

export default {

  async fetch(request): Promise<Response> {

    const OLD_URL = "developer.mozilla.org";

    const NEW_URL = "mynewdomain.com";


    class AttributeRewriter {

      constructor(attributeName) {

        this.attributeName = attributeName;

      }

      element(element) {

        const attribute = element.getAttribute(this.attributeName);

        if (attribute) {

          element.setAttribute(

            this.attributeName,

            attribute.replace(OLD_URL, NEW_URL),

          );

        }

      }

    }


    const rewriter = new HTMLRewriter()

      .on("a", new AttributeRewriter("href"))

      .on("img", new AttributeRewriter("src"));


    const res = await fetch(request);

    const contentType = res.headers.get("Content-Type");


    // If the response is HTML, it can be transformed with

    // HTMLRewriter -- otherwise, it should pass through

    if (contentType.startsWith("text/html")) {

      return rewriter.transform(res);

    } else {

      return res;

    }

  },

} satisfies ExportedHandler;


```

Python

```

from workers import WorkerEntrypoint

from pyodide.ffi import create_proxy

from js import HTMLRewriter, fetch


class AttributeRewriter:

    old_url = "developer.mozilla.org"

    new_url = "mynewdomain.com"


    def __init__(self, attr_name):

        self.attr_name = attr_name


    def element(self, element):

        attr = element.getAttribute(self.attr_name)

        if attr:

            element.setAttribute(

                self.attr_name, attr.replace(self.old_url, self.new_url)

            )


href = create_proxy(AttributeRewriter("href"))

src = create_proxy(AttributeRewriter("src"))

rewriter = HTMLRewriter.new().on("a", href).on("img", src)


class Default(WorkerEntrypoint):

    async def fetch(self, request):

        res = await fetch(request)

        content_type = res.headers["Content-Type"]


        # If the response is HTML, it can be transformed with

        # HTMLRewriter -- otherwise, it should pass through

        if content_type.startswith("text/html"):

            return rewriter.transform(res)

        return res


```

TypeScript

```

import { Hono } from 'hono';

import { html } from 'hono/html';


const app = new Hono();


app.get('*', async (c) => {

  const OLD_URL = "developer.mozilla.org";

  const NEW_URL = "mynewdomain.com";


  class AttributeRewriter {

    attributeName: string;


    constructor(attributeName: string) {

      this.attributeName = attributeName;

    }


    element(element: Element) {

      const attribute = element.getAttribute(this.attributeName);

      if (attribute) {

        element.setAttribute(

          this.attributeName,

          attribute.replace(OLD_URL, NEW_URL)

        );

      }

    }

  }


  // Make a fetch request using the original request

  const res = await fetch(c.req.raw);

  const contentType = res.headers.get("Content-Type") || "";


  // If the response is HTML, transform it with HTMLRewriter

  if (contentType.startsWith("text/html")) {

    const rewriter = new HTMLRewriter()

      .on("a", new AttributeRewriter("href"))

      .on("img", new AttributeRewriter("src"));


    return new Response(rewriter.transform(res).body, {

      headers: res.headers

    });

  } else {

    // Pass through the response as is

    return res;

  }

});


export default app;


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/examples/rewrite-links/#page","headline":"Rewrite links · Cloudflare Workers docs","description":"Rewrite URL links in HTML using the HTMLRewriter. This is useful for JAMstack websites.","url":"https://developers.cloudflare.com/workers/examples/rewrite-links/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["JavaScript","TypeScript","Python"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/examples/rewrite-links/","name":"Rewrite links"}}]}
```
