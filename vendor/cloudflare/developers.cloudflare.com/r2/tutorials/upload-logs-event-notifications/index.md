---
title: Log and store upload events in R2 with event notifications
description: This example provides a step-by-step guide on using event notifications to capture and store R2 upload logs in a separate bucket.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/r2/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Log and store upload events in R2 with event notifications

**Last reviewed:**  about 2 years ago 

This example provides a step-by-step guide on using [event notifications](https://developers.cloudflare.com/r2/buckets/event-notifications/) to capture and store R2 upload logs in a separate bucket.

![Push-Based R2 Event Notifications](https://developers.cloudflare.com/_astro/pushed-based-event-notification.NdMYExDK_ZD7HLg.svg) 

## 1\. Install Wrangler

To begin, refer to [Install/Update Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/#install-wrangler) to install Wrangler, the Cloudflare Developer Platform CLI.

## 2\. Create R2 buckets

You will need to create two R2 buckets:

* `example-upload-bucket`: When new objects are uploaded to this bucket, your [consumer Worker](https://developers.cloudflare.com/queues/get-started/#4-create-your-consumer-worker) will write logs.
* `example-log-sink-bucket`: Upload logs from `example-upload-bucket` will be written to this bucket.

To create the buckets, run the following Wrangler commands:

Terminal window

```

npx wrangler r2 bucket create example-upload-bucket

npx wrangler r2 bucket create example-log-sink-bucket


```

## 3\. Create a queue

Event notifications capture changes to data in `example-upload-bucket`. You will need to create a new queue to receive notifications:

Terminal window

```

npx wrangler queues create example-event-notification-queue


```

## 4\. Create a Worker

Before you enable event notifications for `example-upload-bucket`, you need to create a [consumer Worker](https://developers.cloudflare.com/queues/reference/how-queues-works/#create-a-consumer-worker) to receive the notifications.

Create a new Worker with C3 (`create-cloudflare` CLI). [C3](https://developers.cloudflare.com/pages/get-started/c3/) is a command-line tool designed to help you set up and deploy new applications, including Workers, to Cloudflare.

 npm  yarn  pnpm 

```
npm create cloudflare@latest -- consumer-worker
```

```
yarn create cloudflare consumer-worker
```

```
pnpm create cloudflare@latest consumer-worker
```

For setup, select the following options:

* For _What would you like to start with?_, choose `Hello World example`.
* For _Which template would you like to use?_, choose `Worker only`.
* For _Which language do you want to use?_, choose `TypeScript`.
* For _Do you want to use git for version control?_, choose `Yes`.
* For _Do you want to deploy your application?_, choose `No` (we will be making some changes before deploying).

Then, move into your newly created directory:

Terminal window

```

cd consumer-worker


```

## 5\. Configure your Worker

In your Worker project's \[[Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/)\](/workers/wrangler/configuration/), add a [queue consumer](https://developers.cloudflare.com/workers/wrangler/configuration/#queues) and [R2 bucket binding](https://developers.cloudflare.com/workers/wrangler/configuration/#r2-buckets). The queues consumer bindings will register your Worker as a consumer of your future event notifications and the R2 bucket bindings will allow your Worker to access your R2 bucket.

* [  wrangler.jsonc ](#tab-panel-9932)
* [  wrangler.toml ](#tab-panel-9933)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "name": "event-notification-writer",

  "main": "src/index.ts",

  // Set this to today's date

  "compatibility_date": "2026-06-18",

  "compatibility_flags": [

    "nodejs_compat"

  ],

  "queues": {

    "consumers": [

      {

        "queue": "example-event-notification-queue",

        "max_batch_size": 100,

        "max_batch_timeout": 5

      }

    ]

  },

  "r2_buckets": [

    {

      "binding": "LOG_SINK",

      "bucket_name": "example-log-sink-bucket"

    }

  ]

}


```

TOML

```

"$schema" = "./node_modules/wrangler/config-schema.json"

name = "event-notification-writer"

main = "src/index.ts"

# Set this to today's date

compatibility_date = "2026-06-18"

compatibility_flags = [ "nodejs_compat" ]


[[queues.consumers]]

queue = "example-event-notification-queue"

max_batch_size = 100

max_batch_timeout = 5


[[r2_buckets]]

binding = "LOG_SINK"

bucket_name = "example-log-sink-bucket"


```

## 6\. Write event notification messages to R2

Add a [queue handler](https://developers.cloudflare.com/queues/configuration/javascript-apis/#consumer) to `src/index.ts` to handle writing batches of notifications to our log sink bucket (you do not need a [fetch handler](https://developers.cloudflare.com/workers/runtime-apis/handlers/fetch/)):

TypeScript

```

export interface Env {

  LOG_SINK: R2Bucket;

}


export default {

  async queue(batch, env): Promise<void> {

    const batchId = new Date().toISOString().replace(/[:.]/g, "-");

    const fileName = `upload-logs-${batchId}.json`;


    // Serialize the entire batch of messages to JSON

    const fileContent = new TextEncoder().encode(

      JSON.stringify(batch.messages),

    );


    // Write the batch of messages to R2

    await env.LOG_SINK.put(fileName, fileContent, {

      httpMetadata: {

        contentType: "application/json",

      },

    });

  },

} satisfies ExportedHandler<Env>;


```

## 7\. Deploy your Worker

To deploy your consumer Worker, run the [wrangler deploy](https://developers.cloudflare.com/workers/wrangler/commands/general/#deploy) command:

Terminal window

```

npx wrangler deploy


```

## 8\. Enable event notifications

Now that you have your consumer Worker ready to handle incoming event notification messages, you need to enable event notifications with the [wrangler r2 bucket notification create command](https://developers.cloudflare.com/workers/wrangler/commands/r2/#r2-bucket-notification-create) for `example-upload-bucket`:

Terminal window

```

npx wrangler r2 bucket notification create example-upload-bucket --event-type object-create --queue example-event-notification-queue


```

## 9\. Test

Now you can test the full end-to-end flow by uploading an object to `example-upload-bucket` in the Cloudflare dashboard. After you have uploaded an object, logs will appear in `example-log-sink-bucket` in a few seconds.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/r2/tutorials/upload-logs-event-notifications/#page","headline":"Log and store upload events in R2 with event notifications · Cloudflare R2 docs","description":"This example provides a step-by-step guide on using event notifications to capture and store R2 upload logs in a separate bucket.","url":"https://developers.cloudflare.com/r2/tutorials/upload-logs-event-notifications/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-03-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["TypeScript"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/r2/","name":"R2"}},{"@type":"ListItem","position":3,"item":{"@id":"/r2/tutorials/","name":"Tutorials"}},{"@type":"ListItem","position":4,"item":{"@id":"/r2/tutorials/upload-logs-event-notifications/","name":"Log and store upload events in R2 with event notifications"}}]}
```
