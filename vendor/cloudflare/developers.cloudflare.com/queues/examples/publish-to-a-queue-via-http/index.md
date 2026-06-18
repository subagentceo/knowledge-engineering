---
title: Publish to a Queue via HTTP
description: Publish to a Queue directly via HTTP and Workers.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/queues/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Publish to a Queue via HTTP

**Last reviewed:**  11 months ago 

Publish to a Queue directly via HTTP.

The following example shows you how to publish messages to a Queue from any HTTP client, using a Cloudflare API token to authenticate.

This allows you to write to a Queue from any service or programming language that supports HTTP, including Go, Rust, Python or even a Bash script.

## Prerequisites

* A [queue created](https://developers.cloudflare.com/queues/get-started/#3-create-a-queue) via the [Cloudflare dashboard ↗](https://dash.cloudflare.com) or the [wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/).
* A Cloudflare API token with the `Queues Edit` permission.

### 1\. Send a test message

To make sure you successfully authenticate and write a message to your queue, use `curl` on the command line:

Terminal window

```

# Make sure to replace the placeholder with your shared secret

curl -XPOST -H "Authorization: Bearer <paste-your-api-token-here>" "https://api.cloudflare.com/client/v4/accounts/<paste-your-account-id-here>/queues/<paste-your-queue-id-here>/messages" --data '{ "body": { "greeting": "hello" } }'


```

```

{"success":true}


```

This will issue a HTTP POST request, and if successful, return a HTTP 200 with a `success: true` response body.

* If you receive a HTTP 403, this is because your API token is invalid or does not have the `Queues Edit` permission.

For full documentation about the HTTP Push API, refer to the [Cloudflare API documentation ↗](https://developers.cloudflare.com/api/resources/queues/subresources/messages/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/queues/examples/publish-to-a-queue-via-http/#page","headline":"Queues - Publish Directly via HTTP · Cloudflare Queues docs","description":"Publish to a Queue directly via HTTP and Workers.","url":"https://developers.cloudflare.com/queues/examples/publish-to-a-queue-via-http/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/queues/","name":"Queues"}},{"@type":"ListItem","position":3,"item":{"@id":"/queues/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/queues/examples/publish-to-a-queue-via-http/","name":"Publish to a Queue via HTTP"}}]}
```
