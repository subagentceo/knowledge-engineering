---
title: Real-time logs
description: Debug your Worker application by accessing logs and exceptions through the Cloudflare dashboard or `wrangler tail`.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Real-time logs

With Real-time logs, access all your log events in near real-time for log events happening globally. Real-time logs is helpful for immediate feedback, such as the status of a new deployment.

Real-time logs captures [invocation logs](https://developers.cloudflare.com/workers/observability/logs/workers-logs/#invocation-logs), [custom logs](https://developers.cloudflare.com/workers/observability/logs/workers-logs/#custom-logs), errors, and uncaught exceptions. For high-traffic applications, real-time logs may enter sampling mode, which means some messages will be dropped and a warning will appear in your logs.

Warning

Real-time logs are not available for zones on the [Cloudflare China Network](https://developers.cloudflare.com/china-network/).

## View logs from the dashboard

To view real-time logs associated with any deployed Worker using the Cloudflare dashboard:

1. In the Cloudflare dashboard, go to the **Workers & Pages** page.  
[ Go to **Workers & Pages** ](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. In **Overview**, select your **Worker**.
3. Select **Logs**.
4. In the right-hand navigation bar, select **Live**.

## View logs using `wrangler tail`

To view real-time logs associated with any deployed Worker using Wrangler:

1. Go to your Worker project directory.
2. Run [npx wrangler tail](https://developers.cloudflare.com/workers/wrangler/commands/general/#tail).

This will log any incoming requests to your application available in your local terminal.

The output of each `wrangler tail` log is a structured JSON object:

```

{

  "outcome": "ok",

  "scriptName": null,

  "exceptions": [],

  "logs": [],

  "eventTimestamp": 1590680082349,

  "event": {

    "request": {

      "url": "https://www.bytesized.xyz/",

      "method": "GET",

      "headers": {},

      "cf": {}

    }

  }

}


```

By piping the output to tools like [jq ↗](https://stedolan.github.io/jq/), you can query and manipulate the requests to look for specific information:

Terminal window

```

npx wrangler tail | jq .event.request.url


```

```

"https://www.bytesized.xyz/"

"https://www.bytesized.xyz/component---src-pages-index-js-a77e385e3bde5b78dbf6.js"

"https://www.bytesized.xyz/page-data/app-data.json"


```

You can customize how `wrangler tail` works to fit your needs. Refer to [the wrangler tail documentation](https://developers.cloudflare.com/workers/wrangler/commands/general/#tail) for available configuration options.

## Limits

Note

You can filter real-time logs in the dashboard or using [wrangler tail](https://developers.cloudflare.com/workers/wrangler/commands/general/#tail). If your Worker has a high volume of messages, filtering real-time logs can help mitigate messages from being dropped.

* Real-time logs does not store Workers Logs. To store logs, use [Workers Logs](https://developers.cloudflare.com/workers/observability/logs/workers-logs).
* If your Worker has a high volume of traffic, the real-time logs might enter sampling mode. This will cause some of your messages to be dropped and a warning to appear in your logs.
* Logs from any [Durable Objects](https://developers.cloudflare.com/durable-objects/) your Worker is using will show up in the dashboard.
* A maximum of 10 clients can view a Worker's logs at one time. This can be a combination of either dashboard sessions or `wrangler tail` calls.
* When using `wrangler tail` with [WebSocket event handlers](https://developers.cloudflare.com/workers/runtime-apis/websockets/), any `console.log` statements within those handlers are hidden until the WebSocket client closes the connection. Once the `close` is received, all messages are flushed, printing everything to the terminal at once.

## Persist logs

Logs can be persisted, filtered, and analyzed with [Workers Logs](https://developers.cloudflare.com/workers/observability/logs/workers-logs). To send logs to a third party, use [Workers Logpush](https://developers.cloudflare.com/workers/observability/logs/logpush/) or [Tail Workers](https://developers.cloudflare.com/workers/observability/logs/tail-workers/).

## Related resources

* [Errors and exceptions](https://developers.cloudflare.com/workers/observability/errors/) \- Review common Workers errors.
* [Local development and testing](https://developers.cloudflare.com/workers/development-testing/) \- Develop and test you Workers locally.
* [Workers Logs](https://developers.cloudflare.com/workers/observability/logs/workers-logs) \- Collect, store, filter and analyze logging data emitted from Cloudflare Workers.
* [Logpush](https://developers.cloudflare.com/workers/observability/logs/logpush/) \- Learn how to push Workers Trace Event Logs to supported destinations.
* [Tail Workers](https://developers.cloudflare.com/workers/observability/logs/tail-workers/) \- Learn how to attach Tail Workers to transform your logs and send them to HTTP endpoints.
* [Source maps and stack traces](https://developers.cloudflare.com/workers/observability/source-maps) \- Learn how to enable source maps and generate stack traces for Workers.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/observability/logs/real-time-logs/#page","headline":"Real-time logs · Cloudflare Workers docs","description":"Debug your Worker application by accessing logs and exceptions through the Cloudflare dashboard or wrangler tail.","url":"https://developers.cloudflare.com/workers/observability/logs/real-time-logs/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/observability/","name":"Observability"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/observability/logs/","name":"Logs"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/observability/logs/real-time-logs/","name":"Real-time logs"}}]}
```
