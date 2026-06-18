---
title: Deploy a real-time chat application
description: This tutorial shows how to deploy a serverless, real-time chat application. The chat application uses a Durable Object to control each chat room.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Deploy a real-time chat application

**Last reviewed:**  almost 3 years ago 

In this tutorial, you will deploy a serverless, real-time chat application that runs using [Durable Objects](https://developers.cloudflare.com/durable-objects/).

This chat application uses a Durable Object to control each chat room. Users connect to the Object using WebSockets. Messages from one user are broadcast to all the other users. The chat history is also stored in durable storage. Real-time messages are relayed directly from one user to others without going through the storage layer.

## Before you start

All of the tutorials assume you have already completed the [Get started guide](https://developers.cloudflare.com/workers/get-started/guide/), which gets you set up with a Cloudflare Workers account, [C3 ↗](https://github.com/cloudflare/workers-sdk/tree/main/packages/create-cloudflare), and [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/).

## Clone the chat application repository

Open your terminal and clone the [workers-chat-demo ↗](https://github.com/cloudflare/workers-chat-demo) repository:

Terminal window

```

git clone https://github.com/cloudflare/workers-chat-demo.git


```

## Authenticate Wrangler

After you have cloned the repository, authenticate Wrangler by running:

Terminal window

```

npx wrangler login


```

## Deploy your project

When you are ready to deploy your application, run:

Terminal window

```

npx wrangler deploy


```

Your application will be deployed to your `*.workers.dev` subdomain.

To deploy your application to a custom domain within the Cloudflare dashboard, go to your Worker > **Triggers** \> **Add Custom Domain**.

To deploy your application to a custom domain using Wrangler, open your project's [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/).

To configure a route in your Wrangler configuration file, add the following to your environment:

* [  wrangler.jsonc ](#tab-panel-12175)
* [  wrangler.toml ](#tab-panel-12176)

JSONC

```

{

  "routes": [

    {

      "pattern": "example.com/about",

      "zone_id": "<YOUR_ZONE_ID>"

    }

  ]

}


```

TOML

```

[[routes]]

pattern = "example.com/about"

zone_id = "<YOUR_ZONE_ID>"


```

If you have specified your zone ID in the environment of your Wrangler configuration file, you will not need to write it again in object form.

To configure a subdomain in your Wrangler configuration file, add the following to your environment:

* [  wrangler.jsonc ](#tab-panel-12177)
* [  wrangler.toml ](#tab-panel-12178)

JSONC

```

{

  "routes": [

    {

      "pattern": "subdomain.example.com",

      "custom_domain": true

    }

  ]

}


```

TOML

```

[[routes]]

pattern = "subdomain.example.com"

custom_domain = true


```

To test your live application:

1. In the Cloudflare dashboard, go to the **Workers & Pages** page.  
[ Go to **Workers & Pages** ](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Select your Worker > **Triggers** \> **Routes** \> Select the `edge-chat-demo.<SUBDOMAIN>.workers.dev` route.
3. Enter a name in the **your name** field.
4. Choose whether to enter a public room or create a private room.
5. Send the link to other participants. You will be able to view room participants on the right side of the screen.

## Uninstall your application

To uninstall your chat application, modify your Wrangler file to remove the `durable_objects` bindings and add a `deleted_classes` migration:

* [  wrangler.jsonc ](#tab-panel-12179)
* [  wrangler.toml ](#tab-panel-12180)

JSONC

```

{

  "durable_objects": {

    "bindings": []

  },

  // Indicate that you want the ChatRoom and RateLimiter classes to be callable as Durable Objects.

  "migrations": [

    {

      "tag": "v1",

      "new_sqlite_classes": [

        "ChatRoom",

        "RateLimiter"

      ]

    },

    {

      "tag": "v2", // Should be unique for each entry

      "deleted_classes": [

        "ChatRoom",

        "RateLimiter"

      ]

    }

  ]

}


```

TOML

```

[durable_objects]

bindings = [ ]


[[migrations]]

tag = "v1"

new_sqlite_classes = [ "ChatRoom", "RateLimiter" ]


[[migrations]]

tag = "v2"

deleted_classes = [ "ChatRoom", "RateLimiter" ]


```

Then run `npx wrangler deploy`.

To delete your Worker:

1. In the Cloudflare dashboard, go to the **Workers & Pages** page.  
[ Go to **Workers & Pages** ](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. In **Overview**, select your Worker.
3. Select **Manage Service** \> **Delete**. For complete instructions on set up and deletion, refer to the `README.md` in your cloned repository.

By completing this tutorial, you have deployed a real-time chat application with Durable Objects and Cloudflare Workers.

## Related resources

Continue building with other Cloudflare Workers tutorials below.

* [Build a Slackbot](https://developers.cloudflare.com/workers/tutorials/build-a-slackbot/)
* [Create SMS notifications for your GitHub repository using Twilio](https://developers.cloudflare.com/workers/tutorials/github-sms-notifications-using-twilio/)
* [Build a QR code generator](https://developers.cloudflare.com/workers/tutorials/build-a-qr-code-generator/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/tutorials/deploy-a-realtime-chat-app/#page","headline":"Deploy a real-time chat application · Cloudflare Workers docs","description":"This tutorial shows how to deploy a serverless, real-time chat application. The chat application uses a Durable Object to control each chat room.","url":"https://developers.cloudflare.com/workers/tutorials/deploy-a-realtime-chat-app/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-01-29","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["JavaScript"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/tutorials/","name":"Tutorials"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/tutorials/deploy-a-realtime-chat-app/","name":"Deploy a real-time chat application"}}]}
```
