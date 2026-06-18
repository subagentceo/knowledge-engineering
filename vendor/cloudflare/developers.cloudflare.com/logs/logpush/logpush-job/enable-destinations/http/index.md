---
title: Enable HTTP destination
description: Push Cloudflare logs to a custom HTTP endpoint.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/logs/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Enable HTTP destination

Cloudflare Logpush now supports the ability to send logs to configurable HTTP endpoints.

Note that when using Logpush to HTTP endpoints, Cloudflare customers are expected to perform their own authentication of the pushed logs. For example, customers may specify a secret token in the URL or an HTTP header of the Logpush destination.

Endpoint requirements

Cloudflare expects that the endpoint is available over HTTPS, using a trusted certificate. The endpoint must accept `POST` requests.

## Manage via the Cloudflare dashboard

1. In the Cloudflare dashboard, go to the **Logpush** page at the account or or domain (also known as zone) level.  
For account: [ Go to **Logpush** ](https://dash.cloudflare.com/?to=/:account/logs)  
For domain (also known as zone): [ Go to **Logpush** ](https://dash.cloudflare.com/?to=/:account/:zone/analytics/logs)
2. Depending on your choice, you have access to [account-scoped datasets](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/) and [zone-scoped datasets](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/zone/), respectively.
3. Select **Create a Logpush job**.
1. In **Select a destination**, choose **HTTP destination**.
2. Enter the **HTTP endpoint** where you want to send the logs to, and select **Continue**. - You can use `"header_*"` URL parameters to set request headers, for example, to pass an authentication token to your HTTP endpoint.
3. Select the dataset to push to the storage service.
4. In the next step, you need to configure your logpush job:  
   * Enter the **Job name**.  
   * Under **If logs match**, you can select the events to include and/or remove from your logs. Refer to [Filters](https://developers.cloudflare.com/logs/logpush/logpush-job/filters/) for more information. Not all datasets have this option available.  
   * In **Send the following fields**, you can choose to either push all logs to your storage destination or selectively choose which logs you want to push.
5. In **Advanced Options**, you can:  
   * Choose the format of timestamp fields in your logs (`RFC3339` (default), `Unix`, or `UnixNano`).  
   * Select a [sampling rate](https://developers.cloudflare.com/logs/logpush/logpush-job/api-configuration/#sampling-rate) for your logs or push a randomly-sampled percentage of logs.  
   * Enable redaction for `CVE-2021-44228`. This option will replace every occurrence of `${` with `x{`.
6. Select **Submit** once you are done configuring your logpush job.

## Manage via API

To create a Logpush job, make a `POST` request to the [Logpush job creation endpoint URL](https://developers.cloudflare.com/logs/logpush/logpush-job/api-configuration/) with the appropriate parameters.

The supported parameters are as follows:

* Fields that are unchanged from other sources:  
   * **dataset** (required): For example, `http_requests`.  
   * **name** (optional): We suggest using your domain name as the job name.  
   * **output\_options** (optional): Refer to [Log Output Options](https://developers.cloudflare.com/logs/logpush/logpush-job/log-output-options/) to configure fields, sample rate, and timestamp format.
* Unique fields:  
   * **destination\_conf**: Where to send the logs. This consists of an endpoint URL and HTTP headers used.  
         * Any `"header_*"` URL parameters will be used to set request headers.  
                  * The HTTPS endpoint cannot have custom URL parameters that conflicts with any `"header_*"` URL parameters you have set.  
                  * These parameters must be properly URL-encoded (that is, use `"%20"` for a whitespace), otherwise some special characters may be decoded incorrectly.  
         * `destination_conf` may have more URL parameters in addition to special `"header_*"` parameters.  
                  * Non URL-encoded special characters will be encoded when uploading.  
         * Example: `https://logs.example.com?header_Authorization=Basic%20REDACTED&tags=host:theburritobot.com,dataset:http_requests`  
   * **max\_upload\_bytes** (optional): The maximum uncompressed file size of a batch of logs. This setting value must be between 5 MB and 1 GB. Note that you cannot set a minimum file size; this means that log files may be much smaller than this batch size.  
   * **max\_upload\_records** (optional): The maximum number of log lines per batch. This setting must be between 1,000 and 1,000,000 lines. Note that you cannot to specify a minimum number of log lines per batch; this means that log files may contain many fewer lines than this.

Note

The `ownership_challenge` parameter is not required to create a Logpush job to an HTTP endpoint. You need to make sure that the file upload to validate the destination accepts a gzipped `test.txt.gz` with content as `{"content":"tests"}` compressed, otherwise it will return an error, like `error validating destination: error writing object: error uploading`.

Example request using cURL:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Logs Write`

Create Logpush job

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/logpush/jobs" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "<DOMAIN_NAME>",

    "destination_conf": "https://logs.example.com?header_Authorization=Basic%20REDACTED&tags=host:theburritobot.com,dataset:http_requests",

    "output_options": {

        "field_names": [

            "ClientIP",

            "ClientRequestHost",

            "ClientRequestMethod",

            "ClientRequestURI",

            "EdgeEndTimestamp",

            "EdgeResponseBytes",

            "EdgeResponseStatus",

            "EdgeStartTimestamp",

            "RayID"

        ],

        "timestamp_format": "rfc3339"

    },

    "max_upload_bytes": 5000000,

    "max_upload_records": 1000,

    "dataset": "http_requests",

    "enabled": true

  }'


```

Response:

```

{

  "errors": [],

  "messages": [],

  "result": {

    "id": <JOB_ID>,

    "dataset": "http_requests",

    "kind": "",

    "max_upload_bytes": 5000000,

    "max_upload_records": 1000,

    "enabled": true,

    "name": "<DOMAIN_NAME>",

    "output_options": {

      "field_names": ["ClientIP", "ClientRequestHost", "ClientRequestMethod", "ClientRequestURI", "EdgeEndTimestamp", "EdgeResponseBytes", "EdgeResponseStatus" ,"EdgeStartTimestamp", "RayID"],

      "timestamp_format": "rfc3339"

    },

    "destination_conf": "https://logs.example.com?header_Authorization=Basic%20REDACTED&tags=host:theburritobot.com,dataset:http_requests",

    "last_complete": null,

    "last_error": null,

    "error_message": null

  },

  "success": true

}


```

Refer to [Manage Logpush with cURL](https://developers.cloudflare.com/logs/logpush/examples/example-logpush-curl/) to update a job (including enabling and disabling).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/logs/logpush/logpush-job/enable-destinations/http/#page","headline":"Enable HTTP destination · Cloudflare Logs docs","description":"Push Cloudflare logs to a custom HTTP endpoint.","url":"https://developers.cloudflare.com/logs/logpush/logpush-job/enable-destinations/http/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/logs/","name":"Logs"}},{"@type":"ListItem","position":3,"item":{"@id":"/logs/logpush/","name":"Logpush"}},{"@type":"ListItem","position":4,"item":{"@id":"/logs/logpush/logpush-job/","name":"Logpush job setup"}},{"@type":"ListItem","position":5,"item":{"@id":"/logs/logpush/logpush-job/enable-destinations/","name":"Enable destinations"}},{"@type":"ListItem","position":6,"item":{"@id":"/logs/logpush/logpush-job/enable-destinations/http/","name":"Enable HTTP destination"}}]}
```
