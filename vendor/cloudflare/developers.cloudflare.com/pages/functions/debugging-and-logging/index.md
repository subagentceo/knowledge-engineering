---
title: Debugging and logging
description: Access logs for Pages Functions using the Cloudflare dashboard or Wrangler CLI.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/pages/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Debugging and logging

Access your Functions logs by using the Cloudflare dashboard or the [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/commands/pages/#pages-deployment-tail).

Logs are a powerful debugging tool that can help you test and monitor the behavior of your Pages Functions once they have been deployed. Logs are available for every deployment of your Pages project.

Logs provide detailed information about events and can give insight into:

* Successful or failed requests to your Functions.
* Uncaught exceptions thrown by your Functions.
* Custom `console.log`s declared within your Functions.
* Production issues that cannot be easily reproduced.
* Real-time view of incoming requests to your application.

There are two ways to start a logging session:

1. Run `wrangler pages deployment tail` [in your terminal](https://developers.cloudflare.com/pages/functions/debugging-and-logging/#view-logs-with-wrangler).
2. Use the [Cloudflare dashboard](https://developers.cloudflare.com/pages/functions/debugging-and-logging/#view-logs-in-the-cloudflare-dashboard).

## Add custom logs

Custom logs are `console.log()` statements that you can add yourself inside your Functions. When streaming logs for deployments that contain these Functions, the statements will appear in both `wrangler pages deployment tail` and dashboard outputs.

Below is an example of a custom `console.log` statement inside a Pages Function:

JavaScript

```

export async function onRequest(context) {

  console.log(

    `[LOGGING FROM /hello]: Request came from ${context.request.url}`,

  );


  return new Response("Hello, world!");

}


```

After you deploy the code above, run `wrangler pages deployment tail` in your terminal. Then access the route at which your Function lives. Your terminal will display:

![Run wrangler pages deployment tail](https://developers.cloudflare.com/_astro/wrangler-custom-logs.F03OQgj6_1C7gX.webp) 

Your dashboard will display:

![Follow the above steps to access custom logs in the dashboard](https://developers.cloudflare.com/_astro/dash-custom-logs.Csgu9Rye_Z1fqHri.webp) 

## View logs with Wrangler

`wrangler pages deployment tail` enables developers to livestream logs for a specific project and deployment.

To get started, run `wrangler pages deployment tail` in your Pages project directory. This will log any incoming requests to your application in your local terminal.

The output of each `wrangler pages deployment tail` log is a structured JSON object:

JavaScript

```

{

  "outcome": "ok",

  "scriptName": null,

  "exceptions": [

    {

      "stack": "    at src/routes/index.tsx17:4\n    at new Promise (<anonymous>)\n",

      "name": "Error",

      "message": "An error has occurred",

      "timestamp": 1668542036110

    }

  ],

  "logs": [],

  "eventTimestamp": 1668542036104,

  "event": {

    "request": {

      "url": "https://pages-fns.pages.dev",

      "method": "GET",

      "headers": {},

      "cf": {}

    },

    "response": {

      "status": 200

    }

  },

  "id": 0

}


```

`wrangler pages deployment tail` allows you to customize a logging session to better suit your needs. Refer to the [wrangler pages deployment tail documentation](https://developers.cloudflare.com/workers/wrangler/commands/pages/#pages-deployment-tail) for available configuration options.

## View logs in the Cloudflare Dashboard

To view logs for your `production` or `preview` environments associated with any deployment:

1. In the Cloudflare dashboard, go to the **Workers & Pages** page.  
[ Go to **Workers & Pages** ](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Select your Pages project, go to the deployment you want to view logs for and select **View details** \> **Functions**.

Logging is available for all customers (Free, Paid, Enterprise).

## Limits

The following limits apply to Functions logs:

* Logs are not stored. You can start and stop the stream at any time to view them, but they do not persist.
* Logs will not display if the Function’s requests per second are over 100 for the last five minutes.
* Logs from any [Durable Objects](https://developers.cloudflare.com/pages/functions/bindings/#durable-objects) your Functions bind to will show up in the Cloudflare dashboard.
* A maximum of 10 clients can view a deployment’s logs at one time. This can be a combination of either dashboard sessions or `wrangler pages deployment tail` calls.

## Sourcemaps

If you're debugging an uncaught exception, you might find that the [stack traces ↗](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global%5FObjects/Error/stack) in your logs contain line numbers to generated JavaScript files. Using Pages' support for [source maps ↗](https://web.dev/articles/source-maps) you can get stack traces that match with the line numbers and symbols of your original source code.

Note

When developing fullstack applications, many build tools (including wrangler for Pages Functions and most fullstack frameworks) will generate source maps for both the client and server, ensure your build step is configured to only emit server sourcemaps or use an additional build step to remove the client source maps. Public source maps might expose the source code of your application to the user.

Refer to [Source maps and stack traces](https://developers.cloudflare.com/pages/functions/source-maps/) for an in-depth explanation.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pages/functions/debugging-and-logging/#page","headline":"Debugging and logging · Cloudflare Pages docs","description":"Access logs for Pages Functions using the Cloudflare dashboard or Wrangler CLI.","url":"https://developers.cloudflare.com/pages/functions/debugging-and-logging/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/pages/","name":"Pages"}},{"@type":"ListItem","position":3,"item":{"@id":"/pages/functions/","name":"Functions"}},{"@type":"ListItem","position":4,"item":{"@id":"/pages/functions/debugging-and-logging/","name":"Debugging and logging"}}]}
```
