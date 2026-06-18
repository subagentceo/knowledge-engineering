---
title: Add custom HTTP headers
description: Customize HTTP headers on Cloudflare Pages using a Workers function.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/pages/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Add custom HTTP headers

Note

Cloudflare provides HTTP header customization for Pages projects by adding a `_headers` file to your project. Refer to the [documentation](https://developers.cloudflare.com/pages/configuration/headers/) for more information.

More advanced customization of HTTP headers is available through Cloudflare Workers [serverless functions ↗](https://www.cloudflare.com/learning/serverless/what-is-serverless/).

If you have not deployed a Worker before, get started with our [tutorial](https://developers.cloudflare.com/workers/get-started/guide/). For the purpose of this tutorial, accomplish steps one (Sign up for a Workers account) through four (Generate a new project) before returning to this page.

Before continuing, ensure that your Cloudflare Pages project is connected to a [custom domain](https://developers.cloudflare.com/pages/configuration/custom-domains/#add-a-custom-domain).

## Writing a Workers function

Workers functions are written in [JavaScript ↗](https://www.cloudflare.com/learning/serverless/serverless-javascript/). When a Worker makes a request to a Cloudflare Pages application, it will receive a response. The response a Worker receives is immutable, meaning it cannot be changed. In order to add, delete, or alter headers, clone the response and modify the headers on a new `Response` instance. Return the new response to the browser with your desired header changes. An example of this is shown below:

Setting custom headers with a Workers function

```

export default {

  async fetch(request) {

    // This proxies your Pages application under the condition that your Worker script is deployed on the same custom domain as your Pages project

    const response = await fetch(request);


    // Clone the response so that it is no longer immutable

    const newResponse = new Response(response.body, response);


    // Add a custom header with a value

    newResponse.headers.append(

      "x-workers-hello",

      "Hello from Cloudflare Workers",

    );


    // Delete headers

    newResponse.headers.delete("x-header-to-delete");

    newResponse.headers.delete("x-header2-to-delete");


    // Adjust the value for an existing header

    newResponse.headers.set("x-header-to-change", "NewValue");


    return newResponse;

  },

};


```

## Deploying a Workers function in the dashboard

The easiest way to start deploying your Workers function is by typing [workers.new ↗](https://workers.new/) in the browser. Log in to your account to be automatically directed to the Workers & Pages dashboard. From the Workers & Pages dashboard, write your function or use one of the [examples from the Workers documentation](https://developers.cloudflare.com/workers/examples/).

Select **Save and Deploy** when your script is ready and set a [route](https://developers.cloudflare.com/workers/configuration/routing/routes/) in your domain's zone settings.

For example, [here is a Workers script](https://developers.cloudflare.com/workers/examples/security-headers/) you can copy and paste into the Workers dashboard that sets common security headers whenever a request hits your Pages URL, such as X-XSS-Protection, X-Frame-Options, X-Content-Type-Options, Strict-Transport-Security, Content-Security-Policy (CSP), and more.

## Deploying a Workers function using the CLI

If you would like to skip writing this file yourself, you can use our `custom-headers-example` [template ↗](https://github.com/kristianfreeman/custom-headers-example) to generate a new Workers function with [wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/), the Workers CLI tool.

Generating a serverless function with wrangler

```

git clone https://github.com/cloudflare/custom-headers-example

cd custom-headers-example

npm install


```

To operate your Workers function alongside your Pages application, deploy it to the same custom domain as your Pages application. To do this, update the Wrangler file in your project with your account and zone details:

* [  wrangler.jsonc ](#tab-panel-9443)
* [  wrangler.toml ](#tab-panel-9444)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "name": "custom-headers-example",

  "account_id": "FILL-IN-YOUR-ACCOUNT-ID",

  "workers_dev": false,

  "route": "FILL-IN-YOUR-WEBSITE.com/*",

  "zone_id": "FILL-IN-YOUR-ZONE-ID"

}


```

TOML

```

"$schema" = "./node_modules/wrangler/config-schema.json"

name = "custom-headers-example"

account_id = "FILL-IN-YOUR-ACCOUNT-ID"

workers_dev = false

route = "FILL-IN-YOUR-WEBSITE.com/*"

zone_id = "FILL-IN-YOUR-ZONE-ID"


```

If you do not know how to find your Account ID and Zone ID, refer to [our guide](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/).

Once you have configured your [Wrangler configuration file](https://developers.cloudflare.com/pages/functions/wrangler-configuration/) , run `npx wrangler deploy` in your terminal to deploy your Worker:

Terminal window

```

npx wrangler deploy


```

After you have deployed your Worker, your desired HTTP header adjustments will take effect. While the Worker is deployed, you should continue to see the content from your Pages application as normal.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pages/how-to/add-custom-http-headers/#page","headline":"Add custom HTTP headers · Cloudflare Pages docs","description":"Customize HTTP headers on Cloudflare Pages using a Workers function.","url":"https://developers.cloudflare.com/pages/how-to/add-custom-http-headers/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/pages/","name":"Pages"}},{"@type":"ListItem","position":3,"item":{"@id":"/pages/how-to/","name":"How to"}},{"@type":"ListItem","position":4,"item":{"@id":"/pages/how-to/add-custom-http-headers/","name":"Add custom HTTP headers"}}]}
```
