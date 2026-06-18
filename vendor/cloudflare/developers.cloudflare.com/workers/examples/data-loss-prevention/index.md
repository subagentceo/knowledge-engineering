---
title: Data loss prevention
description: Protect sensitive data to prevent data loss, and send alerts to a webhooks server in the event of a data breach.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Data loss prevention

**Last reviewed:**  over 5 years ago 

Protect sensitive data to prevent data loss, and send alerts to a webhooks server in the event of a data breach.

If you want to get started quickly, click on the button below.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/docs-examples/tree/main/workers/data-loss-prevention)

This creates a repository in your GitHub account and deploys the application to Cloudflare Workers.

* [  JavaScript ](#tab-panel-11654)
* [  TypeScript ](#tab-panel-11655)
* [  Python ](#tab-panel-11656)
* [  Hono ](#tab-panel-11657)

JavaScript

```

export default {

  async fetch(request) {

    const DEBUG = true;

    const SOME_HOOK_SERVER = "https://webhook.flow-wolf.io/hook";


    /**

     * Alert a data breach by posting to a webhook server

     */

    async function postDataBreach(request) {

      return await fetch(SOME_HOOK_SERVER, {

        method: "POST",

        headers: {

          "content-type": "application/json;charset=UTF-8",

        },

        body: JSON.stringify({

          ip: request.headers.get("cf-connecting-ip"),

          time: Date.now(),

          request: request,

        }),

      });

    }


    /**

     * Define personal data with regular expressions.

     * Respond with block if credit card data, and strip

     * emails and phone numbers from the response.

     * Execution will be limited to MIME type "text/*".

     */

    const response = await fetch(request);


    // Return origin response, if response wasn’t text

    const contentType = response.headers.get("content-type") || "";

    if (!contentType.toLowerCase().includes("text/")) {

      return response;

    }


    let text = await response.text();


    // When debugging replace the response

    // from the origin with an email

    text = DEBUG

      ? text.replace("You may use this", "me@example.com may use this")

      : text;

    const sensitiveRegexsMap = {

      creditCard: String.raw`\b(?:4[0-9]{12}(?:[0-9]{3})?|(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11})\b`,

      email: String.raw`\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b`,

      phone: String.raw`\b07\d{9}\b`,

    };


    for (const kind in sensitiveRegexsMap) {

      const sensitiveRegex = new RegExp(sensitiveRegexsMap[kind], "ig");

      const match = await sensitiveRegex.test(text);

      if (match) {

        // Alert a data breach

        await postDataBreach(request);

        // Respond with a block if credit card,

        // otherwise replace sensitive text with `*`s

        return kind === "creditCard"

          ? new Response(kind + " found\nForbidden\n", {

              status: 403,

              statusText: "Forbidden",

            })

          : new Response(text.replace(sensitiveRegex, "**********"), response);

      }

    }

    return new Response(text, response);

  },

};


```

TypeScript

```

export default {

  async fetch(request): Promise<Response> {

    const DEBUG = true;

    const SOME_HOOK_SERVER = "https://webhook.flow-wolf.io/hook";


    /**

     * Alert a data breach by posting to a webhook server

     */

    async function postDataBreach(request) {

      return await fetch(SOME_HOOK_SERVER, {

        method: "POST",

        headers: {

          "content-type": "application/json;charset=UTF-8",

        },

        body: JSON.stringify({

          ip: request.headers.get("cf-connecting-ip"),

          time: Date.now(),

          request: request,

        }),

      });

    }


    /**

     * Define personal data with regular expressions.

     * Respond with block if credit card data, and strip

     * emails and phone numbers from the response.

     * Execution will be limited to MIME type "text/*".

     */

    const response = await fetch(request);


    // Return origin response, if response wasn’t text

    const contentType = response.headers.get("content-type") || "";

    if (!contentType.toLowerCase().includes("text/")) {

      return response;

    }


    let text = await response.text();


    // When debugging replace the response

    // from the origin with an email

    text = DEBUG

      ? text.replace("You may use this", "me@example.com may use this")

      : text;

    const sensitiveRegexsMap = {

      creditCard: String.raw`\b(?:4[0-9]{12}(?:[0-9]{3})?|(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11})\b`,

      email: String.raw`\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b`,

      phone: String.raw`\b07\d{9}\b`,

    };


    for (const kind in sensitiveRegexsMap) {

      const sensitiveRegex = new RegExp(sensitiveRegexsMap[kind], "ig");

      const match = await sensitiveRegex.test(text);

      if (match) {

        // Alert a data breach

        await postDataBreach(request);

        // Respond with a block if credit card,

        // otherwise replace sensitive text with `*`s

        return kind === "creditCard"

          ? new Response(kind + " found\nForbidden\n", {

              status: 403,

              statusText: "Forbidden",

            })

          : new Response(text.replace(sensitiveRegex, "**********"), response);

      }

    }

    return new Response(text, response);

  },

} satisfies ExportedHandler;


```

Python

```

import re

from workers import WorkerEntrypoint

from datetime import datetime

from js import Response, fetch, JSON, Headers


# Alert a data breach by posting to a webhook server

async def post_data_breach(request):

    some_hook_server = "https://webhook.flow-wolf.io/hook"

    headers = Headers.new({"content-type": "application/json"}.items())

    body = JSON.stringify({

      "ip": request.headers["cf-connecting-ip"],

      "time": datetime.now(),

      "request": request,

    })

    return await fetch(some_hook_server, method="POST", headers=headers, body=body)


class Default(WorkerEntrypoint):

    async def fetch(self, request):

    debug = True


    # Define personal data with regular expressions.

    # Respond with block if credit card data, and strip

    # emails and phone numbers from the response.

    # Execution will be limited to MIME type "text/*".

    response = await fetch(request)


    # Return origin response, if response wasn’t text

    content_type = response.headers["content-type"] or ""

    if "text" not in content_type:

      return response


    text = await response.text()

    # When debugging replace the response from the origin with an email

    text = text.replace("You may use this", "me@example.com may use this") if debug else text


    sensitive_regex = [

    ("credit_card",

    r'\b(?:4[0-9]{12}(?:[0-9]{3})?|(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11})\b'),

    ("email", r'\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b'),

    ("phone", r'\b07\d{9}\b'),

    ]

    for (kind, regex) in sensitive_regex:

      match = re.search(regex, text, flags=re.IGNORECASE)

      if match:

        # Alert a data breach

        await post_data_breach(request)

        # Respond with a block if credit card, otherwise replace sensitive text with `*`s

        card_resp = Response.new(kind + " found\nForbidden\n", status=403,statusText="Forbidden")

        sensitive_resp = Response.new(re.sub(regex, "*"*10, text, flags=re.IGNORECASE), response)

        return card_resp if kind == "credit_card" else  sensitive_resp


    return Response.new(text, response)


```

TypeScript

```

import { Hono } from 'hono';


const app = new Hono();


// Configuration

const DEBUG = true;

const SOME_HOOK_SERVER = "https://webhook.flow-wolf.io/hook";


// Define sensitive data patterns

const sensitiveRegexsMap = {

  creditCard: String.raw`\b(?:4[0-9]{12}(?:[0-9]{3})?|(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11})\b`,

  email: String.raw`\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b`,

  phone: String.raw`\b07\d{9}\b`,

};


/**

 * Alert a data breach by posting to a webhook server

 */

async function postDataBreach(request: Request) {

  return await fetch(SOME_HOOK_SERVER, {

    method: "POST",

    headers: {

      "content-type": "application/json;charset=UTF-8",

    },

    body: JSON.stringify({

      ip: request.headers.get("cf-connecting-ip"),

      time: Date.now(),

      request: request,

    }),

  });

}


// Main middleware to handle data loss prevention

app.use('*', async (c) => {

  // Fetch the origin response

  const response = await fetch(c.req.raw);


  // Return origin response if response wasn't text

  const contentType = response.headers.get("content-type") || "";

  if (!contentType.toLowerCase().includes("text/")) {

    return response;

  }


  // Get the response text

  let text = await response.text();


  // When debugging, replace the response from the origin with an email

  text = DEBUG

    ? text.replace("You may use this", "me@example.com may use this")

    : text;


  // Check for sensitive data

  for (const kind in sensitiveRegexsMap) {

    const sensitiveRegex = new RegExp(sensitiveRegexsMap[kind], "ig");

    const match = sensitiveRegex.test(text);


    if (match) {

      // Alert a data breach

      await postDataBreach(c.req.raw);


      // Respond with a block if credit card, otherwise replace sensitive text with `*`s

      if (kind === "creditCard") {

        return c.text(`${kind} found\nForbidden\n`, 403);

      } else {

        return new Response(text.replace(sensitiveRegex, "**********"), {

          status: response.status,

          statusText: response.statusText,

          headers: response.headers,

        });

      }

    }

  }


  // Return the modified response

  return new Response(text, {

    status: response.status,

    statusText: response.statusText,

    headers: response.headers,

  });

});


export default app;


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/examples/data-loss-prevention/#page","headline":"Data loss prevention · Cloudflare Workers docs","description":"Protect sensitive data to prevent data loss, and send alerts to a webhooks server in the event of a data breach.","url":"https://developers.cloudflare.com/workers/examples/data-loss-prevention/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Security","JavaScript","TypeScript","Python"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/examples/data-loss-prevention/","name":"Data loss prevention"}}]}
```
