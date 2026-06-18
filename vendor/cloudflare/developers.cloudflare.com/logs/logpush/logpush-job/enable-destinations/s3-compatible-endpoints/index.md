---
title: Enable S3-compatible endpoints
description: Push Cloudflare logs to S3-compatible storage.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/logs/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Enable S3-compatible endpoints

Cloudflare Logpush supports pushing logs to S3-compatible destinations via the Cloudflare dashboard or via API, including:

* [Alibaba Cloud OSS ↗](https://www.alibabacloud.com/help/doc-detail/64919.htm#title-37m-7gl-xy2)
* [Backblaze B2 ↗](https://www.backblaze.com/b2/docs/s3%5Fcompatible%5Fapi.html)
* [DigitalOcean Spaces ↗](https://www.digitalocean.com/docs/spaces/)
* [IBM Cloud Object Storage ↗](https://cloud.ibm.com/apidocs/cos/cos-compatibility)
* [JD Cloud Object Storage Service ↗](https://docs.jdcloud.com/en/object-storage-service/introduction-2)
* [Linode Object Storage ↗](https://www.linode.com/products/object-storage/)
* [Oracle Cloud Object Storage ↗](https://docs.cloud.oracle.com/en-us/iaas/Content/Object/Tasks/s3compatibleapi.htm)
* On-premise [Ceph Object Gateway ↗](https://docs.ceph.com/en/latest/radosgw/s3/)

For more information about Logpush and the current production APIs, refer to [Cloudflare Logpush](https://developers.cloudflare.com/logs/logpush/) documentation.

## Manage via the Cloudflare dashboard

1. In the Cloudflare dashboard, go to the **Logpush** page at the account or or domain (also known as zone) level.  
For account: [ Go to **Logpush** ](https://dash.cloudflare.com/?to=/:account/logs)  
For domain (also known as zone): [ Go to **Logpush** ](https://dash.cloudflare.com/?to=/:account/:zone/analytics/logs)
2. Depending on your choice, you have access to [account-scoped datasets](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/) and [zone-scoped datasets](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/zone/), respectively.
3. Select **Create a Logpush job**.
1. In **Select a destination**, choose **S3-Compatible**.
2. Enter or select the following destination information:  
   * **Bucket** \- S3 Compatible bucket name  
   * **Path** \- bucket location within the storage container  
   * **Organize logs into daily subfolders** (recommended)  
   * **Endpoint URL** \- The URL without the bucket name or path. Example, `sfo2.digitaloceanspaces.com`.  
   * **Bucket region**  
   * **Access Key ID**  
   * **Secret Access Key**

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

To set up S3-compatible endpoints:

1. Create a job with the appropriate endpoint URL and authentication parameters.
2. Enable the job to begin pushing logs.

Note

Unlike Logpush jobs to Amazon S3, there is no ownership challenge with S3-compatible APIs.

Ensure **Log Share** permissions are enabled, before attempting to read or configure a Logpush job. For more information refer to the [Roles section](https://developers.cloudflare.com/logs/logpush/permissions/#roles).

### 1\. Create a job

To create a job, make a `POST` request to the Logpush jobs endpoint with the following fields:

* **name** (optional) - Use your domain name as the job name.
* **destination\_conf** \- A log destination consisting of an endpoint name, bucket name, bucket path, region, access-key-id, and secret-access-key in the following string format:

Terminal window

```

"s3://<BUCKET_NAME>/<BUCKET_PATH>?region=<REGION>&access-key-id=<ACCESS_KEY_ID>&secret-access-key=<SECRET_ACCESS_KEY>&endpoint=<ENDPOINT_URL>"


```

Note

`<ENDPOINT_URL>` is the URL without the bucket name or path. For example: `endpoint=sfo2.digitaloceanspaces.com`.

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

    "destination_conf": "s3://<BUCKET_NAME>/<BUCKET_PATH>?region=<REGION>&access-key-id=<ACCESS_KEY_ID>&secret-access-key=<SECRET_ACCESS_KEY>&endpoint=<ENDPOINT_URL>",

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

    "destination_conf": "s3://<BUCKET_NAME>/<BUCKET_PATH>?region=<REGION>&access-key-id=<ACCESS_KEY_ID>&secret-access-key=<SECRET_ACCESS_KEY>&endpoint=<ENDPOINT_URL>",

    "last_complete": null,

    "last_error": null,

    "error_message": null

  },

  "success": true

}


```

Refer to [Manage Logpush with cURL](https://developers.cloudflare.com/logs/logpush/examples/example-logpush-curl/) to update a job (including enabling and disabling).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/logs/logpush/logpush-job/enable-destinations/s3-compatible-endpoints/#page","headline":"Enable Logpush to S3-compatible endpoints · Cloudflare Logs docs","description":"Push Cloudflare logs to S3-compatible storage.","url":"https://developers.cloudflare.com/logs/logpush/logpush-job/enable-destinations/s3-compatible-endpoints/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/logs/","name":"Logs"}},{"@type":"ListItem","position":3,"item":{"@id":"/logs/logpush/","name":"Logpush"}},{"@type":"ListItem","position":4,"item":{"@id":"/logs/logpush/logpush-job/","name":"Logpush job setup"}},{"@type":"ListItem","position":5,"item":{"@id":"/logs/logpush/logpush-job/enable-destinations/","name":"Enable destinations"}},{"@type":"ListItem","position":6,"item":{"@id":"/logs/logpush/logpush-job/enable-destinations/s3-compatible-endpoints/","name":"Enable S3-compatible endpoints"}}]}
```
