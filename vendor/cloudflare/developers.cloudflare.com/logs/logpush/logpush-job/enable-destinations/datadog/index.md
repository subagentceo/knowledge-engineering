---
title: Enable Datadog
description: Push Cloudflare logs to Datadog.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/logs/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Enable Datadog

Cloudflare Logpush supports pushing logs directly to Datadog via the Cloudflare dashboard or via API.

## Manage via the Cloudflare dashboard

1. In the Cloudflare dashboard, go to the **Logpush** page at the account or or domain (also known as zone) level.  
For account: [ Go to **Logpush** ](https://dash.cloudflare.com/?to=/:account/logs)  
For domain (also known as zone): [ Go to **Logpush** ](https://dash.cloudflare.com/?to=/:account/:zone/analytics/logs)
2. Depending on your choice, you have access to [account-scoped datasets](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/) and [zone-scoped datasets](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/zone/), respectively.
3. Select **Create a Logpush job**.
1. In **Select a destination**, choose **Datadog**.
2. Enter or select the following destination information:  
   * **Datadog URL Endpoint**, which can be either one below. You can find the difference at [Datadog API reference ↗](https://docs.datadoghq.com/api/latest/logs/).

* [ v1 ](#tab-panel-9352)
* [ v2 ](#tab-panel-9353)

* `http-intake.logs.datadoghq.com/v1/input`

* `http-intake.logs.datadoghq.com/api/v2/logs`

* **Datadog API Key**, can be retrieved by following [these steps ↗](https://docs.datadoghq.com/account%5Fmanagement/api-app-keys/#add-an-api-key-or-client-token).
* **Service**, **Hostname**, **Datadog ddsource field**, and **ddtags** fields can be set as URL parameters. For more information, refer to the [Logs section ↗](https://docs.datadoghq.com/api/latest/logs/) in Datadog's documentation. While these parameters are optional, they can be useful for indexing or processing logs. Note that the values of these parameters may contain special characters, which should be URL encoded.

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

To set up a Datadog Logpush job:

1. Create a job with the appropriate endpoint URL and authentication parameters.
2. Enable the job to begin pushing logs.

Note

Unlike configuring Logpush jobs for AWS S3, GCS, or Azure, there is no ownership challenge when configuring Logpush to Datadog.

Ensure **Log Share** permissions are enabled, before attempting to read or configure a Logpush job. For more information refer to the [Roles section](https://developers.cloudflare.com/logs/logpush/permissions/#roles).

### 1\. Create a job

To create a job, make a `POST` request to the Logpush jobs endpoint with the following fields:

* **name** (optional) - Use your domain name as the job name.
* **destination\_conf** \- A log destination consisting of an endpoint URL, authorization header, and zero or more optional parameters that Datadog supports in the string format below.  
   * **<DATADOG\_ENDPOINT\_URL>**: The Datadog HTTP logs intake endpoint, which can be either one below. You can find the difference at [Datadog API reference ↗](https://docs.datadoghq.com/api/latest/logs/).  
   * [ v1 ](#tab-panel-9354)  
   * [ v2 ](#tab-panel-9355)  
[https://http-intake.logs.datadoghq.com/v1/input\` ↗](https://http-intake.logs.datadoghq.com/v1/input%60)  
`https://http-intake.logs.datadoghq.com/api/v2/logs`
* `<DATADOG_API_KEY>`: The Datadog API token can be retrieved by following [these steps ↗](https://docs.datadoghq.com/account%5Fmanagement/api-app-keys/#add-an-api-key-or-client-token). For example, `20e6d94e8c57924ad1be3c29bcaee0197d`.
* `ddsource`: Set to `cloudflare`.
* `service`, `host`, `ddtags`: Optional parameters allowed by Datadog.

Terminal window

```

"datadog://<DATADOG_ENDPOINT_URL>?header_DD-API-KEY=<DATADOG_API_KEY>&ddsource=cloudflare&service=<SERVICE>&host=<HOST>&ddtags=<TAGS>"


```

* **dataset** \- The category of logs you want to receive. Refer to [Datasets](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/) for the full list of supported datasets.
* **output\_options** (optional) - To configure fields, sample rate, and timestamp format, refer to [Log Output Options](https://developers.cloudflare.com/logs/logpush/logpush-job/log-output-options/).

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

    "destination_conf": "datadog://<DATADOG_ENDPOINT_URL>?header_DD-API-KEY=<DATADOG_API_KEY>&ddsource=cloudflare&service=<SERVICE>&host=<HOST>&ddtags=<TAGS>",

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

      "field_names": ["ClientIP", "ClientRequestHost", "ClientRequestMethod", "ClientRequestURI", "EdgeEndTimestamp", "EdgeResponseBytes", "EdgeResponseStatus" ,"EdgeStartTimestamp", "RayID"],

      "timestamp_format": "rfc3339"

    },

    "destination_conf": "datadog://<DATADOG_ENDPOINT_URL>?header_DD-API-KEY=<DATADOG_API_KEY>",

    "last_complete": null,

    "last_error": null,

    "error_message": null

  },

  "success": true

}


```

Refer to [Manage Logpush with cURL](https://developers.cloudflare.com/logs/logpush/examples/example-logpush-curl/) to update a job (including enabling and disabling).

Note

The Datadog destination is exclusive to new jobs and might not be backward compatible with older jobs. Create new jobs if you expect to send your logs directly to Datadog instead of modifying already existing ones. If you try to modify an existing job for another destination to push logs to Datadog, you may observe errors.

Note

To analyze and visualize Cloudflare metrics using the Cloudflare Integration tile for Datadog, follow the steps in the [Datadog Analytics integration page](https://developers.cloudflare.com/analytics/analytics-integrations/datadog/).

## Limitations

Note the following Logpush sending limitations, as described in the [Datadog documentation ↗](https://docs.datadoghq.com/api/latest/logs/).

Send your logs to your Datadog platform over HTTP. Limits per HTTP request are the following:

* Maximum content size per payload (uncompressed): 5 MB
* Maximum size for a single log: 1 MB
* Maximum array size if sending multiple logs in an array: 1,000 entries

Warning

The above limits are hardcoded defaults. It is not possible to override these limitations using the Logpush configuration values, `max_upload_records` or `max_upload_bytes`.

These limitations may result in noticeable log ingestion delay within Datadog following high traffic events. Logpush will not drop unsent logs, so all logs will be uploaded to Datadog in due time.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/logs/logpush/logpush-job/enable-destinations/datadog/#page","headline":"Enable Logpush to Datadog · Cloudflare Logs docs","description":"Push Cloudflare logs to Datadog.","url":"https://developers.cloudflare.com/logs/logpush/logpush-job/enable-destinations/datadog/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/logs/","name":"Logs"}},{"@type":"ListItem","position":3,"item":{"@id":"/logs/logpush/","name":"Logpush"}},{"@type":"ListItem","position":4,"item":{"@id":"/logs/logpush/logpush-job/","name":"Logpush job setup"}},{"@type":"ListItem","position":5,"item":{"@id":"/logs/logpush/logpush-job/enable-destinations/","name":"Enable destinations"}},{"@type":"ListItem","position":6,"item":{"@id":"/logs/logpush/logpush-job/enable-destinations/datadog/","name":"Enable Datadog"}}]}
```
