---
title: Enable SentinelOne
description: Push Cloudflare logs to SentinelOne Data Lake.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/logs/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Enable SentinelOne

The HTTP Event Collector (HEC) is a reliable method to send log data to SentinelOne Singularity Data Lake. Cloudflare Logpush supports pushing logs directly to SentinelOne HEC via the Cloudflare dashboard or API.

## Manage via the Cloudflare dashboard

1. In the Cloudflare dashboard, go to the **Logpush** page at the account or or domain (also known as zone) level.  
For account: [ Go to **Logpush** ](https://dash.cloudflare.com/?to=/:account/logs)  
For domain (also known as zone): [ Go to **Logpush** ](https://dash.cloudflare.com/?to=/:account/:zone/analytics/logs)
2. Depending on your choice, you have access to [account-scoped datasets](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/) and [zone-scoped datasets](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/zone/), respectively.
3. Select **Create a Logpush job**.
1. In **Select a destination**, choose **SentinelOne**.
2. Enter or select the following destination information:  
   * **SentinelOne HEC URL**  
   * **Auth Token** \- Event Collector token.  
   * **Source Type** \- For example, `marketplace-cloudflare-latest`.

When you are done entering the destination details, select **Continue**.

1. Select the dataset to push to the storage service.
2. In the next step, you need to configure your logpush job:  
   * Enter the **Job name**.  
   * Under **If logs match**, you can select the events to include and/or remove from your logs. Refer to [Filters](https://developers.cloudflare.com/logs/logpush/logpush-job/filters/) for more information. Not all datasets have this option available.  
   * In **Send the following fields**, you can choose to either push all logs to your storage destination or selectively choose which logs you want to push.
3. In **Advanced Options**, you can:  
   * Choose the format of timestamp fields in your logs (`RFC3339` (default), `Unix`, or `UnixNano`).  
   * Select a [sampling rate](https://developers.cloudflare.com/logs/logpush/logpush-job/api-configuration/#sampling-rate) for your logs or push a randomly-sampled percentage of logs.  
   * Enable redaction for `CVE-2021-44228`. This option will replace every occurrence of `${` with `x{`.
4. Select **Submit** once you are done configuring your logpush job.

## Manage via API

To set up a SentinelOne Logpush job:

1. Create a job with the appropriate endpoint URL and authentication parameters.
2. Enable the job to begin pushing logs.

Note

Unlike configuring Logpush jobs for AWS S3, GCS, or Azure, there is no ownership challenge when configuring Logpush to SentinelOne.

Ensure **Log Share** permissions are enabled, before attempting to read or configure a Logpush job. For more information refer to the [Roles section](https://developers.cloudflare.com/logs/logpush/permissions/#roles).

### 1\. Create a job

To create a job, make a `POST` request to the Logpush jobs endpoint with the following fields:

* **name** (optional) - Use your domain name as the job name.
* **destination\_conf** \- A log destination consisting of an endpoint URL, source type, authorization header in the string format below.  
   * **<SENTINELONE\_ENDPOINT\_URL>**: The SentinelOne raw HTTP Event Collector URL with port. For example: `sentinelone://ingest.us1.sentinelone.net/services/collector/raw`. Cloudflare expects the SentinelOne endpoint to be `/services/collector/raw` while configuring and setting up the Logpush job.  
   * **<SENTINELONE\_AUTH\_TOKEN>**: The SentinelOne authorization token that is URL-encoded. For example: `Bearer 0e6d94e8c-5792-4ad1-be3c-29bcaee0197d`.  
   * **<SOURCE\_TYPE>**: The SentinelOne source type. For example: `marketplace-cloudflare-latest`.

Terminal window

```

"https://<SENTINELONE_ENDPOINT_URL>?sourcetype=<SOURCE_TYPE>&header_Authorization=<SENTINELONE_AUTH_TOKEN>"


```

* **dataset** \- The category of logs you want to receive. Refer to [Datasets](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/) for the full list of supported datasets.
* **output\_options** (optional) - To configure fields, sample rate, and timestamp format, refer to [Log Output Options](https://developers.cloudflare.com/logs/logpush/logpush-job/log-output-options/). For timestamp, Cloudflare recommends using `timestamps=rfc3339`.

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

    "destination_conf": "sentinelone://<SENTINELONE_ENDPOINT_URL>?sourcetype=<SOURCE_TYPE>&header_Authorization=<SENTINELONE_AUTH_TOKEN>",

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

    "enabled": true,

    "name": "<DOMAIN_NAME>",

    "output_options": {

      "field_names": ["ClientIP", "ClientRequestHost", "ClientRequestMethod", "ClientRequestURI", "EdgeEndTimestamp","EdgeResponseBytes", "EdgeResponseStatus", "EdgeStartTimestamp", "RayID"],

      "timestamp_format": "rfc3339"

    },

    "destination_conf": "sentinelone://<SENTINELONE_ENDPOINT_URL>?sourcetype=<SOURCE_TYPE>&header_Authorization=<SENTINELONE_AUTH_TOKEN>",

    "last_complete": null,

    "last_error": null,

    "error_message": null

  },

  "success": true

}


```

Refer to [Manage Logpush with cURL](https://developers.cloudflare.com/logs/logpush/examples/example-logpush-curl/) to update a job (including enabling and disabling).

Refer to the [Logpush FAQ](https://developers.cloudflare.com/logs/faq/logpush/) for troubleshooting information.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/logs/logpush/logpush-job/enable-destinations/sentinelone/#page","headline":"Enable Logpush to SentinelOne · Cloudflare Logs docs","description":"Push Cloudflare logs to SentinelOne Data Lake.","url":"https://developers.cloudflare.com/logs/logpush/logpush-job/enable-destinations/sentinelone/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/logs/","name":"Logs"}},{"@type":"ListItem","position":3,"item":{"@id":"/logs/logpush/","name":"Logpush"}},{"@type":"ListItem","position":4,"item":{"@id":"/logs/logpush/logpush-job/","name":"Logpush job setup"}},{"@type":"ListItem","position":5,"item":{"@id":"/logs/logpush/logpush-job/enable-destinations/","name":"Enable destinations"}},{"@type":"ListItem","position":6,"item":{"@id":"/logs/logpush/logpush-job/enable-destinations/sentinelone/","name":"Enable SentinelOne"}}]}
```
