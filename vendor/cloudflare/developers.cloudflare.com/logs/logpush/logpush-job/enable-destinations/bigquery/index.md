---
title: Enable Google BigQuery
description: Push Cloudflare logs to Google BigQuery.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/logs/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Enable Google BigQuery

Cloudflare Logpush supports pushing logs directly to Google BigQuery (using Legacy Streaming API) via the Cloudflare dashboard or via API.

## Create and get access to a BigQuery table

Cloudflare uses Google Application Credentials provided in Logpush job `destination_conf` to gain write access to your table. The provided service account needs a write permission for the table.

To enable Logpush to BigQuery:

1. Go to Google Cloud Console for your account.
2. Go to **IAM & Admin** \> **Service Accounts**, and create a new service account.
3. Add **BigQuery Data Editor** role under Permissions. At minimum, it requires `bigquery.tables.updateData` permission.
4. Add a key under Keys.  
   1. Click **Add key**.  
   2. Click **Create new key**.  
   3. Select Key type **JSON**.  
   4. Click **Create**.  
   5. Save the Application Credentials JSON file. You will need to use this when setting up a new Logpush job.
5. In BigQuery, create a dataset and table. Refer to [instructions from BigQuery ↗](https://cloud.google.com/bigquery/docs/tables). For example, using `schema.json` and `bq` command:

Terminal window

```

gcloud auth activate-service-account --key-file=${KEY_FILE}


PROJECT_ID=<PROJECT_ID>

DATASET_ID=<DATASET_ID>

TABLE_ID=<TABLE_ID>


bq mk --table "${PROJECT_ID}:${DATASET_ID}.${TABLE_ID}" schema.json


```

## Manage via the Cloudflare dashboard

1. In the Cloudflare dashboard, go to the **Logpush** page at the account or or domain (also known as zone) level.  
For account: [ Go to **Logpush** ](https://dash.cloudflare.com/?to=/:account/logs)  
For domain (also known as zone): [ Go to **Logpush** ](https://dash.cloudflare.com/?to=/:account/:zone/analytics/logs)
2. Depending on your choice, you have access to [account-scoped datasets](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/) and [zone-scoped datasets](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/zone/), respectively.
3. Select **Create a Logpush job**.
1. In **Select a destination**, choose **Google BigQuery**.
2. Enter the following destination details:  
   * **Project ID** \- your Google Cloud project ID  
   * **Dataset ID** \- the BigQuery dataset containing your table  
   * **Table ID** \- the BigQuery table to push logs to  
   * **Service Account Credentials** \- paste your Google service account key JSON. This credential is stored encrypted and will not be displayed again.

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

To set up a BigQuery Logpush job:

1. Create a job with the appropriate endpoint URL and authentication parameters.
2. Enable the job to begin pushing logs.

Note

Unlike configuring Logpush jobs for AWS S3, GCS, or Azure, there is no ownership challenge when configuring Logpush to BigQuery.

Ensure **Log Share** permissions are enabled, before attempting to read or configure a Logpush job. For more information refer to the [Roles section](https://developers.cloudflare.com/logs/logpush/permissions/#roles).

### 1\. Create a job

To create a job, make a `POST` request to the Logpush jobs endpoint with the following fields:

* **name** (optional) - Use your domain name as the job name.
* **destination\_conf** \- A log destination consisting of a reference to BigQuery table and credentials in the string format below.  
   * **<PROJECT\_ID>**, **<DATASET\_ID>**, **<TABLE\_ID>**: Project ID, Dataset ID, and table ID of the designated BigQuery table.  
   * **<ENCODED\_VALUE>**: The encoded value of Application Credentials JSON as `credentials`, either base64-encoded with `base64:` prefix, or URL-encoded with `url:` prefix.

Terminal window

```

"bq://projects/<PROJECT_ID>/datasets/<DATASET_ID>/tables/<TABLE_ID>?credentials=<ENCODED_VALUE>"


```

* **dataset** \- The category of logs you want to receive. Refer to [Datasets](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/) for the full list of supported datasets.
* **output\_options** (optional) - To configure fields, sample rate, and timestamp format, refer to [Log Output Options](https://developers.cloudflare.com/logs/logpush/logpush-job/log-output-options/). For timestamp, Cloudflare recommends using `timestamps=rfc3339`.  
   * When including custom formatting options, such as `output_type`, or any prefix / suffix / delimiter / template options, make sure to set `stringify_object` true, too, otherwise fields with `object` type may not be serialized in the format compatible to BigQuery Legacy Streaming API.

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

    "destination_conf": "bq://projects/<PROJECT_ID>/datasets/<DATASET_ID>/tables/<TABLE_ID>?credentials=<ENCODED_VALUE>",

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

    "max_upload_records": 50000,

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

    "max_upload_records": 50000,

    "enabled": true,

    "name": "<DOMAIN_NAME>",

    "output_options": {

      "field_names": ["ClientIP", "ClientRequestHost", "ClientRequestMethod", "ClientRequestURI", "EdgeEndTimestamp", "EdgeResponseBytes", "EdgeResponseStatus" ,"EdgeStartTimestamp", "RayID"],

      "timestamp_format": "rfc3339"

    },

    "destination_conf": "bq://projects/<PROJECT_ID>/datasets/<DATASET_ID>/tables/<TABLE_ID>?credentials=<ENCODED_VALUE>",

    "last_complete": null,

    "last_error": null,

    "error_message": null

  },

  "success": true

}


```

This will make a test upload with an empty content to verify that Logpush can upload, and you may see a row with empty data.

Refer to [Manage Logpush with cURL](https://developers.cloudflare.com/logs/logpush/examples/example-logpush-curl/) to update a job (including enabling and disabling).

## Limitations

Note the following default quota and limits, as described in the [BigQuery documentation ↗](https://docs.cloud.google.com/bigquery/quotas#streaming%5Finserts).

The following limits apply to BigQuery streaming inserts:

* Maximum HTTP request size (uncompressed, may include headers): 10 MB
* Maximum row size: 10 MB
* Maximum rows per request size: 50,000 rows.

These are default quota / limit, and you should adjust the Logpush jobs to match the limit, and/or request Google to increase them when needed.

## Google Cloud Storage integration

Cloudflare Logpush supports pushing logs to [Google Cloud Storage](https://developers.cloudflare.com/logs/logpush/logpush-job/enable-destinations/google-cloud-storage/).

BigQuery supports loading up to 1,500 jobs per table per day (including failures) with up to 10 million files in each load. That means you can load into BigQuery once per minute and include up to 10 million files in a load. For more information, refer to BigQuery's quotas for load jobs.

Logpush delivers batches of logs as soon as possible, which means you could receive more than one batch of files per minute. Ensure your BigQuery job is configured to ingest files on a given time interval, like every minute, as opposed to when files are received. Ingesting files into BigQuery as each Logpush file is received could exhaust your BigQuery quota quickly.

For a community-supported example of how to set up a schedule job load with BigQuery, refer to [Cloudflare + Google Cloud | Integrations repository ↗](https://github.com/cloudflare/cloudflare-gcp/tree/master/logpush-to-bigquery). Note that this repository is provided on a best-effort basis and is not maintained routinely.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/logs/logpush/logpush-job/enable-destinations/bigquery/#page","headline":"Enable Logpush to Google BigQuery · Cloudflare Logs docs","description":"Push Cloudflare logs to Google BigQuery.","url":"https://developers.cloudflare.com/logs/logpush/logpush-job/enable-destinations/bigquery/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/logs/","name":"Logs"}},{"@type":"ListItem","position":3,"item":{"@id":"/logs/logpush/","name":"Logpush"}},{"@type":"ListItem","position":4,"item":{"@id":"/logs/logpush/logpush-job/","name":"Logpush job setup"}},{"@type":"ListItem","position":5,"item":{"@id":"/logs/logpush/logpush-job/enable-destinations/","name":"Enable destinations"}},{"@type":"ListItem","position":6,"item":{"@id":"/logs/logpush/logpush-job/enable-destinations/bigquery/","name":"Enable Google BigQuery"}}]}
```
