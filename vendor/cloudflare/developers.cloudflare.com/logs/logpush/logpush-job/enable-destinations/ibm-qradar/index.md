---
title: Enable IBM QRadar
description: Learn about enable ibm qradar in Cloudflare Logs.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/logs/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Enable IBM QRadar

To configure a QRadar/Cloudflare integration you have the option to use one of the following methods:

* [HTTP Receiver protocol](https://developers.cloudflare.com/logs/logpush/logpush-job/enable-destinations/ibm-qradar/#http-receiver-protocol)
* [Amazon AWS S3 Rest API](https://developers.cloudflare.com/logs/logpush/logpush-job/enable-destinations/ibm-qradar/#amazon-aws-s3-rest-api)

## HTTP Receiver Protocol

To send Cloudflare logs to QRadar you need to create a [Logpush job to HTTP endpoints](https://developers.cloudflare.com/logs/logpush/logpush-job/enable-destinations/http/) via API. Below you can find two curl examples of how to send Cloudflare Firewall events and Cloudflare HTTP events to QRadar.

### Cloudflare Firewall events

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Logs Write`

Create Logpush job

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/logpush/jobs" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "<NAME>",

    "output_options": {

        "field_names": [

            "Action",

            "ClientIP",

            "ClientASN",

            "ClientASNDescription",

            "ClientCountry",

            "ClientIPClass",

            "ClientRefererHost",

            "ClientRefererPath",

            "ClientRefererQuery",

            "ClientRefererScheme",

            "ClientRequestHost",

            "ClientRequestMethod",

            "ClientRequestPath",

            "ClientRequestProtocol",

            "ClientRequestQuery",

            "ClientRequestScheme",

            "ClientRequestUserAgent",

            "EdgeColoCode",

            "EdgeResponseStatus",

            "Kind",

            "MatchIndex",

            "Metadata",

            "OriginResponseStatus",

            "OriginatorRayID",

            "RayID",

            "RuleID",

            "Source",

            "Datetime"

        ],

        "timestamp_format": "rfc3339"

    },

    "destination_conf": "<QRADAR_URL>:<LOG_SOURCE_PORT>",

    "max_upload_bytes": 5000000,

    "max_upload_records": 1000,

    "dataset": "firewall_events",

    "enabled": true

  }'


```

### Cloudflare HTTP events

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Logs Write`

Create Logpush job

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/logpush/jobs" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "<NAME>",

    "output_options": {

        "field_names": [

            "ClientRequestMethod",

            "EdgeResponseStatus",

            "ClientIP",

            "ClientSrcPort",

            "CacheCacheStatus",

            "ClientCountry",

            "ClientDeviceType",

            "ClientIPClass",

            "ClientMTLSAuthCertFingerprint",

            "ClientMTLSAuthStatus",

            "ClientRegionCode",

            "ClientRequestBytes",

            "ClientRequestHost",

            "ClientRequestPath",

            "ClientRequestProtocol",

            "ClientRequestReferer",

            "ClientRequestScheme",

            "ClientRequestSource",

            "ClientRequestURI",

            "ClientRequestUserAgent",

            "ClientSSLCipher",

            "ClientSSLProtocol",

            "ClientXRequestedWith",

            "EdgeEndTimestamp",

            "EdgeRequestHost",

            "EdgeResponseBodyBytes",

            "EdgeResponseBytes",

            "EdgeServerIP",

            "EdgeStartTimestamp",

            "SecurityActions",

            "SecurityRuleIDs",

            "SecuritySources",

            "OriginIP",

            "OriginResponseStatus",

            "OriginSSLProtocol",

            "ParentRayID",

            "RayID",

            "SecurityAction",

            "WAFAttackScore",

            "SecurityRuleID",

            "SecurityRuleDescription",

            "WAFSQLiAttackScore",

            "WAFXSSAttackScore",

            "EdgeStartTimestamp"

        ],

        "timestamp_format": "rfc3339"

    },

    "destination_conf": "<QRADAR_URL>:<LOG_SOURCE_PORT>",

    "max_upload_bytes": 5000000,

    "max_upload_records": 1000,

    "dataset": "http_requests",

    "enabled": true

  }'


```

Cloudflare checks the accessibility of the IP address, port, and validates the certificate of the HTTP Receive log source. If all parameters are valid, a Logpush is created, and starts to send events to HTTP Receiver log source.

## Amazon AWS S3 Rest API

When you use the Amazon S3 REST API protocol, IBM QRadar collects Cloudflare Log events from an Amazon S3 bucket. To use this option, you need to:

1. Create an [Amazon S3 bucket ↗](https://docs.aws.amazon.com/AmazonS3/latest/userguide/creating-bucket.html) to store your Cloudflare Logs. Make a note of the bucket name and the AWS access key ID and secret access key with sufficient permissions to write to the bucket.
2. [Enable a Logpush to Amazon S3](https://developers.cloudflare.com/logs/logpush/logpush-job/enable-destinations/aws-s3/).
3. In the AWS Management Console, go to the Amazon S3 service. Create a bucket endpoint to allow Cloudflare to send logs directly to the S3 bucket.
4. Follow the steps in [Integrate Cloudflare Logs with QRadar by using the Amazon AWS S3 REST API protocol ↗](https://www.ibm.com/docs/en/dsm?topic=configuration-cloudflare-logs).
5. Test the configuration by generating some logs in Cloudflare and ensuring that they are delivered to the S3 bucket and subsequently forwarded to QRadar.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/logs/logpush/logpush-job/enable-destinations/ibm-qradar/#page","headline":"Enable IBM QRadar · Cloudflare Logs docs","description":"Learn about enable ibm qradar in Cloudflare Logs.","url":"https://developers.cloudflare.com/logs/logpush/logpush-job/enable-destinations/ibm-qradar/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/logs/","name":"Logs"}},{"@type":"ListItem","position":3,"item":{"@id":"/logs/logpush/","name":"Logpush"}},{"@type":"ListItem","position":4,"item":{"@id":"/logs/logpush/logpush-job/","name":"Logpush job setup"}},{"@type":"ListItem","position":5,"item":{"@id":"/logs/logpush/logpush-job/enable-destinations/","name":"Enable destinations"}},{"@type":"ListItem","position":6,"item":{"@id":"/logs/logpush/logpush-job/enable-destinations/ibm-qradar/","name":"Enable IBM QRadar"}}]}
```
