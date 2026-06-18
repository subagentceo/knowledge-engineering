---
title: Enable Cloudflare R2
description: Push Cloudflare logs to Cloudflare R2.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/logs/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Enable Cloudflare R2

Cloudflare Logpush supports pushing logs directly to R2\. You can do so via the automatic setup (Cloudflare creates an R2 bucket for you), or you can create your own R2 bucket with the custom setup. The automatic setup is ideal for quickly setting up a bucket or for testing purposes. Instead, use the custom setup if you need full control over the configuration.

For more information about R2, refer to the [Cloudflare R2](https://developers.cloudflare.com/r2/) documentation.

Note

If you want to set up R2 as destination for a zone on [FedRAMP High ↗](https://www.cloudflare.com/cloudflare-for-government/), you need to use an [S3-compatible endpoint](https://developers.cloudflare.com/logs/logpush/logpush-job/enable-destinations/s3-compatible-endpoints/) with the following `Endpoint URL`:`<ACCOUNT_ID>.fedramp.r2.cloudflarestorage.com`

## Automatic setup

If you want to use the automatic setup for your logpush job:

1. In the Cloudflare dashboard, go to the **Logpush** page at the account or or domain (also known as zone) level.  
For account: [ Go to **Logpush** ](https://dash.cloudflare.com/?to=/:account/logs)  
For domain (also known as zone): [ Go to **Logpush** ](https://dash.cloudflare.com/?to=/:account/:zone/analytics/logs)
2. Depending on your choice, you have access to [account-scoped datasets](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/) and [zone-scoped datasets](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/zone/), respectively.
3. Select **Create a Logpush job**.
1. Select **R2 Object Storage - automatic** as destination.
2. Next, select the dataset and the storage region you want to use.
3. To finalize, select **Create Logpush job**.

Your setup should now be complete. If you require full control over the configuration, consider using the custom setup instead.

## Custom setup

Cloudflare Logpush supports pushing logs directly to R2 via the Cloudflare dashboard or via API.

Before getting started:

* Create an R2 bucket and set up R2 API tokens.  
   1. Go to the R2 UI > **Create bucket**.  
   2. Select **Manage R2 API Tokens**.  
   3. Select **Create API token**.  
   4. Under **Permission**, select **Edit** permissions for your token.  
   5. Copy the Secret Access Key and Access Key ID. You will need these when setting up your Logpush job.
* Ensure that you have the following permissions:  
   * R2 write, Logshare Edit.

### Manage via the Cloudflare dashboard

1. In the Cloudflare dashboard, go to the **Logpush** page at the account or or domain (also known as zone) level.  
For account: [ Go to **Logpush** ](https://dash.cloudflare.com/?to=/:account/logs)  
For domain (also known as zone): [ Go to **Logpush** ](https://dash.cloudflare.com/?to=/:account/:zone/analytics/logs)
2. Depending on your choice, you have access to [account-scoped datasets](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/) and [zone-scoped datasets](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/zone/), respectively.
3. Select **Create a Logpush job**.
1. In **Select a destination**, choose **R2 Object Storage**.
2. Enter or select the following destination details:  
   * **Bucket** \- R2 bucket name  
   * **Path** \- bucket location, for example, `cloudflare-logs/http_requests/example.com`  
   * **Organize logs into daily subfolders** (recommended)  
   * Under **Authentication** add your **R2 Access Key ID** and **R2 Secret Access Key**. Refer to [Manage R2 API tokens ↗](https://dash.cloudflare.com/b54f07a6c269ecca2fa60f1ae4920c99/r2/api-tokens) for more information.

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

### Manage via API

To create a job, make a `POST` request to the Logpush jobs endpoint with the following fields:

* **name** (optional) - Use your domain name as the job name.
* **destination\_conf** \- A log destination consisting of bucket path, account ID, R2 access key ID and R2 secret access key.

Note

We recommend adding the `{DATE}` parameter in the `destination_conf` to separate your logs into daily subfolders.

Terminal window

```

r2://<BUCKET_PATH>/{DATE}?account-id=<ACCOUNT_ID>&access-key-id=<R2_ACCESS_KEY_ID>&secret-access-key=<R2_SECRET_ACCESS_KEY>


```

* **dataset** \- The category of logs you want to receive. Refer to [Datasets](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/) for the full list of supported datasets.
* **output\_options** (optional) - To configure fields, sample rate, and timestamp format, refer to [API configuration options](https://developers.cloudflare.com/logs/logpush/logpush-job/api-configuration/#options).

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

    "destination_conf": "r2://<BUCKET_PATH>/{DATE}?account-id=<ACCOUNT_ID>&access-key-id=<R2_ACCESS_KEY_ID>&secret-access-key=<R2_SECRET_ACCESS_KEY>",

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

    "destination_conf": "r2://<BUCKET_PATH>/{DATE}?account-id=<ACCOUNT_ID>&access-key-id=<R2_ACCESS_KEY_ID>&secret-access-key=<R2_SECRET_ACCESS_KEY>",

    "last_complete": null,

    "last_error": null,

    "error_message": null

  },

  "success": true

}


```

Refer to [Manage Logpush with cURL](https://developers.cloudflare.com/logs/logpush/examples/example-logpush-curl/) to update a job (including enabling and disabling).

## Download logs from R2

Once your logs are stored in R2, you can download them using various methods:

### Dashboard

1. In the Cloudflare dashboard, go to the **R2** page.  
[ Go to **Overview** ](https://dash.cloudflare.com/?to=/:account/r2/overview)
2. Select your bucket.
3. From your bucket's page, locate the desired log file.
4. Select on the **...** icon next to the file to download it.
![Log files list](https://developers.cloudflare.com/_astro/logs-r2.BSx83Q8__1KKCo.webp) 

### AWS CLI

Cloudflare R2 is S3-compatible, so you can use the AWS CLI to interact with it.

* Configure the AWS CLI with your R2 credentials.
* Use the `aws s3 cp` command to download the log file:

Terminal window

```

aws s3 cp s3://<BUCKET-NAME>/<PATH-TO-LOG-FILE> <LOCAL-DESTINATION>


```

Replace `<bucket-name>`, `<path-to-log-file>`, and `<local-destination>` with your specific details.

Downloaded files are gzipped so they must be decompressed before you can open them in a text editor.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/logs/logpush/logpush-job/enable-destinations/r2/#page","headline":"Enable Cloudflare R2 · Cloudflare Logs docs","description":"Push Cloudflare logs to Cloudflare R2.","url":"https://developers.cloudflare.com/logs/logpush/logpush-job/enable-destinations/r2/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-06-06","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/logs/","name":"Logs"}},{"@type":"ListItem","position":3,"item":{"@id":"/logs/logpush/","name":"Logpush"}},{"@type":"ListItem","position":4,"item":{"@id":"/logs/logpush/logpush-job/","name":"Logpush job setup"}},{"@type":"ListItem","position":5,"item":{"@id":"/logs/logpush/logpush-job/enable-destinations/","name":"Enable destinations"}},{"@type":"ListItem","position":6,"item":{"@id":"/logs/logpush/logpush-job/enable-destinations/r2/","name":"Enable Cloudflare R2"}}]}
```
