---
title: Error codes
description: Error codes returned by the Cloudflare Queues JavaScript and REST APIs.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/queues/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Error codes

This page documents error codes returned by Queues when using the [Queues Cloudflare API](https://developers.cloudflare.com/api/resources/queues/methods/create/).

## How errors are returned

For the [JavaScript APIs](https://developers.cloudflare.com/queues/configuration/javascript-apis/), Queues operations throw exceptions that you can catch. The error code is included at the end of the `message` property:

JavaScript

```

try {

  await env.MY_QUEUE.send("message", { delaySeconds: 999999 });

    return new Response("Sent message to the queue");

} catch (error) {

  console.error(error);

  return new Response("Failed to send message to the queue", { status: 500 });

}


```

For the [Cloudflare API via HTTP](https://developers.cloudflare.com/api/resources/queues/subresources/messages/), the response will include an `errors` object which has both a `message` and `code` field:

```

{

  "errors": [

    {

      "code": 7003,

      "message": "No route for the URI",

      "documentation_url": "documentation_url",

      "source": {

        "pointer": "pointer"

      }

    }

  ],

  "messages": [

    "string"

  ],

  "success": true

}


```

## Error code reference

### Client side errors

| Error Code | Error                    | Details                                                                    | Recommended actions                                                                                                                                                                  |
| ---------- | ------------------------ | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 10104      | QueueNotFound            | Queue does not exist                                                       | Check for existence of queue\_id in [List Queues endpoint](https://developers.cloudflare.com/api/resources/queues/)                                                                  |
| 10106      | Unauthorized             | Unauthorized request                                                       | Ensure that current user has permission to push to that queue.                                                                                                                       |
| 10107      | QueueIDMalformed         | The queue ID in the request URL is not a valid queue identifier            | Ensure that queue\_id contains only alphanumeric characters.                                                                                                                         |
| 10201      | ClientDisconnected       | Client disconnected during request processing                              | Consider increasing timeout and retry message send.                                                                                                                                  |
| 10202      | BatchDelayInvalid        | Invalid batch delay                                                        | Ensure that batch\_delay is within 1 and 86400 seconds                                                                                                                               |
| 10203      | MessageMetadataInvalid   | Invalid message metadata (includes invalid content type and invalid delay) | Ensure contentType is one of text, bytes, json, or v8. Ensure the message delay does not exceed the [maximum of 24 hours](https://developers.cloudflare.com/queues/platform/limits/) |
| 10204      | MessageSizeOutOfBounds   | Message size out of bounds                                                 | Ensure that message size is within 0 and 128 KB                                                                                                                                      |
| 10205      | BatchSizeOutOfBounds     | Batch size out of bounds                                                   | Ensure that batch size is within 0 and 256 KB                                                                                                                                        |
| 10206      | BatchCountOutOfBounds    | Batch count out of bounds                                                  | Ensure that batch count is within 0 and 100 messages                                                                                                                                 |
| 10207      | JSONRequestBodyInvalid   | Request JSON body does not match expected schema                           | Ensure that JSON body matches the expected schema                                                                                                                                    |
| 10208      | JSONRequestBodyMalformed | Request body is not valid JSON                                             | [REST API](https://developers.cloudflare.com/api/resources/queues/methods/create/) request body is not valid. Look at error message for additional details.                          |

### 429 type errors

| Error Code | Error                     | Details                      | Recommended actions                                                                                                                 |
| ---------- | ------------------------- | ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| 10250      | QueueOverloaded           | Queue is overloaded          | Temporarily back off sending messages to the queue.                                                                                 |
| 10251      | QueueStorageLimitExceeded | Queue storage limit exceeded | [Purge queue](https://developers.cloudflare.com/queues/configuration/pause-purge/#purge-queue) or wait for queue to process backlog |
| 10252      | QueueDisabled             | Queue disabled               | [Unpause queue](https://developers.cloudflare.com/queues/configuration/pause-purge/#pause-delivery)                                 |
| 10253      | FreeTierLimitExceeded     | Free tier limit exceeded     | Upgrade to Workers Paid                                                                                                             |

### 500 type errors

| Error Code | Error                | Details       |
| ---------- | -------------------- | ------------- |
| 15000      | UnknownInternalError | Unknown error |

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/queues/reference/error-codes/#page","headline":"Error codes · Cloudflare Queues docs","description":"Error codes returned by the Cloudflare Queues JavaScript and REST APIs.","url":"https://developers.cloudflare.com/queues/reference/error-codes/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/queues/","name":"Queues"}},{"@type":"ListItem","position":3,"item":{"@id":"/queues/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/queues/reference/error-codes/","name":"Error codes"}}]}
```
