---
title: Enable Elastic
description: Push Cloudflare logs to Elastic.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/logs/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Enable Elastic

Push your Cloudflare logs to Elastic for instant visibility and insights. Enabling this integration with Elastic comes with a predefined dashboard to view all of your Cloudflare observability and security data with ease.

The Cloudflare Logpush integration can be used in three different modes to collect data:

* **HTTP Endpoint mode** \- Cloudflare pushes logs directly to an HTTP endpoint hosted by your Elastic Agent.
* **AWS S3 polling mode** \- Cloudflare writes data to S3, and the Elastic Agent polls the S3 bucket by listing its contents and reading new files.
* **AWS S3 SQS mode** \- Cloudflare writes data to S3, S3 pushes a new object notification to SQS, the Elastic Agent receives the notification from SQS, and then reads the S3 object. Multiple Agents can be used in this mode.

Note

Elastic recommends the AWS S3 SQS mode.

## Enable Logpush Job in Cloudflare

Determine which method you want to use, and configure the appropriate Logpush job in the Cloudflare dashboard or via the API.

Elastic supports the default JSON format.

To push logs to an object storage for short term storage and buffering before ingesting into Elastic (recommended), follow the instructions to configure a Logpush job to push logs to [AWS S3](https://developers.cloudflare.com/logs/logpush/logpush-job/enable-destinations/aws-s3/), [Google Cloud Storage](https://developers.cloudflare.com/logs/logpush/logpush-job/enable-destinations/google-cloud-storage/), or [Azure Blob Storage](https://developers.cloudflare.com/logs/logpush/logpush-job/enable-destinations/azure/).

To use the [HTTP Endpoint mode](https://developers.cloudflare.com/logs/logpush/logpush-job/enable-destinations/http/), use the API to push logs to an HTTP endpoint backed by your Elastic Agent.

Add the same custom header along with its value on both sides for additional security.

For example, while creating a job along with a header and value for a particular dataset:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Logs Write`

Create Logpush job

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/logpush/jobs" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "<PUBLIC_DOMAIN>",

    "destination_conf": "https://<PUBLIC_DOMAIN>:<PUBLIC_PORT>?header_<SECRET_HEADER>=<SECRET_VALUE>",

    "dataset": "http_requests",

    "output_options": {

        "field_names": [

            "RayID",

            "EdgeStartTimestamp"

        ],

        "timestamp_format": "rfc3339"

    }

  }'


```

## Enable the Integration in Elastic

Once the Logpush job is configured, follow Elastics instructions for [setting up the Integration ↗](https://docs.elastic.co/integrations/cloudflare%5Flogpush) in the Elastic app.

## View Dashboards

Log in to your [Elastic account ↗](https://www.elastic.co/) to view prebuilt dashboards and configure alerts.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/logs/logpush/logpush-job/enable-destinations/elastic/#page","headline":"Enable Logpush to Elastic · Cloudflare Logs docs","description":"Push Cloudflare logs to Elastic.","url":"https://developers.cloudflare.com/logs/logpush/logpush-job/enable-destinations/elastic/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/logs/","name":"Logs"}},{"@type":"ListItem","position":3,"item":{"@id":"/logs/logpush/","name":"Logpush"}},{"@type":"ListItem","position":4,"item":{"@id":"/logs/logpush/logpush-job/","name":"Logpush job setup"}},{"@type":"ListItem","position":5,"item":{"@id":"/logs/logpush/logpush-job/enable-destinations/","name":"Enable destinations"}},{"@type":"ListItem","position":6,"item":{"@id":"/logs/logpush/logpush-job/enable-destinations/elastic/","name":"Enable Elastic"}}]}
```
