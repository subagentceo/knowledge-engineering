---
title: Workers Logpush
description: Send Workers Trace Event Logs to a supported third party, such as a storage or logging provider.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Workers Logpush

[Cloudflare Logpush](https://developers.cloudflare.com/logs/logpush/) supports the ability to send [Workers Trace Event Logs](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/workers%5Ftrace%5Fevents/) to a [supported destination](https://developers.cloudflare.com/logs/logpush/logpush-job/enable-destinations/). Worker’s Trace Events Logpush includes metadata about requests and responses, unstructured `console.log()` messages and any uncaught exceptions. This product is available on the Workers Paid plan. For pricing information, refer to [Pricing](https://developers.cloudflare.com/workers/platform/pricing/#workers-trace-events-logpush).

Warning

Workers Trace Events Logpush is not available for zones on the [Cloudflare China Network](https://developers.cloudflare.com/china-network/).

## Verify your Logpush access

Wrangler version

Minimum required Wrangler version: 2.2.0\. Check your version by running `wrangler --version`. To update Wrangler, refer to [Install/Update Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/).

To configure a Logpush job, verify that your Cloudflare account role can use Logpush. To check your role:

1. In the Cloudflare dashboard, go to the **Members** page.  
[ Go to **Members** ](https://dash.cloudflare.com/?to=/:account/members)
2. Check your account permissions. Roles with Logpush configuration access are different than Workers permissions. Super Administrators, Administrators, and the Log Share roles have full access to Logpush.

Alternatively, create a new [API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) scoped at the Account level with Logs Edit permissions.

## Create a Logpush job

### Via the Cloudflare dashboard

To create a Logpush job in the Cloudflare dashboard:

1. In the Cloudflare dashboard, go to the **Logpush** page.  
[ Go to **Logpush** ](https://dash.cloudflare.com/?to=/:account/logs)
2. Select **Create a Logpush job**.
3. Select a destination and configure it, if needed.
4. Select **Workers trace events** as the data set > **Next**.
5. If needed, customize your data fields. Otherwise, select **Next**.
6. Follow the instructions on the dashboard to verify ownership of your data's destination and complete job creation.

### Via cURL

The following example sends Workers logs to R2\. For more configuration options, refer to [Enable destinations](https://developers.cloudflare.com/logs/logpush/logpush-job/enable-destinations/) and [API configuration](https://developers.cloudflare.com/logs/logpush/logpush-job/api-configuration/) in the Logs documentation.

Terminal window

```

curl "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/logpush/jobs" \

--header 'X-Auth-Key: <API_KEY>' \

--header 'X-Auth-Email: <EMAIL>' \

--header 'Content-Type: application/json' \

--data '{

  "name": "workers-logpush",

  "output_options": {

    "field_names": ["Event", "EventTimestampMs", "Outcome", "Exceptions", "Logs", "ScriptName"],

  },

  "destination_conf": "r2://<BUCKET_PATH>/{DATE}?account-id=<ACCOUNT_ID>&access-key-id=<R2_ACCESS_KEY_ID>&secret-access-key=<R2_SECRET_ACCESS_KEY>",

  "dataset": "workers_trace_events",

  "enabled": true

}' | jq .


```

In Logpush, you can configure [filters](https://developers.cloudflare.com/logs/logpush/logpush-job/filters/) and a [sampling rate](https://developers.cloudflare.com/logs/logpush/logpush-job/api-configuration/#sampling-rate) to have more control of the volume of data that is sent to your configured destination. For example, if you only want to receive logs for requests that did not result in an exception, add the following `filter` JSON property below `output_options`:

`"filter":"{\"where\": {\"key\":\"Outcome\",\"operator\":\"!eq\",\"value\":\"exception\"}}"`

## Enable logging on your Worker

### Local development

Enable logging on your Worker by adding a new property, `logpush = true`, to your Wrangler file. This can be added either in the top-level configuration or under an [environment](https://developers.cloudflare.com/workers/wrangler/environments/). Any new Workers with this property will automatically get picked up by the Logpush job.

* [  wrangler.jsonc ](#tab-panel-11854)
* [  wrangler.toml ](#tab-panel-11855)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  // Top-level configuration

  "name": "my-worker",

  "main": "src/index.js",

  // Set this to today's date

  "compatibility_date": "2026-06-18",

  "workers_dev": false,

  "logpush": true,

  "route": {

    "pattern": "example.org/*",

    "zone_name": "example.org"

  }

}


```

TOML

```

"$schema" = "./node_modules/wrangler/config-schema.json"

name = "my-worker"

main = "src/index.js"

# Set this to today's date

compatibility_date = "2026-06-18"

workers_dev = false

logpush = true


[route]

pattern = "example.org/*"

zone_name = "example.org"


```

Configure via multipart script upload API:

Terminal window

```

curl --request PUT \

"https://api.cloudflare.com/client/v4/accounts/{account_id}/workers/scripts/{script_name}" \

--header "Authorization: Bearer <API_TOKEN>" \

--form 'metadata={"main_module": "my-worker.js", "logpush": true}' \

--form '"my-worker.js"=@./my-worker.js;type=application/javascript+module'


```

### Dashboard

To enable Logpush logging via the dashboard:

1. In the Cloudflare dashboard, go to the **Workers & Pages** page.  
[ Go to **Workers & Pages** ](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Select your Worker.
3. Go to **Settings** \> **Observability**.
4. For **Logpush**, select **Enable** (this is only available if you have already [created a logpush job](https://developers.cloudflare.com/workers/observability/logs/logpush/#create-a-logpush-job)).

## Limits

The `logs` and `exceptions` fields have a combined limit of 16,384 characters before fields will start being truncated. Characters are counted in the order of all `exception.name`s, `exception.message`s, and then `log.message`s.

Once that character limit is reached all fields will be truncated with `"<<<Logpush: *field* truncated>>>"` for one message before dropping logs or exceptions.

### Example

To illustrate this, suppose our Logpush event looks like the JSON below and the limit is 50 characters (rather than the actual limit of 16,384). The algorithm will:

1. Count the characters in `exception.names`:  
   1. `"SampleError"` and `"AuthError"` as 20 characters.
2. Count the characters in `exception.message`:  
   1. `"something went wrong"` counted as 20 characters leaving 10 characters remaining.  
   2. The first 10 characters of `"unable to process request authentication from client"` will be taken and counted before being truncated to `"unable to <<<Logpush: exception messages truncated>>>"`.
3. Count the characters in `log.message`:  
   1. We've already begun truncation, so `"Hello "` will be replaced with `"<<<Logpush: messages truncated>>>"` and `"World!"` will be dropped.

#### Sample Input

```

{

  "Exceptions": [

    {

      "Name": "SampleError",

      "Message": "something went wrong",

      "TimestampMs": 0

    },

    {

      "Name": "AuthError",

      "Message": "unable to process request authentication from client",

      "TimestampMs": 1

    },

  ],

  "Logs": [

    {

      "Level": "log",

      "Message": ["Hello "],

      "TimestampMs": 0

    },

    {

      "Level": "log",

      "Message": ["World!"],

      "TimestampMs": 0

    }

  ]

}


```

#### Sample Output

```

{

  "Exceptions": [

    {

      "name": "SampleError",

      "message": "something went wrong",

      "TimestampMs": 0

    },

    {

      "name": "AuthError",

      "message": "unable to <<<Logpush: exception messages truncated>>>",

      "TimestampMs": 1

    },

  ],

  "Logs": [

    {

      "Level": "log",

      "Message": ["<<<Logpush: messages truncated>>>"],

      "TimestampMs": 0

    }

  ]

}


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/observability/logs/logpush/#page","headline":"Workers Logpush · Cloudflare Workers docs","description":"Send Workers Trace Event Logs to a supported third party, such as a storage or logging provider.","url":"https://developers.cloudflare.com/workers/observability/logs/logpush/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/observability/","name":"Observability"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/observability/logs/","name":"Logs"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/observability/logs/logpush/","name":"Workers Logpush"}}]}
```
